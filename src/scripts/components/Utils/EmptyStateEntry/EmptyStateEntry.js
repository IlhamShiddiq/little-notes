import React, { useContext } from "react"
import './EmptyStateEntry.scss'
import LocaleContext from "scripts/contexts/LocaleContext"

const EmptyStateEntry = () => {
    const { locale } = useContext(LocaleContext)

    return (
        <div className="empty-state-entry">
            <img src={`${process.env.REACT_APP_BASE_URL}/images/${locale}-light-no-data.svg`} alt="Illustration"/>
        </div>
    )
}

export default EmptyStateEntry
