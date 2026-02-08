'use server';

import { getDatabase } from '@/lib/db';
import { Product } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getProducts() {
  const db = await getDatabase();
  const products = await db.products.find({
    sort: [{ name: 'asc' }]
  }).exec();
  return products.map(p => p.toJSON()) as Product[];
}

export async function getProductById(id: string) {
  const db = await getDatabase();
  const product = await db.products.findOne(id).exec();
  return product ? (product.toJSON() as Product) : null;
}

export async function createProduct(data: Omit<Product, 'id'>) {
  const db = await getDatabase();
  const id = Math.random().toString(36).substring(2, 11);
  const newProduct = { ...data, id };
  await db.products.insert(newProduct);
  revalidatePath('/admin/products');
  return newProduct as Product;
}

export async function updateProduct(id: string, data: Partial<Product>) {
  const db = await getDatabase();
  const product = await db.products.findOne(id).exec();
  if (!product) throw new Error('Product not found');

  await product.patch(data);
  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}/edit`);
  return product.toJSON() as Product;
}

export async function deleteProduct(id: string) {
  const db = await getDatabase();
  const product = await db.products.findOne(id).exec();
  if (product) {
    await product.remove();
    revalidatePath('/admin/products');
  }
}
