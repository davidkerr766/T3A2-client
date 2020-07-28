import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AboutView from "./components/AboutView";
import RecipesView from "./components/RecipesView";
import BlogsView from "./components/BlogsView";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import Navbar from "./components/Navbar";
import UserContext from "./context/UserContext";
import api from "./api";
import NewRecipe from "./components/NewRecipe";
import EditRecipe from "./components/EditRecipe";
import ErrorMessage from "./components/ErrorMessage";
import ConfirmationMessage from "./components/ConfirmationMessage";
import ShowRecipe from "./components/ShowRecipe";
import NewBlog from "./components/NewBlog";
import EditBlog from "./components/EditBlog";
import ShowBlog from "./components/ShowBlog";
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
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
      }
      const tokenCheck = await api.post("/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenCheck.data) {
        const userRes = await api.get("/users/", {
          headers: { "x-auth-token": token },
        });
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
      <UserContext.Provider
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
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
