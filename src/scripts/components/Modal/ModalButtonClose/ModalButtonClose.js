import React from "react"
import './ModalButtonClose.scss'

import { FiX } from 'react-icons/fi'

const ModalButtonClose = ({overlayClickHandler}) => {
    return (
        <button className="close-button" onClick={overlayClickHandler}>
            <FiX size={30} />
        </button>
    )
}

export default ModalButtonClose
