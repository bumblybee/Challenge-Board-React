import React, { Fragment, useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../api/userApi";
import { getLoginDiscordUrl } from "../api/discordApi";
import {
  StyledPurpleButton,
  StyledFormLink,
} from "../styles/GlobalStyledComponents";
import { StyledDiscordButton, StyledHr } from "./StyledPages";
import Error from "../components/errors/Error";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState(undefined);
  const [discordUrl, setDiscordUrl] = useState(undefined);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const fetchDiscordUrl = async () => {
      const discordUrl = await getLoginDiscordUrl();
      setDiscordUrl(discordUrl);
    };
    fetchDiscordUrl();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await loginUser(userDetails);

    if (user.error) {
      setError(user.error);

      setUserDetails({ email: "", password: "" });

      setTimeout(() => {
        setError(undefined);
      }, 2500);
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
              minLength="5"
            ></input>
          </div>

          <StyledPurpleButton type="submit">Log in</StyledPurpleButton>
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
                class="fab fa-discord fa-2x"
              ></i>
              Log in with Discord
            </StyledDiscordButton>
          </Fragment>
        )}
        <StyledFormLink to="/reset-password-request">
          Forgot password?
        </StyledFormLink>
        <StyledFormLink to="/signup">Need to Register?</StyledFormLink>
      </div>
    </div>
  );
};

export default Login;
