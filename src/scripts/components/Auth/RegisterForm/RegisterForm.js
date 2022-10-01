import React, { useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

import { register } from "scripts/data-resource/auth/auth-api";

const RegisterForm = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

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

        if (password !== passwordConfirmation) toast.error('The password must be matched!')
        else {
            const {error, message} = await register({name, email, password})
            if (error) toast.error(message)
            else {
                toast.success('Account registered successfully!')
                navigate('/')
            }
        }
    }

    return (
        <div className="auth-container__register">
            <h1>REGISTER</h1>
            <form onSubmit={onRegister}>
                <div className="auth-container__form-display">
                    <input type="text" placeholder="Your Fullname" value={name} onChange={onNameChange} />
                </div>
                <div className="auth-container__form-display">
                    <input type="email" placeholder="Your Email" value={email} onChange={onEmailChange} />
                </div>
                <div className="auth-container__form-display">
                    <input type="password" placeholder="Your Password" value={password} onChange={onPasswordChange} />
                </div>
                <div className="auth-container__form-display">
                    <input type="password"
                           placeholder="Confirm Password"
                           value={passwordConfirmation}
                           className={
                               (password !== passwordConfirmation) ? 'invalid-input' : ''
                           }
                           onChange={onPasswordConfirmationChange} />
                </div>
                <div className="auth-container__form-display">
                    <button>Submit</button>
                </div>
            </form>
            <p>Already have an account? Please login <Link to={'/login'}>here</Link></p>
        </div>
    )
}

export default RegisterForm