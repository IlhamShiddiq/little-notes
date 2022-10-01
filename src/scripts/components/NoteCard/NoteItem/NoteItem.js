import React from "react"
import './NoteItem.js.scss'

import PropTypes from 'prop-types'
import { setLocalDate } from "scripts/helpers/DateTime/DateTimeHelper"
import parser from 'html-react-parser'

const NoteItem = ({title, body, createdAt, buttonAction}) => {
    return (
        <div className="note-item">
            <div className="note-item__body">
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
    isArchieved: PropTypes.bool.isRequired,
    buttonAction: PropTypes.element.isRequired,
}

export default NoteItem
