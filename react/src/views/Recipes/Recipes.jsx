import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import RecipeGroup from "../../components/Recipes/RecipeGroup";
import classes from "./Recipes.module.css";

function Recipes() {
  return (
    <div className={classes.main}>
      <Outlet />

      <div className={"header " + classes.header}>
        <h2 className="heading">Recipes</h2>
        <input type="text" className="search-bar" placeholder="Search.." />
        <Link className="btn" to="/recipes/create">
          Create Recipe
        </Link>
      </div>
      <div className={classes.content}>
        <aside className={classes.sidebar}>
          <div className={"toggleWrapper " + classes.toggle}>
            <input
              type="checkbox"
              className="checkbox"
              id="recommendedToggle"
            />
            <label className="label" htmlFor="recommendedToggle">
              Recommended
            </label>
          </div>
          <div className={"toggleWrapper " + classes.toggle}>
            <input type="checkbox" className="checkbox" id="savedToggle" />
            <label className="label" htmlFor="savedToggle">
              Saved
            </label>
          </div>
          <div className={"toggleWrapper " + classes.toggle}>
            <input type="checkbox" className="checkbox" id="availableToggle" />
            <label className="label" htmlFor="availableToggle">
              Available Recipes
            </label>
          </div>
        </aside>
        <div className={classes.recipesContainer}>
          <RecipeGroup />
        </div>
        <div />
      </div>
    </div>
  );
}

export default Recipes;
