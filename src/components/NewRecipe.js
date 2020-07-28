import React, { useState, useContext } from 'react'
import api from '../api'
import UserContext from '../context/UserContext'
import { useHistory } from 'react-router-dom'
import Recipe from './Recipe'
import axios from 'axios'

const NewRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("")
    const [serves, setServes] = useState("")
    const [description, setDescription] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [method, setMethod] = useState("")
    const [notes, setNotes] = useState("")
    const [getURL, setGetURL] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [methods, setMethods] = useState([])
    const { recipes, setRecipes, setErrorMsg, setConfMsg } = useContext(UserContext)
    const history = useHistory()

    const sendRecipe = async e => {
        try {
            e.preventDefault()
            const newRecipe = {recipeTitle, serves, description, ingredients, methods, notes, getURL}
            const createRes = await api.post("/recipes/create", newRecipe, { headers: { "x-auth-token": localStorage.getItem("auth-token") } })
            setConfMsg(createRes.data.message)
            setRecipes([ ...recipes, createRes.data.data ])
            history.push(`/recipes/${recipes.length}`)
        } catch (err) {
            if (err.response.data.error) setErrorMsg(err.response.data.error)
        }
    }

    const addIngredient = (e) => {
        e.preventDefault()
        if (ingredient) {
            setIngredients([...ingredients, ingredient])
            setIngredient("")
        } else {
            setErrorMsg("Ingredient cannot be blank")
        }
    }

    const addMethod = (e) => {
        e.preventDefault()
        if (method) {
            setMethods([...methods, method])
            setMethod("")
        } else {
            setErrorMsg("Method cannot be blank")
        }
    }

    const uploadImg = e => {
        const file = e.target.files[0]
        const contentType = file.type
        const options = {
        params: {
            Key: file.name,
            ContentType: contentType
            },
            headers: {
            'Content-Type': contentType,
            "x-auth-token": localStorage.getItem("auth-token")
            }
        };

        api.get("images/generate-put-url", options)
        .then(res =>{
            return axios.put(res.data.putURL, file, options)
        }).then((res) => {
            setGetURL(res.config.url.split("?")[0])
        }).catch(err => setErrorMsg(err.message))
    }

    return (
        <div className="panel-container">
            <div className="panel">
            <h1>New Recipe</h1>
            <form onSubmit={sendRecipe}>
                <label htmlFor="image">Image:</label>
                <input type="file" accept="image/*" id="image" onChange={uploadImg} /> <br />
                <label htmlFor="recipeTitle">Title:</label> <br />
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
            <div className="panel">
            <h1>Preview</h1>
            <Recipe {...{recipeTitle, serves, description, ingredients, methods, notes, getURL}}/>
            </div>
        </div>
    )
}

export default NewRecipe