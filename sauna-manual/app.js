const versions = {
  sauna: {
    title: "Sauna-only reference envelope",
    diagram: "../diagrams/architectural/arch-a201-hot-room-section.svg",
    alt: "Architectural hot-room section diagram",
    caption: "Sauna-only reference: same 70 in x 84 in hot room without the storage bay.",
    dimensions: [
      ["Finished hot room", "70 in x 84 in"],
      ["Exterior wall footprint", "82 in x 96 in"],
      ["Foundation platform", "about 84 in x 98 in"],
      ["Roof target", "about 88 in x 102 in"],
      ["Pier layout", "9 piers, 3 x 3"],
      ["Best use", "cleanest build, no storage"]
    ]
  },
  sidecar: {
    title: "Sauna plus 5 ft sidecar build envelope",
    diagram: "../diagrams/architectural/arch-a101-revised-floor-plan.svg",
    alt: "Revised architectural floor plan for sauna plus sidecar",
    caption: "Sidecar footprint: 148 in wide x 96 in deep exterior wall footprint.",
    dimensions: [
      ["Finished hot room", "70 in x 84 in"],
      ["Storage clear interior", "60 in x 84 in"],
      ["Divider wall allowance", "6 in"],
      ["Exterior wall footprint", "148 in x 96 in"],
      ["Foundation platform", "about 150 in x 98 in"],
      ["Roof target", "about 154 in x 102 in"],
      ["Pier layout", "15 piers, 5 x 3"],
      ["Best use", "real storage plus sauna"]
    ]
  }
};

let currentVersion = "sidecar";

const materials = [
  {
    title: "Long-lead parts",
    tag: "order-first",
    timing: "Order before lumber",
    items: [
      "HUUM HIVE Mini 9 heater, 240 V, 9 kW.",
      "UKU control system, selected control face, door sensor, temperature sensor, required cable kit.",
      "330 lb of 2-4 in sauna stones, plus the included HIVE Mini air tunnel if current model includes it.",
      "ProSaunas 30 x 80 prehung Douglas fir sauna door, clear insulated glass, 32 x 82 rough opening.",
      "Metal roof panels or low-slope roof system selected before roof framing."
    ]
  },
  {
    title: "Concrete and pier hardware",
    tag: "foundation",
    timing: "Buy after pier layout is marked",
    items: [
      "12 in sonotube forms: 9 for sauna-only, 15 for the five-foot sidecar version.",
      "Concrete mix: estimate 4 to 5 bags of 80 lb mix per 12 in x 36 in pier, then calculate from actual pier depth.",
      "#4 rebar: two vertical bars per pier plus a small tie or cage if local practice calls for it.",
      "Simpson-style ZMAX standoff post bases sized for 6x6 posts, with anchor bolts or wet-set/post-installed anchors per product spec.",
      "Gravel for pier base pockets and drainage around tube bottoms."
    ]
  },
  {
    title: "Platform framing",
    tag: "foundation",
    timing: "Buy once pier count is final",
    items: [
      "Pressure-treated 6x6 posts for short pier-to-beam posts.",
      "Default system: pressure-treated 4x6 beams running front-to-back over the pier rows.",
      "Pressure-treated 2x8 joists and rim boards. Treat built-up beam alternatives as a connector redesign, not a casual substitution.",
      "PT-rated structural screws, joist hangers if using flush framing, blocking material, and diagonal bracing stock.",
      "1/4 in galvanized hardware cloth or stainless mesh for rodent protection below the floor."
    ]
  },
  {
    title: "Floor assembly",
    tag: "shell",
    timing: "Buy with platform materials",
    items: [
      "3/4 in exterior-rated tongue-and-groove plywood subfloor.",
      "Rigid insulation or mineral wool held above rodent mesh, protected from splash and pests.",
      "Cement board, sloped mortar bed, or compatible tile substrate under removable duckboards.",
      "Waterproofing rated for wet service and compatible with the selected floor stack, turned up behind the wall-base detail.",
      "Ceramic tile or equivalent heat-tolerant cleanable finish under and around the heater; no vinyl or plastic floor near hot stones.",
      "Aspen, alder, thermo-aspen, hemlock, or cedar duckboard stock, built as removable modules."
    ]
  },
  {
    title: "Wall and roof shell",
    tag: "shell",
    timing: "Buy after platform is square",
    items: [
      "2x4 kiln-dried framing lumber, including extra straight stock for door opening and bench blocking.",
      "2x6 or 2x8 rafters depending on roof span, slope, and insulation depth.",
      "1/2 in structural wall sheathing and 5/8 in roof sheathing.",
      "Housewrap or WRB, flashing tape for exterior penetrations, drip cap, and metal flashing.",
      "LP SmartSide, cedar, or other exterior siding with matching trim.",
      "Vertical rainscreen furring plus insect screen at top and bottom. Make the wall able to dry outward."
    ]
  },
  {
    title: "Sauna insulation and vapor layer",
    tag: "sauna",
    timing: "Buy once rough electrical is done",
    items: [
      "Mineral wool batts for walls and ceiling.",
      "Foil sauna vapor barrier and high-temperature foil tape.",
      "1x2 furring strips to create the air gap behind interior cladding.",
      "Black metal base flashing for the shadow gap at the floor.",
      "Stainless staples or corrosion-resistant fasteners compatible with the foil system."
    ]
  },
  {
    title: "Interior wood",
    tag: "sauna",
    timing: "Buy after shell is dry",
    items: [
      "About 260 sq ft of sauna-safe T&G interior cladding, including waste.",
      "Clear aspen, alder, thermo-aspen, hemlock, or mild cedar 5/4 or 2x bench stock for upper bench, return, foot bench, lower step, and backrests.",
      "Stainless trim screws, preferably square or star drive.",
      "Cedar/aspen/hemlock backrest stock and rounded guard-rail stock around the heater.",
      "No pressure-treated wood exposed inside the hot room."
    ]
  },
  {
    title: "Electrical and controls",
    tag: "electrical",
    timing: "Electrician owns final spec",
    items: [
      "Dedicated 240 V sauna circuit sized by the electrician from the HUUM manual and local code.",
      "Exterior-rated conduit path from nearby panel to sauna.",
      "Heat-resistant cable from junction point to heater where required by HUUM.",
      "Controller box location outside the hot room or per manufacturer instructions.",
      "Exterior light, interior low-glare sauna light, switches, and any required disconnect."
    ]
  },
  {
    title: "Sidecar-only materials",
    tag: "sidecar",
    scope: "sidecar",
    timing: "Only if building storage",
    items: [
      "Extra exterior wall framing for the 60 in clear x 84 in deep storage bay.",
      "Separate sidecar exterior door, likely custom narrow board-and-batten or small shed door.",
      "Shelving stock, hooks, broom/tall-tool bay, and threshold flashing.",
      "Vent slots or small screened vents so stored items do not sit in a sealed damp closet.",
      "No interior connection between sidecar and sauna."
    ]
  },
  {
    title: "Consumables and fasteners",
    tag: "shell",
    timing: "Buy more than you think",
    items: [
      "Hot-dip galvanized or approved connector nails/screws for Simpson connectors.",
      "Structural screws for beams and platform framing.",
      "Stainless screws for all hot-room interior work.",
      "Exterior-grade sealant, backer rod, shims, painters tape, and construction adhesive where appropriate.",
      "Spare blades, bits, driver tips, chalk, pencils, layout string, and contractor bags."
    ]
  }
];

const procurementWaves = [
  {
    title: "Wave 0: Freeze the constraints",
    timing: "Before orders",
    buy: [
      "Nothing expensive yet.",
      "Print or save the heater manual, door rough-opening spec, and connector base instructions.",
      "Book an electrician walkthrough if you are not already fully clear on the circuit, conduit, disconnect, and controller plan."
    ],
    wait: [
      "Do not buy finish cladding.",
      "Do not cut bench material.",
      "Do not assume pier depth from the internet."
    ]
  },
  {
    title: "Wave 1: Exact-fit and long-lead parts",
    timing: "Order first",
    buy: [
      "HUUM HIVE Mini 9, UKU controls, sensors, and the required stone quantity.",
      "The 30 x 80 prehung sauna door, with the 32 x 82 rough opening confirmed from the current spec.",
      "Roofing system, because roof thickness and edge details affect rafter and trim decisions.",
      "Any specialty sauna foil, foil tape, vent covers, and sauna lighting with lead time."
    ],
    wait: [
      "Do not buy all lumber until the sidecar decision and pier grid are physically marked.",
      "Do not buy the final sidecar door until the storage bay width is real."
    ]
  },
  {
    title: "Wave 2: Foundation and platform",
    timing: "After layout marks are on the pad",
    buy: [
      "Sonotubes, concrete, rebar, gravel, standoff bases, anchors, PT posts, beams, joists, rim boards, blocking, mesh, and platform hardware.",
      "Extra concrete bags. Returning unopened bags is better than stopping mid-pour.",
      "String, stakes, marking paint, and a fresh masonry bit if using post-installed anchors."
    ],
    wait: [
      "Do not buy wall sheathing until platform size is final.",
      "Do not buy interior finish wood while concrete and framing are still changing dimensions."
    ]
  },
  {
    title: "Wave 3: Shell and dry-in",
    timing: "After platform is square",
    buy: [
      "Wall studs, plates, roof rafters, wall sheathing, roof sheathing, WRB, flashing tape, drip edge, siding, trim, and roof fasteners.",
      "Straight premium studs for the door opening, bench blocking, and any exposed trim backing.",
      "Temporary tarps, because the shell phase often spans more days than planned."
    ],
    wait: [
      "Do not insulate until rough electrical and hidden blocking are complete.",
      "Do not side over a door or vent detail you have not flashed."
    ]
  },
  {
    title: "Wave 4: Hot-room envelope",
    timing: "After rough-in",
    buy: [
      "Mineral wool, foil vapor barrier, sauna foil tape, furring strips, stainless staples, black base flashing, vent sleeves, and fire/heat-safe sealants where specified.",
      "Interior T&G only after the shell is dry and you have re-measured the real wall and ceiling surfaces."
    ],
    wait: [
      "Do not install cladding until every foil seam and penetration has been inspected.",
      "Do not close walls before photographing hidden wire and blocking locations."
    ]
  },
  {
    title: "Wave 5: Interior, comfort, and tuning",
    timing: "After door and heater mockup",
    buy: [
      "Bench stock, backrest stock, duckboard stock, stainless trim screws, guard-rail stock, thermometer, hygrometer, robe hooks, and exterior storage hardware.",
      "Only buy premium long lengths after deciding which surfaces are visible and body-contact critical."
    ],
    wait: [
      "Do not over-finish the first heater guard. Build it serviceable, test traffic flow, then refine.",
      "Do not permanently trap duckboards, thresholds, or wall bases."
    ]
  }
];

const tripSheets = [
  {
    title: "Sauna supplier order",
    timing: "After code/electrical gate",
    vehicle: "Delivery preferred",
    confirmed: ["HIVE Mini 9 room-volume logic", "door rough opening", "UKU controller choice", "GFCI/AHJ discussion assigned"],
    reject: ["Substituting HIVE Mini 6 without recalculating glass-adjusted volume", "non-listed controls", "decorative stones"]
  },
  {
    title: "Concrete and hardware trip",
    timing: "Pier weekend",
    vehicle: "Pallet delivery or truck, not a casual car run",
    confirmed: ["pier count", "pier diameter/depth", "utility locate", "helper/mixer plan", "washout location"],
    reject: ["wrong post base size", "non-approved connector fasteners", "too few concrete bags for a continuous pour"]
  },
  {
    title: "Framing lumber delivery",
    timing: "After pier layout is fixed",
    vehicle: "Lumberyard delivery",
    confirmed: ["sauna-only vs sidecar", "platform dimensions", "beam direction", "joist direction", "dry staging area"],
    reject: ["crooked door studs", "wet finish-grade stock", "beam substitutions without connector review"]
  },
  {
    title: "Roofing, WRB, and siding order",
    timing: "After platform is square",
    vehicle: "Delivery or truck",
    confirmed: ["roof slope", "roof discharge side", "door flashing detail", "rainscreen thickness", "sidecar door if used"],
    reject: ["roof product below its minimum slope", "siding with no wet-clearance strategy", "cut metal panels before final roof width"]
  },
  {
    title: "Electrical walkthrough",
    timing: "Before close-in",
    vehicle: "No shopping trip; this is a site appointment",
    confirmed: ["panel clearance", "conduit path", "disconnect decision", "sensor locations", "light/vent control", "inspection packet"],
    reject: ["generic relay workarounds", "ordinary interior fixtures", "unprotected exterior controller location"]
  },
  {
    title: "Finish wood order",
    timing: "After dry shell and door set",
    vehicle: "Delivery or carefully protected pickup",
    confirmed: ["real interior dimensions", "bench mockup", "heater guard envelope", "wood species", "storage acclimation space"],
    reject: ["pressure-treated contact wood", "splintery bench stock", "overly aromatic cedar if the target is Finnish-neutral"]
  }
];

const toolGroups = [
  {
    title: "Layout and measuring",
    own: ["25 ft tape", "laser level", "4 ft level", "speed square", "chalk line", "string line", "marking paint"],
    rent: ["Rotary laser if the pad and pier tops are meaningfully uneven"],
    safety: ["Knee pads", "good lighting", "camera for documentation"]
  },
  {
    title: "Earthwork and concrete",
    own: ["Digging bar", "post-hole digger", "shovel", "mixing tub or wheelbarrow", "trowel", "rubber mallet"],
    rent: ["Power auger if soil allows it and access is practical", "small mixer if pouring many piers in one session"],
    safety: ["Gloves", "eye protection", "dust mask for dry mix", "wash water for concrete exposure"]
  },
  {
    title: "Framing",
    own: ["Circular saw", "miter saw", "impact driver", "drill", "clamps", "framing square", "sawhorses"],
    rent: ["Framing nailer if you want speed", "small compressor if not using cordless tools"],
    safety: ["Hearing protection", "eye protection", "stable cutting table", "fresh blades"]
  },
  {
    title: "Dry-in and exterior",
    own: ["Utility knives", "stapler", "snips", "caulk gun", "siding gauges or story pole", "ladders"],
    rent: ["Roofing brake only if flashing complexity warrants it", "siding nailer if siding choice benefits"],
    safety: ["Fall-aware ladder setup", "gloves for metal roofing", "do not roof alone if access is awkward"]
  },
  {
    title: "Sauna finish carpentry",
    own: ["Finish nailer or pin nailer", "router with roundover bit", "orbital sander", "countersink bits", "flush-cut saw"],
    rent: ["Track saw if you want cleaner sheet and bench cuts"],
    safety: ["Respirator for sanding", "shop vacuum", "soft pads to protect finish wood"]
  },
  {
    title: "Electrical handoff",
    own: ["Label maker", "camera", "notebook", "clear access path"],
    rent: ["None. The electrician brings electrical tools."],
    safety: ["Do not energize, modify, or bypass sauna controls outside the permitted electrical plan."]
  }
];

const fastenerRows = [
  ["Post bases to concrete", "Anchor type specified by the selected standoff base", "Wet-set or post-installed exactly per the connector instructions. Edge distance and embedment matter."],
  ["Connector hardware", "Manufacturer-approved connector nails or structural connector screws", "Use the fastener table for the actual connector. Do not substitute drywall, deck, or random structural screws."],
  ["PT platform framing", "Hot-dip galvanized or exterior/PT-rated structural screws and nails", "Match fastener coating to treated lumber. Use joist hangers if framing flush."],
  ["Subfloor to joists", "Exterior-rated subfloor screws or ring-shank nails", "Follow panel spacing and fastening schedule. Confirm floor assembly before committing to adhesive."],
  ["Wall sheathing", "Code/product-specified sheathing nails", "Sheathing is part of the lateral system only if fastened correctly."],
  ["WRB and flashing", "Cap staples, flashing tape, drip cap, compatible sealant", "Layer shingle-style so water always laps outward and downward."],
  ["Interior cladding", "Stainless finish nails, pins, or trim screws", "No fasteners where bare skin will rub. Keep bottom gap open."],
  ["Benches and backrests", "Stainless screws from concealed or underside faces", "Round over touch edges. Avoid resinous, splintery, or pressure-treated contact surfaces."],
  ["Heater guard", "Stainless screws into blocking", "Build after heater and door trim are real. The guard protects traffic flow; it is not decoration."],
  ["Sidecar shelving", "Exterior-rated screws into framing/blocking", "Vent the storage bay and keep shelves off the floor if damp tools may be stored."]
];

const bomItems = [
  ["Heater", "HUUM HIVE Mini 9", "1", "all", "Sauna supplier", "Order first", "No substitution to Mini 6 without revised room-volume math."],
  ["Controls", "UKU control system, sensors, cable kit", "1 set", "all", "Sauna supplier/electrician", "Order first", "Electrician/AHJ resolves GFCI, disconnect, and permit path."],
  ["Stones", "2-4 in sauna stones", "331 lb", "all", "Sauna supplier", "Order first", "Wash/inspect before loading; do not use decorative stones."],
  ["Door", "30 x 80 prehung sauna door, 32 x 82 RO", "1", "all", "Sauna supplier", "Order first", "Confirm exterior exposure suitability and flashing strategy."],
  ["Sonotubes", "12 in diameter", "9", "sauna", "Concrete/hardware", "Foundation trip", "Pier depth by local code/site soil."],
  ["Sonotubes", "12 in diameter", "15", "sidecar", "Concrete/hardware", "Foundation trip", "As-built pad survey required before sidecar order."],
  ["Concrete", "80 lb bags", "36-45", "sauna", "Concrete/hardware delivery", "Foundation trip", "Estimate for 12 x 36 in piers; calculate actual depth before purchase."],
  ["Concrete", "80 lb bags", "60-75", "sidecar", "Concrete/hardware delivery", "Foundation trip", "This is 4,800-6,000 lb dry mix; plan pallet delivery, a mixer, and helpers."],
  ["Posts", "6x6 PT", "9 short posts", "sauna", "Lumberyard", "Foundation trip", "Cut individually after bases are set."],
  ["Posts", "6x6 PT", "15 short posts", "sidecar", "Lumberyard", "Foundation trip", "Keep short; use bracing/platform for stiffness."],
  ["Beams", "4x6 PT x 8 ft", "3", "sauna", "Lumberyard", "Framing delivery", "Default beam system; do not swap without connector redesign."],
  ["Beams", "4x6 PT x 10 ft", "5", "sidecar", "Lumberyard", "Framing delivery", "Five front-to-back beam lines over the 5 x 3 pier grid."],
  ["Joists", "2x8 PT field joists", "7", "sauna", "Lumberyard", "Framing delivery", "Seven field joists plus front/back rim gives 12 in layout lines across 96 in depth."],
  ["Joists", "2x8 PT x 14 ft field joists", "7", "sidecar", "Lumberyard", "Framing delivery", "Seven field joists run left-right across the 150 in platform; front/back rims are separate."],
  ["Rim boards", "2x8 PT", "4", "all", "Lumberyard", "Framing delivery", "Cut to selected platform; label before assembly."],
  ["Wall framing", "2x4 KD studs/plates/blocking", "Buy from wall takeoff + 10%", "all", "Lumberyard", "Shell delivery", "Premium straight stock for door, bench blocking, and vent/light backing."],
  ["Sheathing", "1/2 in structural wall sheathing", "8-10 sheets", "sauna", "Lumberyard", "Shell delivery", "Final by wall layout; add one sheet if unsure."],
  ["Sheathing", "1/2 in structural wall sheathing", "12-14 sheets", "sidecar", "Lumberyard", "Shell delivery", "Includes the larger sidecar and divider; final by wall layout."],
  ["Roof sheathing", "5/8 in roof sheathing", "3 sheets", "sauna", "Lumberyard", "Shell delivery", "Depends on overhang and roof product."],
  ["Roof sheathing", "5/8 in roof sheathing", "5 sheets", "sidecar", "Lumberyard", "Shell delivery", "The revised roof is wider than the existing DG pad."],
  ["Interior cladding", "Sauna-safe T&G", "about 260 sq ft", "all", "Finish wood supplier", "After dry shell", "Aspen/alder/thermo-aspen/hemlock preferred for Finnish mood; cedar optional."],
  ["Bench stock", "Clear body-contact lumber", "Field-fit", "all", "Finish wood supplier", "After mockup", "Buy after door trim/heater guard/bench mockup."],
  ["Sidecar door/hardware", "Narrow exterior shed-style door", "1 set", "sidecar", "Lumberyard/hardware", "After as-built width", "Vent bay separately; do not store hazardous materials."]
];

const assemblySheets = [
  {
    title: "Sheet A / C101: Site fit and utility clearance",
    version: "all",
    diagram: "../diagrams/architectural/arch-c101-site-footprint.svg",
    parts: ["stakes", "string", "spray paint", "panel-clearance tape", "landing mockup"],
    method: [
      "Mark the real 10 ft x 8 ft DG pad, not the assumed pad.",
      "Tape the electrical panel working-clearance zone and keep it sacred.",
      "Swing a cardboard or plywood door mockup outward and confirm landing clearance.",
      "Mark where roof water lands in the worst rain path."
    ],
    hold: "Do not dig until panel clearance, utility locate, door swing, roof discharge, and sidecar fit are physically marked."
  },
  {
    title: "Sheet B / S101-S102: Pier grid and platform framing",
    version: "all",
    diagram: "../diagrams/architectural/arch-s101-foundation-pier-grid.svg",
    parts: ["12 in sonotubes", "6x6 PT posts", "4x6 PT beams", "2x8 PT joists", "rodent mesh"],
    method: [
      "Sauna-only platform: about 84 x 98 in with 9 piers, 3 x 3.",
      "Sidecar platform: about 150 x 98 in with 15 piers, 5 beam lines x 3 rows.",
      "Use S102 for the platform framing: front-to-back 4x6 beams over pier rows; 2x8 joists left-right across the platform.",
      "Layout seven field joists plus front/back rim joists for 12 in layout lines over the 98 in sidecar platform depth.",
      "Use the S102 dashed overlays to locate wall, divider, heater, bench, and threshold blocking zones before subfloor."
    ],
    hold: "Do not install subfloor until diagonals match within 1/8-1/4 in, joist crowns are consistent, and the heater corner is blocked."
  },
  {
    title: "Sheet C / A401: Floor pan and wall base",
    version: "all",
    diagram: "../diagrams/architectural/arch-a401-floor-wall-base-detail.svg",
    parts: ["3/4 in exterior subfloor", "sloped substrate", "cement board or mud bed", "waterproofing", "tile", "base flashing"],
    method: [
      "Build a solid cleanable floor, not an open mystery floor.",
      "Slope to a cleanable low point or front edge unless a legal drain is designed.",
      "Turn waterproofing up 4-6 in behind the wall base.",
      "Lap foil down over the lower wall and protect the base with black/stainless flashing.",
      "Stop cladding 1/2-1 in above finished floor and leave the bottom gap open."
    ],
    hold: "Do not clad walls until the wall-base detail is visible, waterproofed, and inspectable."
  },
  {
    title: "Sheet D / A102-A302: Weather shell, door, and roof water",
    version: "all",
    diagram: "../diagrams/architectural/arch-a301-front-elevation.svg",
    parts: ["WRB", "flashing tape", "sill pan", "drip cap", "rainscreen furring", "roof drip edge"],
    method: [
      "Set and flash the exterior door during dry-in, before final siding.",
      "Use a sill pan with back dam or slope, side flashing over pan, and head flashing/drip cap.",
      "Use a mandatory rainscreen: sheathing, WRB, vertical furring, insect screen, siding.",
      "Use one single-slope roof plane with controlled discharge away from fence, panel, and pier bases.",
      "Use A102 for the roof/ceiling close-in and A302 for quiet side/rear elevation decisions.",
      "Keep siding and trim at least 6 in above DG where possible; use sacrificial lower trim if clearance is tight."
    ],
    hold: "Do not install siding until door pan/head flashing, WRB laps, rainscreen exits, and roof drip path are complete."
  },
  {
    title: "Sheet E / E101: Electrical and sensor rough-in",
    version: "all",
    diagram: "../diagrams/architectural/arch-e101-heater-vent-control.svg",
    parts: ["conduit route", "controller box", "door sensor", "temperature sensor", "light/vent control"],
    method: [
      "Resolve GFCI/AHJ, breaker, disconnect, conductor, raceway, and permit choices with the electrician before equipment purchase is final.",
      "Keep UKU main module accessible, dry, protected from water/snow/condensation, and outside the steam room unless the manufacturer-approved fallback is used.",
      "Place the door sensor on the handle side, no more than 16 in above finished floor.",
      "Place the temperature sensor away from the heater: 20 in from heater edge, 6 in from ceiling, and 20 in from corners/openings.",
      "Photograph conduit, boxes, sensor routes, vent sleeves, and grounding/bonding before close-in."
    ],
    hold: "Do not insulate until rough electrical, sensor paths, vent sleeves, and inspection requirements are complete."
  },
  {
    title: "Sheet F / A201-A403: Bench support and heater guard",
    version: "all",
    diagram: "../diagrams/architectural/arch-a201-hot-room-section.svg",
    parts: ["bench ledgers", "blocking", "upper bench slats", "foot platform", "lower step", "heater guard"],
    method: [
      "Mock up the upper bench, return, foot platform, lower step, heater, and door trim before cutting premium stock.",
      "Treat A201 as the 96 in finished-ceiling case. If the finished ceiling lands at 94-95 in, lower the upper bench enough to preserve the 44-46 in top-bench-to-ceiling target.",
      "Support benches from structural blocking/ledgers, not from cladding.",
      "Use A403 for the bench ledger/blocking detail before closing the walls.",
      "Seal any foil penetrations created for bench ledgers or guard fasteners.",
      "Round over every body-contact edge and keep slat gaps cleanable.",
      "Build heater guard only after the heater and door trim are real."
    ],
    hold: "Do not final-fasten benches until two-person, three-person, and entry/exit posture are tested cold."
  },
  {
    title: "Sheet G / A202: Sidecar addendum",
    version: "sidecar",
    diagram: "../diagrams/architectural/arch-a202-cross-section.svg",
    parts: ["divider wall", "narrow exterior door", "shelf blocking", "high/low vents", "threshold flashing"],
    method: [
      "Treat the sidecar as an integrated bay under the same roof, not a closet bolted on.",
      "Keep the shared wall disciplined: sauna-side insulation, foil, furring, and cladding; sidecar side able to dry.",
      "Vent sidecar high and low with pest screens.",
      "Flash sidecar door like an exterior opening.",
      "Use raised shelves and keep damp tools off the floor."
    ],
    hold: "Do not build sidecar unless the as-built pad, roof edge, panel clearance, storage door swing, and drainage all work."
  }
];

const phases = [
  {
    title: "Freeze the design and code gates",
    meta: "Do this before spending real money",
    tools: ["Tape measure", "laser measure", "notebook", "camera", "local permit portal"],
    steps: [
      "Confirm the finished hot room is now 70 in wide x 84 in deep with a target 94-96 in finished ceiling.",
      "Treat the five-foot sidecar as the working scheme unless the as-built site survey rejects it.",
      "Confirm the 30 x 80 prehung door, HIVE Mini 9, and 28 x 28 heater planning zone.",
      "Check setbacks, height rules, side-yard clearance, roof drainage direction, utility locate requirements, and whether the sauna counts as an accessory structure.",
      "Ask the electrician to sanity-check panel clearance, circuit capacity, conduit route, GFCI/AHJ decision, controller location, disconnect needs, and inspection path before equipment purchase is final."
    ],
    checks: ["Design version chosen", "Permit/electrical path understood", "GFCI/AHJ decision assigned", "Door and heater specs saved"],
    risk: "The expensive mistake is ordering the door, heater, or finish lumber before local constraints are understood."
  },
  {
    title: "Mark the pad and pier grid",
    meta: "Get the building square before digging",
    tools: ["String line", "stakes", "tape", "framing square", "laser level", "spray paint"],
    steps: [
      "Sweep the DG pad clean and mark the front approach side, fence side, and electrical-panel side.",
      "Tape the electrical panel working-clearance zone and keep it clear of building, sidecar door, gutter, landing, stored materials, and conduit clutter.",
      "Mark the exterior wall footprint: 82 x 96 in for sauna-only, 148 x 96 in for the five-foot sidecar.",
      "Mark the foundation platform: about 84 x 98 in for sauna-only, 150 x 98 in for the five-foot sidecar.",
      "Lay out pier centers. Sauna-only uses 3 rows by 3 columns. Sidecar uses 5 beam lines by 3 rows.",
      "Square the layout with diagonals, then mark pier centers clearly."
    ],
    checks: ["Diagonals match", "Panel keep-clear zone preserved", "Door side has landing clearance", "Roof drain direction chosen"],
    risk: "A small skew at the foundation becomes a weird door opening, weird roof edge, and weird bench fit."
  },
  {
    title: "Dig and pour sonotube piers",
    meta: "Make the permanent parts boring",
    tools: ["Post-hole digger or auger", "shovel", "level", "mixing tub", "rebar cutter", "trowel"],
    steps: [
      "Dig through DG to competent soil. Pier depth and diameter must follow local code and site soil, not internet instinct.",
      "Set 12 in tubes plumb, with tops high enough to keep post bases above splash and DG drift.",
      "Add gravel at the bottom if appropriate for drainage and local practice.",
      "Place rebar cages or vertical bars if required. Keep steel covered by concrete.",
      "Pour concrete, rod out air pockets, level tube tops, and set anchors or leave for post-installed anchors depending on selected base.",
      "Let concrete cure before loading it. Protect the tops from rain and debris while curing."
    ],
    checks: ["Tube tops aligned", "Anchors match post bases", "Piers cured before framing"],
    risk: "Do not bury wood posts in concrete. Keep posts on standoff bases."
  },
  {
    title: "Set standoff bases and cut short posts",
    meta: "This is where the floor becomes level",
    tools: ["Laser level", "impact driver", "socket set", "circular saw", "speed square"],
    steps: [
      "Install Simpson-style standoff post bases per the selected product instructions.",
      "Use 6x6 PT posts for any meaningful height. Keep them as short as practical.",
      "Pick a reference elevation for the top of beams.",
      "Measure from each base to that beam elevation and cut each post individually.",
      "Set posts, fasten bases with the required connector fasteners, and temporarily brace before beams go on."
    ],
    checks: ["Post tops share one level plane", "Standoff gap visible", "Temporary bracing installed"],
    risk: "The bases are not the whole lateral system. The platform needs bracing, blocking, and sheathing."
  },
  {
    title: "Frame the platform",
    meta: "Build the stiff box everything sits on",
    tools: ["Circular saw", "impact driver", "clamps", "framing square", "chalk line"],
    steps: [
      "Install beams over the post grid, then frame the PT platform on top.",
      "Use front-to-back 4x6 PT beams as the default system. Run 2x8 PT joists left-right across the platform.",
      "Use seven field joists plus the front/back rim joists to create 12 in layout lines over the 98 in sidecar platform depth.",
      "Add solid blocking under the heater area and under wall lines.",
      "Install diagonal bracing or structural sheathing so the platform cannot rack.",
      "Check square, level, and crown direction before subfloor goes down."
    ],
    checks: ["Platform square", "Joists crowned consistently", "Heater corner blocked"],
    risk: "A sauna is small but dense. The heater plus stones can be roughly 370 lb before people."
  },
  {
    title: "Build the insulated, cleanable floor",
    meta: "Water gets a plan",
    tools: ["Circular saw", "drill", "stapler", "utility knife", "notched trowel if tiling"],
    steps: [
      "Install rodent mesh and insulation below or within the joist bay in a way that can dry.",
      "Install 3/4 in exterior-rated subfloor. Glue/screw only where the product system allows.",
      "Create a deliberate slope toward a cleanable low point or threshold edge unless a legal drain is designed.",
      "Use a heat-tolerant cleanable finish under duckboards, with ceramic tile or equivalent under and around the heater.",
      "Turn floor waterproofing up 4-6 in behind the wall base before cladding.",
      "Leave the wall base inspectable. Duckboards should lift out in sections."
    ],
    checks: ["Floor drains or sheds water deliberately", "No hidden water trap at wall base", "Duckboards removable"],
    risk: "An open slat floor seems simple, but a solid cleanable floor is easier to control for pests, drafts, and water."
  },
  {
    title: "Frame the walls",
    meta: "Keep the openings exact",
    tools: ["Miter saw", "framing nailer or screws", "level", "clamps", "ladder"],
    steps: [
      "Frame four 2x4 walls with straight plates and 92-5/8 in studs if targeting a near-96 in finished ceiling.",
      "Frame the front wall around a 32 x 82 in rough opening for the selected sauna door.",
      "Add blocking for benches, backrests, heater guard, vent covers, sauna-safe lights, controller penetrations, sensor paths, and future trim.",
      "Frame and sleeve supply, exhaust, and drying vents before insulation. Do not leave vent placement for final heater day.",
      "Raise and brace walls. Check plumb and square before sheathing locks them in.",
      "Keep pressure-treated wood out of the visible hot-room interior."
    ],
    checks: ["Door rough opening correct", "Bench blocking installed", "Walls plumb before sheathing"],
    risk: "Bench blocking is painful to retrofit after insulation and foil."
  },
  {
    title: "Frame and dry in the roof",
    meta: "A small roof still fails if water is casual",
    tools: ["Circular saw", "ladder", "roofing square", "caulk gun", "snips"],
    steps: [
      "Use a single-slope roof. Drain away from the fence and away from the electrical panel.",
      "Use rafters deep enough for the chosen roof assembly: cladding, furring air gap, continuous foil, mineral wool, vented air channel, sheathing, underlayment, roofing.",
      "Sheath the roof, install underlayment, drip edge, and the selected metal or low-slope roofing system.",
      "Keep overhangs tight if staying on the 8 ft pad depth.",
      "Flash any sidecar joint as one roof, not two roofs jammed together."
    ],
    checks: ["Roof drains to planned side", "No exposed sheathing edge", "Door head protected"],
    risk: "Tiny eaves help fit the pad, but water still needs drip edges and a clean path off the building."
  },
  {
    title: "Sheathe, wrap, and side the exterior",
    meta: "Make the outside rain boring",
    tools: ["Stapler", "utility knife", "siding nailer or driver", "level", "snips"],
    steps: [
      "Install structural wall sheathing with the fastening schedule required by the sheathing product and local code.",
      "Set the exterior-rated sauna door during dry-in. Install sill pan, side flashing, and head flashing before final siding.",
      "Install WRB shingle-style, including door, sidecar door, vent sleeve, and penetration flashing.",
      "Install vertical rainscreen furring as the default, with insect screen at top and bottom.",
      "Install siding and trim. Keep bottom edges at least 6 in above DG where possible, or use a sacrificial lower trim detail.",
      "For the sidecar, vent the storage bay separately and flash its door as an exterior opening."
    ],
    checks: ["WRB laps shed water", "Door pan/drip cap complete", "Siding clear of DG splash"],
    risk: "Siding is not the structural bracing unless it is a rated structural panel installed exactly that way."
  },
  {
    title: "Rough electrical",
    meta: "Electrician phase",
    tools: ["Electrician tools", "fish tape", "label maker"],
    steps: [
      "Route conduit from the nearby panel to the sauna location.",
      "Install or locate junction boxes, controller box, sensor path, light wiring, and any required disconnect.",
      "Keep exterior boxes, covers, fixtures, fittings, controller enclosures, and penetrations rated for the actual wet/damp/exterior exposure.",
      "Preserve the heater manufacturer's cable entry and heat-resistant cable requirements.",
      "Place the UKU door sensor on the handle side no more than 16 in above finished floor.",
      "Place the temperature sensor 20 in from the heater edge, 6 in from the ceiling, and at least 20 in from corners/openings unless the current manual says otherwise.",
      "Photograph all wire routes before insulation."
    ],
    checks: ["Electrical rough-in inspected if required", "Sensor route planned", "Grounding/bonding path documented", "No generic relay workaround"],
    risk: "This is not the place to improvise. Let the electrician own the final wire, breaker, conduit, and inspection details."
  },
  {
    title: "Insulate, foil, and fur the hot room",
    meta: "The hot room starts here",
    tools: ["Insulation knife", "stapler", "tape roller", "straightedge", "respirator"],
    steps: [
      "Install mineral wool in walls and ceiling. Do not compress it.",
      "Install foil vapor barrier continuously over walls and ceiling.",
      "Tape every seam, corner, penetration, and staple repair with sauna-rated foil tape.",
      "Run foil down over the sill/base area and terminate behind the planned bottom flashing.",
      "Install furring strips to create an air gap behind interior cladding."
    ],
    checks: ["Foil continuous", "Penetrations sealed", "Furring creates drainage/air gap"],
    risk: "A beautiful interior over a leaky foil layer is still a bad sauna envelope."
  },
  {
    title: "Install interior cladding",
    meta: "Now it starts looking like a sauna",
    tools: ["Miter saw", "pin nailer or finish nailer", "stainless fasteners", "level", "spacers"],
    steps: [
      "Install black metal base flashing behind the bottom shadow gap.",
      "Start cladding level, leaving a 1/2 to 1 in gap above the finished floor.",
      "Use stainless fasteners and avoid exposed sharp fastener heads in body-contact zones.",
      "Run walls and ceiling cleanly, with removable access only where genuinely needed.",
      "Keep interior trim simple. The small room wants clean lines, not busy trim."
    ],
    checks: ["Bottom gap preserved", "No PT exposed", "Fasteners sauna-safe"],
    risk: "Do not caulk the bottom of interior cladding to the floor. It needs to dry and be inspectable."
  },
  {
    title: "Finish door trim and verify clearances",
    meta: "Weatherproofing happened during dry-in",
    tools: ["Level", "shims", "driver", "sealant", "trim saw"],
    steps: [
      "Confirm the prehung door was already set, pan-flashed, side-flashed, and head-flashed during dry-in.",
      "Adjust shims and fasteners only if the door no longer swings outward freely or seals evenly.",
      "Install interior trim after operation is correct.",
      "Confirm the under-door air path remains per the selected door/heater ventilation plan.",
      "Re-check the nearby upper bench return and heater clearances after trim is installed."
    ],
    checks: ["Door swings out", "Exterior flashing already complete", "Self-closing hinges work", "Trim does not crowd heater zone"],
    risk: "Do not build the benches to theoretical dimensions before the real door frame is installed."
  },
  {
    title: "Build benches, step, backrests, and duckboards",
    meta: "Fit the sauna to bodies",
    tools: ["Miter saw", "router or roundover bit", "orbital sander", "stainless screws", "clamps"],
    steps: [
      "Mock up the upper rear bench at roughly 70 in x 24 in before cutting premium stock.",
      "Set the upper bench at 50-52 in above finished floor and confirm 44-46 in to finished ceiling.",
      "Build the longer short-wall return so the third person can sit turned 90 degrees, not as a leftover corner.",
      "Build the foot bench around 18 in deep at 34-36 in above finished floor where it actually supports the main seats.",
      "Build the lower step at 16-18 in above finished floor as a step, not a fake low bench.",
      "Fasten bench supports into structural blocking/ledgers and seal foil penetrations; do not hang benches from cladding.",
      "Build heater guard rails after the heater footprint and door trim are physically mocked up.",
      "Sand all touch surfaces and round over exposed edges."
    ],
    checks: ["Two excellent seats", "Third seat has real posture", "Feet above stone line", "Fourth spot acknowledged as compromised"],
    risk: "If the lower step grows too large, it steals the landing and makes the entry feel tight."
  },
  {
    title: "Install heater, stones, controls, and vents",
    meta: "Final electrician and manufacturer phase",
    tools: ["Electrician tools", "level", "gloves", "shop vacuum"],
    steps: [
      "Set the HIVE Mini 9 level on its adjustable legs inside the 28 x 28 planning zone.",
      "Install controller, sensors, door sensor, heater connections, grounding/bonding, disconnect, and labels per HUUM/UKU instructions and local code.",
      "Wash or inspect sauna stones, then load them carefully so air can move through the heater.",
      "Install intake, low exhaust, and high drying vent covers on the sleeves already roughed in.",
      "Install the heater guard and confirm no body path forces contact with hot metal."
    ],
    checks: ["Clearances verified", "Stones loaded correctly", "GFCI/AHJ decision documented", "Controls tested by electrician"],
    risk: "The 18 in heater body is not the planning object. The safe zone and guard are."
  },
  {
    title: "Commission, heat cycle, and tune",
    meta: "Make it real before inviting people in",
    tools: ["Infrared thermometer", "thermometer/hygrometer", "notebook", "timer"],
    steps: [
      "Vacuum the room and wipe down surfaces.",
      "Run the heater through the manufacturer's first-heat/burn-in process with ventilation.",
      "Check door operation, vent operation, floor drainage, and any condensation path.",
      "Sit in the room cold and rehearse entry, stepping, and seating for two, three, and four people.",
      "Run a full heat session and log heat-up time, upper-bench head-height temperature, lower-zone temperature, and vent positions.",
      "Ladle only onto fully hot stones. Start with about 80 ml of clean warm water, wait a few minutes, then repeat only if the stones recover.",
      "After use, open the drying vent, open intake/exhaust, crack the door if weather allows, and lift duckboards periodically while tuning the drying cycle."
    ],
    checks: ["No smoke/smell beyond expected first heat", "Vents tuneable", "Heat-up and loyly logged", "Bench ergonomics confirmed"],
    risk: "The first version of the interior may need small ergonomic tweaks. Plan for that instead of over-finishing every trim piece too early."
  }
];

const cutGroups = [
  {
    title: "Foundation and platform, sauna-only",
    scope: "sauna",
    items: [
      "Pier grid: 9 piers, 3 rows x 3 columns. Final spacing from actual platform layout.",
      "6x6 PT posts: 9 short posts, cut individually after bases are set.",
      "4x6 PT beams: 3 at 98 in if using front-to-back beams.",
      "2x8 PT rim: 2 at 84 in, 2 at 95 in for an 84 x 98 platform.",
      "2x8 PT field joists: 7 at 81 in, plus front/back rim joists. This creates 12 in layout lines across the 98 in depth.",
      "2x8 blocking: cut from offcuts for heater corner, wall lines, and mid-span stiffness."
    ]
  },
  {
    title: "Foundation and platform, sidecar",
    scope: "sidecar",
    items: [
      "Pier grid: 15 piers, 5 beam lines x 3 rows.",
      "6x6 PT posts: 15 short posts, cut individually after bases are set.",
      "4x6 PT beams: 5 at about 98 in if using front-to-back beams.",
      "2x8 PT rim: 2 at about 150 in, 2 at about 95 in for a 150 x 98 platform.",
      "2x8 PT field joists: 7 at about 147 in, plus front/back rim joists. This creates 12 in layout lines across the 98 in depth.",
      "Add blocking under the sidecar divider wall and sidecar door threshold."
    ]
  },
  {
    title: "Hot-room wall framing",
    items: [
      "Use 92-5/8 in precut studs for near-96 in finished interior height after plates and ceiling finish.",
      "Frame the front wall with a 32 x 82 in rough opening for the selected 30 x 80 sauna door.",
      "Use a built-up header over the door sized by actual wall/roof load. Double 2x6 is a practical starting point for this small opening, but confirm locally.",
      "Add blocking at upper bench height, foot bench height, lower step height, heater guard height, backrest height, vent locations, and light locations.",
      "Do not install final trim until the prehung door is physically on site."
    ]
  },
  {
    title: "Bench and duckboard starter cuts",
    items: [
      "Upper rear bench: about 70 in long x 24 in deep before final end trims/backrest decisions.",
      "Short-wall return: field-fit for third-person posture and door trim. Start with about 24 in seat depth and 54-60 in usable return length.",
      "Foot bench: about 18 in deep, only where feet need support.",
      "Lower step: about 30 in wide x 10-12 in tread.",
      "Duckboards: build as removable modules small enough to lift with one hand.",
      "Heater guard: field-build after heater and door trim are mocked up."
    ]
  },
  {
    title: "Interior cladding and trim quantities",
    items: [
      "Interior wall area before openings: about 205 sq ft.",
      "Ceiling area: about 40 sq ft.",
      "Order about 260 sq ft of sauna-safe T&G after subtracting door and adding waste.",
      "Use stainless fasteners inside the hot room.",
      "Keep a 1/2 to 1 in shadow gap above the floor with dark metal flashing behind it."
    ]
  },
  {
    title: "Exterior shell quantities",
    items: [
      "Sauna-only exterior wall area is roughly 230-260 sq ft depending on wall height and gables.",
      "The five-foot sidecar adds a real storage bay plus roughly 110-140 sq ft of exterior wall and door/trim complexity.",
      "Order structural sheathing by actual layout: likely 8-10 wall sheets for sauna-only, more for sidecar.",
      "Roof sheathing: roughly 3 sheets sauna-only, 5 sheets sidecar, depending on overhangs and roof layout.",
      "Siding order should include at least 10-15 percent waste."
    ]
  }
];

const phaseDetails = [
  {
    parts: ["site photos", "permit notes", "heater manual", "door spec", "electrical notes"],
    fasteners: ["none"],
    measurements: ["70 x 84 in finished room", "94-96 in finished ceiling", "32 x 82 in door RO"],
    hold: "Do not buy heater, door, or finish wood until the site, code, and electrical path are understood."
  },
  {
    parts: ["stakes", "string", "paint", "panel-clearance tape"],
    fasteners: ["none"],
    measurements: ["84 x 98 in platform or 150 x 98 in sidecar platform", "matching diagonals within 1/8-1/4 in"],
    hold: "Do not dig until the panel clearance, door landing, roof water path, and pier grid are marked."
  },
  {
    parts: ["12 in sonotubes", "rebar", "concrete", "anchor hardware"],
    fasteners: ["anchor bolts or approved post-installed anchors"],
    measurements: ["pier depth by local code/site soil", "tube tops above DG splash/drift"],
    hold: "Do not pour until utility locate is complete and any required pier inspection is satisfied."
  },
  {
    parts: ["standoff bases", "6x6 PT posts", "temporary braces"],
    fasteners: ["connector-specified anchors and post-base fasteners"],
    measurements: ["post tops cut to one beam elevation"],
    hold: "Do not place beams until post tops are level and bases use the correct connector fasteners."
  },
  {
    parts: ["4x6 PT beams", "2x8 PT rim", "2x8 PT field joists", "blocking", "rodent mesh"],
    fasteners: ["PT-rated structural screws", "hanger nails/screws if hangers are used"],
    measurements: ["12 in layout lines over 98 in depth", "diagonals within 1/8-1/4 in"],
    hold: "Do not install subfloor until platform is square, blocked, braced, and heater corner is reinforced."
  },
  {
    parts: ["subfloor", "sloped substrate", "waterproofing", "tile", "duckboard stock"],
    fasteners: ["exterior subfloor fasteners", "system-compatible backer-board fasteners"],
    measurements: ["4-6 in waterproofing turn-up", "1/2-1 in future cladding gap"],
    hold: "Do not close the wall base until the water path is visible and cleanable."
  },
  {
    parts: ["2x4 studs/plates", "header stock", "bench blocking", "vent sleeves"],
    fasteners: ["framing nails/screws", "structural screws at blocking"],
    measurements: ["32 x 82 in rough opening", "bench blocking at 50-52, 34-36, and 16-18 in zones"],
    hold: "Do not sheath until door RO, vent locations, sensor/light paths, and bench blocking are confirmed."
  },
  {
    parts: ["rafters", "roof sheathing", "underlayment", "drip edge", "roofing"],
    fasteners: ["rafter ties/clips as required", "roofing-system fasteners"],
    measurements: ["roof slope meets selected product minimum", "water discharges away from fence/panel"],
    hold: "Do not roof until the roof assembly and drainage endpoint are chosen."
  },
  {
    parts: ["wall sheathing", "WRB", "flashing tape", "door pan", "rainscreen furring", "siding"],
    fasteners: ["sheathing nails", "cap staples", "siding fasteners"],
    measurements: ["siding 6 in above DG where possible", "rainscreen screened at top/bottom"],
    hold: "Do not side until door/vent flashing and WRB laps are complete."
  },
  {
    parts: ["conduit", "junction boxes", "UKU module", "sensors", "sauna light", "disconnect"],
    fasteners: ["electrician-selected listed fittings and box hardware"],
    measurements: ["door sensor max 16 in AFF", "temperature sensor 6 in from ceiling and 20 in from heater edge"],
    hold: "Do not insulate until rough electrical, sensor routes, grounding/bonding, and inspection path are done."
  },
  {
    parts: ["mineral wool", "foil vapor barrier", "foil tape", "1x2 furring", "base flashing"],
    fasteners: ["stainless staples", "furring fasteners sealed at penetrations"],
    measurements: ["continuous foil", "minimum 10 mm air gap behind cladding"],
    hold: "Do not clad until every seam, staple tear, sleeve, and penetration is taped."
  },
  {
    parts: ["T&G cladding", "base flashing", "trim stock"],
    fasteners: ["stainless finish nails or trim screws"],
    measurements: ["bottom cladding gap 1/2-1 in minimum"],
    hold: "Do not caulk the bottom gap or trap the wall base."
  },
  {
    parts: ["door trim", "shims", "threshold protection"],
    fasteners: ["door/trim fasteners per product"],
    measurements: ["out-swing clear", "door sensor alignment", "under-door air path preserved"],
    hold: "Do not final-fit benches until the real trim and heater guard envelope are known."
  },
  {
    parts: ["upper bench", "return bench", "foot platform", "lower step", "backrests", "heater guard"],
    fasteners: ["stainless screws into blocking/ledgers"],
    measurements: ["upper 50-52 in AFF", "foot platform 34-36 in AFF", "lower step 16-18 in AFF"],
    hold: "Do not final-fasten until body mockups for two, three, and entry/exit work."
  },
  {
    parts: ["HIVE Mini 9", "stones", "UKU controls", "vent covers", "guard rails"],
    fasteners: ["manufacturer hardware", "stainless guard fasteners"],
    measurements: ["28 x 28 in planning zone", "manufacturer clearances current at install"],
    hold: "Do not energize until final electrician testing and safety-control tests are complete."
  },
  {
    parts: ["thermometer/hygrometer", "notebook", "clean warm water", "timer"],
    fasteners: ["none"],
    measurements: ["upper-bench head temperature", "lower-zone temperature", "heat-up time around one hour"],
    hold: "Do not invite guests until first heat, vent tuning, water test, and drying cycle are proven."
  }
];

const dimensionList = document.getElementById("dimensionList");
const versionDiagram = document.getElementById("versionDiagram");
const versionCaption = document.getElementById("versionCaption");
const versionTitle = document.getElementById("versionTitle");
const materialsGrid = document.getElementById("materialsGrid");
const bomTable = document.getElementById("bomTable");
const procurementList = document.getElementById("procurementList");
const tripSheetsEl = document.getElementById("tripSheets");
const toolList = document.getElementById("toolList");
const fastenerSchedule = document.getElementById("fastenerSchedule");
const assemblySheetsEl = document.getElementById("assemblySheets");
const phaseList = document.getElementById("phaseList");
const cutList = document.getElementById("cutList");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const dashboardVersion = document.getElementById("dashboardVersion");
const dashboardFootprint = document.getElementById("dashboardFootprint");

function renderDimensions(key) {
  currentVersion = key;
  const version = versions[key];
  versionDiagram.src = version.diagram;
  versionDiagram.alt = version.alt;
  versionCaption.textContent = version.caption;
  versionTitle.textContent = version.title;
  dimensionList.innerHTML = version.dimensions
    .map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`)
    .join("");
  dashboardVersion.textContent = key === "sidecar" ? "With sidecar" : "Sauna only";
  dashboardFootprint.textContent = version.dimensions.find(([term]) => term === "Exterior wall footprint")?.[1] + " exterior wall footprint";
  document.getElementById("pierCount").value = key === "sidecar" ? 15 : 9;
  document.getElementById("layoutWidth").value = key === "sidecar" ? 150 : 84;
  document.getElementById("layoutDepth").value = 98;
  renderBOM();
  renderCuts();
  renderAssemblySheets();
  applyVersionScope();
  updateCalculators();
}

function renderMaterials() {
  materialsGrid.innerHTML = materials
    .map((group) => `
      <article class="materials-card" data-tag="${group.tag}" data-scope="${group.scope || "all"}">
        <h3>${group.title}</h3>
        <small>${group.timing}</small>
        <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `)
    .join("");
}

function renderBOM() {
  const rows = bomItems.filter((item) => item[3] === "all" || item[3] === currentVersion);
  bomTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Spec</th>
          <th scope="col">Qty</th>
          <th scope="col">Supplier</th>
          <th scope="col">Buy wave</th>
          <th scope="col">Rule</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(([item, spec, qty, version, supplier, wave, note]) => `
            <tr data-scope="${version}">
              <td>${item}</td>
              <td>${spec}</td>
              <td>${qty}</td>
              <td>${supplier}</td>
              <td>${wave}</td>
              <td>${note}</td>
            </tr>
          `)
          .join("")}
      </tbody>
    </table>
  `;
}

function renderPrep() {
  procurementList.innerHTML = procurementWaves
    .map((wave) => `
      <details class="procurement-wave">
        <summary>
          <span>${wave.timing}</span>
          <strong>${wave.title}</strong>
        </summary>
        <div class="wave-body">
          <h4>Buy or book</h4>
          <ul>${wave.buy.map((item) => `<li>${item}</li>`).join("")}</ul>
          <h4>Do not buy yet</h4>
          <ul>${wave.wait.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </details>
    `)
    .join("");

  tripSheetsEl.innerHTML = tripSheets
    .map((trip) => `
      <article class="trip-card">
        <span>${trip.timing}</span>
        <h4>${trip.title}</h4>
        <p><strong>Vehicle/delivery:</strong> ${trip.vehicle}</p>
        <div class="trip-columns">
          <div>
            <h5>Confirm first</h5>
            <ul>${trip.confirmed.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
          <div>
            <h5>Reject / do not substitute</h5>
            <ul>${trip.reject.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
        </div>
      </article>
    `)
    .join("");

  toolList.innerHTML = toolGroups
    .map((group) => `
      <article class="tool-kit">
        <h4>${group.title}</h4>
        <dl>
          <div>
            <dt>Own or borrow</dt>
            <dd>${group.own.join(", ")}</dd>
          </div>
          <div>
            <dt>Rent only when ready</dt>
            <dd>${group.rent.join(", ")}</dd>
          </div>
          <div>
            <dt>Safety</dt>
            <dd>${group.safety.join(", ")}</dd>
          </div>
        </dl>
      </article>
    `)
    .join("");

  fastenerSchedule.innerHTML = `
    <table>
      <thead>
        <tr>
          <th scope="col">Where</th>
          <th scope="col">Use</th>
          <th scope="col">Why it matters</th>
        </tr>
      </thead>
      <tbody>
        ${fastenerRows
          .map(([where, use, note]) => `
            <tr>
              <td>${where}</td>
              <td>${use}</td>
              <td>${note}</td>
            </tr>
          `)
          .join("")}
      </tbody>
    </table>
  `;
}

function renderAssemblySheets() {
  const sheets = assemblySheets.filter((sheet) => sheet.version === "all" || sheet.version === currentVersion);
  assemblySheetsEl.innerHTML = sheets
    .map((sheet) => `
      <article class="assembly-sheet" data-scope="${sheet.version}">
        <div>
          <p class="eyebrow">${sheet.version === "sidecar" ? "Sidecar addendum" : "Core assembly"}</p>
          <h3>${sheet.title}</h3>
          <p class="sheet-diagram-note">${sheet.diagram.endsWith(".png") || sheet.diagram.endsWith(".svg") ? "Diagram included below." : sheet.diagram}</p>
        </div>
        ${sheet.diagram.endsWith(".png") || sheet.diagram.endsWith(".svg") ? `<img src="${sheet.diagram}" alt="${sheet.title} diagram" />` : ""}
        <div class="sheet-columns">
          <div>
            <h4>Parts in play</h4>
            <ul>${sheet.parts.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
          <div>
            <h4>Field method</h4>
            <ol>${sheet.method.map((item) => `<li>${item}</li>`).join("")}</ol>
          </div>
        </div>
        <div class="hold-box"><strong>Stop:</strong> ${sheet.hold}</div>
      </article>
    `)
    .join("");
}

function renderPhases() {
  phaseList.innerHTML = phases
    .map((phase, index) => {
      const number = String(index + 1).padStart(2, "0");
      const detail = phaseDetails[index];
      const checkItems = phase.checks
        .map((check, checkIndex) => {
          const id = `phase-${index}-check-${checkIndex}`;
          const checked = localStorage.getItem(id) === "true" ? "checked" : "";
          return `
            <label class="checkline">
              <input type="checkbox" data-check-id="${id}" ${checked} />
              <span>${check}</span>
            </label>
          `;
        })
        .join("");

      return `
        <details class="phase" ${index < 2 ? "open" : ""}>
          <summary>
            <span class="phase-number">${number}</span>
            <span class="phase-title">
              <h3>${phase.title}</h3>
              <span class="phase-meta">${phase.meta}</span>
            </span>
            <span class="phase-status">Open</span>
          </summary>
          <div class="phase-body">
            <div>
              <div class="phase-sheetlet">
                <div>
                  <h4>Parts</h4>
                  <p>${detail.parts.join(", ")}</p>
                </div>
                <div>
                  <h4>Fasteners</h4>
                  <p>${detail.fasteners.join(", ")}</p>
                </div>
                <div>
                  <h4>Measurements</h4>
                  <ul>${detail.measurements.map((measurement) => `<li>${measurement}</li>`).join("")}</ul>
                </div>
              </div>
              <h4>Do this</h4>
              <ul>${phase.steps.map((step) => `<li>${step}</li>`).join("")}</ul>
              <div class="hold-box"><strong>Do not continue until:</strong> ${detail.hold}</div>
              <div class="checklist">${checkItems}</div>
            </div>
            <div>
              <h4>Tools</h4>
              <ul>${phase.tools.map((tool) => `<li>${tool}</li>`).join("")}</ul>
              <h4>Watchout</h4>
              <div class="risk-box">${phase.risk}</div>
            </div>
          </div>
        </details>
      `;
    })
    .join("");
}

function renderCuts() {
  cutList.innerHTML = cutGroups
    .filter((group) => !group.scope || group.scope === currentVersion)
    .map((group) => `
      <article class="cut-group">
        <h3>${group.title}</h3>
        <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `)
    .join("");
}

function applyVersionScope() {
  document.querySelectorAll("[data-scope]").forEach((element) => {
    const scope = element.dataset.scope;
    element.classList.toggle("hide", scope !== "all" && scope !== currentVersion);
  });
  applyMaterialFilter();
}

function applyMaterialFilter() {
  const activeFilter = document.querySelector("[data-filter].is-active")?.dataset.filter || "all";
  document.querySelectorAll(".materials-card").forEach((card) => {
    const tagMatches = activeFilter === "all" || card.dataset.tag === activeFilter;
    const scopeMatches = card.dataset.scope === "all" || card.dataset.scope === currentVersion;
    card.classList.toggle("hide", !tagMatches || !scopeMatches);
  });
}

function updateProgress() {
  const checks = [...document.querySelectorAll("[data-check-id]")];
  const done = checks.filter((check) => check.checked).length;
  const total = checks.length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  progressText.textContent = `${done} of ${total} phase checks complete`;
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function updateCalculators() {
  const diameter = Number(document.getElementById("pierDiameter").value);
  const depth = Number(document.getElementById("pierDepth").value);
  const count = Number(document.getElementById("pierCount").value);
  const radiusFt = diameter / 24;
  const depthFt = depth / 12;
  const cubicFeet = Math.PI * radiusFt * radiusFt * depthFt * count;
  const bags = Math.ceil(cubicFeet / 0.6);
  document.getElementById("concreteResult").textContent =
    `${count} piers at ${diameter} in x ${depth} in need about ${cubicFeet.toFixed(1)} ft3 of concrete, or roughly ${bags} 80 lb bags before waste. Add extra bags for mistakes and uneven holes.`;

  const width = Number(document.getElementById("layoutWidth").value);
  const layoutDepth = Number(document.getElementById("layoutDepth").value);
  const diagonal = Math.sqrt(width * width + layoutDepth * layoutDepth);
  document.getElementById("diagonalResult").textContent =
    `For ${width} in x ${layoutDepth} in, both diagonals should be ${diagonal.toFixed(2)} in. Adjust strings until they match within about 1/8-1/4 in before digging.`;
}

function wireEvents() {
  document.querySelectorAll("[data-version]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-version]").forEach((other) => {
        other.classList.remove("is-active");
        other.setAttribute("aria-selected", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
      renderDimensions(button.dataset.version);
    });
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((other) => other.classList.remove("is-active"));
      button.classList.add("is-active");
      applyMaterialFilter();
    });
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches("[data-check-id]")) {
      localStorage.setItem(target.dataset.checkId, target.checked ? "true" : "false");
      updateProgress();
    }
  });

  ["pierDiameter", "pierDepth", "pierCount", "layoutWidth", "layoutDepth"].forEach((id) => {
    document.getElementById(id).addEventListener("input", updateCalculators);
  });

  document.getElementById("expandAll").addEventListener("click", () => {
    document.querySelectorAll(".phase").forEach((phase) => phase.open = true);
  });

  document.getElementById("collapseAll").addEventListener("click", () => {
    document.querySelectorAll(".phase").forEach((phase) => phase.open = false);
  });

  document.getElementById("resetProgress").addEventListener("click", () => {
    document.querySelectorAll("[data-check-id]").forEach((check) => {
      check.checked = false;
      localStorage.removeItem(check.dataset.checkId);
    });
    updateProgress();
  });

  document.getElementById("nextIncomplete").addEventListener("click", () => {
    const next = document.querySelector("[data-check-id]:not(:checked)");
    if (!next) return;
    const phase = next.closest(".phase");
    if (phase) phase.open = true;
    next.scrollIntoView({ behavior: "smooth", block: "center" });
    next.focus();
  });

  document.getElementById("printButton").addEventListener("click", () => window.print());
}

renderMaterials();
renderPrep();
renderPhases();
renderDimensions("sidecar");
wireEvents();
updateProgress();
updateCalculators();
