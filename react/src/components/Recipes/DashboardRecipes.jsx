import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";

import classes from "./DashboardRecipes.module.css";
import RecipeLink from "./RecipeLink";

function DashboardRecipes({ filter }) {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    setLoading(true);

    const requestParams = {
      take: 3,
      shuffle: true,
    };

    if (filter) {
      requestParams[filter] = true;
    }

    axiosClient
      .get(`/recipes`, { params: requestParams })
      .then(({ data }) => {
        setLoading(false);
        if (data.message != null) {
          setMessage(data.message);
        } else {
          setRecipes(data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.recipesContainer}>
      {loading && <p className={classes.message}>Loading recipes...</p>}
      {!loading && message && <p className={classes.message}>{message}</p>}
      {!loading &&
        Object.keys(recipes).length > 0 &&
        recipes.map((recipe) => <RecipeLink recipe={recipe} key={recipe.id} />)}
    </div>
  );
}

export default DashboardRecipes;
