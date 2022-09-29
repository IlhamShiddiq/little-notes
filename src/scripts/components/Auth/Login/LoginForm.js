import React from "react"
import { Link } from "react-router-dom"

const LoginForm = () => {
    return (
        <div className="auth-container__form">
            <div className="auth-container__login">
                <h1>LOGIN</h1>
                <form>
                    <div className="auth-container__form-display">
                        <input type="email" placeholder="Your Email" />
                    </div>
                    <div className="auth-container__form-display">
                        <input type="password" placeholder="Your Password" />
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