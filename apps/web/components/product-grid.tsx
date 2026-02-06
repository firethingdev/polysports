'use client';

import * as React from 'react';
import { ProductCard } from './product-card';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
}

export function ProductGrid({
  products,
  onAddToCart,
  isLoading = false,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className='rounded-lg border border-border bg-card p-4 animate-pulse'
          >
            <div className='aspect-square mb-4 bg-secondary rounded-md' />
            <div className='space-y-2'>
              <div className='h-4 bg-secondary rounded' />
              <div className='h-3 bg-secondary rounded w-3/4' />
              <div className='h-4 bg-secondary rounded w-1/2' />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className='col-span-full flex items-center justify-center py-12'>
        <p className='text-muted-foreground'>No products found.</p>
      </div>
    );
  }

  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}
