
// *** PROFILE PROVIDER *** //

import React, { createContext, useState, useContext } from "react";

const ProfileContext = createContext()

export const ProfileProvider = ({children})=> {

    const [profile] = useState(false)

    return (
    <ProfileContext.Provider value={profile}>
        {children}
    </ProfileContext.Provider>
    )
}

// a custom hook for easy access of profile context (outer wrapper)
export const useProfile = ()=> useContext(ProfileContext);
