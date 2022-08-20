import React from "react"
import './NoteItem.js.scss'

import NoteAction from "../NoteAction/NoteAction"
import { ImPushpin } from 'react-icons/im'
import { FaTrash, FaArchive, FaUndoAlt } from 'react-icons/fa'

const NoteItem = ({id, title, body, createdAt, isArchieved, isPinned, onDeleteActionHandler, onSetPinnedActionHandler, onSetArchievedActionHandler}) => {
    const pinActionButton = !isArchieved ? <NoteAction label={<ImPushpin size={15} color="white" />} onClickHandler={onSetPinnedActionHandler}  dataId={id} isPinned={isPinned} /> : null
    const archieveActionButton = isArchieved ? <FaUndoAlt size={15} /> : <FaArchive size={15} />
    const bodyClass = isPinned ? 'note-item__body pinned-note' : 'note-item__body'

    return (
        <div className="note-item">
            <div className={bodyClass}>
                <h1>{title}</h1>
                <p className="note-item__content">{body}</p>
                <p className="note-item__info">{setLocalDate(createdAt)}</p>
                <div className="note-item__action">
                    {pinActionButton}
                    <NoteAction label={archieveActionButton} onClickHandler={onSetArchievedActionHandler} dataId={id} />
                    <NoteAction label={<FaTrash size={15} />} onClickHandler={onDeleteActionHandler} dataId={id} />
                </div>
            </div>
        </div>
    )
}

const setLocalDate = date => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }

    return new Date(date).toLocaleDateString("id-ID", options)
}

export default NoteItem
