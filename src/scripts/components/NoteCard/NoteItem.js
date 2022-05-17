import React from "react"

import NoteAction from "./NoteAction"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NoteItem = ({id, title, body, createdAt, isArchieved, isPinned, onDeleteActionHandler, onSetPinnedActionHandler, onSetArchievedActionHandler}) => {
    const pinActionButton = !isArchieved ? <NoteAction label={<FontAwesomeIcon icon="fa-solid fa-map-pin" />} onClickHandler={onSetPinnedActionHandler}  dataId={id} isPinned={isPinned} /> : null
    const archieveActionButton = isArchieved ? 'fa-solid fa-box-open' : 'fa-solid fa-box-archive'

    const bodyClass = isPinned ? 'note-item__body pinned-note' : 'note-item__body'

    return (
        <div className="note-item">
            <div className={bodyClass}>
                <h1>{title}</h1>
                <p className="note-item__content">{body}</p>
                <p className="note-item__info">{setLocalDate(createdAt)}</p>
                <div className="note-item__action">
                    {pinActionButton}
                    <NoteAction label={<FontAwesomeIcon icon={archieveActionButton} />} onClickHandler={onSetArchievedActionHandler} dataId={id} />
                    <NoteAction label={<FontAwesomeIcon icon="fa-solid fa-trash" />} onClickHandler={onDeleteActionHandler} dataId={id} />
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
