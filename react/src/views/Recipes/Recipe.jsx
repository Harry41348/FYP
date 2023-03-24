import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../../axios-client";
import Modal from "../../components/Modal";

import classes from "./Recipe.module.css";

function Recipe(props) {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const params = useParams();

  useEffect(() => {
    setLoading(true);

    axiosClient.get(`/recipes/${params["id"]}`).then(({ data }) => {
      setLoading(false);
      setRecipe(data.recipe);
      setIngredients(data.ingredients);
    });
  }, []);

  return (
    <Modal path="/recipes">
      {loading && <p>Loading</p>}
      {!loading && (
        <div className={classes.wrapper}>
          <h3>{recipe.name}</h3>
          <div className="flex">
            <div className={classes.image}></div>
            <div className={classes.ingredients}>
              <h4>Ingredients</h4>
              <ul className={classes.ingredientsList}>
                {ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.amount +
                      ingredient.measurement +
                      " " +
                      ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={classes.recipe}>
            <h4>Recipe</h4>
            <p className="text-center">{recipe.instructions}</p>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default Recipe;
