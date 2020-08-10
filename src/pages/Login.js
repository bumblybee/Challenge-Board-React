import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../api/loginApi";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = await loginUser(userDetails);

    newUser && setUser(newUser);

    // TODO: handle logged in / unsuccessful login

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
          {/* <button type="submit">Log in with Discord</button> */}

          <button type="submit">Log In</button>
          <Link to="/reset-password-request">Forgot password?</Link>
          <Link to="/signup">Need to Register?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
