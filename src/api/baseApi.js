import axios from "axios";
import { handleErrors, handleErrorsArray } from "../errorHandlers/errorHandler";

const instance = axios.create({
  baseURL: "https://salty-anchorage-50289.herokuapp.com",
  withCredentials: true,
  crossDomain: true,
});

const post = async (url, data) => {
  return await instance.post(url, data).catch((e) => {
    if (e.response.data.errors) {
      const errors = handleErrorsArray(e.response.data.errors);

      return errors;
    }

    return handleErrors(e.response.data.error);
  });
};

export { post, instance };

//https://salty-anchorage-50289.herokuapp.com/questions
