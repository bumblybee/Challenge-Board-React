import React, { useReducer } from "react";
import { getUser } from "../api/userApi";
import { UserContext } from "../context/UserContext";
// import UserReducer from "../context/UserReducer";

const UserState = ({ children }) => {
  const initState = { user: {} };
  const [state, dispatch] = useReducer(UserReducer, initState);

  const getUserData = async () => {
    const userData = await getUser();
    dispatch({
      type: "GET_USER",
      payload: userData.data,
    });
  };

  return (
    <UserContext.Provider value={{ user: state.user, getUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
