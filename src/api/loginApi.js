import { instance, post } from "./baseApi";

const loginUser = async (details) => {
  const res = await post("/users/login", details);
  return res;
};

const checkLogin = async () => {
  const res = await instance.get("/users/check-login");
  return res;
};

const logoutUser = async () => {
  const res = await instance.get("/users/logout");
  console.log(res);
};

export { loginUser, checkLogin, logoutUser };
