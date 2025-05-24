import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
    userId: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
})
// if the address is available, it gets used, otherwise it gets created
const Address = mongoose.models.address || mongoose.model('address', addressSchema);

export default Address;
