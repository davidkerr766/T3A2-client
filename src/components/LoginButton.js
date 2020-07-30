import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";

const LoginButton = () => {
  const { userData, setUserData, setConfMsg } = useContext(AppContext);

  const history = useHistory();
  const login = () => history.push("/login");
  const changePassword = () => history.push("/change-password");
  const logOut = () => {
    // remove the user from state
    setUserData({
      token: undefined,
      user: undefined,
    });
    // remove the jwt from local storage
    localStorage.setItem("auth-token", "");
    setConfMsg("Successfully Logged Out");
    history.push("/about");
  };

  return (
    <div>
      {/* only show the relevant buttons depending if the user is logged in */}
      {userData.user ? (
        <>
          <button onClick={logOut}>LOG OUT</button>
          <button onClick={changePassword}>CHANGE PASSWORD</button>
        </>
      ) : (
        <button onClick={login}>LOGIN</button>
      )}
    </div>
  );
};

export default LoginButton;
