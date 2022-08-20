import React from "react"
import './NoteList.scss'

import NoteItem from "../NoteItem/NoteItem"
import EmptyStateEntry from "../../Utils/EmptyStateEntry/EmptyStateEntry"

const NoteList = ({display, isArchieved = false, notes, onDeleteActionHandler, onSetPinnedActionHandler, onSetArchievedActionHandler}) => {
    const displayClass = `note-list__body ${display}-display ${isArchieved ? 'full-width' : ''}`;
    const noteEntries = notes.filter(note => note.isArchieved === isArchieved)

    return (
        <div className="note-list">
            {
                noteEntries.length > 0 ? (
                    <div className={displayClass}>
                        {
                            noteEntries.map(note => (
                                <NoteItem 
                                    key={note.id} 
                                    isArchieved={isArchieved} 
                                    {...note} 
                                    onDeleteActionHandler={onDeleteActionHandler} 
                                    onSetPinnedActionHandler={onSetPinnedActionHandler} 
                                    onSetArchievedActionHandler={onSetArchievedActionHandler}
                                />
                            ))
                        }
                    </div>
                ) : <EmptyStateEntry />
            }
        </div>
    )
}

export default NoteList
