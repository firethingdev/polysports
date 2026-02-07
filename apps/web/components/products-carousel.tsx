'use client';

import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@workspace/ui/components/carousel';
import { ProductCard } from '@/components/product-card';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductsCarouselProps {
  products: Product[];
}

export function ProductsCarousel({ products }: ProductsCarouselProps) {
  const { addItem } = useCart();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <div className='relative w-full'>
      <Carousel setApi={setApi} className='w-full'>
        <CarouselContent className='-ml-4'>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className='pl-4 md:basis-1/2 lg:basis-1/4'
            >
              <ProductCard
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                images={product.images}
                stock={product.stock}
                onAddToCart={() => handleAddToCart(product)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Indicator Dots */}
      <div className='flex justify-center gap-2 mt-8'>
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? 'bg-primary w-8'
                : 'bg-muted-foreground/30 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
