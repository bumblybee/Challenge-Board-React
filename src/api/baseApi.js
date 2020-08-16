import axios from "axios";
import handleErrors from "../errorHandlers/errorHandler";

const instance = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
  crossDomain: true,
});

const post = async (url, data) => {
  return await instance
    .post(url, data)
    .catch((e) => handleErrors(e.response.data.error));
};

export { post, instance };

//https://salty-anchorage-50289.herokuapp.com/questions
