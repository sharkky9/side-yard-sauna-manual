import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outDir = join(scriptDir, "../diagrams/architectural");
mkdirSync(outDir, { recursive: true });

const SHEET = { w: 1600, h: 1100 };
const INK = "#111827";
const MUTED = "#5b6470";
const LIGHT = "#f7f4ec";
const WALL = "#d9dde3";
const DG = "#efe4cc";
const SOIL = "#f2efe7";
const HOT = "#fff8e8";
const STORAGE = "#eef5ee";
const WOOD = "#d9ad6b";
const BLUE = "#245f9f";
const RED = "#a23d30";
const GREEN = "#0f766e";

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function defs() {
  return `
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="${INK}"/>
      </marker>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="${BLUE}"/>
      </marker>
      <pattern id="soil-hatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="16" stroke="#c9c1b4" stroke-width="1"/>
      </pattern>
      <pattern id="dg-hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="18" stroke="#b9a47d" stroke-width="1.2"/>
      </pattern>
      <pattern id="wood-hatch" width="34" height="10" patternUnits="userSpaceOnUse">
        <line x1="0" y1="5" x2="34" y2="5" stroke="#9a6b31" stroke-width="1"/>
      </pattern>
      <pattern id="siding" width="38" height="38" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="38" stroke="#c8ced6" stroke-width="1"/>
      </pattern>
      <style>
        .bg{fill:#fffdf8}
        .sheet-border{fill:none;stroke:${INK};stroke-width:2}
        .title-rule{stroke:${INK};stroke-width:1.2}
        .cut{fill:${WALL};stroke:${INK};stroke-width:5;stroke-linejoin:round}
        .object{fill:#fffdf8;stroke:${INK};stroke-width:2.4;stroke-linejoin:round}
        .object-light{fill:#fffdf8;stroke:${INK};stroke-width:1.4;stroke-linejoin:round}
        .hidden{fill:none;stroke:${MUTED};stroke-width:1.4;stroke-dasharray:8 6}
        .planning{fill:none;stroke:${RED};stroke-width:2.2;stroke-dasharray:10 7}
        .blue-line{fill:none;stroke:${BLUE};stroke-width:2.4}
        .blue-dash{fill:none;stroke:${BLUE};stroke-width:2;stroke-dasharray:9 6}
        .dim{fill:none;stroke:${INK};stroke-width:1.2}
        .ext{stroke:${MUTED};stroke-width:1;stroke-dasharray:5 5}
        .thin{fill:none;stroke:${INK};stroke-width:1.2}
        .med{fill:none;stroke:${INK};stroke-width:2.2}
        .heavy{fill:none;stroke:${INK};stroke-width:4}
        .title{font:800 28px Inter,ui-sans-serif,system-ui,sans-serif;fill:${INK}}
        .subtitle{font:500 15px Inter,ui-sans-serif,system-ui,sans-serif;fill:${MUTED}}
        .sheet-no{font:900 42px Inter,ui-sans-serif,system-ui,sans-serif;fill:${INK}}
        .label{font:750 22px Inter,ui-sans-serif,system-ui,sans-serif;fill:${INK}}
        .small{font:600 16px Inter,ui-sans-serif,system-ui,sans-serif;fill:${INK}}
        .tiny{font:600 13px Inter,ui-sans-serif,system-ui,sans-serif;fill:${INK}}
        .note{font:500 15px Inter,ui-sans-serif,system-ui,sans-serif;fill:${MUTED}}
        .dimtxt{font:800 17px Inter,ui-sans-serif,system-ui,sans-serif;fill:${INK}}
        .key{font:800 13px Inter,ui-sans-serif,system-ui,sans-serif;fill:#fff}
      </style>
    </defs>`;
}

function sheet(no, title, subtitle, body, desc) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SHEET.w}" height="${SHEET.h}" viewBox="0 0 ${SHEET.w} ${SHEET.h}" role="img" aria-labelledby="title desc">
  <title id="title">${esc(no)} ${esc(title)}</title>
  <desc id="desc">${esc(desc)}</desc>
  ${defs()}
  <rect width="${SHEET.w}" height="${SHEET.h}" class="bg"/>
  <rect x="42" y="42" width="${SHEET.w - 84}" height="${SHEET.h - 84}" class="sheet-border"/>
  <line x1="42" y1="980" x2="${SHEET.w - 42}" y2="980" class="title-rule"/>
  <line x1="1138" y1="980" x2="1138" y2="${SHEET.h - 42}" class="title-rule"/>
  <text x="66" y="1018" class="title">${esc(title)}</text>
  <text x="66" y="1046" class="subtitle">${esc(subtitle)}</text>
  <text x="1170" y="1026" class="sheet-no">${esc(no)}</text>
  <text x="1170" y="1050" class="tiny">Side-yard sauna planning set | not stamped</text>
  ${body}
</svg>`;
}

function line(x1, y1, x2, y2, cls = "thin") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
}

function rect(x, y, w, h, cls = "object", extra = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}" ${extra}/>`;
}

function circle(cx, cy, r, cls = "object", extra = "") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" class="${cls}" ${extra}/>`;
}

function text(x, y, value, cls = "small", anchor = "start", extra = "") {
  return `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" ${extra}>${esc(value)}</text>`;
}

function multiline(x, y, lines, cls = "note", gap = 25) {
  return lines.map((item, i) => text(x, y + i * gap, item, cls)).join("");
}

function key(x, y, number) {
  return `
    <circle cx="${x}" cy="${y}" r="13" fill="${INK}" stroke="#fffdf8" stroke-width="2"/>
    ${text(x, y + 5, number, "key", "middle")}`;
}

function wrapWords(value, max = 42) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function keynoteBox(x, y, title, rows) {
  let yy = 36;
  const items = rows.map((row) => {
    const lines = wrapWords(row[1]);
    const block = `
      ${key(13, yy - 5, row[0])}
      ${lines.map((lineText, i) => text(38, yy + i * 19, lineText, "note")).join("")}`;
    yy += 26 + lines.length * 19;
    return block;
  }).join("");
  return `
    <g transform="translate(${x} ${y})">
      ${text(0, 0, title, "label")}
      ${items}
    </g>`;
}

function scheduleBox(x, y, title, rows, widths = [150, 190]) {
  const rowH = 34;
  const w = widths.reduce((sum, v) => sum + v, 0);
  const h = 40 + rowH * rows.length;
  let out = `<g transform="translate(${x} ${y})">${rect(0, 0, w, h, "object-light", `fill="#fffdf8"`)}${text(14, 27, title, "small")}${line(0, 40, w, 40, "thin")}`;
  rows.forEach((row, i) => {
    const yy = 40 + i * rowH;
    out += line(0, yy + rowH, w, yy + rowH, "thin");
    out += text(14, yy + 23, row[0], "tiny");
    out += text(widths[0] + 14, yy + 23, row[1], "tiny");
  });
  if (widths.length > 1) out += line(widths[0], 40, widths[0], h, "thin");
  out += "</g>";
  return out;
}

function dimH(x1, x2, y, label, textSide = "above") {
  const ty = textSide === "above" ? y - 9 : y + 23;
  return `
    ${line(x1, y - 24, x1, y + 18, "ext")}
    ${line(x2, y - 24, x2, y + 18, "ext")}
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="dim"/>
    ${line(x1 - 8, y + 8, x1 + 8, y - 8, "dim")}
    ${line(x2 - 8, y + 8, x2 + 8, y - 8, "dim")}
    ${text((x1 + x2) / 2, ty, label, "dimtxt", "middle")}`;
}

function dimV(x, y1, y2, label, side = "left") {
  const tx = side === "left" ? x - 10 : x + 10;
  const ty = (y1 + y2) / 2;
  const anchor = side === "left" ? "middle" : "middle";
  return `
    ${line(x - 20, y1, x + 20, y1, "ext")}
    ${line(x - 20, y2, x + 20, y2, "ext")}
    <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="dim"/>
    ${line(x - 8, y1 - 8, x + 8, y1 + 8, "dim")}
    ${line(x - 8, y2 - 8, x + 8, y2 + 8, "dim")}
    ${text(tx, ty, label, "dimtxt", anchor, `transform="rotate(-90 ${tx} ${ty})"`)}`;
}

function sectionTag(x, y, ref, sheetRef, dir = "down") {
  const up = dir === "up";
  const y2 = up ? y - 42 : y + 42;
  const triY = up ? y - 52 : y + 52;
  const tri = up
    ? `M${x - 12} ${triY + 16} L${x + 12} ${triY + 16} L${x} ${triY} Z`
    : `M${x - 12} ${triY} L${x + 12} ${triY} L${x} ${triY + 16} Z`;
  return `
    ${line(x - 54, y, x + 54, y, "med")}
    ${line(x, y, x, y2, "med")}
    <path d="${tri}" fill="${INK}"/>
    ${text(x - 24, y - 8, ref, "tiny", "end")}
    ${text(x + 24, y - 8, sheetRef, "tiny")}`;
}

function detailTag(x, y, ref, sheetRef) {
  return `
    <circle cx="${x}" cy="${y}" r="24" fill="#fffdf8" stroke="${INK}" stroke-width="2"/>
    ${line(x - 18, y, x + 18, y, "thin")}
    ${text(x, y - 6, ref, "tiny", "middle")}
    ${text(x, y + 17, sheetRef, "tiny", "middle")}`;
}

function elevationTag(x, y, sheetRef, label = "FRONT") {
  return `
    <circle cx="${x}" cy="${y}" r="25" fill="#fffdf8" stroke="${INK}" stroke-width="2"/>
    <path d="M${x - 13} ${y + 6} L${x} ${y - 12} L${x + 13} ${y + 6} Z" fill="${INK}"/>
    ${text(x, y + 42, `${label} ${sheetRef}`, "tiny", "middle")}`;
}

function fvTag(x, y, label = "FV") {
  return `
    <path d="M${x} ${y - 18} L${x + 21} ${y + 18} L${x - 21} ${y + 18} Z" fill="#fffdf8" stroke="${RED}" stroke-width="2"/>
    ${text(x, y + 9, label, "tiny", "middle", `fill="${RED}"`)}`;
}

function doorSwing(x, y, w, direction = "right") {
  if (direction === "right") {
    return `<path d="M${x} ${y} A${w} ${w} 0 0 0 ${x + w} ${y + w}" class="thin"/>${line(x, y, x + w, y, "med")}`;
  }
  return `<path d="M${x + w} ${y} A${w} ${w} 0 0 1 ${x} ${y + w}" class="thin"/>${line(x, y, x + w, y, "med")}`;
}

function arrowPath(d, cls = "blue-line") {
  return `<path d="${d}" class="${cls}" marker-end="url(#arrow-blue)"/>`;
}

const plan = {
  scale: 6,
  x: 270,
  y: 210,
  wall: 36,
  extW: 888,
  extD: 576,
  platformW: 900,
  platformD: 588,
  padW: 720,
  padD: 576,
  hotW: 420,
  hotD: 504,
  divW: 36,
  sideW: 360,
};

function siteSheet() {
  const { scale: s, x, y, extW, extD, platformW, platformD, padW, padD } = plan;
  const padX = x;
  const padY = y;
  const platformX = x;
  const platformY = y - 6;
  const overrun = platformW - padW;
  return sheet(
    "C101",
    "Site Footprint And Pad Relationship",
    "Existing 120 x 96 DG pad used as sauna-side datum; sidecar extension lands on new soil piers",
    `
      ${rect(platformX, platformY, platformW, platformD, "object-light", `fill="${SOIL}" stroke="${INK}" stroke-width="2.4"`)}
      ${rect(padX, padY, padW, padD, "object-light", `fill="url(#dg-hatch)" stroke="#8c7b59" stroke-width="2.2" stroke-dasharray="10 7"`)}
      ${rect(x + padW, platformY, overrun, platformD, "object-light", `fill="url(#soil-hatch)" stroke="#c9c1b4" stroke-width="1.2"`)}
      ${rect(x + 6, y, extW, extD, "object-light", `fill="none" stroke="${INK}" stroke-width="4"`)}
      ${rect(x + 42, y + 36, 420, 504, "object-light", `fill="${HOT}" stroke="${INK}" stroke-width="2.2"`)}
      ${rect(x + 498, y + 36, 360, 504, "object-light", `fill="${STORAGE}" stroke="${INK}" stroke-width="2.2"`)}
      ${line(x + 462, y, x + 462, y + extD, "med")}
      ${line(x + 498, y, x + 498, y + extD, "med")}
      ${key(x + 60, y + 64, "1")}
      ${key(x + padW + 55, y + 64, "2")}
      ${key(x + extW - 28, y + extD - 32, "3")}
      ${text(x + 252, y + 295, "hot room", "label", "middle")}
      ${text(x + 678, y + 295, "sidecar storage", "label", "middle")}
      ${text(x + padW / 2, y + padD + 36, "10 ft x 8 ft existing DG pad", "small", "middle")}
      ${text(x + padW + overrun / 2, y + padD + 36, "new soil footings zone", "small", "middle")}
      ${dimH(x + 6, x + 6 + extW, y - 56, "148 in exterior wall footprint")}
      ${dimH(x, x + platformW, y - 98, "150 in foundation platform")}
      ${dimH(x, x + padW, y + padD + 76, "120 in existing DG pad")}
      ${dimH(x + padW, x + platformW, y + padD + 112, "30 in platform beyond pad", "below")}
      ${dimV(x - 66, y, y + extD, "96 in exterior depth")}
      ${dimV(x - 108, platformY, platformY + platformD, "98 in foundation platform")}
      ${text(x + extW / 2, y + extD + 156, "Front / approach side", "label", "middle")}
      ${line(x + extW / 2 - 100, y + extD + 172, x + extW / 2 + 100, y + extD + 172, "med")}
      <path d="M${x + extW / 2 + 100} ${y + extD + 172} l-18 -8 l0 16 z" fill="${INK}"/>
      ${keynoteBox(1230, 232, "What this sheet decides", [
        ["1", "DG pad is a reference surface, not the whole foundation."],
        ["2", "Sidecar-side piers are dug in native soil."],
        ["3", "Roof and drainage must respect fence/panel clearance."]
      ])}
      ${scheduleBox(1230, 500, "Footprint schedule", [
        ["Hot room clear", "70 x 84 in"],
        ["Sidecar clear", "60 x 84 in"],
        ["Wall footprint", "148 x 96 in"],
        ["Platform target", "150 x 98 in"],
        ["Existing pad", "120 x 96 in"]
      ])}`,
    "Site footprint plan showing the sauna and sidecar wall footprint, existing DG pad, new soil footings zone, and foundation platform."
  );
}

function floorPlanSheet() {
  const { s = plan.scale } = {};
  const x = 260;
  const y = 205;
  const wall = 36;
  const hotX = x + wall;
  const hotY = y + wall;
  const hotW = 420;
  const hotD = 504;
  const divX = hotX + hotW;
  const sideX = divX + 36;
  const sideW = 360;
  const extW = 888;
  const extD = 576;
  const frontY = y + extD;
  const doorW = 180;
  const saunaDoorX = hotX + (hotW - doorW) / 2;
  const storageDoorX = sideX + 90;
  const heaterCx = divX - 96;
  const heaterCy = frontY - wall - 118;
  return sheet(
    "A101",
    "Floor Plan",
    "70 x 84 hot room; 60 x 84 sidecar; centered sauna door; heater on right wall",
    `
      ${rect(x, y, extW, extD, "cut")}
      ${rect(hotX, hotY, hotW, hotD, "object-light", `fill="${HOT}" stroke="${INK}" stroke-width="1.6"`)}
      ${rect(divX, hotY, 36, hotD, "cut")}
      ${rect(sideX, hotY, sideW, hotD, "object-light", `fill="${STORAGE}" stroke="${INK}" stroke-width="1.6"`)}
      ${rect(saunaDoorX, frontY - wall - 2, doorW, wall + 6, "", `fill="#fffdf8" stroke="#fffdf8"`)}
      ${doorSwing(saunaDoorX, frontY, doorW)}
      ${rect(storageDoorX, frontY - wall - 2, 180, wall + 6, "", `fill="#fffdf8" stroke="#fffdf8"`)}
      ${doorSwing(storageDoorX, frontY, 180)}
      ${rect(hotX, hotY, hotW, 144, "object-light", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="2"`)}
      ${rect(hotX, hotY, 144, 312, "object-light", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="2"`)}
      ${rect(hotX + 6, hotY + 146, 306, 108, "object-light", `fill="#f4dfbd"`)}
      ${rect(hotX + 148, hotY + 256, 268, 72, "object-light", `fill="#f6e8cf"`)}
      ${rect(hotX + 185, frontY - wall - 160, 132, 66, "object-light", `fill="#f6e8cf"`)}
      ${rect(heaterCx - 84, heaterCy - 84, 168, 168, "planning")}
      ${circle(heaterCx, heaterCy, 54, "", `fill="#2f343b" stroke="${INK}" stroke-width="2.4"`)}
      ${circle(heaterCx, heaterCy, 33, "", `fill="#747b84" stroke="#fffdf8" stroke-width="1"`)}
      ${text(heaterCx, heaterCy + 5, "18 in", "tiny", "middle", `fill="#fff"`)}
      ${rect(sideX + 42, hotY + 44, 260, 62, "object-light", `fill="#d9eadc"`)}
      ${rect(sideX + 42, hotY + 132, 260, 62, "object-light", `fill="#d9eadc"`)}
      ${rect(sideX + sideW - 74, hotY + 228, 42, 230, "object-light", `fill="#d9eadc"`)}
      ${text(hotX + hotW / 2, hotY + hotD / 2 + 20, "hot room", "label", "middle")}
      ${text(sideX + sideW / 2, hotY + hotD / 2 + 20, "sidecar", "label", "middle")}
      ${key(hotX + 350, hotY + 58, "1")}
      ${key(hotX + 70, hotY + 250, "2")}
      ${key(heaterCx + 72, heaterCy - 72, "3")}
      ${key(saunaDoorX + doorW / 2, frontY + 58, "4")}
      ${key(sideX + 290, hotY + 92, "5")}
      ${dimH(x, x + extW, y - 64, "148 in outside wall")}
      ${dimH(hotX, hotX + hotW, y - 26, "70 in clear hot room")}
      ${dimH(sideX, sideX + sideW, y - 26, "60 in clear sidecar")}
      ${dimV(x - 72, y, y + extD, "96 in outside wall")}
      ${dimV(x - 28, hotY, hotY + hotD, "84 in clear depth")}
      ${dimH(saunaDoorX, saunaDoorX + doorW, frontY + 92, "30 in sauna door", "below")}
      ${text(x + extW / 2, frontY + 142, "Front / approach side", "label", "middle")}
      ${keynoteBox(1220, 224, "Plan keynotes", [
        ["1", "24 in upper bench along back wall."],
        ["2", "24 in return seat for the third person."],
        ["3", "28 x 28 planning zone around HIVE Mini."],
        ["4", "Door centered on hot room; trim field-fit."],
        ["5", "Storage shelves stay out of hot-room envelope."]
      ])}
      ${scheduleBox(1220, 520, "Capacity read", [
        ["2 people", "excellent"],
        ["3 people", "good"],
        ["4 people", "compromised"],
        ["Use", "sitting sauna"]
      ], [120, 190])}`,
    "Floor plan showing hot room, sidecar storage bay, benches, door swings, heater planning zone, and key dimensions."
  );
}

function foundationSheet() {
  const x = 265;
  const y = 205;
  const w = 900;
  const d = 588;
  const padW = 720;
  const padD = 576;
  const cols = [36, 243, 450, 657, 864].map((v) => x + v);
  const rows = [36, 294, 552].map((v) => y + v);
  const names = ["A", "B", "C", "D", "E"];
  const pierSvg = cols.flatMap((cx, ci) =>
    rows.map((cy, ri) => `
      ${line(cx, rows[0], cx, rows[2], "med")}
      ${circle(cx, cy, 36, "", `fill="#fffdf8" stroke="${INK}" stroke-width="3"`)}
      ${circle(cx, cy, 8, "", `fill="${INK}" stroke="${INK}"`)}
      ${text(cx, cy + 58, `${names[ci]}${ri + 1}`, "tiny", "middle")}
    `)
  ).join("");
  return sheet(
    "S101",
    "Pier Grid Plan",
    "15 sonotube piers; five front-to-back beam lines; sidecar line lands in native soil",
    `
      ${rect(x + padW, y, w - padW, d, "object-light", `fill="url(#soil-hatch)" stroke="#c9c1b4" stroke-width="1.2"`)}
      ${rect(x, y + 6, padW, padD, "object-light", `fill="url(#dg-hatch)" stroke="#8c7b59" stroke-width="2.2" stroke-dasharray="10 7"`)}
      ${rect(x, y, w, d, "object-light", `fill="none" stroke="${INK}" stroke-width="3"`)}
      ${rows.map((ry) => line(cols[0], ry, cols[4], ry, "hidden")).join("")}
      ${pierSvg}
      ${rect(x + 6, y + 6, 888, 576, "", `fill="none" stroke="${RED}" stroke-width="2.3" stroke-dasharray="12 8"`)}
      ${rect(x + 42, y + 42, 420, 504, "", `fill="none" stroke="${BLUE}" stroke-width="2" stroke-dasharray="9 6"`)}
      ${rect(x + 462, y + 42, 36, 504, "", `fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="9 6"`)}
      ${text(x + padW / 2, y + 74, "existing DG pad under left 120 in", "small", "middle")}
      ${text(x + padW + (w - padW) / 2, y + 74, "new soil zone", "small", "middle")}
      ${names.map((name, i) => text(cols[i], y + d + 54, name, "label", "middle")).join("")}
      ${["1", "2", "3"].map((name, i) => text(x + w + 46, rows[i] + 7, name, "label")).join("")}
      ${dimH(x, x + w, y - 72, "150 in foundation platform")}
      ${dimH(cols[0], cols[1], y - 32, "34 1/2 in")}
      ${dimH(cols[1], cols[2], y - 32, "34 1/2 in")}
      ${dimH(cols[2], cols[3], y - 32, "34 1/2 in")}
      ${dimH(cols[3], cols[4], y - 32, "34 1/2 in")}
      ${dimV(x - 72, y, y + d, "98 in foundation depth")}
      ${dimV(x + w + 78, rows[0], rows[1], "43 in")}
      ${dimV(x + w + 78, rows[1], rows[2], "43 in")}
      ${key(cols[4], rows[1] - 52, "1")}
      ${key(x + 476, y + 314, "2")}
      ${key(x + 252, y + 72, "3")}
      ${keynoteBox(1220, 230, "Foundation keynotes", [
        ["1", "Outer beam line is beyond the existing pad."],
        ["2", "Divider/heater zones get extra blocking above."],
        ["3", "Wall outline is shown dashed over pier grid."]
      ])}
      ${scheduleBox(1220, 500, "Pier schedule", [
        ["Diameter", "12 in default"],
        ["Depth", "local frost/soil/AHJ"],
        ["Post base", "standoff type"],
        ["Posts", "cut to level beam plane"],
        ["Concrete", "calculate from actual depth"]
      ])}`,
    "Pier grid drawing showing the 150 by 98 inch foundation platform, existing DG pad, sidecar soil extension, 15 pier locations, grid labels, and foundation notes."
  );
}

function floorFramingSheet() {
  const x = 245;
  const y = 190;
  const w = 900;
  const d = 588;
  const beamXs = [36, 243, 450, 657, 864].map((v) => x + v);
  const joistYs = [0, 84, 168, 252, 336, 420, 504, 588].map((v) => y + v);
  return sheet(
    "S102",
    "Platform Framing Plan",
    "4x6 beams front-to-back; 2x8 joists left-to-right; blocking shown before subfloor",
    `
      ${rect(x, y, w, d, "object-light", `fill="#fffdf8" stroke="${INK}" stroke-width="3"`)}
      ${beamXs.map((bx) => rect(bx - 14, y + 24, 28, d - 48, "", `fill="#d7c09a" stroke="${INK}" stroke-width="2"`)).join("")}
      ${joistYs.map((jy) => rect(x + 8, jy - 7, w - 16, 14, "", `fill="#efdfc4" stroke="${INK}" stroke-width="1.3"`)).join("")}
      ${rect(x + 8, y + 8, w - 16, 26, "", `fill="#d7c09a" stroke="${INK}" stroke-width="2"`)}
      ${rect(x + 8, y + d - 34, w - 16, 26, "", `fill="#d7c09a" stroke="${INK}" stroke-width="2"`)}
      ${rect(x + 42, y + 42, 420, 504, "", `fill="none" stroke="${RED}" stroke-width="2.2" stroke-dasharray="11 7"`)}
      ${rect(x + 462, y + 42, 36, 504, "", `fill="none" stroke="${RED}" stroke-width="2.2" stroke-dasharray="11 7"`)}
      ${rect(x + 42, y + 42, 420, 144, "", `fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-dasharray="9 6"`)}
      ${rect(x + 42, y + 42, 144, 312, "", `fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-dasharray="9 6"`)}
      ${rect(x + 330, y + 372, 204, 168, "planning")}
      ${rect(x + 210, y + d - 176, 180, 94, "", `fill="none" stroke="${GREEN}" stroke-width="2.2" stroke-dasharray="9 6"`)}
      ${key(x + 640, y + 88, "1")}
      ${key(x + 228, y + 156, "2")}
      ${key(x + 432, y + 444, "3")}
      ${key(x + 300, y + d - 128, "4")}
      ${dimH(x, x + w, y - 66, "150 in platform")}
      ${dimV(x - 62, y, y + d, "98 in platform")}
      ${dimH(beamXs[0], beamXs[1], y - 26, "34 1/2 in typ.")}
      ${dimV(x + w + 54, joistYs[0], joistYs[1], "14 in nominal layout", "right")}
      ${text(x + w / 2, y + d + 58, "Front rim / threshold edge", "label", "middle")}
      ${keynoteBox(1210, 230, "Framing keynotes", [
        ["1", "Five beam lines run front-to-back over piers."],
        ["2", "Blue dashed zones: bench ledger/blocking load."],
        ["3", "Red dashed zone: heater and divider load."],
        ["4", "Green dashed zone: door threshold/step blocking."]
      ])}
      ${scheduleBox(1210, 540, "Default members", [
        ["Posts", "6x6 PT short posts"],
        ["Beams", "4x6 PT front-back"],
        ["Joists", "2x8 PT left-right"],
        ["Subfloor", "3/4 in exterior T&G"],
        ["Pest screen", "1/4 in metal mesh"]
      ])}`,
    "Platform framing drawing showing front-to-back beams, left-to-right joists, rim boards, and blocking zones for bench, heater, divider, and thresholds."
  );
}

function sectionSheet() {
  const x = 245;
  const floorY = 800;
  const clearX = x + 64;
  const clearW = 504;
  const ceilingY = floorY - 576;
  const wallX = x;
  const wallW = 620;
  const upperY = floorY - 306;
  const footY = floorY - 210;
  const stepY = floorY - 102;
  const heaterX = clearX + 128;
  return sheet(
    "A201",
    "Hot-Room Section",
    "96 in finished-ceiling case; lower benches if field ceiling lands at 94-95 in",
    `
      ${rect(wallX, ceilingY, wallW, 576, "cut")}
      ${rect(clearX, ceilingY + 36, clearW, 504, "object-light", `fill="${HOT}" stroke="${INK}" stroke-width="1.6"`)}
      <path d="M${wallX - 16} ${ceilingY - 48} L${wallX + wallW + 20} ${ceilingY - 14} L${wallX + wallW + 20} ${ceilingY + 12} L${wallX - 16} ${ceilingY - 22} Z" fill="#e7eaee" stroke="${INK}" stroke-width="3"/>
      ${rect(clearX + clearW - 144, upperY - 8, 144, 16, "", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="2"`)}
      ${rect(clearX + clearW - 252, footY - 8, 252, 16, "", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="2"`)}
      ${rect(clearX + 112, stepY - 8, 144, 16, "", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="2"`)}
      ${line(clearX + clearW - 144, upperY + 8, clearX + clearW - 144, floorY - 36, "med")}
      ${line(clearX + clearW - 252, footY + 8, clearX + clearW - 252, floorY - 36, "med")}
      ${circle(heaterX, floorY - 90, 54, "", `fill="#2f343b" stroke="${INK}" stroke-width="2.4"`)}
      ${rect(heaterX - 84, floorY - 174, 168, 168, "planning")}
      ${rect(clearX - 5, floorY - 168, 10, 94, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${rect(clearX + clearW - 5, floorY - 112, 10, 62, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${rect(clearX + clearW - 5, ceilingY + 94, 10, 58, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${arrowPath(`M${heaterX + 34} ${floorY - 124} C${heaterX + 154} ${floorY - 312}, ${clearX + clearW - 96} ${floorY - 466}, ${clearX + clearW - 84} ${ceilingY + 108}`)}
      ${arrowPath(`M${clearX + clearW - 48} ${floorY - 70} C${clearX + 280} ${floorY - 54}, ${clearX + 124} ${floorY - 72}, ${heaterX - 30} ${floorY - 108}`, "blue-dash")}
      ${key(clearX + clearW - 72, upperY - 28, "1")}
      ${key(clearX + clearW - 184, footY - 28, "2")}
      ${key(clearX + 184, stepY - 28, "3")}
      ${key(heaterX + 84, floorY - 174, "4")}
      ${dimV(wallX - 70, floorY, ceilingY, "96 in finished ceiling")}
      ${dimV(clearX + clearW + 58, upperY, ceilingY, "45 in bench to ceiling", "right")}
      ${dimV(clearX + clearW + 102, floorY, upperY, "51 in upper bench", "right")}
      ${dimV(clearX + clearW + 146, floorY, footY, "35 in foot platform", "right")}
      ${dimV(clearX - 42, floorY, stepY, "17 in lower step", "left")}
      ${dimH(clearX, clearX + clearW, floorY + 58, "84 in clear hot-room depth", "below")}
      ${keynoteBox(1005, 252, "Section keynotes", [
        ["1", "Upper bench: 24 in deep, primary comfort surface."],
        ["2", "Foot platform: leg support and secondary sitting."],
        ["3", "Lower step: access, not a comfort seat."],
        ["4", "Heater guard and clearances field-verified."]
      ])}
      ${scheduleBox(1005, 560, "Bench geometry", [
        ["Ceiling target", "94-96 in"],
        ["Drawn case", "96 in ceiling"],
        ["Top bench", "51 in AFF"],
        ["Foot platform", "35 in AFF"],
        ["Lower step", "17 in AFF"]
      ])}`,
    "Hot room section showing ceiling height, upper bench, foot platform, lower step, heater clearance zone, and schematic air path."
  );
}

function elevationSheet() {
  const x = 230;
  const grade = 805;
  const w = 888;
  const h = 576;
  const roofRise = 50;
  const saunaDoorX = x + 186;
  const storeDoorX = x + 642;
  return sheet(
    "A301",
    "Front Elevation",
    "One integrated shed form; sauna and sidecar read as one building",
    `
      ${rect(x + 84, grade - 6, 720, 12, "object-light", `fill="url(#dg-hatch)" stroke="#8c7b59" stroke-width="1.6" stroke-dasharray="8 6"`)}
      ${rect(x, grade - h, w, h, "object-light", `fill="url(#siding)" stroke="${INK}" stroke-width="3"`)}
      <path d="M${x - 22} ${grade - h - roofRise} L${x + w + 28} ${grade - h - 12} L${x + w + 28} ${grade - h + 18} L${x - 22} ${grade - h - roofRise + 30} Z" fill="#e7eaee" stroke="${INK}" stroke-width="3"/>
      ${rect(saunaDoorX, grade - 480, 180, 480, "object", `fill="#fffdf8"`)}
      ${rect(saunaDoorX + 24, grade - 438, 132, 392, "object-light", `fill="#dcecf7"`)}
      ${rect(storeDoorX, grade - 456, 180, 456, "object", `fill="#f3eadc"`)}
      ${line(storeDoorX + 90, grade - 456, storeDoorX + 90, grade, "thin")}
      ${line(x + 462, grade - h, x + 462, grade, "med")}
      ${line(x + 498, grade - h, x + 498, grade, "med")}
      ${key(saunaDoorX + 90, grade - 504, "1")}
      ${key(storeDoorX + 90, grade - 480, "2")}
      ${key(x + w + 8, grade - h - 12, "3")}
      ${key(x + 40, grade - 32, "4")}
      ${dimH(x, x + w, grade - h - 94, "148 in outside wall")}
      ${dimH(x + 84, x + 804, grade + 66, "120 in existing DG pad", "below")}
      ${dimV(x - 64, grade, grade - h, "96 in wall height")}
      ${text(saunaDoorX + 90, grade + 34, "sauna door", "small", "middle")}
      ${text(storeDoorX + 90, grade + 34, "storage door", "small", "middle")}
      ${keynoteBox(1190, 250, "Elevation keynotes", [
        ["1", "Sauna door gets sill pan, side flashing, head flashing."],
        ["2", "Sidecar door gets the same exterior flashing discipline."],
        ["3", "Control roof water; avoid panel/fence/pier splash."],
        ["4", "Keep lower trim sacrificial and away from splash where possible."]
      ])}
      ${scheduleBox(1190, 558, "Exterior intent", [
        ["Siding", "one pattern across both bays"],
        ["Roof", "single shed plane"],
        ["Lighting", "shielded warm exterior light"],
        ["Trim", "simple, durable, replaceable"]
      ])}`,
    "Front elevation showing integrated sauna and sidecar facade, doors, roof plane, siding rhythm, DG pad, and exterior weathering notes."
  );
}

function detailSheet() {
  const x = 170;
  const y = 170;
  const detail2X = 780;
  return sheet(
    "A401",
    "Wall Base And Pier Detail",
    "Two details that decide water durability: hot-room base and pier-to-beam standoff",
    `
      ${text(x, y - 38, "Detail 1 - hot-room wall base", "label")}
      ${rect(x + 210, y + 20, 88, 620, "", `fill="${WALL}" stroke="${INK}" stroke-width="3"`)}
      ${rect(x + 298, y + 20, 28, 620, "", `fill="#f5df9f" stroke="${INK}" stroke-width="1.4"`)}
      ${rect(x + 326, y + 20, 12, 620, "", `fill="#cbd4dc" stroke="${INK}" stroke-width="1.2"`)}
      ${rect(x + 356, y + 20, 32, 620, "", `fill="#ecd7b9" stroke="${INK}" stroke-width="1.4"`)}
      ${rect(x + 388, y + 20, 28, 620, "", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="1.3"`)}
      ${rect(x + 70, y + 520, 520, 36, "", `fill="#d4d8de" stroke="${INK}" stroke-width="2"`)}
      ${rect(x + 70, y + 482, 520, 38, "", `fill="#e6ded1" stroke="${INK}" stroke-width="1.5"`)}
      ${rect(x + 70, y + 466, 520, 16, "", `fill="#34495a" stroke="${INK}" stroke-width="1.5"`)}
      <path d="M${x + 72} ${y + 466} L${x + 416} ${y + 466} L${x + 416} ${y + 266} L${x + 368} ${y + 266} L${x + 368} ${y + 442} L${x + 72} ${y + 442} Z" fill="#8bb2c8" opacity="0.28" stroke="${BLUE}" stroke-width="2"/>
      ${rect(x + 388, y + 418, 28, 64, "", `fill="#fffdf8" stroke="#fffdf8"`)}
      ${line(x + 388, y + 418, x + 416, y + 418, "thin")}
      ${rect(x + 354, y + 430, 64, 28, "", `fill="#1f2937" stroke="${INK}" stroke-width="1.2"`)}
      ${key(x + 405, y + 430, "1")}
      ${key(x + 345, y + 92, "2")}
      ${key(x + 214, y + 520, "3")}
      ${key(x + 102, y + 472, "4")}
      ${multiline(x + 456, y + 96, [
        "1  Cladding stops above floor.",
        "   Leave open shadow gap.",
        "2  Foil is continuous and taped.",
        "3  Waterproofing turns up 4-6 in.",
        "4  Sloped finish under duckboards."
      ], "note", 35)}
      ${text(detail2X, y - 38, "Detail 2 - pier, post, beam, and joist", "label")}
      ${rect(detail2X + 190, y + 430, 110, 210, "", `fill="#cfd5dd" stroke="${INK}" stroke-width="3"`)}
      ${rect(detail2X + 178, y + 390, 134, 40, "", `fill="#e7eaee" stroke="${INK}" stroke-width="2"`)}
      ${rect(detail2X + 210, y + 278, 70, 112, "", `fill="#d4b07a" stroke="${INK}" stroke-width="2.4"`)}
      ${rect(detail2X + 140, y + 226, 210, 52, "", `fill="#c99d5d" stroke="${INK}" stroke-width="2.4"`)}
      ${rect(detail2X + 88, y + 168, 316, 42, "", `fill="#e5c99f" stroke="${INK}" stroke-width="2"`)}
      ${Array.from({ length: 6 }, (_, i) => line(detail2X + 98 + i * 54, y + 168, detail2X + 98 + i * 54, y + 210, "thin")).join("")}
      ${rect(detail2X + 88, y + 126, 316, 42, "", `fill="#dfe5eb" stroke="${INK}" stroke-width="1.6"`)}
      ${rect(detail2X + 186, y + 398, 118, 20, "", `fill="#adb5bd" stroke="${INK}" stroke-width="1.4"`)}
      ${key(detail2X + 314, y + 136, "5")}
      ${key(detail2X + 380, y + 188, "6")}
      ${key(detail2X + 360, y + 252, "7")}
      ${key(detail2X + 300, y + 410, "8")}
      ${multiline(detail2X + 470, y + 136, [
        "5  Subfloor over mesh and insulation.",
        "6  2x8 joists run left-right.",
        "7  4x6 beam over short 6x6 post.",
        "8  Standoff keeps post above concrete."
      ], "note", 35)}
      ${scheduleBox(1030, 708, "Field hold points", [
        ["Before cover", "photo hidden layers"],
        ["Before cladding", "confirm base gap and foil laps"],
        ["Before benches", "cold mockup body positions"]
      ], [150, 230])}`,
    "Construction detail sheet showing hot-room wall base waterproofing and a separate pier-to-beam platform section."
  );
}

function controlSheet() {
  const x = 300;
  const y = 178;
  const w = 560;
  const d = 672;
  const doorW = 240;
  const doorX = x + (w - doorW) / 2;
  const heaterCx = x + w - 128;
  const heaterCy = y + d - 170;
  return sheet(
    "E101",
    "Heater, Vent, And Control Rough-In",
    "Manufacturer clearances and electrician/AHJ requirements govern final installation",
    `
      ${rect(x, y, w, d, "cut", `fill="${HOT}"`)}
      ${rect(doorX, y + d - 4, doorW, 12, "", `fill="#fffdf8" stroke="#fffdf8"`)}
      ${line(doorX, y + d, doorX + doorW, y + d, "med")}
      ${rect(heaterCx - 112, heaterCy - 112, 224, 224, "planning")}
      ${circle(heaterCx, heaterCy, 72, "", `fill="#2f343b" stroke="${INK}" stroke-width="2.6"`)}
      ${text(heaterCx, heaterCy + 5, "HIVE Mini", "tiny", "middle", `fill="#fff"`)}
      ${rect(x + w - 5, y + 198, 12, 86, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${rect(x - 7, y + d - 178, 12, 86, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${rect(x - 7, y + 86, 12, 72, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${circle(x + 108, y + 72, 20, "object-light", `fill="#fffdf8" stroke="${INK}" stroke-width="2"`)}
      ${text(x + 108, y + 78, "T", "small", "middle")}
      ${arrowPath(`M${x + w - 38} ${y + 242} C${x + 380} ${y + 210}, ${x + 160} ${y + 154}, ${x + 96} ${y + 118}`)}
      ${arrowPath(`M${x + 48} ${y + d - 130} C${x + 220} ${y + d - 106}, ${x + 360} ${y + d - 126}, ${heaterCx - 46} ${heaterCy - 44}`, "blue-dash")}
      ${key(heaterCx + 106, heaterCy - 106, "1")}
      ${key(x + w + 28, y + 242, "2")}
      ${key(x - 28, y + d - 130, "3")}
      ${key(x - 28, y + 124, "4")}
      ${key(x + 108, y + 72, "5")}
      ${key(doorX + doorW + 28, y + d - 26, "6")}
      ${dimH(doorX, doorX + doorW, y + d + 72, "30 in door", "below")}
      ${dimH(x + 108, heaterCx, y - 48, "sensor kept away from heater zone")}
      ${text(x + w / 2, y + d + 56, "Front / door side", "label", "middle")}
      ${keynoteBox(975, 228, "Rough-in keynotes", [
        ["1", "Heater clearance envelope stays open until current manual is checked."],
        ["2", "Supply near heater, sleeved, screened, and flashed."],
        ["3", "Low exhaust on opposite side for active ventilation."],
        ["4", "High drying vent for post-bath drying cycle."],
        ["5", "Temperature sensor: follow HUUM/UKU height and offset rules."],
        ["6", "Door sensor on handle side; route before cladding."]
      ])}
      ${scheduleBox(975, 610, "Electrical boundary", [
        ["Owned by", "electrician and AHJ"],
        ["Resolve", "breaker/GFCI/disconnect"],
        ["Photo before close", "conduit, sensors, bonding"],
        ["Final test", "manufacturer startup sequence"]
      ], [150, 260])}`,
    "Electrical and ventilation rough-in plan showing heater planning zone, vents, temperature sensor, door sensor, air path, and electrical responsibility boundary."
  );
}

function coverSheet() {
  const x = 160;
  const y = 210;
  return sheet(
    "G001",
    "Drawing Index And Conventions",
    "Planning set for a side-yard sauna with integrated storage sidecar",
    `
      ${text(x, y - 52, "Side-yard sauna planning set", "title")}
      ${multiline(x, y - 14, [
        "This package is a design and construction-planning aid.",
        "It is not a permit set.",
        "Use local code review, structural review, and electrical design before building."
      ], "note", 26)}
      ${rect(x, y + 86, 520, 336, "object-light", `fill="#fffdf8"`)}
      ${rect(x + 46, y + 130, 420, 272, "object-light", `fill="url(#dg-hatch)" stroke="#8c7b59" stroke-width="1.5" stroke-dasharray="9 6"`)}
      ${rect(x + 46, y + 126, 525, 278, "object-light", `fill="none" stroke="${INK}" stroke-width="2"`)}
      ${rect(x + 66, y + 146, 245, 238, "object-light", `fill="${HOT}" stroke="${INK}" stroke-width="1.4"`)}
      ${rect(x + 338, y + 146, 206, 238, "object-light", `fill="${STORAGE}" stroke="${INK}" stroke-width="1.4"`)}
      ${line(x + 311, y + 126, x + 311, y + 404, "med")}
      ${line(x + 338, y + 126, x + 338, y + 404, "med")}
      ${text(x + 188, y + 280, "HOT ROOM", "small", "middle")}
      ${text(x + 441, y + 280, "STORAGE", "small", "middle")}
      ${dimH(x + 46, x + 571, y + 98, `148"`)}
      ${dimV(x + 18, y + 126, y + 404, `96"`)}
      ${text(x + 308, y + 458, "Footprint thumbnail", "tiny", "middle")}
      ${scheduleBox(780, 202, "Sheet index", [
        ["G001", "Drawing index and conventions"],
        ["C101", "Site footprint and pad relationship"],
        ["S101", "Pier grid plan"],
        ["S102", "Platform framing plan"],
        ["A101", "Floor plan"],
        ["A102", "Roof and reflected ceiling plan"],
        ["A201", "Hot-room section"],
        ["A202", "Cross-section through sauna and sidecar"],
        ["A301", "Front elevation"],
        ["A302", "Side and rear elevations"],
        ["A401", "Wall base and pier detail"],
        ["A402", "Door threshold and flashing detail"],
        ["A403", "Roof eave and bench ledger detail"],
        ["E101", "Heater, vent, and control rough-in"]
      ], [90, 390])}
      <g transform="translate(160 690)">
        ${text(0, 0, "Line and symbol rules", "label")}
        ${line(0, 42, 140, 42, "heavy")}${text(170, 48, "cut walls / cut structure", "note")}
        ${line(0, 82, 140, 82, "med")}${text(170, 88, "visible new work", "note")}
        ${line(0, 122, 140, 122, "hidden")}${text(170, 128, "existing, overhead, or hidden work", "note")}
        ${line(0, 162, 140, 162, "planning")}${text(170, 168, "field-verify / clearance envelope", "note")}
        ${key(620, 42, "1")}${text(690, 48, "numbered keynote; read schedule on sheet", "note")}
        ${detailTag(620, 92, "1", "A401")}${text(690, 98, "detail reference", "note")}
        ${sectionTag(620, 158, "1", "A201")}${text(690, 164, "section reference", "note")}
        ${fvTag(620, 222)}${text(690, 228, "field-verify before ordering or cutting", "note")}
      </g>`,
    "Cover sheet with drawing index, footprint thumbnail, line type rules, symbols, and planning-set disclaimer."
  );
}

function roofCeilingSheet() {
  const x = 250;
  const y = 205;
  const w = 888;
  const d = 576;
  return sheet(
    "A102",
    "Roof And Reflected Ceiling Plan",
    "Single shed roof plane; ceiling/vent/light positions resolved before framing closes",
    `
      ${rect(x - 18, y - 18, w + 36, d + 36, "hidden", `fill="none"`)}
      ${rect(x, y, w, d, "object-light", `fill="#fffdf8" stroke="${INK}" stroke-width="3"`)}
      ${rect(x + 36, y + 36, 420, 504, "object-light", `fill="${HOT}" stroke="${INK}" stroke-width="1.4"`)}
      ${rect(x + 492, y + 36, 360, 504, "object-light", `fill="${STORAGE}" stroke="${INK}" stroke-width="1.4"`)}
      ${line(x + 456, y, x + 456, y + d, "med")}
      ${line(x + 492, y, x + 492, y + d, "med")}
      ${Array.from({ length: 9 }, (_, i) => line(x + 58 + i * 42, y + 64, x + 58 + i * 42, y + 516, "thin")).join("")}
      ${Array.from({ length: 7 }, (_, i) => line(x + 528 + i * 42, y + 64, x + 528 + i * 42, y + 516, "thin")).join("")}
      ${arrowPath(`M${x + 118} ${y + 95} L${x + 778} ${y + 500}`, "blue-line")}
      ${text(x + 462, y + 278, "roof slope / water path", "small", "middle", `transform="rotate(31 ${x + 462} ${y + 278})"`)}
      ${circle(x + 216, y + 286, 26, "object-light", `fill="#fff7ce" stroke="${INK}" stroke-width="1.6"`)}
      ${text(x + 216, y + 292, "L", "small", "middle")}
      ${rect(x + 410, y + 118, 24, 62, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${rect(x + 54, y + 404, 24, 72, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${rect(x + 54, y + 92, 24, 62, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${key(x - 18, y - 18, "1")}
      ${key(x + 216, y + 242, "2")}
      ${key(x + 410, y + 102, "3")}
      ${key(x + 54, y + 388, "4")}
      ${key(x + 780, y + 500, "5")}
      ${dimH(x - 18, x + w + 18, y - 74, "roof target about 154 in wide")}
      ${dimV(x - 70, y - 18, y + d + 18, "roof target about 102 in deep")}
      ${text(x + w / 2, y + d + 70, "Front / approach side", "label", "middle")}
      ${keynoteBox(1210, 232, "Ceiling/roof keynotes", [
        ["1", "Overhang shown dashed; final by roof product and clearances."],
        ["2", "Low-glare sauna light, not directly in eyes."],
        ["3", "High drying vent location coordinated with E101."],
        ["4", "Low exhaust and supply sleeves framed before foil."],
        ["5", "Discharge roof water away from fence, panel, and piers."]
      ])}
      ${scheduleBox(1210, 540, "Close-in checks", [
        ["Ceiling height", "94-96 in target"],
        ["Cladding direction", "front-back shown"],
        ["Roof vent path", "do not trap moisture"],
        ["Penetrations", "flash and screen"]
      ])}`,
    "Roof and reflected ceiling plan showing overhang, roof slope, light, vents, ceiling cladding direction, and roof drainage path."
  );
}

function crossSectionSheet() {
  const x = 185;
  const grade = 806;
  const wallTop = 292;
  const floor = 744;
  const hotW = 420;
  const divW = 36;
  const sideW = 360;
  const wall = 36;
  const hotX = x + wall;
  const divX = hotX + hotW;
  const sideX = divX + divW;
  return sheet(
    "A202",
    "Cross-Section Through Sauna And Sidecar",
    "Shared platform and roof; hot room stays isolated from storage bay",
    `
      ${rect(x, wallTop, wall, floor - wallTop, "cut")}
      ${rect(hotX, wallTop + 36, hotW, floor - wallTop - 36, "object-light", `fill="${HOT}" stroke="${INK}" stroke-width="1.4"`)}
      ${rect(divX, wallTop, divW, floor - wallTop, "cut")}
      ${rect(sideX, wallTop + 36, sideW, floor - wallTop - 36, "object-light", `fill="${STORAGE}" stroke="${INK}" stroke-width="1.4"`)}
      ${rect(sideX + sideW, wallTop, wall, floor - wallTop, "cut")}
      <path d="M${x - 20} ${wallTop - 54} L${sideX + sideW + wall + 28} ${wallTop - 18} L${sideX + sideW + wall + 28} ${wallTop + 12} L${x - 20} ${wallTop - 24} Z" fill="#e7eaee" stroke="${INK}" stroke-width="3"/>
      ${rect(x - 10, floor, sideX + sideW + wall - x + 20, 44, "", `fill="#dfe5eb" stroke="${INK}" stroke-width="2"`)}
      ${Array.from({ length: 9 }, (_, i) => rect(x + 10 + i * 100, floor + 44, 34, 70, "", `fill="#d7b984" stroke="${INK}" stroke-width="1.6"`)).join("")}
      ${rect(hotX + hotW - 144, floor - 306, 144, 16, "", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="2"`)}
      ${rect(hotX + hotW - 252, floor - 210, 252, 16, "", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="2"`)}
      ${rect(sideX + 58, floor - 330, 230, 34, "", `fill="#d9eadc" stroke="${INK}" stroke-width="1.4"`)}
      ${rect(sideX + 58, floor - 238, 230, 34, "", `fill="#d9eadc" stroke="${INK}" stroke-width="1.4"`)}
      ${key(divX + divW / 2, wallTop + 118, "1")}
      ${key(hotX + hotW - 78, floor - 326, "2")}
      ${key(sideX + 170, floor - 360, "3")}
      ${key(x + 448, floor + 88, "4")}
      ${dimH(hotX, hotX + hotW, wallTop - 92, "70 in hot-room clear")}
      ${dimH(sideX, sideX + sideW, wallTop - 92, "60 in sidecar clear")}
      ${dimH(x, sideX + sideW + wall, wallTop - 134, "148 in outside wall")}
      ${dimV(x - 66, floor, wallTop, "finished wall height")}
      ${text(hotX + hotW / 2, floor - 146, "HOT ROOM", "label", "middle")}
      ${text(sideX + sideW / 2, floor - 146, "STORAGE", "label", "middle")}
      ${keynoteBox(1190, 244, "Cross-section keynotes", [
        ["1", "Shared wall is a thermal and moisture boundary."],
        ["2", "Bench blocking must be in the wall before foil."],
        ["3", "Sidecar shelves mount to ordinary dry-wall framing."],
        ["4", "Same platform carries both bays; no floating closet add-on."]
      ])}
      ${scheduleBox(1190, 530, "Shared wall rule", [
        ["Sauna side", "insulation, foil, furring, cladding"],
        ["Storage side", "dryable sheathing/finish"],
        ["Penetrations", "avoid; seal if unavoidable"],
        ["Venting", "storage vents separately"]
      ], [135, 275])}`,
    "Cross-section showing sauna and sidecar under one roof and on one platform, with the shared wall, floor framing, benches, and storage shelves."
  );
}

function sideRearElevationSheet() {
  const x = 190;
  const y = 210;
  const sideW = 576;
  const rearW = 888;
  const h = 420;
  return sheet(
    "A302",
    "Side And Rear Elevations",
    "Quiet elevations for fence/mechanical side yard; focus on water, vents, and service clearance",
    `
      ${text(x, y - 34, "Left/right side elevation - 96 in depth", "label")}
      ${rect(x, y, sideW, h, "object-light", `fill="url(#siding)" stroke="${INK}" stroke-width="3"`)}
      <path d="M${x - 18} ${y - 42} L${x + sideW + 18} ${y - 10} L${x + sideW + 18} ${y + 16} L${x - 18} ${y - 16} Z" fill="#e7eaee" stroke="${INK}" stroke-width="3"/>
      ${rect(x + 70, y + 105, 32, 82, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${rect(x + 460, y + 300, 34, 76, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${line(x, y + h + 28, x + sideW, y + h + 28, "hidden")}
      ${dimH(x, x + sideW, y + h + 70, "96 in exterior depth", "below")}
      ${key(x + 86, y + 94, "1")}
      ${key(x + sideW - 22, y - 8, "2")}
      ${text(x + 732, y - 34, "Rear elevation - 148 in width", "label")}
      ${rect(x + 732, y, rearW, h, "object-light", `fill="url(#siding)" stroke="${INK}" stroke-width="3"`)}
      <path d="M${x + 714} ${y - 34} L${x + 732 + rearW + 24} ${y - 34} L${x + 732 + rearW + 24} ${y - 7} L${x + 714} ${y - 7} Z" fill="#e7eaee" stroke="${INK}" stroke-width="3"/>
      ${line(x + 732 + 456, y, x + 732 + 456, y + h, "med")}
      ${line(x + 732 + 492, y, x + 732 + 492, y + h, "med")}
      ${rect(x + 732 + 90, y + 82, 36, 82, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${rect(x + 732 + 780, y + 282, 36, 82, "", `fill="${BLUE}" stroke="${BLUE}"`)}
      ${dimH(x + 732, x + 732 + rearW, y + h + 70, "148 in exterior width", "below")}
      ${key(x + 732 + 108, y + 72, "3")}
      ${key(x + 732 + 820, y + 266, "4")}
      ${keynoteBox(250, 780, "Elevation keynotes", [
        ["1", "Keep vent sleeves screened and serviceable."],
        ["2", "Overhang/drip edge cannot dump water into fence or panel zone."],
        ["3", "Rear wall can stay visually quiet; no view to frame."],
        ["4", "Low exhaust/sidecar venting should not blow into a dead damp corner."]
      ])}`,
    "Side and rear elevations showing quiet siding, roof edges, vents, grade line, and drainage concerns."
  );
}

function doorDetailSheet() {
  const x = 170;
  const y = 178;
  return sheet(
    "A402",
    "Door Threshold And Flashing Detail",
    "The sauna door is a weather opening first; the beautiful glass panel comes second",
    `
      ${text(x, y - 38, "Detail 1 - threshold pan section", "label")}
      ${rect(x + 90, y + 330, 540, 42, "", `fill="#dfe5eb" stroke="${INK}" stroke-width="2"`)}
      ${rect(x + 90, y + 290, 540, 40, "", `fill="#e9dfd0" stroke="${INK}" stroke-width="1.6"`)}
      <path d="M${x + 130} ${y + 287} L${x + 500} ${y + 287} L${x + 500} ${y + 230} L${x + 548} ${y + 230} L${x + 548} ${y + 306} L${x + 130} ${y + 306} Z" fill="#91afc2" opacity="0.3" stroke="${BLUE}" stroke-width="2"/>
      ${rect(x + 332, y + 120, 92, 184, "", `fill="#f0e4d2" stroke="${INK}" stroke-width="2.4"`)}
      ${rect(x + 160, y + 306, 172, 26, "", `fill="#d6b27a" stroke="${INK}" stroke-width="1.6"`)}
      ${rect(x + 424, y + 306, 140, 26, "", `fill="#d6b27a" stroke="${INK}" stroke-width="1.6"`)}
      ${key(x + 500, y + 242, "1")}
      ${key(x + 380, y + 104, "2")}
      ${key(x + 142, y + 306, "3")}
      ${key(x + 548, y + 306, "4")}
      ${multiline(x + 675, y + 116, [
        "1  Pan has back dam and end dams; slope out.",
        "2  Door jamb set after pan, shimmed, and fastened plumb.",
        "3  Interior duckboard/floor finish remains removable.",
        "4  Exterior threshold/landing sheds water away."
      ], "note", 36)}
      ${text(x, y + 536, "Detail 2 - head and side flashing sequence", "label")}
      ${rect(x + 150, y + 594, 290, 190, "", `fill="#fffdf8" stroke="${INK}" stroke-width="2.4"`)}
      ${rect(x + 210, y + 646, 170, 112, "", `fill="#dcecf7" stroke="${INK}" stroke-width="1.4"`)}
      ${rect(x + 132, y + 568, 326, 24, "", `fill="#9aa8b5" stroke="${INK}" stroke-width="1.4"`)}
      ${rect(x + 126, y + 592, 28, 206, "", `fill="#cbd4dc" stroke="${INK}" stroke-width="1.2"`)}
      ${rect(x + 436, y + 592, 28, 206, "", `fill="#cbd4dc" stroke="${INK}" stroke-width="1.2"`)}
      ${key(x + 146, y + 560, "5")}
      ${key(x + 126, y + 620, "6")}
      ${key(x + 458, y + 620, "7")}
      ${multiline(x + 675, y + 584, [
        "5  Head flashing laps over sides.",
        "6  Side flashing laps over pan.",
        "7  WRB laps shingle-style."
      ], "note", 36)}
      ${scheduleBox(1040, 760, "Door hold point", [
        ["Before trim", "water-test pan/head path"],
        ["Before siding", "photo flashing sequence"],
        ["Before benches", "check trim vs heater guard"]
      ], [145, 245])}`,
    "Door threshold and flashing detail showing pan flashing, back dam, head flashing, side flashing, and sequencing notes."
  );
}

function roofBenchDetailSheet() {
  const x = 160;
  const y = 168;
  const right = 820;
  return sheet(
    "A403",
    "Roof Eave And Bench Ledger Detail",
    "Moisture exits at the shell; bench loads go into framing, not cladding",
    `
      ${text(x, y - 36, "Detail 1 - vented eave / rainscreen exit", "label")}
      <path d="M${x + 90} ${y + 126} L${x + 560} ${y + 70} L${x + 568} ${y + 136} L${x + 100} ${y + 192} Z" fill="#e7eaee" stroke="${INK}" stroke-width="3"/>
      ${rect(x + 210, y + 190, 86, 360, "", `fill="${WALL}" stroke="${INK}" stroke-width="3"`)}
      ${rect(x + 296, y + 190, 24, 360, "", `fill="#f4df9f" stroke="${INK}" stroke-width="1.2"`)}
      ${rect(x + 340, y + 190, 38, 360, "", `fill="#e9d8bd" stroke="${INK}" stroke-width="1.2"`)}
      ${rect(x + 386, y + 190, 28, 360, "", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="1.2"`)}
      ${rect(x + 190, y + 178, 250, 24, "", `fill="#1f2937" stroke="${INK}" stroke-width="1.2"`)}
      ${rect(x + 180, y + 552, 258, 22, "", `fill="#1f2937" stroke="${INK}" stroke-width="1.2"`)}
      ${key(x + 438, y + 178, "1")}
      ${key(x + 180, y + 552, "2")}
      ${key(x + 326, y + 224, "3")}
      ${multiline(x + 470, y + 190, [
        "1  Drip edge and roof underlayment terminate cleanly.",
        "2  Rainscreen exits through insect-screened gap.",
        "3  Roof/ceiling cavity does not trap wet air."
      ], "note", 36)}
      ${text(right, y - 36, "Detail 2 - bench ledger into framed blocking", "label")}
      ${rect(right + 160, y + 90, 90, 520, "", `fill="${WALL}" stroke="${INK}" stroke-width="3"`)}
      ${rect(right + 250, y + 90, 18, 520, "", `fill="#cbd4dc" stroke="${INK}" stroke-width="1.2"`)}
      ${rect(right + 292, y + 90, 36, 520, "", `fill="#e9d8bd" stroke="${INK}" stroke-width="1.2"`)}
      ${rect(right + 328, y + 90, 28, 520, "", `fill="url(#wood-hatch)" stroke="${INK}" stroke-width="1.2"`)}
      ${rect(right + 90, y + 262, 238, 38, "", `fill="#d0a261" stroke="${INK}" stroke-width="2.4"`)}
      ${rect(right + 92, y + 212, 70, 120, "", `fill="#c89d64" stroke="${INK}" stroke-width="2"`)}
      ${Array.from({ length: 5 }, (_, i) => circle(right + 186 + i * 28, y + 281, 5, "", `fill="${INK}" stroke="${INK}"`)).join("")}
      ${key(right + 168, y + 210, "4")}
      ${key(right + 258, y + 246, "5")}
      ${key(right + 344, y + 164, "6")}
      ${multiline(right + 405, y + 210, [
        "4  Solid blocking is framed before insulation/foil.",
        "5  Ledger fasteners land in blocking, not cladding.",
        "6  Foil penetrations are taped before furring/cladding."
      ], "note", 36)}
      ${scheduleBox(1010, 742, "Bench hold point", [
        ["Mock up", "upper, foot, lower step, guard"],
        ["Fasteners", "stainless in hot-room finish"],
        ["Edges", "round over body-contact wood"]
      ], [120, 245])}`,
    "Detail sheet showing roof eave/rainscreen termination and bench ledger/blocking relationship."
  );
}

const files = [
  ["arch-g001-drawing-index.svg", coverSheet()],
  ["arch-c101-site-footprint.svg", siteSheet()],
  ["arch-a101-revised-floor-plan.svg", floorPlanSheet()],
  ["arch-a102-roof-ceiling-plan.svg", roofCeilingSheet()],
  ["arch-s101-foundation-pier-grid.svg", foundationSheet()],
  ["arch-s102-platform-framing-plan.svg", floorFramingSheet()],
  ["arch-a201-hot-room-section.svg", sectionSheet()],
  ["arch-a202-cross-section.svg", crossSectionSheet()],
  ["arch-a301-front-elevation.svg", elevationSheet()],
  ["arch-a302-side-rear-elevations.svg", sideRearElevationSheet()],
  ["arch-a401-floor-wall-base-detail.svg", detailSheet()],
  ["arch-a402-door-threshold-flashing.svg", doorDetailSheet()],
  ["arch-a403-roof-eave-bench-ledger.svg", roofBenchDetailSheet()],
  ["arch-e101-heater-vent-control.svg", controlSheet()],
];

for (const [name, content] of files) {
  writeFileSync(join(outDir, name), content);
}

console.log(`Wrote ${files.length} architectural SVG sheets to ${outDir}`);
