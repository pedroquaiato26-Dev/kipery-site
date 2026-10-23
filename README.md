# Kipery — site institucional

Página pública da Kipery (ex.: `kipery.com.br`). É um projeto **separado do sistema** (`app.kipery.com.br`):
repositório, deploy e domínio próprios. Não importa nenhum código do sistema e não chama a API. O único
vínculo são **links** para as URLs públicas do sistema listadas em [`src/lib/app-contract.ts`](src/lib/app-contract.ts).

## Stack e por quê

- **[Astro](https://astro.build) 7, saída estática.** O build gera HTML e CSS puros em `dist/`, sem
  JavaScript no navegador: a página carrega rápido e roda em qualquer hospedagem estática. Os componentes
  (`.astro`) existem só na hora do build, então a equipe edita textos e seções sem lidar com React, rotas
  ou servidor.
- **Tailwind CSS 4.** Mesma identidade visual do sistema, com cores e tokens próprios declarados em
  [`src/styles/global.css`](src/styles/global.css). Nada é importado de lá.
- **Node 24 LTS** (o Astro 7 exige Node ≥ 22.23). O monorepo do sistema usa Node 20; com `nvm` basta
  `nvm use` dentro desta pasta (há um `.nvmrc`).

## Rodar localmente

```bash
nvm use            # Node 24, conforme .nvmrc
npm install
npm run dev        # http://localhost:4321
```

Em `dev`, os links apontam para o sistema rodando localmente (`http://localhost:3000`), conforme o
`.env.development`.

## Build

```bash
KIPERY_APP_URL=https://app.kipery.com.br npm run build    # PowerShell: $env:KIPERY_APP_URL='https://app.kipery.com.br'; npm run build
npm run preview                                         # serve o dist/ para conferência
```

- `KIPERY_APP_URL` é **obrigatória**: sem ela (ou com uma URL inválida) o build falha, para nunca
  publicar links quebrados. Veja [`.env.example`](.env.example).
- Depois do build, [`scripts/verify-links.mjs`](scripts/verify-links.mjs) confere o HTML gerado. O build
  quebra se algum link apontar para o sistema fora do contrato ou para outro domínio não autorizado.
- `npm run check` faz a checagem de tipos (`astro check`).

## Deploy (estático)

Qualquer hospedagem de arquivos estáticos serve: Cloudflare Pages, Netlify, Vercel, S3 + CloudFront ou
um Caddy/Nginx servindo a pasta.

| Configuração          | Valor                                        |
| --------------------- | -------------------------------------------- |
| Versão do Node        | 24                                           |
| Comando de build      | `npm ci && npm run build`                    |
| Pasta publicada       | `dist`                                       |
| Variável de ambiente  | `KIPERY_APP_URL=https://app.kipery.com.br`   |
| Domínio               | `kipery.com.br` (e `www.` redirecionando)    |

Para homologação, basta outro deploy com `KIPERY_APP_URL` apontando para o sistema de homologação.

## Contrato de URLs com o sistema

O site só pode linkar para estes caminhos, sempre sobre a base `KIPERY_APP_URL`. O sistema se compromete a
mantê-los estáveis e tem um teste que quebra se algum deles sumir.

| Caminho                     | Para quê                                               |
| --------------------------- | ------------------------------------------------------ |
| `/login`                    | Entrar (Kipery App, Portal da Revenda e Kipery Admin)  |
| `/login?returnTo=/partner`  | Entrar direto no Portal da Revenda                     |
| `/register`                 | Kipery Direct: cadastro com teste grátis               |
| `/quero-usar`               | Formulário "Quero usar na minha empresa"               |
| `/seja-revenda`             | Formulário "Quero ser Revendedor"                      |
| `/legal`                    | Índice dos documentos legais                           |
| `/legal/termos`             | Termos de Uso                                          |
| `/legal/privacidade`        | Política de Privacidade                                |
| `/legal/dpa`                | Acordo de Tratamento de Dados (DPA)                    |
| `/legal/suboperadores`      | Suboperadores                                          |
| `/legal/revendas`           | Termos do Programa de Revendas                         |

Precisa de uma URL nova ou vai mudar uma existente? Combine com o time do sistema e atualize os dois
lados juntos.

## Onde editar

- Textos (capacidades, FAQ, listas): [`src/content/landing.ts`](src/content/landing.ts)
- Estrutura das seções: [`src/pages/index.astro`](src/pages/index.astro)
- Cores, fontes e componentes visuais: [`src/styles/global.css`](src/styles/global.css)
- Marca e ícones do navegador: `public/`; captura de tela do produto: `src/assets/`

Regra de conteúdo herdada da página antiga: toda capacidade citada existe de verdade no produto. Nada de
métrica, logotipo de cliente, depoimento ou captura de tela inventados.
