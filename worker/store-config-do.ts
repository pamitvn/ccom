import type { DurableObjectState } from '@cloudflare/workers-types';
import { defaultAppConfig, type AppConfig } from '../lib/app-config';

const CONFIG_KEY = 'config';
const PASSWORD_KEY = 'adminPasswordHash';
const JSON_HEADERS = {
  'content-type': 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,PUT,OPTIONS',
  'access-control-allow-headers': 'content-type',
};

const encoder = new TextEncoder();

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');
}

function hexToUint8(hex: string): Uint8Array {
  const sanitized = hex.trim().toLowerCase();
  if (sanitized.length % 2 !== 0) {
    throw new Error('Invalid hex input');
  }
  const length = sanitized.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0; index < length; index += 1) {
    const byte = sanitized.slice(index * 2, index * 2 + 2);
    bytes[index] = Number.parseInt(byte, 16);
  }
  return bytes;
}

function timingSafeEqualHex(a: string, b: string): boolean {
  try {
    const bytesA = hexToUint8(a);
    const bytesB = hexToUint8(b);
    if (bytesA.length !== bytesB.length) {
      return false;
    }
    let diff = 0;
    for (let index = 0; index < bytesA.length; index += 1) {
      diff |= bytesA[index]! ^ bytesB[index]!;
    }
    return diff === 0;
  } catch {
    return false;
  }
}

async function hashPassword(password: string): Promise<string> {
  const data = encoder.encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(digest);
}

export class StoreConfigDurableObject {
  private readonly init: Promise<void>;
  private passwordHash: string | null = null;

  constructor(private readonly state: DurableObjectState, private readonly env: CloudflareEnv) {
    this.init = this.state.blockConcurrencyWhile(async () => {
      const existingConfig = await this.state.storage.get<AppConfig>(CONFIG_KEY);
      if (!existingConfig) {
        await this.state.storage.put(CONFIG_KEY, defaultAppConfig);
      }

      const storedHash = await this.state.storage.get<string>(PASSWORD_KEY);
      if (storedHash) {
        this.passwordHash = storedHash.toLowerCase();
      } else {
        const fallback = this.env?.ADMIN_PASSWORD ?? 'admin';
        const hashed = await hashPassword(fallback);
        await this.state.storage.put(PASSWORD_KEY, hashed);
        this.passwordHash = hashed;
      }
    });
  }

  async fetch(request: Request): Promise<Response> {
    await this.init;

    const url = new URL(request.url);
    const pathname = url.pathname.replace(/^\/+/, '/');
    const method = request.method.toUpperCase();

    if (method === 'OPTIONS') {
      return new Response(null, { headers: JSON_HEADERS });
    }

    if (pathname === '/config') {
      if (method === 'GET') {
        const config = await this.getConfig();
        return new Response(JSON.stringify(config), { headers: JSON_HEADERS });
      }

      if (method === 'PUT') {
        try {
          const payload = (await request.json()) as AppConfig;
          await this.state.storage.put<AppConfig>(CONFIG_KEY, payload);
          return new Response(JSON.stringify(payload), { headers: JSON_HEADERS });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Invalid configuration payload';
          return new Response(
            JSON.stringify({ message: 'Invalid configuration payload', detail: message }),
            { status: 400, headers: JSON_HEADERS }
          );
        }
      }

      return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
        status: 405,
        headers: JSON_HEADERS,
      });
    }

    if (pathname === '/auth/hash' && method === 'GET') {
      const hash = await this.ensurePasswordHash();
      return new Response(JSON.stringify({ hash }), { headers: JSON_HEADERS });
    }

    if (pathname === '/auth/password' && method === 'PUT') {
      try {
        const { currentHash, newHash } = (await request.json()) as {
          currentHash?: string;
          newHash?: string;
        };

        if (!currentHash || !newHash) {
          return new Response(JSON.stringify({ message: 'Thiếu thông tin mật khẩu.' }), {
            status: 400,
            headers: JSON_HEADERS,
          });
        }

        if (newHash.length !== 64) {
          return new Response(
            JSON.stringify({ message: 'Mật khẩu mới không hợp lệ.' }),
            { status: 400, headers: JSON_HEADERS }
          );
        }

        const stored = await this.ensurePasswordHash();
        if (!timingSafeEqualHex(stored, currentHash)) {
          return new Response(JSON.stringify({ message: 'Mật khẩu hiện tại không đúng.' }), {
            status: 401,
            headers: JSON_HEADERS,
          });
        }

        const normalized = newHash.toLowerCase();
        await this.state.storage.put(PASSWORD_KEY, normalized);
        this.passwordHash = normalized;
        return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Không thể cập nhật mật khẩu.';
        return new Response(JSON.stringify({ message }), { status: 400, headers: JSON_HEADERS });
      }
    }

    return new Response(JSON.stringify({ message: 'Not found' }), {
      status: 404,
      headers: JSON_HEADERS,
    });
  }

  private async ensurePasswordHash(): Promise<string> {
    if (this.passwordHash) {
      return this.passwordHash;
    }
    const stored = await this.state.storage.get<string>(PASSWORD_KEY);
    if (stored) {
      this.passwordHash = stored.toLowerCase();
      return this.passwordHash;
    }
    const fallback = this.env?.ADMIN_PASSWORD ?? 'admin';
    const hashed = await hashPassword(fallback);
    await this.state.storage.put(PASSWORD_KEY, hashed);
    this.passwordHash = hashed;
    return this.passwordHash;
  }

  private async getConfig(): Promise<AppConfig> {
    const config = await this.state.storage.get<AppConfig>(CONFIG_KEY);
    if (!config) {
      await this.state.storage.put<AppConfig>(CONFIG_KEY, defaultAppConfig);
      return defaultAppConfig;
    }
    return config;
  }
}
