import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchBlogs = async () => {
  try {
    const response = await axios.get("/api/blogs");
    return await response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    retry: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export default useBlogs;
