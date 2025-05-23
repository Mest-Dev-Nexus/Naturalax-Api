import { Router } from "express";
import {
  addProduct,
  countProducts,
  replaceProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/product.js";
import { productPicturesUpload } from "../middlewares/upload.js";
import { isAuthenticated, authorizeRole,authorizeAdmin, } from "../middlewares/auth.js";

// Create products router
const productRouter = Router();

// Define routes
productRouter.post(
  "/products",
  isAuthenticated,
  authorizeAdmin(["superadmin", "admin"]),
  productPicturesUpload.array("pictures", 3),
  addProduct
);

productRouter.get("/products", getProducts);
productRouter.get("/product/:id", getProductById);
productRouter.get("/products/count", countProducts);

// Fix the syntax error - removed the comma and fixed the structure
productRouter.patch(
  "/product/:id",
  isAuthenticated,
  productPicturesUpload.array("pictures", 3),
  updateProduct
);

productRouter.put(
  "/product/:id",
  isAuthenticated,
  authorizeAdmin(["superadmin", "admin"]), // Added authorization check for consistency
  productPicturesUpload.array("pictures", 3),
  replaceProduct
);

productRouter.delete(
  "/products/:id",
  isAuthenticated,
  authorizeAdmin(["superadmin", "admin"]), // Added authorization check for consistency
  deleteProduct
);

// Export the router
export default productRouter;
