import React from "react"

import { Link } from "react-router-dom"
import ButtonAction from "scripts/components/AppBar/ButtonAction/ButtonAction"
import { FiArrowLeft } from "react-icons/fi"

const AppBarAddNote = () => {
    return (
        <React.Fragment>
            <Link to={'/'}>
                <ButtonAction label={<FiArrowLeft size={50} />} />
            </Link>
        </React.Fragment>
    )
}

export default AppBarAddNote