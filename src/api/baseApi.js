import axios from "axios";
import { handleErrors, handleErrorsArray } from "../handlers/errorHandler";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000"
    : "https://api.challengeboard.xyz";

const instance = axios.create({
  baseURL: URL,
  withCredentials: true,
  crossDomain: true,
});

const get = async (url) => {
  return await instance.get(url).catch((e) => {
    if (e.response) {
      if (e.response && e.response.data.errors) {
        const errors = handleErrorsArray(e.response.data.errors);

        return errors;
      }

      return handleErrors(e.response.data.error);
    }
  });
};

const post = async (url, data) => {
  return await instance.post(url, data).catch((e) => {
    if (e.response) {
      if (e.response && e.response.data.errors) {
        const errors = handleErrorsArray(e.response.data.errors);

        return errors;
      }

      return handleErrors(e.response.data.error);
    }
  });
};

const put = async (url, data) => {
  return await instance.put(url, data).catch((e) => {
    if (e.response) {
      if (e.response.data.errors) {
        const errors = handleErrorsArray(e.response.data.errors);

        return errors;
      }

      return handleErrors(e.response.data.error);
    }
  });
};

const deleteRequest = async (url) => {
  return await instance.delete(url).catch((e) => {
    if (e.response && e.response.data.errors) {
      const errors = handleErrorsArray(e.response.data.errors);

      return errors;
    }

    return handleErrors(e.response.data.error);
  });
};

export { post, put, deleteRequest, get };
