import classes from "./Sidebar.module.css";
import { FaGlassMartiniAlt, FaGraduationCap } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

function Sidebar() {
  const { user, token, setUser, setToken } = useStateContext();

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
      </div>

      <div className={classes.mobile} role="navigation">
        <div className={classes.menuToggle} id="menuToggle">
          <input type="checkbox" id="navMenu" />
          <span></span>
          <span></span>
          <span></span>
          <aside className={classes.sidebarMobile}>
            <div>
              <h1 className={classes.heading}>Mixxy</h1>
              <Link className="btn-sidebar" to="/">
                Dashboard
              </Link>
              <Link className="btn-sidebar" to="/recipes">
                Recipes
              </Link>
              <Link className="btn-sidebar" to="/my-bar">
                My bar
              </Link>
              <a className="btn-sidebar" href="#">
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
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default Sidebar;
