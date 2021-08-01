import React from 'react'
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

export const PrivateRoute = ({children, ...routeProps}) => {
    
    // profile provider
    // const {profile, isLoading} = useProfile();
    const {profile, isLoading} = useProfile();

    if (isLoading && !profile) {
        return <Container>
            <Loader center vertical size="md" content="Loading..." speed="fast"/>
        </Container>
    }

    if(!profile && !isLoading){
        return <Redirect to="/signin" />
    }

    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}
