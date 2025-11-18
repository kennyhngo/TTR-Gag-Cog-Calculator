import { ASSETS, TRACK_ORDER } from "./constants.js";


export function renderGrid() {
  const body = document.getElementById("gag_table_body");
  body.innerHTML = "";

  TRACK_ORDER.forEach(track => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.className = "outer_elt";

    const inner = document.createElement("table");
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.textContent = track.toUpperCase();
    th.id = track.toLowerCase().replace(" ", "") + "_table";
    tr.appendChild(th);

    ASSETS[track].forEach(src => {
      const td = document.createElement("td");
      td.className = "gag_box";
      td.dataset.src = src;

      const img = document.createElement("img");
      img.className = "gag_img";
      img.src = src;

      td.appendChild(img);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
    inner.appendChild(tbody);
    cell.appendChild(inner);
    row.appendChild(cell);
    body.appendChild(row);
  });
}
