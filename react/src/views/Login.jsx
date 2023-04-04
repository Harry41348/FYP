import { Link, useNavigate } from "react-router-dom";

import classes from "./Form.module.css";
import Modal from "../components/Modal";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);

        navigate("/");
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
    <Modal>
      <form method="POST" onSubmit={onSubmit} className={classes.form}>
        <h1 className={classes.title}>Login</h1>
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button className="btn">Login</button>
        <p className="text-center">
          Not a member? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </Modal>
  );
}

export default Login;
