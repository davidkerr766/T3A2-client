import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../context/AppContext";
import api from "../../api";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUserData, setConfMsg, setErrorMsg } = useContext(AppContext);
  const history = useHistory();

  const submit = async (e) => {
    try {
      e.preventDefault();
      const loginDetails = { email, password };
      // send the login details to the api
      const loginRes = await api.post("/users/login", loginDetails);
      // load the user details into state
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      // put jwt in local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      setConfMsg(loginRes.data.message);
      history.push("/");
    } catch (err) {
      if (err.response.data.error) setErrorMsg(err.response.data.error);
    }
  };

  return (
    <div className="browse">
      <h1>Login</h1>
      <form onSubmit={submit}>
        <label htmlFor="loginEmail">Email:</label> <br />
        <input
          type="text"
          id="loginEmail"
          onChange={(e) => setEmail(e.target.value)}
        ></input>{" "}
        <br />
        <label htmlFor="loginPassword">Password:</label> <br />
        <input
          type="password"
          id="loginPassword"
          onChange={(e) => setPassword(e.target.value)}
        ></input>{" "}
        <br />
        <input type="submit" value="log in" />
      </form>
    </div>
  );
};

export default Login;
