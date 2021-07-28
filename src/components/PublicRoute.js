import React from 'react'
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';


export const PublicRoute = ({children, ...routeProps}) => {
    
    // profile provider
    const profile = useProfile();

    if(profile){
        return <Redirect to="/" />
    }

    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}
