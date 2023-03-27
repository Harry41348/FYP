import { Link } from "react-router-dom";

import classes from "./RecipeGroup.module.css";

function RecipeGroup(props) {
  return (
    <div className={`${classes.container}`}>
      {props.loading && Object.keys(props.recipes).length > 0 && (
        <p className={classes.message}>Loading recipes...</p>
      )}
      {!props.loading && props.message && (
        <p className={classes.message}>{props.message}</p>
      )}
      {!props.loading &&
        Object.keys(props.recipes).length > 0 &&
        props.recipes.map((recipe) => (
          <Link
            to={`/recipes/${recipe.id}`}
            className={classes.recipe}
            key={recipe.id}
          >
            <p>{recipe.name}</p>
          </Link>
        ))}
    </div>
  );
}

export default RecipeGroup;
