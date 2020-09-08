import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import getParameterByName from "../../utilities/getParameterByName";
import { discordSignup } from "../../api/discordApi";
import { UserContext } from "../../context/UserContext";
import Error from "../../components/errors/Error";
import { StyledDiscordDiv } from "./StyledDiscord";

const DiscordSignup = () => {
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

        setTimeout(() => {
          setError(undefined);
          if (
            user.error === "User credentials already in use. Please log in."
          ) {
            history.push("/login");
          } else {
            history.push("/signup");
          }
        }, 2500);

        
      } else if (user.data.id) {
        setUser(user.data);
        history.push("/challenge");
      }
    };

    postDiscordSignup();
    // eslint-disable-next-line
  }, [setUser]);

  return (
    <StyledDiscordDiv>
      {error && (
        <Error discordError={true}>
          <div>{error}</div>
        </Error>
      )}
    </StyledDiscordDiv>
  );
};

export default DiscordSignup;
