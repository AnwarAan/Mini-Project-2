import { Router } from "express";
import api from "../controllers/wishlist/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getWishlists);
router.get("/:wishlistId", api.getWishlistById);

router.post("/", api.addWishlist);

router.delete("/", api.deleteWishlist);

export default router;
