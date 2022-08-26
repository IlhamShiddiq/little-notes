import React from "react";

import { useParams, useNavigate } from "react-router-dom"
import { editNote, getNote } from "scripts/services/NoteService"

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
        <React.Fragment>
            <AppBar
                headline={setHeadline()}
                barAction={<AppBarAddNote />} />
            <FormInput
                title={note.title}
                body={setBodyContent(note.body)}
                onFormSubmit={onFormSubmit} />
        </React.Fragment>
    )
}

export default EditNotePage