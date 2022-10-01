import React, { Fragment } from "react"

import PropTypes from 'prop-types'
import NoteAction from "scripts/components/NoteCard/NoteAction/NoteAction"
import { Link } from 'react-router-dom'
import { FaTrash, FaArchive, FaEye } from 'react-icons/fa'

const CardItemActiveNote = ({id, onDeleteActionHandler, onSetArchievedActionHandler}) => {
    return (
        <Fragment>
            <Link to={`/detail/${id}`}>
                <NoteAction label={<FaEye size={15} />} />
            </Link>
            
            <NoteAction label={<FaArchive size={15} />} onClickHandler={onSetArchievedActionHandler} dataId={id} />
            <NoteAction label={<FaTrash size={15} />} onClickHandler={onDeleteActionHandler} dataId={id} />
        </Fragment>
    )
}

CardItemActiveNote.propTypes = {
    id: PropTypes.string.isRequired,
    onDeleteActionHandler: PropTypes.func.isRequired,
    onSetArchievedActionHandler: PropTypes.func.isRequired,
}

export default CardItemActiveNote