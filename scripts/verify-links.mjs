// Roda depois do `astro build` (faz parte do `npm run build`). Garante que o site gerado só fala com o
// sistema pelas URLs do contrato (src/lib/app-contract.ts) e sempre pela base de KIPERY_APP_URL —
// um link digitado à mão para outro domínio, ou para uma página do sistema fora do contrato, quebra o
// build em vez de virar um 404 em produção.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parseEnv } from 'node:util';
import { APP_PATHS } from '../src/lib/app-contract.ts';

// Domínios externos (fora o sistema) que o site pode linkar. Vazio hoje; inclua aqui de forma
// consciente (ex.: redes sociais) em vez de desligar a verificação.
const OUTROS_DOMINIOS_PERMITIDOS = [];

const DIST = 'dist';

/** Mesma precedência do Vite/Astro: variável do ambiente > .env.production(.local) > .env(.local). */
function resolveAppUrl() {
  if (process.env.KIPERY_APP_URL) return process.env.KIPERY_APP_URL;
  for (const file of ['.env.production.local', '.env.production', '.env.local', '.env']) {
    if (!existsSync(file)) continue;
    const value = parseEnv(readFileSync(file, 'utf8')).KIPERY_APP_URL;
    if (value) return value;
  }
  return null;
}

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(path);
    return e.name.endsWith('.html') ? [path] : [];
  });
}

const appUrl = resolveAppUrl();
if (!appUrl) {
  console.error('verify-links: KIPERY_APP_URL não definida (veja .env.example).');
  process.exit(1);
}
const base = appUrl.replace(/\/+$/, '');
const appOrigin = new URL(base).origin;
const allowedAppUrls = new Set(Object.values(APP_PATHS).map((path) => `${base}${path}`));

const errors = [];
let appLinkCount = 0;

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const where = relative(DIST, file);

  for (const [, raw] of html.matchAll(/\shref="([^"]*)"/g)) {
    const href = raw.replaceAll('&amp;', '&');
    if (href.startsWith('#')) {
      if (href.length > 1 && !ids.has(href.slice(1))) errors.push(`${where}: âncora ${href} sem seção correspondente`);
      continue;
    }
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (href.startsWith('/') && !href.startsWith('//')) continue; // arquivo do próprio site (CSS, ícones...)

    let url;
    try {
      url = new URL(href);
    } catch {
      errors.push(`${where}: link relativo ou inválido "${href}" — use appLinks (sistema) ou um caminho absoluto do site`);
      continue;
    }
    if (url.origin === appOrigin) {
      appLinkCount += 1;
      if (!allowedAppUrls.has(href)) errors.push(`${where}: ${href} não está no contrato de URLs do sistema`);
    } else if (!OUTROS_DOMINIOS_PERMITIDOS.includes(url.origin)) {
      errors.push(`${where}: link para ${url.origin} fora de KIPERY_APP_URL (${appOrigin}) — endereço do sistema fixo no código?`);
    }
  }
}

if (appLinkCount === 0) errors.push('nenhum link para o sistema encontrado — o build usou KIPERY_APP_URL?');

if (errors.length) {
  console.error(`verify-links: ${errors.length} problema(s):\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log(`verify-links: ok — ${appLinkCount} links para ${appOrigin}, todos dentro do contrato.`);
