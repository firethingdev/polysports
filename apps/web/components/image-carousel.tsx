'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@workspace/ui/components/carousel';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (images.length === 0) {
    return (
      <div className='w-full aspect-square bg-muted rounded-lg flex items-center justify-center'>
        <p className='text-muted-foreground'>No image available</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* Image Carousel */}
      <div className='relative group'>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className='relative w-full aspect-square bg-muted rounded-lg overflow-hidden'>
                  <Image
                    src={image}
                    alt={`${alt} - Image ${index + 1}`}
                    fill
                    priority={index === 0}
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
                  />

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className='absolute bottom-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium'>
                      {current + 1} / {images.length}
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious className='absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background/90 border-background/60' />
              <CarouselNext className='absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background/90 border-background/60' />
            </>
          )}
        </Carousel>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className='grid grid-cols-4 gap-2'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                index === current
                  ? 'border-primary ring-2 ring-primary ring-offset-2'
                  : 'border-transparent hover:border-muted-foreground/50'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 25vw, 10vw'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
