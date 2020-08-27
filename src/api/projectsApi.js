import { put, post } from "./baseApi";

const submitProject = async (data) => {
  return await post("/projects", data);
};

const editProject = async (id, data) => {
  return await put(`/projects/${id}`, data);
};

export { submitProject, editProject };
