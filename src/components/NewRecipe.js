import React, { useState, useContext } from 'react'
import api from '../api'
import ConfirmationMessage from './ConfirmationMessage'
import ErrorMessage from './ErrorMessage'
import UserContext from '../context/UserContext'

const NewRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("")
    const [serves, setServes] = useState("")
    const [description, setDescription] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [method, setMethod] = useState("")
    const [notes, setNotes] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [methods, setMethods] = useState([])
    const [message, setMessage] = useState()
    const [error, setError] = useState()
    const { recipes, setRecipes } = useContext(UserContext)
    

    const sendRecipe = async e => {
        try {
            e.preventDefault()
            const newRecipe = {recipeTitle, serves, description, ingredients, methods, notes}
            const createRes = await api.post("/recipes/create", newRecipe, { headers: { "x-auth-token": localStorage.getItem("auth-token") } })
            setMessage(createRes.data.message)
            setRecipes([ ...recipes, createRes.data.doc ])

            // Clear inputs
            setRecipeTitle("")
            setServes("")
            setDescription("")
            setNotes("")
            setIngredients([])
            setMethods([])
        } catch (err) {
            if (err.response.data.error) setError(err.response.data.error)
        }
    }

    const addIngredient = (e) => {
        e.preventDefault()
        if (ingredient) {
            setIngredients([...ingredients, ingredient])
            setIngredient("")
        }
    }

    const addMethod = (e) => {
        e.preventDefault()
        if (method) {
            setMethods([...methods, method])
            setMethod("")
        }
    }

    return (
        <div>
            <h1>New Recipe</h1>
            {error && <ErrorMessage message={error} clearError={() => setError(undefined)} />}
            {message && <ConfirmationMessage message={message} clearMessage={() => setMessage(undefined)} />}
            <form onSubmit={sendRecipe}>
                <label htmlFor="recipeTitle">Title:</label>
                <input type="text" onChange={e => setRecipeTitle(e.target.value)} value={recipeTitle} /> <br />
                <label htmlFor="serves">Serves:</label>
                <input type="text" onChange={e => setServes(e.target.value)} value={serves} /> <br />
                <label htmlFor="description">Description:</label> <br />
                <textarea id="description" rows="4" cols="50" onChange={e => setDescription(e.target.value)} value={description} /> <br />
                <label htmlFor="ingredients">Ingredients:</label>
                <input type="text" id="ingredients" onChange={e => setIngredient(e.target.value)} value={ingredient} />
                <button onClick={addIngredient}>Add</button> <br />
                <label htmlFor="methods">Methods:</label>
                <input type="text" id="methods" onChange={e => setMethod(e.target.value)} value={method} />
                <button onClick={addMethod}>Add</button> <br />
                <label htmlFor="notes">Notes:</label> <br />
                <textarea id="notes" rows="4" cols="50" onChange={e => setNotes(e.target.value)} value={notes} /> <br />
                <input type="submit" value="Add Recipe" />
            </form>
        </div>
    )
}

export default NewRecipe