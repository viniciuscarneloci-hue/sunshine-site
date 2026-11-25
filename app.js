/* Sunshine Imobiliária — site do comprador (protótipo).
   Imóveis, fotos, telefones e endereço tirados do site atual (sunshine-imob.com.br). */

// ---------------------------------------------------------------- contato real
const EMPRESA = {
  nome: 'Sunshine Imobiliária',
  creci: '29988-J',
  wa: '5511996766021',
  tel1: '(11) 99676-6021',
  tel2: '(11) 97297-6940',
  email: 'nelson@sunshine-imob.com.br',
  endereco: 'Rua Senador Feijó, 40 · Conj. 12',
  bairroEnd: 'Centro · São Paulo/SP · 01006-000',
  instagram: 'https://www.instagram.com/imobiliariasunshine/',
  facebook: 'https://www.facebook.com/imovelsunshine/',
};

// ---------------------------------------------------------------- imóveis (carteira atual)
const IMOVEIS = [
  { id:'1262', neg:'venda', tipo:'Apartamento', titulo:'Alto padrão com piscina no Belenzinho', bairro:'Belenzinho', zona:'Zona Leste', preco:2100000, m2:245, dorms:4, suites:2, vagas:2, banh:5,
    fotos:['1262-3','1262-2','1262-1'], lat:-23.5421, lng:-46.5962, tag:'Destaque',
    resumo:'Quatro dormitórios, duas suítes e 245 m² de área privativa, com área de lazer e piscina.',
    desc:['Conforto e sofisticação num apartamento de 245 m² no Belenzinho. São quatro dormitórios, sendo duas suítes, e cinco banheiros, com ambientes amplos e bem iluminados.','Área externa com piscina e espaço para receber a família e os amigos. Duas vagas de garagem e acesso rápido à Radial Leste, ao metrô e ao Tatuapé.'],
    itens:['Piscina','Área gourmet','5 banheiros','Pronto para morar'] },
  { id:'1342', neg:'venda', tipo:'Apartamento', titulo:'Club Tuiuti, andar alto e face norte', bairro:'Tatuapé', zona:'Zona Leste', preco:1312000, m2:93, dorms:3, suites:1, vagas:2,
    fotos:['1342-1','1342-2','1342-3'], lat:-23.5409, lng:-46.5772, tag:'',
    resumo:'Três dormitórios com suíte, andar alto e face norte, num condomínio clube.',
    desc:['Lindo apartamento no Condomínio Club Tuiuti, de andar alto e face norte, com ótima iluminação natural e ventilação o dia todo.','Três dormitórios, sendo uma suíte, e duas vagas. Condomínio clube com lazer completo, perto do metrô Tatuapé, de shoppings e do Parque do Piqueri.'],
    itens:['Face norte','Andar alto','Condomínio clube','Perto do metrô'] },
  { id:'1338', neg:'venda', tipo:'Apartamento', titulo:'Quatro dormitórios e três suítes no Tatuapé', bairro:'Tatuapé', zona:'Zona Leste', preco:1795000, m2:105, dorms:4, suites:3, vagas:2, banh:4,
    fotos:['1338-1','1338-2','1338-3'], lat:-23.5456, lng:-46.5699, tag:'',
    resumo:'Quatro dormitórios, três suítes e quatro banheiros em torre moderna.',
    desc:['Espaço ideal para a família, em torre moderna do Tatuapé. São quatro dormitórios, sendo três suítes, e quatro banheiros.','Sala integrada com varanda e acabamento atual. Duas vagas de garagem e lazer completo no condomínio.'],
    itens:['3 suítes','Varanda','Lazer completo','Torre nova'] },
  { id:'1343', neg:'venda', tipo:'Apartamento', titulo:'Condomínio Búzios, na Vila Mariana', bairro:'Vila Clementino', zona:'Zona Sul', preco:795000, m2:75, dorms:2, suites:1, vagas:1,
    fotos:['1343-2','1343-3','1343-1'], lat:-23.6031, lng:-46.6436, tag:'Novo',
    resumo:'Dois dormitórios com suíte no Condomínio Búzios, com jardim e lazer.',
    desc:['Exclusividade, conforto e vista privilegiada no coração da Vila Mariana. Apartamento de 75 m² no Condomínio Búzios, na Rua Dr. Altino Arantes.','Dois dormitórios, sendo uma suíte, e uma vaga. Condomínio com jardim bem cuidado e lazer, perto do metrô Santa Cruz, de hospitais, escolas e comércio.'],
    itens:['Jardim','Lazer','Perto do metrô','Pronto para morar'] },
  { id:'1332', neg:'venda', tipo:'Apartamento', titulo:'Três dormitórios com academia no Tatuapé', bairro:'Tatuapé', zona:'Zona Leste', preco:780000, m2:83, dorms:3, suites:1, vagas:2,
    fotos:['1332-1','1332-2','1332-3'], lat:-23.5484, lng:-46.5801, tag:'',
    resumo:'Três dormitórios com suíte, 83 m² e duas vagas.',
    desc:['Apartamento no Tatuapé com três dormitórios, sendo uma suíte, e dois banheiros. São 83 m² de área privativa, o espaço certo para a família.','Condomínio com academia e lazer, duas vagas e localização prática, perto do comércio e do transporte.'],
    itens:['Academia','2 banheiros','2 vagas','Pronto para morar'] },
  { id:'1333', neg:'venda', tipo:'Apartamento', titulo:'Dois dormitórios bem localizado', bairro:'Vila Clementino', zona:'Zona Sul', preco:649000, m2:68, dorms:2, suites:0, vagas:2, banh:2,
    fotos:['1333-2','1333-3','1333-1'], lat:-23.5963, lng:-46.6418, tag:'',
    resumo:'Dois dormitórios, dois banheiros e duas vagas na Vila Clementino.',
    desc:['Excelente oportunidade na Vila Clementino. Apartamento com dois dormitórios e dois banheiros, 68 m² de área privativa e duas vagas.','Sala para dois ambientes e cozinha funcional, numa das regiões mais procuradas da Zona Sul, perto do metrô e de hospitais.'],
    itens:['2 banheiros','2 vagas','Perto do metrô'] },
  { id:'1336', neg:'venda', tipo:'Apartamento', titulo:'Encantador e reformado na Vila Clementino', bairro:'Vila Clementino', zona:'Zona Sul', preco:580000, m2:52, dorms:2, suites:0, vagas:1,
    fotos:['1336-1','1336-2','1336-3'], lat:-23.5994, lng:-46.6476, tag:'',
    resumo:'Dois dormitórios, piso de madeira e muita luz natural.',
    desc:['Encantador apartamento na Vila Clementino, com dois dormitórios e um banheiro, em 52 m² de área privativa.','Piso de madeira, sala iluminada e uma vaga. Localização excelente, perto do metrô, de hospitais e de universidades.'],
    itens:['Piso de madeira','Iluminado','Perto do metrô'] },
  { id:'1340', neg:'venda', tipo:'Apartamento', titulo:'Reformado, a passos da Avenida Paulista', bairro:'Bela Vista', zona:'Centro', preco:350000, m2:41, dorms:1, suites:0, vagas:0,
    fotos:['1340-2','1340-3','1340-1'], lat:-23.5602, lng:-46.6501, tag:'Oportunidade',
    resumo:'Um dormitório todo reformado, perto da Paulista. Ótimo para morar ou investir.',
    desc:['Apartamento todo reformado no coração da Bela Vista, perto da Avenida Paulista.','Um dormitório, sala e cozinha prontas para morar. Ótimo para quem quer ficar perto do trabalho, ou para investir em locação.'],
    itens:['Reformado','Perto da Paulista','Bom para investir'] },
  { id:'1337', neg:'aluguel', tipo:'Studio', titulo:'Studio moderno para alugar no Tatuapé', bairro:'Tatuapé', zona:'Zona Leste', preco:3500, m2:24, dorms:1, suites:0, vagas:0,
    fotos:['1337-1','1337-2','1337-3'], lat:-23.5391, lng:-46.5744, tag:'Locação',
    resumo:'Studio encantador com marcenaria planejada e varanda.',
    desc:['Viva num studio encantador no coração do Tatuapé. Um dormitório e um banheiro, com marcenaria planejada e cozinha equipada.','Varanda com vista, prédio novo e localização perto do metrô, de shoppings e de restaurantes.'],
    itens:['Mobiliado','Varanda','Prédio novo','Perto do metrô'] },
];

const BAIRROS = [
  { nome:'Tatuapé', foto:'1338-1', zona:'Zona Leste' },
  { nome:'Vila Clementino', foto:'1343-1', zona:'Zona Sul' },
  { nome:'Belenzinho', foto:'1262-2', zona:'Zona Leste' },
  { nome:'Bela Vista', foto:'1340-1', zona:'Centro' },
];
const HERO = ['1262', '1343', '1338', '1342'];
const FAIXAS = { venda:[[0,'Qualquer valor'],[400000,'Até R$ 400 mil'],[700000,'Até R$ 700 mil'],[1000000,'Até R$ 1 milhão'],[1500000,'Até R$ 1,5 milhão'],[2500000,'Até R$ 2,5 milhões']],
                 aluguel:[[0,'Qualquer valor'],[3000,'Até R$ 3.000'],[5000,'Até R$ 5.000'],[8000,'Até R$ 8.000']] };
const JUROS = 0.115; // referência para a simulação

const busca = { neg:'venda', bairro:'', tipo:'', max:0, dorms:0, ordem:'rel' };

// ---------------------------------------------------------------- utilidades
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const img = f => `img/imoveis/${f}.jpg`;
const brl = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const curto = n => n >= 1e6 ? (n / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + ' mi' : n >= 1e4 ? Math.round(n / 1000) + ' mil' : n.toLocaleString('pt-BR');
const precoTxt = i => i.neg === 'aluguel' ? `${brl(i.preco)}<small> /mês</small>` : brl(i.preco);
const byId = id => IMOVEIS.find(i => i.id === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
function parcela(valor, entradaPct = .2, anos = 30) {
  const pv = valor * (1 - entradaPct), i = Math.pow(1 + JUROS, 1 / 12) - 1, n = anos * 12;
  return pv * i / (1 - Math.pow(1 + i, -n));
}
const waLink = msg => `https://wa.me/${EMPRESA.wa}?text=${encodeURIComponent(msg)}`;

const I = {
  wa:'<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.8-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.9-3.8-1.9-6 0-5.9 4.9-10.6 11-10.6s11 4.8 11 10.6-4.9 10.9-11 10.9zm6-7.9c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.1 2.9 1.1 3.5.9 4.1.9.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.4-.3-.7-.4z"/></svg>',
  bed:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 14h18M6 9V6h5v3M3 18v2M21 18v2"/></svg>',
  area:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  car:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 17h14M5 17v2M19 17v2M4 13l2-5a2 2 0 0 1 2-1h8a2 2 0 0 1 2 1l2 5v4H4z"/><circle cx="8" cy="14" r=".8" fill="currentColor"/><circle cx="16" cy="14" r=".8" fill="currentColor"/></svg>',
  bath:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM6 12V5a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/></svg>',
  suite:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6"/></svg>',
  cam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  arrowR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  key:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  insta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20z"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
};

function specs(i) {
  const s = [];
  if (i.dorms) s.push(`<span>${I.bed}${plural(i.dorms, 'dorm', 'dorms')}</span>`);
  s.push(`<span>${I.area}${i.m2} m²</span>`);
  if (i.vagas) s.push(`<span>${I.car}${plural(i.vagas, 'vaga', 'vagas')}</span>`);
  return `<div class="specs">${s.join('')}</div>`;
}

// títulos que sobem palavra por palavra; *texto* vira destaque em itálico
function sp(t) {
  let k = 0;
  return t.split(/(\*[^*]+\*)/).filter(Boolean).map(parte => {
    const em = parte.startsWith('*');
    const ws = parte.replace(/\*/g, '').trim().split(/\s+/).map(w => `<span class="w"><span style="--i:${k++}">${w}</span></span>`).join(' ');
    return em ? `<em>${ws}</em>` : ws;
  }).join(' ');
}
const palavras = t => t.split(/\s+/).map(w => `<span>${w}</span>`).join(' ');
const SOL = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/></g></svg>';

// ---------------------------------------------------------------- partes comuns
const MENU = [['#/comprar', 'Comprar', 'venda'], ['#/alugar', 'Alugar', 'aluguel'], ['#/mapa', 'Mapa', 'mapa'], ['#/financie', 'Financie', 'financie'], ['#/anuncie', 'Anuncie seu imóvel', 'anuncie'], ['#/contato', 'Contato', 'contato']];

function header(ativo, transparente) {
  const hd = $('#hd');
  hd.className = 'hd' + (transparente ? '' : ' solid');
  hd.dataset.transp = transparente ? '1' : '';
  hd.innerHTML = `<div class="wrap">
    <a href="#/" class="logo" aria-label="Sunshine Imobiliária, início"><img class="l-light" src="img/logo-header-branco.png" alt="Sunshine Imobiliária"><img class="l-dark" src="img/logo-header.png" alt="Sunshine Imobiliária"></a>
    <nav>${MENU.map(([h, t, k]) => `<a href="${h}" class="${ativo === k ? 'on' : ''}">${t}</a>`).join('')}</nav>
    <div class="acts"><a class="btn btn-glass btn-sm" href="${waLink('Olá! Vim pelo site da Sunshine e gostaria de atendimento.')}" target="_blank" rel="noopener">${I.wa} ${EMPRESA.tel1}</a></div>
    <button class="burger" data-menu aria-label="Abrir menu"><span></span></button>
  </div>`;
}

function footer() {
  return `<footer class="ft"><div class="wrap">
    <div class="cols">
      <div><a href="#/" class="logo"><img src="img/logo-header-branco.png" alt="Sunshine Imobiliária"></a>
        <p style="max-width:360px">Compra, venda e aluguel de imóveis em São Paulo, com assessoria jurídica e atendimento personalizado.</p>
        <p style="margin-top:14px;color:#fff;font-weight:700">CRECI ${EMPRESA.creci}</p></div>
      <div><h4>Imóveis</h4><a href="#/comprar">Comprar</a><a href="#/alugar">Alugar</a><a href="#/mapa">Buscar no mapa</a><a href="#/financie">Financiamento</a><a href="#/anuncie">Anuncie seu imóvel</a></div>
      <div><h4>Bairros</h4>${BAIRROS.map(b => `<a href="#/comprar?bairro=${encodeURIComponent(b.nome)}">${b.nome}</a>`).join('')}</div>
      <div><h4>Fale com a gente</h4><a href="${waLink('Olá! Vim pelo site da Sunshine.')}" target="_blank" rel="noopener">${EMPRESA.tel1}</a><a href="tel:+5511972976940">${EMPRESA.tel2}</a><a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a><a href="${EMPRESA.instagram}" target="_blank" rel="noopener">Instagram</a><a href="${EMPRESA.facebook}" target="_blank" rel="noopener">Facebook</a></div>
    </div>
    <div class="giant" aria-hidden="true"><span>Sunshine</span><i class="sun-spin">${SOL}</i></div>
    <div class="legal"><span>© 2026 Sunshine Imobiliária · ${EMPRESA.endereco} · ${EMPRESA.bairroEnd}</span><span><a href="#/privacidade" style="display:inline">Privacidade</a> · Protótipo do novo site</span></div>
  </div></footer>
  <a class="fab" href="${waLink('Olá! Vim pelo site da Sunshine e gostaria de atendimento.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${I.wa}</a>`;
}

function card(i) {
  return `<article class="card rv">
    <a href="#/imovel/${i.id}" class="ph"><img src="${img(i.fotos[0])}" alt="${esc(i.titulo)}" loading="lazy">
      ${i.tag ? `<span class="badge ${i.tag === 'Destaque' ? 'gold' : ''}">${i.tag}</span>` : ''}
      <span class="ref">Ref. ${i.id}</span><span class="cnt">${I.cam} ${i.fotos.length}</span></a>
    <div class="bd">
      <div class="loc">${i.bairro} · ${i.neg === 'venda' ? 'Venda' : 'Aluguel'}</div>
      <a href="#/imovel/${i.id}"><h3>${i.titulo}</h3></a>
      ${specs(i)}
      <div class="pr"><span class="price tnum">${precoTxt(i)}</span><button class="wa" data-wa="${i.id}" aria-label="Perguntar sobre o imóvel ${i.id} no WhatsApp">${I.wa}</button></div>
    </div></article>`;
}

function opts(b) {
  const o = (v, l, cur) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${l}</option>`;
  const bairros = [...new Set(IMOVEIS.filter(i => i.neg === b.neg).map(i => i.bairro))].sort();
  const tipos = [...new Set(IMOVEIS.filter(i => i.neg === b.neg).map(i => i.tipo))];
  return {
    bairro: o('', 'Todos os bairros', b.bairro) + bairros.map(x => o(x, x, b.bairro)).join(''),
    tipo: o('', 'Todos os tipos', b.tipo) + tipos.map(x => o(x, x, b.tipo)).join(''),
    max: FAIXAS[b.neg].map(([v, l]) => o(v, l, b.max)).join(''),
    dorms: [0, 1, 2, 3, 4].map(v => o(v, v ? v + '+ dorms' : 'Dormitórios', b.dorms)).join(''),
    ordem: o('rel', 'Destaques primeiro', b.ordem) + o('menor', 'Menor preço', b.ordem) + o('maior', 'Maior preço', b.ordem) + o('m2', 'Maior área', b.ordem),
  };
}

// tira filtros que não existem no tipo de negócio atual (ex.: bairro sem imóvel para alugar)
function ajustarBusca() {
  const l = IMOVEIS.filter(i => i.neg === busca.neg);
  if (busca.bairro && !l.some(i => i.bairro === busca.bairro)) busca.bairro = '';
  if (busca.tipo && !l.some(i => i.tipo === busca.tipo)) busca.tipo = '';
  if (busca.max && !FAIXAS[busca.neg].some(([v]) => v === busca.max)) busca.max = 0;
}

function filtrar(b = busca) {
  const l = IMOVEIS.filter(i => i.neg === b.neg && (!b.bairro || i.bairro === b.bairro) && (!b.tipo || i.tipo === b.tipo) && (!b.max || i.preco <= b.max) && (!b.dorms || i.dorms >= b.dorms));
  if (b.ordem === 'menor') l.sort((a, c) => a.preco - c.preco);
  if (b.ordem === 'maior') l.sort((a, c) => c.preco - a.preco);
  if (b.ordem === 'm2') l.sort((a, c) => c.m2 - a.m2);
  return l;
}

// ---------------------------------------------------------------- início
function pgInicio() {
  header('', true);
  const o = opts(busca);
  const venda = IMOVEIS.filter(i => i.neg === 'venda' && i.id !== '1262');
  const dest = byId('1262');
  const h0 = byId(HERO[0]);
  return `
  <section class="hero">
    <div class="slides">${HERO.map((id, k) => `<img src="${img(byId(id).fotos[0])}" alt="" class="${k ? '' : 'on'}" ${k ? 'loading="lazy"' : 'fetchpriority="high"'}>`).join('')}</div>
    <div class="cap" id="hcap"><span>${h0.bairro}</span><b>${brl(h0.preco)}</b><a href="#/imovel/${h0.id}">Ver imóvel</a></div>
    <div class="wrap in">
      <span class="eyebrow">Sunshine Imobiliária · São Paulo</span>
      <h1>Mude para sua <em>nova vida.</em></h1>
      <p class="lead">Compra, venda e aluguel de imóveis com atendimento direto do corretor pelo WhatsApp e assessoria do começo ao fim.</p>
      <div class="dots">${HERO.map((_, k) => `<button data-slide="${k}" class="${k ? '' : 'on'}" aria-label="Foto ${k + 1}"></button>`).join('')}</div>
      <form class="finder" id="finder">
        <div class="tabs"><button type="button" data-neg="venda" class="${busca.neg === 'venda' ? 'on' : ''}">Comprar</button><button type="button" data-neg="aluguel" class="${busca.neg === 'aluguel' ? 'on' : ''}">Alugar</button></div>
        <div class="f wide"><label for="fb">Bairro</label><select id="fb" data-f="bairro">${o.bairro}</select></div>
        <div class="f"><label for="ft">Tipo</label><select id="ft" data-f="tipo">${o.tipo}</select></div>
        <div class="f"><label for="fm">Valor</label><select id="fm" data-f="max">${o.max}</select></div>
        <button class="btn btn-gold go">Buscar imóveis</button>
      </form>
    </div>
  </section>

  <div class="marq" aria-hidden="true"><div class="mq">${[0, 1].map(() => `<span>${['Compra', 'Venda', 'Locação', 'Tatuapé', 'Vila Clementino', 'Belenzinho', 'Bela Vista', 'Assessoria jurídica', 'CRECI 29988-J'].map(t => `${t}<i>${SOL}</i>`).join('')}</span>`).join('')}</div></div>

  <section class="sec dark"><div class="wrap">
    <div class="lbl rv"><span>01</span>Sobre a Sunshine</div>
    <p class="stmt" id="stmt">${palavras('Especialistas em compra, venda e aluguel de imóveis em São Paulo. Com ética, transparência e acompanhamento jurídico do primeiro contato até a entrega das chaves.')}</p>
    <div class="nums">
      <div class="rv"><b><span data-count="${IMOVEIS.filter(i => i.neg === 'venda').length}">0</span></b><span>imóveis à venda agora</span></div>
      <div class="rv"><b><span data-count="${BAIRROS.length}">0</span></b><span>bairros onde atuamos</span></div>
      <div class="rv"><b><small>R$</small><span data-count="350">0</span><small>mil</small></b><span>imóveis a partir de</span></div>
      <div class="rv"><b><small>CRECI</small><span data-count="29988" data-plain>0</span><small>-J</small></b><span>imobiliária registrada</span></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="lbl rv"><span>02</span>Destaque da semana</div>
    <div class="feat">
      <div class="feat-ph reveal" data-href="#/imovel/${dest.id}"><img src="${img(dest.fotos[0])}" alt="${esc(dest.titulo)}" id="fimg" data-par=".08" loading="lazy">
        <div class="thumbs">${dest.fotos.map((f, k) => `<button data-fimg="${f}" class="${k ? '' : 'on'}" aria-label="Foto ${k + 1}"><img src="${img(f)}" alt="" loading="lazy"></button>`).join('')}</div></div>
      <div class="feat-bd">
        <span class="kick rv">${dest.bairro} · Ref. ${dest.id}</span>
        <h2 class="split">${sp('Alto padrão com *piscina* no Belenzinho')}</h2>
        <dl class="kv rv"><div><dt>Área</dt><dd>${dest.m2} m²</dd></div><div><dt>Dormitórios</dt><dd>${dest.dorms}</dd></div><div><dt>Suítes</dt><dd>${dest.suites}</dd></div><div><dt>Vagas</dt><dd>${dest.vagas}</dd></div></dl>
        <div class="feat-ft rv"><span class="price tnum">${brl(dest.preco)}</span><a href="#/imovel/${dest.id}" class="btn btn-navy">Conhecer ${I.arrowR}</a></div>
      </div>
    </div>
  </div></section>

  <section class="sec soft"><div class="wrap">
    <div class="lbl rv"><span>03</span>À venda</div>
    <div class="sh"><h2 class="split">${sp('Imóveis escolhidos *a dedo*')}</h2>
      <a href="#/comprar" class="link rv">Ver todos ${I.arrowR.replace('<svg', '<svg width="16" height="16"')}</a></div>
    <div class="car" id="car" aria-roledescription="carrossel"><div class="track">${venda.map(card).join('')}</div></div>
    <div class="carnav"><button data-car="-1" aria-label="Imóvel anterior">${I.arrowL}</button><span class="cnt tnum" id="carn"></span><span class="bar"><i id="carbar"></i></span><button data-car="1" aria-label="Próximo imóvel">${I.arrowR}</button></div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="lbl rv"><span>04</span>Onde estamos</div>
    <div class="sh"><h2 class="split">${sp('Bairros que a gente *conhece de perto*')}</h2></div>
    <div class="hlist" id="hlist">${BAIRROS.map((b, k) => { const n = IMOVEIS.filter(i => i.bairro === b.nome).length;
      return `<a href="#/comprar?bairro=${encodeURIComponent(b.nome)}" class="hrow" data-img="${img(b.foto)}"><span class="hn">0${k + 1}</span><img class="hth" src="${img(b.foto)}" alt="" loading="lazy"><b>${b.nome}</b><span class="hz">${b.zona}</span><span class="hc">${plural(n, 'imóvel', 'imóveis')}</span><span class="ha">${I.arrowR}</span></a>`; }).join('')}
      <a href="#/mapa" class="hrow" data-img="${img('1342-1')}"><span class="hn">0${BAIRROS.length + 1}</span><img class="hth" src="${img('1342-1')}" alt="" loading="lazy"><b>Ver todos no mapa</b><span class="hz">São Paulo</span><span class="hc">${plural(IMOVEIS.length, 'imóvel', 'imóveis')}</span><span class="ha">${I.arrowR}</span></a>
    </div>
  </div><div class="hfloat" id="hfloat"><img alt=""></div></section>

  <section class="sec dark tl-sec"><div class="wrap">
    <div class="lbl rv"><span>05</span>Como funciona</div>
    <div class="sh"><h2 class="split">${sp('Do primeiro “oi” à *chave na mão*')}</h2></div>
    <div class="tl" id="tl"><div class="tl-line"><i id="tlfill"></i></div>
      ${[['Encontre', 'Busque por bairro, valor ou direto no mapa.'], ['Converse', 'A mensagem já vai com o código do imóvel. Resposta em minutos.'], ['Visite', 'Escolha o dia e o horário que ficam bons para você.'], ['Feche', 'Documentação, financiamento e contrato com acompanhamento jurídico.']]
        .map(([t, d], k) => `<div class="ts"><span class="dot">0${k + 1}</span><b>${t}</b><p>${d}</p></div>`).join('')}
    </div>
  </div></section>

  <section class="own-sec"><div class="own" id="own"><img src="${img('1262-2')}" alt="" data-par=".12" loading="lazy">
    <div class="own-in wrap">
      <div class="lbl light rv"><span>06</span>Para proprietários</div>
      <h2 class="split">${sp('Quer vender ou alugar? *A gente cuida de tudo.*')}</h2>
      <p class="rv">Avaliação, fotos, anúncio e visitas só com quem tem interesse de verdade.</p>
      <div class="b rv"><a href="#/anuncie" class="btn btn-gold">Anunciar meu imóvel</a><a href="${waLink('Olá! Quero anunciar meu imóvel com a Sunshine.')}" target="_blank" rel="noopener" class="btn btn-glass">${I.wa} Falar agora</a></div>
    </div></div></section>

  <section class="sec"><div class="wrap fin2">
    <div><div class="lbl rv"><span>07</span>Financiamento</div>
      <h2 class="split">${sp('Quanto fica *a parcela?*')}</h2>
      <p class="rv muted" style="font-size:17px;max-width:420px">Simule agora. Depois, a Sunshine ajuda você a comparar os bancos e a reunir a documentação.</p>
      <a href="#/financie" class="link rv" style="margin-top:22px">Como funciona o financiamento ${I.arrowR.replace('<svg', '<svg width="16" height="16"')}</a></div>
    ${calc(800000)}
  </div></section>

  <section class="cta-end"><div class="wrap">
    <h2 class="split">${sp('Vamos encontrar o seu *novo endereço?*')}</h2>
    <div class="b rv"><a class="btn btn-gold" href="${waLink('Olá! Vim pelo site da Sunshine e gostaria de ajuda para encontrar um imóvel.')}" target="_blank" rel="noopener">${I.wa} Chamar no WhatsApp</a><a class="btn btn-line" href="${EMPRESA.instagram}" target="_blank" rel="noopener">${I.insta} @imobiliariasunshine</a></div>
  </div></section>
  ${footer()}`;
}

function calc(valor) {
  return `<div class="calc rv" id="calc">
    <div class="row"><label>Valor do imóvel <output id="cv">${brl(valor)}</output></label><input type="range" min="200000" max="3000000" step="10000" value="${valor}" data-calc="valor" aria-label="Valor do imóvel"></div>
    <div class="row"><label>Entrada <output id="ce">20%</output></label><input type="range" min="10" max="70" step="5" value="20" data-calc="entrada" aria-label="Entrada"></div>
    <div class="row"><label>Prazo <output id="cp">30 anos</output></label><input type="range" min="5" max="35" step="5" value="30" data-calc="prazo" aria-label="Prazo"></div>
    <div class="res"><div><span>Parcela estimada</span><b id="cr" class="tnum">${brl(parcela(valor))}</b></div><a class="btn btn-gold btn-sm" href="#/contato">Quero ajuda</a></div>
    <small>Simulação aproximada pela tabela Price, com juros de referência de 11,5% ao ano. A taxa real é definida pelo banco.</small>
  </div>`;
}
function atualizarCalc() {
  const c = $('#calc'); if (!c) return;
  const v = +$('[data-calc="valor"]', c).value, e = +$('[data-calc="entrada"]', c).value, p = +$('[data-calc="prazo"]', c).value;
  $('#cv').textContent = brl(v); $('#ce').textContent = `${e}% · ${brl(v * e / 100)}`; $('#cp').textContent = `${p} anos`;
  const cr = $('#cr'); cr.textContent = brl(parcela(v, e / 100, p)); cr.classList.remove('bump'); void cr.offsetWidth; cr.classList.add('bump');
}

// ---------------------------------------------------------------- listagem
function pgLista(neg) {
  busca.neg = neg; ajustarBusca();
  header(neg, false);
  const o = opts(busca), l = filtrar();
  return `<section class="ph-top"><div class="wrap">
    <span class="eyebrow">${neg === 'venda' ? 'Comprar' : 'Alugar'}</span>
    <h1>${neg === 'venda' ? 'Imóveis à venda' : 'Imóveis para alugar'}${busca.bairro ? `<br><em style="color:var(--gold);font-style:italic">${busca.bairro}</em>` : ''}</h1>
    <p>${neg === 'venda' ? 'Apartamentos selecionados nas melhores regiões de São Paulo.' : 'Pronto para morar, com contrato simples e atendimento direto.'}</p>
  </div></section>
  <div class="fbar"><div class="wrap">
    <a href="#/comprar" class="chip ${neg === 'venda' ? 'on' : ''}">Comprar</a><a href="#/alugar" class="chip ${neg === 'aluguel' ? 'on' : ''}">Alugar</a>
    <select class="chip" data-f="bairro" aria-label="Bairro">${o.bairro}</select>
    <select class="chip" data-f="tipo" aria-label="Tipo">${o.tipo}</select>
    <select class="chip" data-f="max" aria-label="Valor">${o.max}</select>
    <select class="chip" data-f="dorms" aria-label="Dormitórios">${o.dorms}</select>
    <select class="chip" data-f="ordem" aria-label="Ordenar">${o.ordem}</select>
    <a href="#/mapa" class="chip sp">${I.pin.replace('<svg', '<svg width="16" height="16"')} Ver no mapa</a>
  </div></div>
  <section class="sec" style="padding-top:40px"><div class="wrap">
    <div class="count">${plural(l.length, 'imóvel encontrado', 'imóveis encontrados')}</div>
    ${l.length ? `<div class="cards">${l.map(card).join('')}</div>` : `<div class="empty"><h3>Nenhum imóvel com esses filtros</h3><p>Fale com a gente: avisamos quando entrar um imóvel assim.</p><button class="btn btn-line" data-limpar>Limpar filtros</button> <button class="btn btn-wa" data-wa="">${I.wa} Avisar no WhatsApp</button></div>`}
  </div></section>${footer()}`;
}

// ---------------------------------------------------------------- mapa
let mapa = null, selecionado = null;
function pgMapa() {
  header('mapa', false); ajustarBusca();
  const o = opts(busca), l = filtrar();
  if (!l.some(i => i.id === selecionado)) selecionado = l[0]?.id || null;
  return `<div style="padding-top:var(--hh)"></div>
  <div class="fbar"><div class="wrap" style="max-width:none">
    <button class="chip ${busca.neg === 'venda' ? 'on' : ''}" data-neg="venda">Comprar</button><button class="chip ${busca.neg === 'aluguel' ? 'on' : ''}" data-neg="aluguel">Alugar</button>
    <select class="chip" data-f="bairro" aria-label="Bairro">${o.bairro}</select>
    <select class="chip" data-f="tipo" aria-label="Tipo">${o.tipo}</select>
    <select class="chip" data-f="max" aria-label="Valor">${o.max}</select>
    <select class="chip" data-f="dorms" aria-label="Dormitórios">${o.dorms}</select>
    <span class="sp muted" style="font-weight:700;font-size:14px;white-space:nowrap">${plural(l.length, 'imóvel', 'imóveis')} no mapa</span>
  </div></div>
  <div class="mapv">
    <div class="list">${l.length ? l.map(i => `<div class="mrow ${i.id === selecionado ? 'on' : ''}" data-sel="${i.id}">
      <img src="${img(i.fotos[0])}" alt="" loading="lazy"><div><div class="loc">${i.bairro}</div><div class="price tnum">${precoTxt(i)}</div>
      <div class="s">${[i.dorms ? plural(i.dorms, 'dorm', 'dorms') : '', i.m2 + ' m²', i.vagas ? plural(i.vagas, 'vaga', 'vagas') : ''].filter(Boolean).join(' · ')}</div>
      <a href="#/imovel/${i.id}">Ver imóvel</a></div></div>`).join('') : '<div class="empty"><h3>Nada por aqui</h3><p>Mude os filtros para ver mais imóveis.</p></div>'}</div>
    <div class="mapbox"><div id="map" role="region" aria-label="Mapa dos imóveis"></div></div>
  </div>`;
}

// Mapa: com a chave do Google (config.js) usa o Google Maps; sem chave, usa um mapa de ruas colorido.
const GKEY = (window.SUNSHINE_CONFIG && window.SUNSHINE_CONFIG.googleMapsKey || '').trim();
let googleCarregando = null;
function carregarGoogle() {
  if (window.google && google.maps && google.maps.Map) return Promise.resolve();
  if (!googleCarregando) googleCarregando = new Promise((ok, erro) => {
    window._gmPronto = ok;
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(GKEY)}&callback=_gmPronto&loading=async&language=pt-BR&region=BR`;
    s.async = true; s.onerror = erro; document.head.appendChild(s);
  });
  return googleCarregando;
}
const pinHtml = (i, opts) => `<span class="pin ${i.neg === 'aluguel' ? 'rent' : ''} ${i.id === opts.on ? 'on' : ''}" data-pin="${i.id}">${opts.label || curto(i.preco)}</span>`;

async function iniciarMapa(el, lista, opts = {}) {
  if (GKEY) {
    try { await carregarGoogle(); } catch (e) { return mapaLeaflet(el, lista, opts); }
    if (!el.isConnected) return null;
    return mapaGoogle(el, lista, opts);
  }
  return mapaLeaflet(el, lista, opts);
}

function mapaGoogle(el, lista, opts) {
  const m = new google.maps.Map(el, { center: { lat: -23.56, lng: -46.62 }, zoom: 12, disableDefaultUI: true, zoomControl: true, fullscreenControl: true, clickableIcons: false, gestureHandling: opts.wheel ? 'greedy' : 'cooperative' });
  class Pin extends google.maps.OverlayView {
    constructor(i) { super(); this.i = i; }
    onAdd() {
      const d = document.createElement('div'); d.innerHTML = pinHtml(this.i, opts); this.div = d.firstChild;
      google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.div);
      if (opts.click) this.div.addEventListener('click', () => opts.click(this.i.id));
      this.getPanes().overlayMouseTarget.appendChild(this.div);
    }
    draw() { const pt = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(this.i.lat, this.i.lng)); this.div.style.left = pt.x + 'px'; this.div.style.top = pt.y + 'px'; }
    onRemove() { this.div.remove(); }
  }
  const pins = lista.map(i => { const p = new Pin(i); p.setMap(m); return p; });
  if (lista.length > 1) { const bb = new google.maps.LatLngBounds(); lista.forEach(i => bb.extend({ lat: i.lat, lng: i.lng })); m.fitBounds(bb, 70); }
  else if (lista.length) { m.setCenter({ lat: lista[0].lat, lng: lista[0].lng }); m.setZoom(opts.zoom || 15); }
  return { remove() { pins.forEach(p => p.setMap(null)); el.innerHTML = ''; }, pan(id) { const i = byId(id); m.panTo({ lat: i.lat, lng: i.lng }); } };
}

function mapaLeaflet(el, lista, opts) {
  if (!window.L) { el.innerHTML = '<div class="mapfail">Não foi possível carregar o mapa agora.</div>'; return null; }
  if (!el.isConnected) return null;
  const m = L.map(el, { scrollWheelZoom: !!opts.wheel });
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Mapa &copy; Esri' }).addTo(m);
  const mk = {};
  lista.forEach(i => {
    mk[i.id] = L.marker([i.lat, i.lng], { icon: L.divIcon({ className: '', html: pinHtml(i, opts), iconSize: [0, 0] }), riseOnHover: true }).addTo(m);
    if (opts.click) mk[i.id].on('click', () => opts.click(i.id));
  });
  if (lista.length > 1) m.fitBounds(L.latLngBounds(lista.map(i => [i.lat, i.lng])), { padding: [60, 60] });
  else if (lista.length) m.setView([lista[0].lat, lista[0].lng], opts.zoom || 15);
  else m.setView([-23.56, -46.62], 12);
  return { remove() { m.remove(); }, pan(id) { const i = byId(id); m.panTo([i.lat, i.lng]); }, z(id) { Object.entries(mk).forEach(([k, x]) => x.setZIndexOffset(k === id ? 1000 : 0)); } };
}

function selecionar(id, deMapa) {
  selecionado = id;
  $$('.mrow').forEach(r => r.classList.toggle('on', r.dataset.sel === id));
  $$('.pin').forEach(p => p.classList.toggle('on', p.dataset.pin === id));
  mapa?.z?.(id);
  if (deMapa) $(`.mrow[data-sel="${id}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  else mapa?.pan(id);
}

// ---------------------------------------------------------------- imóvel
function pgImovel(id) {
  const i = byId(id);
  header(i?.neg || '', false);
  if (!i) return `<section class="page"><div class="wrap"><div class="empty"><h3>Este imóvel não está mais disponível</h3><p>Que tal ver outros?</p><a href="#/comprar" class="btn btn-navy">Ver imóveis</a></div></div></section>${footer()}`;
  const sim = IMOVEIS.filter(o => o.id !== i.id && o.neg === i.neg).sort((a, b) => (b.bairro === i.bairro) - (a.bairro === i.bairro) || Math.abs(a.preco - i.preco) - Math.abs(b.preco - i.preco)).slice(0, 3);
  const facts = [[I.area, `${i.m2} m²`, 'área privativa'], [I.bed, i.dorms, i.dorms === 1 ? 'dormitório' : 'dormitórios'], [I.suite, i.suites || '—', i.suites === 1 ? 'suíte' : 'suítes'], [I.car, i.vagas || '—', i.vagas === 1 ? 'vaga' : 'vagas']];
  return `<div class="wrap">
    <div class="crumb"><a href="#/">Início</a> / <a href="#/${i.neg === 'venda' ? 'comprar' : 'alugar'}">${i.neg === 'venda' ? 'Comprar' : 'Alugar'}</a> / <a href="#/comprar?bairro=${encodeURIComponent(i.bairro)}">${i.bairro}</a> / Ref. ${i.id}</div>
    <div class="gal">${i.fotos.map((f, k) => `<button data-lb="${k}" aria-label="Ampliar foto ${k + 1}"><img src="${img(f)}" alt="${esc(i.titulo)}, foto ${k + 1}" ${k ? 'loading="lazy"' : ''}>${k === i.fotos.length - 1 ? `<span class="all">Ver ${i.fotos.length} fotos</span>` : ''}</button>`).join('')}</div>
    <div class="gal-wrap"><div class="gal-m" id="galm">${i.fotos.map((f, k) => `<img src="${img(f)}" alt="${esc(i.titulo)}, foto ${k + 1}" data-lb="${k}" ${k ? 'loading="lazy"' : ''}>`).join('')}</div><span class="n" id="galn">1 / ${i.fotos.length}</span></div>
    <div class="pv">
      <div>
        <div class="loc">${i.bairro} · ${i.zona} · Ref. ${i.id}</div>
        <h1>${i.titulo}</h1>
        <div class="sub">${i.tipo} ${i.neg === 'venda' ? 'à venda' : 'para alugar'} em ${i.bairro}, São Paulo</div>
        <div class="facts">${facts.map(([ic, v, t]) => `<div>${ic}<b>${v}</b><span>${t}</span></div>`).join('')}</div>
        <h2>Sobre o imóvel</h2>
        <div class="desc">${i.desc.map(p => `<p>${p}</p>`).join('')}</div>
        <div class="tags">${i.itens.map(t => `<span>${t}</span>`).join('')}</div>
        <h2>Localização</h2>
        <div class="minimap" id="minimap">${GKEY ? '' : `<iframe title="Mapa de ${esc(i.bairro)}" src="https://maps.google.com/maps?q=${i.lat},${i.lng}&z=15&hl=pt-BR&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="border:0;width:100%;height:100%"></iframe>`}</div>
        <p class="note">Localização aproximada. O endereço exato é passado pelo corretor.</p>
        ${i.neg === 'venda' ? `<h2>Simule o financiamento</h2>${calc(i.preco)}` : ''}
      </div>
      <aside class="aside">
        <div class="k">${i.neg === 'venda' ? 'Valor de venda' : 'Aluguel mensal'}</div>
        <div class="price tnum">${precoTxt(i)}</div>
        <div class="parc">${i.neg === 'venda' ? `Parcela a partir de <b>${brl(parcela(i.preco))}</b>/mês*` : 'Contrato direto com a Sunshine'}</div>
        <button class="btn btn-wa" data-wa="${i.id}">${I.wa} Falar no WhatsApp</button>
        <button class="btn btn-navy" data-agendar="${i.id}">${I.cal} Agendar visita</button>
        <div class="agent"><span class="av"><img src="img/logo-header-branco.png" alt=""></span><div><b>Equipe Sunshine</b><span>CRECI ${EMPRESA.creci} · resposta em minutos</span></div></div>
        <div class="share"><button data-share="${i.id}">${I.share} Compartilhar</button><button data-fav="${i.id}">${I.heart} Salvar</button></div>
        ${i.neg === 'venda' ? '<p class="note">*Simulação com 20% de entrada em 30 anos.</p>' : ''}
      </aside>
    </div>
    ${sim.length ? `<section style="padding-bottom:96px"><div class="sh"><div><span class="eyebrow">Veja também</span><h2>Imóveis parecidos</h2></div></div><div class="cards">${sim.map(card).join('')}</div></section>` : ''}
  </div>
  <div class="mbar"><div class="p"><b class="tnum">${precoTxt(i)}</b><span>Ref. ${i.id} · ${i.bairro}</span></div><button class="btn btn-navy" data-agendar="${i.id}">Visitar</button><button class="btn btn-wa" data-wa="${i.id}">${I.wa} WhatsApp</button></div>
  ${footer()}`;
}

// ---------------------------------------------------------------- outras páginas
function pgContato(anuncie) {
  header(anuncie ? 'anuncie' : 'contato', false);
  return `<section class="page"><div class="wrap contact">
    <div>
      <span class="eyebrow">${anuncie ? 'Para proprietários' : 'Contato'}</span>
      <h1>${anuncie ? 'Anuncie seu imóvel com a <em>Sunshine</em>' : 'Vamos conversar sobre o seu <em>próximo imóvel</em>'}</h1>
      <p class="lead">${anuncie ? 'Avaliação, fotos, anúncio e visitas com quem tem interesse de verdade. Você acompanha tudo pelo WhatsApp.' : 'O jeito mais rápido é o WhatsApp. Se preferir, deixe sua mensagem e a gente retorna.'}</p>
      <div class="clist">
        <a href="${waLink(anuncie ? 'Olá! Quero anunciar meu imóvel com a Sunshine.' : 'Olá! Vim pelo site da Sunshine.')}" target="_blank" rel="noopener"><i>${I.wa}</i><span><b>WhatsApp</b><span>${EMPRESA.tel1}</span></span></a>
        <a href="tel:+5511972976940"><i>${I.phone}</i><span><b>Telefone</b><span>${EMPRESA.tel2}</span></span></a>
        <a href="mailto:${EMPRESA.email}"><i>${I.mail}</i><span><b>E-mail</b><span>${EMPRESA.email}</span></span></a>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Rua Senador Feijó, 40, São Paulo')}" target="_blank" rel="noopener"><i>${I.pin}</i><span><b>Escritório</b><span>${EMPRESA.endereco} · ${EMPRESA.bairroEnd}</span></span></a>
      </div>
    </div>
    <form class="card-form form" id="cform">
      <h2>${anuncie ? 'Conte sobre o imóvel' : 'Mande uma mensagem'}</h2>
      <label for="cn">Nome</label><input id="cn" name="nome" required autocomplete="name">
      <div class="two"><div><label for="ct">WhatsApp</label><input id="ct" name="tel" required inputmode="tel" autocomplete="tel" placeholder="(11) 9xxxx-xxxx"></div>
      <div><label for="ca">Assunto</label><select id="ca" name="assunto">${anuncie ? '<option>Quero vender</option><option>Quero alugar</option>' : '<option>Quero comprar</option><option>Quero alugar</option><option>Quero vender</option><option>Financiamento</option><option>Outro</option>'}</select></div></div>
      ${anuncie ? '<label for="cb">Bairro do imóvel</label><input id="cb" name="bairro" placeholder="Ex.: Tatuapé">' : ''}
      <label for="cm">Mensagem</label><textarea id="cm" name="msg" placeholder="${anuncie ? 'Tipo, metragem, dormitórios...' : 'Opcional'}"></textarea>
      <label class="chk"><input type="checkbox" required> <span>Concordo com a <a href="#/privacidade">política de privacidade</a> e aceito o contato da Sunshine.</span></label>
      <div class="acts"><button class="btn btn-gold">Enviar mensagem</button></div>
    </form>
  </div></section>${footer()}`;
}

function pgFinancie() {
  header('financie', false);
  return `<section class="ph-top"><div class="wrap"><span class="eyebrow">Financiamento</span><h1>Seu imóvel cabe no bolso</h1><p>Simule a parcela e conte com a Sunshine para comparar os bancos, organizar a documentação e acompanhar a aprovação.</p></div></section>
  <section class="sec"><div class="wrap fin">
    <div><span class="eyebrow">Simulador</span><h2>Ajuste os valores</h2><p>Mexa no valor, na entrada e no prazo para ver a parcela estimada.</p>
      <div class="steps" style="grid-template-columns:minmax(0,1fr);margin-top:28px;gap:12px">
        <div class="step" style="padding:20px 22px"><b>Análise de crédito</b><span>Ajudamos a reunir os documentos e enviar para os bancos.</span></div>
        <div class="step" style="padding:20px 22px"><b>Melhor condição</b><span>Comparamos as propostas para você escolher a melhor.</span></div>
      </div></div>
    ${calc(800000)}
  </div></section>${footer()}`;
}

function pgPrivacidade() {
  header('', false);
  return `<section class="page"><div class="wrap prose"><span class="eyebrow">LGPD</span><h1>Política de privacidade</h1>
    <h2>O que coletamos</h2><p>Nome, WhatsApp e o imóvel de interesse, quando você manda uma mensagem ou agenda uma visita. Também contamos visitas às páginas, sem identificar você.</p>
    <h2>Para que usamos</h2><p>Só para responder você e combinar visitas. Não vendemos nem repassamos seus dados.</p>
    <h2>Seus direitos</h2><p>Você pode pedir a qualquer momento para ver, corrigir ou apagar seus dados, pelo WhatsApp ou pelo e-mail ${EMPRESA.email}.</p>
    <p class="note" style="margin-top:30px">Texto de exemplo para o protótipo, a ser revisado pelo jurídico da Sunshine.</p>
  </div></section>${footer()}`;
}

// ---------------------------------------------------------------- modais
function modal(html) { $('#layer').innerHTML = `<div class="ov" data-ov><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`; document.body.style.overflow = 'hidden'; }
function fechar() { $('#layer').innerHTML = ''; document.body.style.overflow = ''; }
function toast(t) { const el = document.createElement('div'); el.className = 'toast'; el.textContent = t; document.body.appendChild(el); setTimeout(() => el.remove(), 3200); }

function abrirWA(id) {
  const i = id ? byId(id) : null;
  const msg = i ? `Olá! Vi no site da Sunshine o imóvel Ref. ${i.id} (${i.titulo}, ${i.bairro}, ${brl(i.preco)}${i.neg === 'aluguel' ? '/mês' : ''}) e gostaria de mais informações.`
    : 'Olá! Vim pelo site da Sunshine e gostaria de ajuda para encontrar um imóvel.';
  modal(`<h3>Falar no WhatsApp</h3><p class="lead">A mensagem já vai pronta${i ? ', com o código do imóvel' : ''}. É só enviar.</p>
    <div class="wa-prev"><div class="wa-bub">${esc(msg)}</div></div>
    <div class="form"><div class="acts"><button class="btn btn-line" data-close>Voltar</button><a class="btn btn-wa" href="${waLink(msg)}" target="_blank" rel="noopener" data-close>${I.wa} Abrir WhatsApp</a></div></div>`);
}

function abrirAgenda(id) {
  const i = byId(id);
  const dias = []; for (let k = 1; dias.length < 7; k++) { const d = new Date(); d.setDate(d.getDate() + k); if (d.getDay()) dias.push(d); }
  modal(`<form class="form" id="aform"><h3>Agendar visita</h3><p class="lead">${i ? `Ref. ${i.id} · ${i.titulo}` : 'Escolha o melhor dia para você.'}</p>
    <input type="hidden" name="im" value="${i ? i.id : ''}">
    <label>Dia</label><div class="slots">${dias.map((d, k) => `<label><input type="radio" name="dia" value="${d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}" ${k ? '' : 'checked'}><span>${d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}<b>${d.getDate()}</b></span></label>`).join('')}</div>
    <label>Horário</label><div class="slots h">${['9h', '10h', '11h', '14h', '15h', '16h', '17h'].map((h, k) => `<label><input type="radio" name="h" value="${h}" ${k === 3 ? 'checked' : ''}><span>${h}</span></label>`).join('')}</div>
    <label for="an">Nome</label><input id="an" name="nome" required autocomplete="name">
    <label for="at">WhatsApp</label><input id="at" name="tel" required inputmode="tel" autocomplete="tel" placeholder="(11) 9xxxx-xxxx">
    <label class="chk"><input type="checkbox" required> <span>Concordo com a <a href="#/privacidade">política de privacidade</a> e aceito o contato sobre esta visita.</span></label>
    <div class="acts"><button type="button" class="btn btn-line" data-close>Cancelar</button><button class="btn btn-navy">Pedir visita</button></div></form>`);
}

function lightbox(fotos, k) {
  const show = () => { $('#lbi').src = img(fotos[k]); $('#lbn').textContent = `${k + 1} / ${fotos.length}`; };
  $('#layer').innerHTML = `<div class="lb" data-ov><img id="lbi" alt=""><button class="x" data-close aria-label="Fechar">×</button><button class="pr-" data-lbm="-1" aria-label="Anterior">‹</button><button class="nx" data-lbm="1" aria-label="Próxima">›</button><span class="n" id="lbn"></span></div>`;
  document.body.style.overflow = 'hidden';
  window._lbMove = d => { k = (k + d + fotos.length) % fotos.length; show(); };
  show();
}

function abrirMenu() {
  $('#layer').innerHTML = `<div class="drawer"><div class="top"><img src="img/logo-header-branco.png" alt="Sunshine Imobiliária"><button class="x" data-close aria-label="Fechar menu">×</button></div>
    <nav>${MENU.map(([h, t]) => `<a href="${h}">${t}<span>→</span></a>`).join('')}</nav>
    <div class="end"><a class="btn btn-wa" href="${waLink('Olá! Vim pelo site da Sunshine e gostaria de atendimento.')}" target="_blank" rel="noopener">${I.wa} ${EMPRESA.tel1}</a><a class="btn btn-glass" href="tel:+5511972976940">${I.phone} ${EMPRESA.tel2}</a><small>CRECI ${EMPRESA.creci} · ${EMPRESA.endereco}</small></div></div>`;
  document.body.style.overflow = 'hidden';
}

// ---------------------------------------------------------------- roteador
let slideTimer = null, revealObs = null;
function render() {
  const [path, q] = (location.hash.slice(1) || '/').split('?');
  const p = new URLSearchParams(q || ''); if (p.has('bairro')) busca.bairro = p.get('bairro');
  const parts = path.split('/').filter(Boolean);
  if (mapa) { mapa.remove(); mapa = null; }
  clearInterval(slideTimer); fechar();
  let html;
  switch (parts[0]) {
    case 'comprar': html = pgLista('venda'); break;
    case 'alugar': html = pgLista('aluguel'); break;
    case 'mapa': html = pgMapa(); break;
    case 'imovel': html = pgImovel(parts[1]); break;
    case 'contato': html = pgContato(false); break;
    case 'anuncie': html = pgContato(true); break;
    case 'financie': html = pgFinancie(); break;
    case 'privacidade': html = pgPrivacidade(); break;
    default: html = pgInicio();
  }
  $('#root').innerHTML = html;
  window.scrollTo(0, 0);
  depois(parts);
}

function rerender() {
  const y = scrollY, [path] = (location.hash.slice(1) || '/').split('?'), k = path.split('/').filter(Boolean)[0];
  if (mapa) { mapa.remove(); mapa = null; }
  $('#root').innerHTML = k === 'mapa' ? pgMapa() : pgLista(k === 'alugar' ? 'aluguel' : 'venda');
  window.scrollTo(0, y); depois([k]);
}

function depois(parts) {
  // entradas animadas: textos, títulos, rótulos, fotos e números
  revealObs?.disconnect();
  revealObs = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); revealObs.unobserve(e.target);
    if (e.target.dataset.count) contar(e.target);
  }), { rootMargin: '0px 0px -10% 0px' });
  $$('.rv, .split, .lbl, .reveal, [data-count]').forEach(el => revealObs.observe(el));
  fx = { stmtEl: $('#stmt'), stmt: $$('#stmt span'), tl: $('#tl'), tlfill: $('#tlfill'), ts: $$('.ts'), own: $('#own'), par: $$('[data-par]') };
  efeitos();
  window._carReset = null;
  if (!parts[0]) { iniciarHero(); iniciarCarrossel(); }
  const quando = fn => document.readyState === 'complete' ? fn() : window.addEventListener('load', fn, { once: true });
  if (parts[0] === 'mapa' && $('#map')) quando(async () => {
    const el = $('#map'); if (!el) return;
    const r = await iniciarMapa(el, filtrar(), { on: selecionado, click: id => selecionar(id, true), wheel: true });
    if (r && el.isConnected) mapa = r; else r?.remove();
  });
  if (parts[0] === 'imovel' && GKEY && $('#minimap')) quando(async () => {
    const i = byId(parts[1]), el = $('#minimap'); if (!i || !el) return;
    const r = await iniciarMapa(el, [i], { on: i.id, label: i.bairro, zoom: 15 });
    if (r && el.isConnected) mapa = r; else r?.remove();
  });
  const g = $('#galm'); if (g) g.addEventListener('scroll', () => { $('#galn').textContent = `${Math.round(g.scrollLeft / g.clientWidth) + 1} / ${g.children.length}`; }, { passive: true });
}

const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
function contar(el) {
  const n = +el.dataset.count, simples = 'plain' in el.dataset, fmt = v => simples ? String(v) : v.toLocaleString('pt-BR');
  if (calmo) { el.textContent = fmt(n); return; }
  const t0 = performance.now(), dur = 1800;
  const passo = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = fmt(Math.round(n * (1 - Math.pow(1 - p, 4)))); if (p < 1) requestAnimationFrame(passo); };
  requestAnimationFrame(passo);
}

// efeitos ligados à rolagem: barra de progresso, manifesto, linha do tempo, foto que expande e parallax
let fx = {}, pendente = false;
const limitar = (v, a, b) => Math.max(a, Math.min(b, v));
function efeitos() {
  const hd = $('#hd'); if (hd.dataset.transp) hd.classList.toggle('solid', scrollY > 40);
  $('#hfloat')?.classList.remove('on'); // reaparece no próximo movimento do mouse
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#prog').style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const vh = innerHeight;
  if (fx.stmtEl) {
    const r = fx.stmtEl.getBoundingClientRect();
    const p = calmo ? 1 : limitar((vh * .85 - r.top) / (r.height + vh * .3), 0, 1), k = Math.round(p * fx.stmt.length);
    fx.stmt.forEach((s, i) => s.classList.toggle('on', i < k));
  }
  if (fx.tl) {
    const r = fx.tl.getBoundingClientRect(), p = limitar((vh * .72 - r.top) / r.height, 0, 1), vert = innerWidth <= 760;
    fx.tlfill.style.transform = vert ? `scaleY(${p})` : `scaleX(${p})`;
    fx.ts.forEach((s, i) => s.classList.toggle('on', p > .02 && p >= i / Math.max(1, fx.ts.length - 1) * .9));
  }
  if (fx.own) {
    const r = fx.own.getBoundingClientRect(), p = calmo ? 1 : limitar((vh - r.top) / (vh * .85), 0, 1);
    fx.own.style.setProperty('--x', (6 * (1 - p)).toFixed(2));
  }
  if (!calmo) (fx.par || []).forEach(el => {
    const r = el.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
    el.style.transform = `translate3d(0,${(-(r.top + r.height / 2 - vh / 2) * +el.dataset.par).toFixed(1)}px,0)`;
  });
}
function onScroll() { if (pendente) return; pendente = true; requestAnimationFrame(() => { pendente = false; efeitos(); }); }

// foto do bairro que acompanha o mouse (só no computador)
let hx = 0, hy = 0, mx = 0, my = 0, hAnim = null;
function seguir() {
  const hf = $('#hfloat'); if (!hf) { hAnim = null; return; }
  hx += (mx - hx) * .14; hy += (my - hy) * .14;
  hf.style.transform = `translate3d(${hx - 150}px,${hy - 110}px,0) rotate(${limitar((mx - hx) * .06, -8, 8)}deg)`;
  hAnim = Math.abs(mx - hx) + Math.abs(my - hy) > .5 ? requestAnimationFrame(seguir) : null;
}
if (matchMedia('(hover: hover)').matches) document.addEventListener('mousemove', e => {
  const hf = $('#hfloat'); if (!hf) return;
  const row = e.target.closest && e.target.closest('.hrow');
  if (!row || innerWidth <= 760) { hf.classList.remove('on'); return; }
  if (!hf.classList.contains('on')) { hx = e.clientX; hy = e.clientY; }
  if (hf.dataset.src !== row.dataset.img) { hf.firstElementChild.src = row.dataset.img; hf.dataset.src = row.dataset.img; }
  hf.classList.add('on'); mx = e.clientX; my = e.clientY;
  if (!hAnim) hAnim = requestAnimationFrame(seguir);
});

// carrossel: setas, contador e deslize só na horizontal (a rolagem vertical continua livre)
function iniciarCarrossel() {
  const car = $('#car'); if (!car) return;
  const tr = $('.track', car), n = tr.children.length;
  let k = 0, x0 = 0, y0 = 0, dx = 0, eixo = null, ativo = false, arrastou = false;
  const porTela = () => innerWidth <= 640 ? 1 : innerWidth <= 1000 ? 2 : 3;
  const passo = () => tr.children[0].getBoundingClientRect().width + parseFloat(getComputedStyle(tr).columnGap || 0);
  const ultimo = () => Math.max(0, n - porTela());
  const nav = () => {
    const p = porTela();
    $('#carn').textContent = p === 1 ? `${k + 1} / ${n}` : `${k + 1}–${Math.min(n, k + p)} de ${n}`;
    $('#carbar').style.width = (p / n * 100) + '%'; $('#carbar').style.marginLeft = (k / n * 100) + '%';
    $$('[data-car]').forEach(b => b.disabled = +b.dataset.car < 0 ? k === 0 : k >= ultimo());
  };
  const ir = (i, anima = true) => { k = Math.max(0, Math.min(ultimo(), i)); tr.style.transition = anima ? '' : 'none'; tr.style.transform = `translateX(${-k * passo()}px)`; nav(); };
  window._car = d => ir(k + d);
  window._carReset = () => ir(k, false);
  car.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button) return; x0 = e.clientX; y0 = e.clientY; dx = 0; eixo = null; ativo = true; });
  car.addEventListener('pointermove', e => {
    if (!ativo) return;
    const mx = e.clientX - x0, my = e.clientY - y0;
    if (!eixo && (Math.abs(mx) > 8 || Math.abs(my) > 8)) eixo = Math.abs(mx) > Math.abs(my) ? 'x' : 'y';
    if (eixo !== 'x') return;
    dx = mx; if ((k === 0 && dx > 0) || (k >= ultimo() && dx < 0)) dx /= 3; // resistência nas pontas
    tr.style.transition = 'none'; tr.style.transform = `translateX(${-k * passo() + dx}px)`;
  });
  const soltar = () => { if (!ativo) return; ativo = false; if (eixo === 'x') { arrastou = Math.abs(dx) > 6; ir(dx < -50 ? k + 1 : dx > 50 ? k - 1 : k); } };
  car.addEventListener('pointerup', soltar); car.addEventListener('pointercancel', soltar); car.addEventListener('pointerleave', soltar);
  car.addEventListener('click', e => { if (arrastou) { e.preventDefault(); e.stopPropagation(); arrastou = false; } }, true);
  car.addEventListener('dragstart', e => e.preventDefault());
  ir(0, false);
}

function iniciarHero() {
  let k = 0; const imgs = $$('.hero .slides img'), dots = $$('.hero .dots button');
  const go = n => { k = n; imgs.forEach((im, j) => im.classList.toggle('on', j === k)); dots.forEach((d, j) => d.classList.toggle('on', j === k));
    const i = byId(HERO[k]); const c = $('#hcap'); if (c) c.innerHTML = `<span>${i.bairro}</span><b>${brl(i.preco)}</b><a href="#/imovel/${i.id}">Ver imóvel</a>`; };
  window._heroGo = n => { go(n); clearInterval(slideTimer); slideTimer = setInterval(() => go((k + 1) % imgs.length), 6000); };
  slideTimer = setInterval(() => go((k + 1) % imgs.length), 6000);
}


// ---------------------------------------------------------------- eventos
document.addEventListener('click', e => {
  const t = e.target;
  if (t.matches('[data-ov]') || t.closest('[data-close]')) { if (!t.closest('a[data-close]')) e.preventDefault(); fechar(); return; }
  if (t.closest('.drawer nav a')) { fechar(); return; }
  if (t.closest('[data-menu]')) { abrirMenu(); return; }
  const wa = t.closest('[data-wa]'); if (wa) { e.preventDefault(); abrirWA(wa.dataset.wa); return; }
  const ag = t.closest('[data-agendar]'); if (ag) { abrirAgenda(ag.dataset.agendar); return; }
  const lb = t.closest('[data-lb]'); if (lb) { const id = location.hash.split('/')[2]; lightbox(byId(id).fotos, +lb.dataset.lb); return; }
  const lm = t.closest('[data-lbm]'); if (lm) { window._lbMove(+lm.dataset.lbm); return; }
  const sl = t.closest('[data-slide]'); if (sl) { window._heroGo(+sl.dataset.slide); return; }
  const fh = t.closest('[data-href]'); if (fh && !t.closest('[data-fimg]')) { location.hash = fh.dataset.href; return; }
  const fi = t.closest('[data-fimg]'); if (fi) { $('#fimg').src = img(fi.dataset.fimg); $$('[data-fimg]').forEach(b => b.classList.toggle('on', b === fi)); return; }
  const cr = t.closest('[data-car]'); if (cr) { window._car?.(+cr.dataset.car); return; }
  const neg = t.closest('[data-neg]');
  if (neg) {
    busca.neg = neg.dataset.neg; busca.max = 0; busca.bairro = ''; busca.tipo = '';
    if ($('#finder')) { $$('#finder [data-neg]').forEach(b => b.classList.toggle('on', b === neg)); const o = opts(busca); $('#fb').innerHTML = o.bairro; $('#ft').innerHTML = o.tipo; $('#fm').innerHTML = o.max; }
    else rerender();
    return;
  }
  const sel = t.closest('[data-sel]'); if (sel && !t.closest('a')) { selecionar(sel.dataset.sel, false); return; }
  if (t.closest('[data-limpar]')) { Object.assign(busca, { bairro: '', tipo: '', max: 0, dorms: 0 }); history.replaceState(null, '', location.hash.split('?')[0]); rerender(); return; }
  const sh = t.closest('[data-share]');
  if (sh) { const url = location.href, i = byId(sh.dataset.share);
    if (navigator.share) navigator.share({ title: i.titulo, text: `${i.titulo} · ${brl(i.preco)}`, url }).catch(() => {});
    else navigator.clipboard?.writeText(url).then(() => toast('Link copiado.'), () => toast(url)); return; }
  const fv = t.closest('[data-fav]'); if (fv) { fv.classList.toggle('on'); fv.style.borderColor = fv.classList.contains('on') ? 'var(--gold)' : ''; toast(fv.classList.contains('on') ? 'Imóvel salvo nos favoritos.' : 'Removido dos favoritos.'); }
});

document.addEventListener('input', e => { if (e.target.dataset.calc) atualizarCalc(); });
document.addEventListener('change', e => {
  const f = e.target.dataset.f; if (!f) return;
  busca[f] = ['max', 'dorms'].includes(f) ? +e.target.value : e.target.value;
  if (f === 'bairro' && location.hash.includes('?')) history.replaceState(null, '', location.hash.split('?')[0]);
  if (!$('#finder')) rerender();
});
document.addEventListener('submit', e => {
  e.preventDefault(); const f = e.target;
  if (f.id === 'finder') { location.hash = busca.neg === 'venda' ? '#/comprar' : '#/alugar'; return; }
  if (f.id === 'aform') {
    const i = byId(f.im.value), nome = f.nome.value.trim().split(' ')[0];
    modal(`<div class="done"><div class="ic">${I.check}</div><h3>Pedido enviado, ${esc(nome)}!</h3><p class="lead" style="margin-top:8px">Recebemos seu pedido de visita para <b>${esc(f.dia.value)}, às ${esc(f.h.value)}</b>${i ? ` no imóvel Ref. ${i.id}` : ''}. Vamos confirmar pelo WhatsApp.</p><div class="form"><div class="acts"><button class="btn btn-navy" data-close>Fechar</button></div></div></div>`);
    return;
  }
  if (f.id === 'cform') { f.reset(); toast('Mensagem enviada. Vamos responder pelo WhatsApp.'); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fechar();
  if ($('.lb') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) window._lbMove(e.key === 'ArrowRight' ? 1 : -1);
});
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => { window._carReset?.(); onScroll(); });
window.addEventListener('hashchange', render);
render();
