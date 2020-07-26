import React from 'react'

const Recipe = (props) => {
    const { recipeTitle, serves, description, ingredients, methods, notes, getURL } = props

    return (
        <div>
            {getURL && <img src={getURL} alt="" />}
            {recipeTitle && <h2>{recipeTitle}</h2>}
            { serves && <p><b>Serves: {serves}</b></p>}
            {description && <p>{description}</p>}
            {(ingredients.length > 0) &&<><p><b>Ingredients:</b></p>
            <ul>
                {ingredients.map((ingredient, key) => (
                    <li key={key}>{ingredient}</li>
                ))}
            </ul></>}
            {(methods.length > 0) && <><p><b>Method:</b></p>
            <ol>
                {methods.map((method, key) => (
                    <li key={key}>{method}</li>
                ))}
            </ol></>}
            {notes && <><p><b>Notes:</b></p>
            <p>{notes}</p></>}
        </div>
    )
}

export default Recipe