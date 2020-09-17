import React, { useState } from "react";
import { getUser } from "../../api/userApi";
import { signupUser } from "../../api/userApi";
import { loginUser } from "../../api/userApi";
import { UserContext } from "./UserContext";

const UserState = ({ children }) => {
  const [user, setUser] = useState({});

  const getCurrentUser = async () => {
    const userData = await getUser();
    if (userData.error) {
      return;
    } else {
      setUser(userData.data.user);
    }
  };

  const handleSignup = async (userDetails) => {
    let userData = await signupUser(userDetails);
    //if length, returning array of errors from sequelize email validation
    if (userData.length) {
      userData = userData[0];
    }

    if (userData.error) {
      return userData;
    } else {
      setUser(userData.data);
    }

    //TODO: change minlength of password before deploy
  };

  const handleLogin = async (userDetails) => {
    const userData = await loginUser(userDetails);

    if (userData.error) {
      return userData;
    } else {
      userData && setUser(userData.data);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, getCurrentUser, handleSignup, handleLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
