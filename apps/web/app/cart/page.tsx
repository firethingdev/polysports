'use client';

import { Button } from '@workspace/ui/components/button';
import { CartItemRow } from '@/components/cart-item-row';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className='min-h-screen py-8 px-4 md:px-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center py-16'>
            <ShoppingCart className='h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50' />
            <h1 className='text-3xl font-bold mb-2'>Your Cart is Empty</h1>
            <p className='text-muted-foreground mb-8'>
              Start shopping to add items to your cart!
            </p>
            <Link href='/products'>
              <Button className='gap-2'>
                <ArrowLeft className='h-4 w-4' />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-8 px-4 md:px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-2'>Shopping Cart</h1>
          <p className='text-muted-foreground'>
            You have {items.length} item{items.length !== 1 ? 's' : ''} in your
            cart
          </p>
        </div>

        {/* Cart Items */}
        <div className='rounded-lg border border-border bg-card p-6 mb-8'>
          {items.map((item) => (
            <CartItemRow
              key={item.product.id}
              productId={item.product.id}
              productName={item.product.name}
              productImages={item.product.images}
              price={item.product.price}
              quantity={item.quantity}
              onQuantityChange={(quantity) =>
                updateQuantity(item.product.id, quantity)
              }
              onRemove={() => removeItem(item.product.id)}
            />
          ))}
        </div>

        {/* Summary */}
        <div className='rounded-lg border border-border bg-card p-6 mb-8'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-muted-foreground'>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-muted-foreground'>Shipping:</span>
                <span className='text-green-600'>Free</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-muted-foreground'>Tax:</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className='border-t border-border pt-4'>
              <div className='flex justify-between'>
                <span className='font-semibold text-lg'>Total:</span>
                <span className='font-semibold text-lg'>
                  ${(total + total * 0.08).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='grid gap-4 sm:grid-cols-2'>
          <Link href='/products'>
            <Button variant='outline' className='w-full gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Continue Shopping
            </Button>
          </Link>
          <Button variant='destructive' onClick={clearCart} className='w-full'>
            Clear Cart
          </Button>
        </div>

        {/* Checkout Notice */}
        <div className='mt-8 p-6 bg-secondary/30 rounded-lg text-center'>
          <p className='text-sm text-muted-foreground mb-4'>
            This is a demo e-commerce site. Proceed to checkout to complete your
            order.
          </p>
          <Button size='lg' className='w-full sm:w-auto'>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
