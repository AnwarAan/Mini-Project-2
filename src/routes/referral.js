import { Router } from "express";
import api from "../controllers/referral/api.js";
import jwtAuth from "../helpers/jwtAuth.js";

const router = Router();

router.get("/", api.getReferrals);
router.get("/:userId", api.getReferralByUserId);

router.post("/", api.addReferral);

router.delete("/:referralId", jwtAuth, api.deleteReferral);

export default router;
