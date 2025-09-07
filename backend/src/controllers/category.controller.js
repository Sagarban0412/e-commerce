import Category from "../models/category.model.js";

const create_category = async (req, res) => {
  try {
    const { name } = req.body;

    const category = new Category({
      name: name,
    });

    return await category.save();
  } catch (error) {
    console.log("creating category Error:", error.message);
    throw new Error(error.message);
  }
};

export default create_category;
