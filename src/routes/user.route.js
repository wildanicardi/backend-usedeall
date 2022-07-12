import express from "express";

import userController from "../controllers/user.controller";
import verifyToken from "../middleware/verifyToken"
const router = express.Router();

router.get("/",[verifyToken.auth,verifyToken.isAdmin],userController.list);
router.post("/",[verifyToken.auth,verifyToken.isAdmin], userController.store);
router.put("/:userId",[verifyToken.auth,verifyToken.isAdmin], userController.update);
router.get("/:userId",[verifyToken.auth,verifyToken.isAdmin], userController.show);
router.delete("/:userId",[verifyToken.auth,verifyToken.isAdmin], userController.destroy);
export default router;
