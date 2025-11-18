import { TRACK_ORDER } from "./constants.js";
import { state } from "./main.js";
import { renderSelectedStack } from "./stackUI.js";

const el_heal = document.getElementById("span_heal");
const el_dmg = document.getElementById("span_dmg");

export function addDmg(list, dmg, amt) {
  if (amt <= 0) return dmg;
  list.push(amt);
  return dmg + amt;
}

function calcLureBonus(trackSum) {
  return Math.ceil(trackSum * 0.5);
}

function singleTrackDamage(arr, isLured, hitList, dmg) {
  let trackSum = 0;

  arr.forEach(gag => {
    dmg = addDmg(hitList, dmg, gag.dmg);
    trackSum += gag.dmg;
  });

  if (arr.length >= 2) dmg = addDmg(hitList, dmg, Math.ceil(trackSum * 0.2));

  if (arr.length >= 1 && isLured && arr !== queues["Sound"]) {
    dmg = addDmg(hitList, dmg, calcLureBonus(trackSum));
    isLured = false;
  }

  return { dmg, isLured };
}

export function updateDamage() {
  const queues = state.queues;
  let isLured = state.isLured;      // local working copy
  const selectedCog = state.selectedCog;
  console.table(state.selectedCog);

  let dmg = 0;
  let heal = 0;
  let hitList = [];

  // heal
  queues["Toon-up"].forEach(g => (heal += g.dmg));

  // trap
  let trapPending = 0;
  if (queues["Trap"].length === 1) {
    if (isLured) {
      dmg = addDmg(hitList, dmg, queues["Trap"][0].dmg);
      isLured = false;
    } else {
      trapPending = queues["Trap"][0].dmg;
    }
  }

  // lure
  if (queues["Lure"].length >= 1) {
    if (trapPending > 0) {
      dmg = addDmg(hitList, dmg, trapPending);
      trapPending = 0;
      isLured = false;
    } else {
      isLured = true;
    }
  }

  // all damage tracks
  for (const track of TRACK_ORDER) {
    const r = singleTrackDamage(queues[track], isLured, hitList, dmg);
    dmg = r.dmg;
    isLured = r.isLured;
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