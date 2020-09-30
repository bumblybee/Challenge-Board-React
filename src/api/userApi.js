import { get, post } from "./baseApi";

const signupUser = async (data) => {
  const res = await post("/users/create", data);
  return res;
};

const loginUser = async (details) => {
  const res = await post("/users/login", details);
  return res;
};

const getUser = async () => {
  const res = await get("/users/get-user");
  return res;
};

const logoutUser = async () => {
  await post("/users/logout");
};

export { loginUser, getUser, logoutUser, signupUser };
