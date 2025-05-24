import Order from "../models/Order";
import Product from "../models/Product.js";


// Place Order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({success:false, message: "Invalid Data"})
        }
        // Calculate Amount Using Item quantity
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity
        }, 0)

        // Add Tax Charge (2%)
        amount += Math.floor(amount * .02);

        await Order
    } catch (error) {
        
    }
}