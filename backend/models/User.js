import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  auth_id: {
    type: String,
  },
  password: {
    type: String,
  },
  doc_id: {
    type: String,
  },
});
const User = model("user", UserSchema);
export default User;
