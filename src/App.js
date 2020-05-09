import React, { useEffect } from "react";
import "./styles.css";
import Home from "./Home";
import Auth from "./Auth";
import { useDispatch } from "react-redux";
import { authCheckState } from "./redux/actionCreater";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        <h1>Hello CodeSandbox</h1>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={Auth} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
