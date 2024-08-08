import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";
import {
  addOrder,
  changeOrderStatus,
  createPaymentLink,
  getAllOrders,
  getOrderDetails,
} from "../controllers/order.controller";

const router = Router();

router.post("/", addOrder);
router.get("/", verifyAuth(Object.values([ROLES.ADMIN])), getAllOrders);
router.patch(
  "/:id/status",
  verifyAuth(Object.values([ROLES.ADMIN])),
  changeOrderStatus
);
router.get("/:id", getOrderDetails);
router.post("/payment", createPaymentLink);

export default router;
