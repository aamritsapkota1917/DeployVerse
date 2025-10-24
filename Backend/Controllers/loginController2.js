import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();
import User from "../Models/userModel.js";

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
  res.redirect(authorizeUrl);
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

    try {
      const user = await registerUser(userInfo.data);
      req.session.userId = user._id;
      // res.cookie("token", user._id, {
      // path: "/",
      // httpOnly: true,
      // expires: new Date(Date.now() + 7 * 1000 * 86400), //* expires in 7 days
      // sameSite: "none",
      // secure: false,
      // });

      console.log(req.session);
      // res
      //   .status(200)
      //   .json({
      //     _id: user._id,
      //     name: user.name,
      //     email: user.email,
      //     photo: user.photo,
      //   })
      res.redirect(
        `http://localhost:3001?user=${encodeURIComponent(JSON.stringify(user))}`
      );
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Error registering user");
    }
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.status(500).send("Error retrieving access token");
  }
};

const registerUser = async (userData) => {
  const userInfo = {
    displayName: userData.names[0].displayName,
    email: userData.emailAddresses[0].value,
    photo: userData.photos[0].url,
  };
  try {
    let user = await User.findOne({
      email: userInfo.email,
    });
    if (!user) {
      user = await addNewUser(userInfo);
      console.log("new user Created!!");
    } else console.log("no user is created");
    return user;
  } catch (error) {
    console.log(error);
  }
};

const addNewUser = async (userInfo) => {
  const user = {
    name: userInfo.displayName,
    email: userInfo.email,
    photo: userInfo.photo,
  };
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json("Logout successful");
    }
  });
};
