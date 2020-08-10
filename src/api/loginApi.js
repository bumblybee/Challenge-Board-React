import instance from "./baseApi";

const loginUser = async (details) => {
  const res = await instance.post("/users/login", details);

  return res;
};

const checkLogin = async () => {
  const res = await instance.get("/users/check-login");
  return res;
};

export { loginUser, checkLogin };
