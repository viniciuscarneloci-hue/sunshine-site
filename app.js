/* Sunshine Imobiliária — protótipo do site do comprador.
   Tudo em memória, sem servidor. Imóveis, corretores e números são de exemplo. */

// ---------------------------------------------------------------- dados
const CORRETORES = {
  carla:   { nome: 'Carla',   cor: '#2F7FC1', creci: '000001-F' },
  rafael:  { nome: 'Rafael',  cor: '#B86E0B', creci: '000002-F' },
  juliana: { nome: 'Juliana', cor: '#22A55B', creci: '000003-F' },
  nelson:  { nome: 'Nelson',  cor: '#16223F', creci: '000004-F' },
};

const PALETA = ['#9DB9D9', '#CBA676', '#A9C8A6', '#D8B98E', '#B4C3DD', '#E2CBA6', '#B9D3B5'];
const FUNDO  = { '#9DB9D9':'#DDE8F4', '#CBA676':'#F2E6D2', '#A9C8A6':'#DDEBDB', '#D8B98E':'#F4EAD9', '#B4C3DD':'#E5EBF4', '#E2CBA6':'#F6EEDF', '#B9D3B5':'#E4EFE2' };

// x/y = posição em % no mapa ilustrativo
const IMOVEIS = [
  { id:'1343', titulo:'Apartamento no Condomínio Búzios', tipo:'Apartamento', neg:'venda', preco:820000, bairro:'Vila Clementino', m2:75, dorms:2, suites:1, vagas:1, cond:1100, iptu:300, cor:0, corretor:'carla', tag:'Novo', fotos:24, x:47, y:42,
    desc:'Apartamento iluminado, com suíte e vaga, a poucos minutos do metrô Santa Cruz. Sala para dois ambientes com sacada, cozinha planejada e área de serviço separada. Condomínio com piscina, academia e portaria 24 horas.' },
  { id:'1342', titulo:'Apartamento no Club Tuiuti', tipo:'Apartamento', neg:'venda', preco:1312000, bairro:'Tatuapé', m2:93, dorms:3, suites:1, vagas:2, cond:1350, iptu:420, cor:2, corretor:'rafael', tag:'Destaque', fotos:31, x:80, y:22,
    desc:'Três dormitórios com suíte, varanda gourmet e duas vagas. Condomínio clube com lazer completo, perto do Parque do Piqueri e do metrô Tatuapé.' },
  { id:'1338', titulo:'Apartamento reformado no Tatuapé', tipo:'Apartamento', neg:'venda', preco:926000, bairro:'Tatuapé', m2:68, dorms:2, suites:1, vagas:1, cond:780, iptu:260, cor:1, corretor:'juliana', tag:'', fotos:18, x:73, y:34,
    desc:'Reformado em 2025, com piso vinílico, iluminação embutida e cozinha integrada. Rua tranquila, a 6 minutos a pé do Shopping Metrô Tatuapé.' },
  { id:'1275', titulo:'Apartamento no Condomínio Búzios', tipo:'Apartamento', neg:'venda', preco:860000, bairro:'Vila Mariana', m2:98, dorms:3, suites:1, vagas:2, cond:1250, iptu:380, cor:3, corretor:'carla', tag:'', fotos:22, x:56, y:58,
    desc:'Planta ampla com três dormitórios, sendo uma suíte, e duas vagas. A uma quadra da Rua Domingos de Morais, com comércio, escolas e metrô Vila Mariana por perto.' },
  { id:'1301', titulo:'Apartamento em Moema', tipo:'Apartamento', neg:'venda', preco:1050000, bairro:'Moema', m2:88, dorms:2, suites:2, vagas:2, cond:1480, iptu:510, cor:2, corretor:'carla', tag:'', fotos:20, x:28, y:72,
    desc:'Duas suítes, varanda com vista livre e duas vagas. A poucos passos do Parque Ibirapuera e do metrô Moema.' },
  { id:'1290', titulo:'Apartamento perto do metrô Ana Rosa', tipo:'Apartamento', neg:'venda', preco:945000, bairro:'Vila Mariana', m2:80, dorms:2, suites:1, vagas:1, cond:950, iptu:330, cor:4, corretor:'rafael', tag:'', fotos:16, x:36, y:24,
    desc:'Andar alto, sol da manhã e vista aberta. Prédio com elevador novo e salão de festas.' },
  { id:'1288', titulo:'Apartamento na Saúde', tipo:'Apartamento', neg:'venda', preco:780000, bairro:'Saúde', m2:70, dorms:2, suites:0, vagas:1, cond:690, iptu:210, cor:5, corretor:'juliana', tag:'Baixou o preço', fotos:14, x:66, y:78,
    desc:'Dois dormitórios, sala com sacada e uma vaga. Perto do metrô Praça da Árvore.' },
  { id:'1350', titulo:'Studio na Vila Clementino', tipo:'Studio', neg:'venda', preco:690000, bairro:'Vila Clementino', m2:42, dorms:1, suites:1, vagas:1, cond:620, iptu:180, cor:0, corretor:'nelson', tag:'Novo', fotos:12, x:44, y:56,
    desc:'Studio mobiliado, ideal para morar ou investir. Ao lado do Hospital São Paulo e da Unifesp.' },
  { id:'1270', titulo:'Casa térrea em Moema', tipo:'Casa', neg:'venda', preco:1850000, bairro:'Moema', m2:160, dorms:3, suites:1, vagas:3, cond:0, iptu:640, cor:6, corretor:'nelson', tag:'', fotos:27, x:18, y:48,
    desc:'Casa térrea com quintal, churrasqueira e três vagas. Rua arborizada, sem saída.' },
  { id:'L201', titulo:'Apartamento para alugar na Vila Mariana', tipo:'Apartamento', neg:'aluguel', preco:4500, bairro:'Vila Mariana', m2:65, dorms:2, suites:1, vagas:1, cond:850, iptu:120, cor:4, corretor:'carla', tag:'Novo', fotos:15, x:52, y:30,
    desc:'Pronto para morar, com armários planejados. Aceita pet. A 5 minutos do metrô.' },
  { id:'L202', titulo:'Apartamento para alugar no Tatuapé', tipo:'Apartamento', neg:'aluguel', preco:3200, bairro:'Tatuapé', m2:48, dorms:1, suites:0, vagas:1, cond:540, iptu:80, cor:1, corretor:'juliana', tag:'', fotos:11, x:86, y:44,
    desc:'Um dormitório, varanda e vaga coberta. Condomínio com piscina e academia.' },
  { id:'L203', titulo:'Sala comercial em Moema', tipo:'Comercial', neg:'aluguel', preco:7800, bairro:'Moema', m2:110, dorms:0, suites:0, vagas:3, cond:1900, iptu:400, cor:3, corretor:'rafael', tag:'', fotos:9, x:24, y:86,
    desc:'Sala de esquina com recepção, três salas e copa. Prédio com portaria e estacionamento para visitantes.' },
];

const BAIRROS = ['Vila Clementino', 'Vila Mariana', 'Moema', 'Tatuapé', 'Saúde'];
const TIPOS = ['Apartamento', 'Casa', 'Studio', 'Comercial'];
const FAIXAS = { venda:[[0,'Qualquer preço'],[800000,'R$ 800 mil'],[1000000,'R$ 1 milhão'],[1500000,'R$ 1,5 milhão'],[2000000,'R$ 2 milhões']],
                 aluguel:[[0,'Qualquer preço'],[3500,'R$ 3.500'],[5000,'R$ 5.000'],[8000,'R$ 8.000']] };

// estado da busca (compartilhado entre início, lista e mapa)
const busca = { neg:'venda', bairro:'', tipo:'', max:0, dorms:0, ordem:'rel' };
let selecionado = null;

// ---------------------------------------------------------------- utilidades
const $ = (s, el = document) => el.querySelector(s);
const brl = n => 'R$ ' + n.toLocaleString('pt-BR');
const curto = n => n >= 1e6 ? (n / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + ' mi' : n >= 1e4 ? Math.round(n / 1000) + ' mil' : n.toLocaleString('pt-BR');
const precoTxt = i => i.neg === 'aluguel' ? `${brl(i.preco)} <small>/mês</small>` : brl(i.preco);
const metaTxt = i => [i.dorms ? `${i.dorms} ${i.dorms > 1 ? 'dorms' : 'dorm'}` : null, `${i.m2} m²`, i.vagas ? `${i.vagas} ${i.vagas > 1 ? 'vagas' : 'vaga'}` : null].filter(Boolean).join(' · ');
const byId = id => IMOVEIS.find(i => i.id === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

function foto(i, v = 0) {
  // "foto" ilustrativa: prédio em tons da paleta, com variação por ângulo
  const c = PALETA[(i.cor + v) % PALETA.length], bg = FUNDO[c];
  const casa = i.tipo === 'Casa';
  const w = casa ? 150 : 90 + (v % 3) * 14, h = casa ? 70 : 120 - (v % 2) * 18;
  const x = 160 - w / 2 + (v % 2 ? 26 : 0), y = 180 - h;
  let win = '';
  const cols = casa ? 4 : 3, rows = casa ? 1 : Math.floor(h / 30);
  for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++)
    win += `<rect x="${x + 12 + k * ((w - 24) / cols)}" y="${y + 14 + r * 28}" width="${(w - 24) / cols - 10}" height="14" rx="1" fill="#fff" opacity=".9"/>`;
  const roof = casa ? `<path d="M${x - 10} ${y} L${x + w / 2} ${y - 40} L${x + w + 10} ${y} Z" fill="${c}" opacity=".85"/>` : '';
  const viz = v % 2 ? `<rect x="${x - 70}" y="${180 - 70}" width="56" height="70" fill="${c}" opacity=".45"/>` : `<rect x="${x + w + 14}" y="${180 - 90}" width="50" height="90" fill="${c}" opacity=".45"/>`;
  return `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">
    <rect width="320" height="200" fill="${bg}"/>${viz}${roof}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>${win}
    <rect y="180" width="320" height="20" fill="${c}" opacity=".35"/></svg>`;
}

function filtrar(b = busca) {
  let l = IMOVEIS.filter(i => i.neg === b.neg && (!b.bairro || i.bairro === b.bairro) && (!b.tipo || i.tipo === b.tipo) && (!b.max || i.preco <= b.max) && (!b.dorms || i.dorms >= b.dorms));
  if (b.ordem === 'menor') l.sort((a, c) => a.preco - c.preco);
  if (b.ordem === 'maior') l.sort((a, c) => c.preco - a.preco);
  if (b.ordem === 'm2') l.sort((a, c) => c.m2 - a.m2);
  return l;
}

const WA = '<svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.8-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.9-3.8-1.9-6 0-5.9 4.9-10.6 11-10.6s11 4.8 11 10.6-4.9 10.9-11 10.9zm6-7.9c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.1 2.9 1.1 3.5.9 4.1.9.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.4-.3-.7-.4z"/></svg>';

// ---------------------------------------------------------------- partes comuns
function header(ativo) {
  const a = k => ativo === k ? 'class="on"' : '';
  return `<header class="site-h"><div class="wrap">
    <a href="#/" class="logo"><span class="sunmark"></span>Sunshine Imobiliária</a>
    <nav><a href="#/comprar" ${a('venda')}>Comprar</a><a href="#/alugar" ${a('aluguel')}>Alugar</a><a href="#/mapa" ${a('mapa')}>Mapa</a><a href="#/contato" ${a('contato')}>Contato</a></nav>
    <button class="btn btn-navy" data-agendar="">Agendar visita</button>
  </div></header>`;
}

function footer() {
  return `<footer class="site-f"><div class="wrap">
    <div class="cols">
      <div><div class="logo" style="color:#fff"><span class="sunmark" style="box-shadow:none"></span>Sunshine Imobiliária</div>
        <p style="margin-top:12px;max-width:340px;font-size:14px">Compra, venda e locação de imóveis em São Paulo, com atendimento direto do corretor pelo WhatsApp.</p></div>
      <div><h4>Imóveis</h4><a href="#/comprar">Comprar</a><a href="#/alugar">Alugar</a><a href="#/mapa">Buscar no mapa</a></div>
      <div><h4>Bairros</h4>${BAIRROS.slice(0, 4).map(b => `<a href="#/comprar?bairro=${encodeURIComponent(b)}">${b}</a>`).join('')}</div>
      <div><h4>Sunshine</h4><a href="#/contato">Fale conosco</a><a href="#/contato">Anuncie seu imóvel</a><a href="#/privacidade">Privacidade (LGPD)</a></div>
    </div>
    <div class="legal"><span>© 2026 Sunshine Imobiliária · CRECI 29988-J · São Paulo, SP</span><span>sunshine-imob.com.br</span></div>
  </div></footer>
  <button class="fab" data-wa="" aria-label="Falar no WhatsApp">${WA.replace('width="18" height="18"', 'width="30" height="30" style="color:#fff"')}</button>`;
}

function card(i) {
  return `<article class="pcard">
    <a href="#/imovel/${i.id}" class="ph">${foto(i)}${i.tag ? `<span class="tag">${i.tag}</span>` : ''}<span class="cnt">1 / ${i.fotos}</span></a>
    <div class="bd">
      <a href="#/imovel/${i.id}"><div class="price tnum">${precoTxt(i)}</div>
      <div class="meta">${metaTxt(i)}</div><div class="meta">${i.bairro} · Ref. ${i.id}</div></a>
      <div class="ft"><a href="#/imovel/${i.id}" class="btn btn-ghost btn-sm">Ver imóvel</a><button class="btn btn-wa btn-sm" data-wa="${i.id}">${WA} WhatsApp</button></div>
    </div></article>`;
}

function selects(b, cls = '') {
  const opt = (v, l, cur) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${l}</option>`;
  return {
    bairro: `<select ${cls} data-f="bairro">${opt('', 'Todos os bairros', b.bairro)}${BAIRROS.map(x => opt(x, x, b.bairro)).join('')}</select>`,
    tipo: `<select ${cls} data-f="tipo">${opt('', 'Todos os tipos', b.tipo)}${TIPOS.map(x => opt(x, x, b.tipo)).join('')}</select>`,
    max: `<select ${cls} data-f="max">${FAIXAS[b.neg].map(([v, l]) => opt(v, v ? 'Até ' + l : l, b.max)).join('')}</select>`,
    dorms: `<select ${cls} data-f="dorms">${[0, 1, 2, 3].map(v => opt(v, v ? v + '+ dorms' : 'Dormitórios', b.dorms)).join('')}</select>`,
    ordem: `<select ${cls} data-f="ordem">${opt('rel', 'Mais relevantes', b.ordem)}${opt('menor', 'Menor preço', b.ordem)}${opt('maior', 'Maior preço', b.ordem)}${opt('m2', 'Maior área', b.ordem)}</select>`,
  };
}

// ---------------------------------------------------------------- páginas
function pgInicio() {
  const s = selects(busca);
  const dest = IMOVEIS.filter(i => i.neg === 'venda').slice(0, 6);
  const alug = IMOVEIS.filter(i => i.neg === 'aluguel');
  const skyline = [[40,120],[100,190],[170,110],[230,160],[300,90],[350,210],[420,140],[490,180],[560,100],[620,230],[690,150]]
    .map(([x, h], k) => `<rect x="${x}" y="${300 - h}" width="${50 + (k % 3) * 8}" height="${h}" fill="#fff" opacity="${.12 + (k % 3) * .05}"/>`).join('');
  return header('') + `
  <section class="hero"><svg class="skyline" viewBox="0 0 760 300" preserveAspectRatio="xMaxYMax meet">${skyline}<circle cx="640" cy="70" r="34" fill="#F2A93B" opacity=".9"/></svg>
    <div class="wrap"><h1>Seu próximo imóvel em São Paulo</h1><p>Atendimento direto com o corretor pelo WhatsApp</p></div></section>
  <div class="wrap"><form class="search" id="hsearch">
    <div class="seg"><button type="button" data-neg="venda" class="${busca.neg === 'venda' ? 'on' : ''}">Comprar</button><button type="button" data-neg="aluguel" class="${busca.neg === 'aluguel' ? 'on' : ''}">Alugar</button></div>
    <div class="field"><label>Bairro</label>${s.bairro}</div>
    <div class="field"><label>Tipo</label>${s.tipo}</div>
    <div class="field"><label>Preço até</label>${s.max}</div>
    <button class="btn btn-sun">Buscar</button>
  </form></div>

  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><div class="eyebrow">À venda</div><h2>Imóveis em destaque</h2></div><a href="#/comprar" class="btn btn-ghost">Ver todos</a></div>
    <div class="grid">${dest.map(card).join('')}</div>
  </div></section>

  <section class="sec" style="background:#fff;border-block:1px solid var(--line)"><div class="wrap">
    <div class="sec-h"><div><div class="eyebrow">Por que a Sunshine</div><h2>Do anúncio à chave, sem enrolação</h2></div></div>
    <div class="why">
      <div><h3>Resposta rápida</h3><p>O corretor responsável recebe sua mensagem na hora, com o código do imóvel.</p></div>
      <div><h3>WhatsApp direto</h3><p>Um toque e a conversa abre. Sem copiar número, sem formulário longo.</p></div>
      <div><h3>Visita marcada</h3><p>Escolha o dia e o horário. O corretor confirma pelo WhatsApp.</p></div>
      <div><h3>Busca no mapa</h3><p>Veja onde fica cada imóvel e o que tem por perto antes de visitar.</p></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><div class="eyebrow">Para alugar</div><h2>Pronto para morar</h2></div><a href="#/alugar" class="btn btn-ghost">Ver todos</a></div>
    <div class="grid">${alug.map(card).join('')}</div>
  </div></section>

  <section class="sec" style="padding-top:0"><div class="wrap">
    <div class="sec-h"><div><div class="eyebrow">Onde atuamos</div><h2>Busque por bairro</h2></div><a href="#/mapa" class="btn btn-ghost">Abrir o mapa</a></div>
    <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">${BAIRROS.map((b, k) => {
      const n = IMOVEIS.filter(i => i.bairro === b).length;
      return `<a href="#/comprar?bairro=${encodeURIComponent(b)}" class="pcard"><div class="ph" style="height:110px">${foto({ cor: k, tipo: 'Apartamento' }, k)}</div><div class="bd"><b style="font-size:17px">${b}</b><span class="meta">${n} ${n > 1 ? 'imóveis' : 'imóvel'}</span></div></a>`;
    }).join('')}</div>
  </div></section>

  <section class="sec" style="background:var(--navy);color:#fff"><div class="wrap" style="display:flex;gap:32px;align-items:center;justify-content:space-between;flex-wrap:wrap">
    <div><div class="eyebrow" style="color:var(--sun)">Proprietário</div><h2 style="font-size:32px;font-weight:800;margin-top:6px">Quer vender ou alugar seu imóvel?</h2>
    <p style="opacity:.8;margin-top:8px;max-width:560px">Fazemos a avaliação, as fotos e o anúncio. Você acompanha as visitas pelo WhatsApp.</p></div>
    <a href="#/contato" class="btn btn-sun" style="height:52px;padding:0 26px">Anunciar meu imóvel</a>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><div class="eyebrow">Equipe</div><h2>Fale direto com quem cuida do imóvel</h2></div></div>
    <div class="team">${Object.entries(CORRETORES).map(([k, c]) => `<div class="p"><span class="av" style="background:${c.cor}">${c.nome[0]}</span><div><b>${c.nome}</b><div class="meta muted" style="font-size:13px">Corretor(a) · CRECI ${c.creci}</div></div><button class="btn btn-wa btn-sm" style="margin-left:auto" data-wa="" data-corretor="${k}" aria-label="WhatsApp de ${c.nome}">${WA}</button></div>`).join('')}</div>
  </div></section>` + footer();
}

function pgLista(neg) {
  busca.neg = neg;
  if (busca.max && !FAIXAS[neg].some(([v]) => v === busca.max)) busca.max = 0;
  const s = selects(busca, 'class="chip"');
  const l = filtrar();
  return header(neg) + `
  <div class="mapbar"><div class="wrap" style="max-width:1200px">
    <a href="#/comprar" class="chip ${neg === 'venda' ? 'on' : ''}">Comprar</a><a href="#/alugar" class="chip ${neg === 'aluguel' ? 'on' : ''}">Alugar</a>
    ${s.bairro}${s.tipo}${s.max}${s.dorms}${s.ordem}
    <a href="#/mapa" class="btn btn-ghost btn-sm" style="margin-left:auto">Ver no mapa</a>
  </div></div>
  <section class="sec" style="padding-top:28px"><div class="wrap">
    <div class="sec-h"><h2 style="font-size:26px">${l.length} ${l.length === 1 ? 'imóvel' : 'imóveis'} ${neg === 'venda' ? 'à venda' : 'para alugar'}${busca.bairro ? ' em ' + busca.bairro : ' em São Paulo'}</h2></div>
    ${l.length ? `<div class="grid">${l.map(card).join('')}</div>` : `<div class="empty">Nenhum imóvel com esses filtros. <button class="btn btn-ghost btn-sm" data-limpar>Limpar filtros</button><p style="margin-top:12px">Ou <a href="#" data-wa="" style="text-decoration:underline">fale com um corretor</a>: ele avisa quando entrar um imóvel assim.</p></div>`}
  </div></section>` + footer();
}

// mapa ilustrativo: ruas, parques e nomes de bairro
function mapaSVG() {
  const h = [8, 22, 37, 51, 64, 79, 92], v = [9, 22, 33, 48, 60, 71, 85, 95];
  let s = '<svg class="map" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true"><rect width="1000" height="620" fill="#E8ECF1"/>';
  s += '<path d="M780 0 L1000 0 L1000 300 Q900 340 860 250 Q820 160 780 0Z" fill="#D5E6D0"/><ellipse cx="170" cy="470" rx="110" ry="60" fill="#D5E6D0"/><path d="M0 560 Q200 520 380 600 L380 620 L0 620Z" fill="#D5E6D0"/>';
  h.forEach((y, k) => s += `<line x1="0" y1="${y * 6.2 + (k % 2 ? 6 : -4)}" x2="1000" y2="${y * 6.2 - (k % 2 ? 10 : -8)}" stroke="#fff" stroke-width="${k === 3 ? 14 : 8}"/>`);
  v.forEach((x, k) => s += `<line x1="${x * 10 - (k % 2 ? 8 : 0)}" y1="0" x2="${x * 10 + (k % 3 ? 12 : -6)}" y2="620" stroke="#fff" stroke-width="${k === 4 ? 14 : 7}"/>`);
  s += '<path d="M0 140 Q400 300 1000 520" stroke="#fff" stroke-width="12" fill="none"/>';
  return s + '</svg>' + [['Moema', 18, 64], ['Vila Mariana', 46, 18], ['Vila Clementino', 40, 50], ['Tatuapé', 82, 12], ['Saúde', 70, 88]]
    .map(([n, x, y]) => `<span style="position:absolute;left:${x}%;top:${y}%;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8C96A8;pointer-events:none">${n}</span>`).join('');
}

let zoom = 1;
function pgMapa() {
  const s = selects(busca, 'class="chip"');
  const l = filtrar();
  if (!l.some(i => i.id === selecionado)) selecionado = l[0]?.id || null;
  return header('mapa') + `
  <div class="mapbar"><div class="wrap">
    <button class="chip ${busca.neg === 'venda' ? 'on' : ''}" data-neg="venda">Comprar</button><button class="chip ${busca.neg === 'aluguel' ? 'on' : ''}" data-neg="aluguel">Alugar</button>
    ${s.tipo}${s.max}${s.dorms}${s.bairro}
    <span class="count">${l.length} ${l.length === 1 ? 'imóvel' : 'imóveis'} nesta área</span>
  </div></div>
  <div class="mapview">
    <div class="maplist" id="mlist">${l.length ? l.map(i => `<div class="mrow ${i.id === selecionado ? 'on' : ''}" data-sel="${i.id}">
      <div class="th">${foto(i)}</div><div><div class="price tnum">${precoTxt(i)}</div><div class="meta">${metaTxt(i)}</div><div class="meta">${i.bairro}</div>
      <a href="#/imovel/${i.id}" style="font-size:13px;font-weight:700;color:var(--sky)">Ver imóvel →</a></div></div>`).join('') : '<div class="empty">Nenhum imóvel nesta área com esses filtros.</div>'}</div>
    <div class="mapbox"><div id="mlayer" style="position:absolute;inset:0;transform:scale(${zoom});transform-origin:50% 50%;transition:transform .2s">${mapaSVG()}
      ${l.map(i => `<button class="mpin ${i.id === selecionado ? 'on' : ''} ${i.neg === 'aluguel' ? 'rent' : ''}" style="left:${i.x}%;top:${i.y}%" data-sel="${i.id}">${curto(i.preco)}</button>`).join('')}</div>
      <div class="zoom"><button data-zoom="1" aria-label="Aproximar">+</button><button data-zoom="-1" aria-label="Afastar">−</button></div>
      <span class="mapnote">Mapa ilustrativo · no site real, mapa da cidade com localização aproximada</span>
    </div>
  </div>`;
}

function pgImovel(id) {
  const i = byId(id);
  if (!i) return header('') + `<div class="wrap sec"><div class="empty">Imóvel não encontrado. <a href="#/comprar" class="btn btn-ghost btn-sm">Ver imóveis</a></div></div>` + footer();
  const c = CORRETORES[i.corretor];
  const sim = IMOVEIS.filter(o => o.neg === i.neg && o.id !== i.id && (o.bairro === i.bairro || Math.abs(o.preco - i.preco) / i.preco < .25)).slice(0, 3);
  const feats = [i.m2 + ' m²', i.dorms ? i.dorms + (i.dorms > 1 ? ' dorms' : ' dorm') : null, i.suites ? i.suites + (i.suites > 1 ? ' suítes' : ' suíte') : null, i.vagas ? i.vagas + (i.vagas > 1 ? ' vagas' : ' vaga') : null].filter(Boolean);
  const custos = [i.cond ? 'Condomínio ' + brl(i.cond) : null, i.iptu ? 'IPTU ' + brl(i.iptu) : null].filter(Boolean).join(' · ');
  return header(i.neg) + `<div class="wrap">
    <div class="crumbs"><a href="#/${i.neg === 'venda' ? 'comprar' : 'alugar'}">${i.neg === 'venda' ? 'Comprar' : 'Alugar'}</a> › <a href="#/comprar?bairro=${encodeURIComponent(i.bairro)}">${i.bairro}</a> › Ref. ${i.id}</div>
    <div class="gal"><div>${foto(i, 0)}<span class="cnt">1 / ${i.fotos} fotos</span></div><div>${foto(i, 1)}</div><div>${foto(i, 2)}</div><div>${foto(i, 3)}</div><div>${foto(i, 4)}</div></div>
    <div class="pd">
      <div>
        ${i.tag ? `<span class="tag" style="background:var(--sun-l);color:var(--sun-d)">${i.tag}</span>` : ''}
        <h1 style="margin-top:8px">${i.titulo}</h1>
        <div class="sub">${i.bairro} · São Paulo · Ref. ${i.id}</div>
        <div class="feats">${feats.map(f => `<span>${f}</span>`).join('')}</div>
        <h3>Sobre o imóvel</h3><p class="desc">${i.desc}</p>
        <h3>Localização</h3>
        <div class="minimap">${mapaSVG()}<span class="mpin on" style="left:${i.x}%;top:${i.y}%">${curto(i.preco)}</span></div>
        <p class="note">Localização aproximada. O endereço exato é passado pelo corretor.</p>
        ${sim.length ? `<h3>Imóveis parecidos</h3><div class="grid">${sim.map(card).join('')}</div>` : ''}
      </div>
      <aside class="box">
        <div class="muted" style="font-size:14px">${i.neg === 'venda' ? 'Venda' : 'Aluguel'}</div>
        <div class="price tnum">${precoTxt(i)}</div>
        <div class="costs">${custos || '&nbsp;'}</div>
        <button class="btn btn-wa" data-wa="${i.id}">${WA} Falar no WhatsApp</button>
        <button class="btn btn-navy" data-agendar="${i.id}">Agendar visita</button>
        <div class="broker"><span class="av" style="background:${c.cor}">${c.nome[0]}</span><div><b>${c.nome}</b><div class="muted" style="font-size:13px">Corretor(a) responsável · CRECI ${c.creci}</div></div></div>
        <p class="note">Resposta em poucos minutos no horário comercial.</p>
      </aside>
    </div>
  </div>
  <div class="mbar"><button class="btn btn-navy" data-agendar="${i.id}">Agendar visita</button><button class="btn btn-wa" data-wa="${i.id}">WhatsApp</button></div>` + footer();
}

function pgContato() {
  return header('contato') + `<section class="sec"><div class="wrap" style="display:grid;grid-template-columns:1fr 1fr;gap:40px" id="ct">
    <div><div class="eyebrow">Contato</div><h2 style="font-size:36px;font-weight:800;margin:6px 0 12px">Fale com a Sunshine</h2>
      <p class="muted" style="font-size:17px">O jeito mais rápido é o WhatsApp: a mensagem chega direto para a equipe.</p>
      <button class="btn btn-wa" style="margin-top:20px;height:52px;padding:0 24px" data-wa="">${WA} Chamar no WhatsApp</button>
      <div class="why" style="grid-template-columns:1fr;margin-top:36px;gap:18px">
        <div><h3>Quer vender ou alugar?</h3><p>Avaliamos o imóvel, fazemos as fotos e publicamos no site, no mapa e nos portais.</p></div>
        <div><h3>Atendimento</h3><p>Segunda a sexta, 9h às 18h · Sábado, 9h às 13h</p></div>
        <div><h3>CRECI</h3><p>29988-J · São Paulo, SP</p></div>
      </div></div>
    <form class="box" style="position:static" id="cform">
      <h3 style="font-size:22px;margin-bottom:4px">Mande uma mensagem</h3><p class="muted" style="font-size:14px">Respondemos pelo WhatsApp.</p>
      <div class="modal" style="padding:0;max-height:none">
      <label>Nome</label><input required name="nome" autocomplete="name">
      <label>WhatsApp</label><input required name="tel" inputmode="tel" placeholder="(11) 9xxxx-xxxx" autocomplete="tel">
      <label>Assunto</label><select name="assunto"><option>Quero comprar</option><option>Quero alugar</option><option>Quero vender meu imóvel</option><option>Quero colocar meu imóvel para alugar</option><option>Outro</option></select>
      <label>Mensagem</label><input name="msg" placeholder="Opcional">
      <label class="chk"><input type="checkbox" required> Concordo com a <a href="#/privacidade" style="text-decoration:underline">política de privacidade</a> e aceito ser contatado pela Sunshine.</label>
      <div class="ft"><button class="btn btn-sun">Enviar</button></div></div>
    </form>
  </div></section>` + footer();
}

function pgPrivacidade() {
  return header('') + `<section class="sec"><div class="wrap" style="max-width:760px">
    <div class="eyebrow">LGPD</div><h2 style="font-size:34px;font-weight:800;margin:6px 0 18px">Política de privacidade</h2>
    <div class="why" style="grid-template-columns:1fr;gap:20px">
      <div><h3>O que coletamos</h3><p>Nome, WhatsApp e o imóvel de interesse, quando você envia uma mensagem ou agenda uma visita. Também contamos visitas às páginas, sem identificar você.</p></div>
      <div><h3>Para que usamos</h3><p>Só para o corretor responder e combinar a visita. Não vendemos nem repassamos seus dados.</p></div>
      <div><h3>Seus direitos</h3><p>Você pode pedir a qualquer momento para ver, corrigir ou apagar seus dados, pelo WhatsApp ou pela página de contato.</p></div>
    </div>
    <p class="note" style="margin-top:28px">Texto de exemplo para o protótipo. A versão final será revisada com o jurídico da Sunshine.</p>
  </div></section>` + footer();
}

// ---------------------------------------------------------------- modais
function modal(html) {
  $('#layer').innerHTML = `<div class="ov" data-close><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`;
  $('#layer input, #layer button.btn')?.focus();
}
const fechar = () => { $('#layer').innerHTML = ''; };

function toast(t) {
  const el = document.createElement('div');
  el.className = 'toast'; el.innerHTML = `<i></i>${t}`;
  document.body.appendChild(el); setTimeout(() => el.remove(), 3200);
}

function abrirWA(id, corretorKey) {
  const i = id ? byId(id) : null;
  const c = CORRETORES[i ? i.corretor : corretorKey] || null;
  const msg = i ? `Olá${c ? ', ' + c.nome : ''}! Vi no site da Sunshine o imóvel Ref. ${i.id} (${i.titulo}, ${i.bairro}, ${brl(i.preco)}${i.neg === 'aluguel' ? '/mês' : ''}) e gostaria de mais informações.`
    : `Olá${c ? ', ' + c.nome : ''}! Vim pelo site da Sunshine e gostaria de ajuda para encontrar um imóvel.`;
  modal(`<h3>Falar no WhatsApp</h3><p class="muted">${c ? `Conversa direta com <b>${c.nome}</b>${i ? ', corretor(a) responsável por este imóvel' : ''}.` : 'Conversa direta com a equipe da Sunshine.'}</p>
    <div class="wa-prev"><div class="wa-bub">${esc(msg)}</div></div>
    <p class="note">A mensagem já vai pronta${i ? ', com o código do imóvel' : ''}. O cliente só aperta enviar.</p>
    <div class="ft"><button class="btn btn-ghost" data-close>Voltar</button><a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(msg)}" data-close>${WA} Abrir WhatsApp</a></div>`);
}

function abrirAgenda(id) {
  const i = id ? byId(id) : null;
  const dias = [...Array(6)].map((_, k) => { const d = new Date(); d.setDate(d.getDate() + k + 1); return d; }).filter(d => d.getDay() !== 0);
  const ops = IMOVEIS.map(o => `<option value="${o.id}" ${i && o.id === i.id ? 'selected' : ''}>Ref. ${o.id} · ${o.bairro} · ${brl(o.preco)}</option>`).join('');
  modal(`<form id="aform"><h3>Agendar visita</h3><p class="muted">O corretor confirma pelo WhatsApp.</p>
    <label>Imóvel</label><select name="im">${i ? '' : '<option value="">Escolha um imóvel</option>'}${ops}</select>
    <div class="row"><div><label>Dia</label><select name="dia">${dias.map(d => `<option>${d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}</option>`).join('')}</select></div>
    <div><label>Horário</label><select name="h">${['9h', '10h', '11h', '14h', '15h', '16h', '17h'].map(h => `<option>${h}</option>`).join('')}</select></div></div>
    <label>Nome</label><input required name="nome" autocomplete="name">
    <label>WhatsApp</label><input required name="tel" inputmode="tel" placeholder="(11) 9xxxx-xxxx" autocomplete="tel">
    <label class="chk"><input type="checkbox" required> Concordo com a política de privacidade e aceito ser contatado sobre esta visita.</label>
    <div class="ft"><button type="button" class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-navy">Pedir visita</button></div></form>`);
}

// ---------------------------------------------------------------- roteador
function lerQuery(q) {
  const p = new URLSearchParams(q || '');
  if (p.has('bairro')) busca.bairro = p.get('bairro');
}

function render() {
  const [path, q] = (location.hash.slice(1) || '/').split('?');
  lerQuery(q);
  const parts = path.split('/').filter(Boolean);
  let html;
  switch (parts[0]) {
    case 'comprar': html = pgLista('venda'); break;
    case 'alugar': html = pgLista('aluguel'); break;
    case 'mapa': html = pgMapa(); break;
    case 'imovel': html = pgImovel(parts[1]); break;
    case 'contato': html = pgContato(); break;
    case 'privacidade': html = pgPrivacidade(); break;
    default: html = pgInicio();
  }
  $('#root').innerHTML = html;
  document.querySelectorAll('#demonav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + path || (path === '' && a.getAttribute('href') === '#/')));
  document.body.style.overflow = parts[0] === 'mapa' && innerWidth > 860 ? 'hidden' : '';
  window.scrollTo(0, 0);
  fechar();
}

function rerender() { // mantém a rolagem (filtros)
  const y = scrollY; const [path] = (location.hash.slice(1) || '/').split('?');
  const p = path.split('/').filter(Boolean)[0];
  $('#root').innerHTML = p === 'mapa' ? pgMapa() : pgLista(p === 'alugar' ? 'aluguel' : 'venda');
  window.scrollTo(0, y);
}

// ---------------------------------------------------------------- eventos
document.addEventListener('click', e => {
  const t = e.target;
  if (t.classList.contains('ov') || t.closest('.btn[data-close]')) { fechar(); return; }
  const wa = t.closest('[data-wa]'); if (wa) { e.preventDefault(); abrirWA(wa.dataset.wa, wa.dataset.corretor); return; }
  const ag = t.closest('[data-agendar]'); if (ag) { abrirAgenda(ag.dataset.agendar); return; }
  const neg = t.closest('[data-neg]');
  if (neg) {
    busca.neg = neg.dataset.neg; busca.max = 0;
    if ($('#hsearch')) { document.querySelectorAll('#hsearch [data-neg]').forEach(b => b.classList.toggle('on', b === neg)); $('#hsearch [data-f="max"]').outerHTML = selects(busca).max; }
    else rerender();
    return;
  }
  const sel = t.closest('[data-sel]');
  if (sel && !t.closest('a')) {
    selecionado = sel.dataset.sel;
    document.querySelectorAll('[data-sel]').forEach(el => el.classList.toggle('on', el.dataset.sel === selecionado));
    if (sel.classList.contains('mpin')) $(`.mrow[data-sel="${selecionado}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    return;
  }
  const z = t.closest('[data-zoom]');
  if (z) { zoom = Math.min(1.8, Math.max(1, zoom + (+z.dataset.zoom) * .2)); $('#mlayer').style.transform = `scale(${zoom})`; return; }
  if (t.closest('[data-limpar]')) { Object.assign(busca, { bairro: '', tipo: '', max: 0, dorms: 0 }); rerender(); return; }
  if (t.id === 'phonebtn') { e.preventDefault(); verCelular(); }
});

document.addEventListener('change', e => {
  const f = e.target.dataset.f; if (!f) return;
  busca[f] = ['max', 'dorms'].includes(f) ? +e.target.value : e.target.value;
  if (!$('#hsearch')) {
    if (f === 'bairro' && location.hash.includes('?')) history.replaceState(null, '', location.hash.split('?')[0]);
    rerender();
  }
});

document.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  if (f.id === 'hsearch') { location.hash = busca.neg === 'venda' ? '#/comprar' : '#/alugar'; return; }
  if (f.id === 'aform') {
    const im = byId(f.im.value), nome = f.nome.value.trim().split(' ')[0];
    const c = im ? CORRETORES[im.corretor].nome : 'a equipe';
    modal(`<h3>Pedido enviado, ${esc(nome)}!</h3><p class="muted" style="margin-top:6px">${c} recebeu seu pedido de visita para <b>${esc(f.dia.value)} às ${esc(f.h.value)}</b>${im ? ` no imóvel Ref. ${im.id}` : ''} e vai confirmar pelo WhatsApp.</p>
      <div class="ft"><button class="btn btn-navy" data-close>Fechar</button></div>`);
    return;
  }
  if (f.id === 'cform') { f.reset(); toast('Mensagem enviada. Vamos responder pelo WhatsApp.'); }
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

// prévia no celular, para mostrar na reunião
function verCelular() {
  $('#layer').innerHTML = `<div class="ov" data-close><div style="display:flex;flex-direction:column;align-items:center;gap:12px">
    <div style="width:390px;height:min(780px,85vh);border:10px solid #16223F;border-radius:40px;overflow:hidden;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.4)">
      <iframe src="${location.pathname}?celular=1${location.hash}" style="width:100%;height:100%;border:0" title="Site no celular"></iframe></div>
    <button class="btn btn-sun" data-close>Fechar prévia</button></div></div>`;
}
if (new URLSearchParams(location.search).has('celular')) document.getElementById('demo').style.display = 'none', document.documentElement.style.setProperty('--demo-h', '0px');

window.addEventListener('hashchange', render);
render();
