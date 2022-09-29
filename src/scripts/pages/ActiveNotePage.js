import React, { useState, useEffect, Fragment } from "react"

import { getActiveNotes, archiveNote, pinNote, unpinNote, deleteNote } from "scripts/services/NoteService"
import { useSearchParams } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import { toast } from 'react-toastify'
import 'react-confirm-alert/src/react-confirm-alert.css'

import AppBar from '../components/AppBar/AppBar/AppBar'
import NoteList from "../components/NoteCard/NoteList/NoteList"
import AppBarActiveNote from "scripts/components/ButtonActionGroup/ActiveNotePage/AppBarActiveNote"
import SearchBar from "scripts/components/Form/SearchBar/SearchBar"
import CustomConfirmationDialog from "scripts/components/CustomAlert/CustomConfirmationDialog/CustomConfirmationDialog"
import ActionButtonGroup from "scripts/components/FloatingActionButton/ActionButtonGroup/ActionButtonGroup"

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
        confirmAlert({
            overlayClassName: 'confirmation-alert-overlay-light',
            customUI: ({ onClose }) => {
                return <CustomConfirmationDialog 
                    message='Are you sure want to archive this note?'
                    onClose={onClose} 
                    onClickDeleteAccepted={() => {
                        archiveNote(id)
                        getLatestNotes()
                        onClose()
                        toast.success('Note archived successfully!');
                    }} />
            },
        });
    }

    const onDeleteActionClicked = (id) => {
        confirmAlert({
            overlayClassName: 'confirmation-alert-overlay-light',
            customUI: ({ onClose }) => {
                return <CustomConfirmationDialog 
                    message='Are you sure want to delete this note?'
                    onClose={onClose} 
                    onClickDeleteAccepted={() => {
                        deleteNote(id)
                        getLatestNotes()
                        onClose()
                        toast.success('Note deleted successfully!');
                    }} />
            },
        });
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
            <ActionButtonGroup />
        </Fragment>
    )
}

export default ActiveNotePage;
