// Genera public/docs/paquetes-salon-terraza-2026.pdf (carta: portada, paquetes y servicios adicionales)
// con el texto de data/contenido.ts y las fotos de public/img. Usa Google Chrome instalado.
// Uso: npm run pdf:paquetes   (CHROME=/ruta/a/chrome para otro navegador)
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const projectDir = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const outDir = mkdtempSync(tmpdir() + '/pdf-paquetes-');
const pdfPath = projectDir + '/public/docs/paquetes-salon-terraza-2026.pdf';
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const require = createRequire(projectDir + '/package.json');
const ts = require('typescript');
const src = readFileSync(projectDir + '/data/contenido.ts', 'utf8');
writeFileSync(outDir + '/contenido.mjs', ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText);
const { packages, packageNotes } = await import(outDir + '/contenido.mjs');

const img = name => `file://${projectDir}/public/img/${name}`;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const icon = (paths, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const I = {
  salon: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  food: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
};

// Agrupa los renglones del paquete por tema (mismo texto del docx, solo reordenado para leerlo mejor).
const groups = [
  { title: 'Alimentos y bebidas', icon: I.food, test: /Alimentos|Complementos|Loza|Hielo|meseros/i },
  { title: 'Personal', icon: I.users, test: /Coordinador|Personal|Encargado/i },
  { title: 'Música y animación', icon: I.music, test: /DJ|Pista|Animador|Maestro|Batucada/i },
  { title: 'Salón y decoración', icon: I.salon, test: () => true },
];
const order = ['Salón y decoración', 'Personal', 'Música y animación', 'Alimentos y bebidas'];
function grouped(items) {
  const out = Object.fromEntries(order.map(t => [t, []]));
  for (const it of items) out[groups.find(g => (g.test.test ? g.test.test(it) : g.test()))?.title].push(it);
  return order.filter(t => out[t].length).map(t => ({ ...groups.find(g => g.title === t), items: out[t] }));
}
const list = items => `<ul>${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
const block = g => `<div class="grp"><h4>${icon(g.icon)}${esc(g.title)}</h4>${list(g.items)}</div>`;

const contact = `<div class="contact">
  <span>${icon(I.phone)}55 2725 1748</span><span>${icon(I.mail)}salonteraza@gmail.com</span><span>${icon(I.pin)}Tabachines Mz34 Lt 1, Fracc. Floresta. Los Reyes la Paz.</span>
</div>`;
const wave = `<svg class="wave" viewBox="0 0 816 120" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#93652a"/><stop offset=".5" stop-color="#f8cf85"/><stop offset="1" stop-color="#93652a"/></linearGradient></defs><path d="M0 92 C 300 112, 560 92, 816 18 L816 120 L0 120Z" fill="url(#g)"/></svg>`;
const photoEdge = `<svg class="edge" viewBox="0 0 816 70" preserveAspectRatio="none"><defs><linearGradient id="g2" x1="0" x2="1"><stop offset="0" stop-color="#93652a"/><stop offset=".5" stop-color="#f8cf85"/><stop offset="1" stop-color="#93652a"/></linearGradient></defs><path d="M0 70 L0 52 C 280 74, 560 60, 816 6 L816 70Z" fill="#fff"/><path d="M0 52 C 280 74, 560 60, 816 6" fill="none" stroke="url(#g2)" stroke-width="3"/></svg>`;
const footer = `${contact}${wave}`;
const num = i => String(i + 1).padStart(2, '0');

const [basico, mas, venus, orion] = packages;
const photos = ['xv.jpg', 'mesa.jpg', 'champagne.jpg', 'disco.jpg'];

const cover = `<section class="page cover">
  <div class="cover-photo" style="background-image:url(${img('brindis.jpg')})"></div>
  <div class="cover-shade"></div>
  <div class="cover-in">
    <img class="cover-logo" src="${img('logo-oscuro.png')}" alt="">
    <p class="kicker light">${esc(packageNotes.validity)}</p>
    <h1>Paquetes para su evento</h1>
    <p class="cover-lead">Ponemos a su apreciable consideración este paquete para su evento.<br><b>¡Será un placer servirle!</b></p>
  </div>
  <div class="cover-index">
    ${packages.map((p, i) => `<div><span>${num(i)}</span><b>${esc(p.name.replace('Paquete ', ''))}</b><small>${p.guests ? esc(p.guests) : '&nbsp;'}</small></div>`).join('')}
  </div>
  ${footer}
</section>`;

const half = (p, i) => `<div class="half">
  <div class="half-photo" style="background-image:url(${img(photos[i])})"><span class="num">${num(i)}</span></div>
  <div class="half-body">
    ${p.guests ? `<p class="kicker">${esc(p.guests)}</p>` : ''}
    <h2>${esc(p.name)}</h2>
    ${grouped(p.items).map(block).join('')}
  </div>
</div>`;

const halfPage = `<section class="page">
  <img class="corner-logo" src="${img('logo-claro.png')}" alt="">
  <div class="halves">${half(basico, 0)}${half(mas, 1)}</div>
  ${footer}
</section>`;

const full = (p, i) => `<section class="page">
  <div class="band" style="background-image:url(${img(photos[i])})">
    <div class="band-shade"></div>
    <img class="band-logo" src="${img('logo-oscuro.png')}" alt="">
    <div class="band-title"><span class="num">${num(i)}</span><div><p class="kicker light">${esc(p.guests)}</p><h2>${esc(p.name)}</h2></div></div>
    ${photoEdge}
  </div>
  ${p.extraHour ? `<p class="ribbon">${icon(I.clock)}1 hora extra gratis</p>` : ''}
  <div class="cols">${grouped(p.items).map(block).join('')}</div>
  ${footer}
</section>`;

const extras = `<section class="page">
  <div class="band short" style="background-image:url(${img('hero-poster.jpg')})">
    <div class="band-shade soft"></div>
    <div class="band-title center"><div><p class="kicker light">Servicios adicionales</p><h2>Para preservar en su memoria<br>un evento tan importante</h2></div></div>
    ${photoEdge}
  </div>
  <p class="intro">Ponemos a sus órdenes:</p>
  <div class="extras">
    ${[I.camera, I.salon, I.heart, I.music].map((ic, k) => `<div class="extra">${icon(ic, 'big')}<p>${esc(packageNotes.extras[k])}</p></div>`).join('')}
  </div>
  <div class="notes">
    <div class="note">${icon(I.clock, 'big')}<div><h4>Nota</h4><p>${esc(packageNotes.extraHour)}</p></div></div>
    <div class="note gold">${icon(I.wallet, 'big')}<div><h4>Aparta tu fecha</h4><p>${esc(packageNotes.payment)}</p><p><b>${esc(packageNotes.custom)}</b></p></div></div>
  </div>
  <p class="validity">${esc(packageNotes.validity)}</p>
  ${footer}
</section>`;

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Paquetes Salón Terraza 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Gilda+Display&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500&display=swap" rel="stylesheet">
<style>
@page { size: letter; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
body { font-family: Barlow, Arial, sans-serif; color: #3a352e; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { width: 816px; height: 1056px; position: relative; overflow: hidden; background: #fff; page-break-after: always }
.page:last-child { page-break-after: auto }
.page::before { content: ""; position: absolute; left: 50%; top: 56%; width: 520px; height: 212px; transform: translate(-50%, -50%); background: url(${img('candil.png')}) center/contain no-repeat; opacity: .05 }
h1, h2, h4 { font-family: 'Gilda Display', Georgia, serif; font-weight: 400; color: #1a1814 }
.kicker { font-family: 'Barlow Condensed', Arial, sans-serif; font-size: 12px; letter-spacing: .28em; text-transform: uppercase; color: #BD933A }
.kicker.light { color: #f3d79f }
.ic { width: 16px; height: 16px; flex: none; color: #BD933A }
.ic.big { width: 30px; height: 30px }
.num { font-family: 'Gilda Display', Georgia, serif; font-size: 52px; line-height: 1; color: #fff; opacity: .9 }

/* Pie: contacto + onda dorada como en la hoja membretada */
.wave { position: absolute; left: 0; bottom: 0; width: 816px; height: 120px }
.contact { position: absolute; left: 48px; bottom: 50px; display: grid; gap: 4px; font-size: 12.5px; color: #2b2722; z-index: 2 }
.contact span { display: flex; align-items: center; gap: 8px }
.contact .ic { width: 14px; height: 14px }

/* Portada */
.cover-photo { position: absolute; inset: 0 0 330px; background-size: cover; background-position: center 30% }
.cover-shade { position: absolute; inset: 0 0 330px; background: linear-gradient(180deg, rgba(12,11,9,.55), rgba(12,11,9,.72)) }
.cover-in { position: absolute; inset: 0 0 330px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 14px; color: #fff; padding: 0 80px }
.cover-logo { width: 230px; margin-bottom: 18px }
.cover h1 { font-size: 50px; color: #fff; line-height: 1.1 }
.cover-lead { font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.88) }
.cover-lead b { color: #f3d79f; font-weight: 500 }
.cover .page::before, .cover::before { display: none }
.cover-index { position: absolute; left: 48px; right: 48px; top: 780px; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid #e6dac4; border-bottom: 1px solid #e6dac4 }
.cover-index div { padding: 18px 14px; display: grid; gap: 2px; border-left: 1px solid #e6dac4 }
.cover-index div:first-child { border-left: 0 }
.cover-index span { font-family: 'Gilda Display', serif; font-size: 22px; color: #BD933A }
.cover-index b { font-family: 'Gilda Display', serif; font-weight: 400; font-size: 21px; color: #1a1814 }
.cover-index small { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #8a8378 }

/* Página con dos paquetes */
.corner-logo { position: absolute; right: 48px; top: 36px; width: 130px; z-index: 2 }
.halves { position: absolute; left: 48px; right: 48px; top: 150px; display: grid; gap: 30px }
.half { display: grid; grid-template-columns: 250px 1fr; gap: 30px; align-items: start }
.half-photo { height: 300px; background-size: cover; background-position: center; position: relative; box-shadow: 14px 14px 0 #f3e8d4 }
.half-photo .num { position: absolute; left: 16px; bottom: 12px }
.half-body h2 { font-size: 32px; margin: 4px 0 14px; padding-bottom: 10px; border-bottom: 2px solid #BD933A }

/* Página de un paquete: foto con borde curvo dorado */
.band { position: relative; height: 420px; background-size: cover; background-position: center }
.band.short { height: 300px }
.band-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(12,11,9,.35), rgba(12,11,9,.7)) }
.band-shade.soft { background: linear-gradient(180deg, rgba(12,11,9,.2), rgba(12,11,9,.6)) }
.band-logo { position: absolute; right: 48px; top: 30px; width: 130px }
.band-title { position: absolute; left: 48px; bottom: 82px; display: flex; align-items: flex-end; gap: 18px; color: #fff }
.band-title.center { left: 0; right: 0; justify-content: center; text-align: center; bottom: 92px }
.band-title h2 { font-size: 44px; color: #fff; line-height: 1.1 }
.edge { position: absolute; left: 0; bottom: -1px; width: 816px; height: 70px }
.ribbon { position: absolute; right: 48px; top: 398px; z-index: 3; display: flex; align-items: center; gap: 8px; background: #BD933A; color: #fff; padding: 9px 16px; font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: .14em; text-transform: uppercase }
.ribbon .ic { color: #fff }
.cols { position: relative; margin: 22px 48px 0; columns: 2; column-gap: 34px }

/* Grupos de renglones */
.grp { break-inside: avoid; margin-bottom: 20px }
.grp h4 { display: flex; align-items: center; gap: 8px; font-size: 19px; margin-bottom: 7px; padding-bottom: 6px; border-bottom: 1px solid #ecdfc8 }
ul { list-style: none; display: grid; gap: 4px }
li { position: relative; padding-left: 15px; font-size: 13px; line-height: 1.45 }
.half li { font-size: 12.4px }
li::before { content: ""; position: absolute; left: 1px; top: 6px; width: 5px; height: 5px; background: #BD933A; transform: rotate(45deg) }
.half .grp { margin-bottom: 12px }
.half .grp h4 { font-size: 17px }

/* Extras */
.intro { margin: 18px 48px 14px; font-family: 'Gilda Display', serif; font-size: 22px; color: #1a1814 }
.extras { margin: 0 48px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px }
.extra { background: #faf7f2; padding: 24px 18px 28px; display: grid; gap: 12px; align-content: start; border-top: 3px solid #BD933A }
.extra p { font-size: 13px; line-height: 1.45 }
.notes { margin: 30px 48px 0; display: grid; gap: 14px }
.note { display: flex; gap: 16px; align-items: flex-start; border: 1px solid #e6dac4; padding: 18px 20px }
.note h4 { font-size: 18px; margin-bottom: 4px }
.note p { font-size: 13px; line-height: 1.5 }
.note p + p { margin-top: 4px }
.note.gold { background: linear-gradient(90deg, #93652a, #c39448 35%, #d9ae62 60%, #93652a); border: 0 }
.note.gold, .note.gold h4, .note.gold .ic { color: #fff }
.validity { position: absolute; right: 48px; bottom: 132px; font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: .28em; text-transform: uppercase; color: #BD933A }
</style></head><body>
${cover}
${halfPage}
${full(venus, 2)}
${full(orion, 3)}
${extras}
</body></html>`;

writeFileSync(outDir + '/paquetes.html', html);
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=8000', `--user-data-dir=${outDir}/chrome`, `--print-to-pdf=${pdfPath}`, `file://${outDir}/paquetes.html`], { stdio: 'ignore' });
console.log('PDF generado:', pdfPath);
