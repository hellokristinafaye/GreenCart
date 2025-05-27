import mongoose from "mongoose";

// we gotta add "required: true" back to all of these except inStock
const productSchema = new mongoose.Schema({
    name: { type: String},
    description: { type: Array},
    price: { type: Number},
    offerPrice: { type: Number},
    image: { type: Array},
    category: { type: String},
    inStock: { type: Boolean, default: true},
}, { timestamps: true }
)

// checks if there is already a user, if not use the model schema
const Product = mongoose.models.product || mongoose.model('product', productSchema);

export default Product