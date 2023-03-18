import classes from "./Sidebar.module.css";
import { FaGlassMartiniAlt, FaGraduationCap } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

function Sidebar() {
  const { user, token, setUser, setToken } = useStateContext();

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <aside className={classes.sidebar}>
      <div>
        <h1 className={classes.heading}>Mixxy</h1>
        <Link className={classes.link} to="/recipes">
          <BiBook />
          <span>Recipes</span>
        </Link>
        <a className={classes.link} href="#">
          <FaGlassMartiniAlt />
          My bar
        </a>
        <a className={classes.link} href="#">
          <FaGraduationCap />
          Learn
        </a>
      </div>
      {!token && (
        <div>
          <Link className={classes.link} to="/login">
            Login
          </Link>
          <Link className={classes.link} to="/register">
            Register
          </Link>
        </div>
      )}
      {token && (
        <div>
          {/* TODO Turn this into a button */}
          <a className={classes.link} href="#" onClick={onLogout}>
            Logout
          </a>
          <p className={classes.profile}>{user.first_name}</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
