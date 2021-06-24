const TICKS_PER_SECOND = 40500000n;
const TICKS_PER_MS = 40500n;
const SECONDS_PER_DAY = 86400n; // 60 s/min * 60 min/hr * 24 hr/day
const YEAR_2K_JAN_FIRST_DAY_OFFSET = 730485n; // relative to Jan 1, year 0

const MULHW_NEG_3_OVER_7 = -1840700269n;
const MULHW_NEG_28_OVER_60 = -2004318071n; // 0x88888889
const MULHW_NEG_109_OVER_365 = -1282606671n; // 0xb38cf9b1
const MULHW_POINT32 = 1374389535n; // 0x51eb851f

const monthDayOffsetsNonLeap = [
  0, 0x1f, 0x3b, 0x5a, 0x78, 0x97, 0xb5, 0xd4, 0xf3, 0x111, 0x130, 0x14e,
];
const monthDayOffsetsLeap = [
  0, 0x1f, 0x3c, 0x5b, 0x79, 0x98, 0xb6, 0xd5, 0xf4, 0x112, 0x131, 0x14f,
];

function osTicksToCalendarTime(timestampStr) {
  const timestamp = BigInt('0x' + timestampStr);

  const osCalendar = {};

  const fractionalSecondTicks = timestamp % TICKS_PER_SECOND;

  let microseconds = (fractionalSecondTicks * 8n) / 324n; // divide by 40.5 for microseconds
  microseconds = microseconds % 1000n;
  osCalendar.microseconds = Number(microseconds);

  let milliseconds = fractionalSecondTicks / TICKS_PER_MS;
  milliseconds = milliseconds % 1000n; // Not strictly necessary, but done nonetheless
  osCalendar.milliseconds = Number(milliseconds);

  const secondTicks = timestamp - fractionalSecondTicks;
  const numSeconds = secondTicks / TICKS_PER_SECOND;
  const numDays = numSeconds / SECONDS_PER_DAY;

  const dayOffset = numDays + YEAR_2K_JAN_FIRST_DAY_OFFSET; // numDays since Jan 1, year 0
  getDates(dayOffset, osCalendar);

  const secondsOfDay = numSeconds % SECONDS_PER_DAY;
  // ^ number of seconds which have passed in the day the timestamp refers to

  const secondsOfDayTimesNeg28Over60 =
    (MULHW_NEG_28_OVER_60 * secondsOfDay) >> 0x20n;
  const secondsOfDayTimes32Over60 = secondsOfDay + secondsOfDayTimesNeg28Over60;
  const minutesOfDay = secondsOfDayTimes32Over60 >> 5n; // divide by 32

  const minutesOfDayTimesNeg28Over60 =
    (MULHW_NEG_28_OVER_60 * minutesOfDay) >> 0x20n;
  const minutesOfDayTimes32Over60 = minutesOfDay + minutesOfDayTimesNeg28Over60;
  const hours = minutesOfDayTimes32Over60 >> 5n; // divide by 32

  const minutesFromHours = hours * 60n;
  osCalendar.hours = Number(hours);

  const secondsFromMinutes = minutesOfDay * 60n;

  const minutes = minutesOfDay - minutesFromHours;
  osCalendar.minutes = Number(minutes);

  const seconds = secondsOfDay - secondsFromMinutes;
  osCalendar.seconds = Number(seconds);

  return osCalendar;
}

function getDates(dayOffset, osCalendar) {
  // Calculate day of the week
  const dayPlus6 = dayOffset + 6n;

  const dayPlus6TimesNeg3Over7 = (MULHW_NEG_3_OVER_7 * dayPlus6) >> 0x20n;
  const dayPlus6Times4Over7 = dayPlus6 + dayPlus6TimesNeg3Over7;
  const dayPlus6Over7 = dayPlus6Times4Over7 >> 2n;
  const nextSeventhDayOffset = dayPlus6Over7 * 7n;

  const dayOfWeek = dayPlus6 - nextSeventhDayOffset;
  osCalendar.dayOfWeek = Number(dayOfWeek);

  // Calculate year and day of the year

  const dayOffsetTimesNeg109Over365 =
    (dayOffset * MULHW_NEG_109_OVER_365) >> 0x20n;
  const dayOffsetTimes256Over365 = dayOffset + dayOffsetTimesNeg109Over365;

  let year = dayOffsetTimes256Over365 >> 8n; // divide by 256
  let naiveDayOffsetOfYear = year * 365n;
  let trueDayOffsetOfYear;

  while (true) {
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

    trueDayOffsetOfYear = naiveDayOffsetOfYear + extraLeapDays;

    if (trueDayOffsetOfYear <= dayOffset) {
      break;
    }

    year -= 1n;
    naiveDayOffsetOfYear -= 365n;
  }

  const dayOfTheYear = Number(dayOffset - trueDayOffsetOfYear);
  osCalendar.year = Number(year);
  osCalendar.dayOfYear = dayOfTheYear;

  // Calculate month  and day of the month

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

  let month = 12;

  while (true) {
    month -= 1;
    const monthDayOffset = monthDayOffsets[month];
    if (dayOfTheYear >= monthDayOffset) {
      break;
    }
  }

  osCalendar.month = month;

  const monthDayOffset = monthDayOffsets[month];
  const dayOffsetOfTheMonth = dayOfTheYear - monthDayOffset;
  const dayOfTheMonth = dayOffsetOfTheMonth + 1;
  osCalendar.day = dayOfTheMonth;
}

// const a = osTicksToCalendarTime('00615b390fb0dcef');
// console.log(a);

const a = [];
for (let i = 0; i < 0xffd; i++) {
  // if (i === 3) {
  //   a.push(0xaaff);
  // } else if (i === 29) {
  //   a.push(0xaaaa);
  // } else {
  //   a.push(0xffff);
  // }

  if (i > 0 && i < 0x20) {
    a.push(0xaaaa);
  } else {
    a.push(0xffff);
  }
}

// for (let i = 0; i < 0x1d; i++) {
//   a.push(0xffff);
// }
a.push(0);
window.a = a;

console.log(`a.length: ${a.length}`);

// posChecksum: 'A002'
// negChecksum: '5000'

// First 4 bytes as 0xff:
// pos: '4AAC'
// neg: 'A556'

// First 4 0xff, rest 0xaa, except last part
// pos: 'F54D'
// neg: 'FAB5'

// Only offset 0x6 to 0xaa
// pos: '9B03'
// neg: '54FF'

// Start with 0xffff. Then rest of 0x40 start is 0xaaaa.
// pos: '9AB8'
// neg: '554A'

window.b = function () {
  let posSum = 0;
  let negSum = 0;

  for (let i = 0; i < 0xffe; i++) {
    const val = a[i];
    posSum += val;
    negSum += ~val;
  }

  return {
    posSum,
    negSum,
  };
};

export { osTicksToCalendarTime };
