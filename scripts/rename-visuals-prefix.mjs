#!/usr/bin/env node
// Renomeia os 4 visuais com prefixo "[Visual]" no nome.

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ITEMS = resolve("src/assets/demo/data/item.json");
let text = await readFile(ITEMS, "utf8");

const map = [
  ["Visual Chifres Enormes", "[Visual] Chifres Enormes"],
  ["Visual Piscadela de Freya", "[Visual] Piscadela de Freya"],
  ["Visual Aura Biológica Vermelha", "[Visual] Aura Biológica Vermelha"],
  ["Visual Espada de Thanatos", "[Visual] Espada de Thanatos"],
];

let total = 0;
for (const [from, to] of map) {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped, "g");
  const n = (text.match(re) || []).length;
  text = text.replace(re, to);
  total += n;
  console.log(`${from} → ${to}: ${n}`);
}

await writeFile(ITEMS, text, "utf8");
console.log(`Total: ${total}`);
