import { getUser } from "../api/userApi";
import { useQuery } from "react-query";

const getCurrentUser = async () => {
  const data = await getUser();

  return data.data.user;
};

export const useCurrentUser = () => {


  const { data, status, refetch } = useQuery("currentUser", getCurrentUser, {
    enabled: false
  });

  return { user: data, status, getCurrentUser: refetch };
};
