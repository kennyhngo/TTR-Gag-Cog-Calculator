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
    this.trapPending = 0;
    this.captureHistory = [];
    this.modifier = {
      type: null,  // foreman, auditor, club_president
      value: null  // 25, 150, 200, 20, 40, 60
    };
  }

  // ========== RESET LOGIC ==========
  reset() {
    for (const t in this.queues) this.queues[t] = [];
    this.gagQueue.length = 0;
    this.enqueueCounter = 0;
    this.isLured = false;
    this.trapPending = 0;
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
    // if (gag.track === "Lure" && this.isLured) return false;

    this.queues[gag.track].push(gag);
    this.gagQueue.push(gag);
    this.enqueueCounter++;

    if (gag.track === "Trap") {
      this.trapPending += gag.dmg;
      if (this.queues[gag.track].length >= 2) {
        this.undo();
        return false;
      }
    }
    return true;
  }

  // ========== UNDO ==========
  undo() {
    if (this.gagQueue.length === 0) return false;

    const gag = this.gagQueue.pop();
    this.queues[gag.track].pop();
    this.enqueueCounter--;

    if (gag.track === "Trap") this.trapPending -= gag.dmg;
    return true;
  }

  // ========== COG SELECTION ==========
  setCog(type, id, hp) {
    this.selectedCog = { type, id, hp };
  }

  setCogObj(cog) {
    this.selectedCog = cog;
  }

  addCapture(entry) {
    this.captureHistory.push(entry);
  }

  clearCapture() {
    this.captureHistory = [];
  }

  setModifier(type, value) {
    this.modifier.type = type;
    this.modifier.value = value;
  }

  setModifierObj(modifier) {
    this.modifier = modifier;
  }
}
