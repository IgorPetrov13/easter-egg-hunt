import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'easter-egg-hunt',
      fileName: 'easter-egg-hunt',
      formats: ['es', 'cjs']
    }
  }
});