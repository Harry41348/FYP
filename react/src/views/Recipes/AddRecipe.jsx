import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../../axios-client";
import AddIngredient from "../../components/Recipes/AddIngredient";
import Modal from "../../components/Modal";
import { useStateContext } from "../../contexts/ContextProvider";
import classes from "./AddRecipe.module.css";

function AddRecipe() {
  const { token } = useStateContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [step, setStep] = useState(1);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [addIngredient, setAddIngredient] = useState(false);

  const nameRef = useRef();
  const instructionsRef = useRef();

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  });

  const onSubmitRecipe = (e) => {
    e.preventDefault();

    setErrors(null);

    const payload = {
      name: nameRef.current.value,
      instructions: instructionsRef.current.value,
    };

    axiosClient
      .get("/recipes/validate", { params: payload })
      .then(({ data }) => {
        if (data == true) {
          setStep(2);
          setRecipe(payload);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && (response.status === 401 || response.status === 422)) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors(null);

    const payload = {
      name: recipe.name,
      instructions: recipe.instructions,
      ingredients: ingredients,
    };

    setErrors(null);

    // console.log(payload);

    axiosClient
      .post("/recipes", payload)
      .then(({ data }) => {
        // TODO notification
        return navigate(`/recipes/${data.id}`);
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        if (response && (response.status === 401 || response.status === 422)) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };

  const addIngredientFromForm = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  return (
    <div className={classes.wrapper}>
      {step == 1 && (
        <form method="POST" onSubmit={onSubmitRecipe} className={classes.form}>
          <h3>Create Recipe</h3>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <div className={classes.inputContainer}>
            <label htmlFor="name">What is the name of your cocktail?</label>
            <input
              ref={nameRef}
              id="name"
              type="text"
              placeholder="Cocktail Name"
              defaultValue={recipe && recipe.name}
            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="instructions">How is this cocktail made?</label>
            <textarea
              ref={instructionsRef}
              id="instructions"
              placeholder="Instructions"
              defaultValue={recipe && recipe.instructions}
            />
          </div>
          <button className="btn">Next</button>
        </form>
      )}

      {step == 2 && (
        <>
          {addIngredient && (
            <AddIngredient
              addIngredientFromForm={addIngredientFromForm}
              setAddIngredient={setAddIngredient}
            />
          )}
          <form method="POST" onSubmit={onSubmit} className={classes.form}>
            <h3>Create Recipe</h3>
            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <div className={classes.inputContainer}>
              <label>Add Ingredients</label>
              <div className={classes.ingredients}>
                {ingredients.map((ingredient) => (
                  <div key={ingredient.name}>
                    <p>
                      {ingredient.amount +
                        ingredient.measurement +
                        ingredient.name}
                    </p>
                  </div>
                ))}
              </div>
              <button
                className="btn"
                onClick={(ev) => {
                  ev.preventDefault();
                  setAddIngredient(true);
                }}
              >
                Add Ingredient
              </button>
            </div>
            {/* <button className="btn">Previous</button> */}
            <button className="btn">Create Recipe</button>
          </form>
        </>
      )}
    </div>
  );
}

export default AddRecipe;
