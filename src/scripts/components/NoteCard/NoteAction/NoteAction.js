import React from "react"
import './NoteAction.scss'

import PropTypes from 'prop-types'

const NoteAction = ({dataId, label, isPinned = false, onClickHandler = () => {}}) => {
    return (
        <button className={`note-action ${isPinned ? 'pinned-button' : ''}`} onClick={() => onClickHandler(dataId)}>{label}</button>
    )
}

NoteAction.propTypes = {
    dataId: PropTypes.number,
    label: PropTypes.any.isRequired,
    isPinned: PropTypes.bool,
    onClickHandler: PropTypes.func,
}

export default NoteAction
