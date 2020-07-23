import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Recipe from './Recipe';
import UserContext from '../context/UserContext';
import api from '../api';
import ErrorMessage from './ErrorMessage';

const RecipesView = () => {
    const { recipes, setRecipes } = useContext(UserContext)
    const [error, setError] = useState()

    // Creating state to trigger component rerender if recipe deleted
    const [, triggerRender] = useState()

    useEffect(() => {
        triggerRender()
    },[recipes])

    return (
        <div>
            <h1>Recipes</h1>
            {error && <ErrorMessage message={error} clearError={() => setError(undefined)} />}
            <Link to="recipes/new"><button>Add New Recipe</button></Link>
            {recipes.map((recipe, key) => (
                <>
                <Recipe {...recipe} key={key} />
                <button onClick={e => {
                    e.preventDefault()
                    api.delete("recipes/delete", { data: recipes[key], headers: { "x-auth-token": localStorage.getItem("auth-token") } })
                        .then((res)=> {
                            // console.log(res.data.recipeTitle)
                            recipes.splice(key, 1)
                            setRecipes([...recipes])
                        }).catch(err => {
                            setError(err.message)
                        })
                }}>Delete</button>
                <Link to={`recipes/${key}/edit`}><button>Edit</button></Link>
                </>
            ))}
        </div>
    )
}

export default RecipesView