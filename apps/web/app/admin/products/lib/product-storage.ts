import { Product } from '@/types';
import { mockProducts } from '@/lib/data/mockProducts';

const STORAGE_KEY = 'polysports_products';

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return mockProducts;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse products from storage', e);
      return mockProducts;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
  return mockProducts;
}

export function saveProducts(products: Product[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProductById(id: string): Product | undefined {
  const products = getStoredProducts();
  return products.find(p => p.id === id);
}

export function addProduct(product: Omit<Product, 'id'>): Product {
  const products = getStoredProducts();
  const newProduct = {
    ...product,
    id: Math.random().toString(36).substr(2, 9),
  } as Product;
  const updated = [newProduct, ...products];
  saveProducts(updated);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return undefined;

  const updatedProduct = { ...products[index], ...updates } as Product;
  products[index] = updatedProduct;
  saveProducts(products);
  return updatedProduct;
}

export function deleteProduct(id: string) {
  const products = getStoredProducts();
  const updated = products.filter(p => p.id !== id);
  saveProducts(updated);
}
