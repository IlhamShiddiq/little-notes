import React, { useContext } from "react"
import './NotFoundData.scss'
import LocaleContext from "scripts/contexts/LocaleContext"
import ThemeContext from "scripts/contexts/ThemeContext"

const NotFoundData = () => {
    const { locale } = useContext(LocaleContext)
    const { theme } = useContext(ThemeContext)

    return (
        <div className="not-found-data">
            <img src={`${process.env.REACT_APP_BASE_URL}/images/${locale}-${theme}-not-found.svg`} alt="Illustration"/>
        </div>
    )
}

export default NotFoundData
