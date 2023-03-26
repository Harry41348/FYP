import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

import AddIngredients from "./AddIngredients";
import classes from "./MyBar.module.css";
import { FiDelete } from "react-icons/fi";

function MyBar() {
  const [ingredientUsers, setIngredientUsers] = useState([]);
  const [loadingIngredient, setLoadingIngredients] = useState(false);
  const [addIngredient, setAddIngredient] = useState(false);
  const [recipes, setRecipes] = useState({});
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    getIngredientUsers();
    getRecipes();
  }, []);

  const getIngredientUsers = () => {
    setLoadingIngredients(true);

    axiosClient
      .get("/user-ingredients")
      .then(({ data }) => {
        setLoadingIngredients(false);
        setIngredientUsers(data);
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

  const onDelete = (id) => {
    if (
      !window.confirm("Are you sure you would like to remove this ingredient?")
    ) {
      return;
    }

    axiosClient
      .delete(`/user-ingredients/${id}`)
      .then((response) => {
        // setNotification("Ingredient Removed"); TODO notifications
        getIngredientUsers();
      })
      .catch((err) => {});
  };

  return (
    <>
      {addIngredient && (
        <AddIngredients
          setIngredientUsers={getIngredientUsers}
          setAddIngredients={setAddIngredient}
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
            <div className={classes.addIngredient}>
              <p>
                <button
                  className="btn"
                  onClick={(ev) => setAddIngredient(true)}
                >
                  Add
                </button>
              </p>
            </div>
          </div>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loadingIngredient && (
                <tr>
                  <td colSpan={5}>Loading...</td>
                </tr>
              )}
              {!loadingIngredient &&
                ingredientUsers.map((ingredientUser) => (
                  <tr key={ingredientUser.id}>
                    <td>{ingredientUser.name}</td>
                    <td>{ingredientUser.category}</td>
                    <td>
                      <button
                        className={classes.deleteButton}
                        onClick={(ev) => onDelete(ingredientUser.id)}
                      >
                        <FiDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
                <Link
                  to={`/recipes/${recipe.id}`}
                  className={classes.recipe}
                  key={recipe.id}
                >
                  <p>{recipe.name}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBar;
