import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./styles/App.css";

import { UserContext } from "./context/UserContext";
import { checkLogin } from "./api/loginApi";

import Nav from "./layout/Nav";
import Challenge from "./pages/Challenge";
import Signup from "./pages/Signup";
import DiscordLogin from "./pages/DiscordLogin";
import Login from "./pages/Login";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const auth = await checkLogin();
      auth && setUser(auth);
      console.log(auth);
    };
    checkIfLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={userValue}>
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
              <Login />
            </Route>

            <Route path="/reset-password-request">
              <ResetPasswordRequest />
            </Route>
            <Route path="/reset-password/:token">
              <ResetPassword />
            </Route>
            <Route path="/challenge">
              <Challenge />
            </Route>

            <Route path="/" exact>
              <Redirect to="/challenge" />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
