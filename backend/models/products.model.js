import mongoose from 'mongoose';
import { type } from 'os';

const productSchema = new mongoose.Schema(
    {
        Title:{
            type: String,
            required: true
        },
        Points:{
            type: String,
            required: true
        },
        Description:{
            type: String,
            required: true
        },
        Seller:{
            type: String,
            required: true
        },
        Buyer: {
            type: String, 
            required: true
        },
        ProductImage:{
            type: String,
            required: true
        },
        isBought:{
            type: String,
            required:true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product',productSchema);

export default Product;
