import { setupCogUI } from "./cog.js";
import { updateDamage } from "./damage.js";
import { setupGagEvents } from "./events.js";
import { buildGags } from "./gag.js";
import { renderGrid } from "./gagGrid.js";
import { BattleState } from "./state.js";

export const state = new BattleState();

buildGags();
renderGrid();
setupGagEvents();
setupCogUI();
updateDamage();
