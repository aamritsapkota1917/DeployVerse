import { OAuth2Client } from "google-auth-library";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateJwtToken, verifyJwtToken } from "../Utils/tokenUtils.js";
import User from "../Models/userModel.js";
import Token from "../Models/tokenModel.js";
import { sendMail } from "../Utils/mailUtil.js";
import dotenv from "dotenv";
import { verificationEmailTemplate } from "../Utils/emailTemplates.js";
dotenv.config();

//* Oauth controller starts!!

const oAuth2Client = new OAuth2Client({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});
const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const authorizeUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

export const authorize = (req, res) => {
  res.status(200).json({ authorizeUrl });
};

export const callback = async (req, res) => {
  const code = req.query.code;
  try {
    const r = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(r.tokens);
    console.info("Tokens acquired.");

    // Optionally, you can retrieve user information or perform other actions here
    const userInfo = await oAuth2Client.request({
      url: "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos",
    });
    const userData = {
      name: userInfo.data.names[0].displayName,
      email: userInfo.data.emailAddresses[0].value,
      photo: userInfo.data.photos[0].url,
    };
    try {
      const user = await registerUser(userData);
      user.isVerified = true;
      await user.save();
      const sessionToken = generateJwtToken(user._id);
      // req.session.token = sessionToken;
      res.cookie("token", sessionToken, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        // Set this according to your needs, 'lax' is a good default
        secure: process.env.NODE_ENV === "production", // Set secure to true in production
        domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined,
      });

      // res
      //   .status(200)
      //   .json({
      //     _id: user._id,
      //     name: user.name,
      //     email: user.email,
      //     photo: user.photo,
      //   })
      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      // console.error("Error while registering user:", error);
      throw new Error("Error while registering user");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//* Oauth completes!!
//
//
//
//

// ! controller for manual regestration
export const manualRegistration = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) throw new Error("all field shuld be filled");
  const userData = {
    name: firstName + " " + lastName,
    email,
    password,
    isOauth: false,
  };
  const token = generateJwtToken(email);

  // todo: Hashing the password before storing it in the database!!

  const addedToken = await Token.create({ token: token });
  if (!addedToken) throw new Error("Token Error while registration");
  const user = await registerUser(userData, false);
  console.log(addedToken.token);
  const emailContent = {
    subject: "Email Verification",
    message: verificationEmailTemplate(token, process.env.SERVER_URL),
  };
  const mailResponse = await sendMail(user.email, emailContent);
  res.status(200).json({ msg: "Email has been sent!", user, mailResponse });
});

//! controller for email verification

export const verifyUser = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const dbToken = await Token.findOneAndDelete({ token });
  if (!dbToken) throw new Error("Token not available");

  const verifiedEmail = verifyJwtToken(dbToken.token);

  if (!verifiedEmail) throw new Error("Error while verifying");
  const user = await User.findOne({ email: verifiedEmail.data });

  if (!user) throw new Error("no user with such email exists");
  user.isVerified = true;
  await user.save();
  const sessionToken = generateJwtToken(user._id);
  // req.session.token = sessionToken;
  res.cookie("token", sessionToken, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Set this according to your needs, 'lax' is a good default
    secure: process.env.NODE_ENV === "production", // Set secure to true in production
    domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined,
  });
  // res
  //   .status(200)
  //   .json({ msg: "email sucessfully verified", email: verifiedEmail, user });
  res.redirect(`${process.env.CLIENT_URL}`);
});

//! fucntion to check if user exists
const registerUser = asyncHandler(async (userData, oauth = true) => {
  let user = await User.findOne({
    email: userData.email,
  });
  if (!user) {
    user = await addNewUser(userData);
    console.log("new user Created!!");
  } else if (user && !oauth) {
    throw new Error("email already exists!!");
  } else console.log("no user were created!!");
  return user;
});

//! function to add new user into database
const addNewUser = async (userInfo) => {
  try {
    const newUser = await User.create(userInfo);
    return newUser;
  } catch (err) {
    throw new Error("error while creating user");
  }
};

//! Controller for login!

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error("All field should be filled");
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "please enter valid email and password" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ msg: "Please enter valid credentials" });
  }
  if (!user.isVerified) {
    return res.status(200).json({ isUnVerified: !user.isVerified });
  }

  const sessionToken = generateJwtToken(user._id);
  // req.session.token = sessionToken;
  res.cookie("token", sessionToken, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Set this according to your needs, 'lax' is a good default
    secure: process.env.NODE_ENV === "production", // Set secure to true in production
    domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined,
  });

  res.status(200).json({
    name: user.name,
    email: user.email,
    photo: user.photo,
    isVerified: user.isVerified,
  });
});

//! controller to logout user!
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // keep same as login for consistency
    secure: process.env.NODE_ENV === "production", // secure in production
    domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined, // must match cookie domain set during login
  });
  res.status(200).json({ msg: "succesfully loggedOut" });
});
