import React, { Fragment, useContext } from "react"

import PropTypes from 'prop-types'
import './AuthContainer.scss'

import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import LocaleContext from "scripts/contexts/LocaleContext"
import ThemeContext from "scripts/contexts/ThemeContext"

const AuthContainer = ({propIsLoginDisplay, onLoginSuccess}) => {
    const isLoginDisplay = propIsLoginDisplay || false
    const { locale } = useContext(LocaleContext)
    const { theme } = useContext(ThemeContext)

    return (
        <Fragment>
            <div className="auth-container">
                <div className={`auth-container__welcome auth-container__welcome-${theme}`}>
                    <img src={`${process.env.REACT_APP_BASE_URL}/images/${locale}-littlenotes-welcome.png`} alt="Illustration"/>
                </div>
                <div className={`auth-container__form auth-container__form-${theme}`}>
                    {
                        isLoginDisplay ? <LoginForm onLoginSuccess={onLoginSuccess} /> : <RegisterForm />
                    }
                </div>
            </div>
        </Fragment>
    )
}

AuthContainer.propTypes = {
    propIsLoginDisplay: PropTypes.bool.isRequired,
    onLoginSuccess: PropTypes.func
}

export default AuthContainer