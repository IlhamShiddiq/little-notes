import React from "react"

import PropTypes from 'prop-types'
import NoteAction from "scripts/components/NoteCard/NoteAction/NoteAction"
import { Link } from 'react-router-dom'
import { FaTrash, FaEye, FaUndo } from 'react-icons/fa'

const CardItemArchivedNote = ({id, onSetUnarchieveActionHandler, onDeleteActionHandler}) => {
    return (
        <React.Fragment>
            <Link to={`/detail/${id}`}>
                <NoteAction label={<FaEye size={15} />} />
            </Link>

            <NoteAction label={<FaUndo size={15} />} onClickHandler={onSetUnarchieveActionHandler} dataId={id} />
            <NoteAction label={<FaTrash size={15} />} onClickHandler={onDeleteActionHandler} dataId={id} />
        </React.Fragment>
    )
}

CardItemArchivedNote.propTypes = {
    id: PropTypes.number.isRequired,
    onSetUnarchieveActionHandler: PropTypes.func.isRequired,
    onDeleteActionHandler: PropTypes.func.isRequired,
}

export default CardItemArchivedNote