import classes from "./Forms.module.css";

function CreateRecipeForm({
  onSubmitRecipe,
  errors,
  nameRef,
  recipe,
  instructionsRef,
}) {
  return (
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
  );
}

export default CreateRecipeForm;
