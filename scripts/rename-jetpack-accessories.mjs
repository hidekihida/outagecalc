#!/usr/bin/env node
// Renomeia os 3 itens acessorios que combam com os Jetpacks:
//   Deep Blue Sunglasses -> Óculos Neon
//   Victorious Wing Ears -> Asas Vitoriosas
//   Battle Processor     -> Chip de Batalha
// Atualiza o name field dos itens E todas as referencias EQUIP[].

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const itemsPath = resolve("src/assets/demo/data/item.json");

const map = [
  ["Deep Blue Sunglasses", "Óculos Neon"],
  ["Victorious Wing Ears", "Asas Vitoriosas"],
  ["Battle Processor", "Chip de Batalha"],
];

let text = await readFile(itemsPath, "utf8");
let total = 0;

for (const [from, to] of map) {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped, "g");
  const matches = text.match(re);
  const count = matches ? matches.length : 0;
  if (count === 0) {
    console.log(`= ${from}: 0 ocorrencias`);
    continue;
  }
  text = text.replace(re, to);
  total += count;
  console.log(`✓ ${from} → ${to} : ${count} substituicoes`);
}

// Sanity
const leftover = text.match(/Deep Blue Sunglasses|Victorious Wing Ears|Battle Processor/g);
if (leftover) {
  console.error("\n⚠ Sobrou:");
  for (const m of new Set(leftover)) console.error(`  ${m}`);
} else {
  console.log("\n✓ Nenhuma referencia antiga restante");
}

await writeFile(itemsPath, text, "utf8");
console.log(`\nTotal: ${total} substituicoes em ${itemsPath}`);
