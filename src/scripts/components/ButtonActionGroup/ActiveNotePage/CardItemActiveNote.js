import React from "react"

import PropTypes from 'prop-types'
import NoteAction from "scripts/components/NoteCard/NoteAction/NoteAction"
import { Link } from 'react-router-dom'
import { ImPushpin } from 'react-icons/im'
import { FaTrash, FaArchive, FaEye, FaPen } from 'react-icons/fa'

const CardItemActiveNote = ({id, isPinned, onDeleteActionHandler, onSetPinnedActionHandler, onSetUnpinnedActionClicked, onSetArchievedActionHandler}) => {
    return (
        <React.Fragment>
            <NoteAction 
                label={<ImPushpin size={15} color="white" />} 
                onClickHandler={isPinned ? onSetUnpinnedActionClicked : onSetPinnedActionHandler}  
                dataId={id} 
                isPinned={isPinned} />

            <Link to={`/detail/${id}`}>
                <NoteAction label={<FaEye size={15} />} />
            </Link>

            <Link to={`/edit/${id}`}>
                <NoteAction label={<FaPen size={15} />} />
            </Link>
            
            <NoteAction label={<FaArchive size={15} />} onClickHandler={onSetArchievedActionHandler} dataId={id} />
            <NoteAction label={<FaTrash size={15} />} onClickHandler={onDeleteActionHandler} dataId={id} />
        </React.Fragment>
    )
}

CardItemActiveNote.propTypes = {
    id: PropTypes.number.isRequired,
    isPinned: PropTypes.bool.isRequired,
    onDeleteActionHandler: PropTypes.func.isRequired,
    onSetPinnedActionHandler: PropTypes.func.isRequired,
    onSetUnpinnedActionClicked: PropTypes.func.isRequired,
    onSetArchievedActionHandler: PropTypes.func.isRequired,
}

export default CardItemActiveNote