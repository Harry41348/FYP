import classes from "./UserIngredientsTable.module.css";
import { FiDelete } from "react-icons/fi";
import axiosClient from "../../axios-client";

function UserIngredientsTable({ ingredients, getIngredients, loading }) {
  // Deletes a user ingredient
  const onDelete = (id) => {
    if (
      !window.confirm("Are you sure you would like to remove this ingredient?")
    ) {
      return;
    }

    axiosClient
      .delete(`/user-ingredients/${id}`)
      .then(() => {
        getIngredients();
      })
      .catch(() => {});
  };

  return (
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
          ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.name}</td>
              <td>{ingredient.category}</td>
              <td>
                <button
                  className={classes.deleteButton}
                  onClick={(ev) => onDelete(ingredient.id)}
                >
                  <FiDelete />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default UserIngredientsTable;
