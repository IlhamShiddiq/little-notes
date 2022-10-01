import React, { useState } from "react"

import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import { login } from "scripts/data-resource/auth/auth-api";

const LoginForm = ({onLoginSuccess}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                <h1>LOGIN</h1>
                <form onSubmit={onLogin}>
                    <div className="auth-container__form-display">
                        <input type="email" placeholder="Your Email" value={email} onChange={onEmailChange} />
                    </div>
                    <div className="auth-container__form-display">
                        <input type="password" placeholder="Your Password" value={password} onChange={onPasswordChange} />
                    </div>
                    <div className="auth-container__form-display">
                        <button>Submit</button>
                    </div>
                </form>
                <p>Don't have an acoount? Please register <Link to={'/register'}>here</Link></p>
            </div>
        </div>
    )
}

export default LoginForm