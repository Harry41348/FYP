import classes from "./Sidebar.module.css";
import { FaGlassMartiniAlt, FaGraduationCap } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useRef } from "react";
import axiosClient from "../axios-client";

function Sidebar() {
  const { user, token, setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const navCheckboxRef = useRef();

  useEffect(() => {
    if (token) {
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
    }
  }, []);

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);

      return navigate("/");
    });
  };

  return (
    <>
      <div className={classes.desktop} role="navigation">
        <aside className={classes.sidebar}>
          <div>
            <h1 className={classes.heading}>Mixxy</h1>
            <Link className="btn-sidebar" to="/">
              <AiFillHome />
              Dashboard
            </Link>
            <Link className="btn-sidebar" to="/recipes">
              <ImBook />
              Recipes
            </Link>
            <Link className="btn-sidebar" to="/my-bar">
              <FaGlassMartiniAlt />
              My bar
            </Link>
            <Link className="btn-sidebar" to="/learning">
              <FaGraduationCap />
              Learn
            </Link>
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
              <button className="btn-sidebar" onClick={onLogout}>
                Logout
              </button>
              <p className={classes.profile}>{user.first_name}</p>
            </div>
          )}
        </aside>
      </div>

      <div className={classes.mobile} role="navigation">
        <div className={classes.menuToggle} id="menuToggle">
          <input ref={navCheckboxRef} type="checkbox" id="navMenu" />
          <span></span>
          <span></span>
          <span></span>
          <aside className={classes.sidebarMobile}>
            <div>
              <h1 className={classes.heading}>Mixxy</h1>
              <Link
                onClick={() => (navCheckboxRef.current.checked = false)}
                className="btn-sidebar"
                to="/"
              >
                Dashboard
              </Link>
              <Link
                onClick={() => (navCheckboxRef.current.checked = false)}
                className="btn-sidebar"
                to="/recipes"
              >
                Recipes
              </Link>
              <Link
                onClick={() => (navCheckboxRef.current.checked = false)}
                className="btn-sidebar"
                to="/my-bar"
              >
                My bar
              </Link>
              <Link
                onClick={() => (navCheckboxRef.current.checked = false)}
                className="btn-sidebar"
                to="/learning"
              >
                Learn
              </Link>
            </div>
            {!token && (
              <div className={classes.sidebarAuth}>
                <Link
                  onClick={() => (navCheckboxRef.current.checked = false)}
                  className="btn-sidebar"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  onClick={() => (navCheckboxRef.current.checked = false)}
                  className="btn-sidebar"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            )}
            {token && (
              <div>
                <button className="btn-sidebar" onClick={onLogout}>
                  Logout
                </button>
                <p className={classes.profile}>{user.first_name}</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
