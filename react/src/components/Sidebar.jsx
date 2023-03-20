import classes from "./Sidebar.module.css";
import { FaGlassMartiniAlt, FaGraduationCap } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

function Sidebar() {
  const { user, token, setUser, setToken } = useStateContext();

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  const getUser = () => {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setToken(null);
        }
      });
  };

  return (
    <aside className={classes.sidebar}>
      <div>
        <h1 className={classes.heading}>Mixxy</h1>
        <Link className="btn-sidebar" to="/recipes">
          <BiBook />
          <span>Recipes</span>
        </Link>
        <Link className="btn-sidebar" to="/my-bar">
          <FaGlassMartiniAlt />
          My bar
        </Link>
        <a className="btn-sidebar" href="#">
          <FaGraduationCap />
          Learn
        </a>
      </div>
      {!token && (
        <div>
          <Link className="btn-sidebar" to="/login">
            Login
          </Link>
          <Link className="btn-sidebar" to="/register">
            Register
          </Link>
        </div>
      )}
      {token && (
        <div>
          <a className="btn-sidebar" href="#" onClick={onLogout}>
            Logout
          </a>
          <p className={classes.profile}>{user.first_name}</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
