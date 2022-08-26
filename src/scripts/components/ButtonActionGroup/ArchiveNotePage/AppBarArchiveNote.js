import React from "react"

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonAction from "../../AppBar/ButtonAction/ButtonAction"
import { FiGrid, FiList } from "react-icons/fi"
import { FiArrowLeft } from "react-icons/fi"

const AppBarArchiveNote = ({display, onDisplayChangeHandler}) => {
    return (
        <React.Fragment>
            <Link to="/">
                <ButtonAction label={<FiArrowLeft size={50} />} />
            </Link>

            <ButtonAction label={display === 'list' ? <FiGrid size={50} /> : <FiList size={50} />} onClickHandler={onDisplayChangeHandler} />
        </React.Fragment>
    )
}

AppBarArchiveNote.propTypes = {
    display: PropTypes.string.isRequired,
    onDisplayChangeHandler: PropTypes.func.isRequired,
}

export default AppBarArchiveNote