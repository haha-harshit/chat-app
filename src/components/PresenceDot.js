import React from 'react'
import { Badge, Tooltip, Whisper } from 'rsuite';
import TimeAgo from 'timeago-react';
import { usePresence } from '../misc/custom-hooks'


const getColor = (presence) => {
    
    if(!presence){
        return 'gray';
    }

    switch(presence.state){
        case 'online': return 'green';
        case 'offline': return 'red';
        default: return 'gray';
    }
};


const getText = (presence) => {
    
    if(!presence){
        return 'unknown state'
    }

    // const time => new Date(presence.last_changed).
    // const text = 'Last seen: ';
    // const lastSeen = () => {
    //     <TimeAgo
    //         datetime={presence.last_changed}
    //         className=""
    //     />
    // }

    const lastSeen = ()=>{
        return(
            <>
                <span>Last seen </span>
                <TimeAgo datetime={presence.last_changed}/>
            </>
        )
    } 

    // return presence.state === 'online' ? 'Active' : `Last seen ${new Date(presence.last_changed).toLocaleDateString()}`;
    return presence.state === 'online' ? 'Active' :  lastSeen() ;
}


export const PresenceDot = ({ uid }) => {

    const presence = usePresence(uid);

    return (
        <Whisper
            placement="top"
            trigger="hover"
            speaker={ 
                <Tooltip>
                    {getText(presence)}
                </Tooltip>
            }>
            
            <Badge className="cursor-pointer" style={{backgroundColor: getColor(presence)}}/>
        </Whisper>
    )
}
