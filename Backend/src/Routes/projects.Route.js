import express from "express";
import {
  CreateProject,
  UpdateProject,
  DeleteProject,
  GetProject,
  GetProjects,
} from "../Controllers/projects.Controllers.js";

import adminAuthenticateToken from "../Middlewares/admin.middleware.js";

const router = express.Router();

//Create Project :
router.post("/create-project", adminAuthenticateToken, CreateProject);

//Update Product :
router.put("/update-project/:id", adminAuthenticateToken, UpdateProject);

//Delete Project :
router.delete("/delete-project/:id", adminAuthenticateToken, DeleteProject);

//Get-All Project :
router.get("/getAll-project", GetProjects);

//get-Single Project:
router.get("/getSingle-project/:id", GetProject);

export default router;
