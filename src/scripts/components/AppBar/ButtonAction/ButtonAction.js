import React from "react"
import './ButtonAction.scss'

const ButtonAction = ({label, onClickHandler}) => {
    return (
        <button className="btn-action" onClick={onClickHandler}>{label}</button>
    )
}

export default ButtonAction
