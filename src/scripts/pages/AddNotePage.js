import React from "react"

import { addNote } from "scripts/services/NoteService"
import { useNavigate } from "react-router-dom"

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
}

const AddNotePage = () => {
    const navigate = useNavigate()

    const onFormSubmit = ({title, body}) => {
        submitData({title, body})
        navigate('/')
    }

    return (
        <React.Fragment>
            <AppBar
                headline={setHeadline()}
                barAction={<AppBarAddNote />} />
            <FormInput onFormSubmit={onFormSubmit} />
        </React.Fragment>
    )
}

export default AddNotePage