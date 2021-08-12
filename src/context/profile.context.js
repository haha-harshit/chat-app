
// *** PROFILE PROVIDER *** //

import React, { createContext, useState, useContext, useEffect } from "react";
import firebase from "firebase/app";
import { auth, database } from "../misc/firebase";

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};



const ProfileContext = createContext();

export const ProfileProvider = ({children})=> {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const falsi =()=> setIsLoading(false);
    useEffect(()=> {

        let userRef;
        let userStatusRef

        const authUnsub = auth.onAuthStateChanged(authObj => {
            
            // console.log('authObj', authObj)
            
            if(authObj){

                userStatusRef = database.ref(`/status/${authObj.uid}`);
                
                userRef = database.ref(`/profiles/${authObj.uid}`);
                
                userRef.on('value', (snap)=>{
                    const {name, createdAt, avatar} = snap.val();
                    // console.log(profileData);
                    
                    const data = {
                        name,
                        createdAt,
                        avatar,
                        uid: authObj.uid,
                        email: authObj.email
                    }
                    setProfile(data);
                    setIsLoading(false);
                })



                database.ref('.info/connected').on('value', (snapshot) => {
                    // If we're not currently connected, don't do anything.
                    if (snapshot.val() === false) {
                        return;
                    };
            
                    userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                        userStatusRef.set(isOnlineForDatabase);
                    });
                });


            }else{

                if(userRef){
                    userRef.off()
                }

                if(userStatusRef){
                    userStatusRef.off();
                }

                database.ref('.info/connected').off();

                setProfile(null);
                // setIsLoading(false);
                falsi();
            }

        });

        return () => {
            authUnsub();

            database.ref('.info/connected').off();

            if(userRef){
                userRef.off();
            }
            if(userStatusRef){
                userStatusRef.off();
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
