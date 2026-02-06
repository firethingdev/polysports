'use client';

import { Header } from '@/components/header';
import { useCart } from '@/context/CartContext';
import React from 'react';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const { items } = useCart();

  return (
    <>
      <Header
        cartItemsCount={items.reduce((acc, item) => acc + item.quantity, 0)}
      />
      <main className='min-h-screen'>{children}</main>
      <footer className='border-t border-border py-8 px-4 md:px-6'>
        <div className='max-w-7xl mx-auto text-center text-sm text-muted-foreground'>
          <p>&copy; 2026 Polysports. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
