import React, { useEffect, useRef, useState } from 'react'
import { Divider } from 'rsuite'
import { CreateRoomBtnModal } from './CreateRoomBtnModal'
import { DashboardToggle } from './dashboard/DashboardToggle'
import { ChatRoomList } from './rooms/ChatRoomList'

export const SideBar = () => {

    const topSideBarRef = useRef();
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if(topSideBarRef.current){
            setHeight(topSideBarRef.current.scrollHeight)
        }
    }, [topSideBarRef])

    return (
        <div className="h-100 pt-2">
            <div ref={topSideBarRef}>
                <DashboardToggle />
                <Divider />
                <CreateRoomBtnModal />
                <Divider>
                    Join Conversations
                </Divider>

            </div>
            {/* <Divider /> */}
            <ChatRoomList aboveElHeight={height}/>
        </div>
    )
}
