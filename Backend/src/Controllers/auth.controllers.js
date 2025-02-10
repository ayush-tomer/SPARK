import User from "../Models/users.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../Lib/utilis.js";

// Register :
export const Register = async (req, res) => {
  const { email, UserName, password, isAdmin } = req.body;
  try {
    if (!email) {
      return res
        .status(401)
        .json({ message: "Email Field is required", error: true });
    }
    if (!UserName) {
      return res
        .status(401)
        .json({ message: "UserName Field is required", error: true });
    }
    if (!password) {
      return res
        .status(401)
        .json({ message: "Password Field is required", error: true });
    }
    if (password < 6) {
      return res
        .status(401)
        .json({ message: "Password cant be less than 6", error: true });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(401).json({ message: "User already exists", error: true });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      UserName,
      password: hashPassword,
      isAdmin,
    });

    if (newUser) {
      const token = generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        message: "User Registeration Successfull",
        accessToken: token,
        data: newUser,
        error: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//Login :
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res
        .status(401)
        .json({ message: "Email Field is required", error: true });
    }
    if (!password) {
      return res
        .status(401)
        .json({ message: "Password Field is required", error: true });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No User Found", error: true });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials", error: true });
    }

    const token = generateToken(user._id, res);
    res.status(200).json({
      message: "User Login Successful",
      error: false,
      data: user,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//Logout:
export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "");
    res
      .status(200)
      .json({ message: "user Logged Out Succesfully", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};
