import { build } from 'esbuild';
import { copy } from 'fs-extra';

async function runBuild() {
  try {
    // Build the application
    await build({
      entryPoints: ['src/index.js'],
      bundle: true,
      platform: 'node',
      target: 'node18',
      outdir: 'dist',
      format: 'esm',
      banner: {
        js: `
          import { createRequire } from 'module';
          const require = createRequire(import.meta.url);
        `
      }
    });

    // Copy necessary files
    await copy('package.json', 'dist/package.json');

    // Only copy .env if it exists
    try {
      await copy('.env', 'dist/.env');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('No .env file found, skipping...');
      } else {
        throw error;
      }
    }

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

runBuild(); 