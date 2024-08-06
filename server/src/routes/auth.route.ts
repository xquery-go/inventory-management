import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";
import { Role } from "../types/type";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller";
const router = Router();

// router.post(
//   "/register",
//   verifyAuth(Object.values(ROLES) as Role[]),
//   registerUser
// );

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyAuth(Object.values(ROLES)), logoutUser);

// router.post(
//   "/admin-route",
//   verifyAuth(Object.values([ROLES.ADMIN])),
//   registerUser
// );

export default router;
