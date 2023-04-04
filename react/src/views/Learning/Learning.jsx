import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import classes from "./Learning.module.css";

function Learning() {
  const [path, setPath] = useState(window.location.pathname);

  return (
    <div className={classes.main}>
      <div className={"header " + classes.header}>
        <h2 className="heading">Learning</h2>
        <div className={classes.linksContainer}>
          <Link
            className={
              path == "/learning/equipment"
                ? classes.link + " " + classes.active
                : classes.link
            }
            onClick={(e) => setPath("/learning/equipment")}
            to="/learning/equipment"
          >
            Equipment
          </Link>
          <Link
            className={
              path == "/learning/ingredients"
                ? classes.link + " " + classes.active
                : classes.link
            }
            onClick={(e) => setPath("/learning/ingredients")}
            to="/learning/ingredients"
          >
            Ingredients
          </Link>
          <Link
            className={
              path == "/learning/technique"
                ? classes.link + " " + classes.active
                : classes.link
            }
            onClick={(e) => setPath("/learning/technique")}
            to="/learning/technique"
          >
            Technique
          </Link>
        </div>
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Learning;
