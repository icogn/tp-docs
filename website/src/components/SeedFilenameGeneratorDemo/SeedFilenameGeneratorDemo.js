import React from 'react';
import md5 from 'md5';
import { useForm, Controller, useWatch } from 'react-hook-form';
import styles from './SeedFilenameGeneratorDemo.module.css';
import nouns from '../../data/seedFilename/nouns.json';
import adjectives from '../../data/seedFilename/adjectives.json';

const chars = '0123456789abcDefghiJkLmNopQrstuVwxyzABEHR';

function sixteenBitTo3Char(number) {
  const iterations = 3;
  const charCount = 41;

  const arr = [];
  let currNum = number;

  for (let i = 0; i < iterations; i++) {
    const charIndex = currNum % charCount;
    arr.push(chars[charIndex]);
    currNum = (currNum - charIndex) / charCount;
  }

  return arr.reverse().join('');
}

function genFilenames({ verMajor, verMinor, gameVer, textAreaContent }) {
  let gameVerStr = 'GE';

  switch (gameVer) {
    case 'GZ2E':
      gameVerStr = 'ge';
      break;
    case 'GZ2P':
      gameVerStr = 'gp';
      break;
    case 'GZ2J':
      gameVerStr = 'gj';
      break;
    case 'RZDE':
      gameVerStr = 're';
      break;
    case 'RZDP':
      gameVerStr = 'rp';
      break;
    case 'RZDJ':
      gameVerStr = 'rj';
      break;
    case 'RZDK':
      gameVerStr = 'rk';
      break;
  }

  const hash = md5(textAreaContent).substring(0, 8);
  const u32 = parseInt(hash, 16);

  const adjIndex = u32 >>> 23;
  const nounIndex = (u32 >> 16) & 0x7f;
  const adjNoun = adjectives[adjIndex] + nouns[nounIndex];
  const threeChar = sixteenBitTo3Char(u32 & 0xffff);

  const thirtyTwoBitName = `${adjNoun}_${threeChar}`;

  const internalFilename = `sd${sixteenBitTo3Char(verMajor)}${sixteenBitTo3Char(
    verMinor
  )}${thirtyTwoBitName}`;
  const osFilename = `TprSeed-v${verMajor}.${verMinor}${gameVerStr}--${thirtyTwoBitName}.gci`;

  return {
    internalFilename,
    osFilename,
  };
}

function FilenameGroup({ label, value }) {
  return (
    <div className={styles.gridGroup}>
      <div className={styles.filenameLabel}>{label}</div>
      <div>{value}</div>
    </div>
  );
}

function FilenameTable({ control }) {
  const values = useWatch({ control });
  const { internalFilename, osFilename } = genFilenames(values);

  return (
    <>
      <FilenameGroup label="osFilename" value={osFilename} />
      <FilenameGroup label="internalFilename" value={internalFilename} />
    </>
  );
}

const VersionInput = ({ field: { onChange, ...other } }) => (
  <input
    {...other}
    type="number"
    min="0"
    max="65535"
    maxLength="5"
    autoComplete="off"
    onChange={(e) => {
      let val = e.target.value.replace(/[^01-9]+/g, '');

      let firstNonZeroIndex = -1;
      for (let i = 0; i < val.length; i++) {
        if (val[i] !== '0') {
          firstNonZeroIndex = i;
          break;
        }
      }
      if (firstNonZeroIndex > 0) {
        val = val.substring(firstNonZeroIndex);
      }

      if (val.length > 5) {
        val = '65535';
      } else if (val.length < 1) {
        val = '0';
      }
      const asInt = parseInt(val, 10);
      if (asInt < 0) {
        val = '0';
      } else if (asInt > 65535) {
        val = '65535';
      }
      e.target.value = val;
      onChange(e);
    }}
  />
);

function SeedFilenameGeneratorDemo() {
  const { control, register } = useForm({
    defaultValues: {
      verMajor: '17',
      verMinor: '3',
      gameVer: 'GZ2E',
      textAreaContent: 'Change me to see the adjectives and nouns change.',
    },
  });

  return (
    <p>
      <div className={styles.root}>
        <h3>Example Filename Generator</h3>
        <div className={styles.description}>
          Edit the fields below to see example filenames.
        </div>
        <div className={styles.gridGroup}>
          <label className={styles.versionLabel}>versionMajor</label>
          <Controller control={control} name="verMajor" render={VersionInput} />
        </div>
        <div className={styles.gridGroup}>
          <label className={styles.versionLabel}>versionMinor</label>
          <Controller control={control} name="verMinor" render={VersionInput} />
        </div>
        <div className={styles.gridGroup}>
          <label className={styles.versionLabel}>gameVersion</label>
          <select {...register('gameVer')}>
            <option value="GZ2E">GZ2E (GC US)</option>
            <option value="GZ2P">GZ2P (GC PAL)</option>
            <option value="GZ2J">GZ2J (GC JP)</option>
            <option value="RZDE">RZDE (Wii US)</option>
            <option value="RZDP">RZDP (Wii US)</option>
            <option value="RZDJ">RZDJ (Wii JP)</option>
            <option value="RZDK">RZDK (Wii Korea)</option>
          </select>
        </div>
        <div className={styles.gridGroup}>
          <Controller
            control={control}
            name="textAreaContent"
            render={({ field }) => (
              <textarea {...field} className={styles.textarea} rows="4" />
            )}
          />
        </div>
        <FilenameTable control={control} />
      </div>
    </p>
  );
}

export default SeedFilenameGeneratorDemo;
