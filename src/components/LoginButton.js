import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'

const LoginButton = () => {
    const { userData, setUserData, setConfMsg } = useContext(UserContext)

    const history = useHistory()
    const login = () => history.push("/login")
    const changePassword = () => history.push("/change-password")
    const logOut = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token", "")
        setConfMsg("Successfully Logged Out")
    }

    return (
        <>
        { userData.user ? (
            <>
            <button onClick={logOut} >Log Out</button>
            <button onClick={changePassword} >Change Password</button>
            </>
        ) : (
            <button onClick={login} >Login</button>
        )

        }
        </>    
    )
}

export default LoginButton