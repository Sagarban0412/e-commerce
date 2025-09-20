import express from "express";
import dotenv from "dotenv";
import authRoute from "./src/routes/authRoute.js";
import productRoute from "./src/routes/product.route.js";
import connectDB from "./utils/mongoose.js";
import category from "./src/routes/category.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import Stripe from "stripe";

dotenv.config();
connectDB(); //connecting to the mongodb database

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(cookieParser());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.get("/", (req, res) => {
  res.send("Hello !!");
});

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/category", category);

app.post('/create-checkout-session', async(req,res)=>{
  const {products } = req.body;

  const lineItems = products.map((product)=>({
    price_data:{
      currency:"usd",
      product_data:{
        name:product.title,
        images: [product.image]
      },
      unit_amount: Math.round(product.price*100),
    },
    quantity: product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"http://localhost:3000/myOrder",
    cancel_url:"http://localhost:3000/error"
  })
  res.json({id:session.id})
})

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
