import clsx from 'clsx';
import React from 'react';
import { sprintf } from 'sprintf-js';
import Link from '@docusaurus/Link';
import { dataTypes } from '../data/constants';
import styles from './DataStructureTable.module.css';

const dataTypeToArrayText = {
  [dataTypes.charArray]: 'char',
  [dataTypes.u8Array]: 'u8',
  [dataTypes.u16Array]: 'u16',
  [dataTypes.u32Array]: 'u32',
};

function formatArrayText(text, number) {
  if (number >= 0xa) {
    return `${text}[${sprintf('0x%x', number)}]`;
  }
  return `${text}[${number}]`;
}

function renderRows(data) {
  console.log('data');
  console.log(data);
  const ret = [];
  let blankIndex = 0;

  data.forEach(({ offset, type, name, length, shortDesc, tags, link }, i) => {
    if (type === 'class') {
      if (i > 0) {
        ret.push(
          <tr key={`b${blankIndex}`} className={styles.blankRow}>
            <td colSpan="9999"></td>
          </tr>
        );
        blankIndex++;
      }
      ret.push(
        <tr key={name}>
          <td colSpan="9999">{name}</td>
        </tr>
      );
      return;
    }

    let displayType = type;
    if (dataTypeToArrayText[type]) {
      displayType = formatArrayText(dataTypeToArrayText[type], length);
    }

    ret.push(
      <tr
        key={offset}
        className={clsx(styles.row, {
          [styles.investigation]: tags && tags.includes('investigation'),
          [styles.naming]: tags && tags.includes('naming'),
          [styles.notLookedInto]: tags && tags.includes('notLookedInto'),
        })}
      >
        <td>{sprintf('0x%03x', offset)}</td>
        <td>{displayType}</td>
        <td>{link ? <Link to={link}>{name}</Link> : name}</td>
        <td></td>
        <td>{shortDesc}</td>
      </tr>
    );
  });

  // return data.map(({ offset, type, name, length, shortDesc, tags }) => {
  // });

  return ret;
}

function DataStructureTable({ data }) {
  return (
    <table>
      <tbody>
        <tr>
          <th scope="col">Offset</th>
          <th scope="col">Type</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
        </tr>
        {renderRows(data)}
      </tbody>
    </table>
  );
}

export default DataStructureTable;
