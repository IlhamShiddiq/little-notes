import React from "react"

import ButtonAction from './ButtonAction'
import SearchBar from "./SearchBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AppBar = ({display, onDisplayChangeHandler, onCreateNoteHandler, onArchievedNoteHandler, onSearchKeyPressHandler}) => {
    return (
        <div className="app-bar">
            <div className="app-bar__body">
                <div className="app-bar__title">
                    <h1>LittleNotes</h1>
                    <p>never forget anything</p>
                </div>
                <div className="app-bar__action">
                    <ButtonAction label={<FontAwesomeIcon icon="fa-solid fa-plus" />} onClickHandler={onCreateNoteHandler} />
                    <ButtonAction label={<FontAwesomeIcon icon="fa-solid fa-box-archive"/>} onClickHandler={onArchievedNoteHandler} />
                    <ButtonAction label={
                        display === 'list' ? <FontAwesomeIcon icon="fa-solid fa-grip" />
                            : <FontAwesomeIcon icon="fa-solid fa-list" />
                    } onClickHandler={onDisplayChangeHandler} />
                </div>
                <SearchBar onSearchKeyPressHandler={onSearchKeyPressHandler} />
            </div>
        </div>
    )
}

export default AppBar
