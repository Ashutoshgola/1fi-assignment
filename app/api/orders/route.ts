import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newOrder = await Order.create(body);
    return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
