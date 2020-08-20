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

const createComment = async (id, comment) => {
  await post(`/questions/${id}`, comment);
};

const selectAnswer = async (id) => {
  return await post(`/questions/select-answer/${id}`);
};

export {
  getQuestions,
  getQuestionThread,
  createQuestion,
  createComment,
  selectAnswer,
};
