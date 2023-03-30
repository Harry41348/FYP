import { FiDelete } from "react-icons/fi";

import AddIngredient from "./AddIngredient";
import classes from "./Forms.module.css";

function AddIngredientsForm(props) {
  return (
    <>
      {props.addIngredient && (
        <AddIngredient
          addIngredientFromForm={props.addIngredientFromForm}
          setAddIngredient={props.setAddIngredient}
        />
      )}
      <form method="POST" onSubmit={props.onCreate} className={classes.form}>
        <h3>{props.formType} Recipe</h3>
        {props.errors && (
          <div className="alert">
            {Object.keys(props.errors).map((key) => (
              <p key={key}>{props.errors[key][0]}</p>
            ))}
          </div>
        )}
        <div className={classes.inputContainer}>
          <label>Add Ingredients</label>
          <div className={classes.ingredients}>
            {props.ingredients.map((ingredient) => (
              <div className={classes.ingredient} key={ingredient.name}>
                <p>
                  {ingredient.amount + ingredient.measurement} {ingredient.name}
                </p>
                <button
                  className={classes.deleteButton}
                  onClick={(ev) => props.removeIngredient(ev, ingredient)}
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
              props.setAddIngredient(true);
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
              props.onBack();
            }}
          >
            Back
          </button>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default AddIngredientsForm;
