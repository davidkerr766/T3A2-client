import React from 'react'
import { useHistory } from 'react-router-dom'

const LoginButton = () => {
    const history = useHistory()

    const login = () => history.push("/login")

    return (
            <button onClick={login} >Login</button>
    )
}

export default LoginButton