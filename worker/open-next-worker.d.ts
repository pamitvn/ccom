import type { ExecutionContext, ExportedHandler } from '@cloudflare/workers-types';

declare module '../.open-next/worker.js' {
  const handler: ExportedHandler<CloudflareEnv> & { fetch: ExportedHandlerFetchHandler<CloudflareEnv> };
  export default handler;
  export const DOQueueHandler: unknown;
  export const DOShardedTagCache: unknown;
  export const BucketCachePurge: unknown;
}

type ExportedHandlerFetchHandler<TEnv> = (
  request: Request,
  env: TEnv,
  ctx: ExecutionContext
) => Promise<Response> | Response;
