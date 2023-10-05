import { Router } from "express";
import api from "../controllers/attendee/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getAttendees);
router.get("/:attendeeId", api.getAttendeeById);

router.post("/", api.addAttendee);

router.delete("/:orderId", jwtAuth, api.getAttendeeById);

export default router;
