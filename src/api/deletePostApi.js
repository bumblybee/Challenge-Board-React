import { deleteRoute } from "./baseApi";

const deleteQuestion = async (questionId) => {
  return await deleteRoute(`/questions/${questionId}`);
};

const deleteComment = async (commentId) => {
  return await deleteRoute(`/comments/${commentId}`);
};

export { deleteQuestion, deleteComment };
