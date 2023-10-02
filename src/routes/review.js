import { Router } from "express";
import api from "../controllers/review/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getReviews);
router.get("/:eventId", api.getReviewByEventId);

router.post("/", api.addReview);

router.delete("/:reviewId", jwtAuth, api.deleteReview);

export default router;
