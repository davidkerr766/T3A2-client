import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import UserContext from '../context/UserContext'

const ChangePassword = () => {
    const [oldPass, setOldPass] = useState()
    const [newPass, setNewPass] = useState()
    const [newPass2, setNewPass2] = useState()
    const history = useHistory()
    const { setConfMsg, setErrorMsg } = useContext(UserContext)

    const submit = async (e) => {
        try {
            e.preventDefault()
            const passwords = {oldPass, newPass, newPass2}
            const changePassRes = await api.post("/users/change-password", passwords, { headers: { "x-auth-token": localStorage.getItem("auth-token") } })
            setConfMsg(changePassRes.data.message)
            history.push("/")
        } catch (err) {
            err.response.data.error && setErrorMsg(err.response.data.error)
        }
    }

    return (
        <div>
            <h1>Change Password</h1>
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