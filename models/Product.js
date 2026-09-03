import mongoose from 'mongoose';

const emiPlanSchema = new mongoose.Schema({
  months: { type: Number, required: true },
  monthlyAmount: { type: Number, required: true },
  interest: { type: String, required: true }, // e.g. "0%" or "10.5%"
  cashback: { type: Number, default: 0 },
});

const variantSchema = new mongoose.Schema({
  storage: { type: String, required: true }, // e.g. "256GB"
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  finishes: [String], // e.g. ["Natural Titanium", "Desert Orange"]
  emiPlans: [emiPlanSchema],
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "iPhone 17 Pro"
  slug: { type: String, required: true, unique: true }, // e.g. "iphone-17-pro"
  tagline: { type: String },
  image: { type: String },
  variants: [variantSchema],
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
