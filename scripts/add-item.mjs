#!/usr/bin/env node
// add-item.mjs — adiciona itens ao item.json do outagecalc puxando da Divine Pride API.
// Nunca sobrescreve itens existentes. Requer Node >=20.6 (suporte nativo a --env-file).

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const opts = {
  ids: [],
  file: null,
  items: "src/assets/demo/data/item.json",
  server: "bRO",
  force: false,
};

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--file") opts.file = args[++i];
  else if (a === "--items") opts.items = args[++i];
  else if (a === "--server") opts.server = args[++i];
  else if (a === "--force") opts.force = true;
  else if (/^\d+$/.test(a)) opts.ids.push(Number(a));
  else if (a === "--help" || a === "-h") {
    console.log(`Uso:
  node add-item.mjs <id> [<id>...]              # IDs avulsos
  node add-item.mjs --file ids.txt              # um ID por linha
  node add-item.mjs --items <path>              # default: src/assets/demo/data/item.json
  node add-item.mjs --server <bRO|iRO|...>      # default: bRO (cai pra global se 404)
  node add-item.mjs --force                     # sobrescreve itens existentes (cuidado: apaga script/usableClass manuais)

Env: DIVINE_PRIDE_KEY=<sua_key>  (ponha num .env e rode com: node --env-file=.env add-item.mjs ...)`);
    process.exit(0);
  } else {
    console.error(`Argumento desconhecido: ${a}`);
    process.exit(1);
  }
}

const KEY = process.env.DIVINE_PRIDE_KEY;
if (!KEY) {
  console.error("Falta DIVINE_PRIDE_KEY no env. Crie um .env com: DIVINE_PRIDE_KEY=sua_key");
  console.error("E rode: node --env-file=.env add-item.mjs ...");
  process.exit(1);
}

if (opts.file) {
  const txt = await readFile(opts.file, "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const t = line.trim();
    if (/^\d+$/.test(t)) opts.ids.push(Number(t));
  }
}

if (opts.ids.length === 0) {
  console.error("Nenhum ID fornecido. Rode com --help.");
  process.exit(1);
}

const itemsPath = resolve(opts.items);
const raw = await readFile(itemsPath, "utf8");
const items = JSON.parse(raw);

// Campos que copiamos do Divine Pride para o item.json da calc.
const FIELDS = [
  "id", "aegisName", "name", "unidName", "resName", "description",
  "slots", "itemTypeId", "itemSubTypeId", "itemLevel",
  "attack", "defense", "weight", "requiredLevel",
  "location", "compositionPos",
];

async function fetchItem(id, server) {
  const base = `https://www.divine-pride.net/api/database/Item/${id}?apiKey=${KEY}`;
  const url = server ? `${base}&server=${server}` : base;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${url.replace(KEY, "***")}`);
  return await res.json();
}

function mapToCalcShape(dp) {
  const out = {};
  for (const k of FIELDS) {
    if (k in dp) out[k] = dp[k];
  }
  // Defaults da calc para campos que a Divine Pride não devolve.
  out.usableClass = ["all"];
  out.script = {};
  return out;
}

const summary = { added: [], skipped: [], partial: [], failed: [] };

for (const id of opts.ids) {
  const key = String(id);
  if (items[key] && !opts.force) {
    summary.skipped.push(id);
    console.log(`= ${id}  já existe (use --force pra sobrescrever)`);
    continue;
  }
  try {
    let dp = await fetchItem(id, opts.server);
    let usedServer = opts.server;
    if (!dp) {
      dp = await fetchItem(id, null);
      usedServer = "global";
    }
    if (!dp) {
      summary.failed.push({ id, reason: "não encontrado em nenhum servidor" });
      console.log(`✗ ${id}  não encontrado`);
      continue;
    }
    const mapped = mapToCalcShape(dp);
    items[key] = mapped;
    const incomplete = !mapped.name || !mapped.description;
    if (incomplete) {
      summary.partial.push(id);
      console.log(`+ ${id}  ${mapped.aegisName ?? "(sem aegisName)"}  [${usedServer}, dados incompletos — preencher manualmente]`);
    } else {
      summary.added.push(id);
      console.log(`+ ${id}  ${mapped.name}  [${usedServer}]`);
    }
  } catch (err) {
    summary.failed.push({ id, reason: err.message });
    console.log(`✗ ${id}  ${err.message}`);
  }
}

await writeFile(itemsPath, JSON.stringify(items, null, 2) + "\n", "utf8");

console.log("");
console.log("--- resumo ---");
console.log(`adicionados: ${summary.added.length}`);
console.log(`parciais (preencher manual): ${summary.partial.length}${summary.partial.length ? " → " + summary.partial.join(", ") : ""}`);
console.log(`pulados (já existiam): ${summary.skipped.length}`);
console.log(`falhas: ${summary.failed.length}${summary.failed.length ? " → " + summary.failed.map(f => f.id).join(", ") : ""}`);
console.log(`arquivo: ${itemsPath}`);
