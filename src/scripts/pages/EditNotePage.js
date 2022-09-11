import React, { Fragment } from "react";

import { useParams, useNavigate } from "react-router-dom"
import { editNote, getNote } from "scripts/services/NoteService"
import { toast } from 'react-toastify'

import AppBar from "scripts/components/AppBar/AppBar/AppBar"
import AppBarAddNote from "scripts/components/ButtonActionGroup/AddNotePage/AppBarAddNote"
import FormInput from "scripts/components/Form/FormInput/FormInput"
import htmlToDraft from 'html-to-draftjs'
import { ContentState, EditorState } from "draft-js"
import { FaPenAlt } from "react-icons/fa"

const setHeadline = () => {
    return {
        title: 'LittleNotes',
        subTitle: 'modify note',
        subTitleIcon: <FaPenAlt />
    }
}

const getDetail = (id) => {
    return getNote(id)
}

const edtData = (id, title, body) => {
    editNote({id, title, body})
    toast.success('Note edited successfully!');
}

const setBodyContent = body => {
    const convertedBodyContent = htmlToDraft(body)
    const { contentBlocks, entityMap } = convertedBodyContent;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
}

const EditNotePage = () => {
    const { id } = useParams()
    const note = getDetail(Number(id))
    const navigate = useNavigate()

    const onFormSubmit = ({title, body}) => {
        edtData(Number(id), title, body)
        navigate(-1)
    }

    return (
        <Fragment>
            <AppBar
                headline={setHeadline()}
                barAction={<AppBarAddNote />} />
            <FormInput
                propTitle={note.title}
                propBody={setBodyContent(note.body)}
                propOnFormSubmit={onFormSubmit} />
        </Fragment>
    )
}

export default EditNotePage