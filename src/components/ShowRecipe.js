import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import Recipe from './Recipe'
import { useHistory, Link } from 'react-router-dom'

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
            <button onClick={e => {e.preventDefault(); history.goBack()}}>Back to Edit</button>
            <Link to="/recipes"><button>Recipes</button></Link>
        </div>
    )
}

export default ShowRecipe