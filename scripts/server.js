import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { resolve, extname, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(project, process.argv.includes('--dist') ? 'dist' : '.');
const port = Number(process.env.PORT || 5173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };

const server = createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    // Only public application files are served, never repository metadata or tools.
    const designPage = /^\/designs\/(index|calm|arcade|editorial)\.html$/.test(pathname);
    if (pathname !== '/' && pathname !== '/index.html' && !/^\/src\/[a-zA-Z0-9_-]+\.(js|css)$/.test(pathname) && !designPage) {
      res.writeHead(404).end('Not found');
      return;
    }
    const file = await realpath(resolve(root, pathname === '/' ? 'index.html' : `.${pathname}`));
    if (!file.startsWith(root + sep)) { res.writeHead(403).end('Forbidden'); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    res.writeHead(error instanceof URIError ? 400 : 404).end('Not found');
  }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '0.0.0.0', () => console.log(`Quizzeit läuft auf Port ${port}${process.argv.includes('--dist') ? ' (Build)' : ''}.`));
