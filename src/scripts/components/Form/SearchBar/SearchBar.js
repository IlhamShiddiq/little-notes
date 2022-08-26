import React from "react"
import './SearchBar.scss'

import PropTypes from 'prop-types'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({ keyword, onSearchKeyPressHandler }) => {
    const onSearchKeyPress = event => {
        onSearchKeyPressHandler(event.target.value)
    }

    return (
        <div className="search-bar">
            <form>
                <div className="form-inline-wrapper">
                    <div className="form-inline">
                        <button type="submit">
                            <FaSearch />
                        </button>
                    </div>
                    <div className="form-inline">
                        <input type="text" placeholder="search your note here" value={keyword} onChange={onSearchKeyPress} />
                    </div>
                </div>
            </form>
        </div>
    )
}

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    onSearchKeyPressHandler: PropTypes.func.isRequired
}

export default SearchBar
