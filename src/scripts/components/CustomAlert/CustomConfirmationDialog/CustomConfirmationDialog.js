import React from 'react'

import PropTypes from "prop-types"
import { ConfirmationButton } from "scripts/contents/confirmation-dialog-content"
import './CustomConfirmationDialog.scss'

const CustomConfirmationDialog = ({ locale = 'en', theme = 'light', message, onClose, onClickAccepted }) => {
    return (
        <div className='confirmation-alert'>
            <h1>{message}</h1>
            <button className={`confirmation-alert__reject-button-${theme}`} onClick={onClose}>
                {ConfirmationButton[locale].reject_button}
            </button>
            <button className={`confirmation-alert__accept-button-${theme}`} onClick={onClickAccepted}>
                {ConfirmationButton[locale].accept_button}
            </button>
        </div>
    )
}

CustomConfirmationDialog.propTypes = {
    locale: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onClickAccepted: PropTypes.func.isRequired
}

export default CustomConfirmationDialog