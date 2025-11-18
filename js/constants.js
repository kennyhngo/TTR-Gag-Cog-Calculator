export const ASSETS = {
  "Toon-up": [
    "images/toonup/feather.webp",
    "images/toonup/megaphone.webp",
    "images/toonup/lipstick.webp",
    "images/toonup/bamboo_cane.webp",
    "images/toonup/pixie_dust.webp",
    "images/toonup/juggling_balls.webp",
    "images/toonup/high_dive.webp"
  ],
  "Trap": [
    "images/trap/banana_peel.webp",
    "images/trap/rake.webp",
    "images/trap/marbles.webp",
    "images/trap/quicksand.webp",
    "images/trap/trapdoor.webp",
    "images/trap/tnt.webp",
    "images/trap/railroad.webp"
  ],
  "Lure": [
    "images/lure/1_bill.webp",
    "images/lure/small_magnet.webp",
    "images/lure/5_bill.webp",
    "images/lure/big_magnet.webp",
    "images/lure/10_bill.webp",
    "images/lure/hypno_goggles.webp",
    "images/lure/presentation.webp"
  ],
  "Sound": [
    "images/sound/bike_horn.webp",
    "images/sound/whistle.webp",
    "images/sound/bugle.webp",
    "images/sound/aoogah.webp",
    "images/sound/elephant_trunk.webp",
    "images/sound/foghorn.webp",
    "images/sound/opera_singer.webp"
  ],
  "Throw": [
    "images/throw/cupcake.webp",
    "images/throw/fruit_pie_slice.webp",
    "images/throw/cream_pie_slice.webp",
    "images/throw/whole_fruit_pie.webp",
    "images/throw/whole_cream_pie.webp",
    "images/throw/birthday_cake.webp",
    "images/throw/wedding_cake.webp"
  ],
  "Squirt": [
    "images/squirt/squirting_flower.webp",
    "images/squirt/glass_of_water.webp",
    "images/squirt/squirt_gun.webp",
    "images/squirt/seltzer_bottle.webp",
    "images/squirt/fire_hose.webp",
    "images/squirt/storm_cloud.webp",
    "images/squirt/geyser.webp"
  ],
  "Drop": [
    "images/drop/flower_pot.webp",
    "images/drop/sandbag.webp",
    "images/drop/anvil.webp",
    "images/drop/big_weight.webp",
    "images/drop/safe.webp",
    "images/drop/grand_piano.webp",
    "images/drop/toontanic.webp"
  ]
};

// Base damage (same index order as assets)
export const DAMAGE_TABLE = {
  "Toon-up": [10, 18, 30, 45, 60, 105, 210],
  "Trap": [12, 20, 35, 50, 85, 180, 200],
  "Lure": [0, 0, 0, 0, 0, 0, 0],
  "Sound": [4, 7, 11, 16, 21, 50, 90],
  "Throw": [6, 10, 17, 27, 40, 100, 120],
  "Squirt": [4, 8, 12, 21, 30, 80, 105],
  "Drop": [10, 18, 30, 45, 70, 170, 180]
};

export const ORGANIC_MULT = 1.1;
export const MAX_GAGS = 4;
export const TRACK_ORDER = ["Toon-up", "Trap", "Lure", "Sound", "Throw", "Squirt", "Drop"];

export const SPECIAL_COG_HP = {
  factory: {
    scrap: 250,
    steel: 750
  },
  mint: {
    coin: 750,
    bullion: 1150
  },
  office: {
    junior: 1100,
    senior: 1500
  },
  club: {
    fairway: 1200,
    fringe: 1750
  }
};
