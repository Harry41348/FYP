import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Modal from "../../components/Modal";

import classes from "./Recipe.module.css";

function Recipe(props) {
  const { user } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get(`/recipes/${params["id"]}`)
      .then(({ data }) => {
        setLoading(false);
        setRecipe(data.recipe);
        setIngredients(data.ingredients);
      })
      .catch(() => {
        return navigate("/recipes");
      });
  }, []);

  const deleteRecipe = () => {
    if (!window.confirm("Are you sure you would like to delete this recipe?")) {
      return;
    }

    axiosClient
      .delete(`/recipes/${params["id"]}`)
      .then(() => {
        return navigate("/recipes");
      })
      .catch((err) => {
        // TODO Error notification
      });
  };

  const editRecipe = () => {
    return navigate(`/recipes/edit/${params["id"]}`);
  };

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
          {/* <button className="btn">Edit</button> */}
          {user && user.id == recipe.user_id && (
            <>
              <button className="btn mt-2" onClick={editRecipe}>
                Edit
              </button>
              <button className="btn mt-2" onClick={deleteRecipe}>
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}

export default Recipe;
