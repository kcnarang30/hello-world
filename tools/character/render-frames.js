const { chromium } = require('/opt/node-tools/node_modules/playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = process.cwd();
const srv = http.createServer((q, r) => { const f = path.join(root, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, {'Content-Type': f.endsWith('.js') ? 'text/javascript' : f.endsWith('.html') ? 'text/html' : 'application/octet-stream'}); r.end(d); }); }).listen(8765);
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
  const [m, out, frames, qs] = process.argv.slice(2);
  const pg = await b.newPage();
  pg.on('pageerror', e => console.log('ERR', e.message)); pg.on('console', c => console.log('LOG', c.text()));
  await pg.goto(`http://localhost:8765/render.html?m=${m}&${qs||''}`);
  await pg.waitForFunction('window.ready', null, { timeout: 60000 });
  console.log(await pg.evaluate('window.clips'));
  const dur = await pg.evaluate('window.dur'); const n = +frames;
  for (let i = 0; i < n; i++) {
    const data = await pg.evaluate(t => window.renderAt(t), dur * i / n);
    fs.writeFileSync(`${out}-${String(i).padStart(2,'0')}.png`, Buffer.from(data.split(',')[1], 'base64'));
  }
  await b.close(); srv.close();
})();
