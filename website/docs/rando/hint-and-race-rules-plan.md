# Hints and Race Rules Plan

This document details the approach I (isaac) would like to eventually implement for discovering hints as you progress in the seed (as opposed to getting them all at the start, which is an equally valid approach, though not as interesting imo).

I have been refining the hint logic and a race ruleset over the course of playtesting around 40 seeds so far, and I am fairly close to having it be something I am fully happy with, but it is not quite there yet.
So the final product would be slightly different, but it should be mostly the same.

I am not going to go into detail about all of the logical implementation details since this is not the place for it (for example, a Path hint's check will not also be targetted by a Location hint).
If you are already familiar with those concepts, the behavior should match what you expect.

## Problems with current race rules

You can skip this section if you aren't interesting in races.

Just pointing out some problems I see here. Ideas on solving some of these problems will be at the end of the document.

- Current races are too long.
  The average time of seeds needs to be lower than you would think if you are a skilled runner.
  When a person's first experience is 5+ hours, they are not very likely to want to join again.
- Races should be short enough to where people can throw them together impulsively on a weekday.
  Having them be large time commitments that you have to schedule on a weekly basis at the most is anti-growth.
  I think Wind Waker Rando people are handling this correctly and we are not.
  It seems significantly easier to get into that game imo.
- You almost always have to do all of Lake Lantern Cave and the Desert in every seed (mainly talking about the desert here though).
  It is difficult to finish a seed and say "Let's do another one!" when you know you are going to have to spend 10 minutes straight running across the desert again.
  I can't stress enough how boring this is to me.
- Making it difficult to enter dungeons + big keys in their own dungeon causes the last hour or more of seeds to frequently just be going through motions (CitS with 3 chars for example).
  This gets old very very fast.
  Going through motions is why everyone eventually agreed that excluding Hyrule Castle was the way to go.
  This and the desert are the main reason I can't play FCS.

There are plenty of problems with what I was doing as well (and some of the above also applies), but I don't want to take up a bunch of room up here.
You can see what I currently think works well when I go over the ruleset idea I am working on at the end of the document.

## Grouping checks for hints

### HintZone

- The world is broken up into a list of "HintZone".
- Each zone has a name and represents a list of checks (for example, "Kakariko Village").
- Each check belongs to exactly one HintZone.

Here is how I am currently breaking this up (a compromise between what I previously had and what the French Community used, trying to keep the best of both in order to produce something intuitive. Hopefully we can eventually agree on something.):

:::note
Post-dungeon checks could potentially change at some point, but right now they are all located based on where the check is located (Kakariko Village, Death Moutain, Snowpeak, Castle Town, Hidden Village).
:::

- Ordon
- Sacred Grove (SG)
- Faron Field (FF)
- Faron Woods (FW)
- Kakariko Gorge (KG)
- Kakariko Village (KV)
- Kakariko Graveyard (KGY)
- Eldin Field (EF)
- NE Hyrule Field (NEHF)
  - The split between NEHF and EF is the middle of the Bridge of Eldin.
    Using "NE" instead of "Northeast" because it is a unique shape compared to other zones and your brain should be able to recognize more quickly.
    Also it is fewer characters.
- Death Mountain (DMT)
  - I think DMT is for "Death Mountain Trail", but it kind of works similar to SPR and LBT and that is what I see people use.
- Hidden Village (HV)
- Lanayru Field (LF)
- West of Castle Town (WoCT)
- South of Castle Town (SoCT)
  - I prefer this because "WoCT" and "SoCT" roll of the tongue in a manner similar to "WotH" for Way of the Hero (as compared to OWCT for Outside West Castle Town and OSCT which have no good way of reading them out loud).
  - The other thing I don't like about "Outside West Castle Town" and "Outside South Castle Town" is that those look exactly the same at a quick glance (especially when you are trying to go fast), so it is easy to have your brain autocomplete the wrong thing and there goes your race.
    People misreading hints and ruining their race is something I have seen multiple times even though I haven't been watching races for that long.
    Or if you are not racing, you just end up not having fun.
- Castle Town (CT)
- Agitha
- Great Bridge of Hylia (GBoH)
- Lake Hylia (LH)
- Lake Lantern Cave (LLC)
- Lanayru Spring (LS)
- Zora's Domain (ZD)
- Upper Zora's River (UZR)
- Gerudo Desert (GD)
- Bulblin Camp (BC)
- Snowpeak
- Golden Wolf (GW)
  - The checks are all named "Golden Wolf", so I think this is probably a better name than something like "Hero's Shade".
  - Additionally, you get all of the checks at the Golden Wolf locations rather than doing anything involving the humanoid Hero's Shade.
- Cave of Ordeals (CoO)
- Long Minigames (LMG)
  - Plumm, Iza 1&2, and Springwater Rush.
    An intuitive placement for these checks does not exist.
    Whatever you think is intuitive is not the same as what someone else thinks is intuitive.
    Since these checks will probably be "Always" hints regardless of the ruleset, the exact zone is not super important.
    But I propose we all agree they are (1) completely unlike the other checks while (2) being very similar to each other and put them in their own zone.
- Forest Temple (FT)
- Goron Mines (GM)
- Lakebed Temple (LBT)
- Arbiter's Grounds (AG)
- Snowpeak Ruins (SPR)
- Temple of Time (ToT)
- City in the Sky (CitS)
- Palace of Twilight (PoT)
- Hyrule Castle (HC)

Here is the full list:

```
{
  "Ordon": [
    "Herding Goats Reward",
    "Links Basement Chest",
    "Ordon Cat Rescue",
    "Ordon Ranch Grotto Lantern Chest",
    "Ordon Shield",
    "Ordon Sword",
    "Sera Shop Slingshot",
    "Uli Cradle Delivery",
    "Wooden Sword Chest",
    "Wrestling With Bo"
  ],
  "Sacred Grove": [
    "Lost Woods Boulder Poe",
    "Lost Woods Lantern Chest",
    "Lost Woods Waterfall Poe",
    "Sacred Grove Baba Serpent Grotto Chest",
    "Sacred Grove Female Snail",
    "Sacred Grove Male Snail",
    "Sacred Grove Master Sword Poe",
    "Sacred Grove Past Owl Statue Chest",
    "Sacred Grove Spinner Chest",
    "Sacred Grove Temple of Time Owl Statue Poe"
  ],
  "Faron Field": [
    "Faron Field Bridge Chest",
    "Faron Field Corner Grotto Left Chest",
    "Faron Field Corner Grotto Rear Chest",
    "Faron Field Corner Grotto Right Chest",
    "Faron Field Female Beetle",
    "Faron Field Male Beetle",
    "Faron Field Poe",
    "Faron Field Tree Heart Piece"
  ],
  "Faron Woods": [
    "Coro Bottle",
    "Faron Mist Cave Lantern Chest",
    "Faron Mist Cave Open Chest",
    "Faron Mist North Chest",
    "Faron Mist Poe",
    "Faron Mist South Chest",
    "Faron Mist Stump Chest",
    "Faron Woods Owl Statue Chest",
    "Faron Woods Owl Statue Sky Character",
    "North Faron Woods Deku Baba Chest",
    "South Faron Cave Chest"
  ],
  "Kakariko Gorge": [
    "Eldin Lantern Cave First Chest",
    "Eldin Lantern Cave Lantern Chest",
    "Eldin Lantern Cave Poe",
    "Eldin Lantern Cave Second Chest",
    "Kakariko Gorge Double Clawshot Chest",
    "Kakariko Gorge Female Pill Bug",
    "Kakariko Gorge Male Pill Bug",
    "Kakariko Gorge Owl Statue Chest",
    "Kakariko Gorge Owl Statue Sky Character",
    "Kakariko Gorge Poe",
    "Kakariko Gorge Spire Heart Piece"
  ],
  "Kakariko Village": [
    "Barnes Bomb Bag",
    "Eldin Spring Underwater Chest",
    "Ilia Memory Reward",
    "Kakariko Inn Chest",
    "Kakariko Village Bomb Rock Spire Heart Piece",
    "Kakariko Village Bomb Shop Poe",
    "Kakariko Village Female Ant",
    "Kakariko Village Malo Mart Hawkeye",
    "Kakariko Village Malo Mart Hylian Shield",
    "Kakariko Village Watchtower Poe",
    "Kakariko Watchtower Alcove Chest",
    "Kakariko Watchtower Chest",
    "Renados Letter",
    "Talo Sharpshooting"
  ],
  "Kakariko Graveyard": [
    "Gift From Ralis",
    "Kakariko Graveyard Grave Poe",
    "Kakariko Graveyard Lantern Chest",
    "Kakariko Graveyard Male Ant",
    "Kakariko Graveyard Open Poe",
    "Rutelas Blessing"
  ],
  "Eldin Field": [
    "Bridge of Eldin Male Phasmid",
    "Bridge of Eldin Owl Statue Chest",
    "Eldin Field Bomb Rock Chest",
    "Eldin Field Bomskit Grotto Lantern Chest",
    "Eldin Field Bomskit Grotto Left Chest",
    "Eldin Field Female Grasshopper",
    "Eldin Field Male Grasshopper",
    "Eldin Field Water Bomb Fish Grotto Chest"
  ],
  "NE Hyrule Field": [
    "Bridge of Eldin Female Phasmid",
    "Bridge of Eldin Owl Statue Sky Character",
    "Eldin Field Stalfos Grotto Left Small Chest",
    "Eldin Field Stalfos Grotto Right Small Chest",
    "Eldin Field Stalfos Grotto Stalfos Chest",
    "Eldin Stockcave Lantern Chest",
    "Eldin Stockcave Lowest Chest",
    "Eldin Stockcave Upper Chest"
  ],
  "Death Mountain": ["Death Mountain Alcove Chest", "Death Mountain Trail Poe"],
  "Hidden Village": [
    "Cats Hide and Seek Minigame",
    "Hidden Village Poe",
    "Ilia Charm",
    "Skybook From Impaz"
  ],
  "Lanayru Field": [
    "Lanayru Field Behind Gate Underwater Chest",
    "Lanayru Field Bridge Poe",
    "Lanayru Field Female Stag Beetle",
    "Lanayru Field Male Stag Beetle",
    "Lanayru Field Poe Grotto Left Poe",
    "Lanayru Field Poe Grotto Right Poe",
    "Lanayru Field Skulltula Grotto Chest",
    "Lanayru Field Spinner Track Chest",
    "Lanayru Ice Block Puzzle Cave Chest"
  ],
  "West of Castle Town": [
    "Hyrule Field Amphitheater Owl Statue Chest",
    "Hyrule Field Amphitheater Owl Statue Sky Character",
    "Hyrule Field Amphitheater Poe",
    "West Hyrule Field Female Butterfly",
    "West Hyrule Field Helmasaur Grotto Chest",
    "West Hyrule Field Male Butterfly"
  ],
  "South of Castle Town": [
    "Outside South Castle Town Double Clawshot Chasm Chest",
    "Outside South Castle Town Female Ladybug",
    "Outside South Castle Town Fountain Chest",
    "Outside South Castle Town Male Ladybug",
    "Outside South Castle Town Poe",
    "Outside South Castle Town Tektite Grotto Chest",
    "Outside South Castle Town Tightrope Chest",
    "Wooden Statue"
  ],
  "Castle Town": [
    "Castle Town Malo Mart Magic Armor",
    "Charlo Donation Blessing",
    "Doctors Office Balcony Chest",
    "East Castle Town Bridge Poe",
    "Jovani 20 Poe Soul Reward",
    "Jovani 60 Poe Soul Reward",
    "Jovani House Poe",
    "STAR Prize 1",
    "STAR Prize 2",
    "Telma Invoice"
  ],
  "Agitha": [
    "Agitha Female Ant Reward",
    "Agitha Female Beetle Reward",
    "Agitha Female Butterfly Reward",
    "Agitha Female Dayfly Reward",
    "Agitha Female Dragonfly Reward",
    "Agitha Female Grasshopper Reward",
    "Agitha Female Ladybug Reward",
    "Agitha Female Mantis Reward",
    "Agitha Female Phasmid Reward",
    "Agitha Female Pill Bug Reward",
    "Agitha Female Snail Reward",
    "Agitha Female Stag Beetle Reward",
    "Agitha Male Ant Reward",
    "Agitha Male Beetle Reward",
    "Agitha Male Butterfly Reward",
    "Agitha Male Dayfly Reward",
    "Agitha Male Dragonfly Reward",
    "Agitha Male Grasshopper Reward",
    "Agitha Male Ladybug Reward",
    "Agitha Male Mantis Reward",
    "Agitha Male Phasmid Reward",
    "Agitha Male Pill Bug Reward",
    "Agitha Male Snail Reward",
    "Agitha Male Stag Beetle Reward"
  ],
  "Great Bridge of Hylia": [
    "Lake Hylia Bridge Bubble Grotto Chest",
    "Lake Hylia Bridge Cliff Chest",
    "Lake Hylia Bridge Cliff Poe",
    "Lake Hylia Bridge Female Mantis",
    "Lake Hylia Bridge Male Mantis",
    "Lake Hylia Bridge Owl Statue Chest",
    "Lake Hylia Bridge Owl Statue Sky Character",
    "Lake Hylia Bridge Vines Chest"
  ],
  "Lake Hylia": [
    "Auru Gift To Fyer",
    "Flight By Fowl Fifth Platform Chest",
    "Flight By Fowl Fourth Platform Chest",
    "Flight By Fowl Ledge Poe",
    "Flight By Fowl Second Platform Chest",
    "Flight By Fowl Third Platform Chest",
    "Flight By Fowl Top Platform Reward",
    "Isle of Riches Poe",
    "Lake Hylia Alcove Poe",
    "Lake Hylia Dock Poe",
    "Lake Hylia Shell Blade Grotto Chest",
    "Lake Hylia Tower Poe",
    "Lake Hylia Underwater Chest",
    "Lake Hylia Water Toadpoli Grotto Chest",
    "Outside Lanayru Spring Left Statue Chest",
    "Outside Lanayru Spring Right Statue Chest"
  ],
  "Lake Lantern Cave": [
    "Lake Lantern Cave Eighth Chest",
    "Lake Lantern Cave Eleventh Chest",
    "Lake Lantern Cave End Lantern Chest",
    "Lake Lantern Cave Fifth Chest",
    "Lake Lantern Cave Final Poe",
    "Lake Lantern Cave First Chest",
    "Lake Lantern Cave First Poe",
    "Lake Lantern Cave Fourteenth Chest",
    "Lake Lantern Cave Fourth Chest",
    "Lake Lantern Cave Ninth Chest",
    "Lake Lantern Cave Second Chest",
    "Lake Lantern Cave Second Poe",
    "Lake Lantern Cave Seventh Chest",
    "Lake Lantern Cave Sixth Chest",
    "Lake Lantern Cave Tenth Chest",
    "Lake Lantern Cave Third Chest",
    "Lake Lantern Cave Thirteenth Chest",
    "Lake Lantern Cave Twelfth Chest"
  ],
  "Lanayru Spring": [
    "Lanayru Spring Back Room Lantern Chest",
    "Lanayru Spring Back Room Left Chest",
    "Lanayru Spring Back Room Right Chest",
    "Lanayru Spring East Double Clawshot Chest",
    "Lanayru Spring Underwater Left Chest",
    "Lanayru Spring Underwater Right Chest",
    "Lanayru Spring West Double Clawshot Chest"
  ],
  "Zora's Domain": [
    "Zoras Domain Chest Behind Waterfall",
    "Zoras Domain Chest By Mother and Child Isles",
    "Zoras Domain Extinguish All Torches Chest",
    "Zoras Domain Light All Torches Chest",
    "Zoras Domain Male Dragonfly",
    "Zoras Domain Mother and Child Isle Poe",
    "Zoras Domain Underwater Goron",
    "Zoras Domain Waterfall Poe"
  ],
  "Upper Zora's River": [
    "Fishing Hole Bottle",
    "Fishing Hole Heart Piece",
    "Upper Zoras River Female Dragonfly",
    "Upper Zoras River Poe"
  ],
  "Gerudo Desert": [
    "Gerudo Desert Campfire East Chest",
    "Gerudo Desert Campfire North Chest",
    "Gerudo Desert Campfire West Chest",
    "Gerudo Desert East Canyon Chest",
    "Gerudo Desert East Poe",
    "Gerudo Desert Female Dayfly",
    "Gerudo Desert Lone Small Chest",
    "Gerudo Desert Male Dayfly",
    "Gerudo Desert North Peahat Poe",
    "Gerudo Desert North Small Chest Before Bulblin Camp",
    "Gerudo Desert Northeast Chest Behind Gates",
    "Gerudo Desert Northwest Chest Behind Gates",
    "Gerudo Desert Owl Statue Chest",
    "Gerudo Desert Owl Statue Sky Character",
    "Gerudo Desert Peahat Ledge Chest",
    "Gerudo Desert Poe Above Cave of Ordeals",
    "Gerudo Desert Rock Grotto First Poe",
    "Gerudo Desert Rock Grotto Lantern Chest",
    "Gerudo Desert Rock Grotto Second Poe",
    "Gerudo Desert Skulltula Grotto Chest",
    "Gerudo Desert South Chest Behind Wooden Gates",
    "Gerudo Desert West Canyon Chest"
  ],
  "Bulblin Camp": [
    "Bulblin Camp First Chest Under Tower At Entrance",
    "Bulblin Camp Poe",
    "Bulblin Camp Roasted Boar",
    "Bulblin Camp Small Chest in Back of Camp",
    "Bulblin Guard Key",
    "Outside Arbiters Grounds Lantern Chest",
    "Outside Arbiters Grounds Poe",
    "Outside Bulblin Camp Poe"
  ],
  "Snowpeak": [
    "Ashei Sketch",
    "Snowboard Racing Prize",
    "Snowpeak Above Freezard Grotto Poe",
    "Snowpeak Blizzard Poe",
    "Snowpeak Cave Ice Lantern Chest",
    "Snowpeak Cave Ice Poe",
    "Snowpeak Freezard Grotto Chest",
    "Snowpeak Icy Summit Poe",
    "Snowpeak Poe Among Trees"
  ],
  "Golden Wolf": [
    "Faron Woods Golden Wolf",
    "Gerudo Desert Golden Wolf",
    "Kakariko Graveyard Golden Wolf",
    "North Castle Town Golden Wolf",
    "Ordon Spring Golden Wolf",
    "Outside South Castle Town Golden Wolf",
    "West Hyrule Field Golden Wolf"
  ],
  "Cave of Ordeals": [
    "Cave of Ordeals Floor 17 Poe",
    "Cave of Ordeals Floor 33 Poe",
    "Cave of Ordeals Floor 44 Poe",
    "Cave of Ordeals Great Fairy Reward"
  ],
  "Long Minigames": [
    "Goron Springwater Rush",
    "Iza Helping Hand",
    "Iza Raging Rapids Minigame",
    "Plumm Fruit Balloon Minigame"
  ],
  "Forest Temple": [
    "Forest Temple Big Baba Key",
    "Forest Temple Big Key Chest",
    "Forest Temple Central Chest Behind Stairs",
    "Forest Temple Central Chest Hanging From Web",
    "Forest Temple Central North Chest",
    "Forest Temple Diababa Heart Container",
    "Forest Temple Dungeon Reward",
    "Forest Temple East Tile Worm Chest",
    "Forest Temple East Water Cave Chest",
    "Forest Temple Entrance Vines Chest",
    "Forest Temple Gale Boomerang",
    "Forest Temple North Deku Like Chest",
    "Forest Temple Second Monkey Under Bridge Chest",
    "Forest Temple Totem Pole Chest",
    "Forest Temple West Deku Like Chest",
    "Forest Temple West Tile Worm Chest Behind Stairs",
    "Forest Temple West Tile Worm Room Vines Chest",
    "Forest Temple Windless Bridge Chest"
  ],
  "Goron Mines": [
    "Goron Mines After Crystal Switch Room Magnet Wall Chest",
    "Goron Mines Beamos Room Chest",
    "Goron Mines Chest Before Dangoro",
    "Goron Mines Crystal Switch Room Small Chest",
    "Goron Mines Crystal Switch Room Underwater Chest",
    "Goron Mines Dangoro Chest",
    "Goron Mines Dungeon Reward",
    "Goron Mines Entrance Chest",
    "Goron Mines Fyrus Heart Container",
    "Goron Mines Gor Amato Chest",
    "Goron Mines Gor Amato Key Shard",
    "Goron Mines Gor Amato Small Chest",
    "Goron Mines Gor Ebizo Chest",
    "Goron Mines Gor Ebizo Key Shard",
    "Goron Mines Gor Liggs Chest",
    "Goron Mines Gor Liggs Key Shard",
    "Goron Mines Magnet Maze Chest",
    "Goron Mines Main Magnet Room Bottom Chest",
    "Goron Mines Main Magnet Room Top Chest",
    "Goron Mines Outside Beamos Chest",
    "Goron Mines Outside Clawshot Chest",
    "Goron Mines Outside Underwater Chest"
  ],
  "Lakebed Temple": [
    "Lakebed Temple Before Deku Toad Alcove Chest",
    "Lakebed Temple Before Deku Toad Underwater Left Chest",
    "Lakebed Temple Before Deku Toad Underwater Right Chest",
    "Lakebed Temple Big Key Chest",
    "Lakebed Temple Central Room Chest",
    "Lakebed Temple Central Room Small Chest",
    "Lakebed Temple Central Room Spire Chest",
    "Lakebed Temple Chandelier Chest",
    "Lakebed Temple Deku Toad Chest",
    "Lakebed Temple Dungeon Reward",
    "Lakebed Temple East Lower Waterwheel Bridge Chest",
    "Lakebed Temple East Lower Waterwheel Stalactite Chest",
    "Lakebed Temple East Second Floor Southeast Chest",
    "Lakebed Temple East Second Floor Southwest Chest",
    "Lakebed Temple East Water Supply Clawshot Chest",
    "Lakebed Temple East Water Supply Small Chest",
    "Lakebed Temple Lobby Left Chest",
    "Lakebed Temple Lobby Rear Chest",
    "Lakebed Temple Morpheel Heart Container",
    "Lakebed Temple Stalactite Room Chest",
    "Lakebed Temple Underwater Maze Small Chest",
    "Lakebed Temple West Lower Small Chest",
    "Lakebed Temple West Second Floor Central Small Chest",
    "Lakebed Temple West Second Floor Northeast Chest",
    "Lakebed Temple West Second Floor Southeast Chest",
    "Lakebed Temple West Second Floor Southwest Underwater Chest",
    "Lakebed Temple West Water Supply Chest",
    "Lakebed Temple West Water Supply Small Chest"
  ],
  "Arbiter's Grounds": [
    "Arbiters Grounds Big Key Chest",
    "Arbiters Grounds Death Sword Chest",
    "Arbiters Grounds East Lower Turnable Redead Chest",
    "Arbiters Grounds East Turning Room Poe",
    "Arbiters Grounds East Upper Turnable Chest",
    "Arbiters Grounds East Upper Turnable Redead Chest",
    "Arbiters Grounds Entrance Chest",
    "Arbiters Grounds Ghoul Rat Room Chest",
    "Arbiters Grounds Hidden Wall Poe",
    "Arbiters Grounds North Turning Room Chest",
    "Arbiters Grounds Spinner Room First Small Chest",
    "Arbiters Grounds Spinner Room Lower Central Small Chest",
    "Arbiters Grounds Spinner Room Lower North Chest",
    "Arbiters Grounds Spinner Room Second Small Chest",
    "Arbiters Grounds Spinner Room Stalfos Alcove Chest",
    "Arbiters Grounds Stallord Heart Container",
    "Arbiters Grounds Torch Room East Chest",
    "Arbiters Grounds Torch Room Poe",
    "Arbiters Grounds Torch Room West Chest",
    "Arbiters Grounds West Chandelier Chest",
    "Arbiters Grounds West Poe",
    "Arbiters Grounds West Small Chest Behind Block",
    "Arbiters Grounds West Stalfos Northeast Chest",
    "Arbiters Grounds West Stalfos West Chest"
  ],
  "Snowpeak Ruins": [
    "Snowpeak Ruins Ball and Chain",
    "Snowpeak Ruins Blizzeta Heart Container",
    "Snowpeak Ruins Broken Floor Chest",
    "Snowpeak Ruins Chapel Chest",
    "Snowpeak Ruins Chest After Darkhammer",
    "Snowpeak Ruins Courtyard Central Chest",
    "Snowpeak Ruins Dungeon Reward",
    "Snowpeak Ruins East Courtyard Buried Chest",
    "Snowpeak Ruins East Courtyard Chest",
    "Snowpeak Ruins Ice Room Poe",
    "Snowpeak Ruins Lobby Armor Poe",
    "Snowpeak Ruins Lobby Chandelier Chest",
    "Snowpeak Ruins Lobby East Armor Chest",
    "Snowpeak Ruins Lobby Poe",
    "Snowpeak Ruins Lobby West Armor Chest",
    "Snowpeak Ruins Mansion Map",
    "Snowpeak Ruins Northeast Chandelier Chest",
    "Snowpeak Ruins Ordon Pumpkin Chest",
    "Snowpeak Ruins West Cannon Room Central Chest",
    "Snowpeak Ruins West Cannon Room Corner Chest",
    "Snowpeak Ruins West Courtyard Buried Chest",
    "Snowpeak Ruins Wooden Beam Central Chest",
    "Snowpeak Ruins Wooden Beam Chandelier Chest",
    "Snowpeak Ruins Wooden Beam Northwest Chest"
  ],
  "Temple of Time": [
    "Temple of Time Armogohma Heart Container",
    "Temple of Time Armos Antechamber East Chest",
    "Temple of Time Armos Antechamber North Chest",
    "Temple of Time Armos Antechamber Statue Chest",
    "Temple of Time Big Key Chest",
    "Temple of Time Chest Before Darknut",
    "Temple of Time Darknut Chest",
    "Temple of Time Dungeon Reward",
    "Temple of Time First Staircase Armos Chest",
    "Temple of Time First Staircase Gohma Gate Chest",
    "Temple of Time First Staircase Window Chest",
    "Temple of Time Floor Switch Puzzle Room Upper Chest",
    "Temple of Time Gilloutine Chest",
    "Temple of Time Lobby Lantern Chest",
    "Temple of Time Moving Wall Beamos Room Chest",
    "Temple of Time Moving Wall Dinalfos Room Chest",
    "Temple of Time Poe Above Scales",
    "Temple of Time Poe Behind Gate",
    "Temple of Time Scales Gohma Chest",
    "Temple of Time Scales Upper Chest"
  ],
  "City in the Sky": [
    "City in The Sky Aeralfos Chest",
    "City in The Sky Argorok Heart Container",
    "City in The Sky Baba Tower Alcove Chest",
    "City in The Sky Baba Tower Narrow Ledge Chest",
    "City in The Sky Baba Tower Top Small Chest",
    "City in The Sky Big Key Chest",
    "City in The Sky Central Outside Ledge Chest",
    "City in The Sky Central Outside Poe Island Chest",
    "City in The Sky Chest Behind North Fan",
    "City in The Sky Chest Below Big Key Chest",
    "City in The Sky Dungeon Reward",
    "City in The Sky East First Wing Chest After Fans",
    "City in The Sky East Tile Worm Small Chest",
    "City in The Sky East Wing After Dinalfos Alcove Chest",
    "City in The Sky East Wing After Dinalfos Ledge Chest",
    "City in The Sky East Wing Lower Level Chest",
    "City in The Sky Garden Island Poe",
    "City in The Sky Poe Above Central Fan",
    "City in The Sky Underwater East Chest",
    "City in The Sky Underwater West Chest",
    "City in The Sky West Garden Corner Chest",
    "City in The Sky West Garden Ledge Chest",
    "City in The Sky West Garden Lone Island Chest",
    "City in The Sky West Garden Lower Chest",
    "City in The Sky West Wing Baba Balcony Chest",
    "City in The Sky West Wing First Chest",
    "City in The Sky West Wing Narrow Ledge Chest",
    "City in The Sky West Wing Tile Worm Chest"
  ],
  "Palace of Twilight": [
    "Palace of Twilight Big Key Chest",
    "Palace of Twilight Central First Room Chest",
    "Palace of Twilight Central Outdoor Chest",
    "Palace of Twilight Central Tower Chest",
    "Palace of Twilight Collect Both Sols",
    "Palace of Twilight East Wing First Room East Alcove",
    "Palace of Twilight East Wing First Room North Small Chest",
    "Palace of Twilight East Wing First Room West Alcove",
    "Palace of Twilight East Wing First Room Zant Head Chest",
    "Palace of Twilight East Wing Second Room Northeast Chest",
    "Palace of Twilight East Wing Second Room Northwest Chest",
    "Palace of Twilight East Wing Second Room Southeast Chest",
    "Palace of Twilight East Wing Second Room Southwest Chest",
    "Palace of Twilight West Wing Chest Behind Wall of Darkness",
    "Palace of Twilight West Wing First Room Central Chest",
    "Palace of Twilight West Wing Second Room Central Chest",
    "Palace of Twilight West Wing Second Room Lower South Chest",
    "Palace of Twilight West Wing Second Room Southeast Chest",
    "Palace of Twilight Zant Heart Container"
  ],
  "Hyrule Castle": [
    "Hyrule Castle Big Key Chest",
    "Hyrule Castle East Wing Balcony Chest",
    "Hyrule Castle East Wing Boomerang Puzzle Chest",
    "Hyrule Castle Graveyard Grave Switch Room Back Left Chest",
    "Hyrule Castle Graveyard Grave Switch Room Front Left Chest",
    "Hyrule Castle Graveyard Grave Switch Room Right Chest",
    "Hyrule Castle Graveyard Owl Statue Chest",
    "Hyrule Castle King Bulblin Key",
    "Hyrule Castle Lantern Staircase Chest",
    "Hyrule Castle Main Hall Northeast Chest",
    "Hyrule Castle Main Hall Northwest Chest",
    "Hyrule Castle Main Hall Southwest Chest",
    "Hyrule Castle Southeast Balcony Tower Chest",
    "Hyrule Castle Treasure Room Eighth Small Chest",
    "Hyrule Castle Treasure Room Fifth Chest",
    "Hyrule Castle Treasure Room Fifth Small Chest",
    "Hyrule Castle Treasure Room First Chest",
    "Hyrule Castle Treasure Room First Small Chest",
    "Hyrule Castle Treasure Room Fourth Chest",
    "Hyrule Castle Treasure Room Fourth Small Chest",
    "Hyrule Castle Treasure Room Second Chest",
    "Hyrule Castle Treasure Room Second Small Chest",
    "Hyrule Castle Treasure Room Seventh Small Chest",
    "Hyrule Castle Treasure Room Sixth Small Chest",
    "Hyrule Castle Treasure Room Third Chest",
    "Hyrule Castle Treasure Room Third Small Chest",
    "Hyrule Castle West Courtyard Central Small Chest",
    "Hyrule Castle West Courtyard North Small Chest"
  ]
}
```

### HintProvince

Each HintZone belongs to exactly one "HintProvince".

- Ordona Province
  - Ordon
- Faron Province
  - Faron Woods
  - Faron Field
  - Sacred Grove
- Eldin Province
  - Kakariko Gorge
  - Kakariko Village
  - Kakariko Graveyard
  - Eldin Field
  - NE Hyrule Field
  - Death Mountain
  - Hidden Village
- Lanayru Province
  - Great Bridge of Hylia
  - Lanayru Field
  - West of Castle Town
  - South of Castle Town
  - Castle Town
  - Lake Hylia
  - Lake Lantern Cave
  - Lanayru Spring
  - Zora's Domain
  - Upper Zora's River
  - Agitha
- Desert Province
  - Gerudo Desert
  - Bulblin Camp
  - Cave of Ordeals
- Peak Province
  - Snowpeak
- Split Province (zones which have checks in multiple provinces)
  - Golden Wolf
  - Long Minigames
- Dungeons
  - Forest Temple
  - Goron Mines
  - Lakebed Temple
  - Arbiter's Grounds
  - Snowpeak Ruins
  - Temple of Time
  - City in the Sky
  - Palace of Twilight
  - Hyrule Castle

Frequently a hint which references the Province will reference the zone if the province is Dungeons.
For example:

- They say that the {Lantern} can be found in {Eldin Province}.
- They say that the {Lantern} can be found in {Goron Mines}.

For other hints, you might just have "Dungeons" though:

- They say that {3 swords} can be found in {Dungeons}.

### HintCategory

A "HintCategory" is a named list of checks which does not need to conform to HintZone boundaries.

You could theoretically come up with whatever you want, but here are some examples:

- Owl Statues
- Underwater
- Grottos
- Mist
- Upper Desert
- Lower Desert
- LLC Lantern Chests
- LLC 2nd Half
- CitS East Wing
- SPR 2nd Floor

HintCategories allow greater flexibility and creativity when hinting areas than simply sticking to HintZones.
For example:

- They say that {something useful} is blocked by {purple mist}.
- They say that {nothing} of value is in {LLC Lantern Chests}.

There are some other ways to use them which I will go over later.

## Hint Types

- Exact wording of hints is subject to change.
- Exact hint types is subject to change.
- If you are building a hint distribution, you absolutely do NOT have to use every kind of hint which exists.

### Location

A Location hint tells you the exact contents of a check.

- They say that {Goron Springwater Rush} has an {Orange_Rupee}.

You can expect a hint distribution to always hint certain checks which are extremely time-consuming (such as Iza).
These are referred to as "Always" hints.

Hinting a check which is fairly inconvenient some of the time would be a "Sometimes" hint (such as the Eldin Field Lantern check).

### Path

A Path hint points to a check which is logically required to complete a specific goal such as defeating a required boss (and therefore logically required to complete the seed).

- They say that {Faron Field} is on the path to {Diababa}.

### Way of the Hero

A Way of the Hero (WotH) hint is a special case of a Path hint.
It is essentially an alias for a "path to Ganondorf" to hint.
The following are equivalent:

- They say that {Lake Hylia} is on the way of the hero.
- They say that {Lake Hylia} is on the path to {Ganondorf}.

You can think of a WotH hint as a weaker version of a Path hint.

### Barren

A Barren hint indicates a group of checks which you can safely skip.

- They say that {nothing} of value can be found in {Kakariko Graveyard}.
- They say that {nothing} of value can be found in the {Lower Desert}.

### SomethingUseful

A SomethingUseful hint is basically the opposite of a Barren hint.
It indicates an area which cannot be hinted barren because it contains an item which prevents barren such as a sword or the Spinner.
This hint does not imply that the hinted area is logically required; it just means the area is not barren.

- They say that {something useful} is blocked by {purple mist}.

### NamedItem

A NamedItem indicates an area in which you can find a specific item.

- They say that the {Lantern} can be found in {Forest Temple}.
- They say that a {Fishing Rod} can be found in {Desert Province}.

### Junk

A Junk hint contains general gameplay tips or somewhat humorous text.
I think TP has a lot of funny quotes, so I would like to add a bunch of those.
I would like to avoid inside jokes and circle jerking.

- I mean, is perpetual twilight really all that bad?
- Who need mirror?
- They say that fairies will land on healthy individuals.

These hints seem pointless, but they might serve a purpose in some hint distributions.
For example, if the Kakariko Gorge sign has a junk hint, you can have a laugh and then get out of there because it just told you that there is a different sign somewhere that hints Kakariko Gorge as Barren.

I think having these actually show up in tournament races would be fun for viewers and players alike.

### AgithaRewards

The AgithaRewards hint is planned to always be specially placed on the sign outside Agitha's Castle (as opposed to in normal overworld hint spots), and it would indicate one of the following:

- Agitha is barren (you can completely skip turning in bugs).
- Lists the interesting (preventBarren) items which you can get from Agitha.
  They may or may not be required.

The exact wording of this is not nailed down at all, but as an example the hint might indicate that Agitha can reward the following items:
"Auru's Memo, Bow, Bow"

### NothingBeyond

A NothingBeyond hint indicates that all of the checks beyond the sign are Barren (can be skipped).
It is basically a Barren hint, but the position of the sign is what indicates which checks are Barren.

- {Nothing} beyond this point!

Here are some places you might see this:

- Halfway through Lake Lantern Cave, indicating you can take the early exit and skip the 2nd half.
- On the far side of the Snowpeak lake, indicating that the checks beyond that point can be skipped (Freezard grotto, etc.).
- Before the east wing of City in the Sky, indicating that the east wing is Barren.

This is implemented by making use of HintCategories.

### ItemMultiLocations

An ItemMultiLocations hint indicates multiple areas in which you can find an item.
The main place you would use this would be for anti-casino hints.

- They say that {Goron Mines Key Shard} can be found at {Upper Zora's River}, {Lake Hylia}, and {Ordon}.

### NumItemsInArea

A NumItemsInArea hint indicates how many of an item are in an area.

- They say that {2 swords} can be found in {Lanayru Province}.
- They say that {1 clawshot} can be found in {Dungeons}.

### BugsUseful

A BugsUseful hint indicates whether or not certain bugs should be traded in.

- They say that {nothing} of value is rewarded for turning in {male bugs}.

### ItemToItemPath

An ItemToItemPath hint indicates that a source item is logically required to get a target item.
It also indicates the target item is required.

- They say that {Iron Boots} is on the Path to {Male Mantis}.
- They say that {Clawshot} is on the Path to {Auru's Memo}.

It does not necessarily indicate that the source item is directly used to get the target item.
It could say {Iron Boots} is on the path to {Zora Armor}, but the exact sequence could be something like Iron Boots => Clawshot => Memo => Lantern => Zora Armor.

If the target item is a bug, then you know that specific bug is logically required to complete the seed.
It wouldn't hint a bug that you trade in for a blue rupee or an optional Bow.

## HintSpot

A "HintSpot" is a source from which you can get a list of Hints.
For example:

- Midna
- Agitha' Castle Sign
- Kakariko Graveyard Sign
- Lake Hylia Sign

A large number of the HintSpots would be custom signs added to the game.

You might think it is unfortunate that we do not have a good built-in source of locations where we can swap in hint text (such as Gossip Stones in OoT), but I think the increased flexibility we are forced to embrace is a great thing.
It not only allows us to place hint spots with game balance in mind, but it allows us to do some things which are simply not possible in other randomizers (assuming they never add custom hint spots).

In general, the plan is to add a single sign per HintZone (meaning Kakariko Village gets a sign, Lake Hylia gets a sign, etc.).

- This forces us to spread the signs out evenly throughout the world.
- It is fairly easy to learn the spots since there is an easy to understand pattern.

## New Race Ruleset

Name not decided yet.
I wasn't really planning on posting this soon, but it was brought to my attention that it would be good to make these ideas known.

Also this will mainly be talking about the thought process behind stuff rather than listing the exact ruleset.

---

I have been working on a new ruleset which makes use of the above hint ideas and which has the following major goals:

- Seeds are short enough to where people can be like "anybody down for a race?" on a random Wednesday night and people can say "sure!".
- When you finish a seed, you can say "run it back?".
- Trim the unfun fat to make more room for things which are fun and interesting.
- Attempt to increase the number of times someone reads a hint and says "oh shit!" because it was exciting/interesting.
- Focus on variability and replayability.
- Provide several viable ways to approach a seed.
  There should not be one obvious best way to start/approach every seed.

### Allowed Glitches/Tricks

I still think allowing most tricks makes sense.
Here is what I would ban (off the top of my head):

- Back in Time
- Big Key skips
- Duplicating a huge number of fishing rods, etc.
- Iza Item Manipulation (guaranteed bombs, infinite bomb arrows, etc.)
- HC Rang skip
- HC Spinner skip
- HC Double Clawshots skips
- Any Reekfish skip
- Morpheel and Zant without Zora Armor

The above have an immediate impact on what items you need to find to complete the seed.
I do not think it is fair or healthy to require every player to learn how to skip Spinner or Zora Armor.

However, you should understand that Boomerang LJAs are not going anywhere, and that is far and away the most broken trick in the game.
You probably do not realize how much you use it.

I think some people overestimate the impact that something like Map Glitch or Epona Out of Bounds has on a seed.
At best, you can skip the requirements for a Double Dominion Rod check.
However, people already do this all the time with wolf jumps and LJAs.
And even then it is extremely situational that it would even make sense to attempt Epona OoB from a time perspective in a race.

Additionally, you can teach someone Map Glitch in two minutes.
It is not difficult at all.
And Epona OoB is equally easy to learn; literally do Map Glitch and then get on your horse.

The only place I would say Map Glitch could potentially be problematic would be for the 3 mist checks in Faron Woods.
I am not entirely convinced it is an obvious play since it makes it must less attractive to go back and get the 2 checks in the cave later.

However, most seeds will have it hinted whether or not the mist is Barren which makes it risky to do the mist checks early since you might later find out they were Barren.

I could definitely say more on the subject, but I am too tired to try to imagine the points to argue against, so we're going to move on.

### Basic setup

- Glitchless logic
- Everything shuffled but Poes.
- Agitha rewards are at 8 (4 male, 4 female).
  - This seems to be a good balance of having seeds where Agitha matters vs not.
    The hints help with Agitha quite a lot as well.
- Starting items:
  - Gate Keys
  - Horse Call
  - Hawkeye
    - Basically is a telescope (get creative with it!). Should only be more useful after Chest Appearance Matches Contents is developed.
  - Shadow Crystal
  - 2 of 3 GM Key Shards

### Dungeon entrance requirements

Imagine one of your required dungeons in a seed made you find 20 of an Item X to enter, and Item X itself unlocked little to nothing.
What percentage of the time do you think that dungeon would be the last one of the three that you enter?
And what percentage of the time do you think you would hit go-mode before entering that dungeon?

That is just a more extreme version of the problem with having CitS be locked behind 3 Sky Characters and ToT locked behind 3 swords and Lantern.

I think people already realized the CitS one sucked, but I don't think people realize the ToT one also sucks.
I have complained about this a bunch in the past though, so I won't spend any more time on it.

### Exclusions, Always hints, and Snowpeak

Here are some of the more interesting exclusions:

- Jovani is excluded.
  - Collecting 20 vanilla sphere0 poes is not fun, even when you are told it is required.
  - Requiring new players to learn where a bunch of poes are in order to start participating is not a good idea, especially when the poes do not even improve the gameplay experience.
- Post-dungeon checks are excluded.
  - Everything post-ToT was already excluded, so the only things left were post-GM and post-SPR.
  - Post-GM checks are pretty much done by everyone right after GM since you are warped right next to them.
    So they become "going through the motions" checks.
  - The Post-SPR check was so bad that FCS voted on whether or not to ban it, and I saw people complain about it all the time.
  - I was going to put in a hint when possible to indicate whether or not post-dungeon checks were Barren or not, but then I realized it would be better to save the hint space for more interesting hints and just exclude the post-dungeon checks.
- Bulblin Camp is excluded.
  - This shortens the length of time that you spend at the desert.
  - Also nerfs the desert which is the strongest area in the game.
  - As someone who got super bored doing the desert seed after seed, this change (even though it seems small) has helped a lot.

#### Always hints

These are the Always hints:

- Goron Springwater Rush
- Iza Helping Hand
- Lake Hylia Shell Blade Grotto Chest
- Lanayru Ice Block Puzzle Cave Chest
- Plumm Fruit Balloon Minigam

Mostly standard, but Shellblade and Plumm are both trash and should be recognized as such.

For Always hints, you will only have 3 of the 5 hinted so that we don't waste a bunch of space on Always hints when that space could be used for more interesting hints.
Once you find the Always hints for 3 of the checks, you know the other 2 are Barren.

If 4 or more are hard-required, then each Always hint will just be a list of Location hints for all of the required ones (this is an edge case which will probably never happen).

#### Snowpeak

The Snowpeak grotto checks are some of the worst checks in the game for standard race settings.
They are able to sneak by for a couple of reasons:

- There are two of them, so the checks per minute for them doesn't seem as bad as something like Iza1.
- They are nowhere near as bad on seeds where SPR is required.

To me, something starts to smell like an Always hint when 95% of players save that check for absolute last.
But in the case of Snowpeak, these checks would only need to be Always when SPR isn't required.

So anyway, here is what the behavior is:

- The Snowpeak zone's hint sign is located on the far side of the icy lake.
- When SPR is not required (and overworld Poes are not shuffled), the Snowpeak sign will be a NothingBeyond hint when possible (indicating that the Snowpeak grottos are barren).
  - If it is not possible for the sign to be NothingBeyond since one of the grottos contains something good, then the sign will act as a normal overworld sign and you will know the two grottos are not Barren.
- Basically for non-SPR seeds, you will always know whether or not you need to worry about those checks.

### Keys

#### Small keys

- Small keys are set to Keysy.
- The dungeons in TP are mostly linear other than SPR.
  - Think about how small keys work in GM.
    They add nothing.
- Including small keys in their own dungeon does not add anything to the experience (other than arguably SPR), regardless of whether or not it is a good idea in other Zelda games.
  - For example, there is skipping keys and counting keys in Wind Waker, but it just doesn't work the same way in TPR.
    Once again, the only place you could really make use of this is SPR, but it would be confusing to have it work differently only for that one dungeon.

#### Big Keys

I don't like Big Keys in their own dungeon because you get situations like this:

- I am go-mode entering CitS.
  Now I have to clear somewhere between 2% and 100% of the dungeon even though I would like to go straight to the boss.

That's not cool.

So anyway, Big Keys are Keysanity.
It's fun.

I know, how is that any better lol (I am getting tired).

- Firstly, you will often randomly get keys as you clear the overworld/dungeons.
  - It is also exciting when you run across a generic-looking big key that might be important, and randomly finding HC big key feels good.
- Secondly, there are anti-casino hints on signs in each dungeon which tell you the area with the key.
  - It will either tell you the Dungeon by name, or the province.
    However, the Hyrule Castle one will tell you the exact zone even if it is not a dungeon since you are probably wanting to be done by that point.

### Hints

Ideally, this is how the hints work:

- 3 Path hints
- 4 Barren hints
- 1 Item hint
- 1 "most swords province" hint
  - Tells you the province which has the most swords
- Agitha sign hints AgithaRewards
- The rest is filled in with interesting stuff.
  - Not going to go into all of this right now since I just made a change and I still need to test more.
    Plus it would be a lot to type out, and it would be easier to understand if you could try it out yourself anyway.

Each overworld spot usually will have 2 hints on it.
In general, the first will be the more advanced hint (such as a Path hint), and the 2nd will be a Sometimes hint.

There is some special Sometimes hint logic, but the ones I will mention right now are:

- If possible, hints a check containing a sword that does not belong to the "most swords province".
- Hints either Bo or Goats, which encourages people to not worry about doing them in Ordon at the beginning (so you can get out into the world rather than starting your seed by mashing A).

#### Starting hints

You can talk to Midna to get the following:

- required dungeons
- 1 Path hint
- 1 Barren hint
- 1 Item hint
- 1 randomly selected interesting hint

If we can't get the hints on Midna (other than required dungeons), then they would probably go on the seed page.
I think it is important to have some hints at the beginning so you don't necessarily start the exact same way every time.
Also having the hints on the seed page isn't awful since commentators can talk about them before the race starts, and players have more time to plan out how they want to start (instead of instinctively doing the same thing as usual).

Here is an example of some hints from a recent seed which is probably more helpful than typing out a bunch more stuff for now:

```
{
      "Agithas_Castle_Sign": "8 bugs in pool.\nProgressive_Fishing_Rod",
      "Snowpeak_Rare_Chu_Grotto_Sign": "They say that there are 2 Progressive_Clawshot at {Category:Dungeon}.",
      "Faron_Field_Water_Grotto_Sign": "Your hint is in another grotto. Try checking {Province:Peak}.",
      "Kakariko_Gorge_Grotto_Sign": "Your hint is in another grotto. Try checking {Province:Peak}.",
      "Desert_Chus_Grotto_Sign": "Your hint is in another grotto. Try checking {Province:Peak}.",
      "Lanayru_Field_Chus_Grotto_Sign": "Your hint is in another grotto. Try checking {Province:Peak}.",
      "Midna_Talk_To": "They say that {Zone:Ordon} is on the path to {Diababa}.\n\nThey say that there is {nothing} to be found in {Zone:Kakariko Graveyard}.\n\nThey say that {Progressive_Bow} is at Zone:Castle Town.",
      "Kakariko_Village_Sign": "junk hint placeholder",
      "Kakariko_Graveyard_Sign": "junk hint placeholder",
      "Lanayru_Field_Sign": "junk hint placeholder",
      "South_of_Castle_Town_Sign": "junk hint placeholder",
      "Lanayru_Spring_Sign": "They say that {Iza Helping Hand} has {Piece_of_Heart}.\n\nThey say that {Goron Springwater Rush} has {Orange_Rupee}.",
      "Kakariko_Gorge_Sign": "They say that {Goron Springwater Rush} has {Orange_Rupee}.\n\nThey say that {Lake Hylia Shell Blade Grotto Chest} has {Goron_Mines_Key_Shard}.",
      "Great_Bridge_of_Hylia_Sign": "They say that {Lake Hylia Shell Blade Grotto Chest} has {Goron_Mines_Key_Shard}.\n\nThey say that {Iza Helping Hand} has {Piece_of_Heart}.",
      "Arbiters_Grounds_Big_Key_Sign": "They say that {Arbiters_Grounds_Big_Key} is at Province:Lanayru.",
      "Hyrule_Castle_Sign": "They say that {Hyrule_Castle_Big_Key} is at Zone:Faron Field.",
      "Forest_Temple_Big_Key_Sign": "They say that {Forest_Temple_Big_Key} is at Province:Desert.\n\n[Nothing] beyond this point!",
      "Snowpeak_Ruins_Big_Key_Sign": "They say that {Snowpeak_Ruins_Bedroom_Key} is at Zone:Snowpeak Ruins.\n\n[Nothing] beyond this point!",
      "Sacred_Grove_Sign": "They say that {Zone:Great Bridge of Hylia} is on the path to {Stallord}.\n\nThey say that {Eldin Lantern Cave Second Chest} has {Progressive_Sword}.",
      "Lake_Hylia_Sign": "They say that there is {nothing} to be found in {Zone:South of Castle Town}.\n\nThey say that {Eldin Lantern Cave Second Chest} has {Progressive_Sword}.",
      "Faron_Field_Sign": "They say that there is {nothing} to be found in {Zone:Kakariko Village}.\n\nThey say that {Herding Goats Reward} has {Piece_of_Heart}.",
      "Gerudo_Desert_Sign": "They say that {female bugs} lead to {nothing}.\n\nThey say that {Herding Goats Reward} has {Piece_of_Heart}.",
      "Snowpeak_Sign": "They say that there is {nothing} to be found in {Zone:Lanayru Field}.\n\nThey say that {Snowpeak Ruins Blizzeta Heart Container} has {Filled_Bomb_Bag}.",
      "Lake_Lantern_Cave_Sign": "They say that {Zone:Great Bridge of Hylia} is on the path to {Stallord}.\n\nThey say that {Snowpeak Ruins Blizzeta Heart Container} has {Filled_Bomb_Bag}.",
      "Ordon_Sign": "They say that [something good] is at {Category:Mist}.\n\nThey say that {Zoras Domain Underwater Goron} has {City_in_The_Sky_Big_Key}.",
      "Faron_Woods_Sign": "They say that {Filled_Bomb_Bag} is on the path to {Aurus_Memo}.\n\nThey say that {Zoras Domain Underwater Goron} has {City_in_The_Sky_Big_Key}.",
      "Death_Mountain_Sign": "They say that {female bugs} lead to {nothing}.\n\nThey say that {Death Mountain Alcove Chest} has {Piece_of_Heart}.",
      "NE_Hyrule_Field_Sign": "They say that {Zone:Sacred Grove} is on the path to {Blizzeta}.\n\nThey say that {Death Mountain Alcove Chest} has {Piece_of_Heart}.",
      "Upper_Zoras_River_Sign": "They say that there are 2 Progressive_Sword at {Province:Faron}.\n\nThey say that {Eldin Stockcave Lantern Chest} has {Progressive_Hidden_Skill}.",
      "Eldin_Field_Sign": "They say that [something good] is at {Category:Mist}.\n\nThey say that {Eldin Stockcave Lantern Chest} has {Progressive_Hidden_Skill}.",
      "Castle_Town_Sign": "They say that {Filled_Bomb_Bag} is on the path to {Aurus_Memo}.\n\nThey say that {Kakariko Gorge Double Clawshot Chest} has {Orange_Rupee}.",
      "West_of_Castle_Town_Sign": "They say that there are 2 Progressive_Sword at {Province:Faron}.\n\nThey say that {Kakariko Gorge Double Clawshot Chest} has {Orange_Rupee}.",
      "Zoras_Domain_Sign": "They say that {Zone:Sacred Grove} is on the path to {Blizzeta}.\n\nThey say that {STAR Prize 2} has {Empty_Bottle}."
    }
```

The empty grotto hints was an idea I had iterated on, but I'm going to remove it in favor of starting with a NamedItem hint.

It is late here, so I will go back and edit this or add to it as needed.
