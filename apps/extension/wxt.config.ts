import { defineConfig } from 'wxt';
import { novelPatterns } from './src/novelPatterns';

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
      // '*://*.wessleyn.me/*',
      'http://localhost/*',
    ].concat(novelPatterns.map(pattern => `*://${pattern.homepage}/*`)),

  },
  alias: {
    '@': '/src',
    '@assets': '/src/assets',
    '@components': '/src/components',
    '@utils': '/src/utils',
    '@constants': '/src/constants',
    '@ctypes': '/src/ctypes',
    '@stores': '/src/stores',
  }
});
