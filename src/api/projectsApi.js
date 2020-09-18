import { put, post, get } from "./baseApi";

const getProject = async (id) => {
  return await get(`/projects/${id}`);
};

const submitProject = async (data) => {
  return await post("/projects", data);
};

const editProject = async (id, data, user) => {
  return await put(`/projects/${id}`, data, user);
};

export { getProject, submitProject, editProject };
