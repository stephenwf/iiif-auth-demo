const esbuild = require('esbuild');

const mode = process.env.NODE_ENV?.toLowerCase() ?? 'development';

console.log(`[Worker] Running esbuild in ${mode} mode`);

esbuild.build({
  entryPoints: ['./worker/index.ts'],
  bundle: true,
  minify: false,
  format: 'esm',
  define: {
    'process.env.NODE_ENV': `"${mode}"`,
  },
  outfile: './build/worker.js',
});
