import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type: String, requred: true, ref: 'user' },
    items: [{
        product: { type: String, requred: true, ref: 'product' },
        quantity: { type: Number, requred: true }
    }],
    amount: { type: Number, requred: true },
    address: { type: String, requred: true, ref: 'address' },
    status: { type: String, default: 'Order Placed' },
    paymentType: { type: String, requred: true },
    isPaid: { type: Boolean, requred: true, default: false },
}, )

// if an order exists it is called, if not it is created w/ the name order and an orderSchema
const Order = mongoose.models.order || mongoose.model('order', orderSchema);

export default Order;
