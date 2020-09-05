import { put, post } from "./baseApi";

const submitProject = async (data) => {
  return await post("/projects", data);
};

const editProject = async (id, data, user) => {
  return await put(`/projects/${id}`, data, user);
};

export { submitProject, editProject };
