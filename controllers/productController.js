import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    // console.log({ name, description, price, category, quantity, brand });
    // validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });

      case !brand:
        return res.json({ error: "brand is required" });

      case !description:
        return res.json({ error: "Description is required" });

      case !price:
        return res.json({ error: "Price is required" });

      case !category:
        return res.json({ error: "Category is required" });

      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    // console.log({ name, description, price, category, quantity, brand });
    // validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });

      case !brand:
        return res.json({ error: "brand is required" });

      case !description:
        return res.json({ error: "Description is required" });

      case !price:
        return res.json({ error: "Price is required" });

      case !category:
        return res.json({ error: "Category is required" });

      case !quantity:
        return res.json({ error: "Quantity is required" });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save;

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyboard, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  // Check if the provided id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  addProduct,
  updateProductDetails,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
};
