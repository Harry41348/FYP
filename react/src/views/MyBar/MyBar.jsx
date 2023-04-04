import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

import classes from "./MyBar.module.css";
import UserIngredientsTable from "../../components/MyBar/UserIngredientsTable";
import EditUserIngredients from "../../components/MyBar/EditUserIngredients";
import RecipeLink from "../../components/Recipes/RecipeLink";

function MyBar() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [editIngredients, setEditIngredients] = useState(false);
  const [recipes, setRecipes] = useState({});
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const { token } = useStateContext();

  // If there is no token, the user will be redirected to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    getUserIngredients();
    getRecipes();
  }, []);

  const getUserIngredients = () => {
    setLoadingIngredients(true);

    axiosClient
      .get("/user-ingredients")
      .then(({ data }) => {
        setLoadingIngredients(false);
        setUserIngredients(data);
      })
      .catch((err) => {
        setLoadingIngredients(false);
      });
  };

  const getRecipes = () => {
    setLoadingRecipes(true);

    const requestBody = {
      shuffle: true,
      available: true,
    };

    axiosClient
      .get("/recipes", { params: requestBody })
      .then(({ data }) => {
        setLoadingRecipes(false);
        setRecipes(data);
      })
      .catch((err) => {
        setLoadingRecipes(false);
      });
  };

  return (
    <>
      {editIngredients && (
        <EditUserIngredients
          setEditIngredients={setEditIngredients}
          loadIngredients={getUserIngredients}
        />
      )}
      <div className="header">
        <h2 className="heading">MyBar</h2>
      </div>
      <div className={classes.content}>
        <div className={classes.ingredients}>
          <div className={classes.ingredientsHeader}>
            <div />
            <h3 className={classes.ingredientsHeading}>Your Ingredients</h3>
            <div className={classes.editIngredients}>
              <p>
                <button
                  className="btn"
                  onClick={(ev) => setEditIngredients(true)}
                >
                  Add
                </button>
              </p>
            </div>
          </div>
          <UserIngredientsTable
            getIngredients={getUserIngredients}
            ingredients={userIngredients}
            loading={loadingIngredients}
          />
        </div>
        <div className={classes.recipes}>
          <h3>Available Recipes</h3>
          {!loadingRecipes && Object.keys(recipes).length == 0 && (
            <p className={classes.message}>
              Add more ingredients to see recipes.
            </p>
          )}
          <div className={classes.recipesContainer}>
            {!loadingRecipes &&
              Object.keys(recipes).length > 0 &&
              recipes.map((recipe) => (
                <RecipeLink recipe={recipe} key={recipe.id} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBar;
