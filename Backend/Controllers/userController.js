import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/userModel.js";
import { resetEmailTemplate } from "../Utils/emailTemplates.js";
import Token from "../Models/tokenModel.js";
import { generateJwtToken, verifyJwtToken } from "../Utils/tokenUtils.js";
import { sendMail } from "../Utils/mailUtil.js";

export const getUser = asyncHandler(async (req, res) => {
  const { name, email, photo, isVerified, isOauth } = req.user;
  res.status(200).json({ name, email, photo, isVerified, isOauth });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).json({ msg: "enter email" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "Unregistered Email" });
  if (!user.isVerified)
    return res.status(400).json({ msg: "unverified users can't change password" });
  if (user.isOauth) return res.status(400).json({ msg: "can't change password of oauth login" });
  const token = generateJwtToken(user._id);
  if (!token) throw new Error("error while generating token");
  console.log(token);
  const addedToken = await Token.create({ token, auth: false });
  if (!addedToken) return res.status(500).json({ msg: "error while saving token to database" });
  const mailContent = {
    subject: "Password Reset",
    message: resetEmailTemplate(process.env.CLIENT_URL, token),
  };
  const mailResposne = await sendMail(user.email, mailContent);
  res.status(200).json({ msg: "Reset Email has been sent", mailResposne });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const password = req.body.password;
  const token = req.params.token;
  const dbToken = await Token.findOneAndDelete({ token: token });

  if (!dbToken) return res.status(404).json({ msg: "no such token found" });

  const verifiedToken = verifyJwtToken(dbToken.token);
  if (!verifiedToken) return res.status(400).json({ msg: "invalid or expired token" });

  const user = await User.findById(verifiedToken.data);
  if (!user) return res.status(404).json({ msg: "no user found" });

  user.password = password;
  await user.save();

  const sessionToken = generateJwtToken(user._id);
  res.cookie("token", sessionToken, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Set this according to your needs, 'lax' is a good default
    secure: process.env.NODE_ENV === "production", // Set secure to true in production
    domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined,
  });
  res.status(200).json({ msg: "Password reset completed", user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  if (!newPassword || !oldPassword)
    return res.status(400).json({ msg: "Both old and new password must be provided" });
  if (newPassword === oldPassword)
    return res.status(400).json({ msg: "New password cannot be same old password" });
  const isOldPasswordCorrect = await bcrypt.compare(oldPassword, req.user.password);
  if (!isOldPasswordCorrect) return res.status(400).json({ msg: "old password is incorrect" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  const user = await User.findByIdAndUpdate(req.user._id, {
    password: hashedPassword,
  });
  if (!user) return res.status(400).json({ msg: "password couldn't be changed" });
  res.status(200).json({ msg: "Password succesfully changed!" });
});
