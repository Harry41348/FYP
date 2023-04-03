import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import classes from "./RootLayout.module.css";
import { useStateContext } from "../contexts/ContextProvider";

function RootLayout() {
  const { notification, setNotification } = useStateContext();

  return (
    <div id="rootLayout" className={classes.rootLayout}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
      {notification && (
        <div
          className="notification fadeOut"
          onClick={(e) => {
            setNotification("");
          }}
        >
          {notification}
        </div>
      )}
    </div>
  );
}

export default RootLayout;
