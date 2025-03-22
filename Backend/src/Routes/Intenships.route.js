import express from "express";
import {
  CreateInternship,
  UpdateInternship,
  DeleteInternship,
  GetInternships,
  GetInternship,
} from "../Controllers/Internships.controllers.js";

import adminAuthenticateToken from "../Middlewares/admin.middleware.js";
const router = express.Router();

//Create Project :
router.post("/create-internship", adminAuthenticateToken, CreateInternship);

//Update Product :
router.put("/update-internship/:id", adminAuthenticateToken, UpdateInternship);

//Delete Project :
router.delete(
  "/delete-internship/:id",
  adminAuthenticateToken,
  DeleteInternship
);

//Get-All Project :
router.get("/getAll-internship", GetInternships);

//get-Single Project:
router.get("/getSingle-internship/:id", GetInternship);

export default router;
