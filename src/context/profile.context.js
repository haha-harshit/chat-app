
// *** PROFILE PROVIDER *** //

import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../misc/firebase";

const ProfileContext = createContext()

export const ProfileProvider = ({children})=> {

    const [profile, setProfile] = useState(null);

    useEffect(()=> {
        auth.onAuthStateChanged(authObj => {
            
            // console.log('authObj', authObj)
            
            if(authObj){
                const data = {
                    uid: authObj.uid,
                    name: authObj.name,
                    email: authObj.email
                }
                setProfile(data);
            }else{
                setProfile(null)
            }

        });
    }, []);

    return (
    <ProfileContext.Provider value={profile}>
        {children}
    </ProfileContext.Provider>
    )
}

// a custom hook for easy access of profile context (outer wrapper)
export const useProfile = ()=> useContext(ProfileContext);
