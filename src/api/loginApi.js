import instance from "./baseApi";
import handleErrors from "../errorHandlers/loginError";

const loginUser = async (details) => {
  return await instance
    .post("/users/login", details)
    .catch((err) => handleErrors(err.response));
};

const checkLogin = async () => {
  const res = await instance.get("/users/check-login");
  return res;
};

export { loginUser, checkLogin };
