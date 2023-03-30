import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../../axios-client";
import AddIngredientsForm from "../../components/Recipes/CreateRecipes/AddIngredientsForm";
import CreateRecipeForm from "../../components/Recipes/CreateRecipes/CreateRecipeForm";
import { useStateContext } from "../../contexts/ContextProvider";
import classes from "./CreateRecipe.module.css";

function CreateRecipe() {
  const [errors, setErrors] = useState(null);
  const [step, setStep] = useState(1);
  const [recipe, setRecipe] = useState({});
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [addIngredient, setAddIngredient] = useState(false);
  const { token } = useStateContext();

  const navigate = useNavigate();
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

  const onCreate = (e) => {
    e.preventDefault();

    setErrors(null);

    const fd = new FormData();
    fd.append("name", recipe.name);
    fd.append("instructions", recipe.instructions);
    if (image) {
      fd.append("image", image, image.name);
    }

    console.log(fd.get("name"));

    // Post recipe
    axiosClient
      .post("/recipes", fd)
      .then(({ data }) => {
        // TODO notification
        const recipeResponse = data;

        // Post ingredients
        axiosClient
          .post(`/recipes/ingredients/${recipeResponse.id}`, {
            ingredients: ingredients,
          })
          .then(({ data }) => {
            return navigate(`/recipes/${recipeResponse.id}`);
          }) // Catch ingredient error
          .catch(({ response }) => {
            const status = response.status;
            if (response && (status === 401 || status === 422 || status)) {
              if (response.data.errors) {
                setErrors(response.data.errors);
              } else if (response.data.error) {
                setErrors({
                  error: [response.data.error],
                });
              } else {
                setErrors({
                  error: [response.data.message],
                });
              }
            }
          });
      }) // Catch recipe error
      .catch(({ response }) => {
        const status = response.status;
        if (response && (status === 401 || status === 422 || status)) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else if (response.data.error) {
            setErrors({
              error: [response.data.error],
            });
          } else {
            setErrors({
              error: [response.data.message],
            });
          }
        }
      });
  };

  const onBack = () => {
    setStep(1);
  };

  const addIngredientFromForm = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredientFromForm = (ev, ingredient) => {
    ev.preventDefault();

    // Set ingredients to a new array of ingredients with the target ingredient removed
    const newIngredients = [...ingredients];
    newIngredients.splice(ingredients.indexOf(ingredient), 1);
    setIngredients([...newIngredients]);
  };

  return (
    <div className={classes.wrapper}>
      {step == 1 && (
        <CreateRecipeForm
          onSubmitRecipe={onSubmitRecipe}
          errors={errors}
          nameRef={nameRef}
          recipe={recipe}
          instructionsRef={instructionsRef}
          formType="Create"
          setImage={setImage}
        />
      )}

      {step == 2 && (
        <AddIngredientsForm
          addIngredient={addIngredient}
          removeIngredient={removeIngredientFromForm}
          addIngredientFromForm={addIngredientFromForm}
          setAddIngredient={setAddIngredient}
          onCreate={onCreate}
          errors={errors}
          ingredients={ingredients}
          onBack={onBack}
          formType="Create"
        />
      )}
    </div>
  );
}

export default CreateRecipe;
