'use client';

import * as React from 'react';
import { Button } from '@workspace/ui/components/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemRowProps {
  productId: string;
  productName: string;
  productImages: string[];
  price: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemRow({
  productId,
  productName,
  productImages,
  price,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className='flex gap-4 py-4 border-b border-border'>
      <img
        src={productImages[0]}
        alt={productName}
        className='h-20 w-20 rounded-lg object-cover bg-secondary'
      />
      <div className='flex flex-1 flex-col'>
        <h3 className='font-semibold'>{productName}</h3>
        <p className='text-sm text-muted-foreground'>${price.toFixed(2)}</p>
        <div className='mt-auto flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className='h-4 w-4' />
          </Button>
          <span className='w-8 text-center text-sm font-medium'>
            {quantity}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onQuantityChange(quantity + 1)}
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <span className='font-semibold'>${(price * quantity).toFixed(2)}</span>
        <Button
          variant='ghost'
          size='sm'
          onClick={onRemove}
          className='text-destructive hover:text-destructive'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
