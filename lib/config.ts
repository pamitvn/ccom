import { cache } from 'react';
import type { DurableObjectNamespace } from '@cloudflare/workers-types';
import { defaultAppConfig, type AppConfig } from './app-config';

type StoreConfigNamespace = DurableObjectNamespace | undefined;

type CloudflareBindings = CloudflareEnv & {
  STORE_CONFIG_DO?: StoreConfigNamespace;
};

async function readFromDurableObject(): Promise<AppConfig | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext({ async: true });
    const namespace = (env as CloudflareBindings).STORE_CONFIG_DO;
    if (!namespace) {
      return null;
    }

    const stub = namespace.get(namespace.idFromName('store-config'));
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
