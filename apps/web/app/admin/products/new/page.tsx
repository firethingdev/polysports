'use client';

import { ProductForm } from '../components/product-form';
import { Product } from '@/types';
import { createProduct } from '@/app/actions/products';

export default function NewProductPage() {
  const handleSave = async (data: Partial<Product>) => {
    await createProduct(data as Omit<Product, 'id'>);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Add New Product</h1>
        <p className='text-muted-foreground'>
          Create a new item in your sports equipment catalog.
        </p>
      </div>

      <ProductForm title='Product Details' onSave={handleSave} />
    </div>
  );
}
