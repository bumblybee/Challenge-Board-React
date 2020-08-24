import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../api/loginApi";

import Error from "../components/errors/Error";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await loginUser(userDetails);
    if (user.error) {
      setError(user.error);
      setUserDetails({ email: "", password: "" });
    } else {
      user && setUser(user.data);

      setIsLoggedIn(true);
      history.push("/challenge");
    }
  };

  return (
    <div className="login-form-content">
      <div className="login-form-header">
        <h1>Log In</h1>
        <p>Log in with your email or Discord login</p>
      </div>

      {error && (
        <Error>
          <div>{error}</div>
        </Error>
      )}
      <div className="login-form-body">
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="input-area">
            <label htmlFor="login-email">Email</label>
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              value={userDetails.email}
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
                setUserDetails({ ...userDetails, password: e.target.value });
              }}
              value={userDetails.password}
              type="password"
              name="login-password"
              id="login-password"
              required
              minLength="5"
            ></input>
          </div>

          <button type="submit">Log In</button>
          <Link to="/reset-password-request">Forgot password?</Link>
          <Link to="/signup">Need to Register?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
