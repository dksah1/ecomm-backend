import express from "express";
import formidable from "express-formidable";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import CheckId from "../middlewares/checkId.js";
import {
  addProduct,
  updateProductDetails,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails);
export default router;
