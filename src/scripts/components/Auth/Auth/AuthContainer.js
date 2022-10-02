import React, { Fragment, useContext } from "react"

import PropTypes from 'prop-types'
import './AuthContainer.scss'

import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import LocaleContext from "scripts/contexts/LocaleContext"

const AuthContainer = ({propIsLoginDisplay, onLoginSuccess}) => {
    const isLoginDisplay = propIsLoginDisplay || false
    const { locale } = useContext(LocaleContext)

    return (
        <Fragment>
            <div className="auth-container">
                <div className="auth-container__welcome">
                    <img src={`${process.env.REACT_APP_BASE_URL}/images/${locale}-littlenotes-welcome.png`} alt="Illustration"/>
                </div>
                <div className="auth-container__form">
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