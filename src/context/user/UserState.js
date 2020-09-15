import React, { useReducer } from "react";
import { getUser } from "../../api/userApi";
import { UserContext } from "./UserContext";
import UserReducer from "./UserReducer";

const UserState = ({ children }) => {
  const initState = { user: {} };

  const getCurrentUser = async () => {
    const userData = await getUser();

    dispatch({ type: "GET_USER", payload: userData.data.user });
  };

  const setUser = async (data) => {
    dispatch({ type: "SET_USER", payload: data });
  };

  const [state, dispatch] = useReducer(UserReducer, initState);

  return (
    <UserContext.Provider value={{ user: state.user, getCurrentUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
