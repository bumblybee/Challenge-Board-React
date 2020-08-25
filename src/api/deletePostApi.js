import { deleteRoute } from "./baseApi";
//TODO: add these to questions and comments apis instead
const deleteQuestion = async (questionId) => {
  return await deleteRoute(`/questions/${questionId}`);
};

const deleteComment = async (commentId) => {
  return await deleteRoute(`/comments/${commentId}`);
};

export { deleteQuestion, deleteComment };
