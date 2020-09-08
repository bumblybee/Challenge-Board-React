import { put, post, deleteRequest } from "./baseApi";

const createComment = async (id, comment) => {
  return await post(`/comments/${id}`, comment);
};

const editComment = async (id, data) => {
  return await put(`/comments/edit/${id}`, data);
};

const selectAnswer = async (commentId, questionId) => {
  return await post(`/comments/select-answer/${questionId}/${commentId}`);
};

const deleteComment = async (commentId) => {
  return await deleteRequest(`/comments/${commentId}`);
};
export { createComment, editComment, selectAnswer, deleteComment };
