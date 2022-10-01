import React, { useState, useEffect, Fragment } from "react"

import { getActiveNotes, archiveNote, deleteNote } from 'scripts/data-resource/note/note-api'
import { setStorageItem, getStorageItem } from "scripts/helpers/LocalStorage/LocalStorageHelper"
import { useSearchParams } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import { toast } from 'react-toastify'
import 'react-confirm-alert/src/react-confirm-alert.css'

import AppBar from '../components/AppBar/AppBar/AppBar'
import NoteList from "../components/NoteCard/NoteList/NoteList"
import AppBarActiveNote from "scripts/components/ButtonActionGroup/ActiveNotePage/AppBarActiveNote"
import SearchBar from "scripts/components/Form/SearchBar/SearchBar"
import CustomConfirmationDialog from "scripts/components/CustomAlert/CustomConfirmationDialog/CustomConfirmationDialog"

const ActiveNotePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')

    const [notes, setNotes] = useState([])
    const [display, setDisplay] = useState(getStorageItem('display') || 'list')
    const [searchKeyword, setSearchKeyword] = useState(keyword ||  '')
    const [isLoading, setIsLoading] = useState(true)

    const headline = {
        title: 'LittleNotes',
        subTitle: 'never forget anything'
    }

    useEffect(() => {
        const getNotes = async () => {
            await getActiveNotes().then(notes => {
                setNotes(notes.data)
                setIsLoading(false)
            })
        }

        getNotes()
    }, [])

    useEffect(() => {
        const searchedNotes = async () => {
            await getActiveNotes().then(notes => {
                setNotes(() => notes.data.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase())))
                setIsLoading(false)
            })
        }

        searchedNotes()
    }, [searchKeyword])

    const getLatestNotes = async () => {
        await getActiveNotes().then(notes => {
            setNotes(notes.data)
        })
    }

    const onDisplayChange = () => {
        setDisplay((prevDisplay => {
            const display = (prevDisplay === 'list') ? 'grid' : 'list'
            setStorageItem('display', display)

            return display
        }))
    }

    const onSearchKeyPress = (keyword) => {
        setSearchKeyword(keyword)
        setSearchParams({keyword})
    }

    const onSetArchievedActionClicked = (id) => {
        confirmAlert({
            overlayClassName: 'confirmation-alert-overlay-light',
            customUI: ({ onClose }) => {
                return <CustomConfirmationDialog 
                    message='Are you sure want to archive this note?'
                    onClose={onClose}
                    onClickAccepted={async () => {
                        await archiveNote(id)
                        await getLatestNotes()
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
                    onClickAccepted={async () => {
                        await deleteNote(id)
                        await getLatestNotes()
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
                isLoading={isLoading}
                notes={notes} 
                onDeleteActionHandler={onDeleteActionClicked}
                onSetArchievedActionHandler={onSetArchievedActionClicked} />
        </Fragment>
    )
}

export default ActiveNotePage;
