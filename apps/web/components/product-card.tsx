'use client';

import * as React from 'react';
import { Button } from '@workspace/ui/components/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  onAddToCart: () => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  stock,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className='rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow'>
      <div className='aspect-square mb-4 overflow-hidden rounded-md bg-secondary'>
        <img
          src={image}
          alt={name}
          className='h-full w-full object-cover hover:scale-105 transition-transform'
        />
      </div>
      <div className='space-y-2'>
        <h3 className='font-semibold text-sm line-clamp-2'>{name}</h3>
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
