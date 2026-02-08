import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@workspace/ui/components/button';
import { ProductsCarousel } from '@/components/products-carousel';
import { ArrowRight, Zap, Package, Truck } from 'lucide-react';
import { mockProducts } from '@/lib/data/mockProducts';

export default function Page() {
  const featuredProducts = mockProducts.slice(0, 10);

  return (
    <>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20 px-4 md:px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid gap-8 lg:grid-cols-2 lg:gap-12 items-center'>
            <div className='space-y-6'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
                Your Ultimate Sports Equipment Store
              </h1>
              <p className='text-lg text-muted-foreground max-w-xl'>
                Discover high-quality sports equipment and utilities for all
                your athletic needs. From professional gear to recreational
                equipment.
              </p>
              <div className='flex gap-4'>
                <Link href='/products'>
                  <Button size='lg' className='gap-2'>
                    Shop Now
                    <ArrowRight className='h-4 w-4' />
                  </Button>
                </Link>
                <Link href='#features'>
                  <Button variant='outline' size='lg'>
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className='relative h-96 lg:h-full'>
              <div className='absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl' />
              <Image
                src='https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop'
                alt='Sports equipment'
                fill
                className='object-cover rounded-2xl'
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-16 px-4 md:px-6 bg-secondary/30'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
            Why Shop With Us
          </h2>
          <div className='grid gap-8 md:grid-cols-3'>
            <div className='space-y-4 p-6 rounded-lg border border-border bg-background'>
              <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                <Zap className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold'>Fast Shipping</h3>
              <p className='text-muted-foreground'>
                Get your sports gear delivered quickly and safely to your
                doorstep.
              </p>
            </div>

            <div className='space-y-4 p-6 rounded-lg border border-border bg-background'>
              <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                <Package className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold'>Quality Products</h3>
              <p className='text-muted-foreground'>
                We carefully select only the best sports equipment from top
                brands.
              </p>
            </div>

            <div className='space-y-4 p-6 rounded-lg border border-border bg-background'>
              <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                <Truck className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold'>Easy Returns</h3>
              <p className='text-muted-foreground'>
                Not satisfied? Return within 30 days for a full refund, no
                questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className='py-16 px-4 md:px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-between mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold'>
              Featured Products
            </h2>
            <Link href='/products'>
              <Button variant='outline' className='gap-2'>
                View All
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
          </div>

          <ProductsCarousel products={featuredProducts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-4 md:px-6 bg-primary'>
        <div className='max-w-7xl mx-auto text-center space-y-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-primary-foreground'>
            Ready to Elevate Your Game?
          </h2>
          <p className='text-lg text-primary-foreground/90 max-w-xl mx-auto'>
            Browse our complete collection of sports equipment and find
            everything you need.
          </p>
          <Link href='/products'>
            <Button size='lg' variant='secondary'>
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
