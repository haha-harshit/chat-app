import React from 'react'
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';


export const PublicRoute = ({children, ...routeProps}) => {
    
    // profile provider
    const {profile, isLoading} = useProfile();

    if(isLoading && !profile){
        return (
            <Container>
                <Loader center vertical size="md" content="Loading..." speed="fast"></Loader>
            </Container>
        );
    };


    if(profile && !isLoading){
        return <Redirect to="/" />
    }

    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}
