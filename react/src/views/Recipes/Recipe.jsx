import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStateContext } from "../../contexts/ContextProvider";
import { AiFillStar } from "react-icons/ai";
import axiosClient from "../../axios-client";
import Modal from "../../components/Modal";

import classes from "./Recipe.module.css";

function Recipe() {
  const { token, user, setNotification } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
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
        if (token) {
          setIsSaved(data.isSaved);
        }
      })
      .catch(() => {
        return navigate("/recipes");
      });
  }, []);

  const deleteRecipeHandler = () => {
    if (!window.confirm("Are you sure you would like to delete this recipe?")) {
      return;
    }

    axiosClient
      .delete(`/recipes/${params["id"]}`)
      .then(() => {
        setNotification("Recipe deleted successfully!");
        return navigate("/recipes");
      })
      .catch(() => {});
  };

  const editRecipe = () => {
    return navigate(`/recipes/edit/${params["id"]}`);
  };

  const isSavedHandler = (e) => {
    if (e.target.checked) {
      axiosClient
        .post(`/recipes/save/${params["id"]}`)
        .then(() => {
          setNotification("Recipe saved!");
        })
        .catch(() => {});
    } else {
      axiosClient
        .post(`/recipes/unsave/${params["id"]}`)
        .then(() => {
          setNotification("Recipe unsaved.");
        })
        .catch(() => {});
    }
  };

  return (
    <Modal path="/recipes">
      {loading && <p>Loading</p>}
      {!loading && (
        <>
          {token && (
            <div className={classes.saveRecipe}>
              <input
                type="checkbox"
                name="saveRecipe"
                id="saveRecipe"
                defaultChecked={isSaved}
                onChange={isSavedHandler}
              />
              <label htmlFor="saveRecipe">
                <AiFillStar />
              </label>
            </div>
          )}
          <div className={classes.wrapper}>
            <h3>{recipe.name}</h3>
            <div className="flex">
              <div className={classes.imageContainer}>
                <img src={recipe.image} alt={recipe.name + " image"} />
              </div>
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
            {user && user.id == recipe.user_id && (
              <>
                <button className="btn mt-2" onClick={editRecipe}>
                  Edit
                </button>
                <button className="btn mt-2" onClick={deleteRecipeHandler}>
                  Delete
                </button>
              </>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}

export default Recipe;
