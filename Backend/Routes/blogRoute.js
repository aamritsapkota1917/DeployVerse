import express from "express";
const router = express.Router();

import { protect } from "../Middlewares/authMiddleware.js";
import { uploadBlogImage, getBlogs, createBlog } from "../Controllers/blogController.js";
import { upload } from "../Utils/fileUpload.js";

router.get("/", getBlogs);
router.post("/", protect, createBlog);
router.post("/image", protect, upload.single("image"), uploadBlogImage);

export default router;
