import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.json({ error: "already exist" });
    }

    const category = await new Category({ name }).save();
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error creating category",
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }
    category.name = name;
    const updateCategory = await category.save();
    res.json(updateCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const remove = await Category.findByIdAndDelete(req.params.categoryId);
    if (!remove) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const listCategory = asyncHandler(async (req, res) => {
  try {
    const allCategory = await Category.find({});
    res.status(200).json(allCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategory,
  readCategory,
};
