import { Link, useNavigate } from "react-router-dom";

import classes from "./Form.module.css";
import Modal from "../components/Modal";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

function Register() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errors, setErrors] = useState(null);
  const { setUser, setToken, setNotification } = useStateContext();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    setErrors(null);

    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        setNotification("You have been successfully registered!");

        navigate("/");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
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
    <Modal>
      <form method="POST" onSubmit={onSubmit} className={classes.form}>
        <h1 className={classes.title}>Register</h1>
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        <input ref={firstNameRef} type="text" placeholder="First Name" />
        <input ref={lastNameRef} type="text" placeholder="Last Name" />
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <input
          ref={passwordConfirmationRef}
          type="password"
          placeholder="Password Confirmation"
        />
        <button className="btn btn-block">Register</button>
        <p className="message">
          Already a member? <Link to="/login">Login</Link>
        </p>
      </form>
    </Modal>
  );
}

export default Register;
