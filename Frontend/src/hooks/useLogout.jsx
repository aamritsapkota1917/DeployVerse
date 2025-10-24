import axios from "axios";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {

  const queryClient = useQueryClient()
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
    
      queryClient.invalidateQueries(['user'])


    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return handleLogout;
};

export default useLogout;
