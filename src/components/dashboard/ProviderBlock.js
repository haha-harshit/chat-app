import React, { useState } from 'react'
import { Alert, Button, Icon, Tag } from 'rsuite';
import firebase from 'firebase/app';
import { auth } from '../../misc/firebase'

export const ProviderBlock = () => {

    // console.log(auth.currentUser);

    const [isConnected, setIsConnected] = useState({
        'google.com': auth.currentUser.providerData.some((data) => data.providerId === 'google.com'),
        'facebook.com': auth.currentUser.providerData.some((data) => data.providerId === 'facebook.com')
    });

    const updateIsConnected = (providerId, value) => {
        setIsConnected(p => {
            return {
                ...p,
                [providerId]: value
            }
        })
    }

    // general unLink
    const unLink = async (providerId) => {
        try {
        
            if(auth.currentUser.providerData.length === 1){
                throw new Error(`You can not disconnect from ${providerId}`)
            }

            await auth.currentUser.unlink(providerId)
            updateIsConnected(providerId, false);
            Alert.info(`Disconnected from ${providerId}`, 4000);

        } catch (err) {
            Alert.error(err.message, 4000)                      
        }
    }

    
    // unLink Facebook
    const unLinkFacebook = () => {
        unLink("facebook.com")
    }
    
    // unLink Google
    const unLinkGoogle = () => {
        unLink("google.com");        
    }
    
    // general link
    const link = async (provider) => {
        try {
            await auth.currentUser.linkWithPopup(provider);
            Alert.info(`Linked to ${provider.providerId}`, 4000);

            updateIsConnected(provider.providerId, true);

        } catch (err) {
            Alert.error(err.message, 4000)
        }
    }

    // Link Facebook
    const linkFacebook = () => {
        link(new firebase.auth.FacebookAuthProvider())        
    }
    // Link Google
    const linkGoogle = () => {
        link(new firebase.auth.GoogleAuthProvider())
    }

    return (
        <div>
            {/* if connected to google */}
            {
                isConnected["google.com"] && 
                <Tag color="green" closable onClose={unLinkGoogle}>
                    <Icon icon="google">
                        Connected
                    </Icon>
                </Tag>
            }
            
            {/* if connected to facebook */}
            {
                isConnected["facebook.com"] &&
                <Tag color="blue" closable onClose={unLinkFacebook}>
                    <Icon icon="facebook">
                        Connected
                    </Icon>
                </Tag>
            }

            <div className="mt-2">

                {/* if not connected to google.com*/}
                {
                    !isConnected["google.com"] &&
                    <Button block color="green" onClick={linkGoogle}>
                        <Icon icon="google" />Link to Google
                    </Button>
                }

                {/* if not connected to facebook.com*/}                
                {
                    !isConnected["facebook.com"] &&
                    <Button block color="blue" onClick={linkFacebook}>
                        <Icon icon="facebook" />Link to facebook
                    </Button>
                }

            </div>
        </div>
    )
}
