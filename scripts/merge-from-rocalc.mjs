#!/usr/bin/env node
// merge-from-rocalc.mjs — importa itens e monstros novos da rocalc.cc.
// Estratégia: SOMENTE adiciona o que nao temos. Nunca sobrescreve.
// Baixa os icones dos itens novos da Divine Pride em paralelo.

import { readFile, writeFile, access, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const ITEMS_OURS = "src/assets/demo/data/item.json";
const ITEMS_THEIRS = "scripts/rocalc-item.json";
const MONSTERS_OURS = "src/assets/demo/data/monster.json";
const MONSTERS_THEIRS = "scripts/rocalc-monster.json";
const ICONS_DIR = "src/assets/demo/images/items";

const PARALLEL = 12; // downloads simultâneos
const ICON_URL = id => `https://static.divine-pride.net/images/items/item/${id}.png`;

async function fileExists(p) { try { await access(p); return true; } catch { return false; } }

async function downloadIcon(id) {
  const out = resolve(ICONS_DIR, `${id}.png`);
  if (await fileExists(out)) return { id, status: "skip" };
  try {
    const res = await fetch(ICON_URL(id));
    if (!res.ok) return { id, status: "fail", reason: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length === 0) return { id, status: "empty" };
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, buf);
    return { id, status: "ok", size: buf.length };
  } catch (err) {
    return { id, status: "fail", reason: err.message };
  }
}

async function downloadIconsBatch(ids) {
  const results = { ok: 0, skip: 0, empty: 0, fail: 0, failedIds: [] };
  let progress = 0;
  const total = ids.length;
  let lastLog = 0;

  // Pool com `PARALLEL` workers concorrentes
  let cursor = 0;
  async function worker() {
    while (cursor < ids.length) {
      const id = ids[cursor++];
      const r = await downloadIcon(id);
      results[r.status === "ok" ? "ok" : r.status]++;
      if (r.status === "fail" || r.status === "empty") results.failedIds.push(id);
      progress++;
      const pct = Math.floor((progress / total) * 100);
      // Log a cada 5%
      if (pct >= lastLog + 5) {
        process.stdout.write(`  icones: ${progress}/${total} (${pct}%)\n`);
        lastLog = pct;
      }
    }
  }
  await Promise.all(Array.from({ length: PARALLEL }, worker));
  return results;
}

// === MERGE ITEMS ===
console.log("→ Lendo item.json (nosso e rocalc)...");
const ourItems = JSON.parse(await readFile(ITEMS_OURS, "utf8"));
const theirItems = JSON.parse(await readFile(ITEMS_THEIRS, "utf8"));

const newItemIds = Object.keys(theirItems).filter(id => !(id in ourItems));
console.log(`  ${newItemIds.length} itens novos a importar`);

let imported = 0;
for (const id of newItemIds) {
  ourItems[id] = theirItems[id];
  imported++;
}
console.log(`✓ ${imported} itens importados`);

// === MERGE MONSTERS ===
console.log("\n→ Lendo monster.json (nosso e rocalc)...");
const ourMonsters = JSON.parse(await readFile(MONSTERS_OURS, "utf8"));
const theirMonsters = JSON.parse(await readFile(MONSTERS_THEIRS, "utf8"));

const newMonsterIds = Object.keys(theirMonsters).filter(id => !(id in ourMonsters));
console.log(`  ${newMonsterIds.length} monstros novos a importar`);

let importedMobs = 0;
for (const id of newMonsterIds) {
  ourMonsters[id] = theirMonsters[id];
  importedMobs++;
}
console.log(`✓ ${importedMobs} monstros importados`);

// === SALVAR JSONs ===
console.log("\n→ Salvando JSONs...");
await writeFile(ITEMS_OURS, JSON.stringify(ourItems, null, 2) + "\n", "utf8");
await writeFile(MONSTERS_OURS, JSON.stringify(ourMonsters, null, 2) + "\n", "utf8");
console.log("✓ Salvos");

// === BAIXAR ICONES DOS ITENS NOVOS ===
console.log(`\n→ Baixando ${newItemIds.length} icones (${PARALLEL} em paralelo)...`);
const t0 = Date.now();
const iconResults = await downloadIconsBatch(newItemIds);
const dt = Math.round((Date.now() - t0) / 1000);

console.log("");
console.log("=== RESUMO ===");
console.log(`Itens importados:   ${imported}`);
console.log(`Monstros importados: ${importedMobs}`);
console.log(`Icones baixados:    ${iconResults.ok}`);
console.log(`Icones já existiam: ${iconResults.skip}`);
console.log(`Icones vazios:      ${iconResults.empty}`);
console.log(`Icones com falha:   ${iconResults.fail}`);
if (iconResults.failedIds.length && iconResults.failedIds.length <= 30) {
  console.log(`  IDs sem icone: ${iconResults.failedIds.join(", ")}`);
}
console.log(`Tempo:              ${dt}s`);
