import { put, post, get } from "./baseApi";

const getProject = async () => {
  const res = await get(`/projects`);
  return res.data.project;
};

const submitProject = async (data) => {
  return await post("/projects", data);
};

const editProject = async (id, data, user) => {
  return await put(`/projects/${id}`, data, user);
};

export { getProject, submitProject, editProject };
