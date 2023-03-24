import { Outlet } from "react-router";
import RecipeGroup from "../../components/Recipes/RecipeGroup";
import classes from "./Recipes.module.css";

function Recipes() {
  return (
    <div className={classes.main}>
      <Outlet />

      <div className="header">
        <h2 className="heading">Recipes</h2>
      </div>
      <div className={classes.content}>
        <div>
          <h3>Saved</h3>
          <RecipeGroup url="/saved" />
          <button className="btn">View all</button>
        </div>
        <div>
          <h3>Community</h3>
          <RecipeGroup url="" />
          <button className="btn">View all</button>
        </div>
        <div>
          <h3>Recommended</h3>
          <RecipeGroup url="/recommended" />
          <button className="btn">View all</button>
        </div>
        <div>
          <h3>Your Bar</h3>
          <RecipeGroup url="/my-bar" />
          <button className="btn">View all</button>
        </div>
      </div>
    </div>
  );
}

export default Recipes;
