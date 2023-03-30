import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import RecipeGroup from "../../components/Recipes/RecipeGroup";
import { useStateContext } from "../../contexts/ContextProvider";
import classes from "./Recipes.module.css";

function Recipes() {
  const { token } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState({});
  const [message, setMessage] = useState("");

  const recommendRef = useRef();
  const shuffleRef = useRef();
  const savedRef = useRef();
  const availableRef = useRef();
  const createdRef = useRef();

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    setLoading(true);

    let requestParams = {
      recommended: recommendRef.current.checked,
      shuffle: shuffleRef.current.checked,
    };

    if (token) {
      requestParams.saved = savedRef.current.checked;
      requestParams.available = availableRef.current.checked;
      requestParams.created = createdRef.current.checked;
    }

    axiosClient
      .get(`/recipes`, { params: requestParams })
      .then(({ data }) => {
        setLoading(false);
        if (data.message != null) {
          setMessage(data.message);
        } else {
          setRecipes(data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.main}>
      <Outlet />

      <div className={"header " + classes.header}>
        <h2 className="heading">Recipes</h2>
        <input type="text" className="search-bar" placeholder="Search.." />
        <Link className="btn" to="/recipes/create">
          Create Recipe
        </Link>
      </div>
      <div className={classes.content}>
        <aside className={classes.sidebar}>
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              getRecipes();
            }}
          >
            Refresh
          </button>
          <div className={"toggleWrapper " + classes.toggle}>
            <input
              ref={recommendRef}
              type="checkbox"
              className="checkbox"
              id="recommendedToggle"
            />
            <label className="label" htmlFor="recommendedToggle">
              Recommended
            </label>
          </div>
          <div className={"toggleWrapper " + classes.toggle}>
            <input
              ref={shuffleRef}
              type="checkbox"
              className="checkbox"
              id="shuffleToggle"
            />
            <label className="label" htmlFor="shuffleToggle">
              Shuffle
            </label>
          </div>
          {token && (
            <>
              <div className={"toggleWrapper " + classes.toggle}>
                <input
                  ref={savedRef}
                  type="checkbox"
                  className="checkbox"
                  id="savedToggle"
                />
                <label className="label" htmlFor="savedToggle">
                  Saved
                </label>
              </div>
              <div className={"toggleWrapper " + classes.toggle}>
                <input
                  ref={availableRef}
                  type="checkbox"
                  className="checkbox"
                  id="availableToggle"
                />
                <label className="label" htmlFor="availableToggle">
                  Can make
                </label>
              </div>
              <div className={"toggleWrapper " + classes.toggle}>
                <input
                  ref={createdRef}
                  type="checkbox"
                  className="checkbox"
                  id="availableToggle"
                />
                <label className="label" htmlFor="availableToggle">
                  Created
                </label>
              </div>
            </>
          )}
        </aside>
        <div className={classes.recipesContainer}>
          <RecipeGroup loading={loading} message={message} recipes={recipes} />
        </div>
        <div />
      </div>
    </div>
  );
}

export default Recipes;
