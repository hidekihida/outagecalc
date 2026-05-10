#!/usr/bin/env node
// rename-diademas.mjs — renomeia "Temporal Circlet (Class)" -> "Diadema Temporal X"
// no item.json. Atualiza o name field das diademas E todas as referencias EQUIP[].

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const itemsPath = resolve("src/assets/demo/data/item.json");

// Mapping from English (calc) to Portuguese (LatamRO) names.
// Order matters: we replace longer/more-specific patterns first if needed.
const map = [
  ["Temporal Circlet (Rune Knight)", "Diadema Temporal Rúnico"],
  ["Temporal Circlet (Royal Guard)", "Diadema Temporal Real"],
  ["Temporal Circlet (Mechanic)", "Diadema Temporal Mecânico"],
  ["Temporal Circlet (Genetic)", "Diadema Temporal Químico"],
  ["Temporal Circlet (Guillotine Cross)", "Diadema Temporal Mortal"],
  ["Temporal Circlet (Shadow Chaser)", "Diadema Temporal Renegado"],
  ["Temporal Circlet (Arch Bishop)", "Diadema Temporal Sagrado"],
  ["Temporal Circlet (Sura)", "Diadema Temporal Lutador"],
  ["Temporal Circlet (Warlock)", "Diadema Temporal Arcano"],
  ["Temporal Circlet (Sorcerer)", "Diadema Temporal Mágico"],
  ["Temporal Circlet (Ranger)", "Diadema Temporal Atirador"],
  ["Temporal Circlet (Wanderer&Minstrel)", "Diadema Temporal Musical"],
  ["Temporal Circlet (Star Emperor)", "Diadema Temporal Estelar"],
  ["Temporal Circlet (Soul Reaper)", "Diadema Temporal Xamânico"],
  ["Temporal Circlet (Rebellion)", "Diadema Temporal Rebelde"],
  ["Temporal Circlet (Oboro)", "Diadema Temporal Oboro"],
  ["Temporal Circlet (Kagerou)", "Diadema Temporal Kagerou"],
  ["Temporal Circlet (Super Novice)", "Diadema Temporal Aprendiz"],
  ["Temporal Circlet (Summoner)", "Diadema Temporal Doram"],
];

let text = await readFile(itemsPath, "utf8");
let totalReplacements = 0;

for (const [from, to] of map) {
  // Count occurrences of the FROM pattern (escaping regex metacharacters: parens, &)
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped, "g");
  const matches = text.match(re);
  const count = matches ? matches.length : 0;
  if (count === 0) {
    console.log(`= ${from}: 0 ocorrências (já renomeado ou inexistente)`);
    continue;
  }
  text = text.replace(re, to);
  totalReplacements += count;
  console.log(`✓ ${from} → ${to} : ${count} substituições`);
}

// Sanity: verify no leftover "Temporal Circlet (" patterns
const leftover = text.match(/Temporal Circlet \([^)]+\)/g);
if (leftover) {
  console.error("");
  console.error("⚠ AVISO: ainda restam referências 'Temporal Circlet (...)':");
  for (const m of new Set(leftover)) console.error(`  ${m}`);
} else {
  console.log("");
  console.log("✓ Nenhuma referência 'Temporal Circlet (...)' restante.");
}

await writeFile(itemsPath, text, "utf8");
console.log("");
console.log(`Total: ${totalReplacements} substituições gravadas em ${itemsPath}`);
