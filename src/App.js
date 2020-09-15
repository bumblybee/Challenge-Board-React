import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./styles/App.css";

import ErrorState from "./context/errors/ErrorState";

import UserState from "./context/user/UserState";

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
  useEffect(() => {
    // const getUserData = async () => {
    //   const userData = await getUser();
    //   console.log(userData);
    //   if (userData.error) {
    //     return;
    //   } else {
    //     userData && setUser(userData.data.user);
    //   }
    // };
    // getUserData();
  }, []);

  return (
    <Router>
      <UserState>
        <ErrorState>
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
        </ErrorState>
      </UserState>
    </Router>
  );
}

export default App;
