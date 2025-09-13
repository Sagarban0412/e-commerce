import Category from "../models/category.model.js";

export const create_category = async (req, res) => {
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

export const get_category = async (req,res)=>{
  try {
    const categories = await Category.find();
    res.status(200).json(categories)
  } catch (error) {
    console.log(error.message);
     res.status(500).json({ message: "Server error", error: error.message });
  }
}

