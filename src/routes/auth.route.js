import express from "express";

import authController from "../controllers/auth.controller";
import verifyToken from "../middleware/verifyToken"
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me",verifyToken.auth, authController.profile);
router.post("/profile",verifyToken.auth, authController.updateProfile);

export default router;
