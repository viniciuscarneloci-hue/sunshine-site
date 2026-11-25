/* Sistema Sunshine — protótipo navegável dos painéis internos (administrador e corretor).
   Tudo é simulado: os dados vivem neste navegador (localStorage). Nada é enviado para servidor. */
'use strict';

// ---------------------------------------------------------------- dados fixos
const EMPRESA = { nome: 'Sunshine Imobiliária', creci: '29988-J', wa: '5511996766021' };

// Imóveis do site (copiados de ../app.js)
const BASE = [
  { id:'1262', neg:'venda', tipo:'Apartamento', titulo:'Alto padrão com piscina no Belenzinho', bairro:'Belenzinho', zona:'Zona Leste', preco:2100000, m2:245, dorms:4, suites:2, vagas:2, fotos:['1262-3','1262-2','1262-1'], lat:-23.5421, lng:-46.5962 },
  { id:'1342', neg:'venda', tipo:'Apartamento', titulo:'Club Tuiuti, andar alto e face norte', bairro:'Tatuapé', zona:'Zona Leste', preco:1312000, m2:93, dorms:3, suites:1, vagas:2, fotos:['1342-1','1342-2','1342-3'], lat:-23.5409, lng:-46.5772 },
  { id:'1338', neg:'venda', tipo:'Apartamento', titulo:'Quatro dormitórios e três suítes no Tatuapé', bairro:'Tatuapé', zona:'Zona Leste', preco:1795000, m2:105, dorms:4, suites:3, vagas:2, fotos:['1338-1','1338-2','1338-3'], lat:-23.5456, lng:-46.5699 },
  { id:'1343', neg:'venda', tipo:'Apartamento', titulo:'Condomínio Búzios, na Vila Mariana', bairro:'Vila Clementino', zona:'Zona Sul', preco:795000, m2:75, dorms:2, suites:1, vagas:1, fotos:['1343-2','1343-3','1343-1'], lat:-23.6031, lng:-46.6436 },
  { id:'1332', neg:'venda', tipo:'Apartamento', titulo:'Três dormitórios com academia no Tatuapé', bairro:'Tatuapé', zona:'Zona Leste', preco:780000, m2:83, dorms:3, suites:1, vagas:2, fotos:['1332-1','1332-2','1332-3'], lat:-23.5484, lng:-46.5801 },
  { id:'1333', neg:'venda', tipo:'Apartamento', titulo:'Dois dormitórios bem localizado', bairro:'Vila Clementino', zona:'Zona Sul', preco:649000, m2:68, dorms:2, suites:0, vagas:2, fotos:['1333-2','1333-3','1333-1'], lat:-23.5963, lng:-46.6418 },
  { id:'1336', neg:'venda', tipo:'Apartamento', titulo:'Encantador e reformado na Vila Clementino', bairro:'Vila Clementino', zona:'Zona Sul', preco:580000, m2:52, dorms:2, suites:0, vagas:1, fotos:['1336-1','1336-2','1336-3'], lat:-23.5994, lng:-46.6476 },
  { id:'1340', neg:'venda', tipo:'Apartamento', titulo:'Reformado, a passos da Avenida Paulista', bairro:'Bela Vista', zona:'Centro', preco:350000, m2:41, dorms:1, suites:0, vagas:0, fotos:['1340-2','1340-3','1340-1'], lat:-23.5602, lng:-46.6501 },
  { id:'1337', neg:'aluguel', tipo:'Studio', titulo:'Studio moderno para alugar no Tatuapé', bairro:'Tatuapé', zona:'Zona Leste', preco:3500, m2:24, dorms:1, suites:0, vagas:0, fotos:['1337-1','1337-2','1337-3'], lat:-23.5391, lng:-46.5744 },
];
const SITE_IDS = new Set(BASE.map(i => i.id));
const META = {
  '1262': { st:'disponivel', cor:'nelson',  views:1240, leads:14 },
  '1342': { st:'vendido',    cor:'rafael',  views:655,  leads:11 },
  '1338': { st:'disponivel', cor:'juliana', views:812,  leads:12 },
  '1343': { st:'negociacao', cor:'carla',   views:980,  leads:17 },
  '1332': { st:'vendido',    cor:'carla',   views:540,  leads:9 },
  '1333': { st:'disponivel', cor:'carla',   views:610,  leads:10 },
  '1336': { st:'negociacao', cor:'rafael',  views:470,  leads:8 },
  '1340': { st:'disponivel', cor:'juliana', views:720,  leads:9 },
  '1337': { st:'disponivel', cor:'carla',   views:390,  leads:6 },
};
const BAIRROS = {
  'Tatuapé':[-23.5405,-46.5760,'Zona Leste'], 'Belenzinho':[-23.5430,-46.5960,'Zona Leste'], 'Mooca':[-23.5580,-46.5990,'Zona Leste'],
  'Vila Clementino':[-23.5990,-46.6440,'Zona Sul'], 'Vila Mariana':[-23.5890,-46.6350,'Zona Sul'], 'Moema':[-23.6010,-46.6640,'Zona Sul'], 'Saúde':[-23.6180,-46.6390,'Zona Sul'],
  'Bela Vista':[-23.5600,-46.6500,'Centro'], 'Centro':[-23.5480,-46.6360,'Centro'], 'Pinheiros':[-23.5660,-46.6910,'Zona Oeste'],
};
const ST = { disponivel:'Disponível', negociacao:'Em negociação', vendido:'Vendido', pausado:'Pausado' };
const ST_COR = { disponivel:'#12946B', negociacao:'#E0A100', vendido:'#182639', pausado:'#8A97A8' };
const ETAPAS = [
  { k:'novo', l:'Novo', c:'#2D7FD3' }, { k:'atendimento', l:'Em atendimento', c:'#E0A100' }, { k:'visita', l:'Visita', c:'#8B5CF6' },
  { k:'proposta', l:'Proposta', c:'#D9622B' }, { k:'fechado', l:'Fechado', c:'#12946B' },
];
const USERS = { admin:{ id:'nelson', nome:'Nelson', papel:'Administrador' }, corretor:{ id:'carla', nome:'Carla', papel:'Corretora' } };
const CFG0 = { comissao:6, imob:50, imposto:6, taxas:5, exemplo:850000 };
const KEY = 'sunshine-sistema-v1';

// ---------------------------------------------------------------- estado inicial
function seed() {
  const now = Date.now();
  const ago = (d, h = 0, m = 0) => now - d * 864e5 - h * 36e5 - m * 6e4;
  const d0 = new Date(); d0.setHours(0, 0, 0, 0);
  const at = (d, h, m = 0) => d0.getTime() + d * 864e5 + h * 36e5 + m * 6e4;
  const tel = n => '55119000001' + String(n).padStart(2, '0');
  const c = (id, nome, im, origem, cor, etapa, t, msg) => ({ id, nome, tel: tel(id), imovel: im, origem, cor, etapa, t, msg });
  const v = (id, ref, titulo, bairro, cor, valor, comprador, t, status, pago) => ({ id, ref, titulo, bairro, cor, valor, comprador, t, status, cfg: { ...CFG0 }, pago, conf: status === 'confirmada' ? t + 36e5 * 5 : null });
  const liq = valor => calc(valor, CFG0).liq;
  return {
    v: 1, logado: false, perfil: 'admin', nextRef: 1344, nextId: 100,
    imoveis: BASE.map(i => ({ ...i, ...META[i.id] })),
    corretores: [
      { id:'carla', nome:'Carla', papel:'Corretora', tel:'(11) 90000-0201', desde:2019, contatos:48, resp:'6 min', ativo:true, av:'' },
      { id:'rafael', nome:'Rafael', papel:'Corretor', tel:'(11) 90000-0202', desde:2021, contatos:37, resp:'14 min', ativo:true, av:'c2' },
      { id:'juliana', nome:'Juliana', papel:'Corretora', tel:'(11) 90000-0203', desde:2022, contatos:29, resp:'22 min', ativo:true, av:'c3' },
      { id:'nelson', nome:'Nelson', papel:'Diretor e corretor', tel:'(11) 99676-6021', desde:2008, contatos:12, resp:'41 min', ativo:true, av:'c4' },
    ],
    contatos: [
      c(1, 'Mariana P.', '1333', 'Site', 'carla', 'novo', ago(0, 0, 12), 'Olá! Gostaria de agendar uma visita no apartamento da Vila Clementino. Aceita financiamento?'),
      c(2, 'Pedro L.', '1337', 'WhatsApp', 'carla', 'novo', ago(0, 0, 40), 'O studio ainda está disponível para alugar a partir de dezembro?'),
      c(3, 'Ana R.', '1343', 'Portal', 'carla', 'novo', ago(0, 2), 'Vi o anúncio do Búzios. Qual o valor do condomínio e do IPTU?'),
      c(4, 'João S.', '1343', 'Site', 'carla', 'visita', ago(2, 3), 'Quero conhecer o apartamento ainda esta semana, de preferência à tarde.'),
      c(5, 'Thiago N.', '1333', 'WhatsApp', 'carla', 'atendimento', ago(1, 4), 'Vocês aceitam permuta por um apartamento menor na mesma região?'),
      c(6, 'Beatriz M.', '1262', 'Site', 'nelson', 'atendimento', ago(0, 5), 'Tenho interesse no apartamento com piscina. Posso visitar no sábado?'),
      c(7, 'Camila D.', '1262', 'Portal', 'nelson', 'novo', ago(0, 3), 'Qual a metragem da área de lazer? Tem vaga para visitante?'),
      c(8, 'Lucas T.', '1338', 'WhatsApp', 'juliana', 'atendimento', ago(1, 2), 'Estou vendendo meu imóvel e queria usar como parte do pagamento.'),
      c(9, 'Patrícia L.', '1338', 'Site', 'juliana', 'novo', ago(0, 0, 25), 'Esse apartamento tem varanda gourmet?'),
      c(10, 'Fernanda C.', '1340', 'Site', 'juliana', 'visita', ago(2, 6), 'Busco algo para investir perto da Paulista. Podemos ver amanhã?'),
      c(11, 'Gustavo A.', '1336', 'Portal', 'rafael', 'proposta', ago(3, 1), 'Fiz uma proposta de R$ 560 mil, com 40% de entrada.'),
      c(12, 'Renata F.', '1342', 'Site', 'rafael', 'fechado', ago(12, 2), 'Fechado! Obrigada pelo atendimento.'),
      c(13, 'Marcos V.', '1336', 'Site', 'rafael', 'visita', ago(4, 1), 'Gostei das fotos. Posso levar minha esposa na visita?'),
    ],
    vendas: [
      { ...v(1, '1318', 'Apartamento na Saúde', 'Saúde', 'carla', 850000, 'R. Okada', ago(17, 2), 'confirmada', 0), pago: liq(850000) - 12400, prev: 'previsto para 10/12' },
      v(2, '1342', 'Club Tuiuti, andar alto e face norte', 'Tatuapé', 'rafael', 1300000, 'M. Andrade', ago(11, 4), 'confirmada', liq(1300000)),
      v(3, '1329', 'Apartamento na Bela Vista', 'Bela Vista', 'juliana', 450000, 'S. Freitas', ago(6, 3), 'confirmada', liq(450000)),
      v(4, '1336', 'Encantador e reformado na Vila Clementino', 'Vila Clementino', 'rafael', 560000, 'Gustavo A.', ago(1, 2), 'pendente', 0),
      v(5, '1332', 'Três dormitórios com academia no Tatuapé', 'Tatuapé', 'carla', 780000, 'L. Prado', ago(64, 3), 'confirmada', liq(780000)),
      v(6, '1309', 'Apartamento no Tatuapé', 'Tatuapé', 'carla', 920000, 'F. Moura', ago(118, 5), 'confirmada', liq(920000)),
      v(7, '1301', 'Apartamento na Vila Mariana', 'Vila Mariana', 'carla', 690000, 'D. Ribeiro', ago(186, 4), 'confirmada', liq(690000)),
    ],
    agenda: [
      { id:1, tipo:'Visita', imovel:'1343', contato:'João S.', tel: tel(4), t: at(0, 15), st:'pendente', end:'Rua Dr. Altino Arantes · Vila Clementino' },
      { id:2, tipo:'Visita', imovel:'1333', contato:'Mariana P.', tel: tel(1), t: at(1, 10), st:'pendente', end:'Vila Clementino' },
      { id:3, tipo:'Visita', imovel:'1337', contato:'Pedro L.', tel: tel(2), t: at(1, 16, 30), st:'confirmada', end:'Tatuapé' },
      { id:4, tipo:'Visita', imovel:'1333', contato:'Thiago N.', tel: tel(5), t: at(2, 11), st:'confirmada', end:'Vila Clementino' },
      { id:5, tipo:'Visita', imovel:'1343', contato:'Ana R.', tel: tel(3), t: at(4, 14), st:'pendente', end:'Rua Dr. Altino Arantes · Vila Clementino' },
    ],
    cfg: { ...CFG0 },
    audit: [
      { t: at(0, 3), quem:'Sistema', acao:'Backup diário concluído', alvo:'', det:'Cópia completa dos dados · 4,2 MB · guardada por 30 dias', k:'sys' },
      { t: ago(0, 2, 5), quem:'Carla', acao:'Moveu o contato', alvo:'João S.', det:'Em atendimento → Visita', k:'contato' },
      { t: ago(1, 2), quem:'Rafael', acao:'Registrou a venda', alvo:'Ref. 1336', det:'R$ 560.000 · comprador Gustavo A. · aguardando confirmação', k:'venda' },
      { t: ago(3, 6), quem:'Nelson', acao:'Alterou as configurações', alvo:'Taxas', det:'Taxa por transferência: R$ 8 → R$ 5', k:'cfg' },
      { t: ago(6, 1), quem:'Nelson', acao:'Confirmou a venda', alvo:'Ref. 1329', det:'R$ 450.000 · corretora Juliana', k:'venda' },
      { t: ago(6, 3), quem:'Juliana', acao:'Registrou a venda', alvo:'Ref. 1329', det:'R$ 450.000 · comprador S. Freitas', k:'venda' },
      { t: ago(9, 5), quem:'Nelson', acao:'Pausou o anúncio', alvo:'Ref. 1325', det:'Proprietário pediu para tirar do site por 15 dias', k:'imovel' },
      { t: ago(11, 0), quem:'Nelson', acao:'Confirmou a venda', alvo:'Ref. 1342', det:'R$ 1.300.000 · corretor Rafael', k:'venda' },
      { t: ago(14, 2), quem:'Carla', acao:'Publicou o imóvel', alvo:'Ref. 1343', det:'Condomínio Búzios, na Vila Mariana · R$ 795.000', k:'imovel' },
      { t: ago(16, 22), quem:'Nelson', acao:'Confirmou a venda', alvo:'Ref. 1318', det:'R$ 850.000 · corretora Carla', k:'venda' },
      { t: ago(20, 4), quem:'Nelson', acao:'Redefiniu a senha', alvo:'Juliana', det:'Link de nova senha enviado por e-mail', k:'acesso' },
    ],
  };
}
let S = load();
function load() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return s; } catch (e) { /* ignora */ } return seed(); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* quota cheia: segue só em memória */ } }

// estado de tela (não salvo)
const UI = { fi: { q:'', st:'', cor:'' }, fc: '', fa: { q:'', k:'' }, fm: '', P: null };

// ---------------------------------------------------------------- utilidades
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const brl = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const mi = n => n >= 1e6 ? 'R$ ' + (n / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mi' : 'R$ ' + Math.round(n / 1000) + ' mil';
const pct = n => (+n).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '%';
const num = n => (+n).toLocaleString('pt-BR');
const src = f => /^(data:|blob:)/.test(f) ? f : `../img/imoveis/${f}.jpg`;
const user = () => USERS[S.perfil];
const isAdmin = () => S.perfil === 'admin';
const byId = id => S.imoveis.find(i => i.id === id);
const cor = id => S.corretores.find(c => c.id === id) || { nome: id, av: '' };
const av = (id, cls = '') => { const c = cor(id); return `<span class="av ${c.av || ''} ${cls}">${esc((c.nome || '?')[0])}</span>`; };
const first = n => String(n).split(' ')[0];
const precoTxt = i => i.neg === 'aluguel' ? `${brl(i.preco)}<small style="font-weight:600;color:var(--mut)"> /mês</small>` : brl(i.preco);
const D30 = 30 * 864e5, D365 = 365 * 864e5;

function calc(v, c) {
  const com = v * c.comissao / 100, imob = com * c.imob / 100, corr = com - imob, imp = corr * c.imposto / 100, liq = corr - imp - c.taxas;
  return { v, com, imob, corr, imp, taxas: +c.taxas, liq };
}
function quando(t) {
  const d = new Date(t), hj = new Date(); hj.setHours(0, 0, 0, 0);
  const hm = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  if (t >= hj.getTime()) return 'hoje, ' + hm;
  if (t >= hj.getTime() - 864e5) return 'ontem, ' + hm;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ', ' + hm;
}
function ha(t) {
  const m = Math.max(1, Math.round((Date.now() - t) / 6e4));
  if (m < 60) return `há ${m} min`;
  const h = Math.round(m / 60); if (h < 24) return `há ${h} h`;
  const d = Math.round(h / 24); return d === 1 ? 'ontem' : `há ${d} dias`;
}
function diaLabel(t) {
  const hj = new Date(); hj.setHours(0, 0, 0, 0);
  const d = new Date(t); d.setHours(0, 0, 0, 0);
  const diff = Math.round((d - hj) / 864e5);
  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Amanhã';
  const w = d.toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0];
  return w[0].toUpperCase() + w.slice(1) + ', ' + d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}
const hora = t => new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
const hojeLongo = () => { const s = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }); return s[0].toUpperCase() + s.slice(1); };
const saudacao = () => { const h = new Date().getHours(); return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'; };
const waLink = (tel, txt) => `https://wa.me/${tel}?text=${encodeURIComponent(txt)}`;

function log(acao, alvo, det, k) {
  S.audit.unshift({ t: Date.now(), quem: user().nome, acao, alvo, det, k, novo: true });
  save();
}

// ---------------------------------------------------------------- ícones
const P = {
  home:'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  build:'M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3',
  users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  inbox:'M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
  deal:'M9 13l2 2 4-4M6 3h12a1 1 0 0 1 1 1v17l-3-2-2 2-2-2-2 2-2-2-3 2V4a1 1 0 0 1 1-1z',
  cog:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  hist:'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2',
  shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  plus:'M12 5v14M5 12h14',
  cal:'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  wallet:'M3 7a2 2 0 0 1 2-2h12v4M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2zM16 14.5h.01',
  out:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  pin:'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  eye:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  msg:'M21 12a8 8 0 0 1-11.8 7L3 21l2-6A8 8 0 1 1 21 12z',
  check:'M5 12l5 5L20 7', x:'M18 6 6 18M6 6l12 12', cl:'M15 18l-6-6 6-6', cr:'M9 18l6-6-6-6', up:'M7 17 17 7M9 7h8v8',
  cam:'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  mic:'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3',
  spark:'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
  pause:'M8 5v14M16 5v14', play:'M7 4l13 8-13 8z',
  img:'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
  star:'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z',
  menu:'M4 6h16M4 12h16M4 18h16', grid:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  bell:'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  edit:'M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z',
  clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  phone:'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  lock:'M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM8 11V7a4 4 0 0 1 8 0v4',
  db:'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  key:'M15.5 7.5 19 4M21 2l-2 2 3 3-3.5 3.5-3-3M11.4 11.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8z',
  globe:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  ban:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM4.9 4.9l14.2 14.2',
  refresh:'M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5',
  file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
  user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  ext:'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3',
  info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  bed:'M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M6 10V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3',
  area:'M3 3h18v18H3zM3 9h18M9 21V9', car:'M5 17h14M3 13l2-6h14l2 6v5H3zM7 17v2M17 17v2',
};
const ic = (n, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;
const WA = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.9 17.9L.2 24l6.3-1.6A11.8 11.8 0 0 0 12 23.8 11.8 11.8 0 0 0 20.4 3.6z"/></svg>`;

// ---------------------------------------------------------------- toasts e modais
function toast(msg, sub = '', warn = false) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="ic ${warn ? 'w' : ''}">${ic(warn ? 'info' : 'check')}</span><div>${msg}${sub ? `<small>${sub}</small>` : ''}</div>`;
  $('#toasts').appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, 3600);
}
function modal({ title, sub = '', body = '', foot = '', wide = false }, bind) {
  closeModal();
  const ov = document.createElement('div');
  ov.className = 'ov';
  ov.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}" ${wide ? 'style="max-width:640px"' : ''}>
    <div class="mh"><div><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ''}</div><button class="x" data-close aria-label="Fechar">${ic('x')}</button></div>
    <div class="mb">${body}</div>${foot ? `<div class="mf">${foot}</div>` : ''}</div>`;
  $('#layer').appendChild(ov);
  ov.addEventListener('click', e => { if (e.target === ov || e.target.closest('[data-close]')) closeModal(); });
  if (bind) bind(ov);
  const f = $('input,select,textarea', ov); if (f && matchMedia('(min-width:901px)').matches) setTimeout(() => f.focus(), 50);
  return ov;
}
function closeModal() { $('#layer').innerHTML = ''; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ---------------------------------------------------------------- navegação
const NAV = {
  admin: [
    { p:'admin', l:'Visão geral', i:'home', b:'Início' },
    { p:'admin/imoveis', l:'Imóveis', i:'build', b:'Imóveis' },
    { p:'admin/contatos', l:'Contatos', i:'inbox', b:'Contatos', cnt: () => S.contatos.filter(c => c.etapa === 'novo').length },
    { p:'admin/vendas', l:'Vendas', i:'deal', b:'Vendas', cnt: () => S.vendas.filter(v => v.status === 'pendente').length },
    { p:'admin/corretores', l:'Corretores', i:'users' },
    { sec:'Gestão' },
    { p:'admin/config', l:'Configurações', i:'cog' },
    { p:'admin/auditoria', l:'Registro de auditoria', i:'hist' },
    { p:'acessos', l:'Acessos e segurança', i:'shield' },
  ],
  corretor: [
    { p:'corretor', l:'Meu painel', i:'home', b:'Início' },
    { p:'publicar', l:'Publicar imóvel', i:'plus' },
    { p:'corretor/imoveis', l:'Meus imóveis', i:'build', b:'Imóveis' },
    { p:'corretor/contatos', l:'Meus contatos', i:'inbox', cnt: () => S.contatos.filter(c => c.etapa === 'novo' && c.cor === 'carla').length },
    { p:'corretor/agenda', l:'Agenda', i:'cal', b:'Agenda' },
    { p:'corretor/comissoes', l:'Minhas comissões', i:'wallet' },
    { sec:'Conta' },
    { p:'acessos', l:'Acessos e segurança', i:'shield' },
  ],
};
const ROUTES = {
  'admin':            { role:'admin', t:'Visão geral', r: vDash },
  'admin/imoveis':    { role:'admin', t:'Imóveis', r: vImoveis },
  'admin/corretores': { role:'admin', t:'Corretores', r: vCorretores },
  'admin/contatos':   { role:'admin', t:'Contatos', r: vContatos },
  'admin/vendas':     { role:'admin', t:'Vendas', r: vVendas },
  'admin/config':     { role:'admin', t:'Configurações', r: vConfig, after: bindConfig },
  'admin/auditoria':  { role:'admin', t:'Registro de auditoria', r: vAuditoria },
  'acessos':          { role:'*', t:'Acessos e segurança', r: vAcessos },
  'corretor':         { role:'corretor', t:'Meu painel', r: vCorretor },
  'corretor/imoveis': { role:'corretor', t:'Meus imóveis', r: vMeusImoveis },
  'corretor/contatos':{ role:'corretor', t:'Meus contatos', r: vContatos },
  'corretor/agenda':  { role:'corretor', t:'Agenda', r: vAgenda },
  'corretor/comissoes':{ role:'corretor', t:'Minhas comissões', r: vComissoes },
  'publicar':         { role:'*', t:'Publicar imóvel', r: vPublicar, after: bindPublicar },
};
const home = () => S.perfil === 'admin' ? 'admin' : 'corretor';
const path = () => location.hash.replace(/^#\/?/, '').split('?')[0];
const go = p => { if (path() === p) render(); else location.hash = '#/' + p; };

let mapRef = null;
function render(keep = false) {
  const y = scrollY;
  if (mapRef) { mapRef.remove(); mapRef = null; }
  const app = $('#app');
  if (!S.logado) { app.innerHTML = vLogin(); document.title = 'Entrar · Sistema Sunshine'; return; }
  const p = path(), R = ROUTES[p];
  if (!R || (R.role !== '*' && R.role !== S.perfil)) { location.replace('#/' + home()); return; }
  app.innerHTML = shell(p, R, R.r());
  document.title = R.t + ' · Sistema Sunshine';
  if (keep) { $('.view').style.animation = 'none'; scrollTo(0, y); } else { scrollTo(0, 0); countUp(); }
  if (R.after) R.after();
  if ($('#map')) initMap();
  S.audit.forEach(a => delete a.novo);
}
window.addEventListener('hashchange', () => { closeModal(); render(); });

function shell(p, R, content) {
  const u = user(), nav = NAV[S.perfil];
  const link = n => n.sec ? `<div class="nav-l">${n.sec}</div>` :
    `<a href="#/${n.p}" class="${n.p === p ? 'on' : ''}">${ic(n.i)}<span>${n.l}</span>${n.cnt && n.cnt() ? `<span class="cnt">${n.cnt()}</span>` : ''}</a>`;
  const bn = S.perfil === 'admin'
    ? nav.filter(n => n.b)
    : [nav[0], nav[2], { p:'publicar', plus:true }, nav[4]];
  return `<div class="app">
  <aside class="side">
    <div class="brand"><img src="../img/logo-header-branco.png" alt="Sunshine Imobiliária" style="height:46px"><div><small>Sistema interno</small></div></div>
    <div class="nav-l">${isAdmin() ? 'Administração' : 'Corretor'}</div>
    <nav class="nav">${nav.map(link).join('')}</nav>
    <div class="foot">
      <div class="me">${av(u.id)}<div><b>${u.nome}</b><span>${u.papel}</span></div><button class="out" data-act="sair" aria-label="Sair" title="Sair">${ic('out')}</button></div>
    </div>
  </aside>
  <div class="main">
    <header class="top">
      <img class="mlogo" src="../img/logo-header.png" alt="Sunshine Imobiliária" style="height:38px">
      <div class="tl"><small>${isAdmin() ? 'Administrador' : 'Área do corretor'}</small><h1>${R.t}</h1></div>
      <div class="sp"></div>
      <span class="demo-tag" title="Protótipo: dados simulados">Protótipo</span>
      ${whoSwitch()}
      <button class="bell" data-act="avisos" aria-label="Avisos">${ic('bell')}<i></i></button>
    </header>
    <main class="view">${content}</main>
  </div>
  <nav class="bnav" aria-label="Menu">
    ${bn.map(n => n.plus
      ? `<a href="#/publicar" class="plus ${p === 'publicar' ? 'on' : ''}"><i>${ic('plus')}</i><span>Publicar</span></a>`
      : `<a href="#/${n.p}" class="${n.p === p ? 'on' : ''}">${ic(n.i)}<span>${n.b}</span></a>`).join('')}
    <button data-act="mais">${ic('menu')}<span>Mais</span></button>
  </nav>
</div>`;
}
function whoSwitch() {
  return `<div class="who" role="group" aria-label="Trocar perfil">
    ${['admin', 'corretor'].map(k => { const u = USERS[k]; return `<button data-act="perfil" data-p="${k}" class="${S.perfil === k ? 'on' : ''}" aria-pressed="${S.perfil === k}">${av(u.id)}<span class="wl">${k === 'admin' ? 'Admin' : 'Corretor'}<small>${u.nome}</small></span></button>`; }).join('')}
  </div>`;
}

// ---------------------------------------------------------------- login
function vLogin() {
  const k = S.perfil, u = USERS[k];
  return `<div class="login">
    <section class="art">
      <img class="bgimg" src="../img/imoveis/1262-3.jpg" alt="">
      <img class="lg" src="../img/logo-sunshine-branco.png" alt="Sunshine Imobiliária">
      <h1>O escritório da Sunshine, <em>na palma da mão.</em></h1>
      <p>Imóveis, contatos, visitas e comissões num só lugar. O Nelson acompanha tudo; cada corretor cuida do que é seu.</p>
      <div class="pts"><span>${ic('lock')}Senha individual</span><span>${ic('shield')}Cada um vê o que é seu</span><span>${ic('db')}Backup diário</span></div>
    </section>
    <section class="frm">
      <h2>Entrar no sistema</h2>
      <p>Escolha com qual perfil quer ver o protótipo.</p>
      <div class="prof" role="radiogroup">
        <button data-act="lperfil" data-p="admin" class="${k === 'admin' ? 'on' : ''}" role="radio" aria-checked="${k === 'admin'}">${av('nelson', 'lg')}<div><b>Nelson</b><span>Administrador · vê tudo</span></div></button>
        <button data-act="lperfil" data-p="corretor" class="${k === 'corretor' ? 'on' : ''}" role="radio" aria-checked="${k === 'corretor'}">${av('carla', 'lg')}<div><b>Carla</b><span>Corretora · vê o que é dela</span></div></button>
      </div>
      <form data-form="login">
        <label class="fld"><span>E-mail</span><input class="inp" type="email" value="${u.id}@sunshine-imob.com.br" autocomplete="off"></label>
        <label class="fld"><span>Senha</span><input class="inp" type="password" value="demonstracao" autocomplete="off"></label>
        <button class="btn lg block" type="submit">Entrar como ${u.nome} ${ic('cr')}</button>
      </form>
      <div class="note">${ic('shield')}<span>Ambiente de demonstração: os dados são de exemplo e ficam só neste navegador. Dentro do sistema, o seletor no topo troca entre administrador e corretor a qualquer momento.</span></div>
      <div class="demo">Sunshine Imobiliária · CRECI ${EMPRESA.creci} · Protótipo do sistema interno</div>
    </section>
  </div>`;
}

// ---------------------------------------------------------------- admin › visão geral
function vendas30() { return S.vendas.filter(v => v.status === 'confirmada' && Date.now() - v.t < D30); }
function vDash() {
  const v30 = vendas30(), vgv = v30.reduce((a, v) => a + v.valor, 0), pend = S.vendas.filter(v => v.status === 'pendente');
  const top = [...S.imoveis].filter(i => i.st !== 'pausado').sort((a, b) => b.views - a.views).slice(0, 5);
  return `
  <div class="ph-head">
    <div><div class="eyebrow">Últimos 30 dias</div><h2>${saudacao()}, Nelson</h2><p>Como a Sunshine está indo: site, contatos, visitas e vendas de toda a equipe.</p></div>
    <div class="acts"><button class="btn ghost" data-act="exportar">${ic('file')}Relatório do mês</button><a class="btn" href="#/publicar">${ic('plus')}Novo imóvel</a></div>
  </div>
  ${pend.length ? `<div class="banner">${ic('clock')}<span><b>${pend.length === 1 ? '1 venda aguarda' : pend.length + ' vendas aguardam'} sua confirmação.</b> A comissão só é liberada depois que você confirmar.</span><a class="btn sm" href="#/admin/vendas">Revisar</a></div>` : ''}
  <div class="kpis">
    <div class="card kpi dark"><div class="l">${ic('globe')}Visitas no site</div><div class="v tnum" data-n="4812">4.812</div><div class="f"><span class="chip up">${ic('up')}18%</span>vs. mês anterior</div></div>
    <div class="card kpi"><div class="l">${ic('inbox')}Contatos</div><div class="v tnum" data-n="126">126</div><div class="f">site, WhatsApp e portais</div></div>
    <div class="card kpi"><div class="l">${ic('cal')}Visitas agendadas</div><div class="v tnum" data-n="31">31</div><div class="f">1 em cada 4 contatos</div></div>
    <div class="card kpi"><div class="l">${ic('file')}Propostas</div><div class="v tnum" data-n="7">7</div><div class="f">2 aguardando resposta</div></div>
    <div class="card kpi"><div class="l">${ic('deal')}Vendas</div><div class="v tnum" data-n="${v30.length}">${v30.length}</div><div class="f"><span class="chip gold">${mi(vgv)}</span>em VGV</div></div>
  </div>
  <div class="g g2">
    <div class="card"><div class="hd"><h3>Mapa da carteira</h3><div class="legend">${['disponivel', 'negociacao', 'vendido'].map(s => `<span><i style="background:${ST_COR[s]}"></i>${ST[s]} · ${S.imoveis.filter(i => i.st === s).length}</span>`).join('')}</div></div>
      <div class="bd" style="padding:14px 0 0"><div id="map" class="map" role="img" aria-label="Mapa com os imóveis coloridos por status"></div></div></div>
    <div class="card"><div class="hd"><h3>Contatos por semana</h3><span class="sub">últimas 6 semanas</span></div><div class="bd">${chart()}
      <div style="margin-top:18px"><div class="splitl"><span>Origem dos contatos</span><span>126 no total</span></div>
      <div class="split" style="height:10px;margin-top:8px"><i style="width:58%;background:var(--navy)"></i><i style="width:31%;background:var(--wa)"></i><i style="width:11%;background:var(--gold)"></i></div>
      <div class="legend" style="margin-top:8px"><span><i style="background:var(--navy)"></i>Site 58%</span><span><i style="background:var(--wa)"></i>WhatsApp 31%</span><span><i style="background:var(--gold)"></i>Portais 11%</span></div></div>
    </div></div>
  </div>
  <div class="g g2">
    <div class="card"><div class="hd"><h3>Ranking de corretores</h3><a class="lnk" href="#/admin/corretores">Ver equipe ${ic('cr')}</a></div><div class="bd np">${ranking()}</div></div>
    <div class="card"><div class="hd"><h3>Imóveis mais vistos</h3><a class="lnk" href="#/admin/imoveis">Ver todos ${ic('cr')}</a></div><div class="bd np">
      <ul class="lst">${top.map(i => `<li><img class="th" src="${src(i.fotos[0])}" alt="" loading="lazy"><div class="tx"><b>${esc(i.titulo)}</b><span>${esc(i.bairro)} · Ref. ${i.id}</span></div><div class="rt">${num(i.views)}<small>${i.leads} contatos</small></div></li>`).join('')}</ul>
    </div></div>
  </div>`;
}
function ranking() {
  const rows = S.corretores.filter(c => c.ativo).map(c => ({ c, im: S.imoveis.filter(i => i.cor === c.id && i.st !== 'vendido').length, vd: vendas30().filter(v => v.cor === c.id).length }))
    .sort((a, b) => b.vd - a.vd || b.c.contatos - a.c.contatos);
  const max = Math.max(...rows.map(r => r.c.contatos));
  return `<div class="tw"><table class="t" style="min-width:540px"><thead><tr><th>Corretor</th><th class="num">Imóveis</th><th>Contatos</th><th class="num">Resposta</th><th class="num">Vendas</th></tr></thead><tbody>
    ${rows.map((r, k) => `<tr><td><div class="who-c"><span class="rank ${k === 0 ? 'r1' : ''}">${k + 1}</span>${av(r.c.id, 'sm')}${esc(r.c.nome)}</div></td>
      <td class="num">${r.im}</td>
      <td><div style="display:flex;align-items:center;gap:10px"><b class="tnum" style="min-width:22px">${r.c.contatos}</b><div class="bar-in" style="flex:1"><i style="width:${r.c.contatos / max * 100}%;animation-delay:${k * 80}ms"></i></div></div></td>
      <td class="num">${r.c.resp}</td><td class="num"><b>${r.vd}</b></td></tr>`).join('')}
  </tbody></table></div>`;
}
function chart() {
  const vals = [14, 17, 19, 22, 25, 29], W = 360, H = 180, pb = 24, pt = 20, max = 32, bw = 34, gap = (W - 30 - bw * vals.length) / (vals.length - 1);
  const d = new Date(); d.setDate(d.getDate() - d.getDay() + 1);
  const lab = vals.map((_, k) => { const x = new Date(d); x.setDate(d.getDate() - (vals.length - 1 - k) * 7); return x.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }); });
  const y = v => H - pb - (v / max) * (H - pb - pt);
  let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Contatos por semana: ${vals.join(', ')}">`;
  [0, 10, 20, 30].forEach(g => { s += `<line x1="30" x2="${W}" y1="${y(g)}" y2="${y(g)}" stroke="#EEF1F5"/><text x="0" y="${y(g) + 4}">${g}</text>`; });
  vals.forEach((v, k) => {
    const x = 30 + k * (bw + gap), last = k === vals.length - 1;
    s += `<rect class="b" x="${x}" y="${y(v)}" width="${bw}" height="${H - pb - y(v)}" rx="6" fill="${last ? '#E6BC26' : '#182639'}" style="animation-delay:${k * 70}ms"/>`;
    s += `<text class="vl" x="${x + bw / 2}" y="${y(v) - 6}" text-anchor="middle">${v}</text><text x="${x + bw / 2}" y="${H - 6}" text-anchor="middle">${lab[k]}</text>`;
  });
  return s + '</svg>';
}
function initMap() {
  const el = $('#map'); if (!el) return;
  if (!window.L) { setTimeout(initMap, 150); return; }
  const m = L.map(el, { scrollWheelZoom: false, attributionControl: true });
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Mapa &copy; Esri' }).addTo(m);
  const pts = [];
  S.imoveis.filter(i => i.lat && i.st !== 'pausado').forEach(i => {
    L.circleMarker([i.lat, i.lng], { radius: 10, color: '#fff', weight: 3, fillColor: ST_COR[i.st], fillOpacity: 1 }).addTo(m)
      .bindPopup(`<div class="pop"><img src="${src(i.fotos[0])}" alt=""><div><b>Ref. ${i.id} · ${esc(i.bairro)}</b><span>${brl(i.preco)}${i.neg === 'aluguel' ? '/mês' : ''} · ${esc(cor(i.cor).nome)}</span><br><span class="st ${i.st}">${ST[i.st]}</span></div></div>`);
    pts.push([i.lat, i.lng]);
  });
  m.fitBounds(pts, { padding: [36, 36], maxZoom: 14 });
  mapRef = m;
  setTimeout(() => m.invalidateSize(), 250);
}
function countUp() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  $$('[data-n]').forEach(el => {
    const to = +el.dataset.n, fmt = el.dataset.f, t0 = performance.now(), dur = 900;
    const f = v => fmt === 'brl' ? brl(v) : num(Math.round(v));
    const step = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = f(to * e); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}

// ---------------------------------------------------------------- admin › imóveis
function vImoveis() {
  const c = k => S.imoveis.filter(i => !k || i.st === k).length;
  return `
  <div class="ph-head">
    <div><h2>Imóveis</h2><p>Toda a carteira da Sunshine. Nada é apagado: vendidos e pausados ficam guardados no histórico.</p></div>
    <div class="acts"><a class="btn" href="#/publicar">${ic('plus')}Novo imóvel</a></div>
  </div>
  <div class="filters">
    <label class="search">${ic('search')}<input type="search" placeholder="Buscar por título, bairro ou referência" value="${esc(UI.fi.q)}" data-in="fi-q" aria-label="Buscar imóveis"></label>
    <select class="sel" data-ch="fi-cor" aria-label="Filtrar por corretor"><option value="">Todos os corretores</option>${S.corretores.map(x => `<option value="${x.id}" ${UI.fi.cor === x.id ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select>
  </div>
  <div class="filters"><div class="seg" role="tablist">${[['', 'Todos'], ['disponivel', 'Disponíveis'], ['negociacao', 'Em negociação'], ['vendido', 'Vendidos'], ['pausado', 'Pausados']].map(([k, l]) => `<button data-act="fi-st" data-k="${k}" class="${UI.fi.st === k ? 'on' : ''}">${l}<em>${c(k)}</em></button>`).join('')}</div></div>
  <div class="card" id="ilist">${listaImoveis()}</div>`;
}
function listaImoveis() {
  const q = UI.fi.q.trim().toLowerCase();
  const l = S.imoveis.filter(i => (!UI.fi.st || i.st === UI.fi.st) && (!UI.fi.cor || i.cor === UI.fi.cor) && (!q || `${i.titulo} ${i.bairro} ${i.id}`.toLowerCase().includes(q)));
  if (!l.length) return `<div class="empty">${ic('search')}Nenhum imóvel com esses filtros.</div>`;
  return l.map(i => `<div class="irow ${i.st === 'pausado' ? 'paused' : ''}">
    <button data-act="imovel" data-id="${i.id}" aria-label="Abrir Ref. ${i.id}"><img class="th" src="${src(i.fotos[0])}" alt="" loading="lazy"></button>
    <div class="tx"><b>${esc(i.titulo)}</b><span>Ref. ${i.id} · ${esc(i.bairro)} · ${i.neg === 'aluguel' ? 'Aluguel' : 'Venda'}</span><div class="mt"><span>${ic('eye')}${num(i.views)}</span><span>${ic('msg')}${i.leads}</span></div></div>
    <div class="pr">${precoTxt(i)}</div>
    <div class="stc"><span class="st ${i.st}">${ST[i.st]}</span></div>
    <div class="cr">${av(i.cor, 'sm')}${esc(cor(i.cor).nome)}</div>
    <div class="ac">${acoesImovel(i)}</div>
  </div>`).join('');
}
function acoesImovel(i) {
  if (i.st === 'vendido') return `<button class="btn sm ghost" data-act="imovel" data-id="${i.id}">${ic('eye')}<span>Detalhes</span></button>`;
  if (i.st === 'pausado') return `<button class="btn sm ghost" data-act="reativar" data-id="${i.id}">${ic('play')}<span>Reativar</span></button>`;
  return `<button class="btn sm ghost" data-act="vender" data-id="${i.id}" title="Marcar como vendido">${ic('check')}<span>Vendido</span></button><button class="btn sm ghost" data-act="pausar" data-id="${i.id}" title="Pausar anúncio">${ic('pause')}<span>Pausar</span></button>`;
}

// ---------------------------------------------------------------- admin › corretores
function vCorretores() {
  return `
  <div class="ph-head">
    <div><h2>Corretores</h2><p>Cada corretor tem login próprio e enxerga só a própria carteira. Desativar um acesso não apaga nada do que ele fez.</p></div>
    <div class="acts"><button class="btn" data-act="convidar">${ic('plus')}Convidar corretor</button></div>
  </div>
  <div class="brokers">${S.corretores.map(c => {
    const im = S.imoveis.filter(i => i.cor === c.id && i.st !== 'vendido').length;
    const vd = S.vendas.filter(v => v.cor === c.id && v.status === 'confirmada' && Date.now() - v.t < D365).length;
    return `<div class="card broker" style="${c.ativo ? '' : 'opacity:.6'}">
      <div class="tp">${av(c.id, 'lg')}<div><b>${esc(c.nome)}</b><span>${esc(c.papel)} · desde ${c.desde}</span></div><span class="st ${c.ativo ? 'confirmada' : 'pausado'}">${c.ativo ? 'Ativo' : 'Inativo'}</span></div>
      <div class="nums"><div><b>${im}</b><span>Imóveis</span></div><div><b>${c.contatos}</b><span>Contatos</span></div><div><b>${esc(c.resp)}</b><span>Resposta</span></div><div><b>${vd}</b><span>Vendas/ano</span></div></div>
      <div class="bt"><button class="btn sm ghost" data-act="carteira" data-id="${c.id}">${ic('build')}Ver carteira</button><button class="btn sm ghost" data-act="senha" data-id="${c.id}">${ic('key')}Redefinir senha</button>
      ${c.id !== 'nelson' ? `<button class="btn sm ghost" data-act="ativo" data-id="${c.id}">${ic(c.ativo ? 'ban' : 'refresh')}${c.ativo ? 'Desativar' : 'Reativar'}</button>` : ''}</div>
    </div>`; }).join('')}</div>`;
}

// ---------------------------------------------------------------- contatos (kanban)
function vContatos() {
  const adm = isAdmin();
  const l = S.contatos.filter(c => adm ? (!UI.fc || c.cor === UI.fc) : c.cor === 'carla');
  return `
  <div class="ph-head">
    <div><h2>${adm ? 'Contatos' : 'Meus contatos'}</h2><p>${adm ? 'Todos os clientes que chegaram pelo site, WhatsApp e portais, do primeiro contato ao fechamento.' : 'Só os seus clientes. Arraste o cartão (ou use as setas) para mudar a etapa.'}</p></div>
    ${adm ? `<div class="acts"><select class="sel" data-ch="fc" aria-label="Filtrar por corretor"><option value="">Toda a equipe</option>${S.corretores.map(x => `<option value="${x.id}" ${UI.fc === x.id ? 'selected' : ''}>${esc(x.nome)}</option>`).join('')}</select></div>` : ''}
  </div>
  <div class="kb">${ETAPAS.map((e, k) => { const cs = l.filter(c => c.etapa === e.k).sort((a, b) => b.t - a.t); return `
    <section class="col" data-drop="${e.k}"><header><i style="background:${e.c}"></i>${e.l}<em>${cs.length}</em></header>
      ${cs.map(c => leadCard(c, k)).join('') || `<div style="font-size:12.5px;color:var(--soft);text-align:center;padding:18px 6px">Nenhum contato aqui</div>`}
    </section>`; }).join('')}</div>`;
}
function leadCard(c, k) {
  const i = byId(c.imovel);
  return `<article class="lead" draggable="true" data-lead="${c.id}">
    <div class="r1"><b>${esc(c.nome)}</b><span class="tm">${ha(c.t)}</span></div>
    <p>Ref. ${c.imovel}${i ? ' · ' + esc(i.bairro) : ''} — “${esc(c.msg.length > 70 ? c.msg.slice(0, 68) + '…' : c.msg)}”</p>
    <div class="r2"><span class="src">${esc(c.origem)}</span>${isAdmin() ? av(c.cor, 'sm') : ''}
      <div class="mv"><a class="ib wa" style="width:28px;height:28px;border-radius:8px" href="${waLink(c.tel, `Olá, ${first(c.nome)}! Aqui é ${isAdmin() ? 'o Nelson' : 'a Carla'}, da Sunshine Imobiliária. Recebi seu contato sobre o imóvel Ref. ${c.imovel}.`)}" target="_blank" rel="noopener" aria-label="WhatsApp de ${esc(c.nome)}">${WA}</a>
      <button data-act="lead-mv" data-id="${c.id}" data-d="-1" ${k === 0 ? 'disabled' : ''} aria-label="Etapa anterior">${ic('cl')}</button><button data-act="lead-mv" data-id="${c.id}" data-d="1" ${k === ETAPAS.length - 1 ? 'disabled' : ''} aria-label="Próxima etapa">${ic('cr')}</button></div>
    </div></article>`;
}
function moverLead(id, etapa) {
  const c = S.contatos.find(x => x.id === +id); if (!c || c.etapa === etapa) return;
  const de = ETAPAS.find(e => e.k === c.etapa).l, para = ETAPAS.find(e => e.k === etapa).l;
  c.etapa = etapa;
  log('Moveu o contato', c.nome, `${de} → ${para}`, 'contato');
  render(true);
  toast(`${esc(c.nome)} foi para “${para}”`, etapa === 'fechado' ? 'Parabéns! Registre a venda para liberar a comissão.' : '');
}

// ---------------------------------------------------------------- admin › vendas
function vVendas() {
  const pend = S.vendas.filter(v => v.status === 'pendente').sort((a, b) => b.t - a.t);
  const conf = S.vendas.filter(v => v.status === 'confirmada').sort((a, b) => b.t - a.t);
  const v30 = vendas30(), vgv = v30.reduce((a, v) => a + v.valor, 0), rec = v30.reduce((a, v) => a + calc(v.valor, v.cfg).imob, 0);
  return `
  <div class="ph-head">
    <div><h2>Vendas</h2><p>O corretor registra a venda e ela fica aguardando a sua confirmação. Só depois disso entra nos números e libera a comissão.</p></div>
    <div class="acts"><button class="btn" data-act="registrar">${ic('plus')}Registrar venda</button></div>
  </div>
  <div class="kpis k3">
    <div class="card kpi dark"><div class="l">${ic('deal')}VGV em 30 dias</div><div class="v">${mi(vgv)}</div><div class="f">${v30.length} vendas confirmadas</div></div>
    <div class="card kpi"><div class="l">${ic('wallet')}Fica com a Sunshine</div><div class="v tnum" data-n="${Math.round(rec)}" data-f="brl">${brl(rec)}</div><div class="f">parte da imobiliária</div></div>
    <div class="card kpi"><div class="l">${ic('clock')}Aguardando você</div><div class="v">${pend.length}</div><div class="f">${pend.length ? 'confirme para liberar' : 'tudo em dia'}</div></div>
  </div>
  <div class="card" style="margin-bottom:20px"><div class="hd"><h3>Aguardando confirmação</h3><span class="sub">${pend.length}</span></div><div class="bd np">
    ${pend.length ? pend.map(v => saleRow(v, true)).join('') : `<div class="empty">${ic('check')}Nenhuma venda pendente.</div>`}
  </div></div>
  <div class="card"><div class="hd"><h3>Vendas confirmadas</h3><span class="sub">últimos 12 meses</span></div><div class="bd np">${conf.map(v => saleRow(v, false)).join('')}</div></div>`;
}
function saleRow(v, pend) {
  const k = calc(v.valor, pend ? S.cfg : v.cfg);
  return `<div class="sale ${pend ? 'pend' : ''}">
    <span class="ic">${ic(pend ? 'clock' : 'deal')}</span>
    <div class="tx"><b>Ref. ${v.ref} · ${esc(v.titulo)}</b><span>${av(v.cor, 'sm').replace('class="av', 'style="display:inline-grid;vertical-align:middle;width:20px;height:20px;font-size:9px;margin-right:4px" class="av')}${esc(cor(v.cor).nome)} · comprador ${esc(v.comprador)} · ${pend ? 'registrada ' + ha(v.t) : quando(v.t).replace(/, .*/, '')}</span></div>
    <div class="rt"><div class="val">${brl(v.valor)}<small>comissão ${brl(k.com)} · corretor ${brl(k.liq)}</small></div>
      ${pend ? `<button class="btn sm ghost" data-act="ajuste" data-id="${v.id}">Pedir ajuste</button><button class="btn sm ok" data-act="confirmar" data-id="${v.id}">${ic('check')}Confirmar</button>` : `<button class="btn sm ghost" data-act="calculo" data-id="${v.id}">Ver cálculo</button>`}
    </div></div>`;
}

// ---------------------------------------------------------------- admin › configurações
function flowHtml(v, c) {
  const k = calc(v, c);
  return `<div class="flow">
    <div class="fstep"><span class="n">1</span><div><b>Valor da venda</b><span>Preço fechado com o comprador</span></div><div class="v" data-o="v">${brl(k.v)}</div></div>
    <div class="fstep"><span class="n">2</span><div><b>Comissão</b><span>${pct(c.comissao)} do valor da venda</span></div><div class="v">${brl(k.com)}</div></div>
    <div class="fstep"><span class="n">3</span><div><b>Parte da Sunshine</b><span>${pct(c.imob)} da comissão</span></div><div class="v">${brl(k.imob)}</div></div>
    <div class="fstep"><span class="n">4</span><div><b>Parte do corretor</b><span>${pct(100 - c.imob)} da comissão</span></div><div class="v">${brl(k.corr)}</div></div>
    <div class="fstep"><span class="n">5</span><div><b>Imposto</b><span>${pct(c.imposto)} sobre a parte do corretor</span></div><div class="v neg">− ${brl(k.imp)}</div></div>
    <div class="fstep"><span class="n">6</span><div><b>Taxas</b><span>Transferência bancária</span></div><div class="v neg">− ${brl(k.taxas)}</div></div>
    <div class="fstep tot"><span class="n">${ic('check')}</span><div><b>Corretor recebe</b><span>Valor líquido</span></div><div class="v">${brl(k.liq)}</div></div>
  </div>
  <div style="margin-top:10px"><div class="split"><i style="width:${c.imob}%;background:var(--navy)"></i><i style="width:${100 - c.imob}%;background:var(--gold)"></i></div>
  <div class="splitl"><span>Sunshine ${brl(k.imob)}</span><span>Corretor ${brl(k.corr)}</span></div></div>`;
}
function vConfig() {
  const c = UI.cfgDraft || (UI.cfgDraft = { ...S.cfg });
  const rng = (k, l, min, max, step, sfx, hint) => `<label class="fld"><span>${l} ${hint ? `<em>· ${hint}</em>` : ''}</span><div class="range"><input type="range" min="${min}" max="${max}" step="${step}" value="${c[k]}" data-cfg="${k}"><output data-out="${k}">${sfx(c[k])}</output></div></label>`;
  return `
  <div class="ph-head">
    <div><h2>Configurações</h2><p>Regras de comissão da Sunshine. Mude os valores e veja o exemplo recalcular na hora. Vendas já confirmadas mantêm a regra da época.</p></div>
  </div>
  <div class="cfg">
    <div class="card"><div class="hd"><h3>Comissão e repasse</h3></div><div class="bd">
      ${rng('comissao', 'Comissão sobre a venda', 3, 8, .5, pct)}
      ${rng('imob', 'Fica com a imobiliária', 30, 70, 5, v => pct(v) + ' / ' + pct(100 - v), 'o resto vai para o corretor')}
      ${rng('imposto', 'Imposto do corretor', 0, 15, .5, pct)}
      <div class="row2">
        <label class="fld"><span>Taxas por venda</span><div class="inp-a pre"><i>R$</i><input class="inp tnum" type="number" min="0" step="1" value="${c.taxas}" data-cfg="taxas" inputmode="numeric"></div></label>
        <label class="fld"><span>Venda de exemplo</span><div class="inp-a pre"><i>R$</i><input class="inp tnum" type="text" value="${num(c.exemplo)}" data-cfg="exemplo" inputmode="numeric"></div></label>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px">
        <button class="btn" data-act="cfg-salvar">${ic('check')}Salvar configurações</button>
        <button class="btn ghost" data-act="cfg-padrao">${ic('refresh')}Voltar ao padrão</button>
      </div>
      <p class="lock" style="margin-top:16px">${ic('hist')}Toda alteração fica no registro de auditoria, com nome e horário.</p>
    </div></div>
    <div class="card"><div class="hd"><h3>Exemplo de uma venda</h3><span class="sub" id="cfg-dirty"></span></div><div class="bd" id="flow">${flowHtml(c.exemplo, c)}</div></div>
  </div>`;
}
function bindConfig() {
  const upd = () => {
    const c = UI.cfgDraft;
    $$('[data-out]').forEach(o => { const k = o.dataset.out; o.textContent = k === 'imob' ? pct(c[k]) + ' / ' + pct(100 - c[k]) : pct(c[k]); });
    $('#flow').innerHTML = flowHtml(c.exemplo, c);
    const dirty = ['comissao', 'imob', 'imposto', 'taxas'].some(k => +c[k] !== +S.cfg[k]);
    $('#cfg-dirty').innerHTML = dirty ? '<span class="chip gold">Alterações não salvas</span>' : '';
  };
  $$('[data-cfg]').forEach(inp => inp.addEventListener('input', () => {
    const k = inp.dataset.cfg;
    if (k === 'exemplo') { const d = +inp.value.replace(/\D/g, '').slice(0, 10); UI.cfgDraft.exemplo = d; inp.value = d ? num(d) : ''; }
    else UI.cfgDraft[k] = Math.max(0, +inp.value || 0);
    upd();
  }));
  upd();
}

// ---------------------------------------------------------------- admin › auditoria
const AK = { imovel:['Imóveis', 'build'], venda:['Vendas', 'deal'], contato:['Contatos', 'inbox'], cfg:['Configurações', 'cog'], acesso:['Acessos', 'key'], sys:['Sistema', 'db'] };
function vAuditoria() {
  return `
  <div class="ph-head">
    <div><h2>Registro de auditoria</h2><p>Tudo o que acontece no sistema fica anotado: quem fez, o quê e quando. Ninguém consegue editar ou apagar este registro.</p></div>
    <div class="acts"><button class="btn ghost" data-act="exportar">${ic('file')}Exportar</button></div>
  </div>
  <div class="filters">
    <label class="search">${ic('search')}<input type="search" placeholder="Buscar por pessoa, imóvel ou ação" value="${esc(UI.fa.q)}" data-in="fa-q" aria-label="Buscar no registro"></label>
  </div>
  <div class="filters"><div class="seg">${[['', 'Tudo'], ...Object.entries(AK).map(([k, v]) => [k, v[0]])].map(([k, l]) => `<button data-act="fa-k" data-k="${k}" class="${UI.fa.k === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
  <div class="card"><div class="hd"><span class="lock">${ic('lock')}Registro protegido · somente leitura</span><span class="sub">${S.audit.length} registros</span></div><div class="bd np" id="alist">${listaAudit()}</div></div>`;
}
function listaAudit() {
  const q = UI.fa.q.trim().toLowerCase();
  const l = S.audit.filter(a => (!UI.fa.k || a.k === UI.fa.k) && (!q || `${a.quem} ${a.acao} ${a.alvo} ${a.det}`.toLowerCase().includes(q)));
  if (!l.length) return `<div class="empty">${ic('search')}Nada encontrado.</div>`;
  return `<ul class="log">${l.map(a => `<li class="${a.novo ? 'new' : ''}"><span class="ic k-${a.k}">${ic((AK[a.k] || AK.sys)[1])}</span>
    <div class="tx"><b>${esc(a.quem)}</b> ${esc(a.acao.toLowerCase())}${a.alvo ? ` <b>${esc(a.alvo)}</b>` : ''}<span>${esc(a.det)}</span></div><div class="when">${quando(a.t)}</div></li>`).join('')}</ul>`;
}

// ---------------------------------------------------------------- acessos e segurança
function vAcessos() {
  const Y = `<span class="yes" aria-label="Pode">${ic('check')}</span>`, N = `<span class="no" aria-label="Não pode">${ic('x')}</span>`, O = '<span class="own">Só os seus</span>';
  const rows = [
    ['Ver o painel geral (números de toda a imobiliária)', Y, N],
    ['Ver e editar imóveis', Y, O], ['Publicar imóvel novo', Y, Y], ['Pausar anúncio', Y, O],
    ['Marcar imóvel como vendido', Y, N], ['Ver contatos de clientes', Y, O], ['Registrar venda', Y, Y],
    ['Confirmar venda e liberar comissão', Y, N], ['Ver comissões', Y, O], ['Alterar comissão, divisão, imposto e taxas', Y, N],
    ['Cadastrar e desativar corretores', Y, N], ['Ver o registro de auditoria', Y, N],
    ['Apagar imóveis, vendas ou registros', N, N],
  ];
  const sec = [
    ['lock', 'Senha individual', 'Cada pessoa entra com o próprio e-mail e senha. Nada de senha compartilhada; dá para ativar a verificação em duas etapas.'],
    ['users', 'Isolamento por corretor', 'O corretor só enxerga os imóveis, contatos e comissões dele. Os números da imobiliária ficam com o administrador.'],
    ['db', 'Backup diário', 'Cópia automática todos os dias às 3h, guardada por 30 dias. Último backup: hoje, 03:00.'],
    ['shield', 'LGPD', 'Dados dos clientes usados só para o atendimento, com registro de quem acessou e anonimização a pedido do cliente.'],
    ['ban', 'Acesso cortado na hora', 'Se um corretor sai da equipe, o administrador desativa o login em um clique. O histórico continua guardado.'],
    ['hist', 'Nada se perde', 'Nada é apagado: vendidos e pausados viram histórico, e toda ação fica no registro de auditoria.'],
  ];
  return `
  <div class="ph-head"><div><h2>Acessos e segurança</h2><p>O que cada perfil pode fazer no sistema e como os dados da Sunshine ficam protegidos.</p></div>
    <div class="acts"><span class="st ${isAdmin() ? 'confirmada' : 'negociacao'}">Você está como ${isAdmin() ? 'Administrador' : 'Corretora'}</span></div></div>
  <div class="card" style="margin-bottom:20px"><div class="hd"><h3>Perfis de acesso</h3></div><div class="bd np"><div class="tw">
    <table class="t perm" style="min-width:480px"><thead><tr><th>Permissão</th><th style="${isAdmin() ? 'color:var(--ink)' : ''}">Administrador</th><th style="${!isAdmin() ? 'color:var(--ink)' : ''}">Corretor</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table>
  </div><p style="font-size:12.5px;color:var(--mut);padding:12px 20px 8px">Ninguém apaga nada, nem o administrador: o que sai do ar vira histórico.</p></div></div>
  <div class="card"><div class="hd"><h3>Segurança</h3></div><div class="bd"><div class="sec">${sec.map(s => `<div><span class="ic">${ic(s[0])}</span><div><b>${s[1]}</b><span>${s[2]}</span></div></div>`).join('')}</div></div></div>`;
}

// ---------------------------------------------------------------- corretor › painel
function minhasVendas() { return S.vendas.filter(v => v.cor === 'carla'); }
function resumoCarla() {
  const conf = minhasVendas().filter(v => v.status === 'confirmada');
  const mes = conf.filter(v => Date.now() - v.t < D30).reduce((a, v) => a + calc(v.valor, v.cfg).liq, 0);
  const receber = conf.reduce((a, v) => a + Math.max(0, calc(v.valor, v.cfg).liq - (v.pago || 0)), 0);
  const ano = conf.filter(v => Date.now() - v.t < D365);
  return { mes, receber, ano: ano.length, anoLiq: ano.reduce((a, v) => a + calc(v.valor, v.cfg).liq, 0) };
}
function proximaVisita() { const hj = new Date(); hj.setHours(0, 0, 0, 0); return S.agenda.filter(a => a.t >= hj.getTime()).sort((a, b) => a.t - b.t)[0]; }
function vCorretor() {
  const r = resumoCarla(), nv = S.contatos.filter(c => c.cor === 'carla' && c.etapa === 'novo').sort((a, b) => b.t - a.t);
  const nx = proximaVisita(), hj = S.agenda.filter(a => diaLabel(a.t) === 'Hoje').length;
  const meus = S.imoveis.filter(i => i.cor === 'carla');
  const falta = nx ? nx.t - Date.now() : 0;
  return `
  <div class="hello">${av('carla', 'lg')}<div><h2>Olá, Carla</h2><p>${hojeLongo()} · ${nv.length} ${nv.length === 1 ? 'contato novo' : 'contatos novos'} e ${hj} ${hj === 1 ? 'visita' : 'visitas'} hoje</p></div>
    <div class="acts"><a class="btn gold" href="#/publicar">${ic('plus')}Publicar imóvel</a><button class="btn ghost" data-act="registrar">${ic('deal')}Registrar venda</button></div></div>
  <div class="kpis k4">
    <div class="card kpi dark"><div class="l">${ic('wallet')}Comissão do mês</div><div class="v tnum" data-n="${Math.round(r.mes)}" data-f="brl">${brl(r.mes)}</div><div class="f">líquida, já sem imposto e taxas</div></div>
    <div class="card kpi"><div class="l">${ic('clock')}A receber</div><div class="v tnum" data-n="${Math.round(r.receber)}" data-f="brl">${brl(r.receber)}</div><div class="f">2ª parcela prevista para 10/12</div></div>
    <div class="card kpi"><div class="l">${ic('deal')}Vendas no ano</div><div class="v tnum" data-n="${r.ano}">${r.ano}</div><div class="f">${brl(r.anoLiq)} em comissões</div></div>
    <div class="card kpi"><div class="l">${ic('inbox')}Contatos novos</div><div class="v tnum" data-n="${nv.length}">${nv.length}</div><div class="f">responda em até 15 min</div></div>
  </div>
  ${nx ? proxCard(nx, falta) : ''}
  <div class="g g2" style="margin-top:20px">
    <div class="card"><div class="hd"><h3>Contatos novos</h3><a class="lnk" href="#/corretor/contatos">Todos ${ic('cr')}</a></div><div class="bd np">
      ${nv.length ? `<ul class="lst">${nv.map(c => { const i = byId(c.imovel); return `<li>${i ? `<img class="th" src="${src(i.fotos[0])}" alt="">` : ''}<div class="tx"><b>${esc(c.nome)} <span style="display:inline;font-weight:600;color:var(--soft);font-size:12px">· ${ha(c.t)}</span></b><span>Ref. ${c.imovel} · “${esc(c.msg)}”</span></div>
        <div class="ac"><a class="btn sm wa" href="${waLink(c.tel, `Olá, ${first(c.nome)}! Aqui é a Carla, da Sunshine Imobiliária. Recebi seu contato sobre o imóvel Ref. ${c.imovel}. Posso te ajudar?`)}" target="_blank" rel="noopener" data-act="wa-lead" data-id="${c.id}">${WA}<span>WhatsApp</span></a></div></li>`; }).join('')}</ul>`
      : `<div class="empty">${ic('check')}Você respondeu todo mundo. Boa!</div>`}
    </div></div>
    <div class="card"><div class="hd"><h3>Próximos compromissos</h3><a class="lnk" href="#/corretor/agenda">Agenda ${ic('cr')}</a></div><div class="bd np agenda">
      ${S.agenda.filter(a => a.t >= Date.now() - 864e5).sort((a, b) => a.t - b.t).slice(0, 4).map(a => evRow(a, true)).join('')}
    </div></div>
  </div>
  <div class="ph-head" style="margin:8px 0 14px"><div><h2 style="font-size:26px">Meus imóveis</h2></div><a class="lnk" href="#/corretor/imoveis">Ver todos ${ic('cr')}</a></div>
  <div class="mycards" style="margin-bottom:20px">${meus.filter(i => i.st !== 'vendido').slice(0, 4).map(pcard).join('')}</div>
  <div class="card"><div class="hd"><h3>Minhas comissões</h3><a class="lnk" href="#/corretor/comissoes">Detalhes ${ic('cr')}</a></div><div class="bd np">${tabComissoes(minhasVendas().slice(0, 4))}</div></div>`;
}
function proxCard(a, falta) {
  const i = byId(a.imovel);
  const cd = falta > 0 && falta < 864e5 ? `<span class="countdown">${ic('clock')}em ${falta >= 36e5 ? Math.floor(falta / 36e5) + 'h' : ''}${String(Math.floor(falta % 36e5 / 6e4)).padStart(falta >= 36e5 ? 2 : 1, '0')}${falta >= 36e5 ? '' : ' min'}</span>` : '';
  return `<div class="card next">
    <div class="im">${i ? `<img src="${src(i.fotos[0])}" alt="">` : ''}</div>
    <div class="bd"><div class="eyebrow">Próxima visita · ${diaLabel(a.t).toLowerCase()}, ${hora(a.t).replace(':00', 'h')} ${cd}</div>
      <h3>${i ? esc((i.titulo.match(/Búzios|Club Tuiuti/) || [i.bairro])[0]) : 'Visita'} · Ref. ${a.imovel}</h3>
      <div class="mt"><span>${ic('user')}${esc(a.contato)}</span><span>${ic('pin')}${esc(a.end)}</span><span>${ic('phone')}${fmtTel(a.tel)}</span></div>
      <div class="bt">${a.st === 'confirmada'
        ? `<span class="ok-tag">${ic('check')}Visita confirmada · ${esc(first(a.contato))} foi avisado</span><button class="btn ghost" data-act="remarcar" data-id="${a.id}">${ic('cal')}Remarcar</button>`
        : `<button class="btn gold" data-act="confirmar-visita" data-id="${a.id}">${ic('check')}Confirmar</button><button class="btn ghost" data-act="remarcar" data-id="${a.id}">${ic('cal')}Remarcar</button>`}
        <a class="btn ghost" href="${waLink(a.tel, `Olá, ${first(a.contato)}! Aqui é a Carla, da Sunshine. Tudo certo para a nossa visita ${diaLabel(a.t).toLowerCase()} às ${hora(a.t)} no imóvel Ref. ${a.imovel}?`)}" target="_blank" rel="noopener">${WA}WhatsApp</a></div>
    </div></div>`;
}
const fmtTel = t => `(${t.slice(2, 4)}) ${t.slice(4, 9)}-${t.slice(9)}`;
function evRow(a, compact) {
  const i = byId(a.imovel), hoje = diaLabel(a.t) === 'Hoje';
  return `<div class="ev ${hoje ? 'today' : ''}"><div class="hr">${hora(a.t)}<small>${compact ? diaLabel(a.t).split(',')[0] : a.tipo}</small></div>
    <div class="tx"><b>${esc(a.contato)} · Ref. ${a.imovel}</b><span>${i ? esc(i.titulo) : ''}</span></div>
    <div class="ac"><span class="st ${a.st === 'confirmada' ? 'confirmada' : 'pendente'}">${a.st === 'confirmada' ? 'Confirmada' : 'A confirmar'}</span>
    ${compact ? '' : `${a.st !== 'confirmada' ? `<button class="btn sm ok" data-act="confirmar-visita" data-id="${a.id}">${ic('check')}Confirmar</button>` : ''}<button class="btn sm ghost" data-act="remarcar" data-id="${a.id}">Remarcar</button><a class="ib wa" href="${waLink(a.tel, `Olá, ${first(a.contato)}! Aqui é a Carla, da Sunshine Imobiliária.`)}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA}</a>`}</div></div>`;
}
function pcard(i) {
  return `<article class="card pc"><div class="im"><img src="${src(i.fotos[0])}" alt="" loading="lazy"><span class="st ${i.st}">${ST[i.st]}</span><span class="ref">Ref. ${i.id}</span></div>
    <div class="bd"><div class="loc">${esc(i.bairro)} · ${i.neg === 'aluguel' ? 'Aluguel' : 'Venda'}</div><h4>${esc(i.titulo)}</h4><div class="pr">${precoTxt(i)}</div>
      <div class="mt"><span>${ic('eye')}${num(i.views)} visitas</span><span>${ic('msg')}${i.leads} contatos</span></div>
      <div class="bt">${i.st === 'vendido' ? '' : i.st === 'pausado'
        ? `<button class="btn sm ghost" data-act="reativar" data-id="${i.id}">${ic('play')}Reativar</button>`
        : `<button class="btn sm ghost" data-act="imovel" data-id="${i.id}">${ic('edit')}Editar</button><button class="btn sm ghost" data-act="pausar" data-id="${i.id}">${ic('pause')}Pausar</button>`}</div>
    </div></article>`;
}

// ---------------------------------------------------------------- corretor › telas
function vMeusImoveis() {
  const meus = S.imoveis.filter(i => i.cor === 'carla'), f = UI.fm;
  return `
  <div class="ph-head"><div><h2>Meus imóveis</h2><p>Os imóveis que estão com você. Para vender, use “Registrar venda”: o Nelson confirma e a comissão é liberada.</p></div>
    <div class="acts"><button class="btn ghost" data-act="registrar">${ic('deal')}Registrar venda</button><a class="btn gold" href="#/publicar">${ic('plus')}Publicar imóvel</a></div></div>
  <div class="filters"><div class="seg">${[['', 'Todos'], ['disponivel', 'Disponíveis'], ['negociacao', 'Em negociação'], ['vendido', 'Vendidos'], ['pausado', 'Pausados']].map(([k, l]) => `<button data-act="fm" data-k="${k}" class="${f === k ? 'on' : ''}">${l}<em>${meus.filter(i => !k || i.st === k).length}</em></button>`).join('')}</div></div>
  <div class="mycards">${meus.filter(i => !f || i.st === f).map(pcard).join('') || `<div class="card empty">${ic('build')}Nenhum imóvel aqui.</div>`}</div>`;
}
function vAgenda() {
  const l = S.agenda.filter(a => a.t >= Date.now() - 864e5 * 1).sort((a, b) => a.t - b.t);
  const dias = [...new Set(l.map(a => diaLabel(a.t)))];
  return `
  <div class="ph-head"><div><h2>Agenda</h2><p>Suas visitas. Ao confirmar ou remarcar, o cliente recebe o aviso pelo WhatsApp.</p></div>
    <div class="acts"><button class="btn" data-act="nova-visita">${ic('plus')}Nova visita</button></div></div>
  <div class="card agenda"><div class="bd np" style="padding-top:0">${dias.map(d => `<div class="day">${d}</div>${l.filter(a => diaLabel(a.t) === d).map(a => evRow(a, false)).join('')}`).join('')}</div></div>`;
}
function tabComissoes(l) {
  return `<div class="tw"><table class="t" style="min-width:560px"><thead><tr><th>Imóvel</th><th>Data</th><th class="num">Venda</th><th class="num">Você recebe</th><th>Situação</th><th></th></tr></thead><tbody>
  ${l.sort((a, b) => b.t - a.t).map(v => { const k = calc(v.valor, v.status === 'pendente' ? S.cfg : v.cfg), pago = v.pago || 0;
    const st = v.status === 'pendente' ? ['pendente', 'Aguardando o Nelson'] : pago >= k.liq - 1 ? ['pago', 'Pago'] : ['negociacao', `A receber ${brl(k.liq - pago)}`];
    return `<tr><td><b>Ref. ${v.ref}</b><div style="font-size:12.5px;color:var(--mut)">${esc(v.bairro)}</div></td><td>${new Date(v.t).toLocaleDateString('pt-BR')}</td><td class="num">${brl(v.valor)}</td><td class="num"><b>${brl(k.liq)}</b></td><td><span class="st ${st[0]}">${st[1]}</span></td><td class="num"><button class="lnk" data-act="calculo" data-id="${v.id}">Ver cálculo</button></td></tr>`; }).join('')}
  </tbody></table></div>`;
}
function vComissoes() {
  const r = resumoCarla(), c = S.cfg;
  return `
  <div class="ph-head"><div><h2>Minhas comissões</h2><p>Quanto você ganhou, quanto falta receber e como cada valor foi calculado.</p></div>
    <div class="acts"><button class="btn" data-act="registrar">${ic('plus')}Registrar venda</button></div></div>
  <div class="kpis k3">
    <div class="card kpi dark"><div class="l">${ic('wallet')}Comissão do mês</div><div class="v tnum" data-n="${Math.round(r.mes)}" data-f="brl">${brl(r.mes)}</div><div class="f">líquida</div></div>
    <div class="card kpi"><div class="l">${ic('clock')}A receber</div><div class="v tnum" data-n="${Math.round(r.receber)}" data-f="brl">${brl(r.receber)}</div><div class="f">prevista para 10/12</div></div>
    <div class="card kpi"><div class="l">${ic('deal')}No ano</div><div class="v tnum" data-n="${Math.round(r.anoLiq)}" data-f="brl">${brl(r.anoLiq)}</div><div class="f">${r.ano} vendas</div></div>
  </div>
  <div class="banner" style="background:#EEF2F7;border-color:var(--line);color:var(--ink)">${ic('info')}<span>Regra atual: comissão de <b>${pct(c.comissao)}</b> · você fica com <b>${pct(100 - c.imob)}</b> · imposto de <b>${pct(c.imposto)}</b> · taxas de <b>${brl(c.taxas)}</b> por venda. Quem define é o administrador.</span></div>
  <div class="card"><div class="hd"><h3>Vendas e comissões</h3></div><div class="bd np">${tabComissoes(minhasVendas())}</div></div>`;
}

// ---------------------------------------------------------------- publicar imóvel (3 passos)
const AMOSTRA = ['1336-1', '1336-2', '1336-3', '1333-3'];
const DITADO = 'Apartamento todo reformado, com sala ampla para dois ambientes e varanda. Cozinha planejada, piso de madeira e muita luz natural. Fica a cinco minutos do metrô, perto de padaria, mercado e escola.';
function novoRascunho() { return { passo: 1, fotos: [], d: { titulo:'', tipo:'Apartamento', neg:'venda', bairro:'', preco:'', m2:'', dorms:2, suites:1, vagas:1, desc:'' }, feito: null }; }
function vPublicar() {
  const P = UI.P || (UI.P = novoRascunho());
  if (P.feito) { const i = byId(P.feito); return `<div class="pub"><div class="card done-box"><div class="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></div>
    <h2>Imóvel publicado!</h2><p>A Ref. ${i.id} já aparece no site da Sunshine e no mapa do painel. Os contatos desse imóvel vão direto para você.</p>
    <div class="bt"><a class="btn" href="#/${isAdmin() ? 'admin/imoveis' : 'corretor/imoveis'}">${ic('build')}Ver ${isAdmin() ? 'imóveis' : 'meus imóveis'}</a><button class="btn ghost" data-act="pub-novo">${ic('plus')}Publicar outro</button></div></div></div>`; }
  const steps = ['Fotos', 'Dados', 'Revisar'];
  return `<div class="pub">
    <div class="stepper">${steps.map((s, k) => `<button data-act="pub-ir" data-k="${k + 1}" class="${P.passo === k + 1 ? 'on' : P.passo > k + 1 ? 'done' : ''}" ${k + 1 > P.passo ? 'disabled' : ''}><i></i><span><em>${k + 1}.</em>${s}</span></button>`).join('')}</div>
    ${P.passo === 1 ? pubFotos(P) : P.passo === 2 ? pubDados(P) : pubRevisar(P)}
  </div>`;
}
function pubFotos(P) {
  const file = `<input type="file" accept="image/*" multiple class="sr" id="pf" data-file>`;
  return `<h2>Fotos do imóvel</h2><p class="lead-t">A primeira foto vira a capa do anúncio. Use as setas para mudar a ordem.</p>
  ${P.fotos.length ? `<div class="photos">${P.fotos.map((f, k) => `<div class="photo ${k === 0 ? 'cover' : ''}"><img src="${src(f)}" alt="Foto ${k + 1}">
      ${k === 0 ? `<span class="cv">${ic('star')}Capa</span>` : ''}
      <div class="ctr">${k > 0 ? `<button class="mk" data-act="pf-capa" data-k="${k}">${ic('star')}Capa</button>` : ''}
        <button data-act="pf-mv" data-k="${k}" data-d="-1" ${k === 0 ? 'disabled' : ''} aria-label="Mover para antes">${ic('cl')}</button>
        <button data-act="pf-mv" data-k="${k}" data-d="1" ${k === P.fotos.length - 1 ? 'disabled' : ''} aria-label="Mover para depois">${ic('cr')}</button>
        <button data-act="pf-rm" data-k="${k}" aria-label="Remover foto">${ic('x')}</button></div></div>`).join('')}
      <label class="add" for="pf">${ic('cam')}Adicionar fotos${file}</label></div>`
  : `<div class="drop0"><div class="ic">${ic('cam')}</div><b>Tire ou escolha as fotos</b><p>No celular, abre a câmera ou a galeria. Pode mandar várias de uma vez.</p>
      <div class="bt"><label class="btn gold lg" for="pf">${ic('cam')}Escolher fotos${file}</label><button class="btn ghost lg" data-act="pf-amostra">${ic('img')}Usar fotos de exemplo</button></div></div>`}
  <div class="hint">${ic('info')}<span>Fotos na horizontal e com luz natural chamam mais atenção. O ideal é ter pelo menos 5.</span></div>
  <div class="pbar"><a class="btn ghost lg" href="#/${home()}">Cancelar</a><button class="btn lg" data-act="pub-ir" data-k="2" ${P.fotos.length ? '' : 'disabled'}>Continuar ${ic('cr')}</button></div>`;
}
function pubDados(P) {
  const d = P.d;
  const stp = (k, l) => `<label class="fld"><span>${l}</span><div class="stp"><button type="button" data-act="stp" data-k="${k}" data-d="-1" aria-label="Menos">−</button><output data-stp="${k}">${d[k]}</output><button type="button" data-act="stp" data-k="${k}" data-d="1" aria-label="Mais">+</button></div></label>`;
  return `<h2>Dados do imóvel</h2><p class="lead-t">Campos grandes, pensados para preencher no celular. A descrição você pode ditar ou pedir para a IA escrever.</p>
  <label class="fld"><span>Título do anúncio</span><input class="inp" data-pd="titulo" value="${esc(d.titulo)}" placeholder="Ex.: Dois dormitórios reformado perto do metrô" maxlength="70"></label>
  <div class="row2">
    <label class="fld"><span>Tipo</span><select class="sel" data-pd="tipo">${['Apartamento', 'Casa', 'Studio', 'Cobertura', 'Sala comercial'].map(t => `<option ${d.tipo === t ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
    <label class="fld"><span>Negócio</span><select class="sel" data-pd="neg"><option value="venda" ${d.neg === 'venda' ? 'selected' : ''}>Venda</option><option value="aluguel" ${d.neg === 'aluguel' ? 'selected' : ''}>Aluguel</option></select></label>
  </div>
  <div class="row2">
    <label class="fld"><span>Bairro</span><select class="sel" data-pd="bairro"><option value="">Escolha…</option>${Object.keys(BAIRROS).map(b => `<option ${d.bairro === b ? 'selected' : ''}>${b}</option>`).join('')}</select></label>
    <label class="fld"><span>${d.neg === 'aluguel' ? 'Aluguel por mês' : 'Preço'}</span><div class="inp-a pre"><i>R$</i><input class="inp tnum" data-pd="preco" value="${d.preco ? num(d.preco) : ''}" inputmode="numeric" placeholder="0"></div></label>
  </div>
  <div class="row2">
    <label class="fld"><span>Área privativa</span><div class="inp-a"><input class="inp tnum" data-pd="m2" value="${esc(d.m2)}" inputmode="numeric" placeholder="0"><i>m²</i></div></label>
    ${stp('dorms', 'Dormitórios')}
  </div>
  <div class="row2">${stp('suites', 'Suítes')}${stp('vagas', 'Vagas')}</div>
  <label class="fld"><span>Descrição</span>
    <div class="tools"><button type="button" class="btn ghost mic" data-act="ditar">${ic('mic')}<span>Ditar por voz</span></button><button type="button" class="btn ghost" data-act="ia">${ic('spark')}<span>Gerar anúncio com IA</span></button></div>
    <textarea class="inp" data-pd="desc" placeholder="Conte o que o imóvel tem de melhor…">${esc(d.desc)}</textarea></label>
  <div class="pbar"><button class="btn ghost lg" data-act="pub-ir" data-k="1" aria-label="Voltar">${ic('cl')}</button><button class="btn lg" data-act="pub-ir" data-k="3">Revisar anúncio ${ic('cr')}</button></div>`;
}
function pubRevisar(P) {
  const d = P.d, z = (BAIRROS[d.bairro] || [])[2] || '';
  return `<h2>Revisar e publicar</h2><p class="lead-t">É assim que o anúncio vai aparecer no site da Sunshine.</p>
  <div class="preview">
    <div class="sitecard"><div class="ph"><img src="${src(P.fotos[0])}" alt=""><span class="bdg">Novo</span><span class="ref">Ref. ${S.nextRef}</span><span class="cnt">${ic('cam')} ${P.fotos.length}</span></div>
      <div class="b"><div class="loc">${esc(d.bairro)} · ${d.neg === 'aluguel' ? 'Aluguel' : 'Venda'}</div><h3>${esc(d.titulo)}</h3>
      <div class="specs"><span>${d.m2 || '—'} m²</span><span>${d.dorms} dorm.</span>${d.suites ? `<span>${d.suites} suíte${d.suites > 1 ? 's' : ''}</span>` : ''}<span>${d.vagas} vaga${d.vagas === 1 ? '' : 's'}</span></div>
      <div class="pr"><span class="tnum">${brl(d.preco)}${d.neg === 'aluguel' ? '<small style="font-size:13px;color:var(--mut)"> /mês</small>' : ''}</span><i>${WA}</i></div></div></div>
    <div>
      <div class="sum"><div><span>Tipo</span><b>${esc(d.tipo)}</b></div><div><span>Região</span><b>${esc(d.bairro)}${z ? ' · ' + z : ''}</b></div>
        <div><span>Fotos</span><b>${P.fotos.length}</b></div><div><span>Responsável</span><b>${user().nome}</b></div></div>
      ${d.desc ? `<p style="font-size:14px;color:var(--mut);margin-bottom:16px;white-space:pre-line">${esc(d.desc.length > 260 ? d.desc.slice(0, 258) + '…' : d.desc)}</p>` : ''}
      <ul class="chk"><li>${ic('check')}Entra no site e no mapa assim que publicar</li><li>${ic('check')}Os contatos desse imóvel chegam direto para ${isAdmin() ? 'você' : 'você, Carla'}</li><li>${ic('check')}Fica no registro de auditoria, com seu nome e horário</li></ul>
    </div>
  </div>
  <div class="pbar"><button class="btn ghost lg" data-act="pub-ir" data-k="2" aria-label="Voltar">${ic('cl')}</button><button class="btn gold lg" data-act="publicar">${ic('globe')}Publicar no site</button></div>`;
}
function bindPublicar() {
  const P = UI.P; if (!P) return;
  $$('[data-pd]').forEach(el => el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => {
    const k = el.dataset.pd;
    if (k === 'preco') { const d = +el.value.replace(/\D/g, '').slice(0, 10); P.d.preco = d || ''; el.value = d ? num(d) : ''; }
    else if (k === 'm2') { el.value = el.value.replace(/\D/g, '').slice(0, 5); P.d.m2 = el.value; }
    else P.d[k] = el.value;
    el.classList.remove('err');
    if (k === 'neg') render(true);
  }));
  const f = $('[data-file]');
  if (f) f.addEventListener('change', async () => {
    const files = [...f.files].slice(0, 12);
    for (const file of files) { try { P.fotos.push(await reduzir(file)); } catch (e) { /* ignora */ } }
    if (files.length) { render(true); toast(files.length === 1 ? 'Foto adicionada' : `${files.length} fotos adicionadas`); }
  });
}
function reduzir(file) {
  return new Promise((ok, err) => {
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => { const s = Math.min(1, 1000 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = im.width * s; c.height = im.height * s;
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', .8)); };
    im.onerror = err; im.src = url;
  });
}
let digitando = null;
function digitar(ta, texto, vel, fim) {
  clearInterval(digitando);
  let k = 0;
  digitando = setInterval(() => {
    k += Math.max(1, Math.round(texto.length / 160));
    ta.value = texto.slice(0, k); ta.scrollTop = ta.scrollHeight;
    if (k >= texto.length) { clearInterval(digitando); digitando = null; UI.P.d.desc = texto; fim && fim(); }
  }, vel);
}
function textoIA(d) {
  const pl = (n, s, p) => `${n} ${n === 1 ? s : p}`;
  const tipo = d.tipo.toLowerCase(), onde = d.bairro || 'São Paulo';
  let t = `${d.tipo} ${d.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${onde}${d.m2 ? `, com ${d.m2} m² de área privativa` : ''}. `;
  t += `São ${pl(d.dorms, 'dormitório', 'dormitórios')}${d.suites ? `, sendo ${pl(d.suites, 'suíte', 'suítes')}` : ''}, e ${d.vagas ? pl(d.vagas, 'vaga', 'vagas') + ' de garagem' : 'sem vaga de garagem'}.\n\n`;
  t += (d.desc && !d.desc.startsWith(d.tipo) ? d.desc.trim() + '\n\n' : `Ambientes bem iluminados e prontos para morar, num ${tipo === 'casa' ? 'endereço tranquilo' : 'prédio bem cuidado'}, com comércio, transporte e serviços por perto.\n\n`);
  t += `Agende sua visita com a Sunshine Imobiliária pelo WhatsApp. Atendimento direto com o corretor responsável.`;
  return t;
}

// ---------------------------------------------------------------- modais de ação
function modalVender(i) {
  modal({ title: 'Marcar como vendido', sub: `Ref. ${i.id} · ${esc(i.titulo)}`,
    body: `<label class="fld"><span>Valor da venda</span><div class="inp-a pre"><i>R$</i><input class="inp tnum" id="mv-v" value="${num(i.preco)}" inputmode="numeric"></div></label>
      <label class="fld"><span>Comprador</span><input class="inp" id="mv-c" placeholder="Nome do comprador"></label>
      <div style="background:var(--bg);border-radius:12px;padding:4px 14px" id="mv-f">${flowHtml(i.preco, S.cfg)}</div>
      <p class="lock" style="margin-top:12px">${ic('info')}A venda entra já confirmada (feita pelo administrador) e o imóvel sai do site.</p>`,
    foot: `<button class="btn ghost" data-close>Cancelar</button><button class="btn ok" id="mv-ok">${ic('check')}Confirmar venda</button>` }, ov => {
    const inp = $('#mv-v', ov);
    inp.addEventListener('input', () => { const d = +inp.value.replace(/\D/g, '').slice(0, 10); inp.value = d ? num(d) : ''; $('#mv-f', ov).innerHTML = flowHtml(d, S.cfg); });
    $('#mv-ok', ov).addEventListener('click', () => {
      const v = +inp.value.replace(/\D/g, ''); if (!v) { inp.classList.add('err'); return; }
      const comp = $('#mv-c', ov).value.trim() || 'Não informado';
      i.st = 'vendido';
      S.vendas.push({ id: S.nextId++, ref: i.id, titulo: i.titulo, bairro: i.bairro, cor: i.cor, valor: v, comprador: comp, t: Date.now(), status: 'confirmada', cfg: { ...S.cfg }, pago: 0, conf: Date.now() });
      log('Marcou como vendido', `Ref. ${i.id}`, `${brl(v)} · corretor ${cor(i.cor).nome} · comprador ${comp}`, 'venda');
      closeModal(); render(true); toast(`Ref. ${i.id} marcada como vendida`, `Comissão de ${cor(i.cor).nome}: ${brl(calc(v, S.cfg).liq)} líquido`);
    });
  });
}
function modalImovel(i) {
  const adm = isAdmin();
  modal({ title: `Ref. ${i.id}`, sub: esc(i.titulo), wide: true,
    body: `<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:16px">${i.fotos.slice(0, 3).map(f => `<img src="${src(f)}" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px">`).join('')}</div>
      <div class="sum" style="margin-top:0"><div><span>Preço</span><b>${precoTxt(i)}</b></div><div><span>Status</span><b><span class="st ${i.st}">${ST[i.st]}</span></b></div>
      <div><span>Bairro</span><b>${esc(i.bairro)}</b></div><div><span>Área · dorms · vagas</span><b>${i.m2} m² · ${i.dorms} · ${i.vagas}</b></div>
      <div><span>Visitas no anúncio</span><b>${num(i.views)}</b></div><div><span>Contatos</span><b>${i.leads}</b></div></div>
      ${adm && i.st !== 'vendido' ? `<label class="fld"><span>Corretor responsável</span><select class="sel" id="mi-cor" style="width:100%">${S.corretores.filter(c => c.ativo).map(c => `<option value="${c.id}" ${c.id === i.cor ? 'selected' : ''}>${esc(c.nome)}</option>`).join('')}</select></label>` : ''}
      ${!adm && i.st !== 'vendido' ? `<label class="fld"><span>Situação</span><select class="sel" id="mi-st" style="width:100%"><option value="disponivel" ${i.st === 'disponivel' ? 'selected' : ''}>Disponível</option><option value="negociacao" ${i.st === 'negociacao' ? 'selected' : ''}>Em negociação</option></select></label><p class="lock">${ic('info')}Para vender, use “Registrar venda”: o administrador confirma.</p>` : ''}`,
    foot: `${SITE_IDS.has(i.id) ? `<a class="btn ghost" href="../#/imovel/${i.id}" target="_blank" rel="noopener">${ic('ext')}Ver no site</a>` : ''}${i.st !== 'vendido' ? `<button class="btn" id="mi-ok">${ic('check')}Salvar</button>` : '<button class="btn" data-close>Fechar</button>'}` }, ov => {
    const ok = $('#mi-ok', ov); if (!ok) return;
    ok.addEventListener('click', () => {
      const c = $('#mi-cor', ov), s = $('#mi-st', ov);
      if (c && c.value !== i.cor) { log('Trocou o corretor', `Ref. ${i.id}`, `${cor(i.cor).nome} → ${cor(c.value).nome}`, 'imovel'); i.cor = c.value; }
      if (s && s.value !== i.st) { log('Mudou a situação', `Ref. ${i.id}`, `${ST[i.st]} → ${ST[s.value]}`, 'imovel'); i.st = s.value; }
      save(); closeModal(); render(true); toast('Alterações salvas');
    });
  });
}
function modalRegistrar() {
  const adm = isAdmin();
  const ops = S.imoveis.filter(i => i.st !== 'vendido' && i.st !== 'pausado' && i.neg === 'venda' && (adm || i.cor === 'carla'));
  modal({ title: 'Registrar venda', sub: adm ? 'Registra em nome do corretor. Depois é só confirmar.' : 'O Nelson recebe um aviso para confirmar. A comissão é liberada depois disso.',
    body: `<label class="fld"><span>Imóvel</span><select class="sel" id="rv-i" style="width:100%">${ops.map(i => `<option value="${i.id}">Ref. ${i.id} · ${esc(i.bairro)} · ${brl(i.preco)}</option>`).join('')}</select></label>
      ${adm ? `<label class="fld"><span>Corretor</span><select class="sel" id="rv-c" style="width:100%">${S.corretores.filter(c => c.ativo).map(c => `<option value="${c.id}">${esc(c.nome)}</option>`).join('')}</select></label>` : ''}
      <div class="row2"><label class="fld"><span>Valor fechado</span><div class="inp-a pre"><i>R$</i><input class="inp tnum" id="rv-v" inputmode="numeric"></div></label>
      <label class="fld"><span>Comprador</span><input class="inp" id="rv-n" placeholder="Nome"></label></div>
      <div style="background:var(--bg);border-radius:12px;padding:12px 14px;display:flex;justify-content:space-between;gap:10px;font-size:14px;flex-wrap:wrap"><span>Comissão do corretor (líquida)</span><b id="rv-l" class="tnum"></b></div>`,
    foot: `<button class="btn ghost" data-close>Cancelar</button><button class="btn" id="rv-ok">${ic('check')}Registrar</button>` }, ov => {
    const si = $('#rv-i', ov), sv = $('#rv-v', ov), sc = $('#rv-c', ov);
    const upd = () => { $('#rv-l', ov).textContent = brl(calc(+sv.value.replace(/\D/g, '') || 0, S.cfg).liq); };
    const pre = () => { const i = byId(si.value); if (i) { sv.value = num(i.preco); if (sc) sc.value = i.cor; } upd(); };
    si.addEventListener('change', pre); pre();
    sv.addEventListener('input', () => { const d = +sv.value.replace(/\D/g, '').slice(0, 10); sv.value = d ? num(d) : ''; upd(); });
    $('#rv-ok', ov).addEventListener('click', () => {
      const i = byId(si.value), v = +sv.value.replace(/\D/g, ''); if (!i || !v) { sv.classList.add('err'); return; }
      const c = sc ? sc.value : 'carla', n = $('#rv-n', ov).value.trim() || 'Não informado';
      S.vendas.push({ id: S.nextId++, ref: i.id, titulo: i.titulo, bairro: i.bairro, cor: c, valor: v, comprador: n, t: Date.now(), status: 'pendente', cfg: { ...S.cfg }, pago: 0 });
      i.st = 'negociacao';
      log('Registrou a venda', `Ref. ${i.id}`, `${brl(v)} · comprador ${n} · aguardando confirmação`, 'venda');
      closeModal(); render(true);
      toast('Venda registrada', adm ? 'Está em “Aguardando confirmação”.' : 'Aguardando a confirmação do Nelson.');
    });
  });
}
function modalCalculo(v) {
  modal({ title: `Cálculo · Ref. ${v.ref}`, sub: `${esc(cor(v.cor).nome)} · ${new Date(v.t).toLocaleDateString('pt-BR')} · regra ${v.status === 'pendente' ? 'atual' : 'da época da venda'}`,
    body: flowHtml(v.valor, v.status === 'pendente' ? S.cfg : v.cfg), foot: '<button class="btn" data-close>Fechar</button>' });
}
function modalRemarcar(a) {
  const hj = new Date(); hj.setHours(0, 0, 0, 0);
  const dias = Array.from({ length: 5 }, (_, k) => hj.getTime() + (k + 1) * 864e5);
  const slots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  let dia = dias[0], sl = '10:00';
  modal({ title: 'Remarcar visita', sub: `${esc(a.contato)} · Ref. ${a.imovel}`,
    body: `<div class="days">${dias.map((d, k) => { const x = new Date(d); return `<button data-d="${d}" class="${k === 0 ? 'on' : ''}">${x.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}<b>${x.getDate()}</b></button>`; }).join('')}</div>
      <div class="slots">${slots.map(s => `<button data-s="${s}" class="${s === sl ? 'on' : ''}">${s}</button>`).join('')}</div>
      <p class="lock" style="margin-top:14px">${WA.replace('<svg', '<svg style="width:15px;height:15px;color:#1EA952"')}${esc(first(a.contato))} recebe o novo horário pelo WhatsApp.</p>`,
    foot: `<button class="btn ghost" data-close>Cancelar</button><button class="btn" id="rm-ok">${ic('cal')}Remarcar</button>` }, ov => {
    ov.addEventListener('click', e => {
      const d = e.target.closest('[data-d]'), s = e.target.closest('[data-s]');
      if (d) { dia = +d.dataset.d; $$('[data-d]', ov).forEach(b => b.classList.toggle('on', b === d)); }
      if (s) { sl = s.dataset.s; $$('[data-s]', ov).forEach(b => b.classList.toggle('on', b === s)); }
    });
    $('#rm-ok', ov).addEventListener('click', () => {
      const [h, m] = sl.split(':').map(Number); a.t = dia + h * 36e5 + m * 6e4; a.st = 'pendente';
      log('Remarcou a visita', a.contato, `Ref. ${a.imovel} · ${diaLabel(a.t).toLowerCase()} às ${sl}`, 'contato');
      closeModal(); render(true); toast(`Visita remarcada: ${diaLabel(a.t).toLowerCase()} às ${sl}`, `${esc(first(a.contato))} recebe o aviso no WhatsApp.`);
    });
  });
}
function modalNovaVisita() {
  const cs = S.contatos.filter(c => c.cor === 'carla' && c.etapa !== 'fechado');
  const hj = new Date(); hj.setHours(0, 0, 0, 0);
  const dias = Array.from({ length: 5 }, (_, k) => hj.getTime() + (k + 1) * 864e5);
  modal({ title: 'Nova visita', sub: 'O cliente recebe a confirmação pelo WhatsApp.',
    body: `<label class="fld"><span>Cliente</span><select class="sel" id="nv-c" style="width:100%">${cs.map(c => `<option value="${c.id}">${esc(c.nome)} · Ref. ${c.imovel}</option>`).join('')}</select></label>
      <div class="row2"><label class="fld"><span>Dia</span><select class="sel" id="nv-d" style="width:100%">${dias.map(d => `<option value="${d}">${diaLabel(d)}</option>`).join('')}</select></label>
      <label class="fld"><span>Horário</span><select class="sel" id="nv-h" style="width:100%">${['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(s => `<option>${s}</option>`).join('')}</select></label></div>`,
    foot: `<button class="btn ghost" data-close>Cancelar</button><button class="btn" id="nv-ok">${ic('plus')}Agendar</button>` }, ov => {
    $('#nv-ok', ov).addEventListener('click', () => {
      const c = S.contatos.find(x => x.id === +$('#nv-c', ov).value), [h, m] = $('#nv-h', ov).value.split(':').map(Number), i = byId(c.imovel);
      const a = { id: Date.now(), tipo: 'Visita', imovel: c.imovel, contato: c.nome, tel: c.tel, t: +$('#nv-d', ov).value + h * 36e5 + m * 6e4, st: 'pendente', end: i ? i.bairro : '' };
      S.agenda.push(a); if (['novo', 'atendimento'].includes(c.etapa)) c.etapa = 'visita';
      log('Agendou uma visita', c.nome, `Ref. ${c.imovel} · ${diaLabel(a.t).toLowerCase()} às ${hora(a.t)}`, 'contato');
      closeModal(); render(true); toast('Visita agendada', `${esc(first(c.nome))} recebe a confirmação no WhatsApp.`);
    });
  });
}
function modalMais() {
  const nav = NAV[S.perfil], p = path(), u = user();
  modal({ title: 'Menu', sub: `${u.nome} · ${u.papel}`,
    body: `<nav class="nav" style="margin:-4px -8px">${nav.filter(n => !n.sec).map(n => `<a href="#/${n.p}" class="${n.p === p ? 'on' : ''}" style="color:var(--ink)${n.p === p ? ';background:var(--bg)' : ''}">${ic(n.i)}<span>${n.l}</span>${n.cnt && n.cnt() ? `<span class="cnt">${n.cnt()}</span>` : ''}</a>`).join('')}</nav>
      <div style="border-top:1px solid var(--line);margin-top:12px;padding-top:12px;display:grid;gap:8px">
        <button class="btn ghost block" data-act="reset">${ic('refresh')}Restaurar dados de exemplo</button>
        <button class="btn ghost block" data-act="sair">${ic('out')}Sair</button></div>` });
}

// ---------------------------------------------------------------- ações (clique)
const ACT = {
  lperfil: el => { S.perfil = el.dataset.p; save(); render(); },
  perfil: el => {
    if (S.perfil === el.dataset.p) return;
    S.perfil = el.dataset.p; save(); closeModal();
    toast(`Agora você está como ${user().nome}`, isAdmin() ? 'Administrador: vê toda a imobiliária.' : 'Corretora: vê só o que é dela.');
    go(home());
  },
  sair: () => { S.logado = false; save(); closeModal(); location.hash = '#/'; render(); },
  mais: () => modalMais(),
  avisos: () => toast(isAdmin() ? `${S.vendas.filter(v => v.status === 'pendente').length} venda(s) aguardando confirmação` : '3 contatos novos esperando resposta', 'Os avisos também chegam pelo WhatsApp.', true),
  exportar: () => toast('Relatório gerado', 'No sistema real, sai em PDF e planilha.'),
  reset: () => modal({ title: 'Restaurar dados de exemplo?', sub: 'Volta tudo como estava no início da demonstração (só neste navegador).',
    foot: '<button class="btn ghost" data-close>Cancelar</button><button class="btn" data-act="reset-ok">Restaurar</button>' }),
  'reset-ok': () => { const p = S.perfil; S = seed(); S.logado = true; S.perfil = p; UI.P = null; UI.cfgDraft = null; save(); closeModal(); go(home()); toast('Dados de exemplo restaurados'); },
  'fi-st': el => { UI.fi.st = el.dataset.k; render(true); },
  'fa-k': el => { UI.fa.k = el.dataset.k; render(true); },
  fm: el => { UI.fm = el.dataset.k; render(true); },
  imovel: el => modalImovel(byId(el.dataset.id)),
  vender: el => modalVender(byId(el.dataset.id)),
  pausar: el => { const i = byId(el.dataset.id); i.st = 'pausado'; log('Pausou o anúncio', `Ref. ${i.id}`, `${i.titulo} · sai do site, continua no histórico`, 'imovel'); render(true); toast(`Ref. ${i.id} pausada`, 'Saiu do site. Dá para reativar quando quiser.'); },
  reativar: el => { const i = byId(el.dataset.id); i.st = 'disponivel'; log('Reativou o anúncio', `Ref. ${i.id}`, i.titulo, 'imovel'); render(true); toast(`Ref. ${i.id} de volta no site`); },
  carteira: el => { UI.fi = { q: '', st: '', cor: el.dataset.id }; go('admin/imoveis'); },
  senha: el => { const c = cor(el.dataset.id); log('Redefiniu a senha', c.nome, 'Link de nova senha enviado por e-mail', 'acesso'); toast(`Link de nova senha enviado para ${esc(c.nome)}`, 'A senha antiga deixa de funcionar.'); },
  ativo: el => { const c = cor(el.dataset.id); c.ativo = !c.ativo; log(c.ativo ? 'Reativou o acesso' : 'Desativou o acesso', c.nome, c.ativo ? 'Pode entrar no sistema de novo' : 'Login bloqueado · histórico mantido', 'acesso'); render(true); toast(c.ativo ? `Acesso de ${esc(c.nome)} reativado` : `Acesso de ${esc(c.nome)} desativado`, c.ativo ? '' : 'Nada do que ele(a) fez foi apagado.'); },
  convidar: () => modal({ title: 'Convidar corretor', sub: 'Ele recebe um link para criar a própria senha.',
    body: `<label class="fld"><span>Nome</span><input class="inp" id="cv-n" placeholder="Nome do corretor"></label><label class="fld"><span>E-mail</span><input class="inp" id="cv-e" type="email" placeholder="nome@email.com"></label><label class="fld"><span>WhatsApp</span><input class="inp" id="cv-w" inputmode="tel" placeholder="(11) 9…"></label>`,
    foot: '<button class="btn ghost" data-close>Cancelar</button><button class="btn" data-act="convidar-ok">Enviar convite</button>' }),
  'convidar-ok': () => {
    const n = $('#cv-n').value.trim(); if (!n) { $('#cv-n').classList.add('err'); return; }
    S.corretores.push({ id: 'c' + Date.now(), nome: n, papel: 'Corretor(a)', tel: $('#cv-w').value, desde: new Date().getFullYear(), contatos: 0, resp: '—', ativo: true, av: 'c2' });
    log('Convidou um corretor', n, 'Convite enviado por e-mail e WhatsApp', 'acesso'); closeModal(); render(true); toast(`Convite enviado para ${esc(n)}`);
  },
  'lead-mv': el => { const c = S.contatos.find(x => x.id === +el.dataset.id), k = ETAPAS.findIndex(e => e.k === c.etapa) + +el.dataset.d; if (ETAPAS[k]) moverLead(c.id, ETAPAS[k].k); },
  'wa-lead': el => { const c = S.contatos.find(x => x.id === +el.dataset.id); if (c && c.etapa === 'novo') { c.etapa = 'atendimento'; log('Respondeu pelo WhatsApp', c.nome, `Ref. ${c.imovel} · Novo → Em atendimento`, 'contato'); setTimeout(() => render(true), 400); } },
  registrar: () => modalRegistrar(),
  confirmar: el => {
    const v = S.vendas.find(x => x.id === +el.dataset.id); v.status = 'confirmada'; v.cfg = { ...S.cfg }; v.conf = Date.now();
    const i = byId(v.ref); if (i) i.st = 'vendido';
    const c = S.contatos.find(x => x.imovel === v.ref && x.etapa === 'proposta'); if (c) c.etapa = 'fechado';
    log('Confirmou a venda', `Ref. ${v.ref}`, `${brl(v.valor)} · ${cor(v.cor).nome} recebe ${brl(calc(v.valor, v.cfg).liq)}`, 'venda');
    render(true); toast(`Venda da Ref. ${v.ref} confirmada`, `Comissão de ${esc(cor(v.cor).nome)} liberada: ${brl(calc(v.valor, v.cfg).liq)}`);
  },
  ajuste: el => { const v = S.vendas.find(x => x.id === +el.dataset.id); log('Pediu ajuste na venda', `Ref. ${v.ref}`, `Devolvida para ${cor(v.cor).nome} revisar os dados`, 'venda'); toast(`Pedido de ajuste enviado para ${esc(cor(v.cor).nome)}`, 'A venda continua aguardando.', true); },
  calculo: el => modalCalculo(S.vendas.find(x => x.id === +el.dataset.id)),
  'cfg-salvar': () => {
    const c = UI.cfgDraft, old = S.cfg, nomes = { comissao: 'Comissão', imob: 'Imobiliária', imposto: 'Imposto', taxas: 'Taxas' };
    const mud = Object.keys(nomes).filter(k => +c[k] !== +old[k]).map(k => `${nomes[k]}: ${k === 'taxas' ? brl(old[k]) : pct(old[k])} → ${k === 'taxas' ? brl(c[k]) : pct(c[k])}`);
    S.cfg = { ...c };
    if (!mud.length) { save(); toast('Nada mudou', 'As regras continuam as mesmas.', true); return; }
    log('Alterou as configurações', 'Comissões', mud.join(' · '), 'cfg'); render(true); toast('Configurações salvas', 'Valem para as próximas vendas.');
  },
  'cfg-padrao': () => { UI.cfgDraft = { ...CFG0 }; render(true); toast('Valores padrão carregados', 'Clique em salvar para aplicar.', true); },
  'confirmar-visita': el => { const a = S.agenda.find(x => x.id === +el.dataset.id); a.st = 'confirmada'; log('Confirmou a visita', a.contato, `Ref. ${a.imovel} · ${diaLabel(a.t).toLowerCase()} às ${hora(a.t)}`, 'contato'); render(true); toast('Visita confirmada', `${esc(first(a.contato))} recebeu a confirmação no WhatsApp.`); },
  remarcar: el => modalRemarcar(S.agenda.find(x => x.id === +el.dataset.id)),
  'nova-visita': () => modalNovaVisita(),
  // publicar
  'pf-amostra': () => { UI.P.fotos = [...AMOSTRA]; render(true); },
  'pf-capa': el => { const f = UI.P.fotos.splice(+el.dataset.k, 1)[0]; UI.P.fotos.unshift(f); render(true); toast('Nova capa definida'); },
  'pf-mv': el => { const k = +el.dataset.k, j = k + +el.dataset.d, f = UI.P.fotos; [f[k], f[j]] = [f[j], f[k]]; render(true); },
  'pf-rm': el => { UI.P.fotos.splice(+el.dataset.k, 1); render(true); },
  stp: el => { const k = el.dataset.k, d = UI.P.d, max = { dorms: 9, suites: 9, vagas: 9 }[k]; d[k] = Math.max(0, Math.min(max, d[k] + +el.dataset.d)); if (k === 'suites') d.suites = Math.min(d.suites, d.dorms); $(`[data-stp="${k}"]`).textContent = d[k]; if (k === 'dorms' && d.suites > d.dorms) { d.suites = d.dorms; $('[data-stp="suites"]').textContent = d.suites; } },
  'pub-ir': el => {
    const k = +el.dataset.k, P = UI.P;
    if (k === 3 && P.passo === 2) {
      const falta = ['titulo', 'bairro', 'preco'].filter(f => !P.d[f]);
      if (falta.length) { falta.forEach(f => $(`[data-pd="${f}"]`).classList.add('err')); toast('Faltam alguns dados', 'Preencha título, bairro e preço.', true); $(`[data-pd="${falta[0]}"]`).focus(); return; }
    }
    clearInterval(digitando); P.passo = k; render();
  },
  ditar: el => {
    const ta = $('[data-pd="desc"]');
    if (el.classList.contains('on')) { clearInterval(digitando); el.classList.remove('on'); el.innerHTML = `${ic('mic')}<span>Ditar por voz</span>`; UI.P.d.desc = ta.value; return; }
    el.classList.add('on'); el.innerHTML = `<span class="wave"><i></i><i></i><i></i><i></i></span><span>Ouvindo… toque para parar</span>`;
    const base = ta.value ? ta.value.trim() + ' ' : '';
    setTimeout(() => { if (!el.classList.contains('on')) return; digitar(ta, base + DITADO, 28, () => { el.classList.remove('on'); el.innerHTML = `${ic('mic')}<span>Ditar por voz</span>`; toast('Texto ditado', 'Revise e ajuste se precisar.'); }); }, 700);
  },
  ia: el => {
    const ta = $('[data-pd="desc"]'), P = UI.P; UI.P.d.desc = ta.value;
    el.disabled = true; el.innerHTML = `${ic('spark')}<span>Escrevendo…</span>`; ta.classList.add('shimmer');
    setTimeout(() => {
      ta.classList.remove('shimmer');
      if (!P.d.titulo) { const t = `${P.d.tipo} com ${P.d.dorms} dorm.${P.d.bairro ? ' em ' + P.d.bairro : ''}`; P.d.titulo = t; $('[data-pd="titulo"]').value = t; }
      digitar(ta, textoIA(P.d), 12, () => { el.disabled = false; el.innerHTML = `${ic('spark')}<span>Gerar de novo</span>`; toast('Anúncio gerado', 'Texto de exemplo: no sistema real, a IA usa os dados e as fotos.'); });
    }, 1300);
  },
  publicar: el => {
    const P = UI.P, d = P.d, b = BAIRROS[d.bairro] || BAIRROS['Centro'];
    el.disabled = true; el.innerHTML = '<span class="wave"><i></i><i></i><i></i><i></i></span>Publicando…';
    setTimeout(() => {
      const id = String(S.nextRef++);
      S.imoveis.unshift({ id, neg: d.neg, tipo: d.tipo, titulo: d.titulo, bairro: d.bairro, zona: b[2], preco: +d.preco, m2: +d.m2 || 0, dorms: d.dorms, suites: d.suites, vagas: d.vagas, fotos: [...P.fotos],
        lat: b[0] + (Math.random() - .5) * .008, lng: b[1] + (Math.random() - .5) * .008, st: 'disponivel', cor: user().id, views: 0, leads: 0, desc: d.desc });
      log('Publicou o imóvel', `Ref. ${id}`, `${d.titulo} · ${brl(d.preco)} · ${P.fotos.length} fotos`, 'imovel');
      P.feito = id; render(); toast(`Ref. ${id} publicada no site`);
    }, 1000);
  },
  'pub-novo': () => { UI.P = novoRascunho(); render(); },
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el || !ACT[el.dataset.act]) return;
  if (el.tagName !== 'A') e.preventDefault();
  ACT[el.dataset.act](el, e);
});
document.addEventListener('submit', e => {
  if (e.target.dataset.form === 'login') { e.preventDefault(); S.logado = true; log('Entrou no sistema', '', 'Login com e-mail e senha', 'acesso'); go(home()); toast(`Bem-vindo, ${user().nome}`); }
});
document.addEventListener('input', e => {
  const k = e.target.dataset.in;
  if (k === 'fi-q') { UI.fi.q = e.target.value; $('#ilist').innerHTML = listaImoveis(); }
  if (k === 'fa-q') { UI.fa.q = e.target.value; $('#alist').innerHTML = listaAudit(); }
});
document.addEventListener('change', e => {
  const k = e.target.dataset.ch;
  if (k === 'fi-cor') { UI.fi.cor = e.target.value; render(true); }
  if (k === 'fc') { UI.fc = e.target.value; render(true); }
});
// arrastar contatos entre etapas (desktop)
document.addEventListener('dragstart', e => { const l = e.target.closest && e.target.closest('[data-lead]'); if (l) { e.dataTransfer.setData('text/plain', l.dataset.lead); l.classList.add('drag'); } });
document.addEventListener('dragend', e => { const l = e.target.closest && e.target.closest('[data-lead]'); if (l) l.classList.remove('drag'); $$('.col.drop').forEach(c => c.classList.remove('drop')); });
document.addEventListener('dragover', e => { const c = e.target.closest && e.target.closest('[data-drop]'); if (c) { e.preventDefault(); $$('.col.drop').forEach(x => x !== c && x.classList.remove('drop')); c.classList.add('drop'); } });
document.addEventListener('drop', e => { const c = e.target.closest && e.target.closest('[data-drop]'); if (c) { e.preventDefault(); moverLead(e.dataTransfer.getData('text/plain'), c.dataset.drop); } });

render();
