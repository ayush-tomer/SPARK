import express from "express";
import {
  CreateCommunity,
  getAllCommunity,
  UpdateCommunity,
  DeleteCommunity,
  getSingleCommunity,
} from "../Controllers/community.controllers.js";
import adminAuthenticateToken from "../Middlewares/admin.middleware.js";

const router = express.Router();

//Create Community :
router.post("/create-community", adminAuthenticateToken, CreateCommunity);

//getAll Community:
router.get("/get-community", getAllCommunity);

//get Single Community:
router.get("/get-community/:id", getSingleCommunity);

//Update Communities :
router.put("/update-community/:id", adminAuthenticateToken, UpdateCommunity);

//Delete Community :
router.delete("/delete-community/:id", adminAuthenticateToken, DeleteCommunity);

export default router;
