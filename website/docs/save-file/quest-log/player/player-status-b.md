---
sidebar_label: Player Status B
---

# Player Status B

This is the content of Player Status B.

#### Notes for 0x028 mDateIpl (name pending):

The default highlighted Quest Log on the file select screen is picked this way:

- From the set which includes Quest Log 1 and any other Quest Logs which pass their checksum test, pick the QuestLog which has the greatest value returned from calculating `timestamp / 40,500,000`.
- In the case of a tie, Quest Log 1 has the highest priority and Quest Log 3 has the lowest priority.

:::info

Quest Logs which fail their checksum test say "This Quest Log is corrupted."

:::
