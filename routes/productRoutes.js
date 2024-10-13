import express from "express";
import formidable from "express-formidable";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import CheckId from "../middlewares/checkId.js";
import {
  addProduct,
  updateProductDetails,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);
router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails);

router.route("/allproducts").get(fetchAllProducts);
export default router;
