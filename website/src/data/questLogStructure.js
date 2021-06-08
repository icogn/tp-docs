import { dataTypes } from './constants';

const u8 = dataTypes.u8;
const u8Array = dataTypes.u8Array;
const u16 = dataTypes.u16;
const u16Array = dataTypes.u16Array;
const u32 = dataTypes.u32;
const u32Array = dataTypes.u32Array;
const u64 = dataTypes.u64;
const float = dataTypes.float;
const charArray = dataTypes.charArray;

const tags = {
  naming: 'naming',
  investigation: 'investigation',
  notLookedInto: 'notLookedInto',
};

const naming = tags.naming;
const investigation = tags.investigation;
const notLookedInto = tags.notLookedInto;

// First 0x1f0 are all accounted for. May need to adjust for bit ones.

const questLogStructureByOffset = {
  0x0: {
    type: u16,
    name: 'maxLife',
    shortDesc: 'floor(val / 5) => maxHearts; val % 5 => X of 5 heart pieces',
    tags: [investigation],
  },
  0x2: {
    type: u16,
    name: 'life',
    shortDesc: 'val / 4 => currentHearts (Ex: 4.25 hearts)',
  },
  0x4: {
    type: u16,
    name: 'rupees',
  },
  0x6: {
    type: u16,
    name: 'maxOil',
    shortDesc: 'Max lantern oil. Always 0x5460 (confirm)',
    tags: [investigation],
  },
  0x8: {
    type: u16,
    name: 'oil',
    shortDesc: 'Current lantern oil level',
  },
  0xa: {
    type: u8,
    name: '???',
    shortDesc: 'TODO: determine if padding',
    tags: [naming, investigation],
  },
  0xb: {
    type: u8,
    name: 'itemSlot1',
    shortDesc: 'X button on GameCube. itemSlot index, or 0xff for empty',
    tags: [naming, investigation],
  },
  0xc: {
    type: u8,
    name: 'itemSlot2',
    shortDesc: 'Y button on GameCube.',
    tags: [naming, investigation],
  },
  0xd: {
    type: u8,
    name: 'itemSlot3',
    shortDesc: "Gets set to last smelled scent's itemId.",
    tags: [naming, investigation],
  },
  0xe: {
    type: u8,
    name: 'itemSlot4',
    shortDesc: 'Not used on GameCube.',
    tags: [naming, investigation],
  },
  0xf: {
    type: u8,
    name: 'comboItemSlot1',
    shortDesc: '',
    tags: [naming, investigation],
  },
  0x10: {
    type: u8,
    name: 'comboItemSlot2',
    shortDesc: '',
    tags: [naming, investigation],
  },
  0x11: {
    type: u8,
    name: 'comboItemSlot3',
    shortDesc: 'Not used on GameCube.',
    tags: [naming, investigation],
  },
  0x12: {
    type: u8,
    name: 'comboItemSlot4',
    shortDesc: 'Not used on GameCube.',
    tags: [naming, investigation],
  },
  0x13: {
    type: u8,
    name: 'equipClothes',
    tags: [naming],
  },
  0x14: {
    type: u8,
    name: 'equipSword',
    tags: [naming],
  },
  0x15: {
    type: u8,
    name: 'equipIndex2',
    tags: [notLookedInto],
  },
  0x16: {
    type: u8,
    name: 'equipIndex3',
    tags: [notLookedInto],
  },
  0x17: {
    type: u8,
    name: 'equipIndex4',
    tags: [notLookedInto],
  },
  0x18: {
    type: u8,
    name: 'equipIndex5',
    tags: [notLookedInto],
  },
  0x19: {
    type: u8,
    name: 'wallet',
  },
  0x1a: {
    type: u8,
    name: 'maxMagic',
    tags: [notLookedInto],
  },
  0x1b: {
    type: u8,
    name: 'magic',
    tags: [notLookedInto],
  },
  0x1c: {
    type: u8,
    name: 'mMagicFlag',
    tags: [notLookedInto],
  },
  0x1d: {
    type: u8,
    name: 'unk_1d',
    tags: [notLookedInto],
  },
  0x1e: {
    type: u8,
    name: 'mTransformStatus',
    tags: [notLookedInto],
  },
  0x1f: {
    type: u8Array,
    length: 3,
    name: 'unk_1f',
    tags: [notLookedInto],
  },
  0x22: {
    type: u8Array,
    length: 6,
    name: 'padding???',
    tags: [notLookedInto],
  },
  0x28: {
    type: u64,
    name: 'mDateIpl',
    shortDesc: 'IPL is gamecube start thing?',
    tags: [notLookedInto],
  },
  0x30: {
    type: u8,
    name: 'mTransformLevelFlag',
    tags: [notLookedInto],
  },
  0x31: {
    type: u8,
    name: 'mDarkClearLevelFlag',
    tags: [notLookedInto],
  },
  0x32: {
    type: u8,
    name: 'unk32',
    tags: [notLookedInto],
  },
  0x33: {
    type: u8,
    name: 'unk33',
    tags: [notLookedInto],
  },
  0x34: {
    type: float,
    name: 'dayTime',
    tags: [naming],
  },
  0x38: {
    type: u16,
    name: 'dayOfWeek',
    shortDesc: 'date and not dayOfWeek? dayOfWeek is derived from date?',
    tags: [naming, investigation],
  },
  0x3a: {
    type: u8Array,
    length: 6,
    name: 'padding???',
    tags: [notLookedInto],
  },
  0x40: {
    type: float,
    name: 'horsePosX',
  },
  0x44: {
    type: float,
    name: 'horsePosY',
  },
  0x48: {
    type: float,
    name: 'horsePosZ',
  },
  0x4c: {
    type: u16,
    name: 'horseAngleY',
    shortDesc: 'Use s16 for angles?',
    tags: [investigation],
  },
  0x4e: {
    type: charArray,
    length: 8,
    name: 'horseStageName',
  },
  0x56: {
    type: u8,
    name: 'horseSpawnId',
    tags: [notLookedInto],
  },
  0x57: {
    type: u8,
    name: 'horseRoomNo',
  },
  0x58: {
    type: charArray,
    length: 8,
    name: 'playerReturnPlaceStageName',
    tags: [naming],
  },
  0x60: {
    type: u8,
    name: 'playerReturnPlaceEntranceNo',
    tags: [naming],
  },
  0x61: {
    type: u8,
    name: 'playerReturnPlaceRoomNo',
  },
  0x62: {
    type: u8,
    name: 'unk62',
    tags: [notLookedInto],
  },
  0x63: {
    type: u8,
    name: 'unk63',
    tags: [notLookedInto],
  },
  0x64: {
    type: float,
    name: 'lastFieldPlayerPosX',
  },
  0x68: {
    type: float,
    name: 'lastFieldPlayerPosY',
  },
  0x6c: {
    type: float,
    name: 'lastFieldPlayerPosZ',
  },
  0x70: {
    type: u16,
    name: 'lastFieldPlayerAngleY',
  },
  0x72: {
    type: charArray,
    length: 8,
    name: 'lastFieldStageName',
  },
  0x7a: {
    type: u8,
    name: 'lastFieldRoomNo',
  },
  0x7b: {
    type: u8,
    name: 'lastFieldProvinceNo',
    tags: [naming],
  },
  0x7c: {
    type: u8,
    name: '???',
    shortDesc: 'Controls if update lastField info when changing stage.',
    tags: [investigation],
  },
  0x7d: {
    type: u8,
    name: 'mRegion',
    shortDesc: 'decomp seems wrong around here',
    tags: [notLookedInto],
  },
  0x7e: {
    type: u8,
    name: 'unk7e',
    tags: [notLookedInto],
  },
  0x7f: {
    type: u8,
    name: 'unk7f',
    tags: [notLookedInto],
  },
  0x80: {
    type: float,
    name: 'ooccooJrDestPlayerPosX',
    tags: [naming],
  },
  0x84: {
    type: float,
    name: 'ooccooJrDestPlayerPosY',
    tags: [naming],
  },
  0x88: {
    type: float,
    name: 'ooccooJrDestPlayerPosZ',
    tags: [naming],
  },
  0x8c: {
    type: u16,
    name: 'ooccooJrDestPlayerAngleY',
    tags: [naming],
  },
  0x8e: {
    type: charArray,
    length: 8,
    name: 'ooccooJrDestStageName',
    tags: [naming],
  },
  0x96: {
    type: u8,
    name: 'ooccooJrDestEntranceNo',
    tags: [notLookedInto],
  },
  0x97: {
    type: u8,
    name: 'ooccooJrDestRoomNo',
    tags: [notLookedInto],
  },
  0x98: {
    type: u8,
    name: 'mWarpAcceptStage',
    shortDesc: 'Type said to be `char`',
    tags: [notLookedInto],
  },
  0x99: {
    type: u8Array,
    length: 3,
    name: 'padding???',
    tags: [notLookedInto],
  },
  0x9c: {
    type: u8,
    name: 'itemSlotGaleBoomerang',
    tags: [naming],
  },
  0x9d: {
    type: u8,
    name: 'itemSlotLantern',
    tags: [naming],
  },
  0x9e: {
    type: u8,
    name: 'itemSlotSpinner',
    tags: [naming],
  },
  0x9f: {
    type: u8,
    name: 'itemSlotIronBoots',
    tags: [naming],
  },
  0xa0: {
    type: u8,
    name: 'itemSlotHerosBow',
    tags: [naming],
  },
  0xa1: {
    type: u8,
    name: 'itemSlotHawkeye',
    tags: [naming],
  },
  0xa2: {
    type: u8,
    name: 'itemSlotBallAndChain',
    tags: [naming],
  },
  0xa3: {
    type: u8,
    name: '???',
    tags: [naming, investigation],
  },
  0xa4: {
    type: u8,
    name: 'itemSlotDominionRod',
    tags: [naming],
  },
  0xa5: {
    type: u8,
    name: 'itemSlotClawshot',
    tags: [naming],
  },
  0xa6: {
    type: u8,
    name: 'itemSlotDoubleClawshots',
    tags: [naming],
  },
  0xa7: {
    type: u8,
    name: 'itemSlotBottle1',
    tags: [naming],
  },
  0xa8: {
    type: u8,
    name: 'itemSlotBottle2',
    tags: [naming],
  },
  0xa9: {
    type: u8,
    name: 'itemSlotBottle3',
    tags: [naming],
  },
  0xaa: {
    type: u8,
    name: 'itemSlotBottle4',
    tags: [naming],
  },
  0xab: {
    type: u8,
    name: 'itemSlotBombBag1',
    tags: [naming],
  },
  0xac: {
    type: u8,
    name: 'itemSlotBombBag2',
    tags: [naming],
  },
  0xad: {
    type: u8,
    name: 'itemSlotBombBag3',
    tags: [naming],
  },
  0xae: {
    type: u8,
    name: 'itemSlotOoccoo',
    tags: [naming],
  },
  0xaf: {
    type: u8,
    name: 'itemSlotMemoSketch',
    tags: [naming],
  },
  0xb0: {
    type: u8,
    name: 'itemSlotFishingRod',
    tags: [naming],
  },
  0xb1: {
    type: u8,
    name: 'itemSlotTradeItem',
    tags: [naming],
  },
  0xb2: {
    type: u8,
    name: 'itemSlotAncientSkyBook',
    tags: [naming],
  },
  0xb3: {
    type: u8,
    name: 'itemSlotSlingshot',
    tags: [naming],
  },
  0xb4: {
    type: u8Array,
    length: 0x18,
    name: 'itemWheelArray',
    tags: [naming, investigation],
  },
  0xcc: {
    type: u32Array,
    length: 8,
    name: 'gotItemBits',
    shortDesc:
      "What on Contents page? Don't name this and only name inner bits?",
    tags: [naming, investigation],
  },
  0xec: {
    type: u8,
    name: 'numArrows',
    tags: [naming],
  },
  0xed: {
    type: u8,
    name: 'numBombsBag1',
    tags: [naming],
  },
  0xee: {
    type: u8,
    name: 'numBombsBag2',
    tags: [naming],
  },
  0xef: {
    type: u8,
    name: 'numBombsBag3',
    tags: [naming],
  },
  0xf0: {
    type: u8,
    name: 'numLarvaBottle1',
    tags: [naming],
  },
  0xf1: {
    type: u8,
    name: 'numLarvaBottle2',
    tags: [naming],
  },
  0xf2: {
    type: u8,
    name: 'numLarvaBottle3',
    tags: [naming],
  },
  0xf3: {
    type: u8,
    name: 'numLarvaBottle4',
    tags: [naming],
  },
  0xf4: {
    type: u8,
    name: 'numPumpkinSeeds',
    shortDesc: 'Slingshot ammo; naming?',
    tags: [naming],
  },
  0xf5: {
    type: u8Array,
    length: 3,
    name: 'padding???',
    tags: [notLookedInto],
  },
  0xf8: {
    type: u8,
    name: 'maxArrows',
    tags: [naming],
  },
  0xf9: {
    type: u8Array,
    length: 7,
    name: 'moreMaxes???',
    shortDesc: 'fill this out',
    tags: [notLookedInto],
  },
  0x100: {
    type: u8Array,
    length: 8,
    name: 'mItem',
    tags: [notLookedInto],
  },
  0x108: {
    type: u8,
    name: 'unk108',
    tags: [notLookedInto],
  },
  0x109: {
    type: u8,
    name: 'mCrystal',
    tags: [notLookedInto],
  },
  0x10a: {
    type: u8,
    name: 'mMirror',
    tags: [notLookedInto],
  },
  0x10b: {
    type: u8,
    name: 'unk110',
    tags: [notLookedInto],
  },
  0x10c: {
    type: u8,
    name: 'numPoeSouls',
    tags: [investigation],
  },
  0x10d: {
    type: u8Array,
    length: 3,
    name: 'padding???',
    tags: [notLookedInto],
  },
  0x110: {
    type: u8Array,
    length: 3,
    name: 'unknown',
    tags: [notLookedInto],
  },
  0x113: {
    type: u8,
    name: 'unk113',
    tags: [notLookedInto],
  },
  0x114: {
    type: u8Array,
    length: 4,
    name: 'mLightDropNum',
    tags: [notLookedInto],
  },
  0x118: {
    type: u8,
    name: 'mLightDropGetFlag',
    tags: [notLookedInto],
  },
  0x119: {
    type: u8Array,
    length: 3,
    name: 'unk119',
    tags: [notLookedInto],
  },
  0x11c: {
    type: u32Array,
    length: 2,
    name: 'mLetterGetBitfields',
    tags: [notLookedInto],
  },
  0x124: {
    type: u32Array,
    length: 2,
    name: 'mLetterReadBitfields',
    tags: [notLookedInto],
  },
  0x12c: {
    type: u8Array,
    length: 0x40,
    name: 'unk12c',
    shortDesc: 'is this padding?',
    tags: [notLookedInto],
  },
  0x16c: {
    type: u16Array,
    length: 0x10,
    name: 'mFishCount',
    tags: [notLookedInto],
  },
  0x18c: {
    type: u8Array,
    length: 0x10,
    name: 'mMaxSize',
    tags: [notLookedInto],
  },
  0x19c: {
    type: u8Array,
    length: 4,
    naming: 'padding???',
    tags: [notLookedInto],
  },
  0x1a0: {
    type: u32,
    name: 'unk1a0',
    tags: [notLookedInto],
  },
  0x1a4: {
    type: u32,
    name: 'unk1a4',
    tags: [notLookedInto],
  },
  0x1a8: {
    type: u64,
    name: 'mTotalTime',
    tags: [notLookedInto],
  },
  0x1b0: {
    type: u16,
    name: 'unk1b0',
    tags: [notLookedInto],
  },
  0x1b2: {
    type: u16,
    name: 'mDeathCount',
    tags: [notLookedInto],
  },
  0x1b4: {
    type: charArray,
    length: 0x10,
    name: 'mPlayerName',
    tags: [notLookedInto],
  },
  0x1c4: {
    type: u8,
    name: 'unk1c4',
    tags: [notLookedInto],
  },
  0x1c5: {
    type: charArray,
    length: 0x10,
    name: 'mHorseName',
    tags: [notLookedInto],
  },
  0x1d5: {
    type: u8,
    name: 'unk1d5',
    tags: [notLookedInto],
  },
  0x1d6: {
    type: u8,
    name: 'mClearCount',
    tags: [notLookedInto],
  },
  0x1d7: {
    type: u8Array,
    length: 5,
    name: 'unk1d7',
    tags: [notLookedInto],
  },
  0x1dc: {
    type: u8Array,
    length: 4,
    name: 'padding???',
    tags: [notLookedInto],
  },
  0x1e0: {
    type: u8,
    name: 'unk1e0',
    tags: [notLookedInto],
  },
  0x1e1: {
    type: u8,
    name: 'mSoundMode',
    tags: [notLookedInto],
  },
  0x1e2: {
    type: u8,
    name: 'mAttentionType',
    tags: [notLookedInto],
  },
  0x1e3: {
    type: u8,
    name: 'mVibration',
    tags: [notLookedInto],
  },
  0x1e4: {
    type: u8,
    name: 'unk1e4',
    tags: [notLookedInto],
  },
  0x1e5: {
    type: u8,
    name: 'unk1e5',
    tags: [notLookedInto],
  },
  0x1e6: {
    type: u16,
    name: 'mCalibrateDist',
    tags: [notLookedInto],
  },
  0x1e8: {
    type: u8,
    name: 'mCalValue',
    tags: [notLookedInto],
  },
  0x1e9: {
    type: u8,
    name: 'mShortCut',
    tags: [notLookedInto],
  },
  0x1ea: {
    type: u8,
    name: 'mCameraControl',
    tags: [notLookedInto],
  },
  0x1eb: {
    type: u8,
    name: 'mPointer',
    tags: [notLookedInto],
  },
  0x1ec: {
    type: u8Array,
    length: 4,
    name: 'padding???',
    tags: [notLookedInto],
  },
};

Object.keys(questLogStructureByOffset).forEach((offset) => {
  questLogStructureByOffset[offset].offset = Number(offset);
});

export { questLogStructureByOffset };
