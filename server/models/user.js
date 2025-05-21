import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    cartItems: { type: Object, default: {}},
}, { minimize: false })

// checks if there is already a user, if not use the model schema
const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User