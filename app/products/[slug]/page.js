'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function loadProductData() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Failed to load product');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProductData();
  }, [slug]);

  if (loading) return <div className="flex h-screen items-center justify-center text-gray-500 font-medium">Loading product details...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500 font-medium">Error: {error}</div>;
  if (!product) return <div className="flex h-screen items-center justify-center text-gray-500 font-medium">Product not found</div>;

  const variant = product.variants?.[0] || {};
  const emiPlans = variant.emiPlans || [];

  const handleProceed = () => {
    if (selectedPlanIndex === null) {
      alert('Please select an EMI plan first!');
      return;
    }
    const chosenPlan = emiPlans[selectedPlanIndex];

    localStorage.setItem('selectedOrder', JSON.stringify({
      productName: product.name,
      storage: variant.storage || '128GB',
      months: chosenPlan.months,
      monthlyAmount: chosenPlan.monthlyAmount,
      interest: chosenPlan.interest,
      cashback: chosenPlan.cashback
    }));

    router.push('/checkout');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8">
        
        <div className="text-center">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
            Selected Model
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.tagline}</p>
        </div>

        <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl h-64 flex items-center justify-center p-4 overflow-hidden">
          <img 
            src="/iphone_17_pro_max.jpg" 
            alt={product.name} 
            className="max-h-full max-w-full object-contain drop-shadow-md"
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-100 pb-6">
          <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
            {variant.storage}
          </span>
          <div className="mt-3 sm:mt-0 text-right">
            <span className="text-sm text-gray-400 line-through mr-3">₹{variant.mrp?.toLocaleString()}</span>
            <span className="text-2xl font-bold text-gray-900">₹{variant.price?.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">EMI plans backed by mutual funds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emiPlans.map((plan, index) => {
              const isSelected = selectedPlanIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedPlanIndex(index)}
                  style={{
                    border: isSelected ? '3px solid #2563eb' : '1px solid #d1d5db',
                    backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                    padding: '16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 6px -1px rgba(37, 99, 235, 0.2)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-gray-900 text-sm">
                      ₹{plan.monthlyAmount?.toLocaleString()} x {plan.months} months
                    </span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {plan.interest} interest
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Additional cashback of ₹{plan.cashback?.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleProceed}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white shadow-sm transition-all duration-200 ${
              selectedPlanIndex !== null
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99]'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {selectedPlanIndex !== null ? 'Proceed with Selected Plan' : 'Select a Plan to Continue'}
          </button>
        </div>

      </div>
    </main>
  );
}
