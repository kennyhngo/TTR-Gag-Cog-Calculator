import { state } from "./main.js";
import { renderSelectedStack } from "./stackUI.js";

const el_heal = document.getElementById("span_heal");
const el_dmg = document.getElementById("span_dmg");

export function addDmg(list, dmg, amt) {
  if (amt <= 0) return dmg;
  list.push(amt);
  return dmg + amt;
}

function singleTrackDamage(arr, trackName, isLured, hitList, dmg) {
  let trackSum = 0;

  for (const gag of arr) {
    dmg = addDmg(hitList, dmg, gag.dmg);
    trackSum += gag.dmg;
  }

  // same-track bonus (20%)
  if (arr.length >= 2) {
    dmg = addDmg(hitList, dmg, Math.floor(trackSum * 0.2));
  }

  // lure bonus (applies to all tracks except Sound; Drop handled externally if needed)
  if (arr.length >= 1 && isLured && trackName !== "Sound") {
    dmg = addDmg(hitList, dmg, Math.floor(trackSum * 0.5));
    isLured = false;
  }

  if (state.modifier.type === "club_president") {
    dmg = addDmg(hitList, dmg, Math.floor(trackSum * state.modifier.value / 100));
  }

  return { dmg, isLured };
}

export function updateDamage() {
  const queues = state.queues;
  let isLured = state.isLured;      // local working copy
  const selectedCog = state.selectedCog;

  let dmg = 0;
  let heal = 0;
  let hitList = [];

  // heal
  queues["Toon-up"].forEach(g => (heal += g.dmg));

  // trap is handled by event enqueue
  // lure
  if (queues["Lure"].length > 0) {
    if (state.trapPending > 0) {
      let initdmg = state.trapPending;
      const modifiedDmg = state.modifier.type === "club_president"
        ? initdmg * (1 + state.modifier.value / 100)
        : initdmg;
      dmg = addDmg(hitList, dmg, Math.floor(modifiedDmg));
      isLured = false;
    } else {
      isLured = true;
    }
  }

  // all damage tracks
  for (const track of ["Sound", "Throw", "Squirt"]) {
    const r = singleTrackDamage(queues[track], track, isLured, hitList, dmg);
    dmg = r.dmg;
    isLured = r.isLured;
  }

  // drop misses if lured
  if (!isLured) {
    const r = singleTrackDamage(queues["Drop"], "Drop", false, hitList, dmg);
    dmg = r.dmg;
  }

  // UI
  el_heal.textContent = heal;
  el_dmg.textContent = dmg;

  const totalHP = selectedCog.hp;
  const remaining = Math.max(0, totalHP - dmg);

  document.getElementById("cog_total_hp").textContent = totalHP;
  document.getElementById("cog_remaining_hp").textContent = remaining;

  renderSelectedStack();
}