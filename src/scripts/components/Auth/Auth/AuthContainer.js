import React, { Fragment } from "react"

import PropTypes from 'prop-types'
import LoginForm from "../Login/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import './AuthContainer.scss'

const AuthContainer = ({propIsLoginDisplay, onLoginSuccess}) => {
    const isLoginDisplay = propIsLoginDisplay || false

    return (
        <Fragment>
            <div className="auth-container">
                <div className="auth-container__welcome">
                    <img src={`${process.env.REACT_APP_BASE_URL}/images/littlenotes-welcome.png`} alt="Illustration"/>
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