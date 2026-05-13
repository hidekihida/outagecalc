#!/usr/bin/env node
// Adiciona 4 visuais (costumes) no item.json com subTypeIds corretos
// pro calc identificar em qual slot encaixar (Topo/Meio/Baixo/Capa).
// Tambem baixa os icones da Divine Pride.

import { readFile, writeFile, access, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const ITEMS = "src/assets/demo/data/item.json";
const ICONS = "src/assets/demo/images/items";

const KEY = process.env.DIVINE_PRIDE_KEY;
if (!KEY) {
  console.error("Falta DIVINE_PRIDE_KEY. Rode com: node --env-file=.env scripts/add-visuals.mjs");
  process.exit(1);
}

// Os 4 visuais a adicionar. itemSubTypeId aqui SOBRESCREVE o retorno da API
// pra bater com a categoria correta do calc.
const visuals = [
  {
    id: 19549,
    aegisName: "C_Magestic_Goat",
    name: "Visual Chifres Enormes",
    descriptionPT: "Equipamento visual. Pode ser encaixado com pedras para receber atributos adicionais.",
    itemSubTypeId: 519,  // CostumeUpper
    location: "Upper",
    weight: 10,
    requiredLevel: 100,
  },
  {
    id: 410320,
    aegisName: "C_Blink_Eyes_D_Freyja",
    name: "Visual Piscadela de Freya",
    descriptionPT: "Equipamento visual. Pode ser encaixado com pedras para receber atributos adicionais.",
    itemSubTypeId: 520,  // CostumeMiddle  (DP retornou 519, sobrescrevemos)
    location: "Middle",
    weight: 0,
    requiredLevel: 1,
  },
  {
    id: 20407,
    aegisName: "C_Subject_Aura_Red",
    name: "Visual Aura Biológica Vermelha",
    descriptionPT: "Equipamento visual. Pode ser encaixado com pedras para receber atributos adicionais.",
    itemSubTypeId: 521,  // CostumeLower  (DP retornou 519, sobrescrevemos)
    location: "Lower",
    weight: 0,
    requiredLevel: 1,
  },
  {
    id: 20514,
    aegisName: "C_Thanatos_Sword",
    name: "Visual Espada de Thanatos",
    descriptionPT: "Equipamento visual. Pode ser encaixado com pedras para receber atributos adicionais.",
    itemSubTypeId: 522,  // CostumeGarment
    location: null,
    weight: 0,
    requiredLevel: 1,
  },
];

async function fileExists(p) { try { await access(p); return true; } catch { return false; } }

async function downloadIcon(id) {
  const out = resolve(ICONS, `${id}.png`);
  if (await fileExists(out)) return "skip";
  const url = `https://static.divine-pride.net/images/items/item/${id}.png`;
  const res = await fetch(url);
  if (!res.ok) return `fail HTTP ${res.status}`;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length === 0) return "empty";
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, buf);
  return `ok ${buf.length}b`;
}

const itemsPath = resolve(ITEMS);
const data = JSON.parse(await readFile(itemsPath, "utf8"));

for (const v of visuals) {
  const idStr = String(v.id);
  data[idStr] = {
    id: v.id,
    aegisName: v.aegisName,
    name: v.name,
    unidName: v.name,
    resName: v.aegisName,
    description: v.descriptionPT,
    slots: 0,
    itemTypeId: 9,  // Costume
    itemSubTypeId: v.itemSubTypeId,
    itemLevel: null,
    attack: null,
    defense: 0,
    weight: v.weight,
    requiredLevel: v.requiredLevel,
    location: v.location,
    compositionPos: null,
    usableClass: ["all"],
    script: {},
  };
  const icon = await downloadIcon(v.id);
  console.log(`+ ${v.id}  ${v.name}  [subType=${v.itemSubTypeId}, loc=${v.location ?? 'garment'}]  icone: ${icon}`);
}

await writeFile(itemsPath, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`\nTotal: ${visuals.length} visuais adicionados em ${itemsPath}`);
