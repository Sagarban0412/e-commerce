import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

export const create_product = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const product = await createProduct(req.body);

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
  const { id } = req.params;
  const updatedProduct = await updateProduct(id, req.body);

  if (!updatedProduct) {
    res.status(400).json({ error: "product not found" });
  }

  res.json({
    message: "Updated successfully",
    data: updatedProduct,
  });
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
