import instance from "./baseApi";

const loginUser = async (data) => {
  await instance.post("/users/login", data);
};

export default loginUser;
