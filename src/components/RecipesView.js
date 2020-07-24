import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Recipe from './Recipe';
import UserContext from '../context/UserContext';
import api from '../api';

const RecipesView = () => {
    const { recipes, setRecipes, setErrorMsg, setConfMsg } = useContext(UserContext)

    return (
        <div>
            <h1>Recipes</h1>
            <Link to="recipes/new"><button>Add New Recipe</button></Link>
            {recipes && <>
            {recipes.map((recipe, key) => (
                <React.Fragment key={key}>
                <Recipe {...recipe} />
                <Link to={`recipes/${key}/edit`}><button>Edit</button></Link>
                <button onClick={async e => {
                    try {
                        e.preventDefault()
                        const delRes = await api.delete("recipes/delete", { data: recipes[key], headers: { "x-auth-token": localStorage.getItem("auth-token") } })
                        recipes.splice(key, 1)
                        setRecipes([...recipes])
                        setConfMsg(delRes.data.message)
                    } catch (err) {
                        if (err.response.data.error) setErrorMsg(err.response.data.error)
                    }     
                }}>Delete</button>
                </React.Fragment>
            ))}
            </>}
        </div>
    )
}

export default RecipesView