import express from "express";
const router = express.Router();
// import { testing } from "../Controllers/userController.js";
// import {
//   auth,
//   callback,
//   getProfile,
//   isLogedin,
// } from "../Controllers/loginController.js";
import {
  authorize,
  callback,
  login,
  logout,
  manualRegistration,
  verifyUser,
} from "../Controllers/loginController.js";
router.get("/", authorize);
router.get("/callback", callback);
router.get("/verify/:token", verifyUser);
router.post("/register", manualRegistration);
router.post("/login", login);
router.get("/logout", logout);
// heesjsh@gmail.com
// router.get("/islogged", isLogedin);
// router.get("/profile", getProfile);
export default router;
