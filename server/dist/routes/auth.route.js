"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const constants_1 = require("../utils/constants");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/register", (0, auth_middleware_1.verifyAuth)(Object.values(constants_1.ROLES)), auth_controller_1.registerUser);
// router.post("/login", loginUser);
// router.post("/logout", verifyAuth, logoutUser);
// router.post(
//   "/admin-route",
//   verifyAuth(Object.values([ROLES.ADMIN])),
//   registerUser
// );
exports.default = router;
