import React from "react"
import './LoadingPage.scss'
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <div className="loading-illustration">
                {
                    <LoadingIndicator />
                }
            </div>
        </div>
    )
}

export default LoadingPage
