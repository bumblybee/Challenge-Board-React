import { instance, post } from "./baseApi";

const loginUser = async (details) => {
  const res = await post("/users/login", details);
  return res;
};

const checkLogin = async () => {
  const res = await instance.get("/users/check-login");
  return res;
};

export { loginUser, checkLogin };
