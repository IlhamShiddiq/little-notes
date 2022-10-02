import React, {Fragment, useContext, useState } from "react"

import PropTypes from 'prop-types'
import { EditorState } from "draft-js"
import { convertToHTML } from "draft-convert"
import { Editor } from "react-draft-wysiwyg"
import { CreateNotePageHeader } from "scripts/contents/page-header-content"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import './FormInput.scss'

import LocaleContext from "scripts/contexts/LocaleContext"

const FormInput = ({propTitle, propBody, propOnFormSubmit}) => {
    const { locale } = useContext(LocaleContext)
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
                            <label className="form-input__label full-width text-right">
                                {CreateNotePageHeader[locale].limit_wording} {limitChar}/50
                            </label>
                            <input className={titleInputStyle}
                                   type='text'
                                   placeholder={CreateNotePageHeader[locale].title_placeholder}
                                   onChange={onTitleInputChange}
                                   value={title} />
                        </div>
                        <div className="form-input__display">
                            <div className={`text-editor ${bodyInputStyle}`}>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChange}
                                placeholder={CreateNotePageHeader[locale].body_placeholder}
                                />
                            </div>
                        </div>
                        <div className="form-input__display">
                            <button>
                                {CreateNotePageHeader[locale].button_submit}
                            </button>
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
    propOnFormSubmit: PropTypes.func.isRequired,
}

export default FormInput