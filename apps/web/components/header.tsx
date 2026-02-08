'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShoppingCart, Home, Package, History, LayoutDashboard } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

interface HeaderProps {
  cartItemsCount?: number;
}

export function Header({ cartItemsCount = 0 }: HeaderProps) {
  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <nav className='flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto'>
        <Link href='/' className='flex items-center gap-2 font-bold text-xl'>
          <ShoppingCart className='h-6 w-6' />
          <span>Polysports</span>
        </Link>

        <div className='flex items-center gap-2 md:gap-4'>
          <Link href='/'>
            <Button variant='ghost' size='sm' className='gap-2'>
              <Home className='h-4 w-4' />
              <span className='hidden sm:inline'>Home</span>
            </Button>
          </Link>

          <Link href='/products'>
            <Button variant='ghost' size='sm' className='gap-2'>
              <Package className='h-4 w-4' />
              <span className='hidden sm:inline'>Shop</span>
            </Button>
          </Link>

          <Link href='/orders'>
            <Button variant='ghost' size='sm' className='gap-2'>
              <History className='h-4 w-4' />
              <span className='hidden sm:inline'>Orders</span>
            </Button>
          </Link>

          <Link href='/admin'>
            <Button variant='ghost' size='sm' className='gap-2'>
              <LayoutDashboard className='h-4 w-4' />
              <span className='hidden sm:inline'>Admin</span>
            </Button>
          </Link>

          <Link href='/cart'>
            <Button
              variant='outline'
              size='sm'
              className='relative gap-2 md:gap-2'
            >
              <ShoppingCart className='h-4 w-4' />
              <span className='hidden sm:inline'>Cart</span>
              {cartItemsCount > 0 && (
                <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground font-semibold'>
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
