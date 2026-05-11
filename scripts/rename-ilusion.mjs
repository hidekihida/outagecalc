#!/usr/bin/env node
// rename-ilusion.mjs — renomeia o set Ilusion (Armor/Engine/Leg/Booster/Battle Chip)
// para os nomes PT do LatamRO (Colete/Motor/Perna/Turbina/Soquete) em item.json.
// Atualiza o name field dos 10 itens E todas as referencias EQUIP[] em outros itens.

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const itemsPath = resolve("src/assets/demo/data/item.json");

// Mapping EN (calc atual) -> PT (LatamRO)
const map = [
  ["Illusion Armor A-type", "Colete Ilusión A"],
  ["Illusion Armor B-type", "Colete Ilusión B"],
  ["Illusion Engine Wing A-type", "Motor Ilusión A"],
  ["Illusion Engine Wing B-type", "Motor Ilusión B"],
  ["Illusion Leg A-type", "Perna Ilusión A"],
  ["Illusion Leg B-type", "Perna Ilusión B"],
  ["Illusion Battle Chip R", "Soquete Ilusión A"],
  ["Illusion Battle Chip L", "Soquete Ilusión B"],
  ["Illusion Booster R", "Turbina Ilusión A"],
  ["Illusion Booster L", "Turbina Ilusión B"],
];

let text = await readFile(itemsPath, "utf8");
let total = 0;

for (const [from, to] of map) {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped, "g");
  const matches = text.match(re);
  const count = matches ? matches.length : 0;
  if (count === 0) {
    console.log(`= ${from}: 0 (ja renomeado ou inexistente)`);
    continue;
  }
  text = text.replace(re, to);
  total += count;
  console.log(`✓ ${from} → ${to} : ${count} substituicoes`);
}

// Sanity
const leftover = text.match(/Illusion (Armor [AB]-type|Engine Wing [AB]-type|Leg [AB]-type|Booster [RL]|Battle Chip [RL])/g);
if (leftover) {
  console.error("\n⚠ Restam refs antigas:");
  for (const m of new Set(leftover)) console.error(`  ${m}`);
} else {
  console.log("\n✓ Nenhuma referencia antiga restante");
}

await writeFile(itemsPath, text, "utf8");
console.log(`\nTotal: ${total} substituicoes em ${itemsPath}`);
