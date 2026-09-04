'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center text-gray-500 font-medium">Loading submitted orders...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500 font-medium">Error: {error}</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Submitted EMI Orders</h1>
            <p className="text-gray-500 text-sm mt-1">Evaluator / Admin view of all mutual fund-backed applications saved in MongoDB.</p>
          </div>
          <Link href="/products" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all">
            Browse Store
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 font-medium">
            No orders found in MongoDB yet. Complete a checkout to see it appear here!
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-base">{order.fullName}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{order.email}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold text-gray-800">{order.productName}</span> ({order.storage}) • <span className="text-blue-600 font-semibold">₹{order.monthlyAmount?.toLocaleString()} x {order.months} mos</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Folio ID: <span className="font-mono text-gray-600">{order.mutualFundFolio}</span> | Phone: {order.phone}
                  </p>
                </div>
                <div className="text-right flex flex-col items-start md:items-end">
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {order.interest} interest
                  </span>
                  <span className="text-xs text-gray-400 mt-2">
                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
