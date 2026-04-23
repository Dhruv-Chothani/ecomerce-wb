'use client';

import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-2xl text-white">MegaMart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-gray-200 hover:text-orange-400 font-medium transition">
              Shop All
            </Link>
            <Link href="/about" className="text-gray-200 hover:text-orange-400 font-medium transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-200 hover:text-orange-400 font-medium transition">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-gray-200 hover:text-orange-400 transition"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-200 hover:text-red-400 transition"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-200 hover:text-orange-400 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-200 hover:text-orange-400 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-slate-700">
            <div className="flex flex-col gap-4 pt-4">
              <Link href="/shop" className="text-gray-200 hover:text-orange-400 font-medium">
                Shop All
              </Link>
              <Link href="/about" className="text-gray-200 hover:text-orange-400 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-200 hover:text-orange-400 font-medium">
                Contact
              </Link>
              {user ? (
                <>
                  <Link href="/account" className="text-gray-200 hover:text-orange-400 font-medium">
                    My Account
                  </Link>
                  <button
                    onClick={logout}
                    className="text-left text-gray-200 hover:text-red-400 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-200 hover:text-orange-400 font-medium">
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <Link href="/cart" className="text-gray-200 hover:text-orange-400 font-medium">
                Cart ({cartCount})
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
