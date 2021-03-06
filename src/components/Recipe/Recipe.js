import React from "react";

const Recipe = (props) => {
  const {
    recipeTitle,
    serves,
    description,
    ingredients,
    methods,
    notes,
    getURL,
  } = props;

  return (
    <div className="content">
      {/* All items conditionally rendered so they only appear when they exist in state on preview */}
      {getURL && (
        <img src={getURL} alt={recipeTitle || "Image of completed recipe"} />
      )}
      {(recipeTitle || serves || description || notes) && (
        <div className="text">
          {recipeTitle && <h2 data-testid="2">{recipeTitle}</h2>}
          {serves && (
            <p>
              <b>Serves: {serves}</b>
            </p>
          )}
          {description && <p>{description}</p>}
          {ingredients.length > 0 && (
            <>
              <p>
                <b>Ingredients:</b>
              </p>
              <ul>
                {ingredients.map((ingredient, key) => (
                  <li key={key}>{ingredient}</li>
                ))}
              </ul>
            </>
          )}
          {methods.length > 0 && (
            <>
              <p>
                <b>Method:</b>
              </p>
              <ol>
                {methods.map((method, key) => (
                  <li key={key}>{method}</li>
                ))}
              </ol>
            </>
          )}
          {notes && (
            <>
              <p>
                <b>Notes:</b>
              </p>
              <p>{notes}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Recipe;
