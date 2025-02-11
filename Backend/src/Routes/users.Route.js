import express from "express";
import adminAuthenticate from "../Middlewares/admin.middleware.js";
import {
  GetUsers,
  GetUser,
  DeleteUser,
  UpdateUser,
} from "../Controllers/users.Controllers.js";

const router = express.Router();

//Get All Users
router.get("/getAll-Users", adminAuthenticate, GetUsers);

//Get Single User
router.get("/getSingle-User/:id", adminAuthenticate, GetUser);

//Delete User :
router.delete("/delete-user/:id", adminAuthenticate, DeleteUser);

//Edit User:
router.put("/edit-user/:id", adminAuthenticate, UpdateUser);

export default router;
