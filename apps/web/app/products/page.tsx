'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/search-bar';
import { FilterPanel } from '@/components/filter-panel';
import { ProductGrid } from '@/components/product-grid';
import { mockProducts, CATEGORIES, PRICE_RANGE } from '@/lib/data/mockProducts';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function ProductsPage() {
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(PRICE_RANGE.min);
  const [maxPrice, setMaxPrice] = useState(PRICE_RANGE.max);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory;

      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, minPrice, maxPrice]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    // You can add a toast notification here
  };

  return (
    <div className='min-h-screen py-8 px-4 md:px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-2'>Shop Products</h1>
          <p className='text-muted-foreground'>
            Browse our collection of {mockProducts.length} sports equipment
            items
          </p>
        </div>

        {/* Search Bar */}
        <div className='mb-8'>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='Search for basketball, shoes, yoga mat...'
          />
        </div>

        {/* Main Content */}
        <div className='grid gap-8 lg:grid-cols-4'>
          {/* Sidebar Filters */}
          <div className='lg:col-span-1'>
            <FilterPanel
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              minPrice={PRICE_RANGE.min}
              maxPrice={PRICE_RANGE.max}
              selectedMinPrice={minPrice}
              selectedMaxPrice={maxPrice}
              onPriceChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
            />
          </div>

          {/* Products Grid */}
          <div className='lg:col-span-3'>
            <div className='mb-4'>
              <p className='text-sm text-muted-foreground'>
                Showing {filteredProducts.length} of {mockProducts.length}{' '}
                products
              </p>
            </div>
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
