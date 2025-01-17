import express from "express";
import * as authController from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", auth, authController.logout);
router.get("/profile", auth, authController.profile);

export default router;