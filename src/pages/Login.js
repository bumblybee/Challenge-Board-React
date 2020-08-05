import React, { useState } from "react";
import loginUser from "../api/loginApi";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: user.email,
      password: user.password,
    };

    loginUser(data);

    // TODO: handle logged in / unsuccessful login
    //TODO: figure out how to get questions to render after login?

    history.push("/challenge");
  };

  return (
    <div className="login-form-content">
      <div className="login-form-header">
        <h1>Log In</h1>
        <p>Log in with your email or Discord login</p>
      </div>
      <div className="login-form-body">
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="input-area">
            <label htmlFor="login-email">Email</label>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              type="email"
              id="login-email"
              name="login-email"
              required
            ></input>
          </div>
          <div className="input-area">
            <label htmlFor="login-password">Password</label>
            <input
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              value={user.password}
              type="password"
              name="login-password"
              id="login-password"
              required
              minLength="5"
            ></input>
          </div>
          {/* <button type="submit">Log in with Discord</button> */}
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
