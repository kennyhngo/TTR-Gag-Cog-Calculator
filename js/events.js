import { updateDamage } from "./damage.js";
import { gagMap, organicMap } from "./gag.js";
import { state } from "./main.js";

export function setupGagEvents() {

  document.addEventListener("mousedown", e => {
    const td = e.target.closest(".gag_box");
    if (!td) return;

    const src = td.dataset.src;
    const gag = e.button === 2 ? organicMap.get(src) : gagMap.get(src);
    if (!gag) return;
    if (!state.enqueue(gag)) return;
    updateDamage();
  });

  document.getElementById("button_lured").addEventListener("click", () => {
    if (state.enqueueCounter > 0) state.reset();
    state.toggleLure();
    document.getElementById("bool_lured").textContent = state.isLured ? "yes" : "no";
    updateDamage();
  });

  document.getElementById("button_undo").addEventListener("click", () => {
    if (state.undo()) updateDamage();
  });

  document.getElementById("button_reset").addEventListener("click", () => {
    state.reset();
    document.getElementById("bool_lured").textContent = "no";
    updateDamage();
  });

  document.getElementById("cog_reset").addEventListener("click", () => {
    state.clearCapture();
    document.getElementById("capture_history").innerHTML = "";
  });
}