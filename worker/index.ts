// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - generated at build time during `opennextjs-cloudflare build`
import worker, {
  BucketCachePurge,
  DOQueueHandler,
  DOShardedTagCache,
} from '../.open-next/worker.js';

export { StoreConfigDurableObject } from './store-config-do';
export { BucketCachePurge, DOQueueHandler, DOShardedTagCache };

export default worker;
export const fetch = worker.fetch.bind(worker);
