import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Users, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-slate-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About ShopHub</h1>
          <p className="text-xl md:text-2xl text-orange-100">
            Your trusted destination for quality products
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-4">
            At ShopHub, we believe shopping should be simple, enjoyable, and rewarding. Our mission
            is to connect customers with quality products from trusted sellers, while providing an
            exceptional shopping experience.
          </p>
          <p className="text-lg text-gray-600">
            We curate our collection carefully to ensure every product meets our high standards for
            quality and value.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <Users size={40} className="text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our top priority. We&apos;re committed to providing excellent
                customer service.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <Target size={40} className="text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Focus</h3>
              <p className="text-gray-600">
                We carefully select products that meet our strict quality standards for durability
                and performance.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <Heart size={40} className="text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We&apos;re committed to environmentally responsible practices in our operations.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-orange-500 to-slate-800 text-white rounded-lg p-8 md:p-16 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">30+</p>
              <p className="text-orange-100">Product Categories</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-orange-100">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-orange-100">Satisfaction Guarantee</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-orange-100">Customer Support</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Shop?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our collection of quality products and find exactly what you&apos;re looking for.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Start Browsing
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}
