'use server';

import { getDatabase } from '@/lib/db';
import { Order } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getOrders() {
  const db = await getDatabase();
  const orders = await db.orders.find({
    sort: [{ date: 'desc' }]
  }).exec();
  return orders.map(o => o.toJSON()) as Order[];
}

export async function getOrderById(id: string) {
  const db = await getDatabase();
  const order = await db.orders.findOne(id).exec();
  return order ? (order.toJSON() as Order) : null;
}

export async function createOrder(data: Omit<Order, 'id'>) {
  const db = await getDatabase();
  const id = `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const newOrder = { ...data, id };
  await db.orders.insert(newOrder);
  revalidatePath('/admin/orders');
  revalidatePath('/orders');
  return newOrder as Order;
}

export async function updateOrderStatus(id: string, status: Order['status']) {
  const db = await getDatabase();
  const order = await db.orders.findOne(id).exec();
  if (!order) throw new Error('Order not found');

  await order.patch({ status });
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${id}`);
  return order.toJSON() as Order;
}
