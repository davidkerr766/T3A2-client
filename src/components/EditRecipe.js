import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'

const EditRecipe = (props) => {
    const { recipes, setRecipes } = useContext(UserContext)
    const recipe = recipes[props.match.params.index]
    // console.log(recipe)
    const [recipeTitle, setRecipeTitle] = useState("")
    const [serves, setServes] = useState("")
    const [description, setDescription] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [method, setMethod] = useState("")
    const [notes, setNotes] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [methods, setMethods] = useState([])
    
    // update values when recipes have been fetched from the api
    useEffect(()=> {
        if (recipe) {
            setRecipeTitle(recipe.recipeTitle)
            setServes(recipe.serves)
            setDescription(recipe.description)
            setNotes(recipe.notes)
            setIngredients(recipe.ingredients)
            setMethods(recipe.methods)
        }
    }, [recipes])

    const addIngredient = e => {
        e.preventDefault()
        if (ingredient) {
            setIngredients([...ingredients, ingredient])
            setIngredient("")
        }
    }

    const addMethod = e => {
        e.preventDefault()
        if (method) {
            setMethods([...methods, method])
            setMethod("")
        }
    }


    return (
        <div>
            <h1>Edit Recipe</h1>
            <form>
                <label htmlFor="recipeTitle">Title:</label>
                <input type="text" onChange={e => setRecipeTitle(e.target.value)} value={recipeTitle} /> <br />
                <label htmlFor="serves">Serves:</label>
                <input type="text" onChange={e => setServes(e.target.value)} value={serves} /> <br />
                <label htmlFor="description">Description:</label> <br />
                <textarea id="description" rows="4" cols="50" onChange={e => setDescription(e.target.value)} value={description} /> <br />
                <p>Ingredients:</p>
                { ingredients.map( (ingred, key) => (
                    <>
                    <input type="text" value={ingred} onChange={e => {
                        ingredients.splice(key, 1, e.target.value)
                        setIngredients([...ingredients])
                    }}/> 
                    <button onClick={() => {
                        ingredients.splice(key, 1)
                        setIngredients([...ingredients])
                    }}>X</button><br />
                    </>
                ))}
                <label htmlFor="newIngredient">New Ingredient:</label>
                <input type="text" id="newIngredients" onChange={e => setIngredient(e.target.value)} value={ingredient} />
                <button onClick={addIngredient}>Add</button> <br />
                <label htmlFor="newMethod">New Method:</label>
                <input type="text" id="newMethod" onChange={e => setMethod(e.target.value)} value={method} />
                <button onClick={addMethod}>Add</button> <br />
                <label htmlFor="notes">Notes:</label> <br />
                <textarea id="notes" rows="4" cols="50" onChange={e => setNotes(e.target.value)} value={notes} /> <br />
                <input type="submit" value="Save Recipe" />
            </form>
        </div>
    )
}

export default EditRecipe