---
sidebar_label: Player Status B
---

# Player Status B

This is the content of Player Status B.

## 0x028 timestamp (name pending)

Default value: (0 I think; Add here; standardize format)

This value is the number of OSTicks since 2000/01/01 at 00:00 which is a Saturday.

// Put basic converter here; input which you can type a hex value into and hit a button to generate the

OSTicks increase at a rate of exactly 40,500,000 per second. This is exactly 1/12 of the 486 MHz clockrate of the Gekko CPU. It is also exactly 1/4 of 162 MHz. The value 162,000,000 is stored as a word at address 800000f8 and is loaded and right-shifted by 2 frequently during calculations involving the timestamp.

The OS provides an API to transform the timestamp into more understandable data:

// Add header to this table with name? OSCalendarTime and might all be signed?
https://github.com/zeldaret/tp/blob/8c2a3ae7eac3483764ccd42f890a1de9cf768538/include/dolphin/os/OS.h#L78

| Offset | Type | Description      |
| ------ | ---- | ---------------- |
| 0x00   | u32  | seconds          |
| 0x04   | u32  | minutes          |
| 0x08   | u32  | hours            |
| 0x0c   | u32  | day of the month |
| 0x10   | u32  | month            |
| 0x14   | u32  | year             |
| 0x18   | u32  | day of the week  |
| 0x1c   | u32  | day of the year  |
| 0x20   | u32  | milliseconds     |
| 0x24   | u32  | microseconds     |

#### milliseconds

abc

## Temp notes about calculating date stuff from timestamp

// Detailed calculation stuff should probably go on its own page which we link to from here.

// Also should probably make the default table style compact like on the Contents page.

### Day of week

Calculated from the dayOffset relative to year 0 month 0 day 0 which is Jan 1 of what would be year 0000.

We find the first day offset which is a multiple of 7 which is equal to or later than dayOffset.

Then do dayOffset - multipleOfSevenDayOffset + 6.

If the dayOffset - multipleOfSevenDayOffset is -2, then the result is 4 which is a Thursday.

| Value | Day of Week |
| ----- | ----------- |
| 0     | Sunday      |
| 1     | Monday      |
| 2     | Tuesday     |
| 3     | Wednesday   |
| 4     | Thursday    |
| 5     | Friday      |
| 6     | Saturday    |

### Selecting the default Quest Log

The default highlighted Quest Log on the file select screen is picked this way:

- From the set which includes Quest Log 1 and any other Quest Logs which pass their checksum test, pick the QuestLog which is the latest down to the seconds level.
- In the case of a tie, Quest Log 1 has the highest priority and Quest Log 3 has the lowest priority.

:::info

Quest Logs which fail their checksum test say "This Quest Log is corrupted."

:::

### Naming

- The timestamp is passed to `OS::OSTicksToCalendarTime` which is where the term OSTicks comes from.
