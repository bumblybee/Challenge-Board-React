import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import getParameterByName from "../../utilities/getParameterByName";
import { discordLogin } from "../../api/discordApi";
import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

import { StyledDiscordDiv } from "./StyledDiscord";

const DiscordLogin = () => {
  const { setError } = useContext(ErrorContext);
  const { setUser } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    const state = getParameterByName("state");
    const code = getParameterByName("code");

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
    // eslint-disable-next-line
  }, [setUser]);

  return <StyledDiscordDiv></StyledDiscordDiv>;
};

export default DiscordLogin;
