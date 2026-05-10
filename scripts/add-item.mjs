#!/usr/bin/env node
// add-item.mjs — adiciona itens ao item.json do outagecalc puxando da Divine Pride API.
// Nunca sobrescreve itens existentes. Requer Node >=20.6 (suporte nativo a --env-file).

import { readFile, writeFile, access, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const args = process.argv.slice(2);
const opts = {
  ids: [],
  file: null,
  items: "src/assets/demo/data/item.json",
  iconsDir: "src/assets/demo/images/items",
  server: "bRO",
  force: false,
  noIcons: false,
};

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--file") opts.file = args[++i];
  else if (a === "--items") opts.items = args[++i];
  else if (a === "--icons-dir") opts.iconsDir = args[++i];
  else if (a === "--server") opts.server = args[++i];
  else if (a === "--force") opts.force = true;
  else if (a === "--no-icons") opts.noIcons = true;
  else if (/^\d+$/.test(a)) opts.ids.push(Number(a));
  else if (a === "--help" || a === "-h") {
    console.log(`Uso:
  node add-item.mjs <id> [<id>...]              # IDs avulsos
  node add-item.mjs --file ids.txt              # um ID por linha
  node add-item.mjs --items <path>              # default: src/assets/demo/data/item.json
  node add-item.mjs --icons-dir <path>          # default: src/assets/demo/images/items
  node add-item.mjs --server <bRO|iRO|...>      # default: bRO (cai pra global se 404)
  node add-item.mjs --force                     # sobrescreve itens existentes (cuidado: apaga script/usableClass manuais)
  node add-item.mjs --no-icons                  # nao baixa o png do icone

Por padrao baixa o icone PNG de https://static.divine-pride.net/images/items/collection/{id}.png
para o icons-dir, pulando se ja existir.

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

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function downloadIcon(id, dir) {
  const out = resolve(dir, `${id}.png`);
  if (await fileExists(out)) return { status: "skip", path: out };
  const url = `https://static.divine-pride.net/images/items/collection/${id}.png`;
  const res = await fetch(url);
  if (!res.ok) return { status: "fail", reason: `HTTP ${res.status}` };
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length === 0) return { status: "fail", reason: "0 bytes (icone vazio na Divine Pride)" };
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, buf);
  return { status: "ok", path: out, size: buf.length };
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

const summary = { added: [], skipped: [], partial: [], failed: [], iconsOk: [], iconsFail: [] };

for (const id of opts.ids) {
  const key = String(id);
  if (items[key] && !opts.force) {
    summary.skipped.push(id);
    console.log(`= ${id}  já existe (use --force pra sobrescrever)`);
  } else {
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
      continue;
    }
  }
  // Baixa o icone (skip se ja existir)
  if (!opts.noIcons) {
    try {
      const r = await downloadIcon(id, opts.iconsDir);
      if (r.status === "ok") {
        summary.iconsOk.push(id);
        console.log(`  icone: baixado (${r.size}b)`);
      } else if (r.status === "skip") {
        console.log(`  icone: já existe`);
      } else {
        summary.iconsFail.push({ id, reason: r.reason });
        console.log(`  icone: FALHA — ${r.reason}`);
      }
    } catch (err) {
      summary.iconsFail.push({ id, reason: err.message });
      console.log(`  icone: FALHA — ${err.message}`);
    }
  }
}

await writeFile(itemsPath, JSON.stringify(items, null, 2) + "\n", "utf8");

console.log("");
console.log("--- resumo ---");
console.log(`adicionados: ${summary.added.length}`);
console.log(`parciais (preencher manual): ${summary.partial.length}${summary.partial.length ? " → " + summary.partial.join(", ") : ""}`);
console.log(`pulados (já existiam): ${summary.skipped.length}`);
console.log(`falhas: ${summary.failed.length}${summary.failed.length ? " → " + summary.failed.map(f => f.id).join(", ") : ""}`);
if (!opts.noIcons) {
  console.log(`icones baixados: ${summary.iconsOk.length}`);
  if (summary.iconsFail.length) {
    console.log(`icones com falha: ${summary.iconsFail.length} → ${summary.iconsFail.map(f => f.id).join(", ")}`);
  }
}
console.log(`arquivo: ${itemsPath}`);
