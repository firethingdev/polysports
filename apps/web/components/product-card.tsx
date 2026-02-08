'use client';

import * as React from 'react';
import { Button } from '@workspace/ui/components/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  onAddToCart: () => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  images,
  stock,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className='rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow'>
      <Link href={`/products/${id}`}>
        <div className='aspect-square mb-4 overflow-hidden rounded-md bg-secondary cursor-pointer'>
          <Image src={images[0] || ''} alt={name} width={200} height={200} />
        </div>
      </Link>
      <div className='space-y-2'>
        <Link href={`/products/${id}`}>
          <h3 className='font-semibold text-sm line-clamp-2 hover:underline cursor-pointer'>
            {name}
          </h3>
        </Link>
        <p className='text-xs text-muted-foreground line-clamp-2'>
          {description}
        </p>
        <div className='flex items-baseline gap-2'>
          <span className='text-lg font-bold'>${price.toFixed(2)}</span>
          <span className='text-xs text-muted-foreground'>
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <Button
          onClick={onAddToCart}
          disabled={stock === 0}
          className='w-full mt-2'
          size='sm'
        >
          <ShoppingCart className='mr-2 h-4 w-4' />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
