import React from "react"
import './ModalHeader.scss'

const ModalHeader = ({title}) => {
    return (
        <div className="modal-content__title">
            <h1>{title}</h1>
        </div>
    )
}

export default ModalHeader
