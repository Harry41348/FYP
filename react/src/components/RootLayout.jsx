import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import classes from "./RootLayout.module.css";

function RootLayout() {
  return (
    <div id="rootLayout" className={classes.rootLayout}>
      <Sidebar />
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
