import React from 'react';
import DataStructureTable from './DataStructureTable';
import { questLogStructureByOffset } from '../data/questLogStructure';

const sections = [
  { name: 'playerStatusA', start: 0x0 },
  { name: 'playerStatusB', start: 0x28 },
  { name: 'horsePlace', start: 0x40 },
  { name: 'playerReturnPlace', start: 0x58 },
  { name: 'playerFieldLastStayInfo', start: 0x64 },
  { name: 'playerLastMarkInfo', start: 0x80 },
  { name: 'playerItem', start: 0x9c },
  { name: 'playerGetItem', start: 0xcc },
  { name: 'playerItemRecord', start: 0xec },
  { name: 'playerItemMax', start: 0xf8 },
  { name: 'playerCollect', start: 0x100 },
  { name: 'playerWolf', start: 0x110 },
  { name: 'lightDrop', start: 0x114 },
  { name: 'letterInfo', start: 0x11c },
  { name: 'fishingInfo', start: 0x16c },
  { name: 'playerInfo', start: 0x1a0 },
  { name: 'playerConfig', start: 0x1e0 },
  { name: 'tRegionStuff', start: 0x1f0 },
  { name: 't5f0Stuff', start: 0x5f0 },
  { name: 'tEventBitStuff', start: 0x7f0 },
  { name: 'tPostEventBitGarbage', start: 0x8f0 },
  { name: 'tMinigameStuff', start: 0x940 },
];

const tableRowArr = [];

let currentIndex = -1;
let nextSectionOffset = -1;

function checkPushNewSection(offset) {
  let changedSection = false;

  while (offset >= nextSectionOffset) {
    changedSection = true;
    currentIndex += 1;
    nextSectionOffset =
      currentIndex + 1 >= sections.length
        ? Number.MAX_SAFE_INTEGER
        : sections[currentIndex + 1].start;
  }

  if (changedSection) {
    const { name, length } = sections[currentIndex];
    tableRowArr.push({ type: 'class', name, length });
  }
}

Object.keys(questLogStructureByOffset).forEach((offset) => {
  checkPushNewSection(offset);
  tableRowArr.push(questLogStructureByOffset[offset]);
});

function QuestLogTable() {
  return <DataStructureTable data={tableRowArr} />;
}

export default QuestLogTable;
