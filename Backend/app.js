import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorHandler from "./Middlewares/errorHandler.js";
import loginRoute from "./Routes/loginRoute.js";
import userRoute from "./Routes/userRoute.js";
import cors from "cors";
import { info_logger_middleware } from "./Middlewares/infoLogger.js";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
  })
);
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected Successfully");
  })
  .catch((err) => {
    console.log("Could not connect to database");
  });

app.use(express.json());

app.use(info_logger_middleware);

app.use("/api/auth", loginRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`server running on port : ${Port}`);
});
