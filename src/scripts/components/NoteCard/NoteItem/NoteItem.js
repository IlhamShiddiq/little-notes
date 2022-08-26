import React from "react"
import './NoteItem.js.scss'

import PropTypes from 'prop-types'
import { setLocalDate } from "scripts/services/NoteService"
import parser from 'html-react-parser'

const NoteItem = ({title, body, createdAt, isPinned, isArchieved, buttonAction}) => {
    const bodyClass = (isPinned && !isArchieved) ? 'note-item__body pinned-note' : 'note-item__body'

    return (
        <div className="note-item">
            <div className={bodyClass}>
                <h1>{title}</h1>
                {parser(body)}
                <p className="note-item__info">{setLocalDate(createdAt)}</p>
                <div className="note-item__action">
                    {buttonAction}
                </div>
            </div>
        </div>
    )
}

NoteItem.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isPinned: PropTypes.bool.isRequired,
    isArchieved: PropTypes.bool.isRequired,
    buttonAction: PropTypes.element.isRequired,
}

export default NoteItem
