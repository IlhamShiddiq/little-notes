import React from "react"
import ModalHeader from "./ModalHeader"
import NoteList from "../NoteCard/NoteList"
import ModalButtonClose from "./ModalButtonClose"

const ArchievedNoteModal = ({overlayClickHandler, notes, onSetArchievedActionHandler, onDeleteActionHandler}) => {
    const countData = notes.filter(note => note.isArchieved === true).length
    const title = `Archieved Notes[${countData}]`

    return (
        <div className="modal">
            <div className="modal-content">
                <ModalButtonClose overlayClickHandler={overlayClickHandler} />

                <div className="modal-content__body">
                    <ModalHeader title={title} />
                    <div className="modal-content__content overflow-y-scroll">
                        <NoteList 
                            isArchieved={true} 
                            notes={notes} 
                            onSetArchievedActionHandler={onSetArchievedActionHandler} 
                            onDeleteActionHandler={onDeleteActionHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArchievedNoteModal
