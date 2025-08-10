import { Router } from "express";
import {
  loginUser,
  registerUser,
  userProfile,
  changePassword
} from "../controllers/auth.controller.js";

 const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", userProfile);
router.post("/changepassword", changePassword); // Add this
export default router;
