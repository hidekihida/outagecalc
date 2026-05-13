#!/usr/bin/env node
// Remove todos os costumes (subType 519/520/521/522) EXCETO os 4 IDs
// que o user quer manter na calc (visuais do LatamRO).
// As pedras/enchants (subType 71-76) NAO sao afetadas.

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ITEMS = resolve("src/assets/demo/data/item.json");
const KEEP = new Set(["19549", "410320", "20407", "20514"]);
const COSTUME_SUBTYPES = new Set([519, 520, 521, 522]);

const data = JSON.parse(await readFile(ITEMS, "utf8"));
const removed = [];

for (const [id, it] of Object.entries(data)) {
  if (COSTUME_SUBTYPES.has(it.itemSubTypeId) && !KEEP.has(id)) {
    removed.push({ id, subType: it.itemSubTypeId, name: it.name });
    delete data[id];
  }
}

await writeFile(ITEMS, JSON.stringify(data, null, 2) + "\n", "utf8");

console.log(`Removidos: ${removed.length} costumes`);
console.log(`Mantidos: ${KEEP.size} (os 4 visuais do LatamRO)`);
console.log("\nIDs removidos:");
const bySub = { 519: [], 520: [], 521: [], 522: [] };
for (const r of removed) bySub[r.subType].push(r);
const subName = { 519: "Topo", 520: "Meio", 521: "Baixo", 522: "Capa" };
for (const [st, list] of Object.entries(bySub)) {
  console.log(`  ${subName[st]} (subType ${st}): ${list.length}`);
  for (const r of list) console.log(`    - ${r.id}  ${r.name}`);
}
