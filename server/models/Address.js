import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({

})
// if the address is available, it gets used, otherwise it gets created
const Address = mongoose.models.address || mongoose.model('address', addressSchema);

export default