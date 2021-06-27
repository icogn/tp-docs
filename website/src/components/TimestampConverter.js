import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import useThemeContext from '@theme/hooks/useThemeContext';
import { osTicksToCalendarTime } from '../base/os';
import styles from './TimestampConverter.module.css';

const dayOfWeekToText = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function pad(val, len) {
  val = String(val);
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

function pad2(val) {
  return pad(val, 2);
}

const dayOfYearTextEnding = {
  1: 'st',
  2: 'nd',
  3: 'rd',
};

function formatDayOfYear(val) {
  const str = String(val + 1);
  const lastChar = str.charAt(str.length - 1);

  const ending = dayOfYearTextEnding[lastChar] || 'th';
  return str + ending;
}

function convertTimestampToText(timestamp, useSeconds) {
  if (useSeconds) {
    let timeAsBigInt = BigInt('0x' + timestamp) * 40500000n;
    timestamp = timeAsBigInt.toString(16);
  }

  const {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    milliseconds,
    microseconds,
    dayOfWeek,
    dayOfYear,
  } = osTicksToCalendarTime(timestamp);

  const fractionalSeconds = useSeconds
    ? ''
    : `.${pad(milliseconds, 3)}${pad(microseconds, 3)}`;

  return `${year}/${pad2(month + 1)}/${pad2(day)} ${pad2(hours)}:${pad2(
    minutes
  )}:${pad2(seconds)}${fractionalSeconds} (${dayOfWeekToText[dayOfWeek]})
This is the ${formatDayOfYear(dayOfYear)} day of the year.`;
}

function validateNormalizeInput(value, useSeconds) {
  let val = value.replaceAll(/\s/g, '');
  if (val.toLowerCase().indexOf('0x') === 0) {
    val = val.substring(2);
  }

  if (val.length < 1) {
    return { ignore: true };
  }

  if (useSeconds) {
    if (val.length > 8) {
      return { error: 'Expected 8 hex digits.' };
    }
  }

  if (!/^[0-9a-f]*$/gi.test(val)) {
    return { error: 'Invalid characters.' };
  }

  if (!useSeconds) {
    if (val.length > 16) {
      return { error: 'Expected 16 hex digits.' };
    } else if (val.length === 16 && /^[89a-f]/i.test(val)) {
      return { error: 'Input must be positive.' };
    }
  }

  return { val, error: '' };
}

function TimestampConverter({ title, useSeconds }) {
  const inputEl = useRef(null);
  const [text, setText] = useState('');
  const [hasError, setHasError] = useState(false);
  const { isDarkTheme } = useThemeContext();

  function handleClick() {
    if (inputEl.current) {
      const { val, error, ignore } = validateNormalizeInput(
        inputEl.current.value,
        useSeconds
      );

      setHasError(Boolean(error));

      if (ignore) {
        setText('');
      } else if (error) {
        setText(error);
      } else if (val && val.length > 0) {
        setText(convertTimestampToText(val, useSeconds));
      } else {
        setText('');
      }
    }
  }

  return (
    <div className={isDarkTheme ? styles.darkTheme : 0}>
      <div>{title || 'TimestampConverter'}</div>
      <input maxLength={useSeconds ? 20 : 40} ref={inputEl} />
      <button onClick={handleClick}>Convert</button>
      <div
        className={clsx({
          [styles.outputText]: true,
          [styles.error]: hasError,
        })}
      >
        {text}
      </div>
    </div>
  );
}

export default TimestampConverter;
