import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    product_price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be greater than or equal to 0"],
    },
    product_desc: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to Category collection
      required: [true, "Category is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    imageUrl: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product
