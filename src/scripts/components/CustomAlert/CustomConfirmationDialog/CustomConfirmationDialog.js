import React from 'react'
import './CustomConfirmationDialog.scss'

const CustomConfirmationDialog = ({message, onClose, onClickDeleteAccepted}) => {
    return (
        <div className='confirmation-alert'>
            <h1>{message}</h1>
            <button className='confirmation-alert__reject-button' onClick={onClose}>No</button>
            <button className='confirmation-alert__accept-button' onClick={onClickDeleteAccepted}>Yes</button>
        </div>
    )
}

export default CustomConfirmationDialog