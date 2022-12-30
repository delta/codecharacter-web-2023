import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { defineConfig, Plugin } from 'vite';

export default defineConfig({
  server: {
    open: '/#/dashboard',
    port: 3000,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        replace({
          'typeof CANVAS_RENDERER': "'true'",
          'typeof WEBGL_RENDERER': "'true'",
          'typeof EXPERIMENTAL': "'false'",
          'typeof PLUGIN_CAMERA3D': "'false'",
          'typeof PLUGIN_FBINSTANT': "'false'",
          'typeof FEATURE_SOUND': "'false'",
          preventAssignment: true,
        }) as Plugin,
      ] as Plugin[],
    },
  },
});
