import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = new URL("../diagrams/architectural/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const sheet = { w: 1600, h: 1100 };
const ink = "#121820";
const gray = "#5c6673";
const light = "#f8f7f2";
const poche = "#d8dce2";
const soft = "#eef2f5";
const dg = "#efe5cf";
const soil = "#ece7dc";
const hot = "#fff7e6";
const store = "#eef7f1";
const alert = "#a33a2a";
const blue = "#245f9f";

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
        <path d="M0,0 L10,5 L0,10 Z" fill="${ink}" />
      </marker>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 Z" fill="${blue}" />
      </marker>
      <pattern id="soil-hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="18" stroke="#c8c1b2" stroke-width="1"/>
      </pattern>
      <pattern id="deck-hatch" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M0 16 L16 0" stroke="#d1c39f" stroke-width="1"/>
      </pattern>
      <pattern id="wood-grain" width="28" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="4" x2="28" y2="4" stroke="#b78953" stroke-width="1"/>
      </pattern>
      <style>
        .sheet-bg{fill:#fffdf8}
        .border{fill:none;stroke:${ink};stroke-width:2}
        .title-line{stroke:${ink};stroke-width:1.2}
        .wall{fill:${poche};stroke:${ink};stroke-width:4}
        .cut{fill:#fffdf8;stroke:${ink};stroke-width:3}
        .thin{fill:none;stroke:${ink};stroke-width:1.4}
        .med{fill:none;stroke:${ink};stroke-width:2.2}
        .heavy{fill:none;stroke:${ink};stroke-width:4}
        .dim{fill:none;stroke:${ink};stroke-width:1.2;marker-start:url(#arrow);marker-end:url(#arrow)}
        .ext{stroke:${gray};stroke-width:1;stroke-dasharray:5 5}
        .label{font:500 22px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;fill:${ink}}
        .small{font:500 16px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;fill:${ink}}
        .tiny{font:500 13px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;fill:${ink}}
        .dimtxt{font:700 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;fill:${ink}}
        .note{font:500 15px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;fill:${gray}}
        .title{font:800 28px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;fill:${ink}}
        .sheetno{font:900 38px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;fill:${ink}}
        .badge{font:800 13px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;fill:#fff}
      </style>
    </defs>`;
}

function titleBlock(no, title, subtitle) {
  return `
    <rect x="40" y="40" width="${sheet.w - 80}" height="${sheet.h - 80}" class="border"/>
    <line x1="40" y1="980" x2="${sheet.w - 40}" y2="980" class="title-line"/>
    <line x1="1160" y1="980" x2="1160" y2="${sheet.h - 40}" class="title-line"/>
    <text x="64" y="1024" class="title">${esc(title)}</text>
    <text x="64" y="1052" class="note">${esc(subtitle)}</text>
    <text x="1190" y="1030" class="sheetno">${esc(no)}</text>
    <text x="1190" y="1056" class="tiny">Side Yard Sauna · planning set · inches</text>`;
}

function svg(no, title, subtitle, body, desc) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${sheet.w}" height="${sheet.h}" viewBox="0 0 ${sheet.w} ${sheet.h}" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(desc)}</desc>
  ${defs()}
  <rect width="1600" height="1100" class="sheet-bg"/>
  ${titleBlock(no, title, subtitle)}
  ${body}
</svg>`;
}

function line(x1, y1, x2, y2, cls = "thin") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
}

function rect(x, y, w, h, cls, extra = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}" ${extra}/>`;
}

function text(x, y, value, cls = "small", anchor = "start", extra = "") {
  return `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" ${extra}>${esc(value)}</text>`;
}

function dimH(x1, x2, y, label, offset = 22) {
  return `
    ${line(x1, y - offset, x1, y + 8, "ext")}
    ${line(x2, y - offset, x2, y + 8, "ext")}
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="dim"/>
    ${text((x1 + x2) / 2, y - 8, label, "dimtxt", "middle")}`;
}

function dimV(x, y1, y2, label, rotate = true) {
  const tx = x - 8;
  const ty = (y1 + y2) / 2;
  return `
    ${line(x - 8, y1, x + 24, y1, "ext")}
    ${line(x - 8, y2, x + 24, y2, "ext")}
    <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="dim"/>
    ${text(tx, ty, label, "dimtxt", "middle", rotate ? `transform="rotate(-90 ${tx} ${ty})"` : "")}`;
}

function leader(x1, y1, x2, y2, label, cls = "small") {
  return `
    <path d="M${x1} ${y1} L${x2} ${y2}" class="thin"/>
    <circle cx="${x1}" cy="${y1}" r="4" fill="${ink}"/>
    ${text(x2 + 8, y2 + 5, label, cls)}`;
}

function badge(x, y, value) {
  return `
    <circle cx="${x}" cy="${y}" r="12" fill="${ink}" stroke="#fffdf8" stroke-width="2"/>
    ${text(x, y + 5, value, "badge", "middle")}`;
}

function planSheet() {
  const s = 6;
  const x = 280;
  const y = 210;
  const extW = 148 * s;
  const extD = 96 * s;
  const platformW = 150 * s;
  const platformD = 98 * s;
  const padX = x;
  const padY = y;
  const padW = 120 * s;
  const padD = 96 * s;
  const wall = 6 * s;
  const hotX = x + wall;
  const hotY = y + wall;
  const hotW = 70 * s;
  const hotD = 84 * s;
  const divX = hotX + hotW;
  const divW = 6 * s;
  const sideX = divX + divW;
  const sideW = 60 * s;
  const doorW = 30 * s;
  const doorX = hotX + (hotW - doorW) / 2;
  const frontY = y + extD;
  const heaterCx = divX - 15 * s;
  const heaterCy = frontY - wall - 19 * s;
  return svg(
    "A101",
    "Revised Floor Plan",
    "Hot room 70 x 84 clear · sidecar storage 60 x 84 clear · exterior wall footprint 148 x 96",
    `
      ${rect(padX + padW, y - s, platformW - padW + s, platformD, "", `fill="url(#soil-hatch)" stroke="#c8c1b2" stroke-width="1"`)}
      ${rect(x - s, y - s, platformW, platformD, "", `fill="url(#deck-hatch)" stroke="#4b5563" stroke-width="2" stroke-dasharray="8 6"`)}
      ${rect(padX, padY, padW, padD, "", `fill="${dg}" stroke="#8c7b59" stroke-width="2" stroke-dasharray="9 7"`)}
      ${text(padX + padW / 2, padY + 32, "existing compacted DG pad · 120 x 96", "small", "middle")}
      ${text(padX + padW + 15 * s, padY + 32, "soil beyond pad", "small", "middle")}
      ${rect(x, y, extW, extD, "wall")}
      ${rect(hotX, hotY, hotW, hotD, "cut", `fill="${hot}"`)}
      ${rect(divX, hotY, divW, hotD, "wall")}
      ${rect(sideX, hotY, sideW, hotD, "cut", `fill="${store}"`)}
      ${rect(doorX, frontY - wall - 1, doorW, wall + 4, "", `fill="#fffdf8" stroke="#fffdf8" stroke-width="2"`)}
      <path d="M${doorX} ${frontY} A${doorW} ${doorW} 0 0 0 ${doorX + doorW} ${frontY + doorW}" class="thin"/>
      ${line(doorX, frontY, doorX + doorW, frontY, "med")}
      ${text(doorX + doorW / 2, frontY + 42, "30 in out-swing sauna door", "tiny", "middle")}
      ${rect(sideX + 15 * s, frontY - wall - 1, 30 * s, wall + 4, "", `fill="#fffdf8" stroke="#fffdf8" stroke-width="2"`)}
      <path d="M${sideX + 15 * s} ${frontY} A${30 * s} ${30 * s} 0 0 0 ${sideX + 45 * s} ${frontY + 30 * s}" class="thin"/>
      ${line(sideX + 15 * s, frontY, sideX + 45 * s, frontY, "med")}
      ${text(sideX + 30 * s, frontY + 42, "storage door", "tiny", "middle")}
      ${rect(hotX, hotY, hotW, 24 * s, "", `fill="url(#wood-grain)" stroke="${ink}" stroke-width="1.6"`)}
      ${rect(hotX, hotY, 24 * s, 52 * s, "", `fill="url(#wood-grain)" stroke="${ink}" stroke-width="1.6"`)}
      ${rect(hotX, hotY + 24 * s, 50 * s, 18 * s, "", `fill="#f4ddba" stroke="${ink}" stroke-width="1.2"`)}
      ${rect(hotX + 24 * s, hotY + 24 * s, 48 * s, 18 * s, "", `fill="#f4ddba" stroke="${ink}" stroke-width="1.2"`)}
      ${rect(hotX + 27 * s, frontY - wall - 26 * s, 22 * s, 11 * s, "", `fill="#f4ddba" stroke="${ink}" stroke-width="1.2"`)}
      ${text(hotX + 35 * s, hotY + 19 * s, "upper bench", "tiny", "middle")}
      ${text(hotX + 10 * s, hotY + 50 * s, "return", "tiny", "middle", `transform="rotate(-90 ${hotX + 10 * s} ${hotY + 50 * s})"`)}
      ${rect(heaterCx - 14 * s, heaterCy - 14 * s, 28 * s, 28 * s, "", `fill="none" stroke="${alert}" stroke-width="2.4" stroke-dasharray="10 6"`)}
      <circle cx="${heaterCx}" cy="${heaterCy}" r="${9.0625 * s}" fill="#2b2f36" stroke="${ink}" stroke-width="2"/>
      <circle cx="${heaterCx}" cy="${heaterCy}" r="${5.4 * s}" fill="#6d747d" stroke="#fff" stroke-width="1"/>
      ${text(heaterCx, heaterCy + 4, "18 in", "tiny", "middle", `fill="#fff"`)}
      ${text(heaterCx, heaterCy + 24 * s, "28 x 28 heater planning zone", "tiny", "middle")}
      ${rect(sideX + 6 * s, hotY + 6 * s, sideW - 12 * s, 12 * s, "", `fill="#d8ebdd" stroke="${ink}" stroke-width="1.2"`)}
      ${rect(sideX + sideW - 14 * s, hotY + 22 * s, 8 * s, 50 * s, "", `fill="#d8ebdd" stroke="${ink}" stroke-width="1.2"`)}
      ${text(sideX + sideW / 2, hotY + hotD / 2, "sidecar storage · 60 x 84 clear", "small", "middle")}
      ${text(hotX + hotW / 2, hotY + hotD / 2 + 20, "hot room · 70 x 84 clear", "small", "middle")}
      ${dimH(x, x + extW, y - 58, "148 exterior wall footprint")}
      ${dimH(hotX, hotX + hotW, y - 22, "70 hot room")}
      ${dimH(sideX, sideX + sideW, y - 22, "60 sidecar")}
      ${dimH(padX, padX + padW, y + extD + 92, "120 existing DG pad")}
      ${dimV(x - 64, y, y + extD, "96 exterior depth")}
      ${dimV(x - 22, hotY, hotY + hotD, "84 clear interior depth")}
      ${leader(x + extW + 34, y + 32, x + extW + 86, y - 20, "roof/eaves must be designed separately", "tiny")}
      ${leader(x + extW + 12, y + extD - 40, x + extW + 78, y + extD + 6, "sidecar-side extension lands on soil piers", "tiny")}
      ${text(x + extW / 2, y + extD + 132, "Front / approach side", "label", "middle")}
      ${line(x + extW / 2 - 90, y + extD + 146, x + extW / 2 + 90, y + extD + 146, "med")}
      <path d="M${x + extW / 2 + 90} ${y + extD + 146} l-18 -8 l0 16 z" fill="${ink}"/>
      <g transform="translate(1240 208)">
        ${text(0, 0, "Plan notes", "label")}
        ${text(0, 38, "1. Sidecar is now a real 5 ft clear storage bay.", "note")}
        ${text(0, 70, "2. Sidecar side extends 28 in beyond the DG pad.", "note")}
        ${text(0, 102, "3. Hold hot-room width at 70 in; depth grows to 84 in.", "note")}
        ${text(0, 134, "4. Heater remains on the right side of the hot room.", "note")}
        ${text(0, 166, "5. Door and heater trim still get field verification.", "note")}
      </g>`,
    "Architectural floor plan of the revised sidecar sauna showing dimensions, walls, benches, heater zone, doors, DG pad, and storage bay."
  );
}

function foundationSheet() {
  const s = 6;
  const x = 300;
  const y = 220;
  const w = 150 * s;
  const d = 98 * s;
  const padX = x;
  const padY = y + 1 * s;
  const padW = 120 * s;
  const padD = 96 * s;
  const wallX = x + 1 * s;
  const wallY = y + 1 * s;
  const wallW = 148 * s;
  const wallD = 96 * s;
  const dividerX = wallX + (6 + 70) * s;
  const dividerW = 6 * s;
  const heaterBlockX = wallX + (6 + 43) * s;
  const heaterBlockY = wallY + (96 - 6 - 34) * s;
  const cols = [6, 40.5, 75, 109.5, 144].map((v) => x + v * s);
  const rows = [6, 49, 92].map((v) => y + v * s);
  const piers = cols.flatMap((cx) => rows.map((cy) => [cx, cy]));
  return svg(
    "S101",
    "Foundation And Pier Grid",
    "Recommended strong scheme: 15 piers · 5 front-to-back beam lines · outer piers extend onto soil",
    `
      ${rect(x + padW, y, w - padW, d, "", `fill="url(#soil-hatch)" stroke="#c8c1b2" stroke-width="1"`)}
      ${rect(padX, padY, padW, padD, "", `fill="${dg}" stroke="#8c7b59" stroke-width="2" stroke-dasharray="9 7"`)}
      ${text(padX + padW / 2, padY + 66, "existing DG pad", "small", "middle")}
      ${text(x + padW + (w - padW) / 2, padY + 66, "sidecar soil extension", "small", "middle")}
      ${rect(x, y, w, d, "", `fill="none" stroke="${ink}" stroke-width="3"`)}
      ${rect(wallX, wallY, wallW, wallD, "", `fill="none" stroke="${alert}" stroke-width="2" stroke-dasharray="12 8"`)}
      ${rect(dividerX, wallY, dividerW, wallD, "", `fill="rgba(163,58,42,0.08)" stroke="${alert}" stroke-width="2" stroke-dasharray="7 5"`)}
      ${rect(heaterBlockX, heaterBlockY, 34 * s, 28 * s, "", `fill="none" stroke="${alert}" stroke-width="2" stroke-dasharray="7 5"`)}
      ${rect(wallX + 6 * s, wallY + 6 * s, 70 * s, 18 * s, "", `fill="none" stroke="${blue}" stroke-width="2" stroke-dasharray="8 6"`)}
      ${cols.map((cx) => `<line x1="${cx}" y1="${rows[0]}" x2="${cx}" y2="${rows[2]}" stroke="${ink}" stroke-width="3"/>`).join("")}
      ${rows.map((ry) => `<line x1="${cols[0]}" y1="${ry}" x2="${cols[4]}" y2="${ry}" stroke="#4b5563" stroke-width="1.5" stroke-dasharray="9 6"/>`).join("")}
      ${piers.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="${6 * s}" fill="#fffdf8" stroke="${ink}" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${1.5 * s}" fill="${ink}"/>`).join("")}
      ${text(cols[0], rows[2] + 46, "A", "label", "middle")}
      ${text(cols[1], rows[2] + 46, "B", "label", "middle")}
      ${text(cols[2], rows[2] + 46, "C", "label", "middle")}
      ${text(cols[3], rows[2] + 46, "D", "label", "middle")}
      ${text(cols[4], rows[2] + 46, "E", "label", "middle")}
      ${text(cols[4] + 46, rows[0] + 8, "1", "label")}
      ${text(cols[4] + 46, rows[1] + 8, "2", "label")}
      ${text(cols[4] + 46, rows[2] + 8, "3", "label")}
      ${dimH(x, x + w, y - 60, "150 foundation platform")}
      ${dimH(padX, padX + padW, y + d + 70, "120 existing DG pad")}
      ${dimV(x - 78, y, y + d, "98 foundation depth")}
      ${dimV(x - 28, padY, padY + padD, "96 DG depth")}
      ${dimH(cols[0], cols[1], y - 22, "34 1/2 typ.")}
      ${dimH(cols[1], cols[2], y - 22, "34 1/2")}
      ${dimH(cols[2], cols[3], y - 22, "34 1/2")}
      ${dimH(cols[3], cols[4], y - 22, "34 1/2")}
      ${dimV(x + w + 50, rows[0], rows[1], "43")}
      ${dimV(x + w + 50, rows[1], rows[2], "43")}
      ${leader(cols[4], rows[1], x + w + 95, rows[1] - 60, "outer pier line in soil", "tiny")}
      ${leader(heaterBlockX + 34 * s, heaterBlockY + 14 * s, x + w + 95, rows[1] + 22, "blocking zones dashed", "tiny")}
      ${text(x + w / 2, y + d + 118, "Use final pier depth, diameter, rebar, and inspection sequence from local code / site soil.", "note", "middle")}
      <g transform="translate(1235 220)">
        ${text(0, 0, "Grid rules", "label")}
        ${text(0, 38, "1. 12 in tubes shown as planning default.", "note")}
        ${text(0, 70, "2. Pier centers inset 6 in from platform edge.", "note")}
        ${text(0, 102, "3. Beam lines run front-to-back over piers.", "note")}
        ${text(0, 134, "4. Joists run left-to-right across beams.", "note")}
        ${text(0, 166, "5. Red dashed lines show wall/divider/heater load zones.", "note")}
        ${text(0, 198, "6. Cut short posts to make beam plane level.", "note")}
      </g>`,
    "Foundation plan showing a 150 by 98 inch platform, the existing 120 by 96 inch DG pad, and fifteen concrete pier locations."
  );
}

function sectionSheet() {
  const x = 250;
  const floorY = 780;
  const s = 6;
  const interiorD = 84 * s;
  const wall = 6 * s;
  const ceiling = floorY - 96 * s;
  const roofHigh = ceiling - 56;
  const roofLow = ceiling - 16;
  const frontX = x;
  const backX = x + (96 * s);
  const clearFront = x + wall;
  const clearBack = clearFront + interiorD;
  const upperY = floorY - 51 * s;
  const footY = floorY - 35 * s;
  const stepY = floorY - 17 * s;
  const heaterX = clearFront + 25 * s;
  return svg(
    "A201",
    "Hot Room Section",
    "96 in ceiling case · bench heights, ceiling relationship, heater, and schematic air path",
    `
      ${rect(frontX, ceiling, 96 * s, 96 * s, "", `fill="#fffdf8" stroke="${ink}" stroke-width="4"`)}
      ${rect(clearFront, ceiling + wall, interiorD, 84 * s, "", `fill="${hot}" stroke="${ink}" stroke-width="1.5"`)}
      <path d="M${frontX - 10} ${roofHigh} L${backX + 18} ${roofLow} L${backX + 18} ${roofLow + 24} L${frontX - 10} ${roofHigh + 24} Z" fill="#f0f2f4" stroke="${ink}" stroke-width="3"/>
      ${rect(clearBack - 24 * s, upperY - 5, 24 * s, 5, "", `fill="${ink}" stroke="${ink}" stroke-width="1"`)}
      ${rect(clearBack - 24 * s, upperY - 8, 24 * s, 14, "", `fill="url(#wood-grain)" stroke="${ink}" stroke-width="1.5"`)}
      ${rect(clearBack - 42 * s, footY - 8, 42 * s, 14, "", `fill="url(#wood-grain)" stroke="${ink}" stroke-width="1.5"`)}
      ${rect(clearFront + 18 * s, stepY - 8, 24 * s, 14, "", `fill="url(#wood-grain)" stroke="${ink}" stroke-width="1.5"`)}
      <circle cx="${heaterX}" cy="${floorY - 15 * s}" r="${9 * s}" fill="#2b2f36" stroke="${ink}" stroke-width="2"/>
      ${rect(heaterX - 14 * s, floorY - 29 * s, 28 * s, 28 * s, "", `fill="none" stroke="${alert}" stroke-width="2" stroke-dasharray="8 6"`)}
      <path d="M${heaterX + 6 * s} ${floorY - 21 * s} C${heaterX + 22 * s} ${floorY - 50 * s}, ${clearBack - 28 * s} ${floorY - 72 * s}, ${clearBack - 20 * s} ${floorY - 86 * s}" fill="none" stroke="${blue}" stroke-width="3" marker-end="url(#arrow-blue)"/>
      <path d="M${clearBack - 8 * s} ${floorY - 6 * s} C${clearBack - 40 * s} ${floorY - 6 * s}, ${clearFront + 18 * s} ${floorY - 10 * s}, ${heaterX - 8 * s} ${floorY - 18 * s}" fill="none" stroke="${blue}" stroke-width="2" stroke-dasharray="8 6" marker-end="url(#arrow-blue)"/>
      ${rect(clearFront - 2, floorY - 28 * s, 5, 18 * s, "", `fill="${blue}" stroke="${blue}" stroke-width="1"`)}
      ${rect(clearBack - 3, floorY - 20 * s, 6, 11 * s, "", `fill="${blue}" stroke="${blue}" stroke-width="1"`)}
      ${rect(clearBack - 3, ceiling + 14 * s, 6, 10 * s, "", `fill="${blue}" stroke="${blue}" stroke-width="1"`)}
      ${text(clearFront - 22, floorY - 26 * s, "supply near heater", "tiny", "end")}
      ${text(clearBack - 10, floorY - 18 * s, "low exhaust", "tiny", "end")}
      ${text(clearBack - 10, ceiling + 19 * s, "drying vent", "tiny", "end")}
      ${dimV(frontX - 52, floorY, ceiling, "96 finished ceiling target")}
      ${dimV(clearBack + 82, upperY, ceiling, "45 top bench to ceiling")}
      ${dimV(clearBack + 122, floorY, upperY, "51 upper bench")}
      ${dimV(clearBack + 162, floorY, footY, "35 foot platform")}
      ${dimV(clearFront + 24, floorY, stepY, "17 lower step")}
      ${dimH(clearFront, clearBack, floorY + 54, "84 clear hot-room depth")}
      ${badge(clearBack - 12 * s, upperY - 18, "1")}
      ${badge(clearBack - 20 * s, footY - 18, "2")}
      ${badge(heaterX + 12 * s, floorY - 28 * s, "3")}
      ${badge(clearBack - 2, ceiling + 18 * s, "4")}
      <g transform="translate(1055 292)">
        ${text(0, 0, "Section notes", "label")}
        ${text(0, 38, "1. Upper bench: 24 in comfortable sitting depth.", "note")}
        ${text(0, 70, "2. Foot platform supports main seats and return posture.", "note")}
        ${text(0, 102, "3. HIVE Mini 9; confirm current clearances at install.", "note")}
        ${text(0, 134, "4. Vent side locations are controlled by E101.", "note")}
      </g>
      <g transform="translate(1055 530)">
        ${text(0, 0, "Performance targets", "label")}
        ${text(0, 38, "• Feet stay high, above the stone line.", "note")}
        ${text(0, 70, "• Room is for sitting, not lying down.", "note")}
        ${text(0, 102, "• Vents are framed before foil/cladding.", "note")}
        ${text(0, 134, "• If ceiling is 94-95 in, lower benches to hold 44-46 in above upper bench.", "note")}
      </g>`,
    "Section drawing of the sauna hot room showing bench heights, ceiling height, heater position, and ventilation path."
  );
}

function elevationSheet() {
  const s = 6;
  const x = 250;
  const gradeY = 800;
  const w = 148 * s;
  const wallH = 96 * s;
  const roofRise = 44;
  const hotW = 70 * s;
  const divW = 6 * s;
  const sideW = 60 * s;
  const hotX = x + 6 * s;
  const sideX = hotX + hotW + divW;
  const doorW = 30 * s;
  const doorH = 80 * s;
  const saunaDoorX = hotX + (hotW - doorW) / 2;
  const storeDoorX = sideX + 15 * s;
  return svg(
    "A301",
    "Front Elevation And Roof Control",
    "Single integrated shed form · two doors under one roof plane · DG pad shown dashed",
    `
      ${rect(x + 14 * s, gradeY - 6, 120 * s, 12, "", `fill="${dg}" stroke="#8c7b59" stroke-width="1.5" stroke-dasharray="8 6"`)}
      ${rect(x, gradeY - wallH, w, wallH, "", `fill="#f7f5ef" stroke="${ink}" stroke-width="3"`)}
      ${Array.from({ length: 18 }, (_, i) => line(x + i * 52, gradeY - wallH, x + i * 52, gradeY, "thin")).join("")}
      <path d="M${x - 18} ${gradeY - wallH - roofRise} L${x + w + 20} ${gradeY - wallH - 8} L${x + w + 20} ${gradeY - wallH + 14} L${x - 18} ${gradeY - wallH - roofRise + 22} Z" fill="#e6eaee" stroke="${ink}" stroke-width="3"/>
      ${rect(saunaDoorX, gradeY - doorH, doorW, doorH, "", `fill="#fffdf8" stroke="${ink}" stroke-width="2.5"`)}
      ${rect(saunaDoorX + 4 * s, gradeY - doorH + 7 * s, 22 * s, 67 * s, "", `fill="#dcecf7" stroke="${ink}" stroke-width="1.5"`)}
      ${text(saunaDoorX + doorW / 2, gradeY + 34, "30 x 80 sauna door", "tiny", "middle")}
      ${rect(storeDoorX, gradeY - 76 * s, 30 * s, 76 * s, "", `fill="#f0eadf" stroke="${ink}" stroke-width="2.2"`)}
      ${line(storeDoorX + 15 * s, gradeY - 76 * s, storeDoorX + 15 * s, gradeY, "thin")}
      ${text(storeDoorX + 15 * s, gradeY + 34, "sidecar storage door", "tiny", "middle")}
      ${line(x + 6 * s + hotW, gradeY - wallH, x + 6 * s + hotW, gradeY, "med")}
      ${line(x + 6 * s + hotW + divW, gradeY - wallH, x + 6 * s + hotW + divW, gradeY, "med")}
      ${dimH(x, x + w, gradeY - wallH - 86, "148 exterior wall footprint")}
      ${dimH(x + 14 * s, x + 134 * s, gradeY + 78, "120 existing DG pad")}
      ${dimV(x - 54, gradeY, gradeY - wallH, "96 wall height planning")}
      ${leader(x + w + 24, gradeY - wallH - 8, x + w + 96, gradeY - wallH - 80, "controlled drip/gutter side", "tiny")}
      ${leader(saunaDoorX + doorW / 2, gradeY - doorH - 8, x + w + 96, gradeY - wallH + 58, "door needs pan + head flashing", "tiny")}
      ${text(x + w / 2, gradeY - wallH - 128, "Front / approach elevation", "label", "middle")}
      <g transform="translate(1160 235)">
        ${text(0, 0, "Exterior intent", "label")}
        ${text(0, 38, "1. One siding pattern across sauna and sidecar.", "note")}
        ${text(0, 70, "2. Sidecar must look integrated, not attached later.", "note")}
        ${text(0, 102, "3. Keep roof water away from panel and fence.", "note")}
        ${text(0, 134, "4. Use warm shielded light near landing.", "note")}
        ${text(0, 166, "5. Maintain service access around electrical panel.", "note")}
      </g>`,
    "Front elevation of the revised sidecar sauna showing one roof plane, sauna door, sidecar door, DG pad width, and roof water notes."
  );
}

function wallBaseSheet() {
  const x = 300;
  const y = 170;
  return svg(
    "A401",
    "Floor Pan, Wall Base, And Rainscreen Detail",
    "The inch that keeps water out of hidden framing",
    `
      ${rect(x + 220, y + 120, 90, 620, "", `fill="#d8dce2" stroke="${ink}" stroke-width="3"`)}
      ${rect(x + 310, y + 120, 26, 620, "", `fill="#fff3c4" stroke="${ink}" stroke-width="1.4"`)}
      ${rect(x + 336, y + 120, 12, 620, "", `fill="#cfd7df" stroke="${ink}" stroke-width="1.1"`)}
      ${rect(x + 360, y + 120, 34, 620, "", `fill="#f4e4c9" stroke="${ink}" stroke-width="1.4"`)}
      ${rect(x + 394, y + 120, 28, 620, "", `fill="url(#wood-grain)" stroke="${ink}" stroke-width="1.2"`)}
      ${rect(x + 108, y + 650, 510, 32, "", `fill="#d2d6dc" stroke="${ink}" stroke-width="2"`)}
      ${rect(x + 108, y + 612, 510, 38, "", `fill="#e7e0d4" stroke="${ink}" stroke-width="1.5"`)}
      ${rect(x + 108, y + 596, 510, 16, "", `fill="#39505f" stroke="${ink}" stroke-width="1.5"`)}
      <path d="M${x + 110} ${y + 596} L${x + 422} ${y + 596} L${x + 422} ${y + 388} L${x + 374} ${y + 388} L${x + 374} ${y + 570} L${x + 110} ${y + 570} Z" fill="#88a9bf" opacity="0.26" stroke="${blue}" stroke-width="2"/>
      ${rect(x + 394, y + 548, 28, 64, "", `fill="#fffdf8" stroke="#fffdf8" stroke-width="0"`)}
      ${line(x + 394, y + 548, x + 422, y + 548, "thin")}
      ${text(x + 412, y + 538, "1/2-1 in open gap", "tiny", "middle")}
      ${rect(x + 360, y + 558, 62, 30, "", `fill="#1f2933" stroke="${ink}" stroke-width="1.2"`)}
      ${leader(x + 405, y + 570, 990, 260, "black/stainless base flashing behind shadow gap", "tiny")}
      ${leader(x + 250, y + 220, 990, 310, "2x4 wall framing", "tiny")}
      ${leader(x + 324, y + 220, 990, 360, "mineral wool insulation", "tiny")}
      ${leader(x + 342, y + 220, 990, 410, "continuous foil vapor barrier, taped", "tiny")}
      ${leader(x + 378, y + 220, 990, 460, "1x2 furring creates air gap", "tiny")}
      ${leader(x + 410, y + 220, 990, 510, "sauna cladding stops above floor", "tiny")}
      ${leader(x + 250, y + 598, 990, 610, "waterproof floor turns up 4-6 in behind wall base", "tiny")}
      ${leader(x + 200, y + 636, 990, 660, "sloped tile / cleanable finish under removable duckboards", "tiny")}
      ${text(x + 254, y + 94, "Sauna interior side", "label", "middle")}
      ${text(x + 470, y + 94, "Wall layers", "label", "middle")}
      <g transform="translate(990 720)">
        ${text(0, 0, "Hold point", "label")}
        ${text(0, 38, "Do not install cladding until this base detail is visible,", "note")}
        ${text(0, 66, "waterproofed, photographed, and inspectable.", "note")}
      </g>`,
    "Architectural wall-base detail showing the sauna floor waterproofing, wall framing, insulation, foil vapor barrier, furring, cladding gap, and base flashing."
  );
}

function controlSheet() {
  const s = 7;
  const x = 285;
  const y = 170;
  const hotW = 70 * s;
  const hotD = 84 * s;
  const doorW = 30 * s;
  const doorX = x + (hotW - doorW) / 2;
  const heaterCx = x + hotW - 16 * s;
  const heaterCy = y + hotD - 24 * s;
  return svg(
    "E101",
    "Heater, Vent, And Control Rough-In",
    "Clearance zone, air path, and UKU rough-in locations to resolve before walls close",
    `
      ${rect(x, y, hotW, hotD, "", `fill="${hot}" stroke="${ink}" stroke-width="4"`)}
      ${rect(doorX, y + hotD - 2, doorW, 8, "", `fill="#fffdf8" stroke="#fffdf8"`)}
      <path d="M${doorX} ${y + hotD} A${doorW} ${doorW} 0 0 0 ${doorX + doorW} ${y + hotD + doorW}" class="thin"/>
      ${rect(heaterCx - 14 * s, heaterCy - 14 * s, 28 * s, 28 * s, "", `fill="none" stroke="${alert}" stroke-width="2.5" stroke-dasharray="10 6"`)}
      <circle cx="${heaterCx}" cy="${heaterCy}" r="${9.0625 * s}" fill="#2b2f36" stroke="${ink}" stroke-width="2.5"/>
      ${text(heaterCx, heaterCy + 5, "HIVE Mini 9", "tiny", "middle", `fill="#fff"`)}
      ${rect(x + hotW - 2, y + 26 * s, 7, 13 * s, "", `fill="${blue}" stroke="${blue}"`)}
      ${text(x + hotW + 16, y + 33 * s, "supply near heater", "tiny")}
      ${rect(x - 5, y + hotD - 20 * s, 7, 12 * s, "", `fill="${blue}" stroke="${blue}"`)}
      ${text(x - 18, y + hotD - 14 * s, "low exhaust", "tiny", "end")}
      ${rect(x - 5, y + 10 * s, 7, 10 * s, "", `fill="${blue}" stroke="${blue}"`)}
      ${text(x - 18, y + 16 * s, "drying vent", "tiny", "end")}
      <path d="M${x + hotW - 6 * s} ${y + 32 * s} C${x + hotW - 33 * s} ${y + 24 * s}, ${x + 28 * s} ${y + 18 * s}, ${x + 13 * s} ${y + 16 * s}" fill="none" stroke="${blue}" stroke-width="3" marker-end="url(#arrow-blue)"/>
      <path d="M${x + 12 * s} ${y + hotD - 14 * s} C${x + 34 * s} ${y + hotD - 10 * s}, ${x + hotW - 30 * s} ${y + hotD - 16 * s}, ${heaterCx - 6 * s} ${heaterCy - 8 * s}" fill="none" stroke="${blue}" stroke-width="2" stroke-dasharray="8 6" marker-end="url(#arrow-blue)"/>
      ${text(x + 12 * s, y + 8 * s, "T", "label", "middle")}
      <circle cx="${x + 12 * s}" cy="${y + 8 * s}" r="16" fill="#fffdf8" stroke="${ink}" stroke-width="2"/>
      ${text(x + 12 * s, y + 8 * s + 6, "T", "small", "middle")}
      ${dimH(x + 12 * s, heaterCx, y - 42, "temperature sensor not above heater; keep 20 in from heater edge")}
      ${dimH(doorX, doorX + doorW, y + hotD + 62, "30 door")}
      ${leader(doorX + doorW + 10, y + hotD - 18, 910, 280, "door sensor on handle side, max 16 in AFF", "tiny")}
      ${leader(x + 12 * s, y + 8 * s, 910, 330, "temperature sensor: 6 in below ceiling in section; 20 in from corners/openings", "tiny")}
      ${leader(heaterCx + 14 * s, heaterCy - 14 * s, 910, 380, "28 x 28 planning zone stays clear until current manual clearances are checked", "tiny")}
      ${leader(x + hotW - 2, y + 32 * s, 910, 430, "vent sleeves get flashing, foil integration, dampers, and pest screens", "tiny")}
      <g transform="translate(910 510)">
        ${text(0, 0, "Electrical boundary", "label")}
        ${text(0, 38, "Electrician/AHJ owns breaker, GFCI/RCD decision,", "note")}
        ${text(0, 66, "conductor/raceway, disconnect, bonding/grounding,", "note")}
        ${text(0, 94, "controller enclosure, final terminations, and test.", "note")}
      </g>`,
    "Plan detail of heater clearance zone, door swing, ventilation rough-in, door sensor, temperature sensor, and electrical control boundary."
  );
}

const files = [
  ["arch-a101-revised-floor-plan.svg", planSheet()],
  ["arch-s101-foundation-pier-grid.svg", foundationSheet()],
  ["arch-a201-hot-room-section.svg", sectionSheet()],
  ["arch-a301-front-elevation.svg", elevationSheet()],
  ["arch-a401-floor-wall-base-detail.svg", wallBaseSheet()],
  ["arch-e101-heater-vent-control.svg", controlSheet()]
];

for (const [name, content] of files) {
  writeFileSync(join(outDir.pathname, name), content);
}

console.log(`Wrote ${files.length} architectural SVG sheets to ${outDir.pathname}`);
