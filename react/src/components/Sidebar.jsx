import classes from "./Sidebar.module.css";
import { FaGlassMartiniAlt, FaGraduationCap } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { Link } from "react-router-dom";

function Sidebar() {
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
          Your bar
        </a>
        <a className={classes.link} href="#">
          <FaGraduationCap />
          Learn
        </a>
      </div>
      <div>
        <p className={classes.profile}>Harry</p>
      </div>
    </aside>
  );
}

export default Sidebar;
