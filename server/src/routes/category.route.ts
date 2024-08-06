import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller";
const router = Router();

router.post(
  "/create",
  verifyAuth(Object.values([ROLES.ADMIN])),
  createCategory
);
router.get("/", getCategories);
router.put("/:id", verifyAuth(Object.values(ROLES)), updateCategory);
router.delete("/:id", verifyAuth(Object.values(ROLES)), deleteCategory);

export default router;
