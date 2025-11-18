import { state } from "./main.js";

export function renderSelectedStack() {
  const slots = document.querySelectorAll(".stack_slot");

  slots.forEach(s => (s.innerHTML = ""));

  state.gagQueue.forEach((gag, i) => {
    if (i >= 4) return;

    const slot = slots[i];
    const img = document.createElement("img");
    img.src = gag.src;
    img.className = "stack_gag_img";
    slot.appendChild(img);

    if (gag.organic) {
      const badge = document.createElement("div");
      badge.className = "stack_organic_badge";
      badge.textContent = "O";
      slot.appendChild(badge);
    }
  });
}
