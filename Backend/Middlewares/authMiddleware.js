import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import { verifyJwtToken } from "../Utils/tokenUtils.js";

export const protect = asyncHandler(async (req, res, next) => {
  // const token = req.session.token;
  const token = req.cookies.token;

  if (!token) throw new Error("no token available");
  const verifiedToken = verifyJwtToken(token);
  if (!verifiedToken) throw new Error("unauthorized, login please");
  const userId = verifiedToken.data;

  const user = await User.findById(userId);
  if (!user) throw new Error("no user found");
  req.user = user;
  next();
});
