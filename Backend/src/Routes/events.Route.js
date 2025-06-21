import express from "express";
import adminAuthenticateToken from "../Middlewares/admin.middleware.js";
import {
  createEvent,
  UpdateEvent,
  DeleteEvent,
  getSingleEvent,
  getAllEvents,
} from "../Controllers/events.Controllers.js";
const router = express.Router();

//Create Event :
router.post("/events-create", adminAuthenticateToken, createEvent);

//Update Event :
router.put("/events-update/:id", adminAuthenticateToken, UpdateEvent);

//Delete Event :
router.delete("/events-delete/:id", adminAuthenticateToken, DeleteEvent);

//Get Single Event :
router.get("/events/:id", getSingleEvent);

//Get Events :
router.get("/events", getAllEvents);

export default router;
