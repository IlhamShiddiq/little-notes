import React, { useContext } from "react"
import './ActionButtonGroup.scss'

import { FaMoon } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"

import ActionButton from "../ActionButton/ActionButton"
import LocaleContext from "scripts/contexts/LocaleContext"
import EnLanguageButton from "scripts/components/FloatingActionButton/LanguageButton/EnLanguageButton"
import IdLanguageButton from "scripts/components/FloatingActionButton/LanguageButton/IdLanguageButton"

const ActionButtonGroup = ({ onLogoutClicked }) => {
    const { locale, toggleLocale } = useContext(LocaleContext)

    return (
        <div className="fab__action-group">
            <div className="fab__action-container">
                <div className="fab__container">
                    <ActionButton icon={<FaMoon />} />
                    <ActionButton icon={
                        (locale === 'id') ? <EnLanguageButton /> : <IdLanguageButton />
                    } clickActionHandler={toggleLocale} />
                    <ActionButton icon={<FiLogOut />} clickActionHandler={onLogoutClicked} />
                </div>
            </div>
        </div>
    )
}

export default ActionButtonGroup