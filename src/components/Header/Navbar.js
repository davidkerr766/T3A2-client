import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">ABOUT</Link>
        <Link to="/recipes">RECIPES</Link>
        <Link to="/blogs">BLOG</Link>
      </div>
      <LoginButton />
    </nav>
  );
};

export default Navbar;
