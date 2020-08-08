import React, { useState, useEffect } from "react";
import getParameterByName from "../utilities/getParameterByName";
import { discordSignup } from "../api/discordApi";

import { Redirect } from "react-router-dom";

const DiscordLogin = () => {
  const [loginError, setLoginError] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const state = getParameterByName("state");
    const code = getParameterByName("code");

    const postDiscordSignup = async () => {
      const user = await discordSignup(code, state);
      if (user.id) setLoggedIn(true);
    };
    postDiscordSignup();
  }, []);

  return (
    <div>
      {loggedIn ? <Redirect to="/challenge" /> : <span> Not logged in </span>}

      {loginError ? (
        <div>
          Login Error: <pre>{JSON.stringify(loginError)}</pre>
        </div>
      ) : (
        <span />
      )}
    </div>
  );
};

export default DiscordLogin;
