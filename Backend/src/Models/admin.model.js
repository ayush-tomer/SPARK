import mongoose from "mongoose";

const admin = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    min: 6,
  },
});

const Admin = mongoose.model("Admin", admin);

export default Admin;
