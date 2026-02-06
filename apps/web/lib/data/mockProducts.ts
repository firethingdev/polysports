import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Basketball',
    description: 'High-quality regulation basketball for indoor play',
    price: 69.99,
    category: 'Basketball',
    image:
      'https://images.unsplash.com/photo-1516623750267-bed2296ae4c8?w=300&h=300&fit=crop',
    stock: 15,
  },
  {
    id: '2',
    name: 'Soccer Ball',
    description: 'Official FIFA size soccer ball with premium materials',
    price: 49.99,
    category: 'Soccer',
    image:
      'https://images.unsplash.com/photo-1563007631-97e0a30e8d47?w=300&h=300&fit=crop',
    stock: 20,
  },
  {
    id: '3',
    name: 'Tennis Racket',
    description: 'Lightweight carbon fiber tennis racket with grip',
    price: 149.99,
    category: 'Tennis',
    image:
      'https://images.unsplash.com/photo-1554224311-beee415c15b7?w=300&h=300&fit=crop',
    stock: 10,
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Comfortable and durable running shoes with cushioning',
    price: 119.99,
    category: 'Footwear',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    stock: 25,
  },
  {
    id: '5',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat perfect for home workouts',
    price: 29.99,
    category: 'Fitness',
    image:
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop',
    stock: 30,
  },
  {
    id: '6',
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set from 5 to 50 lbs',
    price: 199.99,
    category: 'Fitness',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
    stock: 8,
  },
  {
    id: '7',
    name: 'Baseball Glove',
    description: 'Premium leather baseball glove for catching',
    price: 89.99,
    category: 'Baseball',
    image:
      'https://images.unsplash.com/photo-1632762230091-8f4a86db80a3?w=300&h=300&fit=crop',
    stock: 12,
  },
  {
    id: '8',
    name: 'Swimming Goggles',
    description: 'Professional-grade swimming goggles with anti-fog coating',
    price: 34.99,
    category: 'Swimming',
    image:
      'https://images.unsplash.com/photo-1576610616656-570786549738?w=300&h=300&fit=crop',
    stock: 40,
  },
  {
    id: '9',
    name: 'Skateboard Deck',
    description: 'Professional skateboard deck with quality bearings',
    price: 79.99,
    category: 'Skateboarding',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300&h=300&fit=crop',
    stock: 18,
  },
  {
    id: '10',
    name: 'Badminton Racket Set',
    description: 'Set of 2 badminton rackets with shuttlecocks',
    price: 39.99,
    category: 'Badminton',
    image:
      'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=300&h=300&fit=crop',
    stock: 22,
  },
  {
    id: '11',
    name: 'Cycling Helmet',
    description: 'Lightweight safety helmet for cycling enthusiasts',
    price: 99.99,
    category: 'Cycling',
    image:
      'https://images.unsplash.com/photo-1558618665-08edd4b87b6b?w=300&h=300&fit=crop',
    stock: 16,
  },
  {
    id: '12',
    name: 'Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
    price: 44.99,
    category: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1602143407151-7e406dc1f3b5?w=300&h=300&fit=crop',
    stock: 50,
  },
];

export const CATEGORIES = Array.from(
  new Set(mockProducts.map((p) => p.category)),
).sort();

export const PRICE_RANGE = {
  min: 0,
  max: Math.max(...mockProducts.map((p) => p.price)),
};
