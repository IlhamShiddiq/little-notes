import React, { useState, useContext } from "react"

import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { login } from "scripts/data-resource/auth/auth-api"
import { LoginContent } from "scripts/contents/auth-content"

import LocaleContext from "scripts/contexts/LocaleContext"

const LoginForm = ({onLoginSuccess}) => {
    const { locale } = useContext(LocaleContext)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onLogin = async (event) => {
        event.preventDefault()

        const { error, message, data } = await login({email, password})
        if (!error) onLoginSuccess(data)
        else toast.error(message)
    }

    return (
        <div className="auth-container__form">
            <div className="auth-container__login">
                <h1>{ LoginContent[locale].title }</h1>
                <form onSubmit={ onLogin }>
                    <div className="auth-container__form-display">
                        <input
                            type="email"
                            placeholder={ LoginContent[locale].email_placeholder }
                            value={ email }
                            onChange={ onEmailChange } />
                    </div>
                    <div className="auth-container__form-display">
                        <input
                            type="password"
                            placeholder={ LoginContent[locale].password_placeholder }
                            value={ password }
                            onChange={ onPasswordChange } />
                    </div>
                    <div className="auth-container__form-display">
                        <button>
                            { LoginContent[locale].button_submit }
                        </button>
                    </div>
                </form>
                <p>
                    { LoginContent[locale].registration_wording }
                    <Link to={'/register'}>
                        { LoginContent[locale].redirect_wording }
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm