'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductData() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Failed to load product');
        const data = await res.json();
        setProduct(data);
        
        // Select the first EMI plan by default if available
        if (data?.variants?.[0]?.emiPlans?.[0]) {
          setSelectedPlan(data.variants[0].emiPlans[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProductData();
    }
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading product details...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Product not found.</div>;
  }

  const variant = product.variants[0];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Image & Product Info */}
        <div className="flex flex-col items-center justify-between bg-gray-50 rounded-xl p-6">
          <div className="w-full">
            <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">NEW</span>
          </div>

          <div className="my-8 text-center">
            <h1 className="text-2xl font-extrabold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 text-sm mt-1">{variant.storage}</p>
            
            <div className="my-6 h-56 w-full flex items-center justify-center bg-orange-100/60 rounded-lg border border-orange-200">
              <span className="text-orange-700 font-medium text-sm">[ Product Image Preview ]</span>
            </div>
          </div>

          <div className="w-full text-left">
            <span className="line-through text-gray-400 text-sm">₹{variant.mrp.toLocaleString()}</span>
            <div className="text-3xl font-extrabold text-gray-900">₹{variant.price.toLocaleString()}</div>
          </div>
        </div>

        {/* Right Column: EMI Plans */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">EMI plans backed by mutual funds</h3>
            
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {variant.emiPlans.map((plan, index) => {
                const isSelected = selectedPlan?.months === plan.months;
                return (
                  <div 
                    key={index}
                    onClick={() => setSelectedPlan(plan)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      isSelected ? 'border-orange-500 bg-orange-50/40 ring-1 ring-orange-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        ₹{plan.monthlyAmount.toLocaleString()} x {plan.months} months
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded ${plan.interest === '0%' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {plan.interest} interest
                      </span>
                    </div>
                    {plan.cashback > 0 && (
                      <p className="text-xs text-green-600 mt-1.5 font-medium">
                        Additional cashback of ₹{plan.cashback.toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button 
            disabled={!selectedPlan}
            className="w-full mt-6 bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            Proceed with Selected Plan
          </button>
        </div>

      </div>
    </main>
  );
}
