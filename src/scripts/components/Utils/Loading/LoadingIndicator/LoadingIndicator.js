import React, { Fragment, useContext } from 'react'
import './LoadingIndicator.scss'
import ThemeContext from "scripts/contexts/ThemeContext"

const LoadingIndicator = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <Fragment>
            <div className="loading-indicator">
                <img src={`${process.env.REACT_APP_BASE_URL}/images/${theme}-loading.svg`} alt="Loading Illustration"/>
            </div>
        </Fragment>
    )
}

export default  LoadingIndicator