import React, { useContext } from "react"
import './ActionButton.scss'
import ThemeContext from "scripts/contexts/ThemeContext"

const ActionButton = ({icon, clickActionHandler}) => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className="fab__action-button">
            <button className={`fab__button-${theme}`} onClick={clickActionHandler}>{icon}</button>
        </div>
    )
}

export default ActionButton