'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center text-gray-500 font-medium">Loading catalog...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500 font-medium">Error: {error}</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Mutual Fund Lien Store
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Available iPhone Models</h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Select an iPhone to view dynamic tenure and monthly breakdown options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item) => {
            const variant = item.variants?.[0] || {};
            const lowestPlan = variant.emiPlans?.[0] || {};

            return (
              <div
                key={item._id || item.slug}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                      Official Release
                    </span>
                    <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">
                      {variant.storage || '128GB'}
                    </span>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 rounded-xl h-52 flex items-center justify-center p-4 mb-5">
                    <img
                      src="/iphone_17_pro_max.jpg"
                      alt={item.name}
                      className="max-h-full max-w-full object-contain drop-shadow-sm hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{item.tagline}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-baseline mb-3">
                    <div>
                      <span className="text-xs text-gray-400 line-through mr-2">₹{variant.mrp?.toLocaleString()}</span>
                      <span className="text-lg font-bold text-gray-900">₹{variant.price?.toLocaleString()}</span>
                    </div>
                    {lowestPlan.monthlyAmount && (
                      <span className="text-xs font-medium text-emerald-600">
                        From ₹{lowestPlan.monthlyAmount.toLocaleString()}/mo
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/products/${item.slug}`}
                    className="w-full inline-block text-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                  >
                    View EMI Plans
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
