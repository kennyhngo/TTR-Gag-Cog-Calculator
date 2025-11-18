import { updateDamage } from "./damage.js";
import { state } from "./main.js";

export function setupCaptureButton() {
  const btn = document.getElementById("button_capture");
  const list = document.getElementById("capture_history");

  btn.addEventListener("click", () => {
    const total = state.selectedCog.hp;
    const remaining = parseInt(document.getElementById("cog_remaining_hp").textContent);
    const damageTaken = total - remaining;

    // Create capture object
    const entry = {
      before: total,
      damage: damageTaken,
      after: remaining
    };

    // store inside state
    state.addCapture(entry);

    // update history UI
    const li = document.createElement("li");
    li.textContent = `${entry.after} HP (took ${entry.damage} damage)`;
    list.appendChild(li);

    // set new HP as the base HP
    state.setCogObj({
      type: state.selectedCog.type,
      id: state.selectedCog.id,
      hp: remaining
    });

    // Reset gags
    state.reset();
    updateDamage();
  });
}
