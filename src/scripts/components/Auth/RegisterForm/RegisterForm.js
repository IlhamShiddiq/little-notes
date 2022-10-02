import React, { useState, useContext } from "react"

import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { register } from "scripts/data-resource/auth/auth-api"
import { RegisterContent } from "scripts/contents/auth-content"
import { NotificationContent } from "scripts/contents/notification-content"

import LocaleContext from "scripts/contexts/LocaleContext"

const RegisterForm = () => {
    const navigate = useNavigate()
    const { locale } = useContext(LocaleContext)
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('')

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onPasswordConfirmationChange = (event) => {
        setPasswordConfirmation(event.target.value)
    }

    const onRegister = async (event) => {
        event.preventDefault()

        if (password !== passwordConfirmation) toast.error(NotificationContent[locale].register.password_doest_march)
        else {
            const {error, message} = await register({name, email, password})
            if (error) toast.error(message)
            else {
                toast.success(NotificationContent[locale].register.success_register)
                navigate('/')
            }
        }
    }

    return (
        <div className="auth-container__register">
            <h1>
                { RegisterContent[locale].title }
            </h1>
            <form onSubmit={onRegister}>
                <div className="auth-container__form-display">
                    <input type="text" placeholder={ RegisterContent[locale].fullname_placeholder } value={name} onChange={onNameChange} />
                </div>
                <div className="auth-container__form-display">
                    <input type="email" placeholder={ RegisterContent[locale].email_placeholder } value={email} onChange={onEmailChange} />
                </div>
                <div className="auth-container__form-display">
                    <input type="password" placeholder={ RegisterContent[locale].password_placeholder } value={password} onChange={onPasswordChange} />
                </div>
                <div className="auth-container__form-display">
                    <input type="password"
                           placeholder={ RegisterContent[locale].password_confirm_placeholder }
                           value={passwordConfirmation}
                           className={
                               (password !== passwordConfirmation) ? 'invalid-input' : ''
                           }
                           onChange={onPasswordConfirmationChange} />
                </div>
                <div className="auth-container__form-display">
                    <button>
                        { RegisterContent[locale].button_submit }
                    </button>
                </div>
            </form>
            <p>
                { RegisterContent[locale].login_wording }
                <Link to={'/login'}>
                    { RegisterContent[locale].redirect_wording }
                </Link>
            </p>
        </div>
    )
}

export default RegisterForm