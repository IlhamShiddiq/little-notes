import React, { Fragment, useContext } from "react"

import { addNote } from "scripts/data-resource/note/note-api"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { FaPlus } from "react-icons/fa"
import { CreateNotePageHeader} from "scripts/contents/page-header-content"
import { NotificationContent } from "scripts/contents/notification-content"

import AppBar from "scripts/components/AppBar/AppBar/AppBar"
import AppBarAddNote from "scripts/components/ButtonActionGroup/AddNotePage/AppBarAddNote"
import FormInput from "scripts/components/Form/FormInput/FormInput"
import LocaleContext from "scripts/contexts/LocaleContext"

const setHeadline = (locale) => {
    return {
        title: 'LittleNotes',
        subTitle: CreateNotePageHeader[locale].subtitle,
        subTitleIcon: <FaPlus />
    }
}

const submitData = async ({title, body, locale}) => {
    await addNote({title, body})
    toast.success(NotificationContent[locale].success_add_note)
}

const AddNotePage = () => {
    const navigate = useNavigate()
    const { locale } = useContext(LocaleContext)

    const onFormSubmit = async ({title, body}) => {
        await submitData({title, body, locale})
        navigate('/')
    }

    return (
        <Fragment>
            <AppBar
                headline={setHeadline(locale)}
                barAction={<AppBarAddNote />} />
            <FormInput propOnFormSubmit={onFormSubmit} />
        </Fragment>
    )
}

export default AddNotePage