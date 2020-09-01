import React, { useState, useEffect, useContext } from "react";
import getParameterByName from "../utilities/getParameterByName";
import { discordSignup } from "../api/discordApi";
import { UserContext } from "../context/UserContext";
import Error from "../components/errors/Error";

import { Redirect } from "react-router-dom";

const DiscordLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(undefined);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const state = getParameterByName("state");
    const code = getParameterByName("code");

    const postDiscordSignup = async () => {
      const user = await discordSignup(code, state);

      if (user.error) {
        setUser(null);
        setError(user.error);
      } else {
        setLoggedIn(true);
        setUser(user.data);
      }
    };

    postDiscordSignup();
  }, [setUser]);

  return (
    <div>
      {loggedIn ? (
        <Redirect to="/" />
      ) : error ? (
        <Error>
          <div>{error}</div>
        </Error>
      ) : (
        <span> Loading... </span>
      )}
    </div>
  );
};

export default DiscordLogin;
