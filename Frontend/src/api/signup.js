import axios from "axios";

export const googleApi = async () => {
  const response = await axios.get("/api/auth");
  const data = await response.data;
  console.log(data.authorizeUrl);

  window.location.replace(data.authorizeUrl);
};
