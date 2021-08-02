import React from 'react'
import { Button, Drawer } from 'rsuite'
import { useProfile } from '../../context/profile.context'

export const Dashboard = ({onSignOut}) => {
    
    const {profile} = useProfile();
    
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