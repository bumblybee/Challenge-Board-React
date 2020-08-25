import axios from "axios";
import { handleErrors, handleErrorsArray } from "../errorHandlers/errorHandler";

const instance = axios.create({
  baseURL: "http://localhost:9000",
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

const put = async (url, data) => {
  return await instance.put(url, data).catch((e) => {
    if (e.response.data.errors) {
      const errors = handleErrorsArray(e.response.data.errors);

      return errors;
    }

    return handleErrors(e.response.data.error);
  });
};

const deleteRoute = async (url) => {
  return await instance.delete(url).catch((e) => {
    if (e.response.data.errors) {
      const errors = handleErrorsArray(e.response.data.errors);

      return errors;
    }

    return handleErrors(e.response.data.error);
  });
};

export { post, put, deleteRoute, instance };

//https://salty-anchorage-50289.herokuapp.com
