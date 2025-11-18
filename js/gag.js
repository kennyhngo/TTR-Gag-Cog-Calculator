import { ASSETS, DAMAGE_TABLE, ORGANIC_MULT } from "./constants.js";
import { Gag } from "./gagClass.js";


export const gagMap = new Map();
export const organicMap = new Map();

export function buildGags() {
  for (const track in ASSETS) {
    ASSETS[track].forEach((src, idx) => {
      const name = src.split("/").pop().replace(".webp", "").replace(/_/g, " ");
      const baseDmg = DAMAGE_TABLE[track][idx];

      gagMap.set(src, new Gag(track, name, baseDmg, track === "Sound", false, src));
      organicMap.set(
        src,
        new Gag(track, name, Math.ceil(baseDmg * ORGANIC_MULT), track === "Sound", true, src)
      );
    });
  }
}