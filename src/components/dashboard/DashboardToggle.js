import React, { useCallback } from 'react'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import { Dashboard } from '.'
import { useMediaQuery, useModalState } from '../../misc/custom-hooks'
import { auth } from '../../misc/firebase'

export const DashboardToggle = () => {

    const {isOpen, close, open} = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');

    // for sign-out
    const onSignOut = useCallback(() => {
        auth.signOut();
        Alert.info('Logged Out! See you again 😄', 5000);
        close();
    }, [close])

    return (
        <>
            {/* dashboard button */}
            <Button block color="blue" onClick={open}>
                <Icon icon="dashboard" /> Dashboard
            </Button>  

            {/* side drawer opens on click on Dashboard */}
            <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
                <Dashboard onSignOut={onSignOut}/>    
            </Drawer>
        </>
    )
}
