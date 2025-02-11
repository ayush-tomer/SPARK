import express from "express";
import adminAuthenticate from "../Middlewares/admin.middleware.js";
import {
  CreateEvent,
  UpdateEvent,
  DeleteEvent,
  GetEvent,
  GetEvents,
} from "../Controllers/events.Controllers.js";
const router = express.Router();

//Create Event :
router.post("/events-create", adminAuthenticate, CreateEvent);

//Update Event :
router.put("/events-update/:id", adminAuthenticate, UpdateEvent);

//Delete Event :
router.delete("/events-delete/:id", adminAuthenticate, DeleteEvent);

//Get Single Event :
router.get("/events/:id", GetEvent);

//Get Events :
router.get("/events", GetEvents);

export default router;
