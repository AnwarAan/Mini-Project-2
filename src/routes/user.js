import { Router } from "express";
import api from "../controllers/user/api.js";
import jwtAuth from "../helpers/jwtAuth.js";

const router = Router();

router.get("/", api.getUsers);
router.get("/:userId", api.getUserById);

router.post("/register", api.register);
router.post("/login", api.login);

router.put("/:userId", jwtAuth, api.updateUser);

router.delete("/:userId", jwtAuth, api.deleteUser);

export default router;
