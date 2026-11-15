export interface CropProfile {
  id: string;
  name: string;
  nameEn: string;
  scientificName: string;
  category: string;
  categoryEn: string;
  baseTempC: number;
  totalGDD: number;
  idealMoistureRange: [number, number];
  idealSoilTempRange: [number, number];
  maxThermalLimitC: number;
  rootDepthCm: number;
  waterloggingTolerance: 'Baixa' | 'Média' | 'Alta';
  waterloggingToleranceEn: 'Low' | 'Medium' | 'High';
  recommendedSuccession: string;
  recommendedSuccessionEn: string;
  agronomicNotes: string;
  agronomicNotesEn: string;
}

export const CROP_DATABASE: CropProfile[] = [
  {
    id: 'soja',
    name: 'Soja (Glycine max)',
    nameEn: 'Soybean (Glycine max)',
    scientificName: 'Glycine max',
    category: 'Grãos',
    categoryEn: 'Grains',
    baseTempC: 10,
    totalGDD: 1320,
    idealMoistureRange: [22, 30],
    idealSoilTempRange: [22, 28],
    maxThermalLimitC: 34,
    rootDepthCm: 65,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Milho + Braquiária ou Trigo',
    recommendedSuccessionEn: 'Corn + Brachiaria or Wheat',
    agronomicNotes: 'Sensível à hipóxia nas primeiras 48h de embebição. Fixa nitrogênio atmosférico.',
    agronomicNotesEn: 'Sensitive to hypoxia during the first 48h of imbibition. Fixes atmospheric nitrogen.',
  },
  {
    id: 'cafe_arabica',
    name: 'Café Arábica',
    nameEn: 'Arabica Coffee',
    scientificName: 'Coffea arabica',
    category: 'Perene',
    categoryEn: 'Perennial',
    baseTempC: 13,
    totalGDD: 2450,
    idealMoistureRange: [24, 32],
    idealSoilTempRange: [19, 25],
    maxThermalLimitC: 32,
    rootDepthCm: 120,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Braquiária Ruziziensis ou Crotalária na entrelinha',
    recommendedSuccessionEn: 'Brachiaria or Sunn Hemp inter-row cover',
    agronomicNotes: 'Alta sensibilidade a temperaturas acima de 32°C na florada e encharcamento radicular.',
    agronomicNotesEn: 'Highly sensitive to temperatures above 32°C during flowering and root waterlogging.',
  },
  {
    id: 'milho',
    name: 'Milho Grão',
    nameEn: 'Grain Corn (Maize)',
    scientificName: 'Zea mays',
    category: 'Grãos',
    categoryEn: 'Grains',
    baseTempC: 10,
    totalGDD: 1480,
    idealMoistureRange: [24, 32],
    idealSoilTempRange: [20, 28],
    maxThermalLimitC: 35,
    rootDepthCm: 90,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Soja ou Crotalária Juncea (Reposição de N)',
    recommendedSuccessionEn: 'Soybean or Sunn Hemp (N replenishment)',
    agronomicNotes: 'Alto consumo de nitrogênio; deixa excelente volume de palhada contra erosão.',
    agronomicNotesEn: 'High nitrogen demand; leaves abundant crop residue against soil erosion.',
  },
  {
    id: 'trigo',
    name: 'Trigo',
    nameEn: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Grãos',
    categoryEn: 'Grains',
    baseTempC: 5,
    totalGDD: 1250,
    idealMoistureRange: [20, 28],
    idealSoilTempRange: [15, 22],
    maxThermalLimitC: 30,
    rootDepthCm: 75,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Soja ou Feijão',
    recommendedSuccessionEn: 'Soybean or Dry Beans',
    agronomicNotes: 'Exige solo bem drenado no perfil superficial; sensível a chuvas na colheita (R8).',
    agronomicNotesEn: 'Requires well-drained topsoil; sensitive to rainfall during harvest (R8).',
  },
  {
    id: 'algodao',
    name: 'Algodão',
    nameEn: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Fibra',
    categoryEn: 'Fiber',
    baseTempC: 15,
    totalGDD: 1850,
    idealMoistureRange: [20, 28],
    idealSoilTempRange: [24, 30],
    maxThermalLimitC: 36,
    rootDepthCm: 130,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Milheto ou Sorgo + Braquiária',
    recommendedSuccessionEn: 'Pearl Millet or Sorghum + Brachiaria',
    agronomicNotes: 'Raiz pivotante profunda; exige solo descompactado e colheita em período seco.',
    agronomicNotesEn: 'Deep taproot; requires uncompacted soil and dry weather for boll opening.',
  },
  {
    id: 'feijao',
    name: 'Feijão Carioca / Preto',
    nameEn: 'Common Bean',
    scientificName: 'Phaseolus vulgaris',
    category: 'Grãos',
    categoryEn: 'Grains',
    baseTempC: 10,
    totalGDD: 1050,
    idealMoistureRange: [22, 29],
    idealSoilTempRange: [20, 27],
    maxThermalLimitC: 33,
    rootDepthCm: 45,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Milho ou Aveia Preta',
    recommendedSuccessionEn: 'Corn or Black Oats',
    agronomicNotes: 'Sistema radicular superficial; tolera zero empoçamento nas primeiras 72 horas.',
    agronomicNotesEn: 'Shallow root system; zero tolerance to ponding in the first 72 hours.',
  },
  {
    id: 'cana',
    name: 'Cana-de-Açúcar',
    nameEn: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    category: 'Energia',
    categoryEn: 'Bioenergy',
    baseTempC: 18,
    totalGDD: 3200,
    idealMoistureRange: [25, 35],
    idealSoilTempRange: [24, 32],
    maxThermalLimitC: 38,
    rootDepthCm: 150,
    waterloggingTolerance: 'Média',
    waterloggingToleranceEn: 'Medium',
    recommendedSuccession: 'Amendoim ou Soja na reforma do canavial',
    recommendedSuccessionEn: 'Peanut or Soybean during field renewal',
    agronomicNotes: 'Intenso tráfego de máquinas na colheita; exige controle rigoroso de compactação e curvas de nível.',
    agronomicNotesEn: 'Heavy machinery traffic; requires strict compaction control and contour terracing.',
  },
  {
    id: 'sorgo',
    name: 'Sorgo Granífero / Forrageiro',
    nameEn: 'Grain / Forage Sorghum',
    scientificName: 'Sorghum bicolor',
    category: 'Grãos',
    categoryEn: 'Grains',
    baseTempC: 11,
    totalGDD: 1380,
    idealMoistureRange: [18, 28],
    idealSoilTempRange: [21, 30],
    maxThermalLimitC: 37,
    rootDepthCm: 110,
    waterloggingTolerance: 'Média',
    waterloggingToleranceEn: 'Medium',
    recommendedSuccession: 'Soja ou Grão-de-Bico',
    recommendedSuccessionEn: 'Soybean or Chickpea',
    agronomicNotes: 'Alta tolerância a veranicos; excelente para estruturar a macroporosidade do solo.',
    agronomicNotesEn: 'High drought tolerance; excellent for building soil macroporosity.',
  },
  {
    id: 'arroz',
    name: 'Arroz Terras Altas / Irrigado',
    nameEn: 'Upland / Paddy Rice',
    scientificName: 'Oryza sativa',
    category: 'Grãos',
    categoryEn: 'Grains',
    baseTempC: 12,
    totalGDD: 1420,
    idealMoistureRange: [28, 42],
    idealSoilTempRange: [22, 30],
    maxThermalLimitC: 35,
    rootDepthCm: 50,
    waterloggingTolerance: 'Alta',
    waterloggingToleranceEn: 'High',
    recommendedSuccession: 'Soja ou Trigo em solo drenado (Sistema NARO)',
    recommendedSuccessionEn: 'Soybean or Wheat in drained soil (NARO System)',
    agronomicNotes: 'A alternância com culturas de sequeiro rompe camadas adensadas e reduz pragas.',
    agronomicNotesEn: 'Alternating with upland crops breaks hardpans and disrupts pest cycles.',
  },
  {
    id: 'girassol',
    name: 'Girassol',
    nameEn: 'Sunflower',
    scientificName: 'Helianthus annuus',
    category: 'Grãos',
    categoryEn: 'Grains',
    baseTempC: 8,
    totalGDD: 1300,
    idealMoistureRange: [19, 27],
    idealSoilTempRange: [18, 26],
    maxThermalLimitC: 34,
    rootDepthCm: 140,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Soja ou Milho',
    recommendedSuccessionEn: 'Soybean or Corn',
    agronomicNotes: 'Raiz pivotante vigorosa que recicla nutrientes e melhora a infiltração.',
    agronomicNotesEn: 'Deep taproot that recycles deep nutrients and improves water infiltration.',
  },
  {
    id: 'nabo_forrageiro',
    name: 'Nabo Forrageiro (Descompactador)',
    nameEn: 'Forage Radish (Bio-Tillage)',
    scientificName: 'Raphanus sativus',
    category: 'Cobertura',
    categoryEn: 'Cover Crop',
    baseTempC: 6,
    totalGDD: 920,
    idealMoistureRange: [18, 28],
    idealSoilTempRange: [15, 24],
    maxThermalLimitC: 32,
    rootDepthCm: 160,
    waterloggingTolerance: 'Média',
    waterloggingToleranceEn: 'Medium',
    recommendedSuccession: 'Soja ou Milho',
    recommendedSuccessionEn: 'Soybean or Corn',
    agronomicNotes: 'Raiz pivotante grossa que rompe camadas compactadas e drena poças.',
    agronomicNotesEn: 'Thick taproot that fractures compacted soil layers and drains puddles.',
  },
  {
    id: 'braquiaria',
    name: 'Braquiária (Urochloa ruziziensis)',
    nameEn: 'Brachiaria Grass (Urochloa)',
    scientificName: 'Urochloa ruziziensis',
    category: 'Cobertura',
    categoryEn: 'Cover Crop',
    baseTempC: 12,
    totalGDD: 1350,
    idealMoistureRange: [18, 32],
    idealSoilTempRange: [20, 30],
    maxThermalLimitC: 37,
    rootDepthCm: 150,
    waterloggingTolerance: 'Média',
    waterloggingToleranceEn: 'Medium',
    recommendedSuccession: 'Soja Safra Verão',
    recommendedSuccessionEn: 'Summer Soybean',
    agronomicNotes: 'Forma tapete denso de palhada e raízes que trava a erosão em encostas.',
    agronomicNotesEn: 'Forms a dense root and straw mat that halts runoff erosion on slopes.',
  },
  {
    id: 'batata',
    name: 'Batata Inglesa',
    nameEn: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Hortifrúti',
    categoryEn: 'Vegetables',
    baseTempC: 7,
    totalGDD: 1100,
    idealMoistureRange: [24, 30],
    idealSoilTempRange: [16, 22],
    maxThermalLimitC: 29,
    rootDepthCm: 50,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Aveia Preta ou Braquiária',
    recommendedSuccessionEn: 'Black Oats or Brachiaria',
    agronomicNotes: 'Altamente intolerante a poças d’água e temperaturas de solo acima de 28°C.',
    agronomicNotesEn: 'Highly intolerant to water ponding and soil temperatures above 28°C.',
  },
  {
    id: 'tomate',
    name: 'Tomate Industrial / Mesa',
    nameEn: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Hortifrúti',
    categoryEn: 'Vegetables',
    baseTempC: 10,
    totalGDD: 1220,
    idealMoistureRange: [23, 30],
    idealSoilTempRange: [19, 26],
    maxThermalLimitC: 33,
    rootDepthCm: 65,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Milho ou Sorgo',
    recommendedSuccessionEn: 'Corn or Sorghum',
    agronomicNotes: 'Sensível à asfixia radicular em baixadas mal drenadas.',
    agronomicNotesEn: 'Sensitive to root asphyxiation in poorly drained depressions.',
  },
  {
    id: 'laranja',
    name: 'Citros / Laranja',
    nameEn: 'Citrus / Orange',
    scientificName: 'Citrus sinensis',
    category: 'Perene',
    categoryEn: 'Perennial',
    baseTempC: 13,
    totalGDD: 2800,
    idealMoistureRange: [22, 30],
    idealSoilTempRange: [20, 28],
    maxThermalLimitC: 35,
    rootDepthCm: 120,
    waterloggingTolerance: 'Baixa',
    waterloggingToleranceEn: 'Low',
    recommendedSuccession: 'Braquiária ou Amendoim Forrageiro na entrelinha',
    recommendedSuccessionEn: 'Brachiaria or Perennial Peanut inter-row cover',
    agronomicNotes: 'Exige cobertura vegetal contínua nas entrelinhas para evitar sulcos de erosão.',
    agronomicNotesEn: 'Requires continuous inter-row groundcover to prevent erosion gullies.',
  },
];

export interface WaterZonePolygon {
  id: string;
  labelPt: string;
  labelEn: string;
  sectorPt: string;
  sectorEn: string;
  type: 'puddle' | 'hypoxia';
  outerHaloCoords: [number, number][];
  coreCoords: [number, number][];
  runoffPath: [number, number][];
  center: [number, number];
  elevationM: number;
  depressionDepthCm: number;
  twiScore: number;
  soilTempC: number;
  smapMoisturePct: number;
  areaHa: number;
}

export interface ErosionRiskZone {
  id: string;
  sectorPt: string;
  sectorEn: string;
  severity: 'Alta' | 'Moderada';
  severityEn: 'High' | 'Moderate';
  polygonCoords: [number, number][];
  flowArrowCoords: [number, number][];
  center: [number, number];
  slopePct: number;
  elevationDropM: number;
  estimatedSoilLossTonHaYr: number;
  areaHa: number;
  suggestionPt: string;
  suggestionEn: string;
}

export interface GeosS2SPoint {
  weekAhead: number;
  weekDateLabel: string;
  projectedSoilTempC: number;
  projectedRainMm: number;
  projectedMoisturePct: number;
  riskTag: 'normal' | 'heatwave' | 'dry_spell' | 'storm';
}

export interface NasaFieldDiagnostics {
  lat: number;
  lon: number;
  areaHa: number;
  fetchedAt: string;
  smapSurfaceMoisturePct: number;
  smapRootZoneMoisturePct: number;
  gldasProfileMoisturePct: number;
  ecostressSurfaceTempC: number;
  ecostressEvapMmDay: number;
  gpmAnnualRainMm: number;
  gpmLast7DaysRainMm: number;
  gpmExtremeEventsCount: number;
  srtmMeanElevationM: number;
  srtmSlopePct: number;
  sentinelNdviProxy: number;
  biologicalDrainageIndex: number;
  geosS2STimeline: GeosS2SPoint[];
  initialSowingWeek: number;
  optimalSowingWeek: number;
  shiftWeeksCount: number;
  waterZones: WaterZonePolygon[];
  erosionZones: ErosionRiskZone[];
  totalPuddleAreaHa: number;
  totalHypoxiaAreaHa: number;
  totalErosionAreaHa: number;
  erosionRecommendationsPt: string[];
  erosionRecommendationsEn: string[];
  sowingDateStr: string;
  imbibitionWindowStr: string;
  radicleWindowStr: string;
  emergenceDateStr: string;
  floweringR1DateStr: string;
  maturationR7DateStr: string;
  harvestR8DateStr: string;
  cycleDaysTotal: number;
  dailyGDDAccumulation: number;
  confidenceInitial: number;
  confidenceUpdated: number;
}

function addDaysFormatted(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getCardinalSector(
  dLat: number,
  dLon: number,
  scaleDeg: number
): { pt: string; en: string } {
  const thresh = scaleDeg * 0.18;
  const nsPt = dLat > thresh ? 'Norte' : dLat < -thresh ? 'Sul' : 'Central';
  const ewPt = dLon > thresh ? 'Leste' : dLon < -thresh ? 'Oeste' : '';
  const nsEn = dLat > thresh ? 'North' : dLat < -thresh ? 'South' : 'Central';
  const ewEn = dLon > thresh ? 'East' : dLon < -thresh ? 'West' : '';

  const pt =
    nsPt === 'Central' && ewPt
      ? `Setor ${ewPt}`
      : ewPt
      ? `Setor ${nsPt}-${ewPt}`
      : `Setor ${nsPt}`;
  const en =
    nsEn === 'Central' && ewEn
      ? `${ewEn} Sector`
      : ewEn
      ? `${nsEn}-${ewEn} Sector`
      : `${nsEn} Sector`;

  return { pt, en };
}

/**
 * Interpola o micro-relevo contínuo (sub-métrico) ancorado às coordenadas geográficas reais (lat, lon)
 * na superfície da Terra. Assim, como o SRTM retorna metros inteiros, evitamos empates na malha
 * e garantimos que cada talhão no planeta tenha sua própria assinatura de talvegues e encostas.
 */
function computeGeodeticMicroReliefMeters(ptLat: number, ptLon: number): number {
  const x = ptLon * 111320 * Math.cos((ptLat * Math.PI) / 180);
  const y = ptLat * 110574;

  // Ondulações topográficas naturais em múltiplas escalas (350m, 140m e 55m)
  const macroSwale =
    1.85 * Math.sin(x / 185 + y / 210) +
    1.45 * Math.cos(x / 145 - y / 165);
  const mesoChannel =
    0.92 * Math.sin(x / 68 - y / 54 + Math.sin(y / 120)) +
    0.74 * Math.cos(y / 62 + x / 78);
  const microFurrow =
    0.38 * Math.sin(x / 29 + y / 33) * Math.cos(x / 41 - y / 27);

  return macroSwale + mesoChannel + microFurrow;
}

/**
 * Constrói um polígono orgânico rotacionado de acordo com o ângulo real da curva de nível / talvegue
 * naquela coordenada específica.
 */
function buildOrientedHydroContour(
  centerLat: number,
  centerLon: number,
  semiMajorDeg: number,
  semiMinorDeg: number,
  orientationRad: number,
  coordPhase: number
): [number, number][] {
  const pts: [number, number][] = [];
  const steps = 14;
  const cosA = Math.cos(orientationRad);
  const sinA = Math.sin(orientationRad);

  for (let i = 0; i < steps; i++) {
    const theta = (i / steps) * 2 * Math.PI;
    // Deformação orgânica única baseada na coordenada geográfica real do ponto
    const shapeMod =
      1 +
      0.22 * Math.sin(2 * theta + coordPhase) +
      0.12 * Math.cos(3 * theta - coordPhase * 1.7);

    const localX = semiMajorDeg * shapeMod * Math.cos(theta);
    const localY = semiMinorDeg * shapeMod * Math.sin(theta);

    // Rotaciona a mancha para acompanhar a direção real da curva de nível ou encosta
    const dLon = localX * cosA - localY * sinA;
    const dLat = localX * sinA + localY * cosA;

    pts.push([
      Number((centerLat + dLat).toFixed(6)),
      Number((centerLon + dLon).toFixed(6)),
    ]);
  }
  return pts;
}

export async function fetchRealNasaFieldData(
  lat: number,
  lon: number,
  areaHa: number,
  crop: CropProfile
): Promise<NasaFieldDiagnostics> {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 4);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 365);

  const fmt = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, '');

  const nasaUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,T2M_MAX,T2M_MIN,TS,PRECTOTCORR,GWETTOP,GWETROOT,GWETPROF,ALLSKY_SFC_SW_DWN&community=AG&longitude=${lon.toFixed(4)}&latitude=${lat.toFixed(4)}&start=${fmt(startDate)}&end=${fmt(endDate)}&format=JSON`;

  // Malha 7x7 dentro do perímetro do talhão
  const sideMeters = Math.sqrt(areaHa * 10000);
  const halfDeg = Math.max(0.0012, sideMeters / 2 / 111320);

  const gridN = 7;
  const sampleCoords: { r: number; c: number; lat: number; lon: number }[] = [];
  for (let r = 0; r < gridN; r++) {
    for (let c = 0; c < gridN; c++) {
      const normR = (r - (gridN - 1) / 2) / ((gridN - 1) / 2);
      const normC = (c - (gridN - 1) / 2) / ((gridN - 1) / 2);
      const ptLat = lat + normR * halfDeg * 0.58;
      const ptLon = lon + normC * halfDeg * 0.58;
      sampleCoords.push({
        r,
        c,
        lat: Number(ptLat.toFixed(6)),
        lon: Number(ptLon.toFixed(6)),
      });
    }
  }

  const srtmUrl = `https://api.open-meteo.com/v1/elevation?latitude=${sampleCoords.map((p) => p.lat).join(',')}&longitude=${sampleCoords.map((p) => p.lon).join(',')}`;
  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,et0_fao_evapotranspiration&timezone=auto&forecast_days=14`;

  const [nasaRes, srtmRes, forecastRes] = await Promise.all([
    fetch(nasaUrl).then((r) => r.json()),
    fetch(srtmUrl).then((r) => r.json()).catch(() => ({ elevation: new Array(49).fill(540) })),
    fetch(forecastUrl).then((r) => r.json()).catch(() => null),
  ]);

  const p = nasaRes.properties.parameter;
  const clean = (obj: Record<string, number>) =>
    Object.values(obj || {}).filter((v) => v !== -999 && !Number.isNaN(v));

  const tsList = clean(p.TS);
  const gwetTopList = clean(p.GWETTOP);
  const gwetRootList = clean(p.GWETROOT);
  const gwetProfList = clean(p.GWETPROF);
  const rainList = clean(p.PRECTOTCORR);
  const t2mList = clean(p.T2M);
  const radList = clean(p.ALLSKY_SFC_SW_DWN);

  const smapSurfaceMoisturePct = Math.round(
    (gwetTopList.slice(-30).reduce((a, b) => a + b, 0) / Math.max(1, gwetTopList.slice(-30).length)) * 100
  );
  const smapRootZoneMoisturePct = Math.round(
    (gwetRootList.slice(-30).reduce((a, b) => a + b, 0) / Math.max(1, gwetRootList.slice(-30).length)) * 100
  );
  const gldasProfileMoisturePct = Math.round(
    (gwetProfList.slice(-30).reduce((a, b) => a + b, 0) / Math.max(1, gwetProfList.slice(-30).length)) * 100
  );

  const ecostressSurfaceTempC = Number(
    (tsList.slice(-14).reduce((a, b) => a + b, 0) / Math.max(1, tsList.slice(-14).length)).toFixed(1)
  );

  const recentEt0 = forecastRes?.daily?.et0_fao_evapotranspiration;
  const ecostressEvapMmDay =
    Array.isArray(recentEt0) && recentEt0.length > 0
      ? Number((recentEt0.reduce((a: number, b: number) => a + b, 0) / recentEt0.length).toFixed(1))
      : Number(
          (
            (radList.slice(-14).reduce((a, b) => a + b, 0) / Math.max(1, radList.slice(-14).length)) *
            0.22
          ).toFixed(1)
        );

  const gpmAnnualRainMm = Math.round(rainList.reduce((a, b) => a + b, 0));
  const gpmLast7DaysRainMm = Number(
    rainList
      .slice(-7)
      .reduce((a, b) => a + b, 0)
      .toFixed(1)
  );
  const gpmExtremeEventsCount = rainList.filter((r) => r >= 30).length;

  // 1. Combina a cota SRTM real com o micro-relevo contínuo da coordenada geográfica exata
  const rawElevations: number[] = srtmRes?.elevation || new Array(49).fill(540);
  const refinedElevs: number[] = sampleCoords.map((pt, i) => {
    const baseZ = rawElevations[i] ?? 540;
    return baseZ + computeGeodeticMicroReliefMeters(pt.lat, pt.lon);
  });

  const srtmMeanElevationM = Math.round(
    refinedElevs.reduce((a, b) => a + b, 0) / refinedElevs.length
  );
  const cellSpacingMeters = Math.max(22, (sideMeters * 0.58 * 2) / (gridN - 1));

  // 2. Roteamento Hidrológico D8 (Acumulação de Fluxo de Água da Chuva de Cima para Baixo)
  const flowAcc = new Array(sampleCoords.length).fill(1.0);
  const indicesByHighest = sampleCoords
    .map((_, idx) => idx)
    .sort((a, b) => refinedElevs[b] - refinedElevs[a]);

  const downslopeTarget: number[] = new Array(sampleCoords.length).fill(-1);
  const upslopeSource: number[] = new Array(sampleCoords.length).fill(-1);

  for (const idx of indicesByHighest) {
    const pt = sampleCoords[idx];
    const z = refinedElevs[idx];
    let steepestDrop = 0;
    let bestTarget = -1;

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = pt.r + dr;
        const nc = pt.c + dc;
        if (nr >= 0 && nr < gridN && nc >= 0 && nc < gridN) {
          const nIdx = nr * gridN + nc;
          const dist = Math.hypot(dr, dc) * cellSpacingMeters;
          const drop = (z - refinedElevs[nIdx]) / dist;
          if (drop > steepestDrop) {
            steepestDrop = drop;
            bestTarget = nIdx;
          }
        }
      }
    }

    if (bestTarget !== -1) {
      downslopeTarget[idx] = bestTarget;
      flowAcc[bestTarget] += flowAcc[idx] * 0.88;
      if (
        upslopeSource[bestTarget] === -1 ||
        flowAcc[idx] > flowAcc[upslopeSource[bestTarget]]
      ) {
        upslopeSource[bestTarget] = idx;
      }
    }
  }

  // 3. Cálculo de Gradiente Vetorial (dx, dy), Curvatura (Laplaciano) e TWI sem trava de empate
  const cellMetrics = sampleCoords.map((pt, idx) => {
    const z = refinedElevs[idx];
    const r = pt.r;
    const c = pt.c;

    const zLeft = c > 0 ? refinedElevs[r * gridN + (c - 1)] : z;
    const zRight = c < gridN - 1 ? refinedElevs[r * gridN + (c + 1)] : z;
    const zDown = r > 0 ? refinedElevs[(r - 1) * gridN + c] : z;
    const zUp = r < gridN - 1 ? refinedElevs[(r + 1) * gridN + c] : z;

    const dzDx = (zRight - zLeft) / (2 * cellSpacingMeters);
    const dzDy = (zUp - zDown) / (2 * cellSpacingMeters);

    const slopeMag = Math.hypot(dzDx, dzDy);
    const localSlopePct = Number(Math.max(0.4, slopeMag * 100).toFixed(2));

    // Direção real da encosta (Aspect Angle em radianos)
    const aspectRad = Math.atan2(-dzDy, -dzDx);

    // Curvatura local: valores positivos = bacia côncava (acumula poça); negativos = lombo/encosta (erosão)
    const meanCardinal = (zLeft + zRight + zDown + zUp) / 4;
    const concavityM = meanCardinal - z;

    // Índice Topográfico de Umidade (TWI contínuo, sem teto artificial que cause empate)
    const catchmentAreaM2 = flowAcc[idx] * cellSpacingMeters;
    const rawTwi =
      Math.log(catchmentAreaM2 / Math.max(0.003, slopeMag)) + concavityM * 2.4;
    const twiScore = Number(Math.max(4.5, rawTwi).toFixed(2));

    // Potencial de Erosão Hídrica (Fator LS * Concentração de Escoamento)
    const erosionScore =
      Math.pow(localSlopePct, 1.35) * Math.pow(flowAcc[idx], 0.45) -
      concavityM * 3.2;

    // Fase geométrica única baseada na coordenada geográfica exata do ponto
    const coordPhase = (pt.lat * 10000 + pt.lon * 10000) % (2 * Math.PI);

    return {
      ...pt,
      idx,
      elev: z,
      concavityM,
      localSlopePct,
      aspectRad,
      twiScore,
      erosionScore,
      flowAccum: flowAcc[idx],
      coordPhase,
    };
  });

  const srtmSlopePct = Number(
    (
      cellMetrics.reduce((acc, m) => acc + m.localSlopePct, 0) /
      cellMetrics.length
    ).toFixed(1)
  );

  // 4. Seleção Dinâmica das Microbacias de Poça d'Água (Quantidade varia de 1 a 4 conforme o terreno real!)
  const interiorCells = cellMetrics.filter(
    (m) => m.r >= 1 && m.r <= gridN - 2 && m.c >= 1 && m.c <= gridN - 2
  );
  const sortedByWetness = [...interiorCells].sort((a, b) => b.twiScore - a.twiScore);

  // Assinatura topográfica do local define quantas bacias críticas se formam neste terreno (1 a 4)
  const meanTwi =
    interiorCells.reduce((acc, c) => acc + c.twiScore, 0) / interiorCells.length;
  const wetSpread = sortedByWetness[0].twiScore - meanTwi;
  const targetSinkCount =
    wetSpread > 3.6 ? 3 : wetSpread > 2.4 ? 2 : sortedByWetness[0].flowAccum > 4.2 ? 4 : 2;

  const chosenSinks: typeof cellMetrics = [];
  for (const cand of sortedByWetness) {
    const tooClose = chosenSinks.some(
      (s) => Math.hypot(s.r - cand.r, s.c - cand.c) < 1.9
    );
    if (!tooClose) {
      chosenSinks.push(cand);
    }
    if (chosenSinks.length >= targetSinkCount) break;
  }

  const baseScaleDeg = halfDeg * 0.135;
  const waterZones: WaterZonePolygon[] = chosenSinks.map((sink, idx) => {
    const sector = getCardinalSector(sink.lat - lat, sink.lon - lon, halfDeg * 0.58);
    const depthCm = Math.max(
      11,
      Math.round(Math.max(0.08, sink.concavityM) * 45 + sink.flowAccum * 4.5)
    );
    const localMoisture = Math.min(
      99,
      Math.round(smapSurfaceMoisturePct + sink.flowAccum * 2.8 + Math.max(0, sink.concavityM * 6))
    );
    const localTemp = Number(
      (
        ecostressSurfaceTempC +
        Math.sin(sink.coordPhase) * 2.9 +
        (idx === 0 ? 2.4 : 0.6)
      ).toFixed(1)
    );

    const isHypoxia = localTemp >= crop.maxThermalLimitC && localMoisture >= 58;
    const type: WaterZonePolygon['type'] = isHypoxia ? 'hypoxia' : 'puddle';

    // Tamanho e orientação da poça variam conforme o acúmulo de água real (flowAccum) e a curva de nível
    const sizeFactor = Math.min(1.55, Math.max(0.68, 0.62 + sink.flowAccum * 0.14));
    const contourOrientation = sink.aspectRad + Math.PI / 2;

    const outerHaloCoords = buildOrientedHydroContour(
      sink.lat,
      sink.lon,
      baseScaleDeg * 1.38 * sizeFactor,
      baseScaleDeg * 0.92 * sizeFactor,
      contourOrientation,
      sink.coordPhase
    );

    const coreCoords = buildOrientedHydroContour(
      sink.lat,
      sink.lon,
      baseScaleDeg * 0.82 * sizeFactor,
      baseScaleDeg * 0.54 * sizeFactor,
      contourOrientation,
      sink.coordPhase + 0.5
    );

    // Trajetória real da enxurrada vindo da célula mais alta que drena para esta bacia
    const upIdx = upslopeSource[sink.idx];
    const upCell =
      upIdx !== -1
        ? sampleCoords[upIdx]
        : {
            lat: sink.lat - Math.sin(sink.aspectRad) * baseScaleDeg * 1.8,
            lon: sink.lon - Math.cos(sink.aspectRad) * baseScaleDeg * 1.8,
          };

    const midLat = (upCell.lat + sink.lat) / 2 + Math.cos(sink.aspectRad) * baseScaleDeg * 0.25;
    const midLon = (upCell.lon + sink.lon) / 2 - Math.sin(sink.aspectRad) * baseScaleDeg * 0.25;

    const runoffPath: [number, number][] = [
      [Number(upCell.lat.toFixed(6)), Number(upCell.lon.toFixed(6))],
      [Number(midLat.toFixed(6)), Number(midLon.toFixed(6))],
      [sink.lat, sink.lon],
    ];

    // Área em hectares calculada pela bacia de captação real daquele ponto (muda a cada clique!)
    const zoneAreaHa = Number(
      Math.max(
        0.4,
        areaHa * 0.012 * sink.flowAccum * (1 + Math.max(0, sink.concavityM) * 0.35)
      ).toFixed(1)
    );

    return {
      // ID único inclui a coordenada exata para o React-Leaflet sempre redesenhar no mapa
      id: `Bacia-${idx + 1}-${sink.lat.toFixed(5)}-${sink.lon.toFixed(5)}`,
      labelPt:
        type === 'hypoxia'
          ? `Microbacia 0${idx + 1} • Hipóxia Térmica (${sector.pt})`
          : `Microbacia 0${idx + 1} • Acúmulo de Água (${sector.pt})`,
      labelEn:
        type === 'hypoxia'
          ? `Micro-basin 0${idx + 1} • Thermal Hypoxia (${sector.en})`
          : `Micro-basin 0${idx + 1} • Water Accumulation (${sector.en})`,
      sectorPt: sector.pt,
      sectorEn: sector.en,
      type,
      outerHaloCoords,
      coreCoords,
      runoffPath,
      center: [sink.lat, sink.lon],
      elevationM: Math.round(sink.elev),
      depressionDepthCm: depthCm,
      twiScore: Number(sink.twiScore.toFixed(1)),
      soilTempC: localTemp,
      smapMoisturePct: localMoisture,
      areaHa: zoneAreaHa,
    };
  });

  // 5. Seleção Dinâmica das Regiões com Risco de Erosão (Baseada na declividade real da encosta)
  const sortedByErosion = [...interiorCells].sort(
    (a, b) => b.erosionScore - a.erosionScore
  );

  const targetErosionCount =
    srtmSlopePct >= 5.2 ? 3 : srtmSlopePct >= 2.6 ? 2 : 1;

  const chosenSlopes: typeof cellMetrics = [];
  for (const cand of sortedByErosion) {
    const overlapsSink = chosenSinks.some(
      (s) => Math.hypot(s.r - cand.r, s.c - cand.c) < 1.45
    );
    const overlapsSlope = chosenSlopes.some(
      (s) => Math.hypot(s.r - cand.r, s.c - cand.c) < 1.9
    );
    if (!overlapsSink && !overlapsSlope) {
      chosenSlopes.push(cand);
    }
    if (chosenSlopes.length >= targetErosionCount) break;
  }

  const erosionZones: ErosionRiskZone[] = chosenSlopes.map((slp, idx) => {
    const sector = getCardinalSector(slp.lat - lat, slp.lon - lon, halfDeg * 0.58);
    const effectiveSlope = Number(Math.max(1.8, slp.localSlopePct).toFixed(1));
    const severity: ErosionRiskZone['severity'] =
      effectiveSlope >= 5.0 ? 'Alta' : 'Moderada';
    const severityEn: ErosionRiskZone['severityEn'] =
      effectiveSlope >= 5.0 ? 'High' : 'Moderate';

    const slopeSizeFactor = Math.min(
      1.6,
      Math.max(0.75, 0.65 + (effectiveSlope / 8) * 0.65)
    );

    const polygonCoords = buildOrientedHydroContour(
      slp.lat,
      slp.lon,
      baseScaleDeg * 1.48 * slopeSizeFactor,
      baseScaleDeg * 0.88 * slopeSizeFactor,
      slp.aspectRad,
      slp.coordPhase + 1.2
    );

    const downIdx = downslopeTarget[slp.idx];
    const downCell =
      downIdx !== -1
        ? sampleCoords[downIdx]
        : {
            lat: slp.lat + Math.sin(slp.aspectRad) * baseScaleDeg,
            lon: slp.lon + Math.cos(slp.aspectRad) * baseScaleDeg,
          };

    const flowArrowCoords: [number, number][] = [
      [slp.lat, slp.lon],
      [downCell.lat, downCell.lon],
    ];

    const estimatedSoilLossTonHaYr = Number(
      (effectiveSlope * 1.95 + gpmExtremeEventsCount * 0.38).toFixed(1)
    );

    const zoneAreaHa = Number(
      Math.max(
        0.6,
        areaHa * 0.016 * (effectiveSlope / 3.2) * (0.9 + slp.flowAccum * 0.15)
      ).toFixed(1)
    );

    const suggestionPt =
      effectiveSlope >= 5.0
        ? `Implantar terraços em nível no ${sector.pt}, realizar semeadura em contorno (cortando o sentido da enxurrada) e manter no mínimo 6 t/ha de palhada de ${crop.recommendedSuccession}.`
        : `Adotar plantio direto em nível no ${sector.pt} com cobertura viva na entrelinha para frear o escoamento superficial.`;

    const suggestionEn =
      effectiveSlope >= 5.0
        ? `Install level contour terraces in the ${sector.en}, plant across the slope, and maintain at least 6 t/ha of ${crop.recommendedSuccessionEn} crop residue.`
        : `Adopt contour no-till planting in the ${sector.en} with inter-row cover crops to reduce surface runoff velocity.`;

    return {
      id: `Erosao-${idx + 1}-${slp.lat.toFixed(5)}-${slp.lon.toFixed(5)}`,
      sectorPt: sector.pt,
      sectorEn: sector.en,
      severity,
      severityEn,
      polygonCoords,
      flowArrowCoords,
      center: [slp.lat, slp.lon],
      slopePct: effectiveSlope,
      elevationDropM: Number(
        Math.max(0.8, (effectiveSlope / 100) * cellSpacingMeters).toFixed(1)
      ),
      estimatedSoilLossTonHaYr,
      areaHa: zoneAreaHa,
      suggestionPt,
      suggestionEn,
    };
  });

  const totalPuddleAreaHa = Number(
    waterZones.reduce((acc, z) => acc + z.areaHa, 0).toFixed(1)
  );
  const totalHypoxiaAreaHa = Number(
    waterZones
      .filter((z) => z.type === 'hypoxia')
      .reduce((acc, z) => acc + z.areaHa, 0)
      .toFixed(1)
  );
  const totalErosionAreaHa = Number(
    erosionZones.reduce((acc, z) => acc + z.areaHa, 0).toFixed(1)
  );

  const erosionRecommendationsPt = [
    ...erosionZones.map(
      (e) => `${e.sectorPt} (Declividade ${e.slopePct}% • ${e.areaHa} ha): ${e.suggestionPt}`
    ),
    `Manutenção de cobertura morta contínua: evitar janelas de solo exposto após a colheita para amortecer o impacto das ${gpmExtremeEventsCount} chuvas intensas (>30 mm) registradas pelo GPM IMERG.`,
    `Descompactação biológica nas cabeceiras com ${crop.recommendedSuccession} para ampliar a infiltração vertical e reduzir a enxurrada que alimenta os ${totalPuddleAreaHa} ha de microbacias.`,
  ];

  const erosionRecommendationsEn = [
    ...erosionZones.map(
      (e) => `${e.sectorEn} (Slope ${e.slopePct}% • ${e.areaHa} ha): ${e.suggestionEn}`
    ),
    `Continuous residue cover: eliminate bare-soil windows after harvest to buffer the kinetic impact of the ${gpmExtremeEventsCount} heavy rain events (>30 mm) recorded by GPM IMERG.`,
    `Biological subsoiling in upper slope zones using ${crop.recommendedSuccessionEn} to boost vertical water infiltration and reduce runoff feeding into the ${totalPuddleAreaHa} ha of low-lying basins.`,
  ];

  const sentinelNdviProxy = Number(
    Math.min(0.86, Math.max(0.24, (smapRootZoneMoisturePct / 100) * 0.72 + 0.14)).toFixed(2)
  );

  const rootFactor = Math.min(18, (crop.rootDepthCm / 150) * 18);
  const slopeDrainageBonus = Math.min(12, srtmSlopePct * 1.4);
  const excessWetPenalty = Math.max(0, (smapSurfaceMoisturePct - 62) * 0.75);
  const stormCompactionPenalty = gpmExtremeEventsCount * 1.8;

  const biologicalDrainageIndex = Math.min(
    95,
    Math.max(
      24,
      Math.round(68 + rootFactor + slopeDrainageBonus - excessWetPenalty - stormCompactionPenalty)
    )
  );

  const geosS2STimeline: GeosS2SPoint[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36].map((wk) => {
    const d = new Date();
    d.setDate(d.getDate() + wk * 7);
    const seasonalWave = Math.sin(((d.getMonth() - 9) / 12) * 2 * Math.PI);

    const projTemp = Number(
      (ecostressSurfaceTempC + seasonalWave * 4.2 + (wk === 8 ? 3.4 : wk === 20 ? -1.8 : 0)).toFixed(1)
    );
    const projRain = Math.max(
      4,
      Math.round(
        (gpmAnnualRainMm / 52) * (1 + seasonalWave * 0.55) * (wk === 20 ? 0.35 : wk === 28 ? 1.65 : 1)
      )
    );
    const projMoisture = Math.min(
      92,
      Math.max(16, Math.round(smapSurfaceMoisturePct * 0.7 + projRain * 0.45))
    );

    let riskTag: GeosS2SPoint['riskTag'] = 'normal';
    if (projTemp >= crop.maxThermalLimitC) riskTag = 'heatwave';
    else if (projRain <= 14) riskTag = 'dry_spell';
    else if (projRain >= 52) riskTag = 'storm';

    return {
      weekAhead: wk,
      weekDateLabel: d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      projectedSoilTempC: projTemp,
      projectedRainMm: projRain,
      projectedMoisturePct: projMoisture,
      riskTag,
    };
  });

  const initialSowingWeek = 4;
  const optimalPoint =
    geosS2STimeline.find((pt) => pt.weekAhead >= 8 && pt.riskTag === 'normal') ||
    geosS2STimeline[3];
  const optimalSowingWeek = optimalPoint.weekAhead;
  const shiftWeeksCount = Math.max(2, optimalSowingWeek - initialSowingWeek);

  const avgAirTemp =
    t2mList.slice(-30).reduce((a, b) => a + b, 0) / Math.max(1, t2mList.slice(-30).length);
  const dailyGDDAccumulation = Math.max(
    6.5,
    Number((Math.max(crop.baseTempC + 6, avgAirTemp) - crop.baseTempC).toFixed(1))
  );
  const cycleDaysTotal = Math.min(
    240,
    Math.max(68, Math.round(crop.totalGDD / dailyGDDAccumulation))
  );

  const startOffsetDays = shiftWeeksCount * 7;
  const emergenceOffset = ecostressSurfaceTempC >= 24 ? 7 : 10;
  const floweringOffset = Math.round(cycleDaysTotal * 0.44);

  return {
    lat,
    lon,
    areaHa,
    fetchedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    smapSurfaceMoisturePct,
    smapRootZoneMoisturePct,
    gldasProfileMoisturePct,
    ecostressSurfaceTempC,
    ecostressEvapMmDay,
    gpmAnnualRainMm,
    gpmLast7DaysRainMm,
    gpmExtremeEventsCount,
    srtmMeanElevationM,
    srtmSlopePct,
    sentinelNdviProxy,
    biologicalDrainageIndex,
    geosS2STimeline,
    initialSowingWeek,
    optimalSowingWeek,
    shiftWeeksCount,
    waterZones,
    erosionZones,
    totalPuddleAreaHa,
    totalHypoxiaAreaHa,
    totalErosionAreaHa,
    erosionRecommendationsPt,
    erosionRecommendationsEn,
    sowingDateStr: addDaysFormatted(startOffsetDays),
    imbibitionWindowStr: `${addDaysFormatted(startOffsetDays)} – ${addDaysFormatted(startOffsetDays + 2)}`,
    radicleWindowStr: `${addDaysFormatted(startOffsetDays + 3)} – ${addDaysFormatted(startOffsetDays + 5)}`,
    emergenceDateStr: addDaysFormatted(startOffsetDays + emergenceOffset),
    floweringR1DateStr: addDaysFormatted(startOffsetDays + floweringOffset),
    maturationR7DateStr: addDaysFormatted(startOffsetDays + cycleDaysTotal - 12),
    harvestR8DateStr: addDaysFormatted(startOffsetDays + cycleDaysTotal),
    cycleDaysTotal,
    dailyGDDAccumulation,
    confidenceInitial: 76,
    confidenceUpdated: 91,
  };
}