import React from "react"
import './NoteAction.scss'

import PropTypes from 'prop-types'

const NoteAction = ({dataId, label, onClickHandler = () => {}}) => {
    return (
        <button className={`note-action`} onClick={() => onClickHandler(dataId)}>{label}</button>
    )
}

NoteAction.propTypes = {
    dataId: PropTypes.string,
    label: PropTypes.any.isRequired,
    onClickHandler: PropTypes.func,
}

export default NoteAction
