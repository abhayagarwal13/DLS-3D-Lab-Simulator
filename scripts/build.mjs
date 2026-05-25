import { build } from 'esbuild';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'docs');
const publicDir = path.join(root, 'public');

await rm(outDir, { recursive: true, force: true });
await mkdir(path.join(outDir, 'assets'), { recursive: true });

if (existsSync(publicDir)) {
  await cp(publicDir, outDir, { recursive: true });
}

await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  outdir: 'docs/assets',
  entryNames: 'app',
  assetNames: '[dir]/[name]',
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  sourcemap: true,
  minify: true,
  loader: {
    '.svg': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.glb': 'file',
    '.gltf': 'file',
  },
});

await writeFile(
  path.join(outDir, 'index.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Daily Life Science 3D virtual lab simulator" />
    <title>DLS Labs</title>
    <link rel="stylesheet" href="./assets/app.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./assets/app.js"></script>
  </body>
</html>
`,
);

console.log(`Built static GitHub Pages app to ${path.relative(root, outDir)}/`);
