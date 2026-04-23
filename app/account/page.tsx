'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useAuth } from '@/context/auth-context';
import { LogOut, ShoppingBag, User, MapPin } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Mock order history
  const orders = [
    {
      id: '12345',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      total: 129.99,
      items: 3,
      status: 'Delivered',
    },
    {
      id: '12344',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      total: 249.98,
      items: 2,
      status: 'Delivered',
    },
    {
      id: '12343',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      total: 79.99,
      items: 1,
      status: 'Delivered',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-20 h-fit">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              <nav className="space-y-2 border-t border-gray-200 pt-6">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-100 text-orange-500 font-semibold"
                >
                  <User size={20} />
                  Account
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  <ShoppingBag size={20} />
                  Orders
                </Link>
                <Link
                  href="/account/addresses"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  <MapPin size={20} />
                  Addresses
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition font-semibold"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Account Information</h1>

              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                    <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                    <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Member Since</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Edit Information
                </button>
              </div>

              {/* Recent Orders */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Orders</h2>
                {orders.length > 0 ? (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              {order.date} • {order.items} item{order.items !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-green-600 font-semibold">{order.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <ShoppingBag size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">No orders yet</p>
                    <Link
                      href="/shop"
                      className="inline-block text-orange-500 hover:text-orange-600 font-semibold mt-2"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
