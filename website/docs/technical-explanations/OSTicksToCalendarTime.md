# OSTicksToCalendarTime

import Link from '@docusaurus/Link';
import TimestampConverter from '@local/TimestampConverter';

This page explains the calculations behind converting a timestamp such as `00615b390fb0dcef` to something like `2021/06/10 07:48`.

<TimestampConverter sourceName="Timestamp" />

## Introduction

A timestamp is a 64 bit integer which counts the number of OSTicks since 2000/01/01 at 00:00.

OSTicks increase at a rate of exactly 40,500,000 per second. This is 1/12 of the 486 MHz clockrate of the Gekko CPU. It is also 1/4 of 162,000,000, which is an important value stored as a word at address 800000f8. The value at this address is frequently loaded and right-shifted by 2 during calculations involving the timestamp.

The function `OSTicksToCalendarTime` takes 2 parameters:

- The timestamp (something like `00615b390fb0dcef`)
- An `OSCalendarTime` object to write results to.

Time information is generated from the timestamp and written to the `OSCalendarTime` object which has the following structure:

| Offset | Type | Description             |
| ------ | ---- | ----------------------- |
| 0x00   | s32  | seconds                 |
| 0x04   | s32  | minutes                 |
| 0x08   | s32  | hours                   |
| 0x0c   | s32  | day of the month (1-31) |
| 0x10   | s32  | month (0-11)            |
| 0x14   | s32  | year (2000+)            |
| 0x18   | s32  | day of the week (0-6)   |
| 0x1c   | s32  | day of the year (0-365) |
| 0x20   | s32  | milliseconds (0-999)    |
| 0x24   | s32  | microseconds (0-999)    |

### Sample Code and Organization

- All of the sample code on this page is written in JavaScript. The logic behind the conversion component at the top of this page was essentially copy-pasted from here.
- The 'n' characters at the end of the numbers make them BigInts. This is necessary to handle the large numbers we are working with in these calculations. You can ignore them as you read the code.

The following sections will roughly follow the order the calculations actually run in the code.<br/>
Some parts will be simplified or skipped, such as calculations which lead to the same constant every time.

## Fractional Seconds

The first things we determine are the microseconds and milliseconds.

```js
const TICKS_PER_SECOND = 40500000n;
const TICKS_PER_MS = 40500n;

const fractionalSecondTicks = timestamp % TICKS_PER_SECOND;

let microseconds = (fractionalSecondTicks * 8n) / 324n; // divide by 40.5 for microseconds
microseconds = microseconds % 1000n;
// Store microseconds at offset 0x24.

let milliseconds = fractionalSecondTicks / TICKS_PER_MS;
milliseconds = milliseconds % 1000n; // Not strictly necessary, but done nonetheless
// Store milliseconds at offset 0x20.
```

Next, we determine the `dayOffset` which we will pass to `GetDates`.<br/>
The `dayOffset` is how many days after Jan 1, 0000 the day the timestamp refers to is.

Day offset examples:

- Jan 1, 0000 has a day offset of 0.
- Jan 2, 0000 has a day offset of 1.
- Jan 8, 0000 has a day offset of 7.

```js
// ...
const SECONDS_PER_DAY = 86400n; // 60 s/min * 60 min/hr * 24 hr/day
const YEAR_2K_JAN_FIRST_DAY_OFFSET = 730485n; // relative to Jan 1, year 0

const secondTicks = timestamp - fractionalSecondTicks;
const numSeconds = secondTicks / TICKS_PER_SECOND;
const numDays = numSeconds / SECONDS_PER_DAY;

const dayOffset = numDays + YEAR_2K_JAN_FIRST_DAY_OFFSET; // numDays since Jan 1, year 0
// dayOffset is used as a parameter to GetDates
```

### Where does 730,485 come from?

Jan 1, 2000 is 730,485 days after Jan 1, 0000.

The difference between Jan 1, 2000 and Jan 1, 0000 is 2000 years.<br/>
We can approximate how many days this is with following naive calculation:

- If we assume a leap year occurs every 4 years, then every 4 years contains 366 + (365 \* 3) => 1461 days.
- 1461 days/4-year-group \* 500 4-year-groups => 730,500 days which is pretty close to the correct value.

The thing to remember is that leap years only occur on years which are divisible by 100 if they are also divisible by 400.<br/>
The years which we shouldn't have counted are 100, 200, 300, 500, 600, 700, 900, 1000, 1100, 1300, 1400, 1500, 1700, 1800, and 1900 (15 total).

730,500 days - 15 days => 730,485 days which is the day offset of Jan 1, 2000 relative to Jan 1, 0000.<br/>

:::note

Year 0 does not exist for certain calendars, but we treat is as the year before year 1 for the sake of these calculations.

:::

## GetDates

`os::GetDates` is called from within `os::OSTicksToCalendarTime`, and it determines the following:

- day of the week
- year
- day of the year
- month
- day of the month

We pass the function two parameters:

- `dayOffset` (which was calculated above)
- The `OSCalendarTime` object which was passed as the 2nd parameter to `OSTicksToCalendarTime`.

## Day of the Week {#day-of-the-week}

Given that Jan 1, 0000 is a Saturday, we know that any day offset which is divisible by 7 is also a Saturday.

We find the lowest day offset which is a multiple of 7 and is greater than or equal to `dayOffset` parameter. Since that day will always be a Saturday, we can look at the difference between it and `dayOffset` to determine which day ours is.

For example, if the calculated multiple-of-7 day offset (a Saturday) is 2 greater than `dayOffset`, we know that `dayOffset` is a Thursday.

Our final result will be one of the following values:

| Value | Day of Week |
| ----- | ----------- |
| 0     | Sunday      |
| 1     | Monday      |
| 2     | Tuesday     |
| 3     | Wednesday   |
| 4     | Thursday    |
| 5     | Friday      |
| 6     | Saturday    |

Below is an approximation of the calculations which are done to determine which day of the week a given `dayOffset` is.

```js
const MULHW_NEG_3_OVER_7 = -1840700269n;

const dayPlus6 = dayOffset + 6n;

const dayPlus6TimesNeg3Over7 = (MULHW_NEG_3_OVER_7 * dayPlus6) >> 0x20n;
const dayPlus6Times4Over7 = dayPlus6 + dayPlus6TimesNeg3Over7;
const dayPlus6Over7 = dayPlus6Times4Over7 >> 2n;
const nextSeventhDayOffset = dayPlus6Over7 * 7n;

const dayOfWeek = dayPlus6 - nextSeventhDayOffset;
// Store dayOfWeek at offset 0x18.
```

This looks complicated, but it is actually doing something simple in a roundabout way to avoid using costly instructions.

The straightforward way to do the calculation would be as follows:

- (`dayOffset` + 6) / 7 gives 1/7 of (`dayOffset` + 6) truncated.
- Multiply that result by 7.
  - This will always give a multiple of 7 which is at most `dayOffset` + 6 and at least `dayOffset`.
- Compare the product with `dayOffset` to determine the day of the week.

We want to avoid dividing by 7 since it takes significantly more clock cycles than doing a right-shift. To handle the division using a right-shift, we need to convert `dayOffset` to something which we can divide by a power of 2.

We can use 4/7 of (`dayOffset` + 6) then right-shift by 2 to get 1/7. But how do we get four sevenths without dividing by 7? We will get negative three sevenths and add it to (`dayOffset` + 6). But how do we get negative three sevenths without dividing by 7? This is where the `mulhw` assembly instruction comes into play.

The `mulhw` (Multiply High Word) instruction calculates the most significant 32 bits of the 64-bit product of two 32-bit integers. You could think of this as multiplying two 32-bit integers then right-shifting the result by 32. How can we use this instruction to divide by 7?

Right-shifting by 32 is like dividing by 2 to the power of 32 which is 4,294,967,296. We want dividing by 4,294,967,296 to give us -3/7 of a value. We can represent this with the following ratio:

`X/4,294,967,296` is equal to `-3/7`

Solving for X, we get -3 \* 4,294,967,296 / 7 which is -1,840,700,269. This is the constant above which we called MULHW_NEG_3_OVER_7. Now is a good time to review the code block above.

---

Some final notes on calculating the day of the week:

Right-shifting a negative number rounds away from zero. When we add this to a larger positive number, the result will be rounded toward 0. When we right-shift a positive number, the result will also be rounded toward 0.

```js
const dayPlus6TimesNeg3Over7 = (MULHW_NEG_3_OVER_7 * dayPlus6) >> 0x20n;
// ^ rounded away from zero
const dayPlus6Times4Over7 = dayPlus6 + dayPlus6TimesNeg3Over7;
// ^ rounded toward zero
const dayPlus6Over7 = dayPlus6Times4Over7 >> 2n;
// ^ rounded toward zero
const nextSeventhDayOffset = dayPlus6Over7 * 7;
// ^ Will be dayPlus6 at most since dayPlus6Over7 is rounded down.

const dayOfWeek = dayPlus6 - nextSeventhDayOffset;
// ^ result is between 0 and 6 inclusive
```

`nextSeventhDayOffset` will be at most `dayPlus6` and at least `dayPlus6` - 6. This means that the resulting `dayOfWeek` will be at least 0 and at most 6, which lines up with the values we want to return.

Examples:

- If `dayPlus6` is 0 days after a multiple of 7, then it is a Saturday. This means that `dayOffset` is 6 days before a Saturday which is a Sunday which is value 0.
- If `dayPlus6` is 1 day after a multiple of 7, then it is a Sunday. This means that `dayOffset` is 6 days before a Sunday which is a Monday which is value 1.
- If `dayPlus6` is 2 days after a multiple of 7, then it is a Monday. This means that `dayOffset` is 6 days before a Monday which is a Tuesday which is value 2.

As you can see, the difference between `dayPlus6` and `nextSeventhDayOffset` is equal to the value we should return for the day of the week.

## Year and Day of the Year

Determining the year and day of the year is a little more challenging since we need to handle leap years. We can approximate the current year with the following calculations:

`dayOffset` / 365 (truncated)

This counts the number of 365 day periods which fit into `dayOffset`. In reality, the number of years might be less, but it will not be greater. This means we can determine the upper bound for the year.

:::tip

738,316 is the `dayOffset` for June 10, 2021. If we do `738316 / 365` , we get 2022 which is our upper bound.

:::

We can use the folling algorithm to determine the year:

1. The upper bound we just determined is the yearCandidate.
2. Check if the yearCandidate is the correct year after accounting for leap years.
3. If it is not, decrement the yearCandidate by 1 and go back to step 2.

This is pretty straightforward as long as we know how to account for leap years.<br/>
Here are the rules for leap years:

- A year is a leap year if it is a multiple of 4 and it is either not a multiple of 100 or it is a multiple of 400.
- Put differently, every 4th year is a leap year unless the year is divisible by 100 but not 400.

Examples of leap years:

- 0, 4, 8, 104, 732, 1564, 1600, 2000, 2400.

Examples of years which are not leap years:

- 1, 7, 100, 200, 300, 500, 600, 700, 900, 1097, 1883

If the current year is 2000, then 2000 years have completed since year 0 (0, 1, 2 ... 1997, 1998, 1999).

Here are some steps we can use to count the number of those years which were leap years:

- If every 4th year was a leap year, then 500 of those 2000 years are leap years.
- We subtract 1 for every 100 years. 2000 / 100 is 20 which leaves us with 480 leap years.
- We add 1 for every 400 years, so 2000 / 400 is 5 which gives us 485 leap years.
  - (This result is every 4th year as you might expect, but we make sure to not count these 15 years: 100, 200, 300, 500, 600, 700, 900, 1000, 1100, 1300, 1400, 1500, 1700, 1800, and 1900)

So at this point, here is what we have:

- `dayOffset`
- The yearCandidate
- The number of leap days which we need to take into account.

We multiply the yearCandidate by 365 to get what the day offset would be for the yearCandidate if each year was 365 days. We then add our calculated number of leap days to this value to get the true day offset of yearCandidate. We compare the day offset of the yearCandidate with `dayOffset`.

- If the day offset of the yearCandidate is greater than `dayOffset`, then the yearCandidate is too high. We need to decrement it and retry.
- If the day offset of the yearCandidate is less than or equal to `dayOffset`, then yearCandidate is the correct year (meaning `dayOffset` represents a day which fall in that year).

Once we know the correct year, we can subtract its day offset from `dayOffset` to get the day of that year which `dayOffset` falls on. This will be a number with a minimum of 0 for Jan 1 and a maximum of 365 for December 31 on a leap year.

Here is how this might look in code:

```js
const MULHW_NEG_109_OVER_365 = -1282606671n; // 0xb38cf9b1
const MULHW_POINT32 = 1374389535n; // 0x51eb851f

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

const dayOfTheYear = dayOffset - trueDayOffsetOfYear;
// Store year at offset 0x14.
// Store dayOfTheYear at offset 0x1c.
```

Calculations using the MULHW constants are covered in [Day of the Week](#day-of-the-week).

Some of the calculations are done using the previous year because we don't want to count a leap day in the current year. The day offset in the current year will be the same whether it is a leap year or not.

For example, assume the yearCandidate is 100. If we divide 100 by 100, we get 1. This would indicate that we counted an extra leap day when we shouldn't have, but this is not the case since we are leaving the current year (year 100) out of the calculations. This problem goes away if we subtract 1 before doing the calculations which divide by 100 and 400.

Similarly, we add 3 before calculating the number of leap years we have assuming every 4th year is a leap year. This is to handle the edge case for years near 0. If the current year is 2, then 2 / 4 is 0. This fails to account for year 0 being a leap year. If we add 3 first, then 5 / 4 gives 1 which correctly accounts for year 0.

## Month and Day of the Month

The month and day of the month are both determined from the day of the year.

First we want to find which month the day of the year is in. Once we know the month, we can subtract the day offset of the month from the day of the year to get the day offset within that month.

Note that each month only has 2 possible day offsets depending on if the year is a leap year or not.

**Day Offset of Each Month**

| Month | Not a Leap Year | Leap Year |
| ----- | --------------- | --------- |
| 0     | 0x000           | 0x000     |
| 1     | 0x01f           | 0x01f     |
| 2     | 0x03b           | 0x03c     |
| 3     | 0x05a           | 0x05b     |
| 4     | 0x078           | 0x079     |
| 5     | 0x097           | 0x098     |
| 6     | 0x0b5           | 0x0b6     |
| 7     | 0x0d4           | 0x0d5     |
| 8     | 0x0f3           | 0x0f4     |
| 9     | 0x111           | 0x112     |
| 10    | 0x130           | 0x131     |
| 11    | 0x14e           | 0x14f     |

:::info

These values are stored in 2 back-to-back arrays which are each 12 words long at address 803d1048 (US GC).

:::

Here is the algorithm we will use to determine the current month:

1. Determine if the year is a leap year or not.
2. Using the correct `DayOffsetOfMonths` array based on step 1, iterate through it backwards until we reach a month which has a day offset less than or equal to our dayOfTheYear. The array index at which this check passes is the month (0 to 11).
3. Subtract the day offset of that month from our `dayOfTheYear` to get the `dayOfTheMonth`.

:::tip

The month will be between 0 for January and 11 for December.<br/>
The day of the month will be between 1 and 31.

:::

Here is how `month` and `dayOfTheMonth` are determined:

```js
const MULHW_POINT32 = 1374389535n; // 0x51eb851f
const monthDayOffsetsNonLeap = [...]; // static
const monthDayOffsetsLeap = [...]; // static

let isLeapYear = true;
let skip400YearCheck = false;

const yearOver4 = year >> 2n;
const prevMultipleOf4Year = yearOver4 * 4n;

if (prevMultipleOf4Year === year) {
  const yearTimesPoint32 = (prevYear * MULHW_POINT32) >> 0x20n;
  const yearOver100 = yearTimesPoint32 >> 5n; // divide by 32
  const prevHundredsYear = yearOver100 * 100n;

  if (prevHundredsYear !== year) {
    // year is divisible by 4 but not 100, so guaranteed to be a leap year
    skip400YearCheck = true;
  }
}

if (!skip400YearCheck) {
  const yearTimesPoint32 = (prevYear * MULHW_POINT32) >> 0x20n;
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

// Store month (between 0 and 11 inclusive) at offset 0x10.

const monthDayOffset = monthDayOffsets[month];
const dayOffsetOfTheMonth = dayOfTheYear - monthDayOffset;
const dayOfTheMonth = dayOffsetOfTheMonth + 1;
// Store dayOfTheMonth (between 1 and 31) at offset 0xc.
```

Calculations using the MULHW constants are covered in [Day of the Week](#day-of-the-week).

This ends the `os::GetDates` function which determined the following:

- day of the week
- year
- day of the year
- month
- day of the month

## Hours, Minutes, Seconds

These ones should be pretty straightforward at this point. Once again, calculations using the MULHW constants are covered in [Day of the Week](#day-of-the-week).

We are back in the `OSTicksToCalendarTime` function after finishing `GetDates`.

```js
const TICKS_PER_SECOND = 40500000n;
const SECONDS_PER_DAY = 86400n; // 60 s/min * 60 min/hr * 24 hr/day
const MULHW_NEG_28_OVER_60 = -2004318071n; // 0x88888889

const fractionalSecondTicks = timestamp % TICKS_PER_SECOND;
const secondTicks = timestamp - fractionalSecondTicks;
const numSeconds = secondTicks / TICKS_PER_SECOND;
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

// Store hours (0-23) at offset 0x8.

const secondsFromMinutes = minutesOfDay * 60n;

const minutes = minutesOfDay - minutesFromHours;
// Store minutes (0-59) at offset 0x4.

const seconds = secondsOfDay - secondsFromMinutes;
// Store seconds (0-59) at offset 0x0.
```

## Closing Thoughts

On this page, we didn't go over what happens when the sign bit gets set. From my testing, this function doesn't really handle it that well.

In any case, the sign bit won't get set until sometime in the year 9216. Going into any more detail would clutter the page and provide no practical value.

_(Have higher priority things to work on so we only cover the happy path here which is thankfully good enough for the next 7000+ years. - isaac)_

## Naming

- OSTicks comes from the function name.
- OSCalendarTime comes from the Referenced decomp page, and it is also supported by the function name.

## References

- <Link to="https://github.com/zeldaret/tp/blob/8c2a3ae7eac3483764ccd42f890a1de9cf768538/include/dolphin/os/OS.h#L78">
    TP decomp - OSCalendarTime struct
  </Link>
