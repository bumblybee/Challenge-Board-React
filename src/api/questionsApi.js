import instance from "./baseApi";

//https://salty-anchorage-50289.herokuapp.com/questions

const getQuestions = async () => {
  const res = await instance.get("/questions");
  return res.data;
};

const createQuestion = async (data) => {
  await instance.post("/questions", data);
};

export { getQuestions, createQuestion };
