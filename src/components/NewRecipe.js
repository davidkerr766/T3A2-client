import React, { useState } from 'react'
import api from '../api'

const NewRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("")
    const [serves, setServes] = useState("")
    const [description, setDescription] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [method, setMethod] = useState("")
    const [notes, setNotes] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [methods, setMethods] = useState([])

    const sendRecipe = e => {
        e.preventDefault()
        const newRecipe = {recipeTitle, serves, description, ingredients, methods, notes}
        api.post("/recipes/new", newRecipe, { headers: { "x-auth-token": localStorage.getItem("auth-token") } })
    }

    const addIngredient = (e) => {
        e.preventDefault()
        setIngredients([...ingredients, ingredient])
        setIngredient("")
    }

    const addMethod = (e) => {
        e.preventDefault()
        setMethods([...methods, method])
        setMethod("")
    }

    return (
        <div>
            <h1>New Recipe</h1>
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