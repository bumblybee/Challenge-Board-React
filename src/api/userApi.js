import { instance, post } from "./baseApi";

const signupUser = async (data) => {
  const res = await post("/users/create", data);
  return res;
};

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

const getUserPosts = async (id) => {
  const res = await instance.get(`/users/${id}/posts`);
  return res;
};

export { loginUser, checkLogin, logoutUser, signupUser, getUserPosts };
