import React, { useState } from "react";
import { getUser } from "../../api/userApi";
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

  const handleLogin = async (userDetails) => {
    const user = await loginUser(userDetails);

    if (user.error) {
      return user;
    } else {
      user && setUser(user.data);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, getCurrentUser, handleLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
