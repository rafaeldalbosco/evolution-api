import { cpSync } from 'node:fs';

import { defineConfig } from 'tsup';

export default defineConfig({
  // Bundling every file in src as cjs and esm OOMs esbuild in CI. Prod runs node dist/main.
  entry: ['src/main.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  format: ['cjs'],
  onSuccess: async () => {
    cpSync('src/utils/translations', 'dist/translations', { recursive: true });
  },
  loader: {
    '.json': 'file',
    '.yml': 'file',
  },
});
