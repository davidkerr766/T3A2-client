import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AboutView from "./components/About/AboutView";
import RecipesView from "./components/Recipe/RecipesView";
import BlogsView from "./components/Blog/BlogsView";
import Login from "./components/User/Login";
import ChangePassword from "./components/User/ChangePassword";
import Navbar from "./components/Header/Navbar";
import AppContext from "./context/AppContext";
import api from "./api";
import NewRecipe from "./components/Recipe/NewRecipe";
import EditRecipe from "./components/Recipe/EditRecipe";
import ErrorMessage from "./components/Header/ErrorMessage";
import ConfirmationMessage from "./components/Header/ConfirmationMessage";
import ShowRecipe from "./components/Recipe/ShowRecipe";
import NewBlog from "./components/Blog/NewBlog";
import EditBlog from "./components/Blog/EditBlog";
import ShowBlog from "./components/Blog/ShowBlog";
import "./style.css";

const App = () => {
  const [userData, setUserData] = useState({
    token: "",
    user: undefined,
  });
  const [confMsg, setConfMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [recipes, setRecipes] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      // get the jwt if there is one
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
      }
      // Check it's a valid token
      const tokenCheck = await api.post("/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenCheck.data) {
        // If the token is valid get the data for the logged in user
        const userRes = await api.get("/users/", {
          headers: { "x-auth-token": token },
        });
        // Load the user into state so they don't need to manually log in
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();

    // Get Recipes
    api.get("/recipes").then((res) => {
      setRecipes(res.data);
    });

    // Get Blogs
    api.get("/blogs").then((res) => {
      setBlogs(res.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          userData,
          setUserData,
          confMsg,
          setConfMsg,
          setErrorMsg,
          recipes,
          setRecipes,
          blogs,
          setBlogs,
        }}
      >
        <Navbar />
        <div id="main">
          {errorMsg && (
            <ErrorMessage
              message={errorMsg}
              clearError={() => setErrorMsg(undefined)}
            />
          )}
          {confMsg && (
            <ConfirmationMessage
              message={confMsg}
              clearMessage={() => setConfMsg(undefined)}
            />
          )}
          <Switch>
            <Route path="/recipes/new" component={NewRecipe} />
            <Route exact path="/recipes/:index" component={ShowRecipe} />
            <Route path="/recipes/:index/edit" component={EditRecipe} />
            <Route path="/recipes" component={RecipesView} />
            <Route path="/blogs/new" component={NewBlog} />
            <Route exact path="/blogs/:index" component={ShowBlog} />
            <Route path="/blogs/:index/edit" component={EditBlog} />
            <Route path="/blogs" component={BlogsView} />
            <Route path="/login" component={Login} />
            <Route path="/change-password" component={ChangePassword} />
            <Route path="/" component={AboutView} />
          </Switch>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
