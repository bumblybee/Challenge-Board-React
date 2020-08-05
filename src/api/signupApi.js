import instance from "./baseApi";

const signupUser = async (data) => {
  await instance.post("/users/create", data);
};

export default signupUser;
