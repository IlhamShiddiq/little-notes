import React from "react"
import './NoteList.scss'

import PropTypes from 'prop-types'
import NoteItem from "../NoteItem/NoteItem"
import EmptyStateEntry from "../../Utils/EmptyStateEntry/EmptyStateEntry"
import CardItemActiveNote from "scripts/components/ButtonActionGroup/ActiveNotePage/CardItemActiveNote"
import CardItemArchivedNote from "scripts/components/ButtonActionGroup/ArchiveNotePage/CardItemArchivedNote"
import LoadingIndicator from "../../Utils/Loading/LoadingIndicator/LoadingIndicator"

const NoteList = ({
    display,
    isLoading,
    isArchieved = false, 
    notes, 
    onDeleteActionHandler, 
    onSetPinnedActionHandler, 
    onSetUnpinnedActionClicked, 
    onSetArchievedActionHandler, 
    onSetUnarchieveActionHandler
}) => {
    const displayClass = `note-list__body ${display}-display`

    return (
        <div className="note-list">
            {
                isLoading ? <LoadingIndicator /> : (
                    (notes.length > 0) ? (
                        <div className={displayClass}>
                            {
                                notes.map(note => (
                                    <NoteItem
                                        key={note.id}
                                        {...note}
                                        isArchieved={note.archived}
                                        buttonAction={
                                            isArchieved ?
                                                <CardItemArchivedNote
                                                    {...note}
                                                    onSetUnarchieveActionHandler={onSetUnarchieveActionHandler}
                                                    onDeleteActionHandler={onDeleteActionHandler}
                                                /> : <CardItemActiveNote
                                                    {...note}
                                                    onDeleteActionHandler={onDeleteActionHandler}
                                                    onSetPinnedActionHandler={onSetPinnedActionHandler}
                                                    onSetUnpinnedActionClicked={onSetUnpinnedActionClicked}
                                                    onSetArchievedActionHandler={onSetArchievedActionHandler}
                                                />
                                        }
                                    />
                                ))
                            }
                        </div>
                    ) : <EmptyStateEntry />
                )
            }
        </div>
    )
}

NoteList.propTypes = {
    display: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isArchieved: PropTypes.bool,
    notes: PropTypes.array.isRequired,
    onDeleteActionHandler: PropTypes.func.isRequired,
    onSetPinnedActionHandler: PropTypes.func,
    onSetUnpinnedActionClicked: PropTypes.func,
    onSetArchievedActionHandler: PropTypes.func,
    onSetUnarchieveActionHandler: PropTypes.func,
}

export default NoteList
