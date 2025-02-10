import express from "express";
import {
  CreateProject,
  UpdateProject,
  DeleteProject,
  GetProject,
  GetProjects,
} from "../Controllers/projects.Controllers";

import adminAuthenticate from "../Middlewares/admin.middleware.js";

const router = express.Router();

//Create Project :
router.post("/create-project/:id", adminAuthenticate, CreateProject);

//Update Product :
router.put("/update-project/:id", adminAuthenticate, UpdateProject);

//Delete Project :
router.delete("/delete-project/:id", adminAuthenticate, DeleteProject);

//Get-All Project :
router.get("/getAll-project", adminAuthenticate, GetProjects);

//get-Single Project:
router.get("/getSingle-project/:id", adminAuthenticate, GetProject);

export default router;
