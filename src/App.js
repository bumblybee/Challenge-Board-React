import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./styles/App.css";

import { UserContext } from "./context/UserContext";
import { checkLogin } from "./api/userApi";

import Nav from "./layout/Nav";
import Challenge from "./pages/Challenge";
import Signup from "./pages/Signup";
import DiscordLogin from "./pages/DiscordLogin";
import DiscordSignup from "./pages/DiscordSignup";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [user, setUser] = useState(null);
  const userValue = { user, setUser };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const auth = await checkLogin();
      console.log(auth);
      //TODO: Handle error, not getting our custom setup error code
      if (auth.Error) {
        return;
      } else {
        auth && setUser(auth.data.user);
      }
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
      </UserContext.Provider>
    </Router>
  );
}

export default App;
