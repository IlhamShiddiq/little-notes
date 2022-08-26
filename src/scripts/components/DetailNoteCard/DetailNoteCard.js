import React from "react"
import './DetailNoteCard.scss'

import PropTypes from 'prop-types'
import parser from 'html-react-parser'

const DetailNoteCard = ({body}) => {
    return (
        <React.Fragment>
            <div className="note-detail">
                <div className="note-detail__body">
                    {parser(body)}
                </div>
            </div>
        </React.Fragment>
    )
}

DetailNoteCard.propTypes = {
    body: PropTypes.string.isRequired
}

export default DetailNoteCard