import React, { Fragment } from 'react'
import './LoadingIndicator.scss'

const DarkLoadingIndicator = () => {
    return (
        <Fragment>
            <div className="loading-indicator">
                <img src={`${process.env.REACT_APP_BASE_URL}/images/dark-loading.svg`} alt="Loading Illustration"/>
            </div>
        </Fragment>
    )
}

export default  DarkLoadingIndicator