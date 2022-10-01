import { Outlet } from "react-router-dom"
import ActionButtonGroup from "scripts/components/FloatingActionButton/ActionButtonGroup/ActionButtonGroup"

const BaseLayoutFab = ({ onLogoutClicked }) => {
    return (
        <>
            <Outlet />
            <ActionButtonGroup onLogoutClicked={onLogoutClicked} />
        </>
    )
}

export default BaseLayoutFab