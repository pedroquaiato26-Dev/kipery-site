import {
  BarChart3, Bot, Calendar, FileSignature, FileText, Globe, Headphones, LineChart, ScrollText, Shield,
  Users, Wallet, Workflow, Zap, type IconNode,
} from 'lucide';

/*
 * Textos da página inicial, separados do layout para que a equipe edite conteúdo sem mexer em HTML.
 * Regra herdada da landing do sistema: toda capacidade listada corresponde a um módulo real da
 * plataforma — nada de métrica, logotipo de cliente, depoimento ou captura de tela inventados.
 */

export interface Capability {
  icon: IconNode;
  title: string;
  desc: string;
}

export const capabilities: Capability[] = [
  { icon: Users, title: 'CRM', desc: 'Clientes, funil de vendas e negociações num só lugar.' },
  { icon: Headphones, title: 'Atendimento com IA', desc: 'Assistente virtual que conversa com seus clientes e qualifica leads 24 horas.' },
  { icon: Calendar, title: 'Agenda', desc: 'Calendário completo — mês, semana, dia e lista.' },
  { icon: FileText, title: 'Propostas', desc: 'Propostas comerciais com portal próprio para o cliente aprovar.' },
  { icon: ScrollText, title: 'Contratos', desc: 'Ciclo de vida completo do contrato, do rascunho ao fechamento.' },
  { icon: FileSignature, title: 'Assinatura eletrônica', desc: 'Assine documentos com validade e trilha de evidências.' },
  { icon: FileText, title: 'Documentos', desc: 'Templates de documento reaproveitáveis para toda a operação.' },
  { icon: Wallet, title: 'Financeiro', desc: 'Receitas, despesas, categorias e saldo em tempo real.' },
  { icon: LineChart, title: 'Market Intelligence', desc: 'Leitura de mercado para apoiar suas decisões comerciais.' },
  { icon: Workflow, title: 'Automação', desc: 'Fluxos automatizados conectando os módulos do seu dia a dia.' },
  { icon: Bot, title: 'Inteligência Artificial', desc: 'IA aplicada ao atendimento e às automações da plataforma.' },
  { icon: BarChart3, title: 'Relatórios', desc: 'Visão consolidada com gráficos e métricas do seu negócio.' },
];

export const heroHighlights = ['Isolamento total entre empresas', 'Suporte em PT/EN/ES', 'Assinatura eletrônica inclusa'];

export const trustPoints: { icon: IconNode; text: string }[] = [
  { icon: Shield, text: 'Isolamento total entre empresas' },
  { icon: Zap, text: 'Módulos conectados em tempo real' },
  { icon: Globe, text: 'PT, EN e ES nativos' },
  { icon: FileSignature, text: 'Assinatura eletrônica com trilha de evidências' },
];

/** O que o formulário "Quero usar na minha empresa" pede (o formulário em si fica no sistema). */
export const interestFormFields = [
  'Seu nome e e-mail',
  'Empresa e telefone (opcionais)',
  'Uma mensagem contando sobre sua empresa (opcional)',
];

export const partnerPoints = [
  'Gerencie sua própria carteira de clientes',
  'Defina livremente o preço que você cobra do seu cliente',
  'Catálogo de módulos ao custo de atacado da Kipery',
  'Faturamento consolidado direto com a Kipery',
];

/** O que a candidatura "Quero ser Revendedor" pede (o formulário em si fica no sistema). */
export const partnerFormFields = [
  'CNPJ — os dados públicos da Receita são preenchidos pela consulta',
  'Endereço da sede',
  'Representante legal, que assina o Acordo de Parceria',
  'Contatos comercial e financeiro',
];

export const faqs = [
  { q: 'Como funciona o modelo comercial?', a: 'Você usa a plataforma Kipery no seu dia a dia. Dependendo de como sua empresa chegou até aqui, quem cuida da sua relação comercial é uma Revenda parceira ou a própria Kipery — o produto que você usa é exatamente o mesmo.' },
  { q: 'O que está incluso?', a: 'CRM, atendimento com IA, agenda, propostas, contratos com assinatura eletrônica, documentos, financeiro, market intelligence, automação e relatórios — tudo integrado.' },
  { q: 'Como funciona para quem quer usar na própria empresa?', a: 'Preencha o formulário "Quero usar na minha empresa" com seus dados de contato. Nossa equipe (ou uma Revenda parceira da sua região) entra em contato para dar sequência.' },
  { q: 'Como funciona para quem quer ser Revendedor?', a: 'Preencha o formulário "Quero ser Revendedor" com os dados da sua empresa. A candidatura é analisada pela Kipery antes de qualquer acesso ser liberado.' },
  { q: 'É seguro?', a: 'Multi-tenant com isolamento total por empresa e autenticação própria para cada usuário.' },
];
