import { Router } from "express";
import api from "../controllers/promo/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getPromos);
router.get("/:promoId", api.getPromoById);

router.post("/", api.addPromo);

router.put("/:promoId", jwtAuth, api.updatePromo);

router.delete("/:promoId", jwtAuth, api.deletePromo);

export default router;
