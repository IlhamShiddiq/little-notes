import React, { Fragment } from "react"

import PropTypes from 'prop-types'
import ButtonAction from "../../AppBar/ButtonAction/ButtonAction"
import { FiArrowLeft } from "react-icons/fi"

const AppBarDetailNote = ({onBackActionHandler}) => {
    return (
        <Fragment>
            <ButtonAction label={<FiArrowLeft size={50} />} onClickHandler={onBackActionHandler} />
        </Fragment>
    )
}

AppBarDetailNote.propTypes = {
    onBackActionHandler: PropTypes.func.isRequired,
}

export default AppBarDetailNote