import { createRxDatabase, addRxPlugin, RxDatabase, RxCollection } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { mockProducts } from '../data/mockProducts';
import { mockOrders } from '../data/mockOrders';
import * as bcrypt from 'bcryptjs';

// Add plugins
if (process.env.NODE_ENV === 'development') {
  addRxPlugin(RxDBDevModePlugin);
}

// Define schemas
const userSchema = {
  title: 'user schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    email: { type: 'string' },
    password: { type: 'string' },
    role: { type: 'string' }, // 'admin' or 'customer'
  },
  required: ['id', 'email', 'password', 'role'],
};

const productSchema = {
  title: 'product schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    stock: { type: 'number' },
    images: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['id', 'name', 'price', 'category', 'stock'],
};

const orderSchema = {
  title: 'order schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    date: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          product: { type: 'object' },
          quantity: { type: 'number' },
        },
      },
    },
    total: { type: 'number' },
    status: { type: 'string' },
  },
  required: ['id', 'date', 'items', 'total', 'status'],
};

type PolySportsDatabaseCollections = {
  users: RxCollection;
  products: RxCollection;
  orders: RxCollection;
};

type PolySportsDatabase = RxDatabase<PolySportsDatabaseCollections>;

// Singleton pattern for Next.js hot reloading
const globalForDb = globalThis as unknown as {
  db: PolySportsDatabase | undefined;
  dbPromise: Promise<PolySportsDatabase> | undefined;
};

export async function getDatabase(): Promise<PolySportsDatabase> {
  if (globalForDb.db) return globalForDb.db;
  if (globalForDb.dbPromise) return globalForDb.dbPromise;

  globalForDb.dbPromise = (async () => {
    const db = await createRxDatabase<PolySportsDatabaseCollections>({
      name: 'polysports_db',
      storage: wrappedValidateAjvStorage({
        storage: getRxStorageMemory(),
      }),
      ignoreDuplicate: true,
    });

    await db.addCollections({
      users: { schema: userSchema },
      products: { schema: productSchema },
      orders: { schema: orderSchema },
    });

    // Seed data
    await seedDatabase(db);

    globalForDb.db = db;
    return db;
  })();

  return globalForDb.dbPromise;
}

async function seedDatabase(db: PolySportsDatabase) {
  // Check if already seeded (though it's memory, so it's empty every time)
  const productCount = await db.products.find().exec();
  if (productCount.length > 0) return;

  // Add products
  await Promise.all(
    mockProducts.map((p) => db.products.insert(p))
  );

  // Add orders
  await Promise.all(
    mockOrders.map((o) => db.orders.insert(o))
  );

  // Add admin users
  const adminPassword = await bcrypt.hash('admin123', 10);
  await db.users.insert({
    id: 'admin-1',
    email: 'admin@polysports.com',
    password: adminPassword,
    role: 'admin',
  });

  const staffPassword = await bcrypt.hash('staff123', 10);
  await db.users.insert({
    id: 'admin-2',
    email: 'staff@polysports.com',
    password: staffPassword,
    role: 'admin',
  });
}
