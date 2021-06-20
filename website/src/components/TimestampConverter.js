import React, { useRef, useState } from 'react';
import { osTicksToCalendarTime } from '../base/os';

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

function convertTimestampToText(timestamp) {
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
  return `${year}/${pad2(month + 1)}/${pad2(day)} ${pad2(hours)}:${pad2(
    minutes
  )}:${pad2(seconds)}.${pad(milliseconds, 3)}${pad(microseconds, 3)} (${
    dayOfWeekToText[dayOfWeek]
  })
This is the ${formatDayOfYear(dayOfYear)} day of the year.`;
}

function TimestampConverter() {
  const inputEl = useRef(null);
  const [text, setText] = useState('');

  function handleClick() {
    if (inputEl.current) {
      const { value } = inputEl.current;
      const ttt = convertTimestampToText(value);
      setText(ttt);
    }
  }

  return (
    <div>
      <div>TimestampConverter</div>
      <input ref={inputEl} />
      <button onClick={handleClick}>Convert</button>
      <div style={{ whiteSpace: 'pre-line' }}>{text}</div>
    </div>
  );
}

export default TimestampConverter;
