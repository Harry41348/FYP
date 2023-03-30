import { Link } from "react-router-dom";

import classes from "./RecipeGroup.module.css";
import RecipeLink from "./RecipeLink";

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
          <RecipeLink recipe={recipe} key={recipe.id} />
        ))}
    </div>
  );
}

export default RecipeGroup;
