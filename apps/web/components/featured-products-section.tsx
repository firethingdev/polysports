'use client';

import { ProductGrid } from '@/components/product-grid';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface FeaturedProductsSectionProps {
  products: Product[];
}

export function FeaturedProductsSection({
  products,
}: FeaturedProductsSectionProps) {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  return <ProductGrid products={products} onAddToCart={handleAddToCart} />;
}
