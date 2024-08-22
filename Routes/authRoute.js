import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../Controllers/authController";

//router object
const router = express.Router();

//routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
