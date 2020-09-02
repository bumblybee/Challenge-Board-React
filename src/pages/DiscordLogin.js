import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import getParameterByName from "../utilities/getParameterByName";
import { discordSignup } from "../api/discordApi";
import { UserContext } from "../context/UserContext";
import Error from "../components/errors/Error";
import { StyledDiscordDiv } from "./StyledPages";

const DiscordLogin = () => {
  const [error, setError] = useState(undefined);
  const { setUser } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    const state = getParameterByName("state");
    const code = getParameterByName("code");

    const postDiscordSignup = async () => {
      const user = await discordSignup(code, state);

      if (user.error) {
        setUser(null);
        setError(user.error);
      } else if (user.data.id) {
        setUser(user.data);
        history.push("/challenge");
      }
    };

    postDiscordSignup();
  }, [setUser]);

  return (
    <StyledDiscordDiv>
      {error && (
        <Error discordError={true}>
          <div>{error}</div>
        </Error>
      )}
      {/* (
        //TODO: Loading component
        <span style={{ textAlign: "center" }}> Loading... </span>
      ) */}
    </StyledDiscordDiv>
  );
};

export default DiscordLogin;
