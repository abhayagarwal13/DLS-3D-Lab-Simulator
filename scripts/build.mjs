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

const result = await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  outdir: 'docs/assets',
  entryNames: 'app-[hash]',
  chunkNames: 'chunks/[name]-[hash]',
  assetNames: '[dir]/[name]-[hash]',
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  sourcemap: true,
  minify: true,
  metafile: true,
  loader: {
    '.svg': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.glb': 'file',
    '.gltf': 'file',
  },
});

const outputs = Object.entries(result.metafile.outputs);
const jsEntry = outputs.find(([, meta]) => meta.entryPoint === 'src/main.jsx' && meta.bytes > 0)?.[0];
if (!jsEntry) throw new Error('Could not find generated app JavaScript entry');

const cssEntry = result.metafile.outputs[jsEntry]?.cssBundle;
const jsHref = './' + path.relative(outDir, path.join(root, jsEntry)).replaceAll(path.sep, '/');
const cssHref = cssEntry ? './' + path.relative(outDir, path.join(root, cssEntry)).replaceAll(path.sep, '/') : null;

const html = [
  '<!doctype html>',
  '<html lang="en">',
  '  <head>',
  '    <meta charset="UTF-8" />',
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  '    <meta name="description" content="Daily Life Science 3D virtual lab simulator" />',
  '    <title>DLS Labs</title>',
  cssHref ? `    <link rel="stylesheet" href="${cssHref}" />` : '',
  '  </head>',
  '  <body>',
  '    <div id="root"></div>',
  `    <script type="module" src="${jsHref}"></script>`,
  '  </body>',
  '</html>',
  '',
].join('\n');

await writeFile(path.join(outDir, 'index.html'), html);

console.log(`Built static GitHub Pages app to ${path.relative(root, outDir)}/`);
console.log(`Cache-busted assets: ${jsHref}${cssHref ? `, ${cssHref}` : ''}`);