import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Basketball',
    description: 'High-quality regulation basketball for indoor play',
    price: 69.99,
    category: 'Basketball',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&h=800&fit=crop',
    ],
    stock: 15,
  },
  {
    id: '2',
    name: 'Soccer Ball',
    description: 'Official FIFA size soccer ball with premium materials',
    price: 49.99,
    category: 'Soccer',
    images: [
      'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=800&h=800&fit=crop',
    ],
    stock: 20,
  },
  {
    id: '3',
    name: 'Tennis Racket',
    description: 'Lightweight carbon fiber tennis racket with grip',
    price: 149.99,
    category: 'Tennis',
    images: [
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617882725767-5e7c0c8d0c0e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=800&fit=crop',
    ],
    stock: 10,
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Comfortable and durable running shoes with cushioning',
    price: 119.99,
    category: 'Footwear',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=800&fit=crop',
    ],
    stock: 25,
  },
  {
    id: '5',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat perfect for home workouts',
    price: 29.99,
    category: 'Fitness',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop',
    ],
    stock: 30,
  },
  {
    id: '6',
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set from 5 to 50 lbs',
    price: 199.99,
    category: 'Fitness',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=800&h=800&fit=crop',
    ],
    stock: 8,
  },
  {
    id: '7',
    name: 'Baseball Glove',
    description: 'Premium leather baseball glove for catching',
    price: 89.99,
    category: 'Baseball',
    images: [
      'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1564982775817-5d1c6e651d5a?w=800&h=800&fit=crop',
    ],
    stock: 12,
  },
  {
    id: '8',
    name: 'Swimming Goggles',
    description: 'Professional-grade swimming goggles with anti-fog coating',
    price: 34.99,
    category: 'Swimming',
    images: [
      'https://images.unsplash.com/photo-1576610616656-570786549738?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&h=800&fit=crop',
    ],
    stock: 40,
  },
  {
    id: '9',
    name: 'Skateboard Deck',
    description: 'Professional skateboard deck with quality bearings',
    price: 79.99,
    category: 'Skateboarding',
    images: [
      'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&h=800&fit=crop',
    ],
    stock: 18,
  },
  {
    id: '10',
    name: 'Badminton Racket Set',
    description: 'Set of 2 badminton rackets with shuttlecocks',
    price: 39.99,
    category: 'Badminton',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=800&fit=crop',
    ],
    stock: 22,
  },
  {
    id: '11',
    name: 'Cycling Helmet',
    description: 'Lightweight safety helmet for cycling enthusiasts',
    price: 99.99,
    category: 'Cycling',
    images: [
      'https://images.unsplash.com/photo-1575435123836-3c5a3048163e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558981420-87aa9dad1c89?w=800&h=800&fit=crop',
    ],
    stock: 16,
  },
  {
    id: '12',
    name: 'Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
    price: 44.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7e406dc1f3b5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1624467073802-0b34c1043d9e?w=800&h=800&fit=crop',
    ],
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
