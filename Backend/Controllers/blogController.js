import { cloudinary } from "../Utils/fileUpload.js";
import * as fs from "node:fs/promises";
import Blog from "../Models/blogModel.js";
import User from "../Models/userModel.js";

export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find().skip(skip).limit(limit).sort({ createdAt: -1 }).populate("author", "name"),
      Blog.countDocuments(),
    ]);

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      blogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, topics, image, description } = req.body;
    const author = req.user._id;

    console.log({ title, content, topics, image, description });
    const newBlog = new Blog({
      title,
      content,
      topics,
      image,
      description,
      author,
    });

    await newBlog.save();

    res.status(201).end();
  } catch (error) {
    console.error("Failed to create blog:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

export const uploadBlogImage = async (req, res) => {
  let imageData = {};
  if (req.file) {
    //     //* save new image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "IT-Hub/Profile",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Some error occured while uplaoding image");
    }
    imageData = {
      imageId: uploadedFile.public_id,
      imageName: req.file.originalname,
      imagePath: uploadedFile.secure_url,
    };
    await fs.unlink(req.file.path);
  } else {
    res.status(400);
    throw new Error("No file uploaded");
  }
  res.status(200).json({ image: imageData.imagePath });
};
