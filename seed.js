import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tagline: String,
  image: String,
  variants: [
    {
      storage: String,
      price: Number,
      mrp: Number,
      emiPlans: [
        {
          months: Number,
          monthlyAmount: Number,
          interest: String,
          cashback: Number,
        }
      ]
    }
  ]
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const productsData = [
  {
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    tagline: 'Titanium precision. Next-gen mutual fund backed EMI.',
    image: '/iphone_17_pro_max.jpg',
    variants: [
      {
        storage: '256GB',
        price: 134900,
        mrp: 144900,
        emiPlans: [
          { months: 48, monthlyAmount: 3385, interest: '10.5%', cashback: 3000 },
          { months: 36, monthlyAmount: 4320, interest: '10.5%', cashback: 2500 },
          { months: 24, monthlyAmount: 6250, interest: '10.0%', cashback: 2000 },
          { months: 12, monthlyAmount: 11850, interest: '0%', cashback: 1500 }
        ]
      }
    ]
  },
  {
    name: 'iPhone 17',
    slug: 'iphone-17',
    tagline: 'A powerhouse in your pocket with zero-interest lien options.',
    image: '/iphone_17_pro_max.jpg',
    variants: [
      {
        storage: '128GB',
        price: 89900,
        mrp: 99900,
        emiPlans: [
          { months: 48, monthlyAmount: 2250, interest: '10.5%', cashback: 2000 },
          { months: 36, monthlyAmount: 2880, interest: '10.5%', cashback: 1800 },
          { months: 24, monthlyAmount: 4160, interest: '10.0%', cashback: 1500 },
          { months: 12, monthlyAmount: 7900, interest: '0%', cashback: 1000 }
        ]
      }
    ]
  },
  {
    name: 'iPhone 16 Pro',
    slug: 'iphone-16-pro',
    tagline: 'Pro performance with extended tenure mutual fund flexibility.',
    image: '/iphone_17_pro_max.jpg',
    variants: [
      {
        storage: '128GB',
        price: 119900,
        mrp: 129900,
        emiPlans: [
          { months: 48, monthlyAmount: 2999, interest: '10.5%', cashback: 2500 },
          { months: 36, monthlyAmount: 3840, interest: '10.5%', cashback: 2200 },
          { months: 24, monthlyAmount: 5550, interest: '10.0%', cashback: 1800 },
          { months: 12, monthlyAmount: 10500, interest: '0%', cashback: 1200 }
        ]
      }
    ]
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(productsData);
  console.log('Seeded 3 iPhone products successfully into MongoDB!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
