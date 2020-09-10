import React, { useState, useEffect, useContext, Fragment } from "react";

import { UserContext } from "../../context/UserContext";
import { ErrorContext } from "../../context/ErrorContext";
import { signupUser } from "../../api/userApi";
import { getSignupDiscordUrl } from "../../api/discordApi";

import {
  StyledPurpleButton,
  StyledFormLink,
} from "../../styles/GlobalStyledComponents";
import { StyledDiscordButton, StyledHr } from "./StyledSignup";

import { useHistory } from "react-router-dom";

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [discordUrl, setDiscordUrl] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const fetchDiscordUrl = async () => {
      const discordUrl = await getSignupDiscordUrl();
      setDiscordUrl(discordUrl);
    };
    fetchDiscordUrl();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    };

    let res = await signupUser(data);
    //if length, returning array of errors from sequelize email validation
    if (res.length) {
      res = res[0];
    }

    if (res.error) {
      setError(res.error);
      setNewUser({ username: "", email: "", password: "" });
      setTimeout(() => {
        setError(undefined);
      }, 2500);
    } else {
      setUser(res.data);
      res && history.push("/challenge");
    }

    //TODO: change minlength of password before deploy
  };

  return (
    <div className="signup-form-content">
      <div className="signup-form-header">
        <h1>Sign Up</h1>
        <p>Sign up with your email</p>
      </div>

      <div className="signup-form-body">
        <form id="submit-form" onSubmit={handleSubmit}>
          <div className="input-area">
            <label htmlFor="signup-username">Username</label>
            <input
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              value={newUser.username}
              type="text"
              id="signup-username"
              name="signup-username"
              autoFocus
              required
            ></input>
          </div>
          <div className="input-area">
            <label htmlFor="signup-email">Email</label>
            <input
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              value={newUser.email}
              type="email"
              id="signup-email"
              name="signup-email"
              required
            ></input>
          </div>
          <div className="input-area">
            <label htmlFor="signup-password">Password</label>
            <input
              onChange={(e) => {
                setNewUser({ ...newUser, password: e.target.value });
              }}
              value={newUser.password}
              type="password"
              name="signup-password"
              id="signup-password"
              minLength="5"
              required
            ></input>
          </div>

          <StyledPurpleButton type="submit">Submit</StyledPurpleButton>
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
              Sign up with Discord
            </StyledDiscordButton>
          </Fragment>
        )}

        <StyledFormLink to="/login">Already have an account?</StyledFormLink>
      </div>
    </div>
  );
};

export default Signup;
