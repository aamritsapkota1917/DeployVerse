import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name field cannot be empty"],
  },
  email: {
    type: String,
    require: [true, "email field cannot be empty"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minLength: [8, "password must be of atleast 8 words"],
    default: "randomstringnotsecure",
  },
  photo: {
    type: String,
    default:
      "https://lh3.googleusercontent.com/a/ACg8ocIzxfTO50rdxaMJSEclJl0-WcBpfJToRY0m46xLP_hFDCo9WuCY=s100",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isOauth: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //* hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);

export default User;
