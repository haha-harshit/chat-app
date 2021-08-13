import React from 'react'
import { Button, Modal } from 'rsuite'
// import TimeAgo from 'timeago-react';
import { useModalState} from '../../../misc/custom-hooks';
import { ProfileAvatar } from '../../ProfileAvatar';


export const ProfileInfoBtnModal = ({profile, uid, ...btnProps}) => {
    // const presence = usePresence(uid);
    // console.log(presence.state);
    
    const { isOpen, close, open } = useModalState();

    const {name, avatar, createdAt} = profile;

    const shortName = profile.name.split(' ')[0];

    // const memberSince = new Date(createdAt).toDateString()
    const memberSince = new Date(createdAt).toDateString()


    // const lastSeen = ()=>{
    //     return(
    //         <>
    //             <span>Last seen </span>
    //             <TimeAgo datetime={presence.last_changed}/>
    //         </>
    //     )
    // }
    // console.log(presence.last_changed);

    
    return (
        <>
            <Button {...btnProps} onClick={open}>
                {shortName}
            </Button>
            <Modal show={isOpen} onHide={close}>
                
                <Modal.Header>
                    <Modal.Title>
                        {shortName} profile
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body className="text-center">
                    <ProfileAvatar src={avatar} name={name} className="width-200 height-200 img-fullsize font-huge"/>
                    <h4 className="mt-2">{name}</h4>
                    <p>Landed here on: {memberSince}</p>
                    {/* return presence.state === 'online' ? 'Active' : `Last seen ${new Date(presence.last_changed).toLocaleDateString()}`; */}
                    {/* { 
                        presence.state === 'online' ? 'Active' : lastSeen()
                    } */}
                </Modal.Body>

                <Modal.Footer>
                    <Button block onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
