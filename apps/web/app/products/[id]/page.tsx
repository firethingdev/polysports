'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { ImageCarousel } from '@/components/image-carousel';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/lib/data/mockProducts';
import { ProductCard } from '@/components/product-card';
import { ShoppingCart, Minus, Plus } from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  // Get related products from the same category
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className='min-h-screen py-8 px-4 md:px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Product Details Section */}
        <div className='grid md:grid-cols-2 gap-8 lg:gap-12 mb-16'>
          {/* Image Carousel */}
          <div>
            <ImageCarousel images={product.images} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            <div>
              <Badge className='mb-4'>{product.category}</Badge>
              <h1 className='text-4xl font-bold mb-4'>{product.name}</h1>
              <p className='text-3xl font-bold text-primary mb-6'>
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className='prose prose-sm max-w-none'>
              <p className='text-muted-foreground leading-relaxed'>
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className='flex items-center gap-2'>
              {product.stock > 0 ? (
                <>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                  <span className='text-sm text-green-600 dark:text-green-400 font-medium'>
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <>
                  <div className='h-2 w-2 rounded-full bg-red-500'></div>
                  <span className='text-sm text-red-600 dark:text-red-400 font-medium'>
                    Out of Stock
                  </span>
                </>
              )}
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className='space-y-4'>
              <label className='text-sm font-medium'>Quantity</label>
              <div className='flex flex-col md:flex-row items-stretch md:items-center gap-4'>
                <div className='flex items-center border border-border rounded-lg w-fit'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className='h-10 w-10'
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <span className='w-12 text-center font-medium'>
                    {quantity}
                  </span>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={incrementQuantity}
                    disabled={quantity >= 99}
                    className='h-10 w-10'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                <Button
                  size='lg'
                  className='w-full md:flex-1'
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addedToCart}
                >
                  {addedToCart ? (
                    <>Added to Cart!</>
                  ) : (
                    <>
                      <ShoppingCart className='mr-2 h-5 w-5' />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className='border-t border-border pt-6 space-y-2 text-sm text-muted-foreground'>
              <p>• Free shipping on orders over $50</p>
              <p>• 30-day return policy</p>
              <p>• Secure checkout</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className='border-t border-border pt-12'>
            <h2 className='text-3xl font-bold mb-8'>Related Products</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  description={relatedProduct.description}
                  price={relatedProduct.price}
                  images={relatedProduct.images}
                  stock={relatedProduct.stock}
                  onAddToCart={() => addItem(relatedProduct, 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
