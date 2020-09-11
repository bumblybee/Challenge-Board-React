import { get, post, put, deleteRequest } from "./baseApi";

const getQuestions = async () => {
  const res = await get("/questions");
  return res.data;
};

const getQuestionThread = async (id) => {
  const res = await get(`/questions/${id}`);
  return res.data;
};

const createQuestion = async (data) => {
  return await post("/questions", data);
};

const editQuestion = async (id, data) => {
  return await put(`/questions/edit-question/${id}`, data);
};

const deleteQuestion = async (questionId) => {
  return await deleteRequest(`/questions/${questionId}`);
};

const updateAnswer = async (questionId) => {
  return await put(`/questions/edit-answer/${questionId}`);
};

export {
  getQuestions,
  getQuestionThread,
  createQuestion,
  editQuestion,
  deleteQuestion,
  updateAnswer,
};
