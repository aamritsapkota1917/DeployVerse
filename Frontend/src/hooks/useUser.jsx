import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  try {
    const response = await axios.get("/api/user");
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 10 * 60 * 1000,
    cacheTime: 20 * 60 * 1000,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
  });
};

export default useUser;
