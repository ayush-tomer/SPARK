import express from "express";
import {
  CreateInternship,
  UpdateInternship,
  DeleteInternship,
  GetInternships,
  GetInternship,
} from "../Controllers/Internships.controllers.js";

const router = express.Router();

//Create Project :
router.post("/create-internship", CreateInternship);

//Update Product :
router.put("/update-internship/:id", UpdateInternship);

//Delete Project :
router.delete("/delete-internship/:id", DeleteInternship);

//Get-All Project :
router.get("/getAll-internship", GetInternships);

//get-Single Project:
router.get("/getSingle-internship/:id", GetInternship);

export default router;
