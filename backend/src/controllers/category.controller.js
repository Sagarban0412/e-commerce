import Category from "../models/category.model.js";

export const create_category = async (req, res) => {
  try {
    const { name } = req.body;
    
    let imageUrl;
    if (req.file) {
      // If using multer-storage-cloudinary, req.file.path is the uploaded URL
      imageUrl = req.file.path;
    }

    const category = new Category({
      name: name,
      image:imageUrl
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

