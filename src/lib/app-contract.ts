/**
 * Contrato entre o site e o sistema Kipery: os ÚNICOS caminhos do sistema para onde o site pode
 * mandar alguém. O site não importa código do sistema nem chama a API — só leva a pessoa até estas
 * páginas públicas, que o sistema se compromete a manter estáveis.
 *
 * Precisa de um caminho novo ou vai renomear um? Combine antes com o time do sistema. Qualquer link
 * para o sistema fora desta lista quebra o build (scripts/verify-links.mjs).
 *
 * Arquivo sem imports de propósito: o script de verificação o lê direto com o Node, fora do Astro.
 */
export const APP_PATHS = {
  /** Entrar (Kipery App, Portal da Revenda e Kipery Admin usam o mesmo login). */
  login: '/login',
  /** Entrar e cair direto no Portal da Revenda. */
  partnerPortal: '/login?returnTo=/partner',
  /** Kipery Direct: cadastro self-service com teste grátis. */
  register: '/register',
  /** Formulário "Quero usar na minha empresa". */
  queroUsar: '/quero-usar',
  /** Formulário "Quero ser Revendedor". */
  sejaRevenda: '/seja-revenda',
  /** Índice e documentos legais vigentes. */
  legal: '/legal',
  legalTermos: '/legal/termos',
  legalPrivacidade: '/legal/privacidade',
  legalDpa: '/legal/dpa',
  legalSuboperadores: '/legal/suboperadores',
  legalRevendas: '/legal/revendas',
} as const;
