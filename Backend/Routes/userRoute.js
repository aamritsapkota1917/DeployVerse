import express from "express";
const router = express.Router();

import { protect } from "../Middlewares/authMiddleware.js";
import {
  changePassword,
  forgotPassword,
  getUser,
  resetPassword,
} from "../Controllers/userController.js";

router.get("/", protect, getUser);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);
router.patch("/change-password", protect, changePassword);

export default router;
