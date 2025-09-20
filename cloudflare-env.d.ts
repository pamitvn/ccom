import type { DurableObjectNamespace } from '@cloudflare/workers-types';

declare global {
  interface CloudflareEnv {
    STORE_CONFIG_DO?: DurableObjectNamespace;
    ADMIN_PASSWORD?: string;
  }
}

export {};
