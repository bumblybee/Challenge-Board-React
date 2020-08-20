import { deleteRoute } from "./baseApi";

const deletePost = async (id) => {
  return await deleteRoute(`/questions/${id}`);
};

export default deletePost;
