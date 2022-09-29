import React from "react"
import './ActionButton.scss'

const ActionButton = ({icon, clickActionHandler}) => {
    return (
        <div className="fab__action-button">
            <button onClick={clickActionHandler}>{icon}</button>
        </div>
    )
}

export default ActionButton