import React from "react"
import './ArchievedNoteModal.scss'

import ModalHeader from "../ModalHeader/ModalHeader"
import NoteList from "../../NoteCard/NoteList/NoteList"
import ModalButtonClose from "../ModalButtonClose/ModalButtonClose"

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
