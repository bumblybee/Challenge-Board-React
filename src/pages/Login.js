import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../api/userApi";
import { StyledPurpleButton } from "../styles/GlobalStyledComponents";
import Error from "../components/errors/Error";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState(undefined);

  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await loginUser(userDetails);
    console.log(user);
    if (user.error) {
      setError(user.error);
      setUserDetails({ email: "", password: "" });
    } else {
      user && setUser(user.data);

      history.push("/challenge");
    }
  };

  return (
    <div className="login-form-content">
      <div className="login-form-header">
        <h1>Log In</h1>
        <p>Log in with your email and password</p>
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

          <StyledPurpleButton type="submit">Log In</StyledPurpleButton>
          <Link style={{ fontSize: "1.05rem" }} to="/reset-password-request">
            Forgot password?
          </Link>
          <Link style={{ fontSize: "1.05rem" }} to="/signup">
            Need to Register?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
