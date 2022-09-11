import React, { Fragment } from "react"
import './DetailNoteCard.scss'

import PropTypes from 'prop-types'
import parser from 'html-react-parser'

const DetailNoteCard = ({body}) => {
    return (
        <Fragment>
            <div className="note-detail">
                <div className="note-detail__body">
                    {parser(body)}
                </div>
            </div>
        </Fragment>
    )
}

DetailNoteCard.propTypes = {
    body: PropTypes.string.isRequired
}

export default DetailNoteCard