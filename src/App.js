import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import { checkLogin } from "./api/loginApi";
import "./App.css";
import { UserContext } from "./context/UserContext";
import Nav from "./layout/Nav";
import Challenge from "./pages/Challenge";
import Signup from "./pages/Signup";
import DiscordLogin from "./pages/DiscordLogin";
import Login from "./pages/Login";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";

function App() {
  //TODO: password-reset route

  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div role="main" className="App">
        <Nav />
        <Switch>
          <UserContext.Provider value={value}>
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
            <Route path="/challenge">
              <Challenge />
            </Route>

            <Route path="/" exact>
              <Redirect to="/challenge" />
            </Route>
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
