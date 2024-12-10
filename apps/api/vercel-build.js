import { build } from 'esbuild';
import { copy, ensureDir, pathExists } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runBuild() {
  try {
    const distPath = path.join(__dirname, '.vercel/output/functions/api');
    
    // Ensure dist directory exists
    await ensureDir(distPath);

    // Build the application
    await build({
      entryPoints: [path.join(__dirname, 'src/index.js')],
      bundle: true,
      platform: 'node',
      target: 'node18',
      outdir: distPath,
      format: 'esm',
      banner: {
        js: `
          import { createRequire } from 'module';
          const require = createRequire(import.meta.url);
        `
      }
    });

    // Copy necessary files
    await copy(
      path.join(__dirname, 'package.json'), 
      path.join(distPath, 'package.json')
    );

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

runBuild(); 