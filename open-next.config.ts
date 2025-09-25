import { defineCloudflareConfig } from '@opennextjs/cloudflare/config';

const config = defineCloudflareConfig({});

config.functions = {
  appOg: {
    runtime: 'edge',
    routes: ['app/og/route'],
    patterns: ['/og'],
  },
};

export default config;
