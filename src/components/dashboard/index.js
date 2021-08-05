import React from 'react'
import { Alert, Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../context/profile.context'
import { database } from '../../misc/firebase';
import { AvatarUploadBtn } from './AvatarUploadBtn';
import { EditableInput } from './EditableInput';
import { ProviderBlock } from './ProviderBlock';

export const Dashboard = ({onSignOut}) => {
    
    const {profile} = useProfile();

    const onSave = async newData => {
        console.log(newData);
        
        // update to firebase database
        const userNameRef = database.ref(`/profiles/${profile.uid}`).child('name');

        try{
        
            await userNameRef.set(newData);
            Alert.success('Username has been updated! 😄', 4000);
        
        }catch(err){
            Alert.error(err.message, 4000);
        }
    }
    
    return <>
        {/* HEADER */}
        <Drawer.Header>
            <Drawer.Title>
                Dashboard
            </Drawer.Title>
        </Drawer.Header>
        
        {/* BODY */}
        <Drawer.Body>
            <h3>
                Hey, {profile.name}
            </h3>
            <ProviderBlock />
            
            <Divider />
            
            {/* Name Field */}
            <EditableInput 
                name="username"
                initialValue={profile.name}
                onSave={onSave}
                label={<h6 className="mb-2">Your (In-Chat) Username</h6>}/>

            {/* Avatar Field */}
            <AvatarUploadBtn />
        </Drawer.Body>

        {/* FOOTER */}
        <Drawer.Footer>
            <Button block color="red" onClick={onSignOut}>
                Log Out
            </Button>
            <div>
                ~ Made with 💗 by Harshit
            </div>
        </Drawer.Footer>
    </>
}
// import './components/dashboard/index.js';
// export default Dashboard;