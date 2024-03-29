import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Modal from "../Modal";
import IngredientToggle from "./IngredientToggle";
import classes from "./EditUserIngredients.module.css";

function EditUserIngredients({ setEditIngredients, loadIngredients }) {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("spirit");

  useEffect(() => {
    getIngredients("spirit");
  }, []);

  const getIngredients = (category) => {
    setLoading(true);

    axiosClient
      .get(`/ingredients/user/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setCategory(category);
        setIngredients(data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const closeEditIngredients = () => {
    loadIngredients();
    setEditIngredients(false);
  };

  return (
    <Modal closeModal={closeEditIngredients}>
      <div className={classes.content}>
        <div className={classes.categoriesContainer}>
          <h3 className={classes.heading}>Categories</h3>
          <div>
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
        </div>
        <div className={classes.ingredientsContainer}>
          <h3 className={classes.heading}>Ingredients</h3>
          <p className={"text-center " + classes.subHeading}>
            Tick off ingredients you have available
          </p>
          <div>
            {loading && <p>Loading...</p>}
            {!loading &&
              ingredients.map((ingredient) => (
                <IngredientToggle
                  key={ingredient.id}
                  id={ingredient.id}
                  name={ingredient.name}
                  checked={ingredient.userHas}
                />
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditUserIngredients;
