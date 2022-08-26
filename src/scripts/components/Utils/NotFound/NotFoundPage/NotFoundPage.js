import React from "react"

import './NotFoundPage.scss'
import NotFoundData from "../NotFoundData/NotFoundData"

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-illustration">
                {
                    <NotFoundData />
                }
            </div>
        </div>
    )
}

export default NotFoundPage