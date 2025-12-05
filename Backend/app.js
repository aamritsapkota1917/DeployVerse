import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorHandler from "./Middlewares/errorHandler.js";
import loginRoute from "./Routes/loginRoute.js";
import userRoute from "./Routes/userRoute.js";
import blogRoute from "./Routes/blogRoute.js";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static(join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected Successfully");
  })
  .catch((err) => {
    console.log("Could not connect to database");
  });

app.use(express.json());
app.use("/api/auth", loginRoute);
app.use("/api/user", userRoute);
app.use("/api/blogs", blogRoute);
app.use(errorHandler);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`server running on port : ${Port}`);
});
