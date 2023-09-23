import { Router } from "express";
import api from "../controllers/event/api.js";
import jwtAuth from "../helpers/jwtAuth.js";

const router = Router();

router.get("/", api.getEvents);
router.get("/:eventId", api.getEventById);

router.post("/", api.addEvent);

router.put("/:eventId", jwtAuth, api.updateEvent);

router.delete("/:eventId", jwtAuth, api.deleteEvent);

export default router;
