import React from 'react'
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { ChatTop } from '../../components/chat-window/top';
import { Messages } from '../../components/chat-window/messages'
import { ChatBottom } from '../../components/chat-window/bottom'
import { useRooms } from '../../context/rooms.context';



export const Chat = () => {

    const { chatId } = useParams();
    const rooms = useRooms();

    if(!rooms){
        return <Loader center vertical size="md" content="Chat is Loading..." speed="slow"/>
    }

    const currentRooms = rooms.find(room => room.id === chatId);

    if(!currentRooms){
        return <h6 className="text-center mt-page"> Chat {chatId} not found </h6>
    }

    return (
        <>
            <div className="chat-top">
                <ChatTop />
            </div>
            <div className="chat-middle">
                <Messages />
            </div>
            <div className="chat-bottom">
                <ChatBottom />
            </div>
        </>
    )
}
