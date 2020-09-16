import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./styles/App.css";

import ErrorState from "./context/error/ErrorState";
import UserState from "./context/user/UserState";
import ThreadState from "./context/thread/ThreadState";

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
  return (
    <Router>
      <UserState>
        <div role="main" className="App">
          <ErrorState>
            <Error />
            <Nav />
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
              <ThreadState>
                <Route path="/challenge">
                  <Challenge />
                </Route>
              </ThreadState>
              <Route path="/" exact>
                <Redirect to="/challenge" />
              </Route>
            </Switch>
          </ErrorState>
        </div>
      </UserState>
    </Router>
  );
}

export default App;
