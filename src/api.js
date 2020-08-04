import axios from "axios";

axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;

//https://salty-anchorage-50289.herokuapp.com/questions

const getQuestions = async () => {
  const res = await axios.get("http://localhost:9000/questions");
  return res.data;
};

const createQuestion = async (data) => {
  await axios.post("http://localhost:9000/questions", data);
};

const signupUser = async (data) => {
  await axios.post("http://localhost:9000/users/create", data);
};

const loginUser = async (data) => {
  await axios.post("http://localhost:9000/users/login", data);
};

export { getQuestions, createQuestion, signupUser, loginUser };
