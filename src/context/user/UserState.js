import React, { useState, useContext } from "react";
import { getUser } from "../../api/userApi";
import { UserContext } from "./UserContext";
import { ErrorContext } from "../error/ErrorContext";

const UserState = ({ children }) => {
  const [user, setUser] = useState({});
  const errorContext = useContext(ErrorContext);

  const getCurrentUser = async () => {
    const userData = await getUser();
    if (userData.error) {
      return;
    } else {
      setUser(userData.data.user);
    }
  };

  // const setUser = async (data) => {
  //   dispatch({ type: "SET_USER", payload: data });
  // };

  // const [state, dispatch] = useReducer(UserReducer, initState);

  return (
    <UserContext.Provider value={{ user, getCurrentUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
