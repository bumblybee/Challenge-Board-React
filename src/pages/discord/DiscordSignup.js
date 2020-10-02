import React, { useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import getParameterByName from "../../utilities/getParameterByName";
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
    const state = getParameterByName("state");
    const code = getParameterByName("code");
    // const { search } = location;
    // const query = new URLSearchParams(search);
    // const field = query.get("field");
    // const val = query.get("val");
    // console.log(field, val);

    const postDiscordSignup = async () => {
      const user = await discordSignup(code, state);

      if (user.error) {
        setUser(null);
        setError(user.error);

        if (user.error === "User credentials already in use. Please log in.") {
          // history.push("/login");
        } else {
          history.push("/signup");
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
