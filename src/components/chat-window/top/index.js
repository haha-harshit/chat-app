import React from 'react'
import { useCurrentRoom } from '../../../context/current-room.context'

export const ChatTop = () => {

    const name = useCurrentRoom(v => v.name)

    return (
        <div>
            <h2 className="text-center">{name}</h2>
        </div>
    )
};

export const MemoizedChatTop = React.memo(ChatTop);
