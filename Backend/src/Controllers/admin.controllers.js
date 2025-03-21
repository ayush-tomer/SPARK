import Admin from "../Models/admin.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../Lib/utilis.js";

//Models :
import Community from "../Models/communities.model.js";
import Projects from "../Models/projects.model.js";
import Internship from "../Models/internships.model.js";

//Register :
export const Register = async (req, res) => {
  const { userName, Password } = req.body;
  try {
    const admin = await Admin.find({ userName });
    if (!admin) {
      return res
        .status(401)
        .json({ error: true, message: "Admin Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(Password, salt);

    const newAdmin = new Admin({
      userName,
      Password: hashPassword,
    });

    if (newAdmin) {
      const token = generateToken(newAdmin._id, res);
      await newAdmin.save();

      res.status(200).json({
        message: "Admin Registered Successfully",
        accessToken: token,
        data: newAdmin,
        error: false,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "Internal Server Issue", error: error.message });
  }
};

//Login :
export const Login = async (req, res) => {
  const { userName, Password } = req.body;
  try {
    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return res.status(401).json({ message: "No Admin Exists" });
    }

    const isPassword = await bcrypt.compare(Password, admin.Password);
    if (!isPassword) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials", error: true });
    }

    const token = generateToken(admin._id, res);
    res.status(200).json({
      message: "Admin Login Successfull",
      error: false,
      data: admin,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    res.status().json({ message: "Internal Server Issue", error: true });
  }
};

//LogOut :
export const LogOut = async (req, res) => {
  try {
    res.cookie("jwt", "");
    res
      .status(200)
      .json({ message: "Admin Logged Out Succesfully", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//Get :
export const getAdmindashboard = async (req, res) => {
  try {
    const totalCommunities = await Community.countDocuments();
    const totalProjects = await Projects.countDocuments();
    const totalInternships = await Internship.countDocuments();

    res.json({ totalCommunities, totalProjects, totalInternships });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Internal Server Issue" });
  }
};
