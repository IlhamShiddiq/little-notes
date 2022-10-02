import React, { Fragment, useState, useEffect } from "react"

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonAction from "../../AppBar/ButtonAction/ButtonAction"
import { FiPlus, FiArchive, FiGrid, FiList } from "react-icons/fi"

const getWindowWidth = () => {
    const { innerWidth } = window
    return innerWidth
}

const AppBarActiveNote = ({display, onDisplayChangeHandler}) => {
    const [ windowWidth, setWindowWidth ] = useState(getWindowWidth())
    const [ isGridDisplayed, setIsGridDisplayed ] = useState(true)

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(getWindowWidth())
            setIsGridDisplayed(windowWidth > 767.98)
        }

        window.addEventListener('resize', handleWindowResize)
    }, [windowWidth])

    return (
        <Fragment>
            <Link to="/add">
                <ButtonAction label={<FiPlus size={50} />} />
            </Link>
            <Link to="/archived">
                <ButtonAction label={<FiArchive size={50} />} />
            </Link>

            {
                (isGridDisplayed) ? (
                    <ButtonAction
                        label={display === 'list' ? <FiGrid size={50} /> : <FiList size={50} />}
                        onClickHandler={onDisplayChangeHandler} />
                ) : <></>
            }
        </Fragment>
    )
}

AppBarActiveNote.propTypes = {
    display: PropTypes.string.isRequired,
    onDisplayChangeHandler: PropTypes.func.isRequired,
}

export default AppBarActiveNote