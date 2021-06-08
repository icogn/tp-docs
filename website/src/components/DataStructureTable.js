import clsx from 'clsx';
import React from 'react';
import { sprintf } from 'sprintf-js';
import { dataTypes } from '../data/constants';
import styles from './DataStructureTable.module.css';

function renderRows(data) {
  console.log('data');
  console.log(data);
  const ret = [];
  let blankIndex = 0;

  data.forEach(({ offset, type, name, length, shortDesc, tags }, i) => {
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
    if (type === dataTypes.charArray) {
      displayType = `char[${length}]`;
    } else if (type === dataTypes.u8Array) {
      displayType = `u8[${length}]`;
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
        <td>{name}</td>
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
