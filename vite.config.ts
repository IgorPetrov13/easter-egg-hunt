import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), 
      name: 'EasterEggHunt',
      fileName: (format) => `easter-egg-hunt.${format}.js`, 
    },
  },
});