import React, { useContext, useEffect } from 'react'
import ConfirmationMessage from './ConfirmationMessage'
import UserContext from '../context/UserContext'

const About = () => {
    const { confMsg, setConfMsg } = useContext(UserContext)

    useEffect(() =>{
        return () => setConfMsg(undefined)
    }, [setConfMsg])
    
    return (
        <div>
            {confMsg && <ConfirmationMessage message={confMsg} clearMessage={() => setConfMsg(undefined)} />}
            <h1>About</h1>
        </div>
    )
}

export default About