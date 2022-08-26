import React from "react"
import './EmptyStateEntry.scss'

const EmptyStateEntry = () => {
    return (
        <div className="empty-state-entry">
            <img src={`${process.env.REACT_APP_BASE_URL}/images/EmptyStateIllustration.svg`} alt="Illustration"/>
        </div>
    )
}

export default EmptyStateEntry
