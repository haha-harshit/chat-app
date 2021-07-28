import React from 'react'
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';

export const PrivateRoute = ({children, ...routeProps}) => {
    
    // profile provider
    const profile = useProfile();

    if(!profile){
        return <Redirect to="/signin" />
    }

    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}
