import { post } from "./baseApi";

const signupUser = async (data) => {
  const res = await post("/users/create", data);
  return res;
};

export default signupUser;
