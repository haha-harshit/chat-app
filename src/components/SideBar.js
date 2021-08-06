import React from 'react'
import { Divider } from 'rsuite'
import { CreateRoomBtnModal } from './CreateRoomBtnModal'
import { DashboardToggle } from './dashboard/DashboardToggle'

export const SideBar = () => {
    return (
        <div className="h-100 pt-2">
            <div>
                <DashboardToggle />
                <Divider />
                <CreateRoomBtnModal />
            </div>
            <Divider />
            This is Footer
        </div>
    )
}
