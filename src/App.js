import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Recipes from "./components/Recipes";
import Blog from "./components/Blog";

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">About</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <Switch>
        <Route path="/recipes" component={Recipes} />
        <Route path="/blog" component={Blog} />
        <Route path="/" component={About} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
