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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator_1.default.isEmail,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        minlength: [7, "Phone number must be at least 7 characters"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    address: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar: String,
    hasNotifications: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Return if the password is not modified
        if (!this.isModified("password"))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 10);
        next();
    });
});
UserSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
UserSchema.methods.generateAccessToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign({
            _id: this._id,
            username: this.username,
            email: this.email,
            role: this.role,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        });
    });
};
exports.User = mongoose_1.models.User || (0, mongoose_1.model)("User", UserSchema);
