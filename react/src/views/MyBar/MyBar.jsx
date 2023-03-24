import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

import AddIngredients from "./AddIngredients";
import classes from "./MyBar.module.css";
import { FiDelete } from "react-icons/fi";

function MyBar() {
  const [ingredientUsers, setIngredientUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addIngredient, setAddIngredient] = useState(false);
  const { token } = useStateContext();

  useEffect(() => {
    if (token) {
      getIngredientUsers();
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const getIngredientUsers = () => {
    setLoading(true);

    axiosClient
      .get("/user-ingredients")
      .then(({ data }) => {
        setLoading(false);
        setIngredientUsers(data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const onDelete = (id) => {
    if (
      !window.confirm("Are you sure you would like to remove this ingredient?")
    ) {
      return;
    }

    axiosClient
      .delete(`/user-ingredients/${id}`)
      .then((response) => {
        // setNotification("Ingredient Removed"); TODO notifications
        getIngredientUsers();
      })
      .catch((err) => {});
  };

  return (
    <>
      {addIngredient && (
        <AddIngredients
          setIngredientUsers={getIngredientUsers}
          setAddIngredients={setAddIngredient}
        />
      )}
      <div className="header">
        <h2 className="heading">MyBar</h2>
      </div>
      <div className={classes.content}>
        <div className={classes.ingredients}>
          <div className={classes.ingredientsHeader}>
            <div />
            <h3 className={classes.ingredientsHeading}>Your Ingredients</h3>
            <div className={classes.addIngredient}>
              <p>
                {/* <button
                  className="btn btn-round"
                  onClick={(ev) => setAddIngredient(true)}
                >
                  <GrAdd />
                </button> */}
                <button
                  className="btn"
                  onClick={(ev) => setAddIngredient(true)}
                >
                  Add
                </button>
              </p>
            </div>
          </div>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5}>Loading...</td>
                </tr>
              )}
              {!loading &&
                ingredientUsers.map((ingredientUser) => (
                  <tr key={ingredientUser.id}>
                    <td>{ingredientUser.name}</td>
                    <td>{ingredientUser.category}</td>
                    <td>
                      <button
                        className={classes.deleteButton}
                        onClick={(ev) => onDelete(ingredientUser.id)}
                      >
                        <FiDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={classes.recipes}>
          <h3>Recipes</h3>
        </div>
      </div>
    </>
  );
}

export default MyBar;
