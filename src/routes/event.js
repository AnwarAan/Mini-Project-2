import { Router } from "express";
import api from "../controllers/event/api.js";
import jwtAuth from "../helpers/jwt-auth.js";
import upload from "../helpers/upload-file.js";

const router = Router();

router.get("/", api.getEvents);
router.get("/user/:userId", api.getEventUserId);
router.get("/detail/:eventId", api.getEventById);

router.post("/", upload.single("file"), api.addEvent);

router.put("/:eventId", jwtAuth, api.updateEvent);

router.delete("/:eventId", jwtAuth, api.deleteEvent);


export default router;
