import instance from "./baseApi";

const createComment = async (data) => {
  await instance.post("/comments", data);
};

export { createComment };
