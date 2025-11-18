import { SPECIAL_COG_HP } from "./constants.js";
import { updateDamage } from "./damage.js";
import { state } from "./main.js";

export function calcLevelHP(level) {
  const base = (level + 1) * (level + 2);
  return level >= 12 ? base + 14 : base;
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

  document.querySelectorAll(".cog_level_btn").forEach(btn =>
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cog_level_btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".special_cog").forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      const lvl = parseInt(btn.dataset.level);
      state.setCogObj({ type: "level", id: lvl, hp: calcLevelHP(lvl) });
      updateDamage();
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
    })
  );
}
