import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const siteDir = path.join(root, 'docs');
const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 5173);

if (!existsSync(path.join(siteDir, 'index.html'))) {
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

function resolveRequest(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${host}:${port}`).pathname);
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(siteDir, safePath === '/' ? 'index.html' : safePath);
  if (!filePath.startsWith(siteDir)) return path.join(siteDir, 'index.html');
  return filePath;
}

const server = createServer(async (request, response) => {
  try {
    let filePath = resolveRequest(request.url ?? '/');
    let fileStat = await stat(filePath).catch(() => null);

    if (fileStat?.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      fileStat = await stat(filePath).catch(() => null);
    }

    if (!fileStat) {
      filePath = path.join(siteDir, 'index.html');
    }

    const ext = path.extname(filePath);
    response.setHeader('Content-Type', contentTypes[ext] ?? 'application/octet-stream');
    response.setHeader('Cache-Control', ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable');
    response.end(await readFile(filePath));
  } catch (error) {
    response.statusCode = 500;
    response.end(`Server error: ${error.message}`);
  }
});

server.listen(port, host, () => {
  console.log(`DLS Labs server running at http://${host}:${port}/`);
  console.log('Serving static GitHub Pages output from docs/');
});
