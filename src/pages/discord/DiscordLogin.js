import React, { useEffect, useContext } from "react";
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

  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = values.state;
    const code = values.code;

    const postDiscordLogin = async () => {
      const user = await discordLogin(code, state);

      if (user.error) {
        setUser(null);
        setError(user.error);
        history.push("/login");
      } else if (user.data.id) {
        setUser(user.data);

        history.push("/challenge");
      }
    };

    postDiscordLogin();
  }, [setUser, history, location.search, setError]);

  return <StyledDiscordDiv></StyledDiscordDiv>;
};

export default DiscordLogin;
