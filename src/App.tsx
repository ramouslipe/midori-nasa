import { useEffect, useState, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Tooltip,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets,
  CloudRain,
  Calendar,
  FileText,
  Sprout,
  AlertTriangle,
  CheckCircle2,
  Thermometer,
  ChevronRight,
  RefreshCw,
  Smartphone,
  MapPin,
  Search,
  Maximize2,
  FileDown,
  Cloud,
  Printer,
  PlusCircle,
  Edit3,
  ArrowRight,
  Globe,
  Mountain,
} from 'lucide-react';
import {
  fetchRealNasaFieldData,
  CROP_DATABASE,
  type CropProfile,
  type NasaFieldDiagnostics,
} from './services/nasaService';

function MapClickHandler({
  onSelectLocation,
}: {
  onSelectLocation: (lat: number, lon: number) => void;
}) {
  useMapEvents({
    click(e) {
      onSelectLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapViewportSync({
  lat,
  lon,
  areaHa,
}: {
  lat: number;
  lon: number;
  areaHa: number;
}) {
  const map = useMap();
  useEffect(() => {
    const targetZoom =
      areaHa <= 35 ? 16 : areaHa <= 120 ? 15 : areaHa <= 300 ? 14 : 13;
    map.setView([lat, lon], targetZoom, { animate: true });
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 120);
    return () => clearTimeout(timer);
  }, [lat, lon, areaHa, map]);
  return null;
}

export default function App() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [farmName, setFarmName] = useState<string>('Fazenda Horizonte • Área 04');
  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: -24.0438,
    lon: -52.3811,
  });

  const [cityQuery, setCityQuery] = useState<string>('');
  const [searchingCity, setSearchingCity] = useState<boolean>(false);

  const [sliderHa, setSliderHa] = useState<number>(80);
  const [areaHa, setAreaHa] = useState<number>(80);

  const [customCrops, setCustomCrops] = useState<CropProfile[]>(CROP_DATABASE);
  const [selectedCrop, setSelectedCrop] = useState<CropProfile>(CROP_DATABASE[0]);
  const [cropSearch, setCropSearch] = useState<string>('');
  const [showCropDropdown, setShowCropDropdown] = useState<boolean>(false);

  const [mapLayer, setMapLayer] = useState<'hydro' | 'smap' | 'lst'>('hydro');
  const [data, setData] = useState<NasaFieldDiagnostics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [weeklyActive, setWeeklyActive] = useState<boolean>(true);
  const [showPdfPreview, setShowPdfPreview] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAreaHa(sliderHa);
    }, 220);
    return () => clearTimeout(timer);
  }, [sliderHa]);

  const stepsList = useMemo(
    () => [
      {
        id: 1,
        num: '01',
        tag: lang === 'pt' ? 'DIAGNÓSTICO DO TALHÃO' : 'FIELD DIAGNOSTICS',
        title: lang === 'pt' ? 'Mapeamento e Drenagem' : 'Terrain & Soil Drainage',
        desc:
          lang === 'pt'
            ? 'Delimite a área produtiva, avalie a infiltração do solo e identifique zonas de conservação.'
            : 'Outline the productive area, evaluate soil infiltration, and identify conservation zones.',
        icon: Droplets,
      },
      {
        id: 2,
        num: '02',
        tag: lang === 'pt' ? 'RISCO HIDROCLIMÁTICO' : 'HYDRO-CLIMATE RISK',
        title: lang === 'pt' ? 'Dinâmica Hídrica e Janela Sazonal' : 'Hydrology & Sowing Window',
        desc:
          lang === 'pt'
            ? 'Analise bacias de saturação no relevo e posicione o plantio fora de extremos climáticos.'
            : 'Analyze terrain saturation basins and position sowing outside climate extremes.',
        icon: CloudRain,
      },
      {
        id: 3,
        num: '03',
        tag: lang === 'pt' ? 'PLANEJAMENTO FENOLÓGICO' : 'PHENOLOGICAL PLANNING',
        title: lang === 'pt' ? 'Cronograma de Safra' : 'Crop Cycle Timeline',
        desc:
          lang === 'pt'
            ? 'Sincronize semeadura, emergência, floração e colheita sob condições ideais de campo.'
            : 'Synchronize sowing, emergence, flowering, and harvest under optimal field conditions.',
        icon: Calendar,
      },
      {
        id: 4,
        num: '04',
        tag: lang === 'pt' ? 'PRESCRIÇÃO E TELEMETRIA' : 'PRESCRIPTION & TELEMETRY',
        title: lang === 'pt' ? 'Laudo Agronômico e Radar Mobile' : 'Agronomic Report & Mobile Radar',
        desc:
          lang === 'pt'
            ? 'Exporte o parecer técnico em PDF e ative o acompanhamento semanal direto no celular.'
            : 'Export the technical PDF report and enable weekly orbital tracking on your phone.',
        icon: FileText,
      },
    ],
    [lang]
  );

  const filteredCrops = useMemo(() => {
    const q = cropSearch.trim().toLowerCase();
    if (!q) return customCrops;
    return customCrops.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.scientificName.toLowerCase().includes(q)
    );
  }, [cropSearch, customCrops]);

  const handleAddCustomCrop = () => {
    const cleanName = cropSearch.trim();
    if (!cleanName) return;
    const newCrop: CropProfile = {
      id: `custom_${Date.now()}`,
      name: cleanName,
      nameEn: cleanName,
      scientificName: 'Custom cultivar',
      category: 'Grãos',
      categoryEn: 'Grains',
      baseTempC: 10,
      totalGDD: 1350,
      idealMoistureRange: [22, 30],
      idealSoilTempRange: [20, 28],
      maxThermalLimitC: 34,
      rootDepthCm: 80,
      waterloggingTolerance: 'Baixa',
      waterloggingToleranceEn: 'Low',
      recommendedSuccession: 'Braquiária, Aveia Preta ou Crotalária',
      recommendedSuccessionEn: 'Brachiaria Grass, Black Oats or Sunn Hemp',
      agronomicNotes:
        'Favorece canais biológicos nas zonas compactadas e melhora a infiltração.',
      agronomicNotesEn:
        'Promotes biological root channels in compacted zones and improves water infiltration.',
    };
    setCustomCrops((prev) => [newCrop, ...prev]);
    setSelectedCrop(newCrop);
    setShowCropDropdown(false);
  };

  const handleSearchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = cityQuery.trim();
    if (!q) return;

    const coordMatch = q.match(/^(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)$/);
    if (coordMatch) {
      setCoords({ lat: Number(coordMatch[1]), lon: Number(coordMatch[3]) });
      return;
    }

    try {
      setSearchingCity(true);
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          q
        )}&count=1&language=${lang}&format=json`
      );
      const json = await res.json();
      if (json.results && json.results.length > 0) {
        const place = json.results[0];
        setCoords({ lat: place.latitude, lon: place.longitude });
        setFarmName(`${place.name} • ${place.admin1 || place.country}`);
      }
    } finally {
      setSearchingCity(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchRealNasaFieldData(coords.lat, coords.lon, areaHa, selectedCrop)
      .then((res) => {
        if (mounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [coords.lat, coords.lon, areaHa, selectedCrop]);

  const fieldPolygon = useMemo((): [number, number][] => {
    const sideMeters = Math.sqrt(sliderHa * 10000);
    const d = Math.max(0.0012, sideMeters / 2 / 111320);
    return [
      [coords.lat + d * 0.95, coords.lon - d * 1.05],
      [coords.lat + d * 1.15, coords.lon + d * 0.55],
      [coords.lat + d * 0.45, coords.lon + d * 1.25],
      [coords.lat - d * 0.98, coords.lon + d * 0.95],
      [coords.lat - d * 1.1, coords.lon - d * 0.75],
      [coords.lat - d * 0.18, coords.lon - d * 1.28],
    ];
  }, [coords.lat, coords.lon, sliderHa]);

  const gibsDate = new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10);
  const cropDisplayName = lang === 'pt' ? selectedCrop.name : selectedCrop.nameEn;
  const cropSuccessionName =
    lang === 'pt' ? selectedCrop.recommendedSuccession : selectedCrop.recommendedSuccessionEn;
  const cropNotesText =
    lang === 'pt' ? selectedCrop.agronomicNotes : selectedCrop.agronomicNotesEn;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between p-3 lg:px-6 lg:py-4 gap-3.5 overflow-x-hidden">
      {/* CABEÇALHO RESPONSIVO: LOGO CENTRALIZADA E GRANDE NO MOBILE, ALINHADA À ESQUERDA NO PC */}
      <header className="no-print w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0d2b1d]/95 backdrop-blur-md border border-white/15 rounded-2xl px-4 sm:px-6 py-4 sm:py-3.5 text-white shadow-lg shrink-0">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-7">
          <div className="flex items-center justify-center py-1 sm:py-0.5">
            <img
              src="/logofundoescuro.png"
              alt="MIDORI"
              className="h-16 sm:h-[62px] w-auto object-contain scale-135 sm:scale-125 origin-center sm:origin-left drop-shadow-md select-none sm:mr-6"
            />
          </div>
          <div className="hidden sm:block h-11 w-[1px] bg-white/15" />
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.22em] text-emerald-300 font-semibold block">
              {lang === 'pt'
                ? 'INTELIGÊNCIA GEOESPACIAL AGRÍCOLA'
                : 'AGRICULTURAL GEOSPATIAL INTELLIGENCE'}
            </span>
            <h1 className="text-sm md:text-lg font-semibold text-white tracking-tight leading-snug mt-0.5">
              {lang === 'pt'
                ? 'Monitoramento Orbital de Solo, Clima e Safra'
                : 'Orbital Soil, Climate & Crop Intelligence'}
            </h1>
          </div>
        </div>

        <div className="w-full sm:w-auto flex flex-wrap items-center justify-center sm:justify-end gap-2">
          <form onSubmit={handleSearchCity} className="flex items-center gap-1.5 flex-1 sm:flex-initial max-w-[260px] sm:max-w-none">
            <div className="relative flex-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => setCityQuery(e.target.value)}
                placeholder={lang === 'pt' ? 'Buscar município...' : 'Search city or lat, lon...'}
                className="w-full sm:w-52 pl-8 pr-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-emerald-200/70 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b2417] font-bold text-xs transition cursor-pointer shrink-0"
            >
              {searchingCity ? '...' : lang === 'pt' ? 'Ir' : 'Go'}
            </button>
          </form>

          <div className="flex items-center bg-white/10 p-0.5 rounded-xl border border-white/20 text-xs shrink-0">
            <Globe className="w-3.5 h-3.5 text-emerald-300 ml-2 mr-1" />
            <button
              type="button"
              onClick={() => setLang('pt')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${lang === 'pt' ? 'bg-white text-[#0b2417]' : 'text-emerald-100 hover:text-white'
                }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${lang === 'en' ? 'bg-white text-[#0b2417]' : 'text-emerald-100 hover:text-white'
                }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* CORPO CENTRAL */}
      <main className="no-print w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* MENU LATERAL DE 4 ETAPAS */}
        <aside className="lg:col-span-3 flex flex-col justify-between gap-2.5">
          {stepsList.map((st) => {
            const Icon = st.icon;
            const isActive = activeStep === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStep(st.id)}
                className={`w-full flex-1 text-left transition-all duration-200 rounded-2xl px-4 py-3.5 flex items-center gap-3.5 border cursor-pointer ${isActive
                  ? 'bg-white text-[#112218] border-white shadow-xl'
                  : 'bg-[#f4f7f2]/90 hover:bg-white text-[#1f3327] border-white/40 opacity-90 hover:opacity-100'
                  }`}
              >
                <span className="text-xs font-mono-tech text-slate-400 font-bold">
                  {st.num}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive
                    ? 'bg-[#0b291a] text-emerald-300'
                    : 'bg-[#e5ece6] text-[#2c4c38]'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold tracking-wider uppercase text-[#5c7c67]">
                    {st.tag}
                  </p>
                  <h2 className="text-sm font-bold text-[#102418] leading-snug">
                    {st.title}
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {st.desc}
                  </p>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-[#0b291a] translate-x-0.5' : 'text-slate-400'
                    }`}
                />
              </button>
            );
          })}
        </aside>

        {/* PAINEL BRANCO PRINCIPAL */}
        <section className="lg:col-span-9 bg-white rounded-3xl shadow-2xl border border-white/80 flex flex-col justify-start overflow-hidden text-[#112218]">
          {/* BARRA DE TOPO DO CARD */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 shrink-0 bg-white">
            <div className="flex-1 min-w-[200px]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                {lang === 'pt' ? 'TALHÃO MONITORADO' : 'MONITORED FIELD'}
              </span>
              {activeStep === 1 ? (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="text-base font-bold text-[#102418] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#0b291a] focus:outline-none w-full"
                  />
                  <Edit3 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
              ) : (
                <h3 className="text-base font-bold text-[#102418] mt-0.5">
                  {farmName}
                </h3>
              )}
            </div>

            {activeStep === 1 ? (
              <>
                <div className="relative min-w-[240px] w-full sm:w-auto">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                    {lang === 'pt' ? 'CULTURA / SEMENTE' : 'CROP / SEED SELECTION'}
                  </span>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={showCropDropdown ? cropSearch : cropDisplayName}
                      onFocus={() => {
                        setCropSearch('');
                        setShowCropDropdown(true);
                      }}
                      onChange={(e) => {
                        setCropSearch(e.target.value);
                        setShowCropDropdown(true);
                      }}
                      placeholder={
                        lang === 'pt'
                          ? 'Buscar ex: Soja, Café, Milho...'
                          : 'Search e.g. Soybean, Coffee, Corn...'
                      }
                      className="w-full pl-8 pr-3 py-1.5 text-xs font-bold bg-[#f7faf6] border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b291a]"
                    />
                  </div>

                  {showCropDropdown && (
                    <div className="absolute left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-2xl z-[1000]">
                      {filteredCrops.map((crop) => (
                        <button
                          key={crop.id}
                          type="button"
                          onClick={() => {
                            setSelectedCrop(crop);
                            setShowCropDropdown(false);
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-emerald-50 flex items-center justify-between border-b border-slate-100 last:border-none cursor-pointer"
                        >
                          <span className="text-xs font-bold text-[#102418]">
                            {lang === 'pt' ? crop.name : crop.nameEn}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {lang === 'pt' ? crop.category : crop.categoryEn}
                          </span>
                        </button>
                      ))}

                      {cropSearch.trim().length > 1 && (
                        <button
                          type="button"
                          onClick={handleAddCustomCrop}
                          className="w-full text-left px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2 cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4 text-emerald-700" />
                          {lang === 'pt'
                            ? `Usar "${cropSearch.trim()}"`
                            : `Use "${cropSearch.trim()}"`}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-[#f7faf6] px-3.5 py-1.5 rounded-xl border border-slate-200">
                  <Maximize2 className="w-3.5 h-3.5 text-[#0b291a]" />
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        {lang === 'pt' ? 'Área' : 'Area'}
                      </span>
                      <span className="text-xs font-mono-tech font-bold text-[#0b291a]">
                        {sliderHa} ha
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={10}
                      value={sliderHa}
                      onChange={(e) => setSliderHa(Number(e.target.value))}
                      className="w-28 accent-[#0b291a] cursor-pointer"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-[#f7faf6] border border-slate-200 text-xs font-bold text-[#102418]">
                  {cropDisplayName}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#f7faf6] border border-slate-200 text-xs font-mono-tech font-bold text-[#0b291a]">
                  {areaHa} ha
                </span>
              </div>
            )}

            <div>
              {loading ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  {lang === 'pt' ? 'Calculando...' : 'Computing...'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef5e9] text-[#28593a] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#388e3c]" />
                  {lang === 'pt' ? 'Sincronia ativa' : 'Live Sync'}
                </span>
              )}
            </div>
          </div>

          {/* CONTEÚDO CENTRAL DE CADA ETAPA */}
          <div
            className="flex-1 flex flex-col justify-start"
            onClick={() => showCropDropdown && setShowCropDropdown(false)}
          >
            <AnimatePresence mode="wait">
              {/* ==================== ETAPA 1 ==================== */}
              {activeStep === 1 && data && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 grid grid-cols-1 lg:grid-cols-12"
                >
                  <div className="lg:col-span-6 map-wrapper-isolated h-[360px] lg:h-[430px] bg-[#071910]">
                    <MapContainer
                      center={[coords.lat, coords.lon]}
                      zoom={15}
                      className="h-full w-full"
                    >
                      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                      {mapLayer === 'lst' && (
                        <TileLayer
                          opacity={0.65}
                          url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Land_Surface_Temp_Day/default/${gibsDate}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png`}
                        />
                      )}
                      {mapLayer === 'smap' && (
                        <TileLayer
                          opacity={0.65}
                          url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/SMAP_L4_Analyzed_Surface_Soil_Moisture/default/${gibsDate}/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png`}
                        />
                      )}

                      <MapClickHandler
                        onSelectLocation={(lat, lon) => setCoords({ lat, lon })}
                      />
                      <MapViewportSync
                        lat={coords.lat}
                        lon={coords.lon}
                        areaHa={sliderHa}
                      />

                      <Polygon
                        positions={fieldPolygon}
                        pathOptions={{
                          color: '#66bb6a',
                          weight: 2.5,
                          fillColor: '#4caf50',
                          fillOpacity: 0.22,
                        }}
                      />

                      {data.erosionZones.map((ez) => (
                        <Polygon
                          key={ez.id}
                          positions={ez.polygonCoords}
                          pathOptions={{
                            color: '#f59e0b',
                            weight: 2,
                            dashArray: '5 4',
                            fillColor: '#f59e0b',
                            fillOpacity: 0.35,
                          }}
                        >
                          <Tooltip sticky>
                            <div className="text-xs">
                              <strong>
                                {lang === 'pt'
                                  ? `Risco de Erosão ${ez.severity} (${ez.sectorPt})`
                                  : `${ez.severityEn} Erosion Risk (${ez.sectorEn})`}
                              </strong>
                              <div>
                                {lang === 'pt' ? 'Declividade SRTM:' : 'SRTM Slope:'}{' '}
                                {ez.slopePct}% ({ez.areaHa} ha)
                              </div>
                            </div>
                          </Tooltip>
                        </Polygon>
                      ))}

                      {data.waterZones.map((wz) => {
                        const coreColor = wz.type === 'hypoxia' ? '#ef4444' : '#0ea5e9';
                        const haloColor = wz.type === 'hypoxia' ? '#fca5a5' : '#38bdf8';
                        return (
                          <div key={wz.id}>
                            <Polyline
                              positions={wz.runoffPath}
                              pathOptions={{
                                color: '#7dd3fc',
                                weight: 2,
                                dashArray: '4 4',
                                opacity: 0.85,
                              }}
                            />
                            <Polygon
                              positions={wz.outerHaloCoords}
                              pathOptions={{
                                color: haloColor,
                                weight: 1.5,
                                fillColor: haloColor,
                                fillOpacity: 0.32,
                              }}
                            />
                            <Polygon
                              positions={wz.coreCoords}
                              pathOptions={{
                                color: coreColor,
                                weight: 2,
                                fillColor: coreColor,
                                fillOpacity: 0.78,
                              }}
                            >
                              <Tooltip sticky>
                                <div className="text-xs">
                                  <strong>{lang === 'pt' ? wz.labelPt : wz.labelEn}</strong>
                                  <div>
                                    {lang === 'pt' ? 'Cota SRTM:' : 'SRTM Elevation:'}{' '}
                                    {wz.elevationM} m (-{wz.depressionDepthCm} cm)
                                  </div>
                                  <div>
                                    {lang === 'pt' ? 'Umidade:' : 'Moisture:'}{' '}
                                    {wz.smapMoisturePct}% | Temp: {wz.soilTempC} °C ({wz.areaHa} ha)
                                  </div>
                                </div>
                              </Tooltip>
                            </Polygon>
                          </div>
                        );
                      })}
                    </MapContainer>

                    <div className="absolute top-3 left-3 z-[10] flex gap-1 bg-[#0b2417]/90 backdrop-blur-md p-1 rounded-xl border border-white/15 text-[11px] text-white">
                      <button
                        type="button"
                        onClick={() => setMapLayer('hydro')}
                        className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${mapLayer === 'hydro' ? 'bg-emerald-600 text-white' : 'text-emerald-200'
                          }`}
                      >
                        {lang === 'pt' ? 'Poças e Erosão' : 'Puddles & Erosion'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapLayer('smap')}
                        className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${mapLayer === 'smap' ? 'bg-emerald-600 text-white' : 'text-emerald-200'
                          }`}
                      >
                        {lang === 'pt' ? 'Umidade' : 'Moisture'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapLayer('lst')}
                        className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${mapLayer === 'lst' ? 'bg-emerald-600 text-white' : 'text-emerald-200'
                          }`}
                      >
                        {lang === 'pt' ? 'Temperatura' : 'Temperature'}
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-[10] flex flex-wrap items-center justify-between gap-2 bg-[#0b2417]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-[11px] text-white">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-xs bg-[#0ea5e9]" />
                          {lang === 'pt' ? 'Poça d’Água' : 'Water Ponding'} ({data.totalPuddleAreaHa} ha)
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-xs bg-[#ef4444]" />
                          {lang === 'pt' ? 'Poça Quente' : 'Thermal Hypoxia'}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" />
                          {lang === 'pt' ? 'Risco de Erosão' : 'Erosion Risk'} ({data.totalErosionAreaHa} ha)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PAINEL DIREITO DA ETAPA 1 */}
                  <div className="lg:col-span-6 p-6 lg:p-7 flex flex-col justify-between bg-white">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#5c7c67]">
                        {lang === 'pt'
                          ? `DIAGNÓSTICO DA CULTURA ATUAL • ${cropDisplayName.split(' ')[0].toUpperCase()}`
                          : `CURRENT CROP DIAGNOSTICS • ${cropDisplayName.split(' ')[0].toUpperCase()}`}
                      </p>
                      <h3 className="text-2xl font-normal text-[#102418] mt-1">
                        {lang === 'pt' ? 'Índice de Drenagem Biológica' : 'Biological Drainage Index'}
                      </h3>

                      <div className="mt-7 mb-6 relative">
                        <div className="h-3.5 w-full rounded-full bg-gradient-to-r from-[#dfd880] via-[#7cb342] to-[#2e6b3e]" />
                        <motion.div
                          initial={{ left: '50%' }}
                          animate={{ left: `${data.biologicalDrainageIndex}%` }}
                          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                          className="absolute -top-3.5 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0b291a] border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                        >
                          {data.biologicalDrainageIndex}
                        </motion.div>
                        <div className="flex justify-between text-xs text-slate-400 mt-3">
                          <span>{lang === 'pt' ? 'Baixo (Risco de poça)' : 'Low (Ponding risk)'}</span>
                          <span>{lang === 'pt' ? 'Alto (Boa infiltração)' : 'High (Good infiltration)'}</span>
                        </div>
                      </div>

                      {data.erosionZones[0] && (
                        <div className="mb-3.5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Mountain className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                              {lang === 'pt'
                                ? `REGIÃO COM RISCO DE EROSÃO • ${data.erosionZones[0].sectorPt.toUpperCase()}`
                                : `EROSION RISK REGION • ${data.erosionZones[0].sectorEn.toUpperCase()}`}
                            </p>
                            <h4 className="text-xs font-bold text-[#102418] mt-0.5">
                              {lang === 'pt'
                                ? `Declividade de ${data.erosionZones[0].slopePct}% em ${data.totalErosionAreaHa} ha (Perda potencial: ${data.erosionZones[0].estimatedSoilLossTonHaYr} t/ha/ano)`
                                : `${data.erosionZones[0].slopePct}% slope across ${data.totalErosionAreaHa} ha (Potential loss: ${data.erosionZones[0].estimatedSoilLossTonHaYr} t/ha/yr)`}
                            </h4>
                            <p className="text-[11px] text-slate-600 mt-0.5">
                              {lang === 'pt'
                                ? 'Sugestão: Plantio em nível e cobertura de palhada (plano completo no Laudo em PDF).'
                                : 'Suggestion: Contour planting & residue cover (full action plan in the PDF Report).'}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="p-4 rounded-2xl bg-[#f3f6f1] border border-[#dce5d8] flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-[#0b291a] text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                          <Sprout className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {lang === 'pt'
                              ? 'PRÓXIMA FAMÍLIA RECOMENDADA'
                              : 'RECOMMENDED NEXT CROP FAMILY'}
                          </p>
                          <h4 className="text-sm font-bold text-[#102418] mt-0.5">
                            {cropSuccessionName}
                          </h4>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {cropNotesText}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                      <span className="text-xs text-slate-400">
                        {lang === 'pt'
                          ? 'Sugestões de erosão e tabelas no Passo 04.'
                          : 'Erosion suggestions & tables in Step 04.'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b291a] text-white text-xs font-bold hover:bg-[#143d29] transition cursor-pointer"
                      >
                        {lang === 'pt' ? 'Ver Clima e Hidrologia' : 'View Climate & Hydrology'}{' '}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== ETAPA 2 ==================== */}
              {activeStep === 2 && data && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 grid grid-cols-1 lg:grid-cols-12"
                >
                  <div className="lg:col-span-6 map-wrapper-isolated h-[360px] lg:h-[430px] bg-[#071910]">
                    <MapContainer
                      center={[coords.lat, coords.lon]}
                      zoom={15}
                      className="h-full w-full"
                    >
                      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                      <MapClickHandler
                        onSelectLocation={(lat, lon) => setCoords({ lat, lon })}
                      />
                      <MapViewportSync
                        lat={coords.lat}
                        lon={coords.lon}
                        areaHa={areaHa}
                      />

                      <Polygon
                        positions={fieldPolygon}
                        pathOptions={{
                          color: '#ffffff',
                          weight: 2,
                          dashArray: '6 4',
                          fillColor: '#10b981',
                          fillOpacity: 0.08,
                        }}
                      />

                      {data.erosionZones.map((ez) => (
                        <Polygon
                          key={ez.id}
                          positions={ez.polygonCoords}
                          pathOptions={{
                            color: '#f59e0b',
                            weight: 2,
                            dashArray: '5 4',
                            fillColor: '#f59e0b',
                            fillOpacity: 0.35,
                          }}
                        >
                          <Tooltip sticky>
                            <div className="text-xs font-semibold">
                              {lang === 'pt'
                                ? `Erosão (${ez.sectorPt}) • Declividade ${ez.slopePct}%`
                                : `Erosion (${ez.sectorEn}) • Slope ${ez.slopePct}%`}
                            </div>
                          </Tooltip>
                        </Polygon>
                      ))}

                      {data.waterZones.map((zone) => {
                        const coreColor = zone.type === 'hypoxia' ? '#ef4444' : '#0ea5e9';
                        const haloColor = zone.type === 'hypoxia' ? '#fca5a5' : '#38bdf8';
                        return (
                          <div key={zone.id}>
                            <Polyline
                              positions={zone.runoffPath}
                              pathOptions={{
                                color: '#7dd3fc',
                                weight: 2,
                                dashArray: '4 4',
                              }}
                            />
                            <Polygon
                              positions={zone.outerHaloCoords}
                              pathOptions={{
                                color: haloColor,
                                weight: 1.5,
                                fillColor: haloColor,
                                fillOpacity: 0.35,
                              }}
                            />
                            <Polygon
                              positions={zone.coreCoords}
                              pathOptions={{
                                color: coreColor,
                                weight: 2,
                                fillColor: coreColor,
                                fillOpacity: 0.8,
                              }}
                            >
                              <Tooltip sticky>
                                <div className="text-xs font-semibold">
                                  {lang === 'pt' ? zone.labelPt : zone.labelEn} ({zone.areaHa} ha)
                                </div>
                              </Tooltip>
                            </Polygon>
                          </div>
                        );
                      })}
                    </MapContainer>

                    <div className="absolute top-3 left-3 z-[10] bg-[#0b2417]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-[11px] text-white font-medium">
                      {lang === 'pt'
                        ? `Microbacias: ${data.totalPuddleAreaHa} ha | Risco de Erosão: ${data.totalErosionAreaHa} ha`
                        : `Ponding Basins: ${data.totalPuddleAreaHa} ha | Erosion Risk: ${data.totalErosionAreaHa} ha`}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-[10] flex flex-wrap items-center gap-4 bg-[#0b2417]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-[11px] text-white">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-xs bg-[#0ea5e9]" />
                        {lang === 'pt' ? 'Poça d’Água' : 'Water Ponding'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-xs bg-[#ef4444]" />
                        {lang === 'pt' ? 'Poça Quente' : 'Thermal Hypoxia'} (&gt;{selectedCrop.maxThermalLimitC}°C)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-xs bg-[#f59e0b]" />
                        {lang === 'pt' ? 'Encosta com Erosão' : 'Erosion Slope'}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 p-6 lg:p-7 flex flex-col justify-between bg-white">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#5c7c67]">
                        {lang === 'pt'
                          ? 'PREVISÃO SAZONAL GEOS-S2S (PRÓXIMOS MESES)'
                          : 'GEOS-S2S SEASONAL FORECAST (UPCOMING MONTHS)'}
                      </span>
                      <h3 className="text-xl font-bold text-[#102418] mt-1">
                        {lang === 'pt'
                          ? 'Melhor Época de Plantio (Desvio de Extremos)'
                          : 'Optimal Sowing Window (Extreme Weather Avoidance)'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {lang === 'pt' ? (
                          <>
                            O algoritmo desloca o plantio em <strong>+{data.shiftWeeksCount} semanas</strong> para evitar temporais formadores de poças na germinação e veranicos na florada.
                          </>
                        ) : (
                          <>
                            The model shifts sowing by <strong>+{data.shiftWeeksCount} weeks</strong> to avoid ponding storms during germination and dry spells during flowering.
                          </>
                        )}
                      </p>

                      <div className="mt-4 bg-[#f8faf7] p-4 rounded-2xl border border-slate-200/80">
                        <svg viewBox="0 0 600 135" className="w-full h-32">
                          <rect x="85" y="8" width="110" height="108" fill="#fee2e2" rx="8" opacity="0.8" />
                          <text x="140" y="26" textAnchor="middle" className="fill-red-600 text-[12px] font-bold">
                            {lang === 'pt' ? 'Calor Forte' : 'Heatwave'}
                          </text>

                          <rect x="355" y="8" width="110" height="108" fill="#fee2e2" rx="8" opacity="0.8" />
                          <text x="410" y="26" textAnchor="middle" className="fill-red-600 text-[12px] font-bold">
                            {lang === 'pt' ? 'Veranico' : 'Dry Spell'}
                          </text>

                          <rect x="215" y="8" width="120" height="108" fill="#dcfce7" rx="8" opacity="0.65" />
                          <text x="275" y="26" textAnchor="middle" className="fill-emerald-800 text-[12px] font-bold">
                            {lang === 'pt' ? 'Janela Segura' : 'Safe Window'}
                          </text>

                          <line x1="25" y1="116" x2="575" y2="116" stroke="#cbd5e1" strokeWidth="1.5" />

                          <path
                            d="M 25 75 C 70 70, 105 68, 128 38 C 148 18, 162 40, 190 72 C 235 82, 310 84, 370 90 C 398 112, 420 112, 445 80 C 485 72, 525 68, 575 62"
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="4"
                          />
                        </svg>

                        <div className="mt-3 pt-3 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-11 gap-2.5 items-center">
                          <div className="sm:col-span-5 px-3.5 py-2.5 rounded-xl bg-red-50 border border-dashed border-red-400 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 block">
                              {lang === 'pt' ? 'JANELA INICIAL (EVITAR)' : 'INITIAL WINDOW (AVOID)'}
                            </span>
                            <strong className="text-xs sm:text-sm font-bold text-red-700 block mt-0.5">
                              {lang === 'pt' ? 'Época de Risco Climático' : 'High Climate Risk Period'}
                            </strong>
                          </div>

                          <div className="sm:col-span-1 flex justify-center">
                            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>

                          <div className="sm:col-span-5 px-3.5 py-2.5 rounded-xl bg-emerald-600 text-white text-center shadow-sm">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block">
                              {lang === 'pt' ? 'DATA RECOMENDADA' : 'RECOMMENDED SOWING'}
                            </span>
                            <strong className="text-xs sm:text-sm font-extrabold block mt-0.5">
                              {lang === 'pt'
                                ? `Plantar: ${data.sowingDateStr}`
                                : `Sow: ${data.sowingDateStr}`}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                      <span className="text-xs text-slate-500">
                        {lang === 'pt' ? 'Declividade média do talhão:' : 'Mean field slope:'}{' '}
                        <strong>{data.srtmSlopePct}%</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveStep(3)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b291a] text-white text-xs font-bold hover:bg-[#143d29] transition cursor-pointer"
                      >
                        {lang === 'pt' ? 'Ver Calendário da Safra' : 'View Crop Calendar'}{' '}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== ETAPA 3 ==================== */}
              {activeStep === 3 && data && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 sm:p-7 flex-1 flex flex-col justify-between"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-5 rounded-2xl border border-slate-200 bg-[#fbfcfb]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-sky-600" />
                          {lang === 'pt' ? 'Umidade na medida certa' : 'Optimal soil moisture'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {lang === 'pt' ? 'Hoje no solo:' : 'Current:'} {data.smapSurfaceMoisturePct}%
                        </span>
                      </div>
                      <p className="text-3xl font-extrabold text-sky-600 mt-2">
                        {selectedCrop.idealMoistureRange[0]}–{selectedCrop.idealMoistureRange[1]}%
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {lang === 'pt'
                          ? 'Evita solo encharcado (trator patinando) ou seco demais'
                          : 'Prevents waterlogged soil (machinery slip) or dry seedbeds'}
                      </p>
                      <div className="h-2.5 w-full bg-slate-200 rounded-full mt-4 relative overflow-hidden">
                        <div className="absolute left-[35%] w-1/3 h-full bg-sky-500 rounded-full" />
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-slate-200 bg-[#fbfcfb]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-amber-500" />
                          {lang === 'pt' ? 'Conforto térmico no sulco' : 'Seed-furrow thermal comfort'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {lang === 'pt' ? 'Hoje no solo:' : 'Current:'} {data.ecostressSurfaceTempC} °C
                        </span>
                      </div>
                      <p className="text-3xl font-extrabold text-amber-500 mt-2">
                        {selectedCrop.idealSoilTempRange[0]}–{selectedCrop.idealSoilTempRange[1]} °C
                      </p>
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {lang === 'pt'
                          ? `Evitar plantar acima de ${selectedCrop.maxThermalLimitC} °C (desidrata a semente)`
                          : `Avoid sowing above ${selectedCrop.maxThermalLimitC} °C (seed dehydration risk)`}
                      </p>
                      <div className="h-2.5 w-full bg-slate-200 rounded-full mt-4 relative overflow-hidden">
                        <div className="absolute left-[38%] w-1/3 h-full bg-amber-500 rounded-full" />
                        <div className="absolute right-0 w-1/5 h-full bg-red-300" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#f8faf7] border border-slate-200 my-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700 text-center mb-5">
                      {lang === 'pt'
                        ? 'Cronograma da Safra Planejado para Colher no Tempo Seco'
                        : 'Reverse-Engineered Crop Timeline for Dry Harvest Window'}
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
                          ✓
                        </div>
                        <strong className="text-sm text-[#102418] mt-2">
                          {lang === 'pt' ? 'Plantio' : 'Sowing'}
                        </strong>
                        <span className="text-xs text-slate-500">{data.sowingDateStr}</span>
                      </div>

                      <div className="hidden md:block flex-1 h-1 bg-slate-300" />

                      <div className="flex flex-col items-center text-center">
                        <div className="w-11 h-11 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                          VE
                        </div>
                        <strong className="text-sm text-[#102418] mt-2">
                          {lang === 'pt' ? 'Emergência' : 'Emergence'}
                        </strong>
                        <span className="text-xs text-slate-500">{data.emergenceDateStr}</span>
                      </div>

                      <div className="hidden md:block flex-1 h-1 bg-slate-300" />

                      <div className="flex flex-col items-center text-center">
                        <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                          R7
                        </div>
                        <strong className="text-sm text-[#102418] mt-2">
                          {lang === 'pt' ? 'Maturação' : 'Maturation'}
                        </strong>
                        <span className="text-xs text-slate-500">{data.maturationR7DateStr}</span>
                      </div>

                      <div className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
                        {lang === 'pt' ? '7 a 14 dias secos' : '7–14 dry days'}
                      </div>

                      <div className="flex flex-col items-center text-center">
                        <div className="w-11 h-11 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-xs shadow-md">
                          R8
                        </div>
                        <strong className="text-sm text-[#102418] mt-2">
                          {lang === 'pt' ? 'Colheita' : 'Harvest'}
                        </strong>
                        <span className="text-xs text-slate-500">{data.harvestR8DateStr}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <span className="text-xs text-slate-400">
                      {lang === 'pt'
                        ? `Ciclo estimado: ~${data.cycleDaysTotal} dias • Florada em ${data.floweringR1DateStr}`
                        : `Estimated cycle: ~${data.cycleDaysTotal} days • Flowering on ${data.floweringR1DateStr}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveStep(4)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b291a] text-white text-xs font-bold hover:bg-[#143d29] transition cursor-pointer"
                    >
                      {lang === 'pt' ? 'Ir para Relatório e Alertas' : 'Go to Report & Alerts'}{' '}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ==================== ETAPA 4 ==================== */}
              {activeStep === 4 && data && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 sm:p-7 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <img
                        src="/logofundoclaro.png"
                        alt="MIDORI"
                        style={{ height: '48px' }}
                        className="w-auto object-contain scale-110 origin-center sm:origin-left select-none"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#2e6b3e] bg-emerald-50 px-3 py-1 rounded-full">
                        {lang === 'pt' ? 'PLANO PRONTO PARA O CAMPO' : 'FIELD-READY ACTION PLAN'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#102418]">
                        {lang === 'pt'
                          ? 'Laudo Técnico Completo & Radar Semanal'
                          : 'Complete Technical Report & Weekly Radar'}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {lang === 'pt'
                          ? 'O relatório em PDF abaixo reúne todos os dados técnicos dos satélites, coordenadas exatas das poças d’água e as sugestões práticas para controle de erosão nas áreas inclinadas do talhão.'
                          : 'The PDF report below consolidates all satellite telemetry, exact ponding coordinates, and actionable erosion control recommendations for sloped sectors.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-2xl bg-[#f7faf6] border border-slate-200">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">
                          {lang === 'pt' ? 'PLANTIO RECOMENDADO' : 'RECOMMENDED SOWING'}
                        </span>
                        <strong className="text-sm sm:text-base text-[#102418] mt-0.5 block">
                          {data.sowingDateStr}
                        </strong>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#f7faf6] border border-slate-200">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">
                          {lang === 'pt' ? 'MICROBACIAS DE POÇA' : 'PONDING BASINS'}
                        </span>
                        <strong className="text-sm sm:text-base text-[#102418] mt-0.5 block">
                          {data.totalPuddleAreaHa} ha
                        </strong>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                        <span className="text-[10px] font-bold uppercase text-amber-800 block">
                          {lang === 'pt' ? 'RISCO DE EROSÃO' : 'EROSION RISK AREA'}
                        </span>
                        <strong className="text-sm sm:text-base text-amber-900 mt-0.5 block">
                          {data.totalErosionAreaHa} ha ({data.erosionZones[0]?.slopePct}%)
                        </strong>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowPdfPreview(true)}
                        className="flex-1 py-3.5 px-5 rounded-xl bg-[#0b291a] hover:bg-[#143d29] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                      >
                        <FileDown className="w-4 h-4 text-emerald-300" />
                        {lang === 'pt'
                          ? 'Abrir Relatório Técnico Completo (PDF)'
                          : 'Open Complete Technical Report (PDF)'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setWeeklyActive(!weeklyActive)}
                        className="py-3.5 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0b291a] border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <Smartphone className="w-4 h-4 text-emerald-700" />
                        {weeklyActive
                          ? lang === 'pt'
                            ? 'Alertas Ativos no Celular'
                            : 'Mobile Alerts Active'
                          : lang === 'pt'
                            ? 'Ativar Alertas no Celular'
                            : 'Enable Mobile Alerts'}
                      </button>
                    </div>
                  </div>

                  {/* Mockup do Celular */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="w-full max-w-[290px] rounded-[32px] border-[6px] border-[#131826] bg-[#fafafe] p-4 shadow-xl space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                        <img
                          src="/logofundoclaro.png"
                          alt="MIDORI"
                          style={{ height: '28px' }}
                          className="w-auto object-contain"
                        />
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                          {lang === 'pt' ? 'a cada 7 dias' : 'every 7 days'}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white border border-slate-200/80">
                        <span className="text-[11px] text-slate-500 block">
                          {lang === 'pt' ? 'Precisão do calendário' : 'Calendar accuracy'}
                        </span>
                        <div className="text-lg font-extrabold text-purple-700 mt-0.5">
                          {data.confidenceInitial}% → {weeklyActive ? data.confidenceUpdated : 85}%
                        </div>
                        <div className="h-2 w-full bg-purple-100 rounded-full mt-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: '76%' }}
                            animate={{ width: weeklyActive ? '91%' : '85%' }}
                            className="h-full bg-purple-600 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#fff1f1] border border-red-200 text-red-950">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-red-800">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {lang === 'pt'
                            ? `Chuva recente (${data.gpmLast7DaysRainMm} mm)`
                            : `Recent rainfall (${data.gpmLast7DaysRainMm} mm)`}
                        </div>
                        <p className="text-[11px] mt-1 leading-snug">
                          {lang === 'pt' ? (
                            <>
                              Baixadas úmidas e risco de erosão no {data.erosionZones[0]?.sectorPt}. Suspender tratores por <strong>48 horas</strong>.
                            </>
                          ) : (
                            <>
                              Wet basins & runoff risk in {data.erosionZones[0]?.sectorEn}. Hold heavy machinery for <strong>48 hours</strong>.
                            </>
                          )}
                        </p>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#eefbf3] border border-emerald-200 text-emerald-950">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {lang === 'pt'
                            ? `Veredito de colheita (${data.harvestR8DateStr})`
                            : `Harvest verdict (${data.harvestR8DateStr})`}
                        </div>
                        <p className="text-[11px] mt-1 leading-snug">
                          {lang === 'pt'
                            ? 'Janela seca ideal para ligar a colheitadeira sem perda de grãos.'
                            : 'Dry window confirmed for combine harvesting with minimal grain loss.'}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-[#f3f4f8] border border-slate-200 text-slate-700">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <Cloud className="w-3.5 h-3.5" />
                          {lang === 'pt' ? 'Semana nublada' : 'Cloudy sky continuity'}
                        </div>
                        <p className="text-[11px] mt-0.5 leading-snug">
                          {lang === 'pt'
                            ? 'Radar ativo com sensores SMAP e GPM IMERG.'
                            : 'Active microwave sensing via SMAP & GPM IMERG.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* RODAPÉ ESCURO */}
      <footer className="no-print w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-[11px] text-emerald-100/80 bg-[#0b2417]/85 px-5 py-3 rounded-xl border border-white/10 shrink-0">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <img
            src="/logofundoescuro.png"
            alt="MIDORI"
            style={{ height: '32px' }}
            className="w-auto object-contain select-none"
          />
          <span>
            <strong>{lang === 'pt' ? 'Dados da NASA integrados:' : 'Integrated NASA Data:'}</strong>{' '}
            SMAP L4 • ISS ECOSTRESS • GPM IMERG • SRTM 30m (TWI) • GLDAS • GEOS-S2S
          </span>
        </div>
        <span className="font-mono-tech">
          {farmName} • {cropDisplayName} ({areaHa} ha)
        </span>
      </footer>

      {/* ==================== MODAL DO LAUDO TÉCNICO EM PDF (100% RESPONSIVO NO MOBILE E PC) ==================== */}
      {data && showPdfPreview && (
        <div className="fixed inset-0 z-[2000] bg-black/80 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 w-full max-w-4xl rounded-2xl p-4 sm:p-8 shadow-2xl max-h-[94vh] overflow-y-auto">
            {/* BARRA DE AÇÕES DO MODAL: EMPILHADA NO MOBILE PARA NÃO ESPREMER OS BOTÕES */}
            <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 text-center sm:text-left">
                {lang === 'pt'
                  ? 'Relatório Técnico Detalhado (NASA + Controle de Erosão)'
                  : 'Detailed Technical Report (NASA + Erosion Control)'}
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-initial justify-center px-4 py-2.5 rounded-xl bg-[#0b291a] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer className="w-4 h-4 shrink-0" />
                  <span>{lang === 'pt' ? 'Imprimir / Salvar PDF' : 'Print / Save PDF'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPdfPreview(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer shrink-0"
                >
                  {lang === 'pt' ? 'Fechar' : 'Close'}
                </button>
              </div>
            </div>

            <div className="space-y-6 text-xs leading-relaxed">
              {/* CABEÇALHO DO LAUDO: LOGO CENTRALIZADA NO TOPO NO MOBILE, LADO A LADO NO PC */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b-2 border-[#0b291a] pb-4 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                  <img
                    src="/logofundoclaro.png"
                    alt="MIDORI"
                    className="h-14 sm:h-[58px] w-auto object-contain mx-auto sm:mx-0"
                  />
                  <div>
                    <h2 className="text-base sm:text-xl font-extrabold text-[#0b291a] leading-snug">
                      {lang === 'pt'
                        ? `LAUDO TÉCNICO AGRONÔMICO — ${farmName.toUpperCase()}`
                        : `AGRONOMIC TECHNICAL REPORT — ${farmName.toUpperCase()}`}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1">
                      NASA SMAP L4 • ISS ECOSTRESS • GPM IMERG • SRTM 30m (TWI) • GLDAS • GEOS-S2S
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 text-center sm:text-right font-mono-tech text-[11px] sm:text-xs shrink-0">
                  <div>Lat/Lon: {data.lat.toFixed(4)}°, {data.lon.toFixed(4)}°</div>
                  <div>{lang === 'pt' ? 'Área Mapeada:' : 'Mapped Area:'} {areaHa} ha</div>
                  <div>
                    {lang === 'pt' ? 'Emissão:' : 'Issued:'}{' '}
                    {new Date().toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')}
                  </div>
                </div>
              </div>

              {/* SEÇÃO 1: SENSORES */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#0b291a] uppercase mb-2.5">
                  {lang === 'pt'
                    ? '1. Telemetria Física do Solo e Clima (Sensores NASA)'
                    : '1. Soil & Climate Physical Telemetry (NASA Sensors)'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                    <span className="text-[10px] text-slate-500 block">SMAP L4 (0–5 cm)</span>
                    <strong className="text-sm">{data.smapSurfaceMoisturePct}%</strong>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                    <span className="text-[10px] text-slate-500 block">SMAP ROOT ZONE (0–100 cm)</span>
                    <strong className="text-sm">{data.smapRootZoneMoisturePct}%</strong>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                    <span className="text-[10px] text-slate-500 block">ISS ECOSTRESS (SOIL TEMP)</span>
                    <strong className="text-sm">{data.ecostressSurfaceTempC} °C</strong>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                    <span className="text-[10px] text-slate-500 block">ECOSTRESS EVAPOTRANSPIRATION</span>
                    <strong className="text-sm">{data.ecostressEvapMmDay} mm/day</strong>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                    <span className="text-[10px] text-slate-500 block">GPM IMERG (12M RAINFALL)</span>
                    <strong className="text-sm">
                      {data.gpmAnnualRainMm} mm ({data.gpmExtremeEventsCount} &gt;30mm)
                    </strong>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                    <span className="text-[10px] text-slate-500 block">SRTM 30m ELEVATION & SLOPE</span>
                    <strong className="text-sm">
                      {data.srtmMeanElevationM} m | {data.srtmSlopePct}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* SEÇÃO 2: MICROBACIAS (CARDS NO MOBILE PARA NÃO QUEBRAR + TABELA NO PC/IMPRESSÃO) */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#0b291a] uppercase mb-2.5">
                  {lang === 'pt'
                    ? '2. Microbacias Hidrológicas de Poças d’Água e Hipóxia Térmica (TWI / SRTM)'
                    : '2. Hydrological Ponding Micro-basins & Thermal Hypoxia (TWI / SRTM)'}
                </h3>

                {/* Visualização Mobile em Cartões Limpos */}
                <div className="space-y-2.5 sm:hidden print:hidden">
                  {data.waterZones.map((z) => (
                    <div key={z.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-xs text-[#0b291a]">
                          {lang === 'pt' ? z.labelPt : z.labelEn}
                        </strong>
                        <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 font-bold text-[11px] shrink-0">
                          {z.areaHa} ha
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-mono-tech">
                        GPS: {z.center[0].toFixed(4)}°, {z.center[1].toFixed(4)}°
                      </div>
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-700 pt-1 border-t border-slate-200/70">
                        <span>Cota: {z.elevationM} m (-{z.depressionDepthCm} cm) • TWI {z.twiScore}</span>
                        <span className="font-semibold">{z.soilTempC} °C | {z.smapMoisturePct}% umid.</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tabela para Desktop e Impressão PDF */}
                <div className="hidden sm:block print:block overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-300 text-left">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-300 p-2">
                          {lang === 'pt' ? 'Microbacia / Setor' : 'Micro-basin / Sector'}
                        </th>
                        <th className="border border-slate-300 p-2">GPS</th>
                        <th className="border border-slate-300 p-2">
                          {lang === 'pt' ? 'Cota SRTM / TWI' : 'SRTM Elev / TWI'}
                        </th>
                        <th className="border border-slate-300 p-2">
                          {lang === 'pt' ? 'Temp. / Umidade' : 'Temp / Moisture'}
                        </th>
                        <th className="border border-slate-300 p-2">
                          {lang === 'pt' ? 'Área' : 'Area'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.waterZones.map((z) => (
                        <tr key={z.id}>
                          <td className="border border-slate-300 p-2 font-semibold">
                            {lang === 'pt' ? z.labelPt : z.labelEn}
                          </td>
                          <td className="border border-slate-300 p-2 font-mono-tech">
                            {z.center[0].toFixed(4)}°, {z.center[1].toFixed(4)}°
                          </td>
                          <td className="border border-slate-300 p-2">
                            {z.elevationM} m (-{z.depressionDepthCm} cm) • TWI {z.twiScore}
                          </td>
                          <td className="border border-slate-300 p-2">
                            {z.soilTempC} °C / {z.smapMoisturePct}%
                          </td>
                          <td className="border border-slate-300 p-2">{z.areaHa} ha</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SEÇÃO 3: EROSÃO (CARDS NO MOBILE + TABELA NO PC/IMPRESSÃO) */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <h3 className="text-xs sm:text-sm font-bold text-amber-900 uppercase mb-2.5">
                  {lang === 'pt'
                    ? '3. Regiões com Risco de Erosão e Sugestões Técnicas de Controle'
                    : '3. Erosion Risk Regions & Actionable Control Suggestions'}
                </h3>

                {/* Visualização Mobile em Cartões Limpos */}
                <div className="space-y-2.5 mb-3 sm:hidden print:hidden">
                  {data.erosionZones.map((ez) => (
                    <div key={ez.id} className="p-3 rounded-xl bg-white border border-amber-300 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-xs text-amber-950">
                          {lang === 'pt'
                            ? `${ez.sectorPt} (Risco ${ez.severity})`
                            : `${ez.sectorEn} (${ez.severityEn} Risk)`}
                        </strong>
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[11px] shrink-0">
                          {ez.areaHa} ha
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-mono-tech">
                        GPS: {ez.center[0].toFixed(4)}°, {ez.center[1].toFixed(4)}°
                      </div>
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-700 pt-1 border-t border-amber-100">
                        <span>Declividade: {ez.slopePct}% (Δ {ez.elevationDropM} m)</span>
                        <span className="font-semibold text-red-700">
                          Perda: {ez.estimatedSoilLossTonHaYr} t/ha/ano
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tabela para Desktop e Impressão PDF */}
                <div className="hidden sm:block print:block overflow-x-auto mb-3">
                  <table className="w-full border-collapse border border-amber-300 bg-white text-left">
                    <thead>
                      <tr className="bg-amber-100/70">
                        <th className="border border-amber-300 p-2">
                          {lang === 'pt' ? 'Região do Talhão' : 'Field Sector'}
                        </th>
                        <th className="border border-amber-300 p-2">GPS</th>
                        <th className="border border-amber-300 p-2">
                          {lang === 'pt' ? 'Declividade SRTM' : 'SRTM Slope'}
                        </th>
                        <th className="border border-amber-300 p-2">
                          {lang === 'pt' ? 'Perda Estimada (Solo Nu)' : 'Est. Bare Soil Loss'}
                        </th>
                        <th className="border border-amber-300 p-2">
                          {lang === 'pt' ? 'Área' : 'Area'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.erosionZones.map((ez) => (
                        <tr key={ez.id}>
                          <td className="border border-amber-300 p-2 font-bold">
                            {lang === 'pt'
                              ? `${ez.sectorPt} (Risco ${ez.severity})`
                              : `${ez.sectorEn} (${ez.severityEn} Risk)`}
                          </td>
                          <td className="border border-amber-300 p-2 font-mono-tech">
                            {ez.center[0].toFixed(4)}°, {ez.center[1].toFixed(4)}°
                          </td>
                          <td className="border border-amber-300 p-2">
                            {ez.slopePct}% (Δ {ez.elevationDropM} m)
                          </td>
                          <td className="border border-amber-300 p-2">
                            {ez.estimatedSoilLossTonHaYr} t/ha/yr
                          </td>
                          <td className="border border-amber-300 p-2">{ez.areaHa} ha</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="font-bold text-amber-950 mb-1">
                  {lang === 'pt'
                    ? 'Sugestões Agronômicas Recomendadas para Conter a Erosão:'
                    : 'Recommended Agronomic Suggestions for Erosion Control:'}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-800">
                  {(lang === 'pt'
                    ? data.erosionRecommendationsPt
                    : data.erosionRecommendationsEn
                  ).map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>

              {/* SEÇÃO 4: CRONOGRAMA */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#0b291a] uppercase mb-2">
                  {lang === 'pt'
                    ? `4. Calendário Fenológico (${cropDisplayName}) e Sucessão`
                    : `4. Phenological Calendar (${cropDisplayName}) & Succession`}
                </h3>
                <p>
                  • <strong>{lang === 'pt' ? 'Semeadura (Dia 0):' : 'Sowing (Day 0):'}</strong>{' '}
                  {data.sowingDateStr} |{' '}
                  <strong>{lang === 'pt' ? 'Emergência (VE):' : 'Emergence (VE):'}</strong>{' '}
                  {data.emergenceDateStr} |{' '}
                  <strong>{lang === 'pt' ? 'Floração (R1):' : 'Flowering (R1):'}</strong>{' '}
                  {data.floweringR1DateStr} |{' '}
                  <strong>{lang === 'pt' ? 'Colheita Seca (R8):' : 'Dry Harvest (R8):'}</strong>{' '}
                  {data.harvestR8DateStr}.<br />•{' '}
                  <strong>
                    {lang === 'pt' ? 'Sucessão Recomendada:' : 'Recommended Succession:'}
                  </strong>{' '}
                  {cropSuccessionName}. {cropNotesText}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}