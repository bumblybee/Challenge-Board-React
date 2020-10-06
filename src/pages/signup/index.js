import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment,
} from "react";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

import { getSignupDiscordUrl } from "../../api/discordApi";

import * as sc from "../../styles/GlobalStyledComponents";

import { useHistory } from "react-router-dom";

const Signup = () => {
  const { setError } = useContext(ErrorContext);
  const { handleSignup } = useContext(UserContext);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [discordUrl, setDiscordUrl] = useState(undefined);
  const history = useHistory();
  const passwordRef = useRef();

  useEffect(() => {
    const fetchDiscordUrl = async () => {
      const discordUrl = await getSignupDiscordUrl();
      setDiscordUrl(discordUrl);
    };
    fetchDiscordUrl();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    };

    const user = await handleSignup(data);
    user && user.error ? setError(user.error) : history.push("/challenge");
  };

  const handleShowPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  return (
    <sc.StyledFormContent>
      <sc.StyledFormHeader>
        <h1>Sign Up</h1>
        <p>Sign up with your email and password</p>
      </sc.StyledFormHeader>

      <sc.StyledFormBody>
        <form id="submit-form" onSubmit={handleSubmit}>
          <sc.StyledFormInputArea>
            <label htmlFor="signup-username">Username</label>
            <input
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              value={newUser.username}
              type="text"
              id="signup-username"
              name="signup-username"
              autoFocus
              required
            ></input>
          </sc.StyledFormInputArea>
          <sc.StyledFormInputArea>
            <label htmlFor="signup-email">Email</label>
            <input
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              value={newUser.email}
              type="email"
              id="signup-email"
              name="signup-email"
              required
            ></input>
          </sc.StyledFormInputArea>
          <sc.StyledFormInputArea>
            <label htmlFor="signup-password">Password</label>
            <input
              ref={passwordRef}
              onChange={(e) => {
                setNewUser({ ...newUser, password: e.target.value });
              }}
              value={newUser.password}
              type="password"
              name="signup-password"
              id="signup-password"
              minLength="8"
              required
            ></input>
            <sc.StyledPasswordIcon
              onClick={handleShowPassword}
              className="fas fa-eye"
            ></sc.StyledPasswordIcon>
          </sc.StyledFormInputArea>

          <sc.StyledPurpleButton type="submit">Submit</sc.StyledPurpleButton>
        </form>

        {discordUrl && (
          <Fragment>
            <sc.StyledHr></sc.StyledHr>
            <sc.StyledDiscordButton href={discordUrl}>
              <sc.StyledDiscordIcon className="fab fa-discord fa-2x"></sc.StyledDiscordIcon>
              Sign Up with Discord
            </sc.StyledDiscordButton>
          </Fragment>
        )}

        <sc.StyledFormLink to="/login">
          Already have an account?
        </sc.StyledFormLink>
      </sc.StyledFormBody>
    </sc.StyledFormContent>
  );
};

export default Signup;
