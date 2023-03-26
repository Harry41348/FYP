import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import Modal from "../../components/Modal";
import classes from "./AddIngredient.module.css";

function AddIngredient({ setAddIngredient, addIngredientFromForm }) {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({});
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("spirit");
  const [step, setStep] = useState(1);

  const amountRef = useRef();
  const measurementRef = useRef();

  useEffect(() => {
    getIngredients("spirit");
  }, []);

  const getIngredients = (category) => {
    setLoading(true);

    axiosClient
      .get(`/ingredients/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setCategory(category);
        setIngredients(data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const selectIngredient = (e, ing) => {
    e.preventDefault();
    setIngredient(ing);
    setStep(2);
  };

  const onSubmitIngredient = (e, ing) => {
    e.preventDefault();

    const ingredient = {
      ingredient_id: ing.id,
      name: ing.name,
      amount: amountRef.current.value,
      measurement: measurementRef.current.value,
    };

    addIngredientFromForm(ingredient);
    setAddIngredient(false);
  };

  const closeModal = () => {
    setAddIngredient(false);
  };

  return (
    <Modal closeModal={closeModal}>
      <div className={classes.content}>
        {step == 1 && (
          <>
            <div className={classes.categoriesContainer}>
              <h3 className={classes.heading}>Categories</h3>
              <button
                className={
                  category == "spirit"
                    ? "btn-sidebar " + classes.active
                    : "btn-sidebar"
                }
                onClick={() => getIngredients("spirit")}
              >
                Spirits
              </button>
              <button
                className={
                  category == "liqueur"
                    ? "btn-sidebar " + classes.active
                    : "btn-sidebar"
                }
                onClick={() => getIngredients("liqueur")}
              >
                Liqueurs
              </button>
              <button
                className={
                  category == "alcohol"
                    ? "btn-sidebar " + classes.active
                    : "btn-sidebar"
                }
                onClick={() => getIngredients("alcohol")}
              >
                Alcohol
              </button>
              <button
                className={
                  category == "mixer"
                    ? "btn-sidebar " + classes.active
                    : "btn-sidebar"
                }
                onClick={() => getIngredients("mixer")}
              >
                Mixers
              </button>
            </div>
            <div className={classes.ingredientsContainer}>
              <h3 className={classes.heading}>Ingredients</h3>
              <p className={"text-center " + classes.subHeading}>
                Select ingredient to add
              </p>
              <div>
                {loading && <p>Loading...</p>}
                {!loading &&
                  ingredients.map((ingredient) => (
                    <Link
                      onClick={(e) => selectIngredient(e, ingredient)}
                      key={ingredient.id}
                    >
                      {ingredient.name}
                    </Link>
                  ))}
              </div>
            </div>
          </>
        )}
        {step == 2 && (
          <form
            className={classes.form}
            method="POST"
            onSubmit={(e) => onSubmitIngredient(e, ingredient)}
          >
            <h3>Add ingredient</h3>
            <p>Ingredient: {ingredient.name}</p>
            <div className={classes.inputContainer}>
              <label htmlFor="amount">Amount</label>
              <input ref={amountRef} id="amount" max={99} type="number" />
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="">Measurement</label>
              <input
                ref={measurementRef}
                id="measurement"
                type="text"
                defaultValue="oz"
              />
            </div>
            <button className="btn">Add Ingredient</button>
          </form>
        )}
      </div>
    </Modal>
  );
}

export default AddIngredient;
