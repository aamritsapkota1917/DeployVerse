import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorHandler from "./Middlewares/errorHandler.js";
import loginRoute from "./Routes/loginRoute.js";
import userRoute from "./Routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
  })
);
app.use(express.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PATCH,DELETE,OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected Successfully");
  })
  .catch((err) => {
    console.log("Could not connect to database");
  });

// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       ttl: 1 * 24 * 60 * 60,
//     }),
//     cookie: { secure: false }, // Set to true if using HTTPS
//   })
// );

app.use(express.json());
app.use("/api/auth", loginRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`server running on port : ${Port}`);
});
