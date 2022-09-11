import React, { Fragment, useState } from "react"
import './FormInput.scss'

import PropTypes from 'prop-types'
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const FormInput = ({propTitle, propBody, propOnFormSubmit}) => {
    const [title, setTitle] = useState(propTitle || '')
    const [editorState, setEditorState] = useState(propBody || EditorState.createEmpty())
    const [limitChar, setLimitChar] = useState(propTitle ? propTitle.length : 0)
    const [titleInputStyle, setTitleInputStyle] = useState('form-input__fillable')
    const [bodyInputStyle, setBodyInputStyle] = useState('form-input__fillable')

    const onEditorStateChange = (editorState) => {
        const convertedContent = convertToHTML(editorState.getCurrentContent())

        setEditorState(editorState)
        setBodyInputStyle((convertedContent.length >= 7) ? 'form-input__fillable' : '')
    }

    const onTitleInputChange = (event) => {
        let [title, titleInputStyle] = [event.target.value, 'form-input__fillable']

        if (title.length > 50) {
            title = title.substr(0, 50)
            titleInputStyle = 'form-input__nonfillable'
        }

        setTitle(title)
        setLimitChar(title.length)
        setTitleInputStyle(titleInputStyle)
    }

    const onFormSubmit = event => {
        event.preventDefault()

        const body = convertToHTML(editorState.getCurrentContent())

        if (!title.length) setTitleInputStyle('form-input__nonfillable')
        if (!(body.length - 7)) setBodyInputStyle('form-input__nonfillable')

        if (title && (body.length - 7)) {
            propOnFormSubmit({
                title,
                body: convertToHTML(editorState.getCurrentContent())
            })
        }
    }

    return (
        <Fragment>
            <div className="form-input">
                <div className="form-input__wrapper">
                    <form onSubmit={onFormSubmit}>
                        <div className="form-input__display">
                            <label className="form-input__label full-width text-right">Limit {limitChar}/50</label>
                            <input className={titleInputStyle} type='text' placeholder="note's title/subject" onChange={onTitleInputChange} value={title} />
                        </div>
                        <div className="form-input__display">
                            <div className={`text-editor ${bodyInputStyle}`}>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChange}
                                placeholder="your note's description"
                                />
                            </div>
                        </div>
                        <div className="form-input__display">
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

FormInput.propTypes = {
    title: PropTypes.string,
    body: PropTypes.any,
    onFormSubmit: PropTypes.func.isRequired,
}

export default FormInput