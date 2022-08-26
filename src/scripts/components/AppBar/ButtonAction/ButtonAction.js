import React from "react"
import './ButtonAction.scss'

import PropTypes from 'prop-types'

const ButtonAction = ({label, onClickHandler}) => {
    return (
        <button className="btn-action" onClick={onClickHandler}>{label}</button>
    )
}

ButtonAction.propTypes = {
    label: PropTypes.any.isRequired,
    onClickHandler: PropTypes.func,
}

export default ButtonAction
