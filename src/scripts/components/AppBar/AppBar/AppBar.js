import React from "react"
import './AppBar.scss'

import ButtonAction from '../ButtonAction/ButtonAction'
import SearchBar from "../SearchBar/SearchBar"
import { FiPlus, FiArchive, FiGrid, FiList } from "react-icons/fi"

const AppBar = ({display, onDisplayChangeHandler, onCreateNoteHandler, onArchievedNoteHandler, onSearchKeyPressHandler}) => {
    return (
        <div className="app-bar">
            <div className="app-bar__body">
                <div className="app-bar__title">
                    <h1>LittleNotes</h1>
                    <p>never forget anything</p>
                </div>
                <div className="app-bar__action">
                    <ButtonAction label={<FiPlus size={50} />} onClickHandler={onCreateNoteHandler} />
                    <ButtonAction label={<FiArchive size={50} />} onClickHandler={onArchievedNoteHandler} />
                    <ButtonAction label={
                        display === 'list' ? <FiGrid size={50} />
                            : <FiList size={50} />
                    } onClickHandler={onDisplayChangeHandler} />
                </div>
                <SearchBar onSearchKeyPressHandler={onSearchKeyPressHandler} />
            </div>
        </div>
    )
}

export default AppBar
