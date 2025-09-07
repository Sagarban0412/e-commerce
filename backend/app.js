import express from "express";
import dotenv from "dotenv";
import authRoute from "./src/routes/authRoute.js";
import productRoute from "./src/routes/product.route.js";
import connectDB from "./utils/mongoose.js";
import category from "./src/routes/category.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./src/middleware/authMiddleware.js";

dotenv.config();
connectDB(); //connecting to the mongodb database

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello !!");
});

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/category", category);

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
