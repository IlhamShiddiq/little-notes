import React, { useState, useEffect, Fragment } from "react"

import { getActiveNotes, archiveNote, pinNote, unpinNote, deleteNote } from "scripts/services/NoteService"

import AppBar from '../components/AppBar/AppBar/AppBar'
import NoteList from "../components/NoteCard/NoteList/NoteList"
import AppBarActiveNote from "scripts/components/ButtonActionGroup/ActiveNotePage/AppBarActiveNote"
import SearchBar from "scripts/components/Form/SearchBar/SearchBar"
import { useSearchParams } from "react-router-dom"

const ActiveNotePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')

    const [notes, setNotes] = useState(getActiveNotes())
    const [display, setDisplay] = useState('list')
    const [searchKeyword, setSearchKeyword] = useState(keyword ||  '')

    const headline = {
        title: 'LittleNotes',
        subTitle: 'never forget anything'
    }

    useEffect(() => {
        const searchedNotes = () => {
            const activeNotes = getActiveNotes()
            setNotes(() => activeNotes.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase())))
        }

        searchedNotes()
    }, [searchKeyword])

    const getLatestNotes = () => {
        setNotes(getActiveNotes())
    }

    const onDisplayChange = () => {
        setDisplay((prevDisplay => {
            return prevDisplay === 'list' ? 'grid' : 'list'
        }))
    }

    const onSearchKeyPress = (keyword) => {
        setSearchKeyword(keyword)
        setSearchParams({keyword})
    }

    const onSetPinnedActionClicked = (id) => {
        pinNote(id)
        getLatestNotes()
    }

    const onSetUnpinnedActionClicked = (id) => {
        unpinNote(id)
        getLatestNotes()
    }

    const onSetArchievedActionClicked = (id) => {
        archiveNote(id)
        getLatestNotes()
    }

    const onDeleteActionClicked = (id) => {
        const is_allowed = window.confirm('Are you sure want to delete this data?')

        if (is_allowed) {
            deleteNote(id)
            getLatestNotes()
        }
    }

    return (
        <Fragment>
            <AppBar 
                headline={headline}
                searchBar={<SearchBar keyword={searchKeyword} onSearchKeyPressHandler={onSearchKeyPress} />}
                barAction={
                    <AppBarActiveNote
                        display={display} 
                        onDisplayChangeHandler={onDisplayChange} />
                    } 
                />
            <NoteList 
                display={display} 
                notes={notes} 
                onDeleteActionHandler={onDeleteActionClicked} 
                onSetPinnedActionHandler={onSetPinnedActionClicked}
                onSetUnpinnedActionClicked={onSetUnpinnedActionClicked}
                onSetArchievedActionHandler={onSetArchievedActionClicked} />
        </Fragment>
    )
}

export default ActiveNotePage;
