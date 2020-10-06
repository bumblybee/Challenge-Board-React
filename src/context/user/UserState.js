import React, { useState, useEffect, useCallback } from "react";
import { getUser, signupUser, loginUser, logoutUser } from "../../api/userApi";
import { UserContext } from "./UserContext";

const UserState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = useCallback(async () => {
    setUserLoading(true);
    const userData = await getUser();
    if (userData.error || !userData) {
      setUserLoading(false);
      return;
    } else {
      setUser(userData.data.user);
      setUserLoading(false);
    }
  }, [setUser]);

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
  };

  const handleLogin = async (userDetails) => {
    const userData = await loginUser(userDetails);

    if (userData.error) {
      return userData;
    } else {
      setUser(userData.data);
      return userData;
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getCurrentUser,
        handleSignup,
        handleLogin,
        handleLogout,
        userLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
