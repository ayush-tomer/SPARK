import express from "express";
import {
  CreateCommunity,
  getAllCommunity,
  UpdateCommunity,
  DeleteCommunity,
  getSingleCommunity,
} from "../Controllers/community.controllers.js";

const router = express.Router();

//Create Community :
router.post("/create-community", CreateCommunity);

//getAll Community:
router.get("/get-community", getAllCommunity);

//get Single Community:
router.get("/get-community/:id", getSingleCommunity);

//Update Communities :
router.put("/update-community/:id", UpdateCommunity);

//Delete Community :
router.delete("/delete-community/:id", DeleteCommunity);

export default router;
