import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  mutualFundFolio: { type: String, required: true },
  productName: { type: String, required: true },
  storage: { type: String, required: true },
  months: { type: Number, required: true },
  monthlyAmount: { type: Number, required: true },
  interest: { type: String, required: true },
  cashback: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
