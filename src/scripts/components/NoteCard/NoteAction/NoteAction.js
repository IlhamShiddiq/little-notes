import React, { useContext } from "react"
import './NoteAction.scss'

import PropTypes from 'prop-types'
import ThemeContext from "scripts/contexts/ThemeContext"

const NoteAction = ({dataId, label, onClickHandler = () => {}}) => {
    const { theme } = useContext(ThemeContext)

    return (
        <button className={`note-action ${theme}-note-action`} onClick={() => onClickHandler(dataId)}>{label}</button>
    )
}

NoteAction.propTypes = {
    dataId: PropTypes.string,
    label: PropTypes.any.isRequired,
    onClickHandler: PropTypes.func,
}

export default NoteAction
