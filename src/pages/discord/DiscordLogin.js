import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import getParameterByName from "../../utilities/getParameterByName";
import { discordLogin } from "../../api/discordApi";
import { UserContext } from "../../context/UserContext";
import { ErrorContext } from "../../context/ErrorContext";
import Error from "../../components/errors/Error";
import { StyledDiscordDiv } from "./StyledDiscord";

const DiscordLogin = () => {
  const { error, setError } = useContext(ErrorContext);
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
        setTimeout(() => {
          setError(undefined);
          history.push("/login");
        }, 2500);
      } else if (user.data.id) {
        setUser(user.data);
        history.push("/challenge");
      }
    };

    postDiscordLogin();
    // eslint-disable-next-line
  }, [setUser]);

  return <StyledDiscordDiv>{error && <Error />}</StyledDiscordDiv>;
};

export default DiscordLogin;
