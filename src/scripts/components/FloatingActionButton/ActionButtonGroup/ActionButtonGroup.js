import React, { useContext } from "react"
import './ActionButtonGroup.scss'

import { FaMoon, FaSun } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"

import ActionButton from "../ActionButton/ActionButton"
import LocaleContext from "scripts/contexts/LocaleContext"
import ThemeContext from "scripts/contexts/ThemeContext"
import EnLanguageButton from "scripts/components/FloatingActionButton/LanguageButton/EnLanguageButton"
import IdLanguageButton from "scripts/components/FloatingActionButton/LanguageButton/IdLanguageButton"

const ActionButtonGroup = ({ onLogoutClicked }) => {
    const { locale, toggleLocale } = useContext(LocaleContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <div className="fab__action-group">
            <div className="fab__action-container">
                <div className="fab__container">
                    <ActionButton
                        icon={(theme === 'light') ? <FaMoon /> : <FaSun />}
                    clickActionHandler={toggleTheme}/>
                    <ActionButton
                        icon={(locale === 'id') ? <EnLanguageButton /> : <IdLanguageButton />}
                        clickActionHandler={toggleLocale} />
                    <ActionButton
                        icon={<FiLogOut />}
                        clickActionHandler={onLogoutClicked} />
                </div>
            </div>
        </div>
    )
}

export default ActionButtonGroup