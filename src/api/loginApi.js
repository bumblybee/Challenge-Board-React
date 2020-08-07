import instance from "./baseApi";

const loginUser = async (data) => {
  const res = await instance.post("/users/login", data);

  return res;
};

const checkLogin = async (data) => {
  const res = await instance.get("/users/login", data);
  return res;
};

export { loginUser, checkLogin };
