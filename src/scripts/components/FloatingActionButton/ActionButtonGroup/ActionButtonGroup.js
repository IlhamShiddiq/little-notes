import React from "react"
import './ActionButtonGroup.scss'

import ActionButton from "../ActionButton/ActionButton"
import { FaMoon } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"

const ActionButtonGroup = ({ onLogoutClicked }) => {
    return (
        <div className="fab__action-group">
            <div className="fab__action-container">
                <div className="fab__container">
                    <ActionButton icon={<FaMoon />} />
                    <ActionButton icon="id" />
                    <ActionButton icon={<FiLogOut />} clickActionHandler={onLogoutClicked} />
                </div>
            </div>
        </div>
    )
}

export default ActionButtonGroup