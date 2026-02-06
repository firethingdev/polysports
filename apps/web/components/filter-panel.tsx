'use client';

import * as React from 'react';
import { Button } from '@workspace/ui/components/button';
import { ChevronDown } from 'lucide-react';

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  minPrice: number;
  maxPrice: number;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

export function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  selectedMinPrice,
  selectedMaxPrice,
  onPriceChange,
}: FilterPanelProps) {
  const [showCategories, setShowCategories] = React.useState(true);
  const [showPrice, setShowPrice] = React.useState(true);

  return (
    <div className='space-y-4'>
      {/* Categories Filter */}
      <div className='rounded-lg border border-border bg-card p-4'>
        <button
          onClick={() => setShowCategories(!showCategories)}
          className='flex w-full items-center justify-between font-semibold mb-3'
        >
          Categories
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showCategories ? '' : '-rotate-90'
            }`}
          />
        </button>

        {showCategories && (
          <div className='space-y-2'>
            <button
              onClick={() => onCategoryChange(null)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  onCategoryChange(
                    selectedCategory === category ? null : category,
                  )
                }
                className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className='rounded-lg border border-border bg-card p-4'>
        <button
          onClick={() => setShowPrice(!showPrice)}
          className='flex w-full items-center justify-between font-semibold mb-3'
        >
          Price Range
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showPrice ? '' : '-rotate-90'
            }`}
          />
        </button>

        {showPrice && (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                Min: ${selectedMinPrice.toFixed(2)}
              </label>
              <input
                type='range'
                min={minPrice}
                max={maxPrice}
                value={selectedMinPrice}
                onChange={(e) =>
                  onPriceChange(Number(e.target.value), selectedMaxPrice)
                }
                className='w-full'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                Max: ${selectedMaxPrice.toFixed(2)}
              </label>
              <input
                type='range'
                min={minPrice}
                max={maxPrice}
                value={selectedMaxPrice}
                onChange={(e) =>
                  onPriceChange(selectedMinPrice, Number(e.target.value))
                }
                className='w-full'
              />
            </div>
            <Button
              onClick={() => onPriceChange(minPrice, maxPrice)}
              variant='outline'
              size='sm'
              className='w-full'
            >
              Reset Price
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
