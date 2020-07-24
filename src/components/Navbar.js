import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'

const Navbar = () => {
    return (
        <nav>
            <Link to="/">About</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/blogs">Blog</Link>
            <LoginButton />
      </nav>
    )
}

export default Navbar