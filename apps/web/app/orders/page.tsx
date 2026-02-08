'use client';

import { useState } from 'react';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { mockOrders } from '@/lib/data/mockOrders';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const { addItem } = useCart();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleOrderAgain = (orderId: string) => {
    const order = mockOrders.find((o) => o.id === orderId);
    if (order) {
      order.items.forEach((item) => {
        addItem(item.product, item.quantity);
      });
      // In a real app, you'd navigate to checkout or show a toast
    }
  };

  if (mockOrders.length === 0) {
    return (
      <div className='min-h-screen py-8 px-4 md:px-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center py-16'>
            <ShoppingBag className='h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50' />
            <h1 className='text-3xl font-bold mb-2'>No Orders Yet</h1>
            <p className='text-muted-foreground mb-8'>
              You haven&apos;t placed any orders. Start shopping to create your first
              order!
            </p>
            <Link href='/products'>
              <Button>Shop Now</Button>
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
          <h1 className='text-4xl font-bold mb-2'>Order History</h1>
          <p className='text-muted-foreground'>
            You have {mockOrders.length} order
            {mockOrders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Orders List */}
        <div className='space-y-4'>
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className='rounded-lg border border-border bg-card overflow-hidden'
            >
              {/* Order Header */}
              <button
                onClick={() =>
                  setExpandedOrderId(
                    expandedOrderId === order.id ? null : order.id,
                  )
                }
                className='w-full p-6 text-left hover:bg-secondary/50 transition-colors flex items-center justify-between'
              >
                <div className='flex-1'>
                  <div className='flex items-center gap-4 mb-2'>
                    <span className='font-semibold text-lg'>{order.id}</span>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Ordered on{' '}
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className='text-right mr-4'>
                  <p className='font-semibold'>${order.total.toFixed(2)}</p>
                  <p className='text-sm text-muted-foreground'>
                    {order.items.length} item
                    {order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    expandedOrderId === order.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Order Details */}
              {expandedOrderId === order.id && (
                <div className='border-t border-border px-6 py-6 bg-secondary/30'>
                  <div className='space-y-4 mb-6'>
                    <h3 className='font-semibold'>Order Items</h3>
                    {order.items.map((item) => (
                      <div
                        key={item.product.id}
                        className='flex gap-4 rounded border border-border bg-background p-4'
                      >
                        <Image
                          src={item.product.images[0] || ''}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className='rounded object-cover'
                        />
                        <div className='flex-1'>
                          <h4 className='font-semibold'>{item.product.name}</h4>
                          <p className='text-sm text-muted-foreground'>
                            ${item.product.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='font-semibold'>
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className='border-t border-border pt-4 mb-6 space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Subtotal:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Tax (8%):</span>
                      <span>${(order.total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className='border-t border-border pt-2 flex justify-between font-semibold'>
                      <span>Total:</span>
                      <span>
                        ${(order.total + order.total * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <Button
                    onClick={() => handleOrderAgain(order.id)}
                    className='w-full'
                  >
                    Order Again
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
