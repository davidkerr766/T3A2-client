import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'

const Navbar = () => {
    return (
        <nav>
            <Link to="/">About</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/blog">Blog</Link>
            <LoginButton />
            <Link to="/change-password">Change Password</Link>
      </nav>
    )
}

export default Navbar