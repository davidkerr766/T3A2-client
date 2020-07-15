import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import api from '../api'


const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault()
        const loginDetails = {email, password}
        const loginRes = await api.post("/users/login", loginDetails)
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        localStorage.setItem("auth-token", loginRes.data.token)
        history.push("/")
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submit}>
                <label htmlFor="loginEmail">Email</label>
                <input type="text" id="loginEmail" onChange={e => setEmail(e.target.value)}></input> <br />
                <label htmlFor="loginPassword">Password</label>
                <input type="password" id="loginPassword" onChange={e => setPassword(e.target.value)}></input> <br />
                <input type="submit" value="log in" />
            </form>
        </div>
    )
}

export default Login 