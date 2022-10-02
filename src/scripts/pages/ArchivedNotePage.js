import React, {useState, useEffect, Fragment, useContext} from "react"

import { useSearchParams } from "react-router-dom"
import { getArchivedNotes, unarchiveNote, deleteNote} from "scripts/data-resource/note/note-api"
import { setStorageItem, getStorageItem } from "scripts/helpers/LocalStorage/LocalStorageHelper"
import { confirmAlert } from "react-confirm-alert"
import { toast } from 'react-toastify'
import { NoteArchivedPageHeader } from "scripts/contents/page-header-content"
import { DeleteDialogContent } from "scripts/contents/confirmation-dialog-content"
import { UnarchiveDialogContent } from "scripts/contents/confirmation-dialog-content"
import { NotificationContent } from "scripts/contents/notification-content"
import 'react-confirm-alert/src/react-confirm-alert.css'

import AppBar from '../components/AppBar/AppBar/AppBar'
import AppBarArchiveNote from "scripts/components/ButtonActionGroup/ArchiveNotePage/AppBarArchiveNote"
import SearchBar from "scripts/components/Form/SearchBar/SearchBar"
import NoteList from "../components/NoteCard/NoteList/NoteList"
import CustomConfirmationDialog from "scripts/components/CustomAlert/CustomConfirmationDialog/CustomConfirmationDialog"
import LocaleContext from "scripts/contexts/LocaleContext"

const ArchivedNotePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    const { locale } = useContext(LocaleContext)
    const [notes, setNotes] = useState([])
    const [display, setDisplay] = useState(getStorageItem('archivedDisplay') || 'list')
    const [searchKeyword, setSearchKeyword] = useState(keyword ||  '')
    const [isLoading, setIsLoading] = useState(true)

    const headline = {
        title: 'LittleNotes',
        subTitle: NoteArchivedPageHeader[locale].subtitle
    }

    useEffect(() => {
        const getNotes = async () => {
            await getArchivedNotes().then(notes => {
                setNotes(notes.data)
                setIsLoading(false)
            })
        }

        getNotes()
    }, [])

    useEffect(() => {
        const searchedNotes = async () => {
            await getArchivedNotes().then(notes => {
                setNotes(() => notes.data.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase())))
                setIsLoading(false)
            })

        }

        searchedNotes()
    }, [searchKeyword])

    const getLatestNotes = async () => {
        await getArchivedNotes().then(notes => {
            setNotes(notes.data)
        })
    }

    const onDisplayChange = () => {
        setDisplay((prevDisplay) => {
            const display = (prevDisplay === 'list') ? 'grid' : 'list'
            setStorageItem('archivedDisplay', display)

            return display
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
                    locale={locale}
                    message={UnarchiveDialogContent[locale].confirmation_wording}
                    onClose={onClose}
                    onClickAccepted={async () => {
                        await unarchiveNote(id)
                        await getLatestNotes()
                        onClose()
                        toast.success(NotificationContent[locale].success_unarchive_note)
                    }} />
            },
        })
    }

    const onDeleteActionClicked = (id) => {
        confirmAlert({
            overlayClassName: 'confirmation-alert-overlay-light',
            customUI: ({ onClose }) => {
                return <CustomConfirmationDialog
                    locale={locale}
                    message={DeleteDialogContent[locale].confirmation_wording}
                    onClose={onClose}
                    onClickAccepted={async () => {
                        await deleteNote(id)
                        await getLatestNotes()
                        onClose()
                        toast.success(NotificationContent[locale].success_delete_note)
                    }} />
            },
        })
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
                isLoading={isLoading}
                isArchieved={true}
                notes={notes} 
                onSetUnarchieveActionHandler={onSetUnarchieveActionClicked}
                onDeleteActionHandler={onDeleteActionClicked} />
        </Fragment>
    )
}

export default ArchivedNotePage