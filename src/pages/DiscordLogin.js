import React, { useState, useEffect, useContext } from "react";
import getParameterByName from "../utilities/getParameterByName";
import { discordSignup } from "../api/discordApi";
import { UserContext } from "../context/UserContext";

import { Redirect } from "react-router-dom";

const DiscordLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext);
  //TODO: handle user trying to login with discord again after already logged in with discord
  useEffect(() => {
    const state = getParameterByName("state");
    const code = getParameterByName("code");

    const postDiscordSignup = async () => {
      const user = await discordSignup(code, state);
      if (user.id) {
        setLoggedIn(true);
        setUser(user);
      }
    };
    postDiscordSignup();
  }, [setUser]);

  return (
    <div>{loggedIn ? <Redirect to="/" /> : <span> Loading... </span>}</div>
  );
};

export default DiscordLogin;
