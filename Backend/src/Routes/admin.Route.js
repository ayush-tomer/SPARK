import express from "express";
import {
  Login,
  Register,
  LogOut,
  getAdmindashboard,
} from "../Controllers/admin.controllers.js";

const router = express.Router();

//Register:
router.post("/register", Register);

//login :
router.post("/login", Login);

//LogOut:
router.post("/logOut", LogOut);

//Get Dashboard Route :
router.get("/", getAdmindashboard);

export default router;
