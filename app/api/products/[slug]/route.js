import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export async function GET(request, context) {
  console.log("--> API HIT: /api/products/[slug] called");

  try {
    const params = await context.params;
    const { slug } = params;
    console.log("--> Requested Slug:", slug);

    await dbConnect();
    const product = await Product.findOne({ slug });

    if (!product) {
      console.log("--> Product not found in DB for slug:", slug);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
