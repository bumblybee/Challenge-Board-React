import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import signupUser from "../api/signupApi";
import { getDiscordUrl, discordSignup } from "../api/discordApi";
import { useHistory } from "react-router-dom";

const Signup = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    signupUser(data);
    history.push("/login");
    //TODO: handle unsuccessful signup
    //TODO: Login user on signup and push to /challenge
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

          <button type="submit">Submit</button>
          {discordUrl && (
            <Fragment>
              <p>or sign up with Discord</p>
              <a className="discord-signup-button" href={discordUrl}>
                <i className="fab fa-discord fa-lg"></i>
              </a>
            </Fragment>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
