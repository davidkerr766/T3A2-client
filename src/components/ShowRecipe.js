import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import Recipe from './Recipe'
import { useHistory } from 'react-router-dom'

const ShowRecipe = (props) => {
    const { recipes } = useContext(UserContext)
    const [recipe, setRecipe] = useState()
    const history = useHistory()
    
    useEffect(()=> {
        setRecipe(recipes[props.match.params.index])
    }, [recipes, props.match.params.index])

    return (
        <div>
            {recipe && <Recipe {...recipe} />}
            <button onClick={e => {e.preventDefault(); history.goBack()}}>Back</button>
        </div>
    )
}

export default ShowRecipe