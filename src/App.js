import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import { checkLogin } from "./api/loginApi";
import "./App.css";

import Nav from "./layout/Nav";
import Challenge from "./pages/Challenge";
import Signup from "./pages/Signup";
import DiscordLogin from "./pages/DiscordLogin";
import Login from "./pages/Login";

function App() {
  //TODO: password-reset route
  //TODO: discord login/signup
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const handleLogin = (state, user) => {
    setLoggedIn(state);
    setUserDetails(user);
  };

  // useEffect(() => {
  //   const checkIfLoggedIn = async () => {
  //     const res = await checkLogin(userDetails);
  //     console.log(userDetails);
  //   };
  //   checkIfLoggedIn();
  // }, [userDetails]);

  return (
    <Router>
      <div role="main" className="App">
        <Nav />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/discord-login">
            <DiscordLogin />
          </Route>
          <Route path="/login" exact>
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/challenge">
            <Challenge loggedIn={loggedIn} />
          </Route>

          <Route path="/" exact>
            <Redirect to="/challenge" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
