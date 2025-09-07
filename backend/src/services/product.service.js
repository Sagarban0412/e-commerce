import Product from "../models/product.model.js";

export const createProduct = async (data) => {
  try {
    const product = new Product(data);
    await product.save();
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return updatedProduct;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (id)=>{
  const deletedProduct = await Product.findByIdAndDelete(id)
  return deletedProduct;
}
