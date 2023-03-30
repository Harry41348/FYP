import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useStateContext } from "../../contexts/ContextProvider";

import axiosClient from "../../axios-client";
import AddIngredientsForm from "../../components/Recipes/CreateRecipes/AddIngredientsForm";
import CreateRecipeForm from "../../components/Recipes/CreateRecipes/CreateRecipeForm";
import classes from "./CreateRecipe.module.css";

function EditRecipe() {
  const [errors, setErrors] = useState(null);
  const [step, setStep] = useState(1);
  const [recipe, setRecipe] = useState({});
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [addIngredient, setAddIngredient] = useState(false);
  const { token } = useStateContext();

  const params = useParams();
  const navigate = useNavigate();
  const nameRef = useRef();
  const instructionsRef = useRef();

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    axiosClient
      .get(`/recipes/${params["id"]}`)
      .then(({ data }) => {
        setRecipe(data.recipe);
        setIngredients(data.ingredients);
      })
      .catch(() => {
        return navigate("/recipes");
      });
  }, []);

  const onValidateRecipe = (e) => {
    e.preventDefault();

    setErrors(null);

    const payload = {
      id: params["id"],
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

    const fdNew = new FormData();
    fdNew.append("name", recipe.name);
    fdNew.append("instructions", recipe.instructions);
    if (image) {
      fdNew.append("image", image, image.name);
    }

    // Update recipe
    axiosClient
      .post(`/recipes/${params["id"]}`, fdNew)
      .then(({ data }) => {
        const recipeResponse = data;
        // TODO notification

        // Update ingredients
        axiosClient
          .put(`/recipes/ingredients/${recipeResponse.id}`, {
            ingredients: ingredients,
          })
          .then(() => {
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
      })
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
          onSubmitRecipe={onValidateRecipe}
          errors={errors}
          nameRef={nameRef}
          recipe={recipe}
          instructionsRef={instructionsRef}
          formType="Edit"
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
          formType="Edit"
        />
      )}
    </div>
  );
}

export default EditRecipe;
