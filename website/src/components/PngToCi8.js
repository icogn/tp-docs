import React, { useState } from 'react';
import { PNG } from 'pngjs/browser';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
import styles from './PngToCi8.module.css';

const largeFileWarning =
  'File seems quite large. Please open an issue if you need support for an image of this size.';

function genBtiData({ width: w, height: h, data }) {
  const blockWidth = (w + 7) >> 3;
  const blockHeight = (h + 3) >> 2;

  const pixelDataLen = blockWidth * 8 * blockHeight * 4;
  const paletteDataOffset = 0x20 + pixelDataLen;

  const pixelColors = [];
  const paletteEntries = {};

  for (let i = 0; i < pixelDataLen; i++) {
    const blockIndex = i >> 5;
    const blockX = blockIndex % blockWidth;
    const blockY = Math.floor(blockIndex / blockWidth);
    const x = blockX * 8 + (i % 8);
    const y = blockY * 4 + (Math.floor(i / 8) % 4);

    let color = 0xffff;
    if (x < w && y < h) {
      const idx = (w * y + x) << 2;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      if (a === 0xff) {
        color = 0x8000 | ((r & 0xf8) << 7) | ((g & 0xf8) << 2) | (b >> 3);
      } else {
        color = ((a & 0xe0) << 7) | ((r & 0xf0) << 4) | (g & 0xf0) | (b >> 4);
      }
    }

    pixelColors[i] = color;
    paletteEntries[color] = true;

    if (Object.keys(paletteEntries).length > 0x100) {
      throw new Error('PNG can have at most 256 unique pixel rgba values.');
    }
  }

  const sortedColors = Object.keys(paletteEntries)
    .sort((a, b) => a - b)
    .map((a) => Number(a));

  const colorToIndex = sortedColors.reduce(function (acc, color, i) {
    acc[color] = i;
    return acc;
  }, {});

  let numPaletteEntries = (sortedColors.length + 0xe) >> 4;
  numPaletteEntries = numPaletteEntries << 4;
  const numPaletteBytes = numPaletteEntries * 2;

  const outputBuffer = new ArrayBuffer(paletteDataOffset + numPaletteBytes);
  const view = new DataView(outputBuffer);

  // Write BTI header
  view.setUint8(0, 0x09);
  view.setUint8(1, 0x02);
  view.setUint16(2, w);
  view.setUint16(4, h);
  view.setUint8(8, 0x01);
  view.setUint8(9, 0x02);
  view.setUint16(0xa, numPaletteEntries);
  view.setUint32(0xc, paletteDataOffset);
  view.setUint8(0x14, 0x01);
  view.setUint8(0x15, 0x01);
  view.setUint8(0x18, 0x01);
  view.setUint32(0x1c, 0x20);

  // Write palette data
  for (let i = 0; i < numPaletteBytes; i += 4) {
    view.setUint32(i + paletteDataOffset, 0xffffffff);
  }
  for (let i = 0; i < sortedColors.length; i++) {
    view.setUint16(paletteDataOffset + i * 2, sortedColors[i]);
  }

  // Write pixel data
  for (let i = 0; i < pixelColors.length; i++) {
    view.setUint8(0x20 + i, colorToIndex[pixelColors[i]]);
  }

  return view.buffer;
}

export default function PngToCi8() {
  const [url, setUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    const { files } = e.target;

    if (files.length < 1) {
      setUrl('');
      setFilename('');
      setErrorMsg('');
      return;
    }

    const file = files[0];

    if (file.size > 100000) {
      setUrl('');
      setFilename('');
      setErrorMsg(largeFileWarning);
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      try {
        new PNG({ filterType: 4 }).parse(
          Buffer.from(this.result),
          function (error, data) {
            if (error) {
              throw new Error(error);
            } else if (data.width * data.height >= 262144) {
              throw new Error(largeFileWarning);
            }

            const btiBuffer = genBtiData(data);

            const blob = new Blob([btiBuffer], {
              type: 'application/octet-stream',
            });

            let outputFilename;

            const origFilename = file.name;
            if (origFilename.endsWith('.png')) {
              outputFilename =
                origFilename.substring(0, origFilename.length - 4) + '.bti';
            } else {
              outputFilename = origFilename + '.bti';
            }

            setUrl(window.URL.createObjectURL(blob));
            setFilename(outputFilename);
            setErrorMsg('');
          }
        );
      } catch (e) {
        setUrl('');
        setFilename('');
        setErrorMsg(e.message);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  // p tag at bottom is to provide the standard amount of space in the document
  return (
    <>
      <form>
        <input type="file" accept="image/png" onChange={handleChange} />
      </form>
      {!errorMsg && url && filename && (
        <a id="download_link" download={filename} href={url}>
          {`Download ${filename}`}
        </a>
      )}
      {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
      <p></p>
    </>
  );
}
