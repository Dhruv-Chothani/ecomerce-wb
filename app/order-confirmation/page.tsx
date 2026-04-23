'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Check, Package, FileText } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const total = searchParams.get('total') || '0.00';
  const orderNumber = Math.random().toString(36).substring(7).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Icon */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Check size={40} className="text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. We&apos;re getting your order ready.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-gray-900 font-mono">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Order Date</p>
              <p className="text-2xl font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Order Total</p>
              <p className="text-2xl font-bold text-orange-500">${total}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Estimated Delivery</p>
              <p className="text-2xl font-bold text-gray-900">{estimatedDelivery}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">What&apos;s Next?</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <FileText size={24} className="text-orange-500 mt-1" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Confirmation Email</p>
                  <p className="text-gray-600 text-sm">
                    Check your email for order confirmation and tracking details
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Package size={24} className="text-orange-500 mt-1" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order Processing</p>
                  <p className="text-gray-600 text-sm">
                    We&apos;re preparing your order for shipment. Digital products are available immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/account"
            className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition text-center"
          >
            Track Your Order
          </Link>
          <Link
            href="/shop"
            className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition text-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Info Box */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-8">
          <h3 className="font-bold text-slate-900 mb-2">Need Help?</h3>
          <p className="text-slate-800 text-sm">
            If you have any questions about your order, please contact our customer support team at
            support@shophub.com or call 1-800-SHOP-HUB
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
