import React, { useState } from "react";
import { getUser } from "../../api/userApi";
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

  return (
    <UserContext.Provider value={{ user, getCurrentUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
