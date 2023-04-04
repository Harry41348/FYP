import classes from "./Forms.module.css";

function CreateRecipeForm(props) {
  return (
    <form
      method="POST"
      onSubmit={props.onSubmitRecipe}
      className={classes.form}
    >
      <h3>{props.formType} recipe</h3>
      {props.errors && (
        <div className="alert">
          {Object.keys(props.errors).map((key) => (
            <p key={key}>{props.errors[key][0]}</p>
          ))}
        </div>
      )}
      <div className={classes.inputContainer}>
        <label htmlFor="name">What is the name of your cocktail?</label>
        <input
          ref={props.nameRef}
          id="name"
          type="text"
          placeholder="Cocktail Name"
          defaultValue={props.recipe && props.recipe.name}
          required
        />
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="instructions">How is this cocktail made?</label>
        <textarea
          ref={props.instructionsRef}
          id="instructions"
          placeholder="Instructions"
          defaultValue={props.recipe && props.recipe.instructions}
          required
        />
      </div>
      <div className={classes.inputContainer}>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => props.setImage(e.target.files[0])}
        />
        <div className="image"></div>
      </div>
      <button className="btn">Next</button>
    </form>
  );
}

export default CreateRecipeForm;
