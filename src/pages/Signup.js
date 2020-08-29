import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import { signupUser } from "../api/userApi";
import { getDiscordUrl } from "../api/discordApi";
import Error from "../components/errors/Error";
import { StyledPurpleButton } from "../styles/GlobalStyledComponents";

import { useHistory } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState(undefined);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [discordUrl, setDiscordUrl] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const fetchDiscordUrl = async () => {
      const discordUrl = await getDiscordUrl();
      setDiscordUrl(discordUrl);
    };
    fetchDiscordUrl();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    let res = await signupUser(data);
    //if length, returning array of errors from sequelize email validation
    if (res.length) {
      res = res[0];
    }

    if (res.error) {
      setError(res.error);
      setUser({ username: "", email: "", password: "" });
      console.log(res);
    } else {
      res && history.push("/login");
    }

    //TODO: change minlength of password
    //TODO: Login user on signup and push to /challenge
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
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
              type="text"
              id="signup-username"
              name="signup-username"
              required
            ></input>
          </div>
          <div className="input-area">
            <label htmlFor="signup-email">Email</label>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
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
                setUser({ ...user, password: e.target.value });
              }}
              value={user.password}
              type="password"
              name="signup-password"
              id="signup-password"
              required
              minLength="5"
            ></input>
          </div>

          <StyledPurpleButton type="submit">Submit</StyledPurpleButton>
          {discordUrl && (
            <Fragment>
              <StyledPurpleButton href={discordUrl}>
                <i className="fab fa-discord fa-lg"></i>
              </StyledPurpleButton>
            </Fragment>
          )}
          <Link to="/login">Already have an account?</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
