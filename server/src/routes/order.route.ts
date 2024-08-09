import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";
import {
  addOrder,
  changeOrderStatus,
  getAllOrders,
  getOrderDetails,
} from "../controllers/order.controller";

const router = Router();

// Only signed in users can add order
router.post("/add", verifyAuth(Object.values(ROLES)), addOrder);
// Only admin can get see all orders
router.get("/", verifyAuth(Object.values([ROLES.ADMIN])), getAllOrders);
// Only admin can change order status
router.patch(
  "/:id/status",
  verifyAuth(Object.values([ROLES.ADMIN])),
  changeOrderStatus
);
// Anyone can see order details
router.get("/:id", getOrderDetails);

export default router;

// export const controllerFn = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     return res.status(200).json({
//       success: true,
//       message: "",
//       data: "",
//     });
//   } catch (error) {
//     console.log(error);
//     return next(error);
//   }
// };
