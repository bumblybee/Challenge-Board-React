import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Nav from "./layout/Nav";
import Challenge from "./pages/Challenge";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  // TODO: Handle signup/login prompt on landing if not signed in

  return (
    <Router>
      <div role="main" className="App">
        <Nav />
        <Switch>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/challenge" exact>
            <Challenge />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
