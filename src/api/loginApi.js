import instance from "./baseApi";

const loginUser = async (details) => {
  const res = await instance.post("/users/login", details);

  return res;
};

const checkLogin = async (data) => {
  const res = await instance.get("/users/login", data);
  return res;
};

export { loginUser, checkLogin };
