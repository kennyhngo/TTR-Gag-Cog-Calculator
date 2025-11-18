export class BattleState {
  constructor () {
    this.MAX_GAGS = 4;

    // Per-track gag queues
    this.queues = {
      "Toon-up": [],
      "Trap": [],
      "Lure": [],
      "Sound": [],
      "Throw": [],
      "Squirt": [],
      "Drop": []
    };

    this.gagQueue = [];       // ordered list of selected gags
    this.enqueueCounter = 0;  // number selected
    this.isLured = false;     // prior lure state
    this.selectedCog = { type: "level", id: 0, hp: 0 }; // default
  }

  // ========== RESET LOGIC ==========
  reset() {
    for (const t in this.queues) this.queues[t] = [];
    this.gagQueue.length = 0;
    this.enqueueCounter = 0;
    this.isLured = false;
  }

  // ========== LURE HANDLING ==========
  toggleLure() {
    this.isLured = !this.isLured;
  }

  // ========== ENQUEUE ==========
  enqueue(gag) {
    if (!gag) return false;
    if (this.enqueueCounter >= this.MAX_GAGS) return false;

    // trap/lure rule
    if (gag.track === "Trap" && this.isLured) return false;
    if (gag.track === "Lure" && this.isLured) return false;

    this.queues[gag.track].push(gag);
    this.gagQueue.push(gag);
    this.enqueueCounter++;
    return true;
  }

  // ========== UNDO ==========
  undo() {
    if (this.gagQueue.length === 0) return false;

    const gag = this.gagQueue.pop();
    this.queues[gag.track].pop();
    this.enqueueCounter--;
    return true;
  }

  // ========== COG SELECTION ==========
  setCog(type, id, hp) {
    this.selectedCog = { type, id, hp };
  }

  setCogObj(cog) {
    this.selectedCog = cog;
  }
}
