import React, {useState, useEffect, Fragment} from "react"

import { getArchivedNotes, unarchiveNote, deleteNote } from "scripts/services/NoteService"
import { confirmAlert } from "react-confirm-alert"
import { toast } from 'react-toastify'
import 'react-confirm-alert/src/react-confirm-alert.css'

import AppBar from '../components/AppBar/AppBar/AppBar'
import AppBarArchiveNote from "scripts/components/ButtonActionGroup/ArchiveNotePage/AppBarArchiveNote"
import SearchBar from "scripts/components/Form/SearchBar/SearchBar"
import NoteList from "../components/NoteCard/NoteList/NoteList"
import { useSearchParams } from "react-router-dom"
import CustomConfirmationDialog from "scripts/components/CustomAlert/CustomConfirmationDialog/CustomConfirmationDialog"

const ArchivedNotePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')

    const [notes, setNotes] = useState(getArchivedNotes())
    const[display, setDisplay] = useState('list')
    const [searchKeyword, setSearchKeyword] = useState(keyword ||  '')

    const headline = {
        title: 'LittleNotes',
        subTitle: 'archived notes'
    }

    useEffect(() => {
        const searchedNotes = () => {
            const archivedNotes = getArchivedNotes()
            setNotes(() => archivedNotes.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase())))
        }

        searchedNotes()
    }, [searchKeyword])

    const getLatestNotes = () => {
        setNotes(getArchivedNotes())
    }

    const onDisplayChange = () => {
        setDisplay((prevDisplay) => {
            return prevDisplay === 'list' ? 'grid' : 'list'
        })
    }

    const onSearchKeyPress = (keyword) => {
        setSearchKeyword(keyword)
        setSearchParams({ keyword })
    }

    const onSetUnarchieveActionClicked = (id) => {
        confirmAlert({
            overlayClassName: 'confirmation-alert-overlay-light',
            customUI: ({ onClose }) => {
                return <CustomConfirmationDialog 
                    message='Are you sure want to unarchive this note?'
                    onClose={onClose} 
                    onClickDeleteAccepted={() => {
                        unarchiveNote(id)
                        getLatestNotes()
                        onClose()
                        toast.success('Note unarchived successfully!');
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
                    <AppBarArchiveNote
                        display={display} 
                        onDisplayChangeHandler={onDisplayChange} />
                    } 
                />
            <NoteList 
                display={display} 
                isArchieved={true}
                notes={notes} 
                onSetUnarchieveActionHandler={onSetUnarchieveActionClicked}
                onDeleteActionHandler={onDeleteActionClicked} />
        </Fragment>
    )
}

export default ArchivedNotePage