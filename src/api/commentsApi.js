import instance from "./baseApi";

const getComments = async () => {
  const res = await instance.get("/comments");
  return res.data;
};

const createComment = async (data) => {
  await instance.post("/comments", data);
};

export { getComments, createComment };
