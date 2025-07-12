import express from 'express';
import {
    getProducts,
    getSpecificProduct,
    deleteProduct,
    createProduct
} from '../controllers/products.controller.js';

const router2 = express.Router();

router2.get("/", getProducts);
router2.get("/search", getSpecificProduct);
router2.post("/", createProduct);
router2.delete("/:id", deleteProduct);

export default router2;
