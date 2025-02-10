import express from "express";
import { Login, Register, Logout } from "../Controllers/auth.controllers.js";

const router = express.Router();

//Register :
router.post("/register", Register);

//Login :
router.post("/login", Login);

//Logout :
router.post("/logout", Logout);

export default router;
