import React, { Fragment, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

import { getLoginDiscordUrl } from "../../api/discordApi";

import {
  StyledPurpleButton,
  StyledFormLink,
  StyledDiscordIcon,
  StyledDiscordButton,
  StyledFormContent,
  StyledFormHeader,
  StyledFormBody,
  StyledFormInputArea,
} from "../../styles/GlobalStyledComponents";
import { StyledHr } from "./StyledLogin";

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
    <StyledFormContent>
      <StyledFormHeader>
        <h1>Log In</h1>
        <p>Log in with your email and password</p>
      </StyledFormHeader>
      <StyledFormBody>
        <form id="login-form" onSubmit={handleLoginUser}>
          <StyledFormInputArea>
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
          </StyledFormInputArea>
          <StyledFormInputArea>
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
              title="Password is 8 or more characters"
            ></input>
          </StyledFormInputArea>

          <StyledPurpleButton type="submit">Log In</StyledPurpleButton>
        </form>
        {discordUrl && (
          <Fragment>
            <StyledHr></StyledHr>
            <StyledDiscordButton href={discordUrl}>
              <StyledDiscordIcon className="fab fa-discord fa-2x"></StyledDiscordIcon>
              Log In with Discord
            </StyledDiscordButton>
          </Fragment>
        )}
        <StyledFormLink to="/reset-password-request">
          Forgot your password?
        </StyledFormLink>
        <StyledFormLink to="/signup">Need to sign up?</StyledFormLink>
      </StyledFormBody>
    </StyledFormContent>
  );
};

export default Login;
