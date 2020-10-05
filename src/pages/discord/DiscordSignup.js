import React, { useEffect, useContext } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

import { discordSignup } from "../../api/discordApi";
import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

import { StyledDiscordDiv } from "./StyledDiscord";

const DiscordSignup = () => {
  const { setError } = useContext(ErrorContext);
  const { setUser } = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = values.state;
    const code = values.code;

    const postDiscordSignup = async () => {
      const user = await discordSignup(code, state);

      if (user.error) {
        setUser(null);
        setError(user.error);

        if (user.error === "User credentials already in use. Please log in.") {
          history.push("/login");
        } else {
          // history.push("/signup");
        }
      } else if (user.data.id) {
        setUser(user.data);
        history.push("/challenge");
      }
    };

    postDiscordSignup();
  }, []);

  return <StyledDiscordDiv></StyledDiscordDiv>;
};

export default DiscordSignup;
