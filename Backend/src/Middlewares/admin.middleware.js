import Admin from "../Models/admin.model.js";
import jwt from "jsonwebtoken";

const adminAuthenticateToken = async (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1]; // ✅ Supports both
  if (!token) {
    return res.status(401).json({ message: "No token received", error: true });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Token Unauthorized", error: true });
    }

    const admin = await Admin.findById(decoded.userId).select("-password");
    if (!admin) {
      return res
        .status(401)
        .json({ message: "No Such Admin exists", error: true });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Authentication failed", error: true });
  }
};

export default adminAuthenticateToken;
