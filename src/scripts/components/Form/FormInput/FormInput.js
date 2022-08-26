import React from "react"
import './FormInput.scss'

import PropTypes from 'prop-types'
import autoBind from "auto-bind"
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class FormInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.title || '',
            editorState: this.props.body || EditorState.createEmpty(),
            limitChar: this.props.title ? this.props.title.length : 0,
            titleInputStyle: 'form-input__fillable',
            bodyInputStyle: 'form-input__fillable',
        }

        autoBind(this)
    }

    onEditorStateChange = (editorState) => {
        const convertedContent = convertToHTML(editorState.getCurrentContent())
        this.setState({
            editorState,
            bodyInputStyle: (convertedContent.length >= 7) ? 'form-input__fillable' : ''
        })
    }

    onTitleInputChange = event => {
        let [title, titleInputStyle] = [event.target.value, 'form-input__fillable']

        if (title.length > 50) {
            title = title.substr(0, 50)
            titleInputStyle = 'form-input__nonfillable'
        }

        this.setState(() => {
            return {
                title: title,
                limitChar: title.length,
                titleInputStyle
            }
        })
    }

    onFormSubmit = event => {
        event.preventDefault()

        const [title, body] = [this.state.title, convertToHTML(this.state.editorState.getCurrentContent())]

        if (!title.length) this.setState(() => {
            return {
                titleInputStyle: 'form-input__nonfillable'
            }
        })

        if (!(body.length - 7)) this.setState(() => {
            return {
                bodyInputStyle: 'form-input__nonfillable'
            }
        })

        if (title && (body.length - 7)) {
            this.props.onFormSubmit({
                title: this.state.title,
                body: convertToHTML(this.state.editorState.getCurrentContent())
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-input">
                    <div className="form-input__wrapper">
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-input__display">
                                <label className="form-input__label full-width text-right">Limit {this.state.limitChar}/50</label>
                                <input className={this.state.titleInputStyle} type='text' placeholder="note's title/subject" onChange={this.onTitleInputChange} value={this.state.title} />
                            </div>
                            <div className="form-input__display">
                                <div className={`text-editor ${this.state.bodyInputStyle}`}>
                                <Editor
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
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
            </React.Fragment>
        )
    }
}

FormInput.propTypes = {
    title: PropTypes.string,
    body: PropTypes.any,
    onFormSubmit: PropTypes.func.isRequired,
}

export default FormInput