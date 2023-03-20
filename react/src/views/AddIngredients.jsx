import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Modal from "../components/Modal";
import IngredientToggle from "../components/MyBar/IngredientToggle";
import classes from "./AddIngredients.module.css";

function AddIngredients() {
  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIngredients("spirit");
  }, []);

  const getIngredients = (category) => {
    setLoading(true);

    axiosClient
      .get(`/ingredients/user/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setIngredients(data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Modal>
      <div className={classes.content}>
        <div className={classes.categoriesContainer}>
          <h3 className={classes.heading}>Categories</h3>
          <a className="btn-sidebar" href="#">
            Spirits
          </a>
          <a className="btn-sidebar" href="#">
            Liqueurs
          </a>
          <a className="btn-sidebar" href="#">
            Mixers
          </a>
          <a className="btn-sidebar" href="#">
            Garnishes
          </a>
        </div>
        <div className={classes.ingredientsContainer}>
          <h3 className={classes.heading}>Ingredients</h3>
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

export default AddIngredients;
