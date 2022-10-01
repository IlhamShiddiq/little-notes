import React, { Fragment } from 'react'
import './LoadingIndicator.scss'

const LoadingIndicator = () => {
    return (
        <Fragment>
            <div className="loading-indicator">
                <img src={`${process.env.REACT_APP_BASE_URL}/images/loading.svg`} alt="Loading Illustration"/>
            </div>
        </Fragment>
    )
}

export default  LoadingIndicator