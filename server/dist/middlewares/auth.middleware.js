"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const verifyAuth = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
                ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
            if (!token) {
                return next(new Error("Unauthorized Access"));
            }
            const payload = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = yield user_model_1.User.findById(payload === null || payload === void 0 ? void 0 : payload._id).select("-password");
            if (!user)
                return next(new Error("Unauthorized Access"));
            if (!roles.includes(user.role))
                return next(new Error("Unauthorized Access"));
            req.user = user;
            next();
        }
        catch (error) {
            console.log(error);
            next(new Error("Authentication Error"));
        }
    });
};
exports.verifyAuth = verifyAuth;
