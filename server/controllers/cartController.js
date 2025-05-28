import User from "../models/user.js";

// 7:30 in tutorial
// Update User Cart Data:   /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body
        await User.findByIdAndUpdate(userId, {cartItems: {"12344": 3}})
        res.json({ success: true, message: userId })
        
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
}