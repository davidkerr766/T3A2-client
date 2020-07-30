import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import api from "../../api";
import { useHistory } from "react-router-dom";
import Recipe from "./Recipe";
import Axios from "axios";

const EditRecipe = (props) => {
  const index = props.match.params.index;
  const { recipes, setRecipes, setErrorMsg, setConfMsg } = useContext(
    AppContext
  );
  const recipe = recipes[index];
  const [recipeTitle, setRecipeTitle] = useState("");
  const [serves, setServes] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [method, setMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [getURL, setGetURL] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [methods, setMethods] = useState([]);
  const history = useHistory();

  // update values when recipes have been fetched from the api
  useEffect(() => {
    if (recipe) {
      setRecipeTitle(recipe.recipeTitle);
      setServes(recipe.serves);
      setDescription(recipe.description);
      setNotes(recipe.notes);
      setIngredients(recipe.ingredients);
      setMethods(recipe.methods);
      setGetURL(recipe.getURL);
    }
  }, [recipe]);

  const addIngredient = (e) => {
    e.preventDefault();
    if (ingredient) {
      // update the ingredients array when a new ingredient is added
      setIngredients([...ingredients, ingredient]);
      setIngredient("");
    } else {
      setErrorMsg("New ingredient cannot be blank");
    }
  };

  const addMethod = (e) => {
    e.preventDefault();
    if (method) {
      // update the methods array when a new method is added
      setMethods([...methods, method]);
      setMethod("");
    } else {
      setErrorMsg("New method cannot be blank");
    }
  };

  const sendUpdatedRecipe = async (e) => {
    try {
      e.preventDefault();
      const updatedRecipe = {
        ...recipe,
        recipeTitle,
        serves,
        description,
        ingredients,
        methods,
        notes,
        getURL,
      };
      // send the updated recipe to the api update route
      const editRes = await api.put("recipes/update", updatedRecipe, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      // swap out the old recipe for the updated one
      recipes.splice(index, 1, updatedRecipe);
      // save the new recipes array in state
      setRecipes([...recipes]);
      setConfMsg(editRes.data.message);
      // redirect to the show page
      history.push(`/recipes/${index}`);
    } catch (err) {
      if (err.response.data.error) setErrorMsg(err.response.data.error);
    }
  };

  const uploadImg = (e) => {
    // get the details of the file
    const file = e.target.files[0];
    const contentType = file.type;
    const options = {
      params: {
        Key: file.name,
        ContentType: contentType,
      },
      headers: {
        "Content-Type": contentType,
        "x-auth-token": localStorage.getItem("auth-token"),
      },
    };

    // send file details to the api to generate a pre-signed put url
    api
      .get("images/generate-put-url", options)
      .then((res) => {
        // Upload the image to aws s3
        return Axios.put(res.data.putURL, file, options);
      })
      .then((res) => {
        // once the image is uploaded the url is saved in state
        setGetURL(res.config.url.split("?")[0]);
      })
      .catch((err) => setErrorMsg(err.message));
  };

  return (
    <div className="panel-container">
      <div className="panel">
        <h1>Edit Recipe</h1>
        <form onSubmit={sendUpdatedRecipe}>
          <label htmlFor="image">Image:</label> <br />
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={uploadImg}
          />{" "}
          <br />
          <label htmlFor="recipeTitle">Title:</label> <br />
          <input
            id="recipeTitle"
            type="text"
            onChange={(e) => setRecipeTitle(e.target.value)}
            value={recipeTitle}
          />{" "}
          <br />
          <label htmlFor="serves">Serves:</label> <br />
          <input
            type="text"
            onChange={(e) => setServes(e.target.value)}
            value={serves}
          />{" "}
          <br />
          <label htmlFor="description">Description:</label> <br />
          <textarea
            id="description"
            rows="4"
            cols="50"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />{" "}
          <br />
          <p>Ingredients:</p>
          {ingredients.map((ingred, key) => (
            <>
              <input
                type="text"
                value={ingred}
                onChange={(e) => {
                  // update state so changes are seen in the preview
                  ingredients.splice(key, 1, e.target.value);
                  setIngredients([...ingredients]);
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // remove the selected ingredient
                  ingredients.splice(key, 1);
                  setIngredients([...ingredients]);
                }}
              >
                X
              </button>
              <br />
            </>
          ))}
          <label htmlFor="newIngredient">New Ingredient:</label>
          <input
            type="text"
            id="newIngredients"
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
          />
          <button onClick={addIngredient}>Add</button> <br />
          <p>Methods:</p>
          {methods.map((meth, key) => (
            <>
              <input
                type="text"
                value={meth}
                onChange={(e) => {
                  // update state so changes are seen in the preview
                  methods.splice(key, 1, e.target.value);
                  setMethods([...methods]);
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // remove the selected method
                  methods.splice(key, 1);
                  setMethods([...methods]);
                }}
              >
                X
              </button>
              <br />
            </>
          ))}
          <label htmlFor="newMethod">New Method:</label>
          <input
            type="text"
            id="newMethod"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
          />
          <button onClick={addMethod}>Add</button> <br />
          <label htmlFor="notes">Notes:</label> <br />
          <textarea
            id="notes"
            rows="4"
            cols="50"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />{" "}
          <br />
          <input type="submit" value="Save Recipe" />
        </form>
      </div>
      <div className="panel">
        <h1>Preview</h1>
        <Recipe
          {...{
            recipeTitle,
            serves,
            description,
            ingredients,
            methods,
            notes,
            getURL,
          }}
        />
      </div>
    </div>
  );
};

export default EditRecipe;
