import { put, post, get } from "./baseApi";

const getProject = async () => {
  return await get(`/projects`);
};

const submitProject = async (data) => {
  return await post("/projects", data);
};

const editProject = async (id, data) => {
  return await put(`/projects/${id}`, data);
};

export { getProject, submitProject, editProject };
