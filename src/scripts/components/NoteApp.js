import React from "react"

import AppBar from './AppBar/AppBar/AppBar'
import NoteList from "./NoteCard/NoteList/NoteList"
import CreateNoteModal from "./Modal/CreateNoteModal/CreateNoteModal"
import ArchievedNoteModal from "./Modal/ArchievedNoteModal/ArchievedNoteModal"
import getInitialData from "../data-resource/DATA"

class NoteApp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: getInitialData(),
            display: 'list',
            isCreateModalShown: false,
            isArchievedModalShown: false,
            searchKeyword: ''
        }

        this.onDisplayChange = this.onDisplayChange.bind(this)
        this.onCreateNoteClicked = this.onCreateNoteClicked.bind(this)
        this.onArchievedNoteClicked = this.onArchievedNoteClicked.bind(this)
        this.onSearchKeyPress = this.onSearchKeyPress.bind(this)
        this.onDeleteActionClicked = this.onDeleteActionClicked.bind(this)
        this.onSetPinnedActionClicked = this.onSetPinnedActionClicked.bind(this)
        this.onSetArchievedActionClicked = this.onSetArchievedActionClicked.bind(this)
        this.onCreateNoteSubmitted = this.onCreateNoteSubmitted.bind(this)
    }

    onDisplayChange() {
        this.setState(prevState => {
            const latestDisplay = prevState.display === 'list' ? 'grid' : 'list'

            return {
                ...prevState,
                display: latestDisplay
            }
        })
    }

    onCreateNoteClicked() {
        this.setState(prevState => {
            return {
                ...prevState,
                isCreateModalShown: !this.state.isCreateModalShown
            }
        })
    }

    onArchievedNoteClicked() {
        this.setState(prevState => {
            return {
                ...prevState,
                isArchievedModalShown: !this.state.isArchievedModalShown
            }
        })
    }

    onSearchKeyPress(keyword) {
        this.setState(() => {
            return {
                searchKeyword: keyword
            }
        })
    }

    onCreateNoteSubmitted({title, body}) {
        this.setState(prevState => {
            const updatedNotes = [
                ...prevState.notes,
                {
                    id: +new Date(),
                    title: title,
                    body: body,
                    createdAt: new Date(),
                    isArchieved: false,
                    isPinned: false
                },
            ]

            return {
                notes: updatedNotes,
                isCreateModalShown: false
            }
        })
    }

    onSetPinnedActionClicked(id) {
        const notes = this.state.notes.map(note => {
            if (note.id === id) {
                return {...note, isPinned: !note.isPinned}
            }

            return note
        }).sort((note) => note.isPinned ? -1 : 0)

        this.setState(() => {
            return {
                notes: notes
            }
        })
    }

    onSetArchievedActionClicked(id) {
        const notes = this.state.notes.map(note => {
            if (note.id === id) {
                return {...note, isArchieved: !note.isArchieved}
            }

            return note
        })

        this.setState(() => {
            return {
                notes: notes
            }
        })
    }

    onDeleteActionClicked(id) {
        const is_allowed = window.confirm('Are you sure want to delete this data?')

        if (is_allowed) {
            const notes = this.state.notes.filter(data => data.id !== id)

            this.setState(() => {
                return {
                    notes: notes
                }
            })
        }
    }

    render() {
        const notes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase()))
        const isCreateModalShown = this.state.isCreateModalShown ? <CreateNoteModal overlayClickHandler={this.onCreateNoteClicked} onCreateNoteSubmittedHandler={this.onCreateNoteSubmitted} /> : null
        const isArchievedModalShown = this.state.isArchievedModalShown ? <ArchievedNoteModal 
            overlayClickHandler={this.onArchievedNoteClicked} 
            notes={this.state.notes}
            onSetArchievedActionHandler={this.onSetArchievedActionClicked}
            onDeleteActionHandler={this.onDeleteActionClicked} /> : null
        
        return (
            <div>
                <AppBar 
                    display={this.state.display} 
                    onDisplayChangeHandler={this.onDisplayChange} 
                    onCreateNoteHandler={this.onCreateNoteClicked}
                    onArchievedNoteHandler={this.onArchievedNoteClicked}
                    onSearchKeyPressHandler={this.onSearchKeyPress} />
                <NoteList 
                    display={this.state.display} 
                    notes={notes} 
                    onDeleteActionHandler={this.onDeleteActionClicked} 
                    onSetPinnedActionHandler={this.onSetPinnedActionClicked}
                    onSetArchievedActionHandler={this.onSetArchievedActionClicked} />
                {isCreateModalShown}
                {isArchievedModalShown}
            </div>
        )
    }
}

export default NoteApp;
