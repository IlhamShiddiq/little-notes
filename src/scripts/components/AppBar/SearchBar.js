import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.onSearchKeyPress = this.onSearchKeyPress.bind(this)
    }

    onSearchKeyPress(event) {
        this.props.onSearchKeyPressHandler(event.target.value)
    }

    render() {
        return (
            <div className="search-bar">
                <form>
                    <div className="form-inline-wrapper">
                        <div className="form-inline">
                            <button type="submit">
                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                            </button>
                        </div>
                        <div className="form-inline">
                            <input type="text" placeholder="search your note here" onChange={this.onSearchKeyPress} />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar
