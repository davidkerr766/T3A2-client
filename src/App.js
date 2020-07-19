import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AboutView from "./components/AboutView";
import RecipesView from "./components/RecipesView";
import BlogView from "./components/BlogView";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import Navbar from "./components/Navbar";
import UserContext from './context/UserContext'
import api from './api'

const App = () => {

  const [userData, setUserData] = useState({
    token: "",
    user: undefined
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem("auth-token", "")
      }
      const tokenCheck = await api.post(
        "/users/tokenIsValid",
        null, 
        { headers: { "x-auth-token": token } }
      )
      if (tokenCheck.data) {
        const userRes = await api.get("/users/", { headers: { "x-auth-token": token}})
        setUserData({
          token,
          user: userRes.data
        })
      }
    }
    checkLoggedIn()
  }, [])

  return (
    <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
      <Navbar />
      <Switch>
        <Route path="/recipes" component={RecipesView} />
        <Route path="/blog" component={BlogView} />
        <Route path="/login" component={Login} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/" component={AboutView} />
      </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
