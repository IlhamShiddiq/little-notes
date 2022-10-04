import React, { useContext } from "react"
import './EmptyStateEntry.scss'
import LocaleContext from "scripts/contexts/LocaleContext"
import ThemeContext from "scripts/contexts/ThemeContext"

const EmptyStateEntry = () => {
    const { locale } = useContext(LocaleContext)
    const { theme } = useContext(ThemeContext)

    return (
        <div className="empty-state-entry">
            <img src={`${process.env.REACT_APP_BASE_URL}/images/${locale}-${theme}-no-data.svg`} alt="Illustration"/>
        </div>
    )
}

export default EmptyStateEntry
