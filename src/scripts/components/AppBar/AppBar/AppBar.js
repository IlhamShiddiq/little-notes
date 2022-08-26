import React from "react"
import './AppBar.scss'

import PropTypes from 'prop-types'

const AppBar = ({headline, barAction, searchBar}) => {
    return (
        <div className="app-bar">
            <div className="app-bar__body">
                <div className="app-bar__title">
                    <h1>{headline.title}</h1>
                    <p>{headline.subTitleIcon} {headline.subTitle}</p>
                </div>
                <div className="app-bar__action">
                    {barAction}
                </div>
                {searchBar}
            </div>
        </div>
    )
}

AppBar.propTypes = {
    headline: PropTypes.object,
    barAction: PropTypes.element,
    searchBar: PropTypes.element,
}

export default AppBar
