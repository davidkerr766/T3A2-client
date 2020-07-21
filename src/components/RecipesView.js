import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Recipe from './Recipe';
import UserContext from '../context/UserContext';

const RecipesView = () => {
const { recipes } = useContext(UserContext)

    return (
        <div>
            <h1>Recipes</h1>
            <Link to="recipes/new">Add New Recipe</Link>
            {recipes.map((recipe, key) => (
                <Recipe {...recipe} key={key} />
            ))}
        </div>
    )
}

export default RecipesView