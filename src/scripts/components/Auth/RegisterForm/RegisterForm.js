import React from "react"
import { Link } from "react-router-dom"

const RegisterForm = () => {
    return (
        <div className="auth-container__register">
            <h1>REGISTER</h1>
            <form>
                <div className="auth-container__form-display">
                    <input type="text" placeholder="Your Fullname" />
                </div>
                <div className="auth-container__form-display">
                    <input type="email" placeholder="Your Email" />
                </div>
                <div className="auth-container__form-display">
                    <input type="password" placeholder="Your Password" />
                </div>
                <div className="auth-container__form-display">
                    <input type="password" placeholder="Confirm Password" />
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