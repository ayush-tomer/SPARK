import jwt from "jsonwebtoken";
import User from "../Models/users.model.js";

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "No token recieved", error: true });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Token Unauthorized",
        error: true,
      });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "No Such user exists", error: true });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Authentication failed", error: true });
  }
};

export default authenticateToken;
