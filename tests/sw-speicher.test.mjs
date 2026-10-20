// Prüft: Die Umzugsseite und der Abmelde-Worker von Pilz Handel räumen nur ihre eigenen Reste weg.
// Andere Apps unter stephandel.github.io (Wetter-Apps, Heilpilze heute) behalten Helfer und Speicher.
// Aufruf: node --test tests/sw-speicher.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const ordner = new URL('../pilzhandel/', import.meta.url);
// ph-v2 und ph-media heißen bei Heilpilze heute genauso, deshalb dürfen sie nicht weg.
const BLEIBEN = ['wpc-v40', 'wedda-v12', 'wedder-v3', 'fuerte-v118', 'ph-v2', 'ph-media'].sort();

function falscherSpeicher(namen) {
  const m = new Map(namen.map(n => [n, {}]));
  return { keys: async () => [...m.keys()], delete: async n => m.delete(n), namen: () => [...m.keys()].sort() };
}
const ruhe = () => new Promise(r => setImmediate(r));

test('sw.js: Abmelde-Worker löscht nur ph-v1', async () => {
  const code = fs.readFileSync(new URL('sw.js', ordner), 'utf8');
  const caches = falscherSpeicher([...BLEIBEN, 'ph-v1']);
  const h = {};
  let abgemeldet = 0;
  const self = { addEventListener: (t, f) => { h[t] = f; }, skipWaiting() {}, registration: { unregister: async () => { abgemeldet++; } }, clients: { matchAll: async () => [] } };
  vm.runInNewContext(code, { self, caches, Promise });
  let warten; h.activate({ waitUntil: p => { warten = p; } }); await warten;
  assert.deepEqual(caches.namen(), BLEIBEN);
  assert.equal(abgemeldet, 1);
});

test('index.html: Umzugsseite meldet nur den eigenen Helfer ab', async () => {
  const html = fs.readFileSync(new URL('index.html', ordner), 'utf8');
  const skript = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const caches = falscherSpeicher([...BLEIBEN, 'ph-v1']);
  const abgemeldet = [];
  const reg = scope => ({ scope, unregister: async () => { abgemeldet.push(scope); return true; } });
  const g = 'https://stephandel.github.io/';
  const navigator = { serviceWorker: { getRegistrations: async () => [reg(g + 'weddaapp/'), reg(g + 'WetterProCamera/'), reg(g + 'heilpilze/pilzhandel/'), reg(g + 'scheinfasten/pilzhandel/')] } };
  const location = { hash: '', replace() {} };
  const document = { getElementById: () => ({}) };
  vm.runInNewContext(skript, { navigator, window: { caches }, caches, location, document, Promise });
  await ruhe(); await ruhe(); await ruhe();
  assert.deepEqual(abgemeldet, [g + 'scheinfasten/pilzhandel/']);
  assert.deepEqual(caches.namen(), BLEIBEN);
});
