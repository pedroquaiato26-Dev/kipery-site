// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Site 100% estático: o build gera HTML/CSS em dist/, servível por qualquer CDN ou servidor de arquivos.
  output: 'static',
  env: {
    schema: {
      // Base dos links para o sistema (ex.: https://app.kipery.com.br). Sem `default` de propósito: um
      // build de produção sem a variável falha em vez de publicar links para lugar nenhum. Em `npm run dev`
      // ela vem do .env.development.
      KIPERY_APP_URL: envField.string({ context: 'server', access: 'public', url: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
