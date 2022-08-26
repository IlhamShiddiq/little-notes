import React from "react"

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonAction from "../../AppBar/ButtonAction/ButtonAction"
import { FiPlus, FiArchive, FiGrid, FiList } from "react-icons/fi"

const AppBarActiveNote = ({display, onDisplayChangeHandler}) => {
    return (
        <React.Fragment>
            <Link to="/add">
                <ButtonAction label={<FiPlus size={50} />} />
            </Link>
            <Link to="/archived">
                <ButtonAction label={<FiArchive size={50} />} />
            </Link>

            <ButtonAction label={display === 'list' ? <FiGrid size={50} /> : <FiList size={50} />} onClickHandler={onDisplayChangeHandler} />
        </React.Fragment>
    )
}

AppBarActiveNote.propTypes = {
    display: PropTypes.string.isRequired,
    onDisplayChangeHandler: PropTypes.func.isRequired,
}

export default AppBarActiveNote