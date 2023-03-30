import { Link } from "react-router-dom";
import classes from "./RecipeLink.module.css";

function RecipeLink({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className={classes.recipe}
      key={recipe.id}
    >
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <img src={recipe.image} alt={recipe.name + " image"} />
          <div>{recipe.name}</div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeLink;
