'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Star, Package } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center">
          {imageError ? (
            <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
              <Package size={48} />
              <span className="text-sm">Product Image</span>
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              priority={false}
            />
          )}
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.type === 'digital' ? 'Digital' : 'Physical'}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-500 transition">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Category */}
          <p className="text-xs text-gray-500">{product.category}</p>

          {/* Price and Stock */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-orange-600">${product.price.toFixed(2)}</span>
              <span className={`text-xs font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
