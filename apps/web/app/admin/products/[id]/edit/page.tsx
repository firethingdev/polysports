'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProductForm } from '../../components/product-form';
import { getProductById, updateProduct } from '../../lib/product-storage';
import { Product } from '@/types';
import { Skeleton } from '@workspace/ui/components/skeleton';

export default function EditProductPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getProductById(id);
    if (data) {
      setProduct(data);
    } else {
      router.push('/admin/products');
    }
    setLoading(false);
  }, [id, router]);

  const handleSave = (data: Partial<Product>) => {
    updateProduct(id, data);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-[500px] w-full mt-8" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">Modify the details of {product.name}.</p>
      </div>

      <ProductForm
        title="Edit product details"
        initialData={product}
        onSave={handleSave}
      />
    </div>
  );
}
