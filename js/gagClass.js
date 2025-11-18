export class Gag {
  constructor (track, name, dmg, multihit, organic = false, src = null) {
    this.track = track;         // "Throw", "Sound", etc.
    this.name = name;           // "Birthday Cake"
    this.dmg = dmg;             // base or organic damage
    this.multihit = multihit;   // true for sound, false otherwise
    this.organic = organic;     // boolean
    this.src = src;             // image path for rendering
  }
}
