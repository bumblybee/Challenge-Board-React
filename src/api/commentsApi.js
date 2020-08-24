import { instance, post } from "./baseApi";

const createComment = async (id, comment) => {
  await post(`/comments/${id}`, comment);
};

export { createComment };
