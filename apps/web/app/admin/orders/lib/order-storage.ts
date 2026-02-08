import { Order } from '@/types';
import { mockOrders } from '@/lib/data/mockOrders';

const STORAGE_KEY = 'polysports_orders';

export function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return mockOrders;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse orders from storage', e);
      return mockOrders;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockOrders));
  return mockOrders;
}

export function saveOrders(orders: Order[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function getOrderById(id: string): Order | undefined {
  const orders = getStoredOrders();
  return orders.find(o => o.id === id);
}

export function updateOrderStatus(id: string, status: Order['status']): Order | undefined {
  const orders = getStoredOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return undefined;

  const updatedOrder = { ...orders[index], status } as Order;
  orders[index] = updatedOrder;
  saveOrders(orders);
  return updatedOrder;
}
