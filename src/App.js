import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./styles/App.css";

import { ErrorContext } from "./context/ErrorContext";
import { UserContext } from "./context/UserContext";

import { getUser } from "./api/userApi";

import Error from "./components/errors/Error";
import Nav from "./components/layout/Nav";
import Challenge from "./pages/challenge";
import Signup from "./pages/signup";
import DiscordLogin from "./pages/discord/DiscordLogin";
import DiscordSignup from "./pages/discord/DiscordSignup";
import Login from "./pages/login";
import Account from "./pages/account";
import ResetPasswordRequest from "./pages/password/ResetPasswordRequest";
import ResetPassword from "./pages/password/ResetPassword";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const userValue = { user, setUser };
  const errorValue = { error, setError };

  useEffect(() => {
    const getUserData = async () => {
      const auth = await getUser();
      console.log(auth);

      if (auth.error) {
        return;
      } else {
        auth && setUser(auth.data.user);
      }
    };
    getUserData();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={userValue}>
        <ErrorContext.Provider value={errorValue}>
          <div role="main" className="App">
            <Nav />
            <Error />
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/discord-signup" exact>
                <DiscordSignup />
              </Route>
              <Route path="/discord-login">
                <DiscordLogin />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/account">
                <Account />
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
        </ErrorContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
