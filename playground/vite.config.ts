import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: __dirname,

  server: {
    fs: {
      allow: [
        path.resolve(__dirname, '../public/images'), // разрешаем доступ к изображениям
        path.resolve(__dirname), // разрешаем доступ к папке playground
      ]
    }
  },

  plugins: [
    {
      name: 'virtual-images-alias',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/images/')) {
            const imageName = req.url.split('/images/')[1];
            req.url = `/@fs/${path.resolve(__dirname, '../public/images', imageName)}`;
          }
          next();
        });
      }
    }
  ]
});