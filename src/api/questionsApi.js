import { instance, post } from "./baseApi";

const getQuestions = async () => {
  const res = await instance.get("/questions");
  return res.data;
};

const getQuestionThread = async (id) => {
  const res = await instance.get(`/questions/${id}`);
  return res.data;
};

const createQuestion = async (data) => {
  await post("/questions", data);
};

const selectAnswer = async (commentId, questionId) => {
  return await post(`/questions/select-answer/${questionId}/${commentId}`);
};

export { getQuestions, getQuestionThread, createQuestion, selectAnswer };
