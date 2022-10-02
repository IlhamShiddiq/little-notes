import React, { useContext } from "react"
import './NotFoundData.scss'
import LocaleContext from "scripts/contexts/LocaleContext"

const NotFoundData = () => {
    const { locale } = useContext(LocaleContext)

    return (
        <div className="not-found-data">
            <img src={`${process.env.REACT_APP_BASE_URL}/images/${locale}-light-not-found.svg`} alt="Illustration"/>
        </div>
    )
}

export default NotFoundData
