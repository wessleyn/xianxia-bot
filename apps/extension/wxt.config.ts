import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  manifest: {
    name: 'Xianxu',
    description: 'An extension to simplify and enhance your webnovel experience.',
    action: {
      default_title: 'Xianxu',
    },
    permissions: [
      'storage',
      'sessions',
      'cookies',
      'tabs',
      'scripting'
    ],
    host_permissions: [
      '*://*.wessleyn.me/*',
      '*://*.google.com/*',
      'http://localhost/*'
    ]
  },
  alias: {
    '@': '/src',
    '@assets': '/src/assets',
    '@components': '/src/components',
  }
});
