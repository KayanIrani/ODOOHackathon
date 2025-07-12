import Product from "../models/products.model.js";
import mongoose from "mongoose";

// GET all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, data: "Products are empty" });
    }
};

// GET specific product by Title (like getSpecificUser by Username)
export const getSpecificProduct = async (req, res) => {
    const productInput = req.query;

    if (!productInput.name) {
        return res.status(400).json({ success: false, data: "Please Provide all the fields" });
    } else {
        try {
            const product = await Product.find({ Title: productInput.name });
            console.log(product);
            res.status(200).json({ success: true, data: product });
        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ success: false, data: "Invalid Product Title" });
        }
    }
};

// POST create product
export const createProduct = async (req, res) => {
    const product = req.body;

    if (
        !product.Title ||
        !product.Points ||
        !product.Description ||
        !product.Seller ||
        !product.Buyer ||
        !product.ProductImage ||
        !product.isBought
    ) {
        return res.status(400).json({ success: false, message: "Please Provide all the fields" });
    }

    const newProduct = Product.create(product);

    try {
        // await newProduct.save();
        res.status(200).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// DELETE product by ID
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: "Chosen Product Deleted Successfully" });
    } catch (error) {
        res.status(404).json({ success: false, data: "Couldn't find Product" });
    }
};
