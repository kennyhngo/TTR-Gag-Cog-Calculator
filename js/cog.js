import { SPECIAL_COG_HP } from "./constants.js";
import { updateDamage } from "./damage.js";
import { state } from "./main.js";

export function calcLevelHP(level) {
  const base = (level + 1) * (level + 2);
  return level >= 12 ? base + 14 : base;
}

export function applyModifier(baseHP, cogType) {
  const modifier = state.modifier;
  console.log(state.selectedCog);
  if (!modifier.type) return baseHP;

  // Foreman: +25% defense
  if (modifier.type === "foreman" && cogType === "level") {
    return Math.floor(baseHP * (1 + modifier.value / 100));
  }

  // Auditor: +150 HP or +200 HP
  if (modifier.type === "auditor" && cogType === "level") {
    return baseHP + modifier.value;
  }

  // Club President: does NOT modify cog HP
  return baseHP;
}

export function updateCogResult() {
  if (!state.selectedCog) return;
  const { type, id } = state.selectedCog;

  let baseHP = type === "level" ? calcLevelHP(id) : SPECIAL_COG_HP[type][id];
  const finalHP = applyModifier(baseHP, type);
  state.setCogObj({ type, id, hp: finalHP });
  updateDamage();
}

export function setupCogUI() {
  const grid = document.getElementById("cog_level_grid");
  grid.innerHTML = "";

  const rows = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20]
  ];

  rows.forEach(levels => {
    const row = document.createElement("div");
    row.className = "cog_level_row";

    levels.forEach(level => {
      const btn = document.createElement("button");
      btn.textContent = level;
      btn.className = "cog_level_btn";
      btn.dataset.level = level;
      row.appendChild(btn);
    });
    grid.appendChild(row);
  });

  // cog levels
  document.querySelectorAll(".cog_level_btn").forEach(btn =>
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cog_level_btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".special_cog").forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      const lvl = parseInt(btn.dataset.level);
      state.setCogObj({ type: "level", id: lvl, hp: calcLevelHP(lvl) });
      updateDamage();

      document.querySelectorAll(".modifier-btn").forEach(b => b.classList.remove("selected"));

      state.clearCapture();
      state.setModifier(null, null);
      document.getElementById("capture_history").innerHTML = "";
    })
  );

  // special cogs
  document.querySelectorAll(".special_cog").forEach(btn =>
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cog_level_btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".special_cog").forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
      const type = btn.dataset.type;
      const id = btn.dataset.id;

      state.setCogObj({ type, id, hp: SPECIAL_COG_HP[type][id] });
      updateDamage();

      state.clearCapture();
      state.setModifier(null, null);
      document.getElementById("capture_history").innerHTML = "";
    })
  );

  // modifiers
  document.querySelectorAll(".modifier-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const mod = btn.dataset.mod;
      const val = Number(btn.dataset.value);

      // Click same button again + deselect modifier
      if (state.modifier.type === mod && state.modifier.value === val) {
        btn.classList.remove("selected");
        state.setModifier(null, null);
      } else {
        document.querySelectorAll(".modifier-btn").forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");
        state.setModifier(mod, val);
      }

      updateCogResult();
      state.clearCapture();
    });
  });
}
