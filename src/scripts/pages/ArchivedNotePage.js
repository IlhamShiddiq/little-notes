import React from "react"

import { getArchivedNotes, unarchiveNote, deleteNote } from "scripts/services/NoteService"
import autoBind from "auto-bind"

import AppBar from '../components/AppBar/AppBar/AppBar'
import AppBarArchiveNote from "scripts/components/ButtonActionGroup/ArchiveNotePage/AppBarArchiveNote"
import SearchBar from "scripts/components/Form/SearchBar/SearchBar"
import NoteList from "../components/NoteCard/NoteList/NoteList"
import { useSearchParams } from "react-router-dom"

const ArchivedNotePageWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')

    const changeSearchParams = keyword => {
      setSearchParams({ keyword });
    }

    return (
        <ArchivedNotePage 
            defaultKeyword={keyword}
            changeSearchParams={changeSearchParams} />
    )
}

class ArchivedNotePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: getArchivedNotes(),
            display: 'list',
            searchKeyword: this.props.defaultKeyword ||  '',
            headline: {
                title: 'LittleNotes',
                subTitle: 'archived notes'
            }
        }

        autoBind(this)
    }

    getLatestNotes() {
        this.setState(() => {
            return {
                notes: getArchivedNotes()
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

    onSetUnarchieveActionClicked(id) {
        unarchiveNote(id)
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
                        <AppBarArchiveNote
                            display={this.state.display} 
                            onDisplayChangeHandler={this.onDisplayChange} />
                        } 
                    />
                <NoteList 
                    display={this.state.display} 
                    isArchieved={true}
                    notes={notes} 
                    onSetUnarchieveActionHandler={this.onSetUnarchieveActionClicked}
                    onDeleteActionHandler={this.onDeleteActionClicked} />
            </React.Fragment>
        )
    }
}

export default ArchivedNotePageWrapper