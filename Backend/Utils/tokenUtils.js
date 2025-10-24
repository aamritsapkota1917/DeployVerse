import jwt from "jsonwebtoken";

export const generateJwtToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyJwtToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data;
};
