import { defineConfig } from 'vite';
import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'EasterEggHunt',
      fileName: (format) => `easter-egg-hunt.${format}.js`,
    },
  },
  plugins: [cssInjectedByJsPlugin()],
});