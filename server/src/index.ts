import express from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
// Routes imports

config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
// For url inputs
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.disable("x-powered-by");
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Base Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Inventory Managment System - API",
  });
});

console.log("Hello")

// Routes

// Middlewares

// Listen To Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
