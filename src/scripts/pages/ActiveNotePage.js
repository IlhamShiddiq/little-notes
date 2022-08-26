import React from "react"

import { getActiveNotes, addNote, archiveNote, pinNote, unpinNote, deleteNote } from "scripts/services/NoteService"
import autoBind from "auto-bind"

import AppBar from '../components/AppBar/AppBar/AppBar'
import NoteList from "../components/NoteCard/NoteList/NoteList"
import AppBarActiveNote from "scripts/components/ButtonActionGroup/ActiveNotePage/AppBarActiveNote"
import SearchBar from "scripts/components/Form/SearchBar/SearchBar"
import { useSearchParams } from "react-router-dom"

const ActiveNotePageWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')

    const changeSearchParams = keyword => {
      setSearchParams({ keyword });
    }

    return (
        <ActiveNotePage
            defaultKeyword={keyword}
            changeSearchParams={changeSearchParams} />
    )
}

class ActiveNotePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: getActiveNotes(),
            display: 'list',
            searchKeyword: this.props.defaultKeyword ||  '',
            headline: {
                title: 'LittleNotes',
                subTitle: 'never forget anything'
            }
        }

        autoBind(this)
    }

    getLatestNotes() {
        this.setState(() => {
            return {
                notes: getActiveNotes()
            }
        })
    }

    onDisplayChange() {
        this.setState(prevState => {
            const latestDisplay = prevState.display === 'list' ? 'grid' : 'list'

            return {
                display: latestDisplay
            }
        })
    }

    onSearchKeyPress(keyword) {
        this.setState(() => {
            return {
                searchKeyword: keyword
            }
        })

        this.props.changeSearchParams(keyword)
    }

    onCreateNoteSubmitted({title, body}) {
        addNote({title, body})
        this.getLatestNotes()
    }

    onSetPinnedActionClicked(id) {
        pinNote(id)
        this.getLatestNotes()
    }

    onSetUnpinnedActionClicked(id) {
        unpinNote(id)
        this.getLatestNotes()
    }

    onSetArchievedActionClicked(id) {
        archiveNote(id)
        this.getLatestNotes()
    }

    onDeleteActionClicked(id) {
        const is_allowed = window.confirm('Are you sure want to delete this data?')

        if (is_allowed) {
            deleteNote(id)
            this.getLatestNotes()
        }
    }

    render() {
        const notes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase()))
        
        return (
            <React.Fragment>
                <AppBar 
                    headline={this.state.headline}
                    searchBar={<SearchBar keyword={this.state.searchKeyword} onSearchKeyPressHandler={this.onSearchKeyPress} />}
                    barAction={
                        <AppBarActiveNote
                            display={this.state.display} 
                            onDisplayChangeHandler={this.onDisplayChange} />
                        } 
                    />
                <NoteList 
                    display={this.state.display} 
                    notes={notes} 
                    onDeleteActionHandler={this.onDeleteActionClicked} 
                    onSetPinnedActionHandler={this.onSetPinnedActionClicked}
                    onSetUnpinnedActionClicked={this.onSetUnpinnedActionClicked}
                    onSetArchievedActionHandler={this.onSetArchievedActionClicked} />
            </React.Fragment>
        )
    }
}

export default ActiveNotePageWrapper;
