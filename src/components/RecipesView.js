import React from 'react'
import { Link } from 'react-router-dom'

const Recipes = () => {
    return (
        <div>
            <h1>Recipes</h1>
            <Link to="recipes/new">Add New Recipe</Link>
        </div>
    )
}

export default Recipes