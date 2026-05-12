#!/usr/bin/env node
// Atualiza os 6 itens do set Jetpack + Exoesqueleto com nomes PT,
// descricoes PT e bonus corretos do LatamRO.

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ITEMS = resolve("src/assets/demo/data/item.json");
const data = JSON.parse(await readFile(ITEMS, "utf8"));

// Mapping dos referenciados (sao EN no calc atual)
const NAME_OCULOS = "Deep Blue Sunglasses";
const NAME_ASAS = "Victorious Wing Ears";
const NAME_CHIP = "Battle Processor";

const updates = {
  // ───── JETPACK CRITICO ─────
  "480197": {
    id: 480197,
    aegisName: "Cvt_Critical_Wing",
    name: "Jetpack Crítico [1]",
    unidName: "Capa",
    resName: "Supplement_Part_Wing",
    description: "Mochila multifuncional que foi aprimorada com o objetivo aumentar o rendimento.\n--------------------------\nA cada 2 refinos:\nATQ +5. CRIT +2.\nA cada 3 refinos:\nDano físico contra todos os Tamanhos +3%.\n--------------------------\nRefino +7 ou mais:\nVelocidade de ataque +7%.\nRefino +9 ou mais:\nResistência a propriedade Neutro +7%.\nRefino +11 ou mais:\nDano físico a distância +10%.\nDano físico corpo a corpo +10%.\n--------------------------\nConjunto\n[Óculos Neon] [1]\nDano crítico +7%.\nConjuração variável -15%.\n--------------------------\nConjunto\n[Asas Vitoriosas] [1]\nDano crítico +7%.\nPós-conjuração -15%.\n--------------------------\nConjunto\n[Chip de Batalha] [1]\nDano crítico +7%.\nDano físico a distância +5%.\nDano físico corpo a corpo +5%.\n--------------------------\nTipo: Capa\nDEF: 38 DEFM: 0\nPeso: 40\nNível necessário: 150\nClasses: Todas",
    slots: 1,
    itemTypeId: 2,
    itemSubTypeId: 515,
    itemLevel: 1,
    attack: null,
    defense: 38,
    weight: 40,
    requiredLevel: 150,
    location: null,
    compositionPos: null,
    usableClass: ["all"],
    script: {
      atk: ["2---5"],
      cri: ["2---2"],
      p_size_all: ["3---3"],
      aspdPercent: ["7===7"],
      range: ["11===10", `EQUIP[${NAME_CHIP}]5`],
      melee: ["11===10", `EQUIP[${NAME_CHIP}]5`],
      criDmg: [`EQUIP[${NAME_OCULOS}]7`, `EQUIP[${NAME_ASAS}]7`, `EQUIP[${NAME_CHIP}]7`],
      vct: [`EQUIP[${NAME_OCULOS}]15`],
      acd: [`EQUIP[${NAME_ASAS}]15`]
    }
  },

  // ───── JETPACK FISICO ─────
  "480124": {
    id: 480124,
    aegisName: "Cvt_Physical_Wing",
    name: "Jetpack Físico [1]",
    unidName: "Capa",
    resName: "Supplement_Part_Wing",
    description: "Mochila multifuncional que foi aprimorada com o objetivo aumentar o rendimento.\n--------------------------\nA cada 2 refinos:\nATQ +5.\nATQ da arma +1%.\nA cada 3 refinos:\nDano físico contra todos os tamanhos +3%.\n--------------------------\nRefino +7 ou mais:\nVelocidade de ataque +7%.\nRefino +9 ou mais:\nResistência a propriedade Neutro +7%.\nRefino +11 ou mais:\nDano físico a distância +10%.\nDano físico corpo a corpo +10%.\n--------------------------\nConjunto\n[Óculos Neon] [1]\nATQ da arma +7%.\nConjuração variável -15%.\n--------------------------\nConjunto\n[Asas Vitoriosas] [1]\nATQ da arma +7%.\nPós-conjuração -15%.\n--------------------------\nConjunto\n[Chip de Batalha] [1]\nATQ da arma +7%.\nDano físico a distância +5% adicional.\nDano físico corpo a corpo +5% adicional.\n--------------------------\nTipo: Capa\nDEF: 38 DEFM: 0\nPeso: 40\nNível necessário: 150\nClasses: Todas",
    slots: 1,
    itemTypeId: 2,
    itemSubTypeId: 515,
    itemLevel: 1,
    attack: null,
    defense: 38,
    weight: 40,
    requiredLevel: 150,
    location: null,
    compositionPos: null,
    usableClass: ["all"],
    script: {
      atk: ["2---5"],
      atkPercent: ["2---1", `EQUIP[${NAME_OCULOS}]7`, `EQUIP[${NAME_ASAS}]7`, `EQUIP[${NAME_CHIP}]7`],
      p_size_all: ["3---3"],
      aspdPercent: ["7===7"],
      range: ["11===10", `EQUIP[${NAME_CHIP}]5`],
      melee: ["11===10", `EQUIP[${NAME_CHIP}]5`],
      vct: [`EQUIP[${NAME_OCULOS}]15`],
      acd: [`EQUIP[${NAME_ASAS}]15`]
    }
  },

  // ───── JETPACK MAGICO ─────
  "480125": {
    id: 480125,
    aegisName: "Cvt_Magical_Wing",
    name: "Jetpack Mágico [1]",
    unidName: "Capa",
    resName: "Supplement_Part_Wing",
    description: "Mochila multifuncional que foi aprimorada com o objetivo aumentar o rendimento.\n--------------------------\nA cada 2 refinos:\nATQM +5.\nDano mágico +1%.\nA cada 3 refinos:\nDano mágico contra todos os tamanhos +3%.\n--------------------------\nRefino +7 ou mais:\nConjuração variável -7%.\nRefino +9 ou mais:\nResistência a propriedade Neutro +7%.\nRefino +11 ou mais:\nDano mágico de todas as propriedades +10%.\n--------------------------\nConjunto\n[Óculos Neon] [1]\nDano mágico +7%.\nConjuração variável -15%.\n--------------------------\nConjunto\n[Asas Vitoriosas] [1]\nDano mágico +7%.\nPós-conjuração -15%.\n--------------------------\nConjunto\n[Chip de Batalha] [1]\nDano mágico +7%.\nDano mágico de todas as propriedades +5% adicional.\n--------------------------\nTipo: Capa\nDEF: 38 DEFM: 0\nPeso: 40\nNível necessário: 150\nClasses: Todas",
    slots: 1,
    itemTypeId: 2,
    itemSubTypeId: 515,
    itemLevel: 1,
    attack: null,
    defense: 38,
    weight: 40,
    requiredLevel: 150,
    location: null,
    compositionPos: null,
    usableClass: ["all"],
    script: {
      matk: ["2---5"],
      matkPercent: ["2---1", `EQUIP[${NAME_OCULOS}]7`, `EQUIP[${NAME_ASAS}]7`, `EQUIP[${NAME_CHIP}]7`],
      m_size_all: ["3---3"],
      vct: ["7===7", `EQUIP[${NAME_OCULOS}]15`],
      m_my_element_all: ["11===10", `EQUIP[${NAME_CHIP}]5`],
      acd: [`EQUIP[${NAME_ASAS}]15`]
    }
  },

  // ───── EXOESQUELETO CRITICO ─────
  "450407": {
    id: 450407,
    aegisName: "Cvt_Critical_Armor",
    name: "Exoesqueleto Crítico [1]",
    unidName: "Armadura",
    resName: "Supplement_Part_Con",
    description: "Uma armadura multifuncional que foi aprimorada com o objetivo aumentar o rendimento.\n--------------------------\nATQ +100.\nA cada 2 refinos:\nATQ +7. CRIT +2.\nRefino +7 ou mais:\nVelocidade de ataque +15%.\nRefino +9 ou mais:\nDano crítico +10%.\nRefino +11 ou mais:\nPós-conjuração -10%.\n--------------------------\nConjunto\n[Jetpack Crítico]\nPós-conjuração -5% adicional.\nSoma dos refinos 18 ou mais:\nDano físico contra todas as propriedades +10%.\nSoma dos refinos 23 ou mais:\nDano crítico +1% por refino da capa e da armadura.\n--------------------------\nTipo: Armadura\nDEF: 130 DEFM: 0\nPeso: 100\nNível necessário: 150\nClasses: Todas",
    slots: 1,
    itemTypeId: 2,
    itemSubTypeId: 513,
    itemLevel: 1,
    attack: null,
    defense: 130,
    weight: 100,
    requiredLevel: 150,
    location: null,
    compositionPos: null,
    usableClass: ["all"],
    script: {
      atk: ["100", "2---7"],
      cri: ["2---2"],
      aspdPercent: ["7===15"],
      criDmg: ["9===10"],
      acd: ["11===10", "EQUIP[Jetpack Crítico]5"],
      p_element_all: ["EQUIP[Jetpack Crítico]REFINE[armor,garment==18]===10"]
      // "Dano crítico +1% por refino" — nao modela linear-by-refine cleanly
    }
  },

  // ───── EXOESQUELETO FISICO ─────
  "450405": {
    id: 450405,
    aegisName: "Cvt_Physical_Armor",
    name: "Exoesqueleto Físico [1]",
    unidName: "Armadura",
    resName: "Supplement_Part_Str",
    description: "Uma armadura multifuncional que foi aprimorada com o objetivo aumentar o rendimento.\n--------------------------\nATQ +100.\nA cada 2 refinos:\nATQ +10.\nRefino +7 ou mais:\nVelocidade de ataque +15%.\nRefino +9 ou mais:\nDano físico a distância +10%.\nDano físico corpo a corpo +10%.\nRefino +11 ou mais:\nPós-conjuração -10%.\n--------------------------\nConjunto\n[Jetpack Físico]\nPós-conjuração -5% adicional.\nSoma dos refinos 18 ou mais:\nDano físico contra todas as propriedades +10%.\nSoma dos refinos 23 ou mais:\nDano físico a distância e corpo a corpo +1% por refino da capa e da armadura.\n--------------------------\nTipo: Armadura\nDEF: 130 DEFM: 0\nPeso: 100\nNível necessário: 150\nClasses: Todas",
    slots: 1,
    itemTypeId: 2,
    itemSubTypeId: 513,
    itemLevel: 1,
    attack: null,
    defense: 130,
    weight: 100,
    requiredLevel: 150,
    location: null,
    compositionPos: null,
    usableClass: ["all"],
    script: {
      atk: ["100", "2---10"],
      aspdPercent: ["7===15"],
      range: ["9===10"],
      melee: ["9===10"],
      acd: ["11===10", "EQUIP[Jetpack Físico]5"],
      p_element_all: ["EQUIP[Jetpack Físico]REFINE[armor,garment==18]===10"]
    }
  },

  // ───── EXOESQUELETO MAGICO ─────
  "450406": {
    id: 450406,
    aegisName: "Cvt_Magical_Armor",
    name: "Exoesqueleto Mágico [1]",
    unidName: "Armadura",
    resName: "Supplement_Part_Agi",
    description: "Uma armadura multifuncional que foi aprimorada com o objetivo aumentar o rendimento.\n--------------------------\nATQM +100.\nA cada 2 refinos:\nATQM +10.\nRefino +7 ou mais:\nConjuração variável -15%.\nRefino +9 ou mais:\nDano mágico de todas as propriedades +10%.\nRefino +11 ou mais:\nPós-conjuração -10%.\n--------------------------\nConjunto\n[Jetpack Mágico]\nPós-conjuração -5% adicional.\nSoma dos refinos 18 ou mais:\nDano mágico contra todas as propriedades +10%.\nSoma dos refinos 23 ou mais:\nDano mágico de todas as propriedades +1% por refino da capa e da armadura.\n--------------------------\nTipo: Armadura\nDEF: 130 DEFM: 0\nPeso: 100\nNível necessário: 150\nClasses: Todas",
    slots: 1,
    itemTypeId: 2,
    itemSubTypeId: 513,
    itemLevel: 1,
    attack: null,
    defense: 130,
    weight: 100,
    requiredLevel: 150,
    location: null,
    compositionPos: null,
    usableClass: ["all"],
    script: {
      matk: ["100", "2---10"],
      vct: ["7===15"],
      m_my_element_all: ["9===10", "EQUIP[Jetpack Mágico]REFINE[armor,garment==18]===10"],
      acd: ["11===10", "EQUIP[Jetpack Mágico]5"]
    }
  }
};

let updated = 0;
let added = 0;
for (const [id, payload] of Object.entries(updates)) {
  if (data[id]) {
    updated++;
    console.log(`✓ atualizado: ${id} (${payload.name})`);
  } else {
    added++;
    console.log(`+ adicionado: ${id} (${payload.name})`);
  }
  data[id] = payload;
}

await writeFile(ITEMS, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`\nTotal: ${updated} atualizados, ${added} adicionados`);
