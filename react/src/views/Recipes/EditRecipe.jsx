import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../../axios-client";
import Modal from "../../components/Modal";
import { useStateContext } from "../../contexts/ContextProvider";
import classes from "./AddRecipe.module.css";

function AddRecipe() {
  const { token } = useStateContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const nameRef = useRef();
  const instructionsRef = useRef();

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      instructions: instructionsRef.current.value,
    };

    setErrors(null);

    axiosClient
      .post("/recipes", payload)
      .then(({ data }) => {
        return navigate("/recipes");
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

  return (
    <div className={classes.wrapper}>
      <form method="POST" onSubmit={onSubmit} className={classes.form}>
        <h3>New Recipe</h3>
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        <input ref={nameRef} type="text" placeholder="Cocktail Name" />
        <div className="flex">
          <div className={classes.image}></div>
          <div className={classes.ingredients}>
            <h4>Ingredients</h4>
            {/* <input type="text" placeholder="Cocktail Name" />
          <input type="text" placeholder="Cocktail Name" />
          <input type="text" placeholder="Cocktail Name" /> */}
          </div>
        </div>
        <div className={classes.recipe}>
          <h4>Recipe</h4>
          <p className="text-center"></p>
        </div>
        <textarea ref={instructionsRef} placeholder="Instructions" />
        <button className="btn">Create</button>
      </form>
    </div>
  );
}

export default AddRecipe;
