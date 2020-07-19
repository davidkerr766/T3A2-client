import React, { useState, useContext } from 'react'
import api from '../api'
import UserContext from '../context/UserContext'
import ErrorMessage from './ErrorMessage'

const ChangePassword = () => {
    const [oldPass, setOldPass] = useState()
    const [newPass, setNewPass] = useState()
    const [newPass2, setNewPass2] = useState()
    const [error, setError] = useState()

    const submit = async (e) => {
        try {
            e.preventDefault()
            const passwords = {oldPass, newPass, newPass2}
            await api.post("/users/change-password", passwords, { headers: { "x-auth-token": localStorage.getItem("auth-token") } })
            
        } catch (err) {
            err.response.data.error && setError(err.response.data.error)
        }
    }

    return (
        <div>
            <h1>Change Password</h1>
            {error && <ErrorMessage message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <label htmlFor="oldPass">Old Password</label>
                <input type="password" id="oldPass" onChange={e => setOldPass(e.target.value)}></input> <br />
                <label htmlFor="newPass">New Password</label>
                <input type="password" id="newPass" onChange={e => setNewPass(e.target.value)}></input> <br />
                <label htmlFor="newPass2">Confirm Password</label>
                <input type="password" id="newPass2" onChange={e => setNewPass2(e.target.value)}></input> <br />
                <input type="submit" value="Change Password" />
            </form>
        </div>
    )
}

export default ChangePassword