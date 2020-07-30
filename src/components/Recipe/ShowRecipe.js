import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Recipe from "./Recipe";
import { useHistory, Link } from "react-router-dom";

const ShowRecipe = (props) => {
  const { recipes } = useContext(AppContext);
  const [recipe, setRecipe] = useState();
  const history = useHistory();

  // wait until data has loaded from the api before setting state
  useEffect(() => {
    setRecipe(recipes[props.match.params.index]);
  }, [recipes, props.match.params.index]);

  return (
    <div className="browse">
      {recipe && <Recipe {...recipe} />}
      <button
        onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        Back
      </button>
      <Link to={`/recipes/${props.match.params.index}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/recipes">
        <button>Recipes</button>
      </Link>
    </div>
  );
};

export default ShowRecipe;
