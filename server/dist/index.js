"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
// Routes imports
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.static("public"));
// For url inputs
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.disable("x-powered-by");
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Base Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Inventory Managment System - API",
    });
});
console.log("Hello");
// Routes
// Middlewares
// Listen To Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
