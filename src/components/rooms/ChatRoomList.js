import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Nav } from 'rsuite';
import { useRooms } from '../../context/rooms.context';
import { RoomItem } from './RoomItem';

export const ChatRoomList = ({aboveElHeight}) => {

    const rooms = useRooms();
    // console.log('rooms: from ChatRoomList:',rooms);
    const location = useLocation();

    return (
        <Nav
            appearance="subtle"
            vertical
            reversed
            className="overflow-y-scroll custom-scroll"
            style={{
                height: `calc(100% - ${aboveElHeight}px)`
            }}
            activeKey={location.pathname}
        >
            {/* if no rooms */}
            {!rooms && (
                <Loader center vertical content="Loading Rooms..." speed="slow" size="md"/>
            )}

            {rooms && rooms.length > 0 && rooms.map(room => 
                (
                    <Nav.Item
                        componentClass={Link}
                        to={`/chat/${room.id}`}
                        key={room.id}
                        eventKey={`/chat/${room.id}`}
                        >
                        <RoomItem room={room}/>
                    </Nav.Item> 
                )
            )}

        </Nav>
    )
}
