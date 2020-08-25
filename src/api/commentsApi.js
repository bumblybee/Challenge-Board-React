import { put, post } from "./baseApi";

const createComment = async (id, comment) => {
  await post(`/comments/${id}`, comment);
};

const editComment = async (id, data) => {
  return await put(`/comments/edit-comment/${id}`, data);
};

export { createComment, editComment };
