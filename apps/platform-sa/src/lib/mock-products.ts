import type { Product } from "./shopify/types";

// Realistic MRO placeholder products for development/design review.
// Shown when Shopify is not yet connected (isShopifyConfigured === false).

function zar(amount: string, compareAt?: string) {
  return {
    price: { amount, currencyCode: "ZAR" },
    compareAtPrice: compareAt ? { amount: compareAt, currencyCode: "ZAR" } : null,
  };
}

function product(
  id: string,
  handle: string,
  title: string,
  vendor: string,
  description: string,
  amount: string,
  compareAt: string | undefined,
  tags: string[],
  inStock = true,
  extraVariants: { title: string; available?: boolean }[] = []
): Product {
  const { price, compareAtPrice } = zar(amount, compareAt);
  const baseVariant = {
    id: `${id}-v1`,
    title: "Default Title",
    availableForSale: inStock,
    price,
    compareAtPrice,
    selectedOptions: [{ name: "Title", value: "Default Title" }],
  };
  const variants =
    extraVariants.length > 0
      ? extraVariants.map((v, i) => ({
          id: `${id}-v${i + 2}`,
          title: v.title,
          availableForSale: v.available ?? true,
          price,
          compareAtPrice,
          selectedOptions: [{ name: "Size", value: v.title }],
        }))
      : [baseVariant];

  return {
    id,
    handle,
    title,
    description,
    descriptionHtml: `<p>${description}</p>`,
    featuredImage: null,
    images: { nodes: [] },
    priceRange: {
      minVariantPrice: price,
      maxVariantPrice: price,
    },
    compareAtPriceRange: {
      minVariantPrice: compareAtPrice ?? price,
    },
    variants: { nodes: variants },
    tags,
    vendor,
    availableForSale: inStock,
    totalInventory: inStock ? Math.floor(Math.random() * 200 + 10) : 0,
  };
}

export const MOCK_PRODUCTS: Product[] = [
  product(
    "mock-1",
    "dewalt-18v-cordless-drill-dcd791",
    "DeWalt 18V XR Brushless Cordless Drill/Driver DCD791",
    "DeWalt",
    "Professional 18V XR brushless motor for extended runtime and durability. 2-speed gearbox (0-550/0-2000 RPM), 13mm metal chuck, 15+1 torque settings. Kit includes 2×2.0Ah batteries and charger.",
    "2899.00",
    "3499.00",
    ["power-tools", "drills", "featured", "bestseller", "sale", "dewalt"],
    true,
    [{ title: "2×2.0Ah Kit" }, { title: "2×4.0Ah Kit" }, { title: "Bare Tool" }]
  ),
  product(
    "mock-2",
    "bosch-professional-angle-grinder-gws-2200",
    "Bosch Professional 2200W Angle Grinder GWS 2200",
    "Bosch",
    "Heavy-duty 2200W motor for demanding cutting and grinding applications. 230mm disc diameter, vibration control, restart protection. Includes side handle and wheel guard.",
    "1649.00",
    undefined,
    ["power-tools", "grinders", "featured", "bestseller", "bosch"],
    true
  ),
  product(
    "mock-3",
    "makita-hr2631f-rotary-hammer",
    "Makita HR2631F 26mm SDS+ Rotary Hammer 800W",
    "Makita",
    "3-mode operation: rotary, hammer, and rotation stop. 800W motor, 2.9J impact energy. Anti-vibration technology, built-in torque limiter for user safety. Includes carry case.",
    "3199.00",
    "3699.00",
    ["power-tools", "hammer-drills", "makita", "featured", "bestseller", "sale"],
    true
  ),
  product(
    "mock-4",
    "3m-p100-half-face-respirator-6502ql",
    "3M 6502QL P100 Half-Face Respirator with Quick Latch",
    "3M",
    "SABS-approved P100 respirator for protection against oil and non-oil based aerosols, dusts, mists and fumes. Quick-latch mechanism drops facepiece for breaks without removing. Medium size.",
    "489.00",
    "599.00",
    ["safety-ppe", "respirators", "3m", "featured", "sale"],
    true,
    [{ title: "Small" }, { title: "Medium" }, { title: "Large" }]
  ),
  product(
    "mock-5",
    "kennedy-200mm-adjustable-spanner",
    "Kennedy 200mm Adjustable Spanner — Chrome Vanadium",
    "Kennedy",
    "Chrome vanadium steel construction for high torque applications. Smooth adjusting worm, jaw capacity 0–27mm, laser-etched metric graduations. Drop-forged for durability.",
    "189.00",
    undefined,
    ["hand-tools", "spanners", "kennedy"],
    true
  ),
  product(
    "mock-6",
    "gedore-red-socket-set-1-2-drive-24pce",
    "Gedore Red 1/2\" Drive Socket Set 24-Piece Metric",
    "Gedore Red",
    "24-piece metric socket set in blow mould case. 1/2\" drive sockets 10–32mm, reversible ratchet handle, extension bars 125mm and 250mm, universal joint. Chrome vanadium steel, mirror polished.",
    "1249.00",
    "1599.00",
    ["hand-tools", "socket-sets", "gedore", "featured", "sale"],
    true
  ),
  product(
    "mock-7",
    "uvex-pheos-safety-glasses-clear",
    "Uvex Pheos Safety Glasses — Clear Lens ANSI Z87.1",
    "Uvex",
    "Lightweight wrap-around safety glasses with anti-scratch and anti-fog clear lens. Side shields integrated, adjustable temples, ANSI Z87.1 and EN166 certified. UV 400 protection.",
    "129.00",
    undefined,
    ["safety-ppe", "eye-protection", "bestseller", "uvex"],
    true
  ),
  product(
    "mock-8",
    "stanley-fatmax-tape-measure-8m",
    "Stanley FatMax Tape Measure 8m × 32mm",
    "Stanley",
    "Blade Armor coated tape for up to 10× longer blade life. 3.8m standout, nylon bonded blade, magnetic tip, True Zero hook. Shock-resistant ABS case with rubber overmould grip.",
    "219.00",
    "269.00",
    ["hand-tools", "measuring", "bestseller", "sale", "stanley"],
    true
  ),
  product(
    "mock-9",
    "honeywell-high-vis-vest-class-2",
    "Honeywell Class 2 High-Visibility Safety Vest — Orange",
    "Honeywell",
    "SANS 1397 Class 2 compliant high-visibility vest with 50mm retroreflective tape. Two pockets, mic loop, mesh back for ventilation. Zip front closure. Orange/yellow.",
    "149.00",
    undefined,
    ["safety-ppe", "hi-vis", "honeywell"],
    true,
    [{ title: "S/M" }, { title: "L/XL" }, { title: "2XL/3XL" }]
  ),
  product(
    "mock-10",
    "fluke-117-true-rms-multimeter",
    "Fluke 117 True-RMS Digital Multimeter",
    "Fluke",
    "True-RMS for accurate measurements on non-linear loads. VoltAlert non-contact voltage detection, AutoVolt automatic AC/DC selection, LoZ function eliminates ghost voltages. CAT III 600V.",
    "4299.00",
    "4999.00",
    ["electrical", "test-equipment", "fluke", "featured", "sale"],
    true
  ),
  product(
    "mock-11",
    "esab-warrior-feed-304-mig-welder",
    "ESAB Warrior Feed 304 MIG Welder — 300A",
    "ESAB",
    "Industrial MIG/FCAW welder with 300A output. Wire feed speed 1.5–20m/min, 4-roll drive, digital display. Synergic or manual mode. Suitable for 0.6–1.6mm wire. 415V 3-phase.",
    "18500.00",
    undefined,
    ["welding", "mig-welders", "esab"],
    false
  ),
  product(
    "mock-12",
    "portwest-a140-cut-5-gloves",
    "Portwest A140 Cut Level 5 Anti-Cut Gloves — Grey",
    "Portwest",
    "HPPE yarn construction provides EN388 Cut Level 5 protection. Seamless knit liner, sandy latex palm coating for excellent grip in wet and dry conditions. SANS and EN388 certified.",
    "89.00",
    "119.00",
    ["safety-ppe", "hand-protection", "portwest"],
    true,
    [{ title: "S (7)" }, { title: "M (8)" }, { title: "L (9)" }, { title: "XL (10)" }, { title: "2XL (11)", available: false }]
  ),
  product(
    "mock-13",
    "bosch-gst-150-bce-jigsaw",
    "Bosch GST 150 BCE Professional Jigsaw 780W",
    "Bosch",
    "780W jigsaw with pendulum action for fast cutting in wood, metal and plastic. SDS blade change, anti-splinter guard, dust blower, laser guide line. Speed range 800–3100spm.",
    "2199.00",
    "2699.00",
    ["power-tools", "jigsaws", "bosch"],
    true
  ),
  product(
    "mock-14",
    "petzl-vertex-best-hard-hat",
    "Petzl Vertex Best Vented Hard Hat with Ratchet",
    "Petzl",
    "EN 397 certified vented hard hat with integrated headlamp bracket (STRATO compatible). Ratchet adjustment, 4-point chinstrap, 360° brim, weight 410g. Available in yellow, white, red.",
    "699.00",
    undefined,
    ["safety-ppe", "head-protection", "petzl"],
    true,
    [{ title: "Yellow" }, { title: "White" }, { title: "Red" }]
  ),
  product(
    "mock-15",
    "ridgid-12r-pipe-cutter-10-89mm",
    "Ridgid 12R Pipe Cutter 10–89mm",
    "Ridgid",
    "Heavy-duty pipe cutter for copper, brass, aluminium and thin-wall steel. 10–89mm capacity, quick-actuating feed screw, reamer blade included. Drop-forged steel frame.",
    "459.00",
    "549.00",
    ["plumbing", "pipe-cutting", "ridgid"],
    true
  ),
  product(
    "mock-16",
    "ingco-toolbox-plastic-460mm",
    "Ingco 460mm Plastic Tool Box with Cantilever Tray",
    "Ingco",
    "High-impact polypropylene toolbox with removable cantilever tray. Metal locking clasp, rubber feet, 460×200×215mm. Load capacity 20kg. Ideal for organising hand tools.",
    "249.00",
    "299.00",
    ["storage-workshop", "toolboxes", "ingco"],
    true
  ),
];

export const MOCK_PRODUCTS_BY_HANDLE = new Map(
  MOCK_PRODUCTS.map((p) => [p.handle, p])
);
