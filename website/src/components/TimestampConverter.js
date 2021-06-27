import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import useThemeContext from '@theme/hooks/useThemeContext';
import { osTicksToCalendarTime } from '../base/os';
import styles from './TimestampConverter.module.css';

const OSTicksPerSecond = 40500000n;
const SecondsPerDay = 86400n;
const SecondsPerHour = 3600n;
const SecondsPerMinute = 60n;
const MaxSafeOSTicks = 0x7fffffffffffffffn;
const MULHW_POINT32 = 1374389535n; // 0x51eb851f

const RegexTimeNoFractionalSeconds =
  /^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
const RegexTimeWithFractionalSeconds =
  /^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.?)(\d{0,6})$/;

const dayOfWeekToText = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const dayOfYearTextEnding = { 1: 'st', 2: 'nd', 3: 'rd' };

function pad(val, len) {
  val = String(val);
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

function padRight(val, len) {
  val = String(val);
  while (val.length < len) {
    val = val + '0';
  }
  return val;
}

function pad2(val) {
  return pad(val, 2);
}

function formatDayOfYear(val) {
  const str = String(val + 1);
  const lastChar = str.charAt(str.length - 1);

  const ending = dayOfYearTextEnding[lastChar] || 'th';
  return str + ending;
}

function convertTimestampToText(timestamp, useSeconds) {
  if (useSeconds) {
    let timeAsBigInt = BigInt('0x' + timestamp) * OSTicksPerSecond;
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

function processTimestampInput(value, useSeconds) {
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

function genOSTicksForYear(year) {
  year -= 2000n;

  let extraLeapDays;
  if (year >= 1n) {
    const prevYear = year - 1n;
    const prevYearTimesPoint32 = (prevYear * MULHW_POINT32) >> 0x20n;
    const prevYearOver400 = prevYearTimesPoint32 >> 7n; // divide by 128
    const prevYearOver100 = prevYearTimesPoint32 >> 5n; // divide by 32
    const yearPlus3Over4 = (year + 3n) >> 2n;
    const leapDaysWithoutHundreds = yearPlus3Over4 - prevYearOver100;
    extraLeapDays = leapDaysWithoutHundreds + prevYearOver400;
  } else {
    extraLeapDays = 0n;
  }

  const dayOffset = year * 365n + extraLeapDays;
  return dayOffset * SecondsPerDay * OSTicksPerSecond;
}

const monthDayOffsetsNonLeap = [
  0, 0x1f, 0x3b, 0x5a, 0x78, 0x97, 0xb5, 0xd4, 0xf3, 0x111, 0x130, 0x14e,
];
const monthDayOffsetsLeap = [
  0, 0x1f, 0x3c, 0x5b, 0x79, 0x98, 0xb6, 0xd5, 0xf4, 0x112, 0x131, 0x14f,
];

function genOSTicksForDayOfYear(year, month, day) {
  let isLeapYear = true;
  let skip400YearCheck = false;

  const yearOver4 = year >> 2n;
  const prevMultipleOf4Year = yearOver4 * 4n;

  if (prevMultipleOf4Year === year) {
    const yearTimesPoint32 = (year * MULHW_POINT32) >> 0x20n;
    const yearOver100 = yearTimesPoint32 >> 5n; // divide by 32
    const prevHundredsYear = yearOver100 * 100n;

    if (prevHundredsYear !== year) {
      // year is divisible by 4 but not 100, so guaranteed to be a leap year
      skip400YearCheck = true;
    }
  }

  if (!skip400YearCheck) {
    const yearTimesPoint32 = (year * MULHW_POINT32) >> 0x20n;
    const yearOver400 = yearTimesPoint32 >> 7n; // divide by 128
    const prevFourHundredsYear = yearOver400 * 400n;

    if (prevFourHundredsYear !== year) {
      isLeapYear = false;
    }
  }

  let monthDayOffsets;
  if (isLeapYear) {
    monthDayOffsets = monthDayOffsetsLeap;
  } else {
    monthDayOffsets = monthDayOffsetsNonLeap;
  }

  const dayInYear = BigInt(monthDayOffsets[month]) + day - 1n;
  return dayInYear * SecondsPerDay * OSTicksPerSecond;
}

function genTimestampFromTimeInfo({
  year,
  month,
  day,
  hours,
  minutes,
  seconds,
  fractionalSeconds,
}) {
  let osTicks = 0n;

  osTicks += genOSTicksForYear(year);
  osTicks += genOSTicksForDayOfYear(year, month, day);
  osTicks += hours * SecondsPerHour * OSTicksPerSecond;
  osTicks += minutes * SecondsPerMinute * OSTicksPerSecond;
  osTicks += seconds * OSTicksPerSecond;
  osTicks += (fractionalSeconds * 324n) / 8n;

  // check to make sure timestamp is not more than 0x7fffffff ffffffff
  if (osTicks > MaxSafeOSTicks) {
    return -1n;
  }
  return osTicks;
}

function processTimeInput(value, useSeconds) {
  if (typeof value !== 'string' || value.length < 1) {
    return { ignore: true };
  }

  let year;
  let month;
  let day;
  let hours;
  let minutes;
  let seconds;
  let fractionalSeconds = 0n;

  if (useSeconds) {
    const match = value.match(RegexTimeNoFractionalSeconds);
    if (!match) {
      return { error: 'Input does not match the format: YYYY/MM/DD hh:mm:ss' };
    }
    year = BigInt(match[1]);
    month = BigInt(match[2]) - 1n;
    day = BigInt(match[3]);
    hours = BigInt(match[4]);
    minutes = BigInt(match[5]);
    seconds = BigInt(match[6]);
  } else {
    const match = value.match(RegexTimeWithFractionalSeconds);
    if (!match || (match[7].length === 0 && match[8].length > 0)) {
      return {
        error: 'Input does not match the format: YYYY/MM/DD hh:mm:ss.ssssss',
      };
    }
    year = BigInt(match[1]);
    month = BigInt(match[2]) - 1n;
    day = BigInt(match[3]);
    hours = BigInt(match[4]);
    minutes = BigInt(match[5]);
    seconds = BigInt(match[6]);
    fractionalSeconds = BigInt(padRight(match[8], 6));
  }

  if (year < 2000n) {
    return { error: 'Minimum year is 2000.' };
  } else if (month < 0 || month > 11) {
    return { error: 'Month must be between 01 and 12.' };
  } else if (day < 1) {
    // We don't bother checking if day is valid for the year and month
    // combination. March 32 would be the same as April 1.
    return { error: 'Day must be at least 01.' };
  } else if (hours >= 24) {
    return { error: 'Hours must be between 00 and 23' };
  } else if (minutes >= 60) {
    return { error: 'Minutes must be between 00 and 59' };
  } else if (seconds >= 60) {
    return { error: 'Minutes must be between 00 and 59' };
  }

  let result = genTimestampFromTimeInfo({
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    fractionalSeconds,
  });

  if (result < 0) {
    return { error: 'Pick an earlier time.' };
  }

  if (useSeconds) {
    result /= OSTicksPerSecond;
    if (result > 0xffffffffn) {
      return { error: 'Max time is 2136/02/07 06:28:15' };
    }
  }

  return { val: pad(result.toString(16), useSeconds ? 8 : 16), error: '' };
}

function genInputMaxLength(fromTimestamp, useSeconds) {
  if (fromTimestamp) {
    return useSeconds ? 20 : 40;
  }
  return useSeconds ? 19 : 26;
}

function genTitle(sourceName, fromTimestamp) {
  if (fromTimestamp) {
    return `${sourceName} to Time Converter`;
  }
  return `Time to ${sourceName} Converter`;
}

function TimestampConverter({ sourceName, useSeconds }) {
  const inputEl = useRef(null);
  const [fromTimestamp, setFromTimestamp] = useState(true);
  const [text, setText] = useState('');
  const [hasError, setHasError] = useState(false);
  const { isDarkTheme } = useThemeContext();

  function handleClick() {
    if (!inputEl.current) {
      return;
    }

    if (fromTimestamp) {
      const { val, error, ignore } = processTimestampInput(
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
    } else {
      const { val, error, ignore } = processTimeInput(
        inputEl.current.value,
        useSeconds
      );

      setHasError(Boolean(error));

      if (ignore) {
        setText('');
      } else if (error) {
        setText(error);
      } else if (val && val.length > 0) {
        setText(val);
      } else {
        setText('');
      }
    }
  }

  return (
    <div className={isDarkTheme ? styles.darkTheme : 0}>
      <div>
        {sourceName
          ? genTitle(sourceName, fromTimestamp)
          : 'TimestampConverter'}
      </div>
      <input
        maxLength={genInputMaxLength(fromTimestamp, useSeconds)}
        ref={inputEl}
      />
      <button onClick={handleClick}>Convert</button>
      {!fromTimestamp && (
        <div className={styles.dateFormat}>
          {`YYYY/MM/DD hh:mm:ss${
            useSeconds ? '' : '[.s] (Up to 6 digits after seconds)'
          }`}
        </div>
      )}
      <div
        className={clsx({
          [styles.outputText]: true,
          [styles.error]: hasError,
        })}
        style={{
          display: text ? undefined : 'none',
        }}
      >
        {text}
      </div>
      <button
        className={styles.swapButton}
        onClick={() => {
          if (inputEl.current) {
            inputEl.current.value = '';
          }
          setText('');
          setFromTimestamp(!fromTimestamp);
        }}
      >
        Swap
      </button>
    </div>
  );
}

export default TimestampConverter;
