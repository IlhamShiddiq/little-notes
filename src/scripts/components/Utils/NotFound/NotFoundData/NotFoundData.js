import React from "react"
import './NotFoundData.scss'

const NotFoundData = () => {
    return (
        <div className="not-found-data">
            <img src={`${process.env.REACT_APP_BASE_URL}/images/NotFoundIllustration.svg`} alt="Illustration"/>
        </div>
    )
}

export default NotFoundData
