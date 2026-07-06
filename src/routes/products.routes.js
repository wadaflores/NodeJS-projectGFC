import express from 'express';
//import { getAllProducts, getProductById } from '../controllers/products.controllers.js';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/products.controllers.js';
import { authentication } from '../middlewares/authentication.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("LANDING PAGE");
});

// Todos los productos y query params
router.get('/products', getAllProducts); //products?category=electronics

// Producto por ID (path param)
router.get('/products/:id', getProductById);

router.post("/products/create", authentication, createProduct);

router.put("/products/:id", authentication, updateProduct);

router.delete("/products/:id", authentication, deleteProduct)

export default router;