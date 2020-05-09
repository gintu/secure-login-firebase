import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./redux/actionCreater";
import { Redirect } from "react-router-dom";

const Auth = props => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [login, setLogin] = useState(false);
  let loading = useSelector(state => state.loading);
  let authenticated = useSelector(state => state.token);
  let dispatch = useDispatch();

  let submitHandler = e => {
    e.preventDefault();
    console.log(email, password);
    dispatch(auth(email, password, login));
  };

  let isAuthenticated = null;
  if (authenticated) {
    isAuthenticated = <Redirect to="/home" />;
  }
  let switchState = () => {
    setLogin(prev => !prev);
  };

  let btn = (
    <button onClick={switchState}>
      {" "}
      switch to {login ? "SignUp" : "Login"}
    </button>
  );

  if (loading) {
    btn = <p>Loading....</p>;
  }
  return (
    <div>
      {isAuthenticated}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>

      {btn}
    </div>
  );
};

export default Auth;
