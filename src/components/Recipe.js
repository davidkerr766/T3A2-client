import React from 'react'

const Recipe = (props) => {

    return (
        <div>
            <h2>{props.recipeTitle}</h2>
            <p><b>Serves: {props.serves}</b></p>
            <p>{props.description}</p>
            <p><b>Ingredients:</b></p>
            <ul>
                {props.ingredients.map(ingredient => (
                    <li>{ingredient}</li>
                ))}
            </ul>
            <p><b>Method:</b></p>
            <ol>
                {props.methods.map(method => (
                    <li>{method}</li>
                ))}
            </ol>
            <p><b>Notes:</b></p>
            <p>{props.notes}</p>
        </div>
    )
}

export default Recipe