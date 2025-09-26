// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - generated at build time during `opennextjs-cloudflare build`
import type { ExecutionContext } from '@cloudflare/workers-types';
import worker, {
  BucketCachePurge,
  DOQueueHandler,
  DOShardedTagCache,
} from '../.open-next/worker.js';
import { createOgImageResponse } from '../lib/og-image';

const OG_PATH = '/og';

const enhancedWorker = {
  ...worker,
  async fetch(request: Request, env: unknown, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === OG_PATH && request.method === 'GET') {
      return createOgImageResponse(url);
    }

    return worker.fetch(request, env, ctx);
  },
};

export { StoreConfigDurableObject } from './store-config-do';
export { BucketCachePurge, DOQueueHandler, DOShardedTagCache };
export default enhancedWorker;
export const fetch = enhancedWorker.fetch.bind(enhancedWorker);
