import React, { useState, useEffect } from "react";
import getParameterByName from "../utilities/getParameterByName";
import { discordSignup } from "../api/discordApi";

import { Redirect } from "react-router-dom";

const DiscordLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  //TODO: handle user trying to login with discord again after already logged in with discord
  useEffect(() => {
    const state = getParameterByName("state");
    const code = getParameterByName("code");

    const postDiscordSignup = async () => {
      const user = await discordSignup(code, state);
      if (user.id) setLoggedIn(true);
      //TODO: add logged in to global state
    };
    postDiscordSignup();
  }, []);

  return (
    <div>{loggedIn ? <Redirect to="/" /> : <span> Loading... </span>}</div>
  );
};

export default DiscordLogin;
