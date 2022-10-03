import React, { useState, useEffect } from 'react';
import { PNG } from 'pngjs/browser';
import { ColorPicker, useColor, toColor } from 'react-color-palette';
// import 'react-color-palette/lib/css/styles.css';
import styles from './RecolorDemo.module.css';

import alUpbodyDesatPath from './al_upbody_desatLuma.png';

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Copies to Uint8Array. Modification of answer from
// https://stackoverflow.com/questions/10100798/whats-the-most-straightforward-way-to-copy-an-arraybuffer-object
function copyArrayBuffer(src) {
  const dst = new ArrayBuffer(src.byteLength);
  const newUint8Arr = new Uint8Array(dst);
  newUint8Arr.set(new Uint8Array(src));
  return newUint8Arr;
}

function blendGrayAndRgb(grayVal, { r: inputR, g: inputG, b: inputB }) {
  let rTimes255, gTimes255, bTimes255;

  // const inputR = (rgb >> 16) & 0xff;
  // const inputG = (rgb >> 8) & 0xff;
  // const inputB = rgb & 0xff;

  if (grayVal <= 0x7f) {
    const grayTimesTwo = 2 * grayVal;

    rTimes255 = grayTimesTwo * inputR;
    gTimes255 = grayTimesTwo * inputG;
    bTimes255 = grayTimesTwo * inputB;
  } else {
    const multiplier = 2 * (255 - grayVal);

    rTimes255 = 255 * 255 - multiplier * (255 - inputR);
    gTimes255 = 255 * 255 - multiplier * (255 - inputG);
    bTimes255 = 255 * 255 - multiplier * (255 - inputB);
  }

  // Divide each by 255
  const r = (rTimes255 + 1 + (rTimes255 >> 8)) >> 8;
  const g = (gTimes255 + 1 + (gTimes255 >> 8)) >> 8;
  const b = (bTimes255 + 1 + (bTimes255 >> 8)) >> 8;

  return { r, g, b };
}

function RecolorDemo() {
  const [basePngDataBuffer, setBasePngDataBuffer] = useState(null);
  const [pngInst, setPngInst] = useState(null);
  const [pngDataUri, setPngDataUri] = useState(null);
  const [color, setColor] = useColor('hex', '#6b875e');

  useEffect(async () => {
    const arrayBuffer = await (await fetch(alUpbodyDesatPath)).arrayBuffer();

    new PNG({ filterType: 4 }).parse(arrayBuffer, function (error, data) {
      console.log(error, data);
      if (!error) {
        setBasePngDataBuffer(copyArrayBuffer(data.data));
        setPngInst(data);
      }
    });
  }, []);

  useEffect(() => {
    if (!pngInst || !basePngDataBuffer) {
      return;
    }

    pngInst.data = copyArrayBuffer(basePngDataBuffer);

    const blends = new Array(256);
    for (let i = 0; i <= 255; i++) {
      blends[i] = blendGrayAndRgb(i, color.rgb);
    }

    for (let y = 0; y < pngInst.height; y++) {
      for (let x = 0; x < pngInst.width; x++) {
        const idx = (pngInst.width * y + x) << 2;
        if (
          pngInst.data[idx] !== pngInst.data[idx + 1] ||
          pngInst.data[idx + 1] !== pngInst.data[idx + 2]
        ) {
          throw new Error('not equal');
        }

        const { r, g, b } = blends[pngInst.data[idx]];
        pngInst.data[idx] = r;
        pngInst.data[idx + 1] = g;
        pngInst.data[idx + 2] = b;
      }
    }

    const buffer = PNG.sync.write(pngInst, { colorType: 6 });
    const dataUri = arrayBufferToBase64(buffer);
    setPngDataUri(dataUri);
  }, [pngInst, basePngDataBuffer, color]);

  useEffect(() => {
    console.log('basePngDataBuffer');
    console.log(basePngDataBuffer);
  }, [basePngDataBuffer]);

  return (
    <div className={styles.root}>
      {pngDataUri && (
        <div className={styles.blendWrapper}>
          <img
            src={`data:image/png;base64,${pngDataUri}`}
            className={styles.blendImg}
          ></img>
        </div>
      )}
      <ColorPicker
        width={300}
        height={150}
        color={color}
        onChange={setColor}
        hideHSV
        hideRGB
        dark
      />
    </div>
  );
}

export default RecolorDemo;
