'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    mutualFundFolio: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedOrder = localStorage.getItem('selectedOrder');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.mutualFundFolio) {
      alert('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...orderData
        })
      });

      if (!response.ok) throw new Error('Failed to submit order');

      setSubmitted(true);
      localStorage.removeItem('selectedOrder');
    } catch (err) {
      alert('Error submitting order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900">EMI Application Saved!</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Your order for <span className="font-semibold text-gray-800">{orderData?.productName || 'iPhone'}</span> has been persisted in MongoDB.
          </p>
          <button
            onClick={() => router.push('/products')}
            className="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Complete Your Order</h1>
        <p className="text-gray-500 text-sm mb-6">Finalize your mutual fund-backed EMI plan details.</p>

        {orderData && (
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6">
            <h2 className="font-semibold text-gray-900 text-sm mb-1">Selected Plan Summary</h2>
            <p className="text-sm text-gray-700 font-medium">{orderData.productName} ({orderData.storage})</p>
            <div className="mt-2 flex justify-between items-center text-sm font-bold text-blue-600">
              <span>₹{orderData.monthlyAmount?.toLocaleString()} x {orderData.months} months</span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium">
                {orderData.interest} interest
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm text-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm text-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm text-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Mutual Fund Folio / Account ID</label>
            <input
              type="text"
              name="mutualFundFolio"
              required
              value={formData.mutualFundFolio}
              onChange={handleChange}
              placeholder="MF-12345678"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm text-black"
            />
            <p className="text-xs text-gray-400 mt-1">Required for mutual fund lien confirmation.</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-all"
          >
            {submitting ? 'Saving Order...' : 'Confirm & Place Order'}
          </button>
        </form>
      </div>
    </main>
  );
}
