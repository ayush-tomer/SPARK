import express from "express";
import {
  CreateStatement,
  UpdateStatement,
  DeleteStatement,
  GetStatements,
  GetStatement,
} from "../Controllers/ProblemStatement.Controllers.js";

import adminAuthenticateToken from "../Middlewares/admin.middleware.js";

const router = express.Router();

//Create Statement :
router.post("/create-Statement", adminAuthenticateToken, CreateStatement);

//Update Statement :
router.put("/update-Statement/:id", adminAuthenticateToken, UpdateStatement);

//Delete Statement :
router.delete("/delete-Statement/:id", adminAuthenticateToken, DeleteStatement);

//Get-All Statement :
router.get("/getAll-Statement", GetStatements);

//get-Single Statement:
router.get("/getSingle-Statement/:id", GetStatement);

export default router;
