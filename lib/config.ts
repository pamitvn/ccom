import { cache } from 'react';
import type { DurableObjectNamespace } from '@cloudflare/workers-types';
import { defaultAppConfig, type AppConfig } from './app-config';

type StoreConfigNamespace = DurableObjectNamespace | undefined;

type CloudflareBindings = CloudflareEnv & {
  STORE_CONFIG_DO?: StoreConfigNamespace;
};

export async function getDurableObjectStub() {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext({ async: true });
    const namespace = (env as CloudflareBindings).STORE_CONFIG_DO;
    if (!namespace) {
      return null;
    }
    return namespace.get(namespace.idFromName('store-config'));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[config] Unable to access Durable Object.', error);
    }
    return null;
  }
}

async function readFromDurableObject(): Promise<AppConfig | null> {
  try {
    const stub = await getDurableObjectStub();
    if (!stub) {
      return null;
    }

    const response = await stub.fetch('https://store-config/config');
    if (!response.ok) {
      return null;
    }

    const config = (await response.json()) as AppConfig;
    return config;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[config] Falling back to default configuration.', error);
    }
    return null;
  }
}

export const getAppConfig = cache(async (): Promise<AppConfig> => {
  const fromDurableObject = await readFromDurableObject();
  return fromDurableObject ?? defaultAppConfig;
});

export const getStoreConfig = cache(async () => {
  const { store } = await getAppConfig();
  return store;
});

export const getProductConfig = cache(async () => {
  const { product } = await getAppConfig();
  return product;
});

export async function saveAppConfig(config: AppConfig) {
  const stub = await getDurableObjectStub();
  if (!stub) {
    throw new Error('Durable Object binding STORE_CONFIG_DO is not available.');
  }

  const response = await stub.fetch('https://store-config/config', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to persist configuration (${response.status}): ${detail}`);
  }
}
