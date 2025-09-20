import { cookies } from 'next/headers';
import { createHash, timingSafeEqual } from 'node:crypto';
import { getDurableObjectStub } from './config';

const ADMIN_COOKIE_NAME = 'admin_session';
function getPasswordFromEnv(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.trim().length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'ADMIN_PASSWORD is not set. Using fallback password "admin" for local development. Set ADMIN_PASSWORD in your environment before deploying.'
      );
      return 'admin';
    }
    throw new Error('ADMIN_PASSWORD environment variable is not set.');
  }
  return password;
}

function hashSecret(secret: string): Buffer {
  return createHash('sha256').update(secret).digest();
}

function encodeSecret(secret: string): string {
  return hashSecret(secret).toString('hex');
}

function bufferFromHex(hex: string): Buffer {
  return Buffer.from(hex, 'hex');
}

function safeCompareHex(a: string, b: string): boolean {
  const bufferA = bufferFromHex(a);
  const bufferB = bufferFromHex(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

async function fetchPasswordHashFromDurableObject(): Promise<string | null> {
  try {
    const stub = await getDurableObjectStub();
    if (!stub) {
      return null;
    }

    const response = await stub.fetch('https://store-config/auth/hash');
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { hash?: string };
    return typeof payload.hash === 'string' ? payload.hash : null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[auth] Unable to retrieve admin password hash from Durable Object.', error);
    }
    return null;
  }
}

async function getAdminPasswordHash(): Promise<string> {
  const fromDurableObject = await fetchPasswordHashFromDurableObject();
  if (fromDurableObject) {
    return fromDurableObject.toLowerCase();
  }
  return encodeSecret(getPasswordFromEnv());
}

export async function verifyPassword(password: string): Promise<boolean> {
  const storedHash = await getAdminPasswordHash();
  const attemptHash = encodeSecret(password);
  return safeCompareHex(storedHash, attemptHash);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME);
  if (!cookie?.value) {
    return false;
  }

  const storedHash = await getAdminPasswordHash();
  return safeCompareHex(storedHash, cookie.value.toLowerCase());
}

export async function createAdminSession(): Promise<void> {
  const storedHash = await getAdminPasswordHash();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, storedHash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 6, // 6 hours
  });
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function changeAdminPassword(currentPassword: string, newPassword: string): Promise<void> {
  const stub = await getDurableObjectStub();
  if (!stub) {
    throw new Error('Durable Object binding STORE_CONFIG_DO is not available.');
  }

  const payload = {
    currentHash: encodeSecret(currentPassword),
    newHash: encodeSecret(newPassword),
  };

  const response = await stub.fetch('https://store-config/auth/password', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.status === 401) {
    throw new Error('Mật khẩu hiện tại không chính xác.');
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Không thể cập nhật mật khẩu (${response.status}). ${detail || ''}`.trim());
  }
}
