# GreenAccess AI
### Urban Green Space Intelligence & Accessibility Mapping

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/GIS-Leaflet-199900?logo=leaflet)](https://leafletjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)

---

> **Notice:**  
> **“This is a prototype decision-support model, not an official planning standard and not a legally approved park-selection system.”**  
> Outputs highlight **candidate priority zones** for further multidisciplinary evaluation. They do not constitute statutory urban master plans or legally approved park selections.

---

## 1. Problem Statement & Motivation

Rapid urbanization across metropolitan cities creates severe spatial disparities in access to open, recreational, and ecologically functional green spaces. High-density built environments frequently isolate vulnerable neighborhoods from cooling canopy cover and public parks.

While satellite remote sensing provides unprecedented observation capabilities, urban planners often encounter two critical bottlenecks:
1. **The NDVI Misconception:** High Normalized Difference Vegetation Index (NDVI) signals are often mistaken for accessible public parks, despite frequently representing private residential gardens, institutional enclosures (e.g., military or universities), or inaccessible roadside medians.
2. **Disconnected Insights:** Raw raster classifications fail to connect directly with pedestrian walking thresholds, built-up pressure context, and explainable decision-support recommendations.

**GreenAccess AI** bridges this gap by demonstrating an end-to-end geospatial intelligence pipeline:
```
Satellite Data (Sentinel-2)
  ↓
Image Preprocessing & Cloud Masking (QA60, Median Composite)
  ↓
Spectral Vegetation & Land-Cover Analysis (NDVI + Dynamic World)
  ↓
Meaningful Green-Space Patch Extraction (≥ 2,500 m² filter)
  ↓
Walking Accessibility Buffer Modeling (0–250m, 250–500m, 500–1km, >1km)
  ↓
Composite Indicators: Green Accessibility Index (GAI) & Priority Scoring
  ↓
Interactive GIS Command Dashboard with Explainable Policy Recommendations
```

---

## 2. Key Features

- **Spatial Command Center:** Interactive Leaflet GIS map with toggleable choropleth layers (Priority Zones, Green Accessibility Index, Meaningful Green Patches, Sentinel-2 NDVI overlay, Dynamic World Built-up context).
- **Dual Data Integrity Modes:**
  - **DEMO MODE (Default):** Runs immediately with a deterministic, reproducible synthetic spatial dataset modeled after the **Bengaluru Urban Region (18 neighborhood zones & 10 key green reserves)**. Visibly labeled everywhere to prevent misinterpretation as unverified real-time satellite telemetry.
  - **EARTH ENGINE MODE:** Isolated server-side adapter connecting to Google Earth Engine pipelines (`COPERNICUS/S2_SR_HARMONIZED` & `GOOGLE/DYNAMICWORLD/V1`) with graceful fallback.
- **Explainable Decision Support:** Dynamic generation of contributing deficiency factors (e.g. *"Poor access"*, *"High built-up density"*, *"Low vegetation coverage"*) and actionable site evaluation recommendations.
- **Analytical Indicators:**
  - Multi-criteria **Green Accessibility Index (GAI)**.
  - Deficit-weighted **Intervention Priority Score**.
- **Interactive Data Hub:** Sortable and filterable data table with live CSV export capability.
- **Multi-Chart Intelligence:** Recharts visualizations exploring NDVI distributions, patch scales, accessibility breakdowns, and urban density correlations.
- **Methodology & Transparency Hub:** Full pipeline diagrams, mathematical formulas, datasets table, and limitations catalog.

---

## 3. Study Area Configuration

Default Study Area: **Bengaluru Urban Region, Karnataka, India**
- **Center:** Latitude `12.9716° N`, Longitude `77.5946° E`
- **Initial Zoom:** `11`
- **Bounding Box:** `12.8200° N – 13.1400° N`, `77.4400° E – 77.7800° E`
- **Nominal Area:** ~741 km²
- **Temporal Baseline:** 2024 Annual Composite (Cloud Threshold < 20%)

Central configuration file: `src/config/studyArea.ts`.

---

## 4. Mathematical Methodology & Indicators

### A. Normalized Difference Vegetation Index (NDVI)
$$\text{NDVI} = \frac{\text{NIR (B8)} - \text{RED (B4)}}{\text{NIR (B8)} + \text{RED (B4)}}$$
- **Sensor:** Sentinel-2 MSI Level-2A (10m resolution)
- **Threshold:** $\text{NDVI} \ge 0.35$ filters active photosynthetic canopy.

### B. Meaningful Green-Space Patch Extraction
To prevent isolated street trees from distorting walking access:
1. Spatial cluster connectivity: 8-neighbor connected component labeling.
2. Minimum patch area threshold: **$2,500\text{ m}^2$ (0.25 hectares)**.
3. Cross-referenced against Dynamic World vegetation classes (`trees`, `grass`, `shrub_and_scrub`).

### C. Distance Accessibility Tiers
- **0 – 250 m (Excellent, Score = 100):** ~3-minute direct walk.
- **250 – 500 m (Good, Score = 75):** ~6-minute neighborhood walking shed.
- **500 – 1,000 m (Moderate, Score = 45):** ~12-minute walk; marginal accessibility.
- **> 1,000 m (Poor, Score = 10):** Severe spatial park deficit.

*Analytical Assumption Note:* Euclidean buffers serve as indicative proxies. Ground walking routes may differ due to physical barriers, walls, and road layout.

### D. Green Accessibility Index (GAI)
$$\text{GAI} = (0.50 \times S_{\text{dist}}) + (0.30 \times S_{\text{cov}}) + (0.20 \times S_{\text{den}})$$
- **Range:** $0 - 100$
- **Classification:** $0 - 30$ Poor, $31 - 60$ Moderate, $61 - 100$ Good.

### E. Intervention Priority Score
$$\text{Priority} = (0.40 \times D_{\text{acc}}) + (0.30 \times D_{\text{built}}) + (0.20 \times D_{\text{veg}}) + (0.10 \times F_{\text{dist}})$$
Where:
- $D_{\text{acc}} = 100 - \text{GAI}$ (Accessibility Deficit)
- $D_{\text{built}} =$ Built-up Density Percentage from Dynamic World
- $D_{\text{veg}} = 100 - S_{\text{cov}}$ (Canopy Scarcity Deficit)
- $F_{\text{dist}} = \min(100, (\text{Nearest Distance} / 2000) \times 100)$

**Priority Tiers:**
- `0 – 30`: **Low** (Relatively accessible green network)
- `31 – 60`: **Medium** (Moderate deficit; monitor corridors)
- `61 – 80`: **High** (Candidate zone for green-space expansion)
- `81 – 100`: **Critical** (Acute deficit & high urban density; prime candidate for pocket parks)

---

## 5. Architecture & Folder Structure

```
SRM hackathon/
├── public/
│   └── favicon.svg                  # GIS Radar/Leaf brand icon
├── src/
│   ├── app/
│   ├── components/
│   │   ├── common/                  # StatCard, Badge, DataModeBadge, DisclaimerBanner
│   │   ├── layout/                  # Header, Sidebar, MobileNav, AppShell
│   │   ├── map/                     # GreenAccessMap, MapLegend, MapLayerControl, ZoneDetailPanel
│   │   ├── charts/                  # Recharts: NDVI, GAI, Priority, Patch Scale, Scatter
│   │   └── methodology/             # PipelineDiagram, FormulaCard, DatasetTable
│   ├── config/
│   │   ├── studyArea.ts             # Central study area configuration
│   │   ├── modelWeights.ts          # GAI & Priority formula weights with validation
│   │   └── thresholds.ts            # Analytical distance & spectral thresholds
│   ├── data/
│   │   ├── demoGeoJson.ts           # Deterministic GeoJSON geometries for Bengaluru
│   │   └── demoData.ts              # Mathematical calculation baseline
│   ├── hooks/
│   │   └── useDashboardData.tsx     # Central React Context & Provider hook
│   ├── lib/
│   │   ├── calculations.ts          # Pure GIS formulas with division-by-zero protection
│   │   ├── formatting.ts            # Area, distance, percentage formatters
│   │   └── recommendations.ts       # Explainable policy generation engine
│   ├── pages/
│   │   ├── OverviewPage.tsx         # Executive command dashboard
│   │   ├── MapPage.tsx              # Primary fullscreen GIS interactive map
│   │   ├── VegetationPage.tsx       # NDVI spectral analysis & patch scale
│   │   ├── AccessibilityPage.tsx    # Distance buffer tiers & walking sheds
│   │   ├── PriorityZonesPage.tsx    # Filterable data table & CSV export
│   │   ├── AnalyticsPage.tsx        # 6-chart multidimensional indicator matrix
│   │   └── MethodologyPage.tsx      # Transparent formulas, pipeline & assumptions
│   ├── providers/
│   │   ├── DemoDataProvider.ts     # Deterministic synthetic provider
│   │   ├── EarthEngineDataProvider.ts # Remote server API adapter with fallback
│   │   └── providerFactory.ts      # Mode factory
│   ├── types/                       # TypeScript interfaces
│   ├── App.tsx                      # React Router structure
│   └── index.css                    # Tailwind CSS + Leaflet styles
├── server/
│   ├── earthEngine/                 # Server-side GEE modules (isolated credentials)
│   │   ├── client.ts
│   │   ├── sentinel.ts
│   │   ├── dynamicWorld.ts
│   │   └── greenSpaces.ts
│   └── routes/
│       └── analysis.ts              # Express API route contracts
├── .env.example                     # Safe environment variable template
├── vercel.json                      # Vercel SPA rewrite configuration
└── package.json
```

---

## 6. Data Integrity & Security Policy

1. **Zero Fake Measurements:**
   In **Demo Mode**, all values are explicitly labeled with `DEMO MODE — Synthetic baseline dataset`. The application never claims synthetic values represent live satellite measurements.
2. **Server-Side Credential Isolation:**
   Google Earth Engine private keys and Service Account credentials reside exclusively in the `server/` directory and backend environment variables (`EARTH_ENGINE_PRIVATE_KEY`). No private credentials are exposed to the client-side bundle or prefixed with `VITE_`.
3. **Graceful Fallback:**
   If the remote Earth Engine API endpoint is unreachable or credentials are unconfigured, `EarthEngineDataProvider` automatically falls back to `DemoDataProvider` with an explanatory notification badge.

---

## 7. Assumptions & Limitations

- **Vegetation Signal vs Public Access:** Satellite NDVI detects vegetative biomass regardless of land tenure (private yards, golf courses, gated estates, or utility corridors).
- **Planar Euclidean Distance:** Distance bands use straight-line centroid proximity rather than topologically routable street networks.
- **Land Cover Product Resolution:** Dynamic World operates at 10m spatial resolution; informal settlements and mixed urban surfaces may exhibit small classification uncertainties.
- **Multidisciplinary Validation Required:** All prioritized zones represent candidate locations for field surveys, ownership verification, and community co-design.

---

## 8. Local Setup & Development

### Prerequisites
- Node.js `18.x` or `20.x`
- npm `9.x` or later

### Installation & Run Commands

```bash
# 1. Clone the repository
git clone https://github.com/your-org/greenaccess-ai.git
cd greenaccess-ai

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser. The application runs immediately in **Demo Mode** with full interactivity, map rendering, and data export.

### Production Build & Preview

```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 9. Vercel Deployment

This project includes a `vercel.json` file configuring Single Page Application (SPA) routing rewrites.

1. Push your repository to GitHub.
2. Import the project into your [Vercel Dashboard](https://vercel.com).
3. Framework Preset: **Vite**.
4. Set optional public environment variables:
   - `VITE_DATA_MODE=demo`
5. Click **Deploy**. The site will deploy and run immediately.

---

## 10. License

Released under the **MIT License**.
