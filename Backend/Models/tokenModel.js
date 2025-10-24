import mongoose from "mongoose";

// todo: Delete the token when users verifies with the link or after the token is expired!!
const tokenSchema = mongoose.Schema({
  token: {
    type: String,
  },
  auth: {
    type: Boolean,
    default: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
