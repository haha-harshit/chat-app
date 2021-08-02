import React from 'react'
import { Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../context/profile.context'
import { EditableInput } from './EditableInput';

export const Dashboard = ({onSignOut}) => {
    
    const {profile} = useProfile();
    
    const onSave = async newData => {
        console.log(newData);
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
            <Divider />
            <EditableInput 
                name="username"
                initialValue={profile.name}
                onSave={onSave}
                label={<h6 className="mb-2">Username</h6>}/>
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