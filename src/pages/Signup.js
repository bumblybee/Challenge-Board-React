import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { signupUser } from "../api/userApi";
import { getSignupDiscordUrl } from "../api/discordApi";
import Error from "../components/errors/Error";
import { StyledPurpleButton } from "../styles/GlobalStyledComponents";
import { StyledDiscordButton } from "./StyledPages";

import { useHistory } from "react-router-dom";

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(undefined);
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
      {error && (
        <Error>
          <div>{error}</div>
        </Error>
      )}
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
            <hr></hr>
            <StyledDiscordButton href={discordUrl}>
              {" "}
              <i className="fab fa-discord fa-lg"></i>
            </StyledDiscordButton>
          </Fragment>
        )}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/login" style={{ fontSize: "1.1rem" }}>
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
