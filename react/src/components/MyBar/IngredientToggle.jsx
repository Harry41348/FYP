import { useState } from "react";
import axiosClient from "../../axios-client";

import classes from "./IngredientToggle.module.css";

function IngredientToggle(props) {
  const [checked, setChecked] = useState(props.checked);

  const toggledIngredient = () => {
    axiosClient
      .post(`/user-ingredients/toggle/${props.id}`)
      .then(({ data }) => {
        setChecked(data.userHas);
      })
      .catch((err) => {});
  };

  return (
    <div key={props.id}>
      <div className={classes.inputWrapper}>
        <input
          type="checkbox"
          className={classes.checkbox}
          id={props.id}
          name={props.id}
          defaultChecked={checked}
          onChange={toggledIngredient}
        />
        <label className={classes.toggle} htmlFor={props.id}>
          {props.name}
        </label>
      </div>
    </div>
  );
}

export default IngredientToggle;
