import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import DashboardRecipes from "../components/Recipes/DashboardRecipes";
import { useStateContext } from "../contexts/ContextProvider";
import classes from "./Dashboard.module.css";

function Dashboard() {
  const { token } = useStateContext();

  return (
    <div className={classes.main}>
      <Outlet />

      <div className="header">
        <h2 className="heading">Dashboard</h2>
      </div>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <div>
            <h3>Community</h3>
            <DashboardRecipes filter="" />
            <Link to="/recipes" className="btn">
              View all
            </Link>
          </div>
          <div>
            <h3>Recommended</h3>
            <DashboardRecipes filter="recommended" />
            <Link to="/recipes" className="btn">
              View all
            </Link>
          </div>
          {token && (
            <>
              <div>
                <h3>Saved</h3>
                <DashboardRecipes filter="" />
                <Link to="/recipes" className="btn">
                  View all
                </Link>
              </div>
              <div>
                <h3>Your Bar</h3>
                <DashboardRecipes filter="available" />
                <Link to="/recipes" className="btn">
                  View all
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
