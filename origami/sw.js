// Service worker di Origami Passo Passo: tiene in memoria tutta l'app, cosi' funziona anche senza rete.
// File generato da strumenti/aggiorna_sw.py: non modificarlo a mano.
const VERSIONE = 'origami-eeb34cc956';
const FILE = [
 "./",
 "index.html",
 "manifest.webmanifest",
 "favicon.ico",
 "data/catalogo.json",
 "data/halloween/01_pipistrello.json",
 "data/halloween/02_fantasma.json",
 "data/halloween/03_zucca.json",
 "data/halloween/04_gatto.json",
 "data/halloween/05_cappello.json",
 "data/halloween/07_gufo.json",
 "data/halloween/08_corvo.json",
 "data/halloween/09_teschio.json",
 "data/halloween/10_mummia.json",
 "data/halloween/11_bara.json",
 "data/halloween/12_lapide.json",
 "data/halloween/13_luna.json",
 "data/halloween/14_cilindro.json",
 "data/halloween/16_calderone.json",
 "data/halloween/17_candela.json",
 "data/halloween/18_caramella.json",
 "data/halloween/21_vampiro.json",
 "data/halloween/22_rospo.json",
 "data/halloween/23_serpente.json",
 "data/halloween/24_lupo.json",
 "data/liberi/01_gru.json",
 "data/liberi/02_barchetta.json",
 "data/liberi/03_aeroplanino.json",
 "data/liberi/04_stella.json",
 "data/liberi/05_rana.json",
 "data/liberi/06_cigno.json",
 "data/liberi/07_tulipano.json",
 "data/liberi/08_volpe.json",
 "data/liberi/09_cuore.json",
 "data/liberi/10_farfalla.json",
 "data/liberi/12_aliante.json",
 "data/liberi/13_rosa.json",
 "data/liberi/14_cravatta.json",
 "data/liberi/15_papillon.json",
 "data/liberi/17_corona.json",
 "data/liberi/18_fiocco.json",
 "data/liberi/20_colomba.json",
 "data/liberi/21_busta.json",
 "data/liberi/22_omino.json",
 "data/liberi/23_donna.json",
 "data/natale/01_albero.json",
 "data/natale/02_casetta.json",
 "data/natale/03_cappello.json",
 "data/natale/04_babbo.json",
 "data/natale/05_stella.json",
 "data/natale/06_campana.json",
 "data/natale/07_pigna.json",
 "data/natale/08_pinguino.json",
 "data/natale/09_pettirosso.json",
 "data/natale/10_colomba.json",
 "data/natale/11_sacco.json",
 "data/natale/12_busta.json",
 "data/natale/13_asinello.json",
 "data/natale/14_pupazzo.json",
 "data/natale/15_renna.json",
 "data/natale/16_mangiatoia.json",
 "data/natale/17_pacchetto.json",
 "data/natale/18_fiocco.json",
 "data/natale/20_alberosoffietto.json",
 "data/natale/21_angelo.json",
 "data/pasqua/01_uovo.json",
 "data/pasqua/02_carota.json",
 "data/pasqua/03_aquilone.json",
 "data/pasqua/04_foglia.json",
 "data/pasqua/05_fragola.json",
 "data/pasqua/06_pulcino.json",
 "data/pasqua/07_agnellino.json",
 "data/pasqua/08_pesce.json",
 "data/pasqua/09_coniglio.json",
 "data/pasqua/10_coccinella.json",
 "data/pasqua/11_pulcinouovo.json",
 "data/pasqua/12_gallina.json",
 "data/pasqua/13_croce.json",
 "data/pasqua/14_cestino.json",
 "data/pasqua/15_ape.json",
 "data/pasqua/16_sole.json",
 "data/pasqua/17_coniglietto.json",
 "data/pasqua/18_cuddura.json",
 "data/pasqua/19_calla.json",
 "data/pasqua/20_pecorella.json",
 "data/img/halloween/02_fantasma.json",
 "img/halloween/02_fantasma_01.jpg",
 "img/halloween/02_fantasma_02.jpg",
 "img/halloween/02_fantasma_03.jpg",
 "img/halloween/02_fantasma_04.jpg",
 "img/halloween/02_fantasma_05.jpg",
 "img/halloween/02_fantasma_06.jpg",
 "img/halloween/02_fantasma_07.jpg",
 "icone/icona-192.png",
 "icone/icona-512.png",
 "icone/icona-maskable-512.png"
];
const FONT = 'origami-font';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIONE).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSIONE && k !== FONT).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // i caratteri di Google: si prendono una volta e poi restano in memoria
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONT).then(c => c.match(req).then(r => r || fetch(req).then(n => { if (n.ok || n.type === 'opaque') c.put(req, n.clone()); return n; }))));
    return;
  }
  if (url.origin !== self.location.origin) return;
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req).then(n => {
    if (n.ok) { const copia = n.clone(); caches.open(VERSIONE).then(c => c.put(req, copia)); }
    return n;
  }).catch(() => req.mode === 'navigate' ? caches.match('index.html') : Response.error())));
});
