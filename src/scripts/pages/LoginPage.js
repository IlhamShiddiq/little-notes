import React from 'react'
import AuthContainer from 'scripts/components/Auth/Auth/AuthContainer'

const LoginPage = ({onLoginSuccess}) => {
    return (
        <AuthContainer propIsLoginDisplay={true} onLoginSuccess={onLoginSuccess} />
    )
}

export default LoginPage