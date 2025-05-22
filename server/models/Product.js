import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true},
    price: { type: Number, required: true},
    offerPrice: { type: Number, required: true},
    image: { type: Array, required: true},
    category: { type: String, required: true},
    cartItems: { type: Object, default: {}},
}, { minimize: false })

// checks if there is already a user, if not use the model schema
const Product = mongoose.models.product || mongoose.model('product', userSchema);

export default Product