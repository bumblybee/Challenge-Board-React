import { post } from "./baseApi";

const submitProject = async (data) => {
  return await post("/projects", data);
};

export { submitProject };
