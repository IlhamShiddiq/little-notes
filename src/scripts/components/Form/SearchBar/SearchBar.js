import React, { useContext } from "react"
import './SearchBar.scss'

import PropTypes from 'prop-types'
import { FaSearch } from 'react-icons/fa'
import { SearchBarContent } from "scripts/contents/search-bar-content"

import LocaleContext from "scripts/contexts/LocaleContext"

const SearchBar = ({ keyword, onSearchKeyPressHandler }) => {
    const { locale } = useContext(LocaleContext)
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
                        <input type="text" placeholder={SearchBarContent[locale].search_placeholder} value={keyword} onChange={onSearchKeyPress} />
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
