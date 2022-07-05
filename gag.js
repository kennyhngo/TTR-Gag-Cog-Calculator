if (!Array.prototype.back) {
  Array.prototype.back = function () {
    if (this.length <= 0) {
      return -1;
    }
    return this[this.length - 1];
  };
}

var EnumTrapped = Object.freeze({
  UNCLICKED: 1,
  CLICKED: 2,
  CHOSEN: 3,
});

/*
var Gag = function() {
	if (this.constructor === Gag) {
		throw new Error("Cannot instantiate abstract class.");
	}
	var dmg;
};

var Toon_up = function() {
	// Gag.apply(this, arguments);
	Gag.call(this);
};
Toon_up.prototype = Object.create(Gag.prototype);
// Toon_up.prototype.constructor = Toon_up;

Toon_up.prototype.constructor = Toon_up;

var feather = new Toon_up(10);
alert(feather.dmg);
*/

function Gag(type_in, name_in, dmg_in, is_mh_in, is_organic = false) {
  this.gag_type = type_in;
  this.gag_name = name_in;
  this.dmg = dmg_in;
  this.is_multihit = is_mh_in;
  this.is_organic = is_organic;
}

function Toon_up(type_in, name_in, dmg_in, is_mh_in, is_organic = false) {
  type_in = "Toon-up";
  Gag.apply(this, arguments);
}

function Trap(type_in, name_in, dmg_in, is_mh_in, is_organic = false) {
  type_in = "Trap";
  Gag.apply(this, arguments);
}

function Lure(type_in, name_in, dmg_in, is_mh_in, is_organic = false) {
  type_in = "Lure";
  dmg_in = 0; // all lure gags deal no damage
  Gag.apply(this, arguments);
}

function Sound(type_in, name_in, dmg_in, is_mh_in, is_organic = false) {
  type_in = "Sound";
  is_mh_in = true; // all sound gags are multihit
  Gag.apply(this, arguments);
}

function Throw(type_in, name_in, dmg_in, is_mh_in, is_organic = false) {
  type_in = "Throw";
  Gag.apply(this, arguments);
}

function Squirt(type_in, name_in, dmg_in, is_mh_in, is_organic = false) {
  type_in = "Squirt";
  Gag.apply(this, arguments);
}

function Drop(type_in, name_in, dmg_in, is_mh_in, is_organic = false) {
  type_in = "Drop";
  Gag.apply(this, arguments);
}

// map from img src to gag
var img_to_gag = new Map();

// Toon-up gags
img_to_gag["images/Feather.webp"] = new Toon_up(
  "Toon-up",
  "Feather",
  10,
  false
);
img_to_gag["images/Megaphone.webp"] = new Toon_up(
  "Toon-up",
  "Megaphone",
  18,
  true
);
img_to_gag["images/Lipstick.webp"] = new Toon_up(
  "Toon-up",
  "Lipstick",
  30,
  false
);
img_to_gag["images/Bamboo_Cane.webp"] = new Toon_up(
  "Toon-up",
  "Bamboo Cane",
  45,
  true
);
img_to_gag["images/Pixie_Dust.webp"] = new Toon_up(
  "Toon-up",
  "Pixie Dust",
  60,
  false
);
img_to_gag["images/Juggling_Balls.webp"] = new Toon_up(
  "Toon-up",
  "Juggling Balls",
  105,
  true
);
img_to_gag["images/High_Dive.webp"] = new Toon_up(
  "Toon-up",
  "High Dive",
  210,
  true
);

// Trap gags
img_to_gag["images/Banana_Peel.webp"] = new Trap(
  "Trap",
  "Banana Peel",
  12,
  false
);
img_to_gag["images/Rake.webp"] = new Trap("Trap", "Rake", 20, false);
img_to_gag["images/Marbles.webp"] = new Trap("Trap", "Marbles", 35, false);
img_to_gag["images/Quicksand.webp"] = new Trap("Trap", "Quicksand", 50, false);
img_to_gag["images/Trapdoor.webp"] = new Trap("Trap", "Trapdoor", 85, false);
img_to_gag["images/TNT.webp"] = new Trap("Trap", "TNT", 180, false);
img_to_gag["images/Railroad.webp"] = new Trap("Trap", "Railroad", 200, true);

// Lure gags
img_to_gag["images/$1_Bill.webp"] = new Lure("Lure", "$1 Bill", 0, false);
img_to_gag["images/Small_Magnet.webp"] = new Lure(
  "Lure",
  "Small Magnet",
  0,
  true
);
img_to_gag["images/$5_Bill.webp"] = new Lure("Lure", "$5 Bill", 0, false);
img_to_gag["images/Big_Magnet.webp"] = new Lure("Lure", "Big Magnet", 0, false);
img_to_gag["images/$10_Bill.webp"] = new Lure("Lure", "$10 Bill", 0, false);
img_to_gag["images/Hypno_Goggles.webp"] = new Lure(
  "Lure",
  "Hypno Goggles",
  0,
  true
);
img_to_gag["images/Presentation.webp"] = new Lure(
  "Lure",
  "Presentation",
  0,
  true
);

// Sound gags
img_to_gag["images/Bike_Horn.webp"] = new Sound("Sound", "Bike Horn", 4, true);
img_to_gag["images/Whistle.webp"] = new Sound("Sound", "Whistle", 7, true);
img_to_gag["images/Bugle.webp"] = new Sound("Sound", "Bugle", 11, true);
img_to_gag["images/Aoogah.webp"] = new Sound("Sound", "Aoogah", 16, true);
img_to_gag["images/Elephant_Trunk.webp"] = new Sound(
  "Sound",
  "Elephant Trunk",
  21,
  true
);
img_to_gag["images/Foghorn.webp"] = new Sound("Sound", "Foghorn", 50, true);
img_to_gag["images/Opera_Singer.webp"] = new Sound(
  "Sound",
  "Opera Singer",
  90,
  true
);

// Throw gags
img_to_gag["images/Cupcake.webp"] = new Throw("Throw", "Cupcake", 6, false);
img_to_gag["images/Fruit_Pie_Slice.webp"] = new Throw(
  "Throw",
  "Fruit Pie Slice",
  10,
  false
);
img_to_gag["images/Cream_Pie_Slice.webp"] = new Throw(
  "Throw",
  "Cream Pie Slice",
  17,
  false
);
img_to_gag["images/Whole_Fruit_Pie.webp"] = new Throw(
  "Throw",
  "Whole Fruit Pie",
  27,
  false
);
img_to_gag["images/Whole_Cream_Pie.webp"] = new Throw(
  "Throw",
  "Whole Cream Pie",
  40,
  false
);
img_to_gag["images/Birthday_Cake.webp"] = new Throw(
  "Throw",
  "Birthday Cake",
  100,
  false
);
img_to_gag["images/Wedding_Cake.webp"] = new Throw(
  "Throw",
  "Wedding Cake",
  120,
  true
);

img_to_gag["images/Squirting_Flower.webp"] = new Squirt(
  "Squirt",
  "Squirting Flower",
  4,
  false
);
img_to_gag["images/Glass_of_Water.webp"] = new Squirt(
  "Squirt",
  "Glass of Water",
  8,
  false
);
img_to_gag["images/Squirt_Gun.webp"] = new Squirt(
  "Squirt",
  "Squirt Gun",
  12,
  false
);
img_to_gag["images/Seltzer_Bottle.webp"] = new Squirt(
  "Squirt",
  "Seltzer Bottle",
  21,
  false
);
img_to_gag["images/Fire_Hose.webp"] = new Squirt(
  "Squirt",
  "Fire Hose",
  30,
  false
);
img_to_gag["images/Storm_Cloud.webp"] = new Squirt(
  "Squirt",
  "Storm Cloud",
  80,
  false
);
img_to_gag["images/Geyser.webp"] = new Squirt("Squirt", "Geyser", 105, true);

// Drop
img_to_gag["images/Flower_Pot.webp"] = new Drop(
  "Drop",
  "Flower Pot",
  10,
  false
);
img_to_gag["images/Sandbag.webp"] = new Drop("Drop", "Sandbag", 18, false);
img_to_gag["images/Anvil.webp"] = new Drop("Drop", "Anvil", 30, false);
img_to_gag["images/Big_Weight.webp"] = new Drop(
  "Drop",
  "Big Weight",
  45,
  false
);
img_to_gag["images/Safe.webp"] = new Drop("Drop", "Safe", 70, false);
img_to_gag["images/Grand_Piano.webp"] = new Drop(
  "Drop",
  "Grand Piano",
  170,
  false
);
img_to_gag["images/Toontanic.webp"] = new Drop("Drop", "Toontanic", 180, true);

var organic_gags = new Map();
for (let i in img_to_gag) {
  organic_gags[i] = $.extend(true, [], img_to_gag[i]);
  organic_gags[i].is_organic = true;
  let org_dmg = Math.floor(organic_gags[i].dmg * 1.1);
  if (organic_gags[i].dmg == org_dmg) {
    organic_gags[i].dmg = org_dmg + 1;
  } else {
    organic_gags[i].dmg = Math.floor(organic_gags[i].dmg * 1.1);
  }
}

var gag_queue = []; // to allow for undoing
// queue of gags separated by type
var toon_up_queue = [];
var trap_queue = [];
var lure_queue = [];
var sound_queue = [];
var throw_queue = [];
var squirt_queue = [];
var drop_queue = [];

function clear_gags() {
  gag_queue.length = 0;
  toon_up_queue.length = 0;
  trap_queue.length = 0;
  lure_queue.length = 0;
  sound_queue.length = 0;
  throw_queue.length = 0;
  squirt_queue.length = 0;
  drop_queue.length = 0;
}

function html_healing(heal_in) {
  $("#span_heal").html(heal_in);
}

function html_dmg(dmg_in) {
  $("#span_dmg").html(dmg_in);
}

function html_trap(state, gag_in) {
  if (state === EnumTrapped.CLICKED) {
    $("#trapped_val").html("choose a trap gag");
  } else if (state === EnumTrapped.CHOSEN) {
    $("#trapped_val").html(gag_in);
  } else if (state === EnumTrapped.UNCLICKED) {
    $("#trapped_val").html("no");
  } else {
    alert("Error with html_trap");
  }
}

function html_prev_gag() {
  if (gag_queue.length >= 1) {
    var organic_label = " (organic)";
    if (gag_queue.back().is_organic) {
      $("#prev_gag").html(gag_queue.back().gag_name + organic_label);
    } else {
      $("#prev_gag").html(gag_queue.back().gag_name);
    }
  } else {
    $("#prev_gag").html("none");
  }
}

function undo_gag(enqueue_counter) {
  if (gag_queue.length >= 1) {
    let gag_to_undo = gag_queue.pop();
    if (gag_to_undo.gag_type === "Toon-up") {
      toon_up_queue.pop();
    } else if (gag_to_undo.gag_type === "Trap") {
      trap_queue.pop();
    } else if (gag_to_undo.gag_type === "Lure") {
      lure_queue.pop();
    } else if (gag_to_undo.gag_type === "Sound") {
      sound_queue.pop();
    } else if (gag_to_undo.gag_type === "Throw") {
      throw_queue.pop();
    } else if (gag_to_undo.gag_type === "Squirt") {
      squirt_queue.pop();
    } else if (gag_to_undo.gag_type === "Drop") {
      drop_queue.pop();
    } else {
      // fixme remove in the future
      alert("undo_gag function error!");
    }
    html_prev_gag();
    return enqueue_counter - 1;
  }
  return 0;
}

// returns updated dmg_val; MUST assign because dmg_val is passed by value
function add_dmg(each_hit_arr, dmg_var, dmg_in) {
  each_hit_arr.push(dmg_in);
  return dmg_var + dmg_in;
}

// calculates 20% bonus damage (rounded up usually)
function bonus_dmg(dmg_in) {
  return Math.ceil(dmg_in * 0.2);
}

// returns new damage
function single_track_dmg(track, is_lured, each_hit, dmg) {
  let same_track_dmg = 0;
  for (i = 0; i < track.length; i++) {
    dmg = add_dmg(each_hit, dmg, track[i].dmg);
    same_track_dmg += track[i].dmg;
  }

  // bonus damage only occurs if more than 1 gag of same type used
  if (track.length >= 2) {
    // bonus damage added before lure
    dmg = add_dmg(each_hit, dmg, bonus_dmg(same_track_dmg));
  }
  if (track.length >= 1 && is_lured && track !== drop_queue) {
    // all dmg gags except drop de-lure cogs
    is_lured = false;

    // all tracks except sound and drop deal bonus lure dmg
    if (track !== sound_queue) {
      dmg = add_dmg(each_hit, dmg, Math.ceil(same_track_dmg * 0.5));
    }
  }

  // will update damage and if it's still lured
  return { dmg: dmg, is_lured: is_lured };
}

// returns total healing for now
function update_damage(is_lured_button) {
  let trap_potential = 0;
  let each_hit = []; // will be passed into 2.0 cog calculator
  let is_lured_total = is_lured_button;

  // recalculates damage every time it is called
  let heal = 0;
  let dmg = 0;

  // toon-up
  for (i = 0; i < toon_up_queue.length; i++) {
    heal += toon_up_queue[i].dmg;
  }
  // for (i = 0; i < trap_queue; i++) {
  // 	// trap can only be set if the cog is not already lured
  // 	// this should never happen as long as if the is_lured button is pressed,
  // 	// then gag_queue resets
  // 	if (!is_lured_button) {
  // 		if (i === 0) {
  // 			trap_potential += trap_queue[i].dmg;
  // 		}
  // 		else {
  // 			trap_potential = 0; // trap gags cancel each other out
  // 		}
  // 	}
  // }

  // trap
  if (trap_queue.length == 1 && is_lured_total === true) {
    // trap_potential += trap_queue[0].dmg;
    dmg = add_dmg(each_hit, dmg, trap_queue[0].dmg);
    is_lured_total = false;
  } else if (trap_queue.length == 1) {
    trap_potential += trap_queue[0].dmg;
  }

  // lure
  if (lure_queue.length >= 1) {
    if (trap_potential > 0) {
      dmg = add_dmg(each_hit, dmg, trap_potential);
      trap_potential = 0;
      is_lured_total = false; // safety set
    } else if (is_lured_total === false) {
      is_lured_total = true;
    }
  }

  // sound
  /*let same_track_dmg = 0;
    for (i = 0; i < sound_queue.length; i++) {
        dmg = add_dmg(each_hit, dmg, sound_queue[i]);
        same_track_dmg += sound_queue[i];
    }
    if (same_track_dmg) {
        // sound de-lures cogs
        is_lured_total = false;
    }
    // bonus damage counts as a separate hit for 2.0 cog calculations
    dmg = add_dmg(each_hit, dmg, bonus_dmg(same_track_dmg));*/
  let dmg_lure_obj = single_track_dmg(
    sound_queue,
    is_lured_total,
    each_hit,
    dmg
  );
  // // fixme debug outputs
  // if (dmg_lure_array.length !== 2) {
  //     alert("ERROR WITH SINGLE_TRACK_DMG");
  // }
  dmg = dmg_lure_obj.dmg;
  is_lured_total = dmg_lure_obj.is_lured;
  dmg_lure_obj = null;

  // throw
  dmg_lure_obj = single_track_dmg(throw_queue, is_lured_total, each_hit, dmg);
  dmg = dmg_lure_obj.dmg;
  is_lured_total = dmg_lure_obj.is_lured;
  dmg_lure_obj = null;

  // squirt
  dmg_lure_obj = single_track_dmg(squirt_queue, is_lured_total, each_hit, dmg);
  dmg = dmg_lure_obj.dmg;
  is_lured_total = dmg_lure_obj.is_lured;
  dmg_lure_obj = null;

  // drop
  // drop always misses if cog is lured
  if (!is_lured_total) {
    dmg_lure_obj = single_track_dmg(drop_queue, is_lured_total, each_hit, dmg);
    dmg = dmg_lure_obj.dmg;
    is_lured_total = dmg_lure_obj.is_lured;
    dmg_lure_obj = null;
  }

  html_healing(heal);
  html_dmg(dmg);
  html_prev_gag();

  // fixme use each_hit to calculate v2.0 cog defeated
  return each_hit;
}

// will detect whether a gag is valid for enqueueing or not
function enqueue(gag, enqueue_counter, is_lured_button) {
  // is_lured_button; // to be passed into dmg_calc;

  // fixme must sort based on gag, weakest gag used first for purposes of v2.0 calc
  console.log("enqueue counter: " + enqueue_counter);
  if (enqueue_counter === 4) {
    alert("Error: the maximum gags have already been chosen!");
    return 4;
  }
  if (gag.gag_type === "Toon-up") {
    toon_up_queue.push(gag);
  } else if (gag.gag_type === "Trap") {
    if (is_lured_button) {
      alert("Error: cannot use a Trap gag on a cog that is already lured!");
      return 0;
    }
    trap_queue.push(gag);
  } else if (gag.gag_type === "Lure") {
    if (is_lured_button) {
      alert("Cog is already lured from previous turn!");
      return 0;
    }
    lure_queue.push(gag);
  } else if (gag.gag_type === "Sound") {
    sound_queue.push(gag);
  } else if (gag.gag_type === "Throw") {
    throw_queue.push(gag);
  } else if (gag.gag_type === "Squirt") {
    squirt_queue.push(gag);
  } else if (gag.gag_type === "Drop") {
    drop_queue.push(gag);
  } else {
    alert("Gag type error!"); // should never get here
    return;
  }
  gag_queue.push(gag);
  enqueue_counter++;
  update_damage(is_lured_button);
  // html_prev_gag(); in update damage

  return enqueue_counter;
}

$(document).ready(function () {
  var enqueue_counter = 0;
  var trapped_state = EnumTrapped.UNCLICKED;
  var prev_trap_gag = null;
  var is_lured_button = false;

  $(".gag_box").mousedown(function (event) {
    switch (event.which) {
      case 1:
        enqueue_counter = enqueue(
          img_to_gag[$(this).children().attr("src")],
          enqueue_counter,
          is_lured_button
        );
        break;
      case 2:
        // alert('Middle mouse button is pressed');
        break;
      case 3:
        // alert('Right mouse button is pressed');
        enqueue_counter = enqueue(
          organic_gags[$(this).children().attr("src")],
          enqueue_counter,
          is_lured_button
        );
        break;
      default:
      // alert('Nothing');
    }
  });

  // $(".gag_box").click(function () {
  // 	//alert($(this).children().attr('src'));
  // 	//calc_dmg();
  // 	enqueue_counter = enqueue(img_to_dmg[$(this).children().attr('src')], enqueue_counter, is_lured_button);
  // });
  // fixme 2018/06/06: for future - previously trapped cog
  // 	$(".gag_box").click(function () {
  // 		//alert($(this).children().attr('src'));
  // 		//calc_dmg();
  // 		if (trapped_state === EnumTrapped.CLICKED) {
  // 			trapped_state = EnumTrapped.CHOSEN;
  // 			prev_trap_gag = img_to_gag[$(this).children().attr('src')];
  // 			html_trap(trapped_state, prev_trap_gag.gag_name);
  // 		}
  // 		else {
  // 			enqueue_counter = enqueue(img_to_gag[$(this).children().attr('src')], enqueue_counter, is_lured_button);
  // 		}
  // 	});

  // 	// three states: unclicked, clicked and waiting, trap chosen
  // 	$("#button_trapped").click(function () {
  // 		if (trapped_state === EnumTrapped.UNCLICKED) {
  // 			trapped_state = EnumTrapped.CLICKED;
  // 			html_trap(trapped_state, false);
  // 		}
  // 		else if (trapped_state == EnumTrapped.CLICKED) {
  // 			// alert("Error with trapped button");
  // 			// nothing
  // 		}
  // 		else if (trapped_state == EnumTrapped.CHOSEN) {
  // 			// nothing
  // 		}
  // 		else {
  // 			alert("Bug with Trap prev turn button!");
  // 		}
  // 	});
  $("#button_lured").click(function () {
    clear_gags(); // must clear because otherwise you can choose a lure gag and then click this
    enqueue_counter = 0;
    is_lured_button = !is_lured_button;
    $(this)
      .find("#bool_lured")
      .html(is_lured_button ? "yes" : "no");
    update_damage(is_lured_button);
    //update_prev_gag(); // should be empty
  });

  $("#button_undo").click(function () {
    enqueue_counter = undo_gag(enqueue_counter);
    update_damage(is_lured_button);
    //update_prev_gag();
  });

  // will need to update if new features come
  $("#button_reset").click(function () {
    clear_gags();
    enqueue_counter = 0;

    // prev trap stuff
    trapped_state = EnumTrapped.UNCLICKED;
    prev_trap_gag = null;
    html_trap(EnumTrapped.UNCLICKED, null);

    // lure stuff
    is_lured_button = false;
    $("#bool_lured").html("no");

    update_damage(is_lured_button);
  });
});

const cog_health_input = document.getElementById("cog_input");
const cog_hp_calculator = (event) => {
  event.preventDefault;

  let level = document.getElementById("cog_input").value;
  const hp = document.getElementById("cog_health_value");

  if (typeof level !== "string") {
    hp.textContent = "Not a valid type";
    return;
  }

  if (isNaN(level) || isNaN(parseInt(level))) {
    hp.textContent = "Not a number";
    return;
  }

  level = parseInt(level, 10);
  if (level < 1 || level > 20) {
    hp.textContent = "Invalid level";
    return;
  }

  const base = (level + 1) * (level + 2);
  const health = level >= 12 ? base + 14 : base;

  hp.textContent = health;
  return;
};

cog_health_input.addEventListener("keypress", cog_hp_calculator);
cog_health_input.addEventListener("input", cog_hp_calculator);
