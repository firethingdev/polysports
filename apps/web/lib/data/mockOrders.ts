import { Order } from '@/types';
import { mockProducts } from './mockProducts';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2025-12-15',
    items: [
      {
        product: mockProducts[0]!,
        quantity: 1,
      },
      {
        product: mockProducts[4]!,
        quantity: 2,
      },
    ],
    total: 129.97,
    status: 'delivered',
  },
  {
    id: 'ORD-002',
    date: '2025-12-20',
    items: [
      {
        product: mockProducts[3]!,
        quantity: 1,
      },
      {
        product: mockProducts[10]!,
        quantity: 1,
      },
    ],
    total: 199.98,
    status: 'delivered',
  },
  {
    id: 'ORD-003',
    date: '2026-01-05',
    items: [
      {
        product: mockProducts[1]!,
        quantity: 1,
      },
      {
        product: mockProducts[2]!,
        quantity: 1,
      },
    ],
    total: 199.98,
    status: 'shipped',
  },
  {
    id: 'ORD-004',
    date: '2026-01-10',
    items: [
      {
        product: mockProducts[5]!,
        quantity: 1,
      },
    ],
    total: 199.99,
    status: 'pending',
  },
  {
    id: 'ORD-005',
    date: '2026-01-20',
    items: [
      {
        product: mockProducts[7]!,
        quantity: 2,
      },
      {
        product: mockProducts[11]!,
        quantity: 1,
      },
    ],
    total: 114.97,
    status: 'delivered',
  },
];
