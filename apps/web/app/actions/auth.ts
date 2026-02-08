'use server';

import { getDatabase } from '@/lib/db';
import { cookies } from 'next/headers';
import * as bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-demo-purposes'
);

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  let redirectTo = formData.get('redirectTo') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const db = await getDatabase();
  const user = await db.users.findOne({
    selector: { email }
  }).exec();

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Invalid credentials' };
  }

  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  // Default redirect based on role if no redirectTo provided
  if (!redirectTo || redirectTo === 'undefined') {
    redirectTo = user.role === 'admin' ? '/admin' : '/';
  }

  return { success: true, role: user.role, redirectTo };
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const db = await getDatabase();
  const existingUser = await db.users.findOne({
    selector: { email }
  }).exec();

  if (existingUser) {
    return { error: 'Email already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Math.random().toString(36).substring(2, 11),
    email,
    password: hashedPassword,
    role: 'customer',
  };

  await db.users.insert(newUser);

  return signIn(formData);
}

export async function signOut() {
  (await cookies()).delete('session');
}

export async function getCurrentUser() {
  const token = (await cookies()).get('session')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: string; email: string; role: string };
  } catch (e) {
    return null;
  }
}
