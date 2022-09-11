import React, { Fragment } from "react"

import { addNote } from "scripts/services/NoteService"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

import AppBar from "scripts/components/AppBar/AppBar/AppBar"
import AppBarAddNote from "scripts/components/ButtonActionGroup/AddNotePage/AppBarAddNote"
import FormInput from "scripts/components/Form/FormInput/FormInput"
import { FaPlus } from "react-icons/fa"

const setHeadline = () => {
    return {
        title: 'LittleNotes',
        subTitle: 'create the new one',
        subTitleIcon: <FaPlus />
    }
}

const submitData = ({title, body}) => {
    addNote({title, body})
    toast.success('Note added successfully!');
}

const AddNotePage = () => {
    const navigate = useNavigate()

    const onFormSubmit = ({title, body}) => {
        submitData({title, body})
        navigate('/')
    }

    return (
        <Fragment>
            <AppBar
                headline={setHeadline()}
                barAction={<AppBarAddNote />} />
            <FormInput propOnFormSubmit={onFormSubmit} />
        </Fragment>
    )
}

export default AddNotePage