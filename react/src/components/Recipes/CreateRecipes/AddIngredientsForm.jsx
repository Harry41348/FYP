import { FiDelete } from "react-icons/fi";

import AddIngredient from "./AddIngredient";
import classes from "./Forms.module.css";

function AddIngredientsForm({
  addIngredient,
  removeIngredient,
  addIngredientFromForm,
  setAddIngredient,
  onCreate,
  errors,
  ingredients,
  onBack,
}) {
  return (
    <>
      {addIngredient && (
        <AddIngredient
          addIngredientFromForm={addIngredientFromForm}
          setAddIngredient={setAddIngredient}
        />
      )}
      <form method="POST" onSubmit={onCreate} className={classes.form}>
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
              <div className={classes.ingredient} key={ingredient.name}>
                <p>
                  {ingredient.amount + ingredient.measurement} {ingredient.name}
                </p>
                <button
                  className={classes.deleteButton}
                  onClick={(ev) => removeIngredient(ev, ingredient)}
                >
                  <FiDelete />
                </button>
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
        <div className="flex">
          <button
            className="btn mr-2"
            onClick={(ev) => {
              ev.preventDefault();
              onBack();
            }}
          >
            Back
          </button>
          <button className="btn">Submit</button>
        </div>
      </form>
    </>
  );
}

export default AddIngredientsForm;
