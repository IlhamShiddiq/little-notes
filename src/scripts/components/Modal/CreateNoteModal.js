import React from "react"
import ModalHeader from "./ModalHeader"
import ModalButtonClose from "./ModalButtonClose"

class CreateNoteModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: '',
            warningTextClass: 'limit-char-warning display-hide'
        }

        this.limitTitleLength = this.limitTitleLength.bind(this)
        this.onBodyChange = this.onBodyChange.bind(this)
        this.onCreateNote = this.onCreateNote.bind(this)
    }

    limitTitleLength(event) {
        const titleInput = event.target.value
        let [title, warningTextClass] = ['', '']
        
        if (titleInput.length > 30) {
            title = titleInput.substring(0, 30)
            warningTextClass = 'limit-char-warning'
        } else {
            title = titleInput
            warningTextClass = 'limit-char-warning display-hide'
        }

        this.setState(() => {
            return {
                title: title,
                warningTextClass: warningTextClass
            }
        })
    }

    onBodyChange(event) {
        this.setState(prevState => {
            return {
                ...prevState,
                body: event.target.value
            }
        })
    }

    onCreateNote(event) {
        event.preventDefault()
        this.props.onCreateNoteSubmittedHandler(this.state)
    }

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <ModalButtonClose overlayClickHandler={this.props.overlayClickHandler} />
    
                    <div className="modal-content__body">
                        <ModalHeader title="Add Notes" />
                        <div className="modal-content__content">
                            <form onSubmit={this.onCreateNote}>
                                <div className="form-control">
                                    <p>Limit {this.state.title.length}/30</p>
                                    <input type="text" placeholder="note's title/subject" value={this.state.title} onChange={this.limitTitleLength} />
                                    <p className={this.state.warningTextClass}>Limit character reached</p>
                                </div>
                                <div className="form-control">
                                    <textarea rows="8" placeholder="your note's description" onChange={this.onBodyChange}></textarea>
                                </div>
                                <div className="form-control">
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateNoteModal
