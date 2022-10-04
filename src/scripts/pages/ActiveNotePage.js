import React, { useState, useEffect, useContext, Fragment } from "react"

import { getActiveNotes, archiveNote, deleteNote } from 'scripts/data-resource/note/note-api'
import { setStorageItem, getStorageItem } from "scripts/helpers/LocalStorage/LocalStorageHelper"
import { useSearchParams } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import { toast } from 'react-toastify'
import { NoteActivePageHeader } from "scripts/contents/page-header-content"
import { DeleteDialogContent, ArchiveDialogContent } from "scripts/contents/confirmation-dialog-content"
import { NotificationContent } from "scripts/contents/notification-content"
import 'react-confirm-alert/src/react-confirm-alert.css'

import AppBar from 'scripts/components/AppBar/AppBar/AppBar'
import NoteList from "scripts/components/NoteCard/NoteList/NoteList"
import AppBarActiveNote from "scripts/components/ButtonActionGroup/ActiveNotePage/AppBarActiveNote"
import SearchBar from "scripts/components/Form/SearchBar/SearchBar"
import CustomConfirmationDialog from "scripts/components/CustomAlert/CustomConfirmationDialog/CustomConfirmationDialog"
import LocaleContext from "scripts/contexts/LocaleContext"
import ThemeContext from "scripts/contexts/ThemeContext"

const ActiveNotePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    const { locale } = useContext(LocaleContext)
    const { theme } = useContext(ThemeContext)
    const [notes, setNotes] = useState([])
    const [display, setDisplay] = useState(getStorageItem('display') || 'list')
    const [searchKeyword, setSearchKeyword] = useState(keyword ||  '')
    const [isLoading, setIsLoading] = useState(true)

    const headline = {
        title: 'LittleNotes',
        subTitle: NoteActivePageHeader[locale].subtitle
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
            overlayClassName: `confirmation-alert-overlay-${theme}`,
            customUI: ({ onClose }) => {
                return <CustomConfirmationDialog
                    locale={locale}
                    theme={theme}
                    message={ArchiveDialogContent[locale].confirmation_wording}
                    onClose={onClose}
                    onClickAccepted={async () => {
                        await archiveNote(id)
                        await getLatestNotes()
                        onClose()
                        toast.success(NotificationContent[locale].success_archive_note)
                    }} />
            },
        })
    }

    const onDeleteActionClicked = (id) => {
        confirmAlert({
            overlayClassName: `confirmation-alert-overlay-${theme}`,
            customUI: ({ onClose }) => {
                return <CustomConfirmationDialog
                    locale={locale}
                    theme={theme}
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

export default ActiveNotePage
