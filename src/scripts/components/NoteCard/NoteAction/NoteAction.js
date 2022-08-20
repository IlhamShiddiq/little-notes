import React from "react"
import './NoteAction.scss'

const NoteAction = ({dataId, label, isPinned = false, onClickHandler}) => {
    return (
        <button className={`note-action ${isPinned ? 'pinned-button' : ''}`} onClick={() => onClickHandler(dataId)}>{label}</button>
    )
}

export default NoteAction
