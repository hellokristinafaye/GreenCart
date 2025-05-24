import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

})

// if an order exists it is called, if not it is created w/ the name order and an orderSchema
const Order = mongoose.models.order || mongoose.model('order', orderSchema);

export default Order;
