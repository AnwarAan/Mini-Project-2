import { Router } from "express";
import api from "../controllers/promo/api.js";
import jwtAuth from "../helpers/jwtAuth.js";

const router = Router();

router.get("/", api.getPromos);
router.get("/:eventId", api.getPromoByEventId);

router.post("/", api.addPromo);

router.delete("/:promoId", jwtAuth, api.deletePromo);

export default router;
