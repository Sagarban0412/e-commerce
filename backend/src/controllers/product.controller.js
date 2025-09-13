import Product from "../models/product.model.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";
import { v2 as cloudinary } from "cloudinary";

export const get_product = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    console.log("Error fetchin product", error.message);
    res.status(400).json({ message: "product not found" });
  }
};
export const get_productById = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const create_product = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    // Text fields from frontend
    const { title, description, price, stock, category } = req.body;

    // Image from multer + cloudinary
    const imageUrl = req.file?.path; // If using multer-storage-cloudinary this is the URL

    // Build data object
    const productData = {
      title,
      description,
      price,
      stock,
      category,
      image: imageUrl,
    };

    const product = await createProduct(productData);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Product Creation error:", error.message); // log real error
    throw new Error(error.message);
  }
};


export const update_product = async (req, res) => {
  try {
    const { id } = req.params;

    // Text fields
    const { title, description, price, stock, category } = req.body;

    let imageUrl;
    if (req.file) {
      // If using multer-storage-cloudinary, req.file.path is the uploaded URL
      imageUrl = req.file.path;
    }

    const updatedProduct = await updateProduct(id, {
      title,
      description,
      price,
      stock,
      category,
      ...(imageUrl && { image: imageUrl }), // only include if new image uploaded
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const delete_product = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      res.status(400).json("Product not Found");
    }

    res.json({
      message: "Deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.log(error.message);
  }
};
