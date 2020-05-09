import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/actionCreater";

const Home = props => {
  let dispatch = useDispatch();

  let onClickLogout = () => {
    props.history.push("/");
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={onClickLogout}>logout</button>
    </div>
  );
};

export default Home;
