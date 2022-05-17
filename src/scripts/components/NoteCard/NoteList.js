import React from "react"

import NoteItem from "./NoteItem"
import EmptyStateEntry from "../Utils/EmptyStateEntry";

const NoteList = ({display, isArchieved = false, notes, onDeleteActionHandler, onSetPinnedActionHandler, onSetArchievedActionHandler}) => {
    const displayClass = `note-list__body ${display}-display ${isArchieved ? 'full-width' : ''}`;
    const noteEntries = notes.filter(note => note.isArchieved === isArchieved)

    return (
        <div className="note-list">
            <div className={displayClass}>
                {
                    noteEntries.length > 0 ? noteEntries.map(note => (
                        <NoteItem 
                            key={note.id} 
                            isArchieved={isArchieved} 
                            {...note} 
                            onDeleteActionHandler={onDeleteActionHandler} 
                            onSetPinnedActionHandler={onSetPinnedActionHandler} 
                            onSetArchievedActionHandler={onSetArchievedActionHandler} />
                    )) : <EmptyStateEntry />
                }
            </div>
        </div>
    )
}

export default NoteList
