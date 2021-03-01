import React, { useEffect, useContext, useCallback } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { discordLogin } from "../../api/discordApi";
import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

import { StyledDiscordDiv } from "./StyledDiscord";

const DiscordLogin = () => {
  const { setError } = useContext(ErrorContext);
  const { setUser } = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const values = queryString.parse(location.search);
  const state = values.state;
  const code = values.code;

  const postDiscordLogin = useCallback(async () => {
    const user = await discordLogin(code, state);

    if (user.error) {
      setUser(null);
      setError(user.error);
      history.push("/login");
    } else if (user.data.id) {
      setUser(user.data);

      history.push("/challenge");
    }
  }, []);

  useEffect(() => {
    postDiscordLogin();
  }, [postDiscordLogin]);

  return <StyledDiscordDiv></StyledDiscordDiv>;
};

export default DiscordLogin;
