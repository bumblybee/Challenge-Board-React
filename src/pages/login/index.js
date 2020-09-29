import React, { Fragment, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

import { getLoginDiscordUrl } from "../../api/discordApi";

import {
  StyledPurpleButton,
  StyledFormLink,
} from "../../styles/GlobalStyledComponents";
import { StyledDiscordButton, StyledHr } from "./StyledLogin";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const { setError } = useContext(ErrorContext);
  const { handleLogin } = useContext(UserContext);
  const [discordUrl, setDiscordUrl] = useState(undefined);

  const history = useHistory();

  useEffect(() => {
    const fetchDiscordUrl = async () => {
      const discordUrl = await getLoginDiscordUrl();
      setDiscordUrl(discordUrl);
    };
    fetchDiscordUrl();
  }, []);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const loginUser = await handleLogin(userDetails);

    loginUser && loginUser.error
      ? setError(loginUser.error)
      : history.push("/challenge");
  };

  return (
    <div className="login-form-content">
      <div className="login-form-header">
        <h1>Log In</h1>
        <p>Log in with your email and password</p>
      </div>
      <div className="login-form-body">
        <form id="login-form" onSubmit={handleLoginUser}>
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
              autoFocus
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
              minLength="8"
            ></input>
          </div>

          <StyledPurpleButton type="submit">Log In</StyledPurpleButton>
        </form>
        {discordUrl && (
          <Fragment>
            <StyledHr></StyledHr>
            <StyledDiscordButton href={discordUrl}>
              <i
                style={{
                  position: "absolute",
                  opacity: "0.3",
                  left: "47%",
                  top: "2px",
                }}
                className="fab fa-discord fa-2x"
              ></i>
              Log In with Discord
            </StyledDiscordButton>
          </Fragment>
        )}
        <StyledFormLink to="/reset-password-request">
          Forgot your password?
        </StyledFormLink>
        <StyledFormLink to="/signup">Need to sign up?</StyledFormLink>
      </div>
    </div>
  );
};

export default Login;
