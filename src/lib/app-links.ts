import { KIPERY_APP_URL } from 'astro:env/server';
import { APP_PATHS } from './app-contract';

// A base vem do build (KIPERY_APP_URL), nunca fixa no código: o mesmo site serve homologação e
// produção, e trocar o domínio do sistema não exige mexer em nenhuma página.
const base = KIPERY_APP_URL.replace(/\/+$/, '');

type AppLinkName = keyof typeof APP_PATHS;

/** URLs absolutas do sistema, já com a base do ambiente. Use sempre estas — nunca monte link à mão. */
export const appLinks = Object.fromEntries(
  Object.entries(APP_PATHS).map(([name, path]) => [name, `${base}${path}`]),
) as Record<AppLinkName, string>;

/** Rodapé: os mesmos quatro documentos que as telas do sistema exibem. */
export const legalLinks = [
  { label: 'Termos de Uso', href: appLinks.legalTermos },
  { label: 'Privacidade', href: appLinks.legalPrivacidade },
  { label: 'Tratamento de Dados (DPA)', href: appLinks.legalDpa },
  { label: 'Suboperadores', href: appLinks.legalSuboperadores },
];

/** Host mostrado na "barra de endereço" ilustrativa do hero (ex.: app.kipery.com.br). */
export const appHost = new URL(base).host;
