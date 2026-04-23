import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { MOCK_PRODUCTS } from '@/lib/mock-products';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 6);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to MegaMart</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Shop everything, everywhere. Millions of products at unbeatable prices
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Start Shopping
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Truck size={40} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Fast Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield size={40} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is safe</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <RotateCcw size={40} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Easy Returns</h3>
              <p className="text-gray-600">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/shop" className="text-orange-500 font-semibold hover:text-orange-600">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12 px-4 my-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our MegaMart Newsletter</h2>
          <p className="text-gray-300 mb-6">
            Get exclusive offers and updates delivered to your inbox
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 font-medium"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
