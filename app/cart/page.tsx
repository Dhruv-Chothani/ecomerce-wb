'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { Trash2, ArrowLeft, ShoppingCart, Package } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();
  const { user } = useAuth();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  const handleImageError = (productId: string) => {
    setImageErrors((prev) => new Set(prev).add(productId));
  };
  const shippingCost = total > 50 ? 0 : 9.99;
  const tax = total * 0.1;
  const finalTotal = total + shippingCost + tax;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {imageErrors.has(item.product.id) ? (
                        <Package size={32} className="text-gray-400" />
                      ) : (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="100px"
                          onError={() => handleImageError(item.product.id)}
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-gray-600 text-sm mb-2">{item.product.category}</p>
                      <p className="text-xl font-bold text-orange-500">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="w-10 text-center py-1 border-l border-r border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-2">Subtotal</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <Link
                  href="/shop"
                  className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold"
                >
                  <ArrowLeft size={20} />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 rounded-lg p-6 sticky top-20 h-fit">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Shipping
                      {total > 50 && <span className="text-green-600 font-semibold"> (Free)</span>}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ${shippingCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (estimated)</span>
                    <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-orange-500">${finalTotal.toFixed(2)}</span>
                </div>

                {!user && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-sm">
                    <p className="text-gray-700">
                      <Link href="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
                        Sign in
                      </Link>
                      {' '}to track your order
                    </p>
                  </div>
                )}

                <Link
                  href="/checkout"
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition text-center block"
                >
                  Proceed to Checkout
                </Link>

                <p className="text-xs text-gray-600 mt-4 text-center">
                  Secure checkout powered by trusted payment partners
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
