export enum ClassName {
  ALL = 'all',
  HiClass = 'Hi-Class',
  Only_3rd = 'Only 3rd Cls',
  Only_4th = '4th',

  Swordman = 'Swordman',
  Crusader = 'Crusader',
  Paladin = 'Paladin',
  RoyalGuard = 'Guardião Real',
  ImperialGuard = 'ImperialGuard',

  Knight = 'Knight',
  LordKnight = 'LordKnight',
  RuneKnight = 'Cavaleiro Rúnico',
  DragonKnight = 'DragonKnight',

  Archer = 'Archer',
  Hunter = 'Hunter',
  Sniper = 'Sniper',
  Ranger = 'Sentinela',
  Windhawk = 'Windhawk',

  Bard = 'Bard',
  Clown = 'Clown',
  Wanderer = 'Bardo',
  Trouvere = 'Trouvere',

  Dancer = 'Dancer',
  Gypsy = 'Gypsy',
  Minstrel = 'Minstrel',
  Troubadour = 'Troubadour',

  Merchant = 'Merchant',
  Blacksmith = 'Blacksmith',
  Whitesmith = 'Whitesmith',
  Mechanic = 'Mecânico',
  Meister = 'Meister',

  Alchemist = 'Alchemist',
  Creator = 'Creator',
  Genetic = 'Bioquímico',
  Biolo = 'Biolo',

  Acolyte = 'Acolyte',
  Priest = 'Priest',
  HighPriest = 'HighPriest',
  ArchBishop = 'Arcebispo',
  Cardinal = 'Cardinal',

  Monk = 'Monk',
  Champion = 'Champion',
  Sura = 'Shura',
  Inquisitor = 'Inquisitor',

  Thief = 'Thief',
  Assassin = 'Assassin',
  AssassinCross = 'AssassinCross',
  GuillotineCross = 'Sicário',
  ShadowCross = 'ShadowCross',

  Rogue = 'Rogue',
  Stalker = 'Stalker',
  ShadowChaser = 'Renegado',
  AbyssChaser = 'AbyssChaser',

  Sage = 'Sage',
  Scholar = 'Scholar',
  Sorcerer = 'Feiticeiro',
  ElementalMaster = 'ElementalMaster',

  Mage = 'Mage',
  Wizard = 'Wizard',
  HighWizard = 'HighWizard',
  Warlock = 'Arcano',
  ArchMage = 'ArchMage',

  // extended
  Novice = 'Novice',
  SuperNovice = 'SuperNovice',
  HyperNovice = 'HyperNovice',

  Doram = 'Doram',
  SpiritHandler = 'SpiritHandler',

  Taekwondo = 'Taekwondo',
  SoulLinker = 'SoulLinker',
  SoulReaper = 'SoulReaper',
  SoulAscetic = 'SoulAscetic',

  StarGladiator = 'StarGladiator',
  StarEmperor = 'StarEmperor',
  SkyEmperor = 'SkyEmperor',

  Gunslinger = 'Gunslinger',
  Rebellion = 'Rebellion',
  NightWatch = 'NightWatch',

  Ninja = 'Ninja',
  Oboro = 'Oboro',
  Shiranui = 'Shiranui',
  Kagerou = 'Kagerou',
  Shinkiro = 'Shinkiro',
}

export enum ClassIDEnum {
  RoyalGuard = 11,
  RuneKnight = 12,
  ArchBishop = 7,
  Sura = 13,
  Ranger = 2,
  Minstrel = 21,
  Wanderer = 22,
  GuillotineCross = 5,
  ShadowChaser = 4,
  Warlock = 6,
  Sorcerer = 8,
  Mechanic = 10,
  Genetic = 9,
  SoulReaper = 3,
  StarEmperor = 33,
  Rebellion = 1,
  Doram = 31,
  SuperNovice = 30,
  Oboro = 17,
  Kagerou = 18,
  DragonKnight = 4252,
  Meister = 4253,
  ShadowCross = 4254,
  ArchMage = 4255,
  Cardinal = 4256,
  Windhawk = 4257,
  ImperialGuard = 4258,
  Biolo = 4259,
  AbyssChaser = 4260,
  ElementalMaster = 4261,
  Inquisitor = 4262,
  Troubadour = 4263,
  Trouvere = 4264,
  SkyEmperor = 4302,
  SoulAscetic = 4303,
  Shinkiro = 4304,
  Shiranui = 4305,
  NightWatch = 4306,
  HyperNovice = 4307,
  SpiritHandler = 4308,
}

/**
 * Display only
 */
export const ClassID = {
  [ClassIDEnum.RoyalGuard]: 'Guardião Real',
  [ClassIDEnum.RuneKnight]: 'Cavaleiro Rúnico',
  [ClassIDEnum.ArchBishop]: 'Arcebispo',
  [ClassIDEnum.Sura]: 'Shura',
  [ClassIDEnum.Ranger]: 'Ranger',
  [ClassIDEnum.Minstrel]: 'Menestrel',
  [ClassIDEnum.Wanderer]: 'Wanderer',
  [ClassIDEnum.GuillotineCross]: 'Sicário',
  [ClassIDEnum.ShadowChaser]: 'Perseguidor de Sombra',
  [ClassIDEnum.Warlock]: 'Warlock',
  [ClassIDEnum.Sorcerer]: 'Feiticeiro',
  [ClassIDEnum.Mechanic]: 'Mecânico',
  [ClassIDEnum.Genetic]: 'Genético',
  [ClassIDEnum.SoulReaper]: 'Ceifador de Almas',
  [ClassIDEnum.StarEmperor]: 'Imperador Estelar',
  [ClassIDEnum.Rebellion]: 'Rebelião',
  [ClassIDEnum.Doram]: 'Invocador',
  [ClassIDEnum.SuperNovice]: 'Super Novato',
  [ClassIDEnum.Oboro]: 'Oboro',
  [ClassIDEnum.Kagerou]: 'Kagerou',
  [ClassIDEnum.DragonKnight]: 'Cavaleiro Dragão',
  [ClassIDEnum.Meister]: 'Meister',
  [ClassIDEnum.ShadowCross]: 'Shadow Cross',
  [ClassIDEnum.ArchMage]: 'Arquimago',
  [ClassIDEnum.Cardinal]: 'Cardeal',
  [ClassIDEnum.Windhawk]: 'Windhawk',
  [ClassIDEnum.ImperialGuard]: 'Guarda Imperial',
  [ClassIDEnum.Biolo]: 'Biolo',
  [ClassIDEnum.AbyssChaser]: 'Caçador do Abismo',
  [ClassIDEnum.ElementalMaster]: 'Mestre Elemental',
  [ClassIDEnum.Inquisitor]: 'Inquisidor',
  [ClassIDEnum.Troubadour]: 'Trovador',
  [ClassIDEnum.Trouvere]: 'Troveira',
  [ClassIDEnum.SkyEmperor]: 'Imperador Celestial',
  [ClassIDEnum.SoulAscetic]: 'Asceta da Alma',
  [ClassIDEnum.Shinkiro]: 'Shinkiro',
  [ClassIDEnum.Shiranui]: 'Shiranui',
  [ClassIDEnum.NightWatch]: 'Vigia da Noite',
  [ClassIDEnum.HyperNovice]: 'Hiper Novato',
  [ClassIDEnum.SpiritHandler]: 'Condutor de Espíritos',
} as const;

/**
  4060 Rune Knight    4061 Warlock                 4062 Ranger             4063 Arch Bishop
  4064 Mechanic         4065 Guillotine Cross  4073 Royal Guard    4074 Sorcerer
  4075 Minstrel            4076 Wanderer              4077 Sura                  4078 Genetic
  4079 Shadow Chaser

  ----- 4th Class -----
  4252 Dragon Knight    4253 Meister                    4254 Shadow Cross     4255 Arch Mage
  4256 Cardinal               4257 Windhawk              4258 Imperial Guard     4259 Biolo
  4260 Abyss Chaser     4261 Elemental Master 4262 Inquisitor               4263 Troubadour
  4264 Trouvere

  ----- Expanded Class -----
        23 Super Novice      24 Gunslinger              25 Ninja                 4045 Super Baby
  4046 Taekwon           4047 Star Gladiator     4049 Soul Linker
  4190 Ex. Super Novice  4191 Ex. Super Baby
  4211 Kagerou            4212 Oboro             4215 Rebellion        4218 Summoner
  4239 Star Emperor   4240 Soul Reaper
  4302 Sky Emperor    4303 Soul Ascetic         4304 Shinkiro                 4305 Shiranui
  4306 Night Watch     4307 Hyper Novice        4308 Spirit Handler
 */
export const ClassIcon: Record<ClassIDEnum, number> = {
  11: 4073,
  12: 4060,
  7: 4063,
  13: 4077,
  2: 4062,
  21: 4075,
  22: 4076,
  5: 4065,
  4: 4079,
  6: 4061,
  8: 4074,
  10: 4064,
  9: 4078,
  3: 4240,
  33: 4239,
  1: 4215,
  31: 4218,
  30: 4190,
  17: 4212,
  18: 4211,
  4252: 4252,
  4253: 4253,
  4254: 4254,
  4255: 4255,
  4256: 4256,
  4257: 4257,
  4258: 4258,
  4259: 4259,
  4260: 4260,
  4261: 4261,
  4262: 4262,
  4263: 4263,
  4264: 4264,
  4302: 4302,
  4303: 4303,
  4304: 4304,
  4305: 4305,
  4306: 4306,
  4307: 4307,
  4308: 4308,
} as const;

export const JobPromotionMapper: Partial<Record<ClassIDEnum, number>> = {
  [ClassIDEnum.RoyalGuard]: ClassIDEnum.ImperialGuard,
  [ClassIDEnum.RuneKnight]: ClassIDEnum.DragonKnight,
  [ClassIDEnum.ArchBishop]: ClassIDEnum.Cardinal,
  [ClassIDEnum.Sura]: ClassIDEnum.Inquisitor,
  [ClassIDEnum.Ranger]: ClassIDEnum.Windhawk,
  [ClassIDEnum.Minstrel]: ClassIDEnum.Troubadour,
  [ClassIDEnum.Wanderer]: ClassIDEnum.Trouvere,
  [ClassIDEnum.GuillotineCross]: ClassIDEnum.ShadowCross,
  [ClassIDEnum.ShadowChaser]: ClassIDEnum.AbyssChaser,
  [ClassIDEnum.Warlock]: ClassIDEnum.ArchMage,
  [ClassIDEnum.Sorcerer]: ClassIDEnum.ElementalMaster,
  [ClassIDEnum.Mechanic]: ClassIDEnum.Meister,
  [ClassIDEnum.Genetic]: ClassIDEnum.Biolo,
  [ClassIDEnum.SoulReaper]: ClassIDEnum.SoulAscetic,
  [ClassIDEnum.StarEmperor]: ClassIDEnum.SkyEmperor,
  [ClassIDEnum.Rebellion]: ClassIDEnum.NightWatch,
  [ClassIDEnum.Doram]: ClassIDEnum.SpiritHandler,
  [ClassIDEnum.SuperNovice]: ClassIDEnum.HyperNovice,
  [ClassIDEnum.Oboro]: ClassIDEnum.Shiranui,
  [ClassIDEnum.Kagerou]: ClassIDEnum.Shinkiro,
} as const
