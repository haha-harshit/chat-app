
// *** PROFILE PROVIDER *** //

import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";

const ProfileContext = createContext();

export const ProfileProvider = ({children})=> {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const falsi =()=> setIsLoading(false);
    useEffect(()=> {

        let userRef;

        const authUnsub = auth.onAuthStateChanged(authObj => {
            
            // console.log('authObj', authObj)
            
            if(authObj){
                userRef = database.ref(`/profiles/${authObj.uid}`);
                userRef.on('value', (snap)=>{
                    const {name, createdAt} = snap.val();
                    // console.log(profileData);
                    
                    const data = {
                        name,
                        createdAt,
                        uid: authObj.uid,
                        email: authObj.email
                    }
                    setProfile(data);
                    setIsLoading(false);
                })

            }else{

                if(userRef){
                    userRef.off()
                }

                setProfile(null);
                // setIsLoading(false);
                falsi();
            }

        });

        return () => {
            authUnsub();
            if(userRef){
                userRef.off();
            }
        }
    }, []);

    return (
        <ProfileContext.Provider value={{isLoading, profile}}>
            {children}
        </ProfileContext.Provider>
    )
}

// a custom hook for easy access of profile context (outer wrapper)
export const useProfile = ()=> {
    return useContext(ProfileContext)
};
