import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ModalButtonClose = ({overlayClickHandler}) => {
    return (
        <button className="close-button" onClick={overlayClickHandler}>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
    )
}

export default ModalButtonClose
