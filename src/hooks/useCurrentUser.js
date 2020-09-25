import { getUser } from "../api/userApi";
import { useQuery } from "react-query";

const getCurrentUser = async () => {
  const { data } = await getUser();

  return data.data;
};

export const useCurrentUser = () => {
  return useQuery("currentUser", getCurrentUser);
};
