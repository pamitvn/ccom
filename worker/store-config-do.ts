import type { DurableObjectState } from '@cloudflare/workers-types';
import { defaultAppConfig, type AppConfig } from '../lib/app-config';

const STORAGE_KEY = 'config';
const JSON_HEADERS = {
  'content-type': 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,PUT,OPTIONS',
};

export class StoreConfigDurableObject {
  private readonly init: Promise<void>;

  constructor(private readonly state: DurableObjectState) {
    this.init = this.state.blockConcurrencyWhile(async () => {
      const existing = await this.state.storage.get<AppConfig>(STORAGE_KEY);
      if (!existing) {
        await this.state.storage.put(STORAGE_KEY, defaultAppConfig);
      }
    });
  }

  async fetch(request: Request): Promise<Response> {
    await this.init;
    const { method } = request;

    if (method === 'OPTIONS') {
      return new Response(null, { headers: JSON_HEADERS });
    }

    if (method === 'GET') {
      const config = await this.getConfig();
      return new Response(JSON.stringify(config), { headers: JSON_HEADERS });
    }

    if (method === 'PUT') {
      try {
        const payload = (await request.json()) as AppConfig;
        await this.state.storage.put<AppConfig>(STORAGE_KEY, payload);
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

  private async getConfig(): Promise<AppConfig> {
    const config = await this.state.storage.get<AppConfig>(STORAGE_KEY);
    if (!config) {
      await this.state.storage.put<AppConfig>(STORAGE_KEY, defaultAppConfig);
      return defaultAppConfig;
    }
    return config;
  }
}
