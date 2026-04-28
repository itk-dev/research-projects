/* =============================================================
   AarhusWay — Plain JS SPA  (index.html + styles.css + script.js)
   ============================================================= */

// ─── i18n ───────────────────────────────────────────────────
let lang;
try { lang = localStorage.getItem("lang") || "da"; } catch(e) { lang = "da"; }

const i18n = {
da: {
  // Nav
  nav_overblik:"Overblik", nav_kort:"Livekort", nav_flaader:"Fl\u00e5deoversigt",
  nav_zoner:"Zoner", nav_haendelser:"H\u00e6ndelser", nav_analyse:"Analyse",
  nav_operator:"Operat\u00f8rportal", nav_operator_section:"Operat\u00f8r",

  // Status
  status_active:"Aktiv", status_idle:"Inaktiv", status_charging:"Oplader",
  status_error:"Fejl", status_offline:"Offline",

  // Severity
  sev_critical:"Kritisk", sev_warning:"Advarsel", sev_info:"Info",

  // Event types
  evt_speed_violation:"Hastighedsovertr\u00e6delse", evt_zone_breach:"Zonebrud",
  evt_collision_near_miss:"N\u00e6rved-sammenst\u00f8d", evt_low_battery:"Lavt batteri",
  evt_connection_lost:"Forbindelse tabt", evt_pedestrian_complaint:"Fodg\u00e6ngerklage",
  evt_route_deviation:"Ruteafvigelse",

  // Zone types
  zone_pedestrian:"Fodg\u00e6ngerzone", zone_restricted:"Begr\u00e6nset omr\u00e5de",
  zone_delivery:"Leveringszone", zone_construction:"Vejarbejde",

  // Connection / API
  conn_online:"Tilsluttet", conn_degraded:"Ustabil", conn_offline:"Afbrudt",
  api_healthy:"Sund", api_degraded:"Nedsat", api_down:"Nede",

  // Zone status
  zone_status_active:"Aktiv", zone_status_scheduled:"Planlagt", zone_status_expired:"Udl\u00f8bet",
  resolved:"L\u00f8st", open:"\u00c5ben",

  // Common
  total:"i alt", active:"aktive", robots:"Robotter", robots_lc:"robotter",
  operators_label:"Operat\u00f8rer", online:"Online", offline:"Offline",
  contact:"Kontakt", latency:"Latenstid", uptime:"Oppetid",
  api_status:"API status", speed:"Hastighed", battery:"Batteri",
  no_access:"Ingen adgang", max_speed:"Maks", kmh:"km/t", min:"min",
  since_yesterday:"siden i g\u00e5r", vs_last_week:"vs. sidste uge",
  vs_yesterday:"vs. i g\u00e5r", this_month:"Denne m\u00e5ned",
  active_hours:"Aktive timer", last_modified:"Sidst \u00e6ndret",
  description:"Beskrivelse", type:"Type", status:"Status",
  timestamp:"Tidspunkt", severity:"Alvorlighed", robot:"Robot",
  operator:"Operat\u00f8r", today:"I dag", score:"Score",
  all:"Alle", valid:"Gyldig", updates:"opdateringer",
  right_now:"Lige nu", days_ago:"dag(e) siden", hours_ago:"time(r) siden",
  min_ago:"min siden",

  // Dashboard
  dash_title:"Overblik",
  dash_desc:"Samlet status for robotfl\u00e5der i Aarhus Kommune",
  active_robots:"Aktive robotter", active_zones:"Aktive zoner",
  events_today:"H\u00e6ndelser i dag", deliveries_today:"Leveringer i dag",
  avg_delivery:"Gns. leveringstid", co2_saved:"CO\u2082 sparet",
  unresolved:"ul\u00f8ste",
  robot_status_dist:"Robotstatus fordeling",
  activity_7d:"Aktivitet (sidste 7 dage)",
  operator_status:"Operat\u00f8rstatus",
  recent_events:"Seneste h\u00e6ndelser",
  deliveries:"Leveringer", active_robots_chart:"Aktive robotter",

  // Map
  zone_types:"Zontyper",

  // Fleet
  fleet_title:"Fl\u00e5deoversigt",
  fleet_desc:"Oversigt over tilsluttede robotfl\u00e5der og deres status",

  // Zones
  zones_title:"Zoneadministration",
  zones_desc:"Administrer zoner, restriktioner og adgangsregler for robotfl\u00e5der",
  zones_total:"Zoner i alt", zones_active:"Aktive", zones_scheduled:"Planlagte",
  zones_restricted:"Begr\u00e6nsede", zone_col:"Zone",

  // Events
  events_title:"H\u00e6ndelser",
  events_desc:"H\u00e6ndelseslog og overholdelse for robotoperationer",
  critical_events:"Kritiske h\u00e6ndelser",
  unresolved_events:"Ul\u00f8ste h\u00e6ndelser",
  resolved_events:"L\u00f8ste h\u00e6ndelser",

  // Analytics
  analyse_title:"Analyse & Data",
  analyse_desc:"Indsigter i robotaktivitet, leveringsperformance og b\u00e6redygtighed",
  deliveries_30d:"Leveringer (30 dage)",
  events_30d:"H\u00e6ndelser (30 dage)",
  co2_month:"CO\u2082 sparet (m\u00e5ned)",
  activity_30d:"Aktivitet over tid (30 dage)",
  operator_perf:"Operat\u00f8r-performance (30 dage)",
  sustainability:"B\u00e6redygtighed",
  popular_routes:"Popul\u00e6re ruter",
  from:"Fra", to:"Til", count:"Antal", avg_time:"Gns. tid",
  co2_saved_label:"CO\u2082 sparet", electric_driving:"Elektrisk k\u00f8rsel",
  car_trips_replaced:"Erstattede bilture",
  deliveries_30d_chart:"Leveringer (30d)", events_30d_chart:"H\u00e6ndelser (30d)",
  incidents_chart:"H\u00e6ndelser",

  // Operator portal
  op_portal_subtitle:"Operat\u00f8rportal \u2014 Fl\u00e5deoversigt og byforhold",
  compliance_score:"Compliance Score", connection:"Forbindelse",
  deliveries_30d_op:"Leveringer (30 dage)",
  delay_saved:"Sparet forsinkelse i dag",
  manual_interventions:"Manuelle indgreb",
  city_conditions:"Byforhold \u2014 Live Feed",
  active_rules:"G\u00e6ldende regler",
  recent_events_op:"Seneste h\u00e6ndelser",
  route_optimization:"Ruteoptimering \u2014 Aktive ruter",
  total_saved_today:"Total sparet i dag",
  avg_saved_per_route:"Gennemsnit {n} min sparet pr. rute via bydata-optimering",
  route_col:"Rute", original:"Oprindelig", optimized:"Optimeret",
  saved:"Sparet", avoided:"Undg\u00e5et",
  efficiency_14d:"Effektivitet over tid (14 dage)",
  efficiency_desc:"Leveringstid med og uden bydata-optimering",
  without_opt:"Uden optimering", with_opt:"Med bydata-optimering",
  acknowledge:"Kvitt\u00e9r", acknowledged:"Kvitteret",

  // Condition types
  cond_restriction:"Restriktion", cond_roadwork:"Vejarbejde", cond_event:"Arrangement",
  cond_crossing:"Krydsning", cond_weather:"Vejr", cond_temporary_zone:"Midlertidig zone",

  // Misc
  unknown_operator:"Ukendt operat\u00f8r", administrator:"Administrator",
  vs_without:"-28% vs. uden", this_week:"denne uge", this_month_trend:"denne m\u00e5ned",
},
en: {
  nav_overblik:"Overview", nav_kort:"Live Map", nav_flaader:"Fleet Overview",
  nav_zoner:"Zones", nav_haendelser:"Events", nav_analyse:"Analytics",
  nav_operator:"Operator Portal", nav_operator_section:"Operator",

  status_active:"Active", status_idle:"Idle", status_charging:"Charging",
  status_error:"Error", status_offline:"Offline",

  sev_critical:"Critical", sev_warning:"Warning", sev_info:"Info",

  evt_speed_violation:"Speed violation", evt_zone_breach:"Zone breach",
  evt_collision_near_miss:"Near-miss collision", evt_low_battery:"Low battery",
  evt_connection_lost:"Connection lost", evt_pedestrian_complaint:"Pedestrian complaint",
  evt_route_deviation:"Route deviation",

  zone_pedestrian:"Pedestrian zone", zone_restricted:"Restricted area",
  zone_delivery:"Delivery zone", zone_construction:"Roadwork",

  conn_online:"Connected", conn_degraded:"Unstable", conn_offline:"Disconnected",
  api_healthy:"Healthy", api_degraded:"Degraded", api_down:"Down",

  zone_status_active:"Active", zone_status_scheduled:"Scheduled", zone_status_expired:"Expired",
  resolved:"Resolved", open:"Open",

  total:"total", active:"active", robots:"Robots", robots_lc:"robots",
  operators_label:"Operators", online:"Online", offline:"Offline",
  contact:"Contact", latency:"Latency", uptime:"Uptime",
  api_status:"API status", speed:"Speed", battery:"Battery",
  no_access:"No access", max_speed:"Max", kmh:"km/h", min:"min",
  since_yesterday:"since yesterday", vs_last_week:"vs. last week",
  vs_yesterday:"vs. yesterday", this_month:"This month",
  active_hours:"Active hours", last_modified:"Last modified",
  description:"Description", type:"Type", status:"Status",
  timestamp:"Timestamp", severity:"Severity", robot:"Robot",
  operator:"Operator", today:"Today", score:"Score",
  all:"All", valid:"Valid", updates:"updates",
  right_now:"Just now", days_ago:"day(s) ago", hours_ago:"hour(s) ago",
  min_ago:"min ago",

  dash_title:"Overview",
  dash_desc:"Overall status of robot fleets in Aarhus Municipality",
  active_robots:"Active robots", active_zones:"Active zones",
  events_today:"Events today", deliveries_today:"Deliveries today",
  avg_delivery:"Avg. delivery time", co2_saved:"CO\u2082 saved",
  unresolved:"unresolved",
  robot_status_dist:"Robot status distribution",
  activity_7d:"Activity (last 7 days)",
  operator_status:"Operator status",
  recent_events:"Recent events",
  deliveries:"Deliveries", active_robots_chart:"Active robots",

  zone_types:"Zone types",

  fleet_title:"Fleet Overview",
  fleet_desc:"Overview of connected robot fleets and their status",

  zones_title:"Zone Administration",
  zones_desc:"Manage zones, restrictions and access rules for robot fleets",
  zones_total:"Total zones", zones_active:"Active", zones_scheduled:"Scheduled",
  zones_restricted:"Restricted", zone_col:"Zone",

  events_title:"Events",
  events_desc:"Event log and compliance for robot operations",
  critical_events:"Critical events",
  unresolved_events:"Unresolved events",
  resolved_events:"Resolved events",

  analyse_title:"Analytics & Data",
  analyse_desc:"Insights into robot activity, delivery performance and sustainability",
  deliveries_30d:"Deliveries (30 days)",
  events_30d:"Events (30 days)",
  co2_month:"CO\u2082 saved (month)",
  activity_30d:"Activity over time (30 days)",
  operator_perf:"Operator performance (30 days)",
  sustainability:"Sustainability",
  popular_routes:"Popular routes",
  from:"From", to:"To", count:"Count", avg_time:"Avg. time",
  co2_saved_label:"CO\u2082 saved", electric_driving:"Electric driving",
  car_trips_replaced:"Car trips replaced",
  deliveries_30d_chart:"Deliveries (30d)", events_30d_chart:"Events (30d)",
  incidents_chart:"Events",

  op_portal_subtitle:"Operator Portal \u2014 Fleet overview and city conditions",
  compliance_score:"Compliance Score", connection:"Connection",
  deliveries_30d_op:"Deliveries (30 days)",
  delay_saved:"Delay saved today",
  manual_interventions:"Manual interventions",
  city_conditions:"City Conditions \u2014 Live Feed",
  active_rules:"Active rules",
  recent_events_op:"Recent events",
  route_optimization:"Route Optimization \u2014 Active routes",
  total_saved_today:"Total saved today",
  avg_saved_per_route:"Average {n} min saved per route via city data optimization",
  route_col:"Route", original:"Original", optimized:"Optimized",
  saved:"Saved", avoided:"Avoided",
  efficiency_14d:"Efficiency over time (14 days)",
  efficiency_desc:"Delivery time with and without city data optimization",
  without_opt:"Without optimization", with_opt:"With city data optimization",
  acknowledge:"Acknowledge", acknowledged:"Acknowledged",

  cond_restriction:"Restriction", cond_roadwork:"Roadwork", cond_event:"Event",
  cond_crossing:"Crossing", cond_weather:"Weather", cond_temporary_zone:"Temporary zone",

  unknown_operator:"Unknown operator", administrator:"Administrator",
  vs_without:"-28% vs. without", this_week:"this week", this_month_trend:"this month",
}
};

function t(key) { return i18n[lang][key] || key; }
function setLang(l) { lang = l; try { localStorage.setItem("lang", l); } catch(e) {} document.documentElement.lang = l; route(); }

// i18n-aware label lookups
function statusLabel(s) { return t("status_" + s); }
function sevLabel(s) { return t("sev_" + s); }
function evtLabel(s) { return t("evt_" + s); }
function zoneTypeLabel(s) { return t("zone_" + s); }
function connLabel(s) { return t("conn_" + s); }
function apiLabel(s) { return t("api_" + s); }
function zoneStatusLabel(s) { return t("zone_status_" + s); }
function condTypeLabel(s) { return t("cond_" + s); }

// ─── CONSTANTS ──────────────────────────────────────────────
const FLEET_COLORS = { "op-1": "#3661d8", "op-2": "#10B981", "op-3": "#F59E0B", "op-4": "#8B5CF6", "op-5": "#EF4444" };
const ZONE_COLORS = {
  pedestrian: { fill: "#F97316", stroke: "#EA580C" },
  restricted: { fill: "#EF4444", stroke: "#DC2626" },
  delivery:   { fill: "#22C55E", stroke: "#16A34A" },
  construction: { fill: "#F59E0B", stroke: "#D97706" },
};
const MAP_CENTER = [56.1572, 10.2107];
const MAP_ZOOM = 14;
const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

const NAV_ITEMS = [
  { hash: "#overblik",    labelKey: "nav_overblik",    icon: "layout-dashboard" },
  { hash: "#kort",        labelKey: "nav_kort",        icon: "map" },
  { hash: "#flaader",     labelKey: "nav_flaader",     icon: "truck" },
  { hash: "#zoner",       labelKey: "nav_zoner",       icon: "map-pin" },
  { hash: "#haendelser",  labelKey: "nav_haendelser",  icon: "triangle-alert" },
  { hash: "#analyse",     labelKey: "nav_analyse",     icon: "bar-chart-3" },
];
const OPERATOR_NAV = [
  { hash: "#operator", labelKey: "nav_operator", icon: "building-2" },
];

// ─── MOCK DATA ──────────────────────────────────────────────
const operators = [
  { id:"op-1", name:"NordBots ApS", robotCount:12, activeRobots:9, connectionStatus:"online", coverageArea:["Aarhus C","Frederiksbjerg","Tr\u00f8jborg"], apiHealth:{status:"healthy",latencyMs:42,uptime:99.7}, logoColor:"#2563EB", contactEmail:"drift@nordbots.dk" },
  { id:"op-2", name:"Kiwibot Danmark", robotCount:8, activeRobots:6, connectionStatus:"online", coverageArea:["Universitetsparken","N\u00f8rrebrogade"], apiHealth:{status:"healthy",latencyMs:58,uptime:98.9}, logoColor:"#10B981", contactEmail:"kontakt@kiwibot.dk" },
  { id:"op-3", name:"DanskDrone Logistik", robotCount:6, activeRobots:5, connectionStatus:"degraded", coverageArea:["Havnekvarteret","Aarhus \u00d8"], apiHealth:{status:"degraded",latencyMs:340,uptime:95.1}, logoColor:"#F59E0B", contactEmail:"ops@danskdrone.dk" },
  { id:"op-4", name:"Gr\u00f8nBy Robotik", robotCount:5, activeRobots:4, connectionStatus:"online", coverageArea:["Aarhus Midtby","Latinerkvarteret"], apiHealth:{status:"healthy",latencyMs:31,uptime:99.9}, logoColor:"#8B5CF6", contactEmail:"hej@gronbyrobotik.dk" },
  { id:"op-5", name:"ByBuddet IVS", robotCount:4, activeRobots:0, connectionStatus:"offline", coverageArea:["Gellerup","Brabrand"], apiHealth:{status:"down",latencyMs:-1,uptime:87.3}, logoColor:"#EF4444", contactEmail:"info@bybuddet.dk" },
];

const zones = [
  { id:"zone-midtby", name:"Aarhus Midtby G\u00e5gade", type:"pedestrian", status:"active", description:"Central fodg\u00e6ngerzone omkring Str\u00f8get og S\u00f8ndergade", speedLimit:5, maxRobots:4, currentRobots:2, activeHours:"Hverdage 08:00-22:00", polygon:[[56.159,10.206],[56.159,10.2145],[56.1555,10.2145],[56.1555,10.206]], lastModified:"2026-04-18T14:00:00Z" },
  { id:"zone-frederiksbjerg", name:"Frederiksbjerg Boligomr\u00e5de", type:"pedestrian", status:"active", description:"Hastighedsbegr\u00e6nsning i boligomr\u00e5de syd for centrum", speedLimit:6, maxRobots:5, currentRobots:3, activeHours:"Alle dage 07:00-21:00", polygon:[[56.15,10.198],[56.15,10.208],[56.145,10.208],[56.145,10.198]], lastModified:"2026-04-12T08:45:00Z" },
  { id:"zone-havn", name:"Aarhus Havn Leveringszone", type:"delivery", status:"active", description:"Udpeget leveringszone i havneomr\u00e5det og Dokk1", speedLimit:10, maxRobots:8, currentRobots:4, activeHours:"Alle dage 06:00-23:00", polygon:[[56.1555,10.215],[56.1555,10.228],[56.15,10.228],[56.15,10.215]], lastModified:"2026-04-15T11:30:00Z" },
  { id:"zone-uni", name:"Aarhus Universitet Campus", type:"delivery", status:"active", description:"Leveringszone p\u00e5 universitetsomr\u00e5det inkl. Nobelparken", speedLimit:8, maxRobots:6, currentRobots:3, activeHours:"Hverdage 07:00-22:00", polygon:[[56.171,10.197],[56.171,10.207],[56.165,10.207],[56.165,10.197]], lastModified:"2026-04-10T09:00:00Z" },
  { id:"zone-domkirke", name:"Domkirken & R\u00e5dhuspladsen", type:"restricted", status:"active", description:"Begr\u00e6nset adgang ved Aarhus Domkirke og R\u00e5dhuspladsen", speedLimit:null, maxRobots:0, currentRobots:0, activeHours:"Altid", polygon:[[56.1585,10.2095],[56.1585,10.213],[56.157,10.213],[56.157,10.2095]], lastModified:"2026-03-20T10:00:00Z" },
  { id:"zone-banegaard", name:"Baneg\u00e5rdspladsen", type:"restricted", status:"active", description:"Ingen robotadgang ved Aarhus Hovedbaneg\u00e5rd", speedLimit:null, maxRobots:0, currentRobots:0, activeHours:"Altid", polygon:[[56.1555,10.202],[56.1555,10.206],[56.1535,10.206],[56.1535,10.202]], lastModified:"2026-03-15T12:00:00Z" },
  { id:"zone-vejarbejde", name:"Havnefronten Vejarbejde", type:"construction", status:"scheduled", description:"Midlertidig zone grundet vejarbejde p\u00e5 havnefronten", speedLimit:null, maxRobots:0, currentRobots:0, activeHours:"Starter 1. maj 2026", polygon:[[56.153,10.22],[56.153,10.225],[56.151,10.225],[56.151,10.22]], lastModified:"2026-04-19T16:00:00Z" },
];

const robots = [
  { id:"NB-001",name:"NordBot Alpha-1",operatorId:"op-1",status:"active",batteryLevel:78,position:{lat:56.1568,lng:10.2112},currentZoneId:"zone-midtby",lastSeen:"2026-04-20T09:42:00Z",model:"NB-Delivery S2",speed:4.2,currentRouteId:"route-1"},
  { id:"NB-002",name:"NordBot Alpha-2",operatorId:"op-1",status:"active",batteryLevel:65,position:{lat:56.1485,lng:10.203},currentZoneId:"zone-frederiksbjerg",lastSeen:"2026-04-20T09:41:00Z",model:"NB-Delivery S2",speed:5.1,currentRouteId:"route-2"},
  { id:"NB-003",name:"NordBot Alpha-3",operatorId:"op-1",status:"active",batteryLevel:91,position:{lat:56.1545,lng:10.219},currentZoneId:"zone-havn",lastSeen:"2026-04-20T09:42:00Z",model:"NB-Delivery S2",speed:7.3,currentRouteId:"route-3"},
  { id:"NB-004",name:"NordBot Beta-1",operatorId:"op-1",status:"idle",batteryLevel:100,position:{lat:56.1575,lng:10.2078},currentZoneId:"zone-midtby",lastSeen:"2026-04-20T09:30:00Z",model:"NB-Delivery S3",speed:0,currentRouteId:null},
  { id:"NB-005",name:"NordBot Beta-2",operatorId:"op-1",status:"active",batteryLevel:42,position:{lat:56.1562,lng:10.2098},currentZoneId:"zone-midtby",lastSeen:"2026-04-20T09:42:00Z",model:"NB-Delivery S3",speed:3.8,currentRouteId:"route-4"},
  { id:"NB-006",name:"NordBot Beta-3",operatorId:"op-1",status:"charging",batteryLevel:23,position:{lat:56.158,lng:10.207},currentZoneId:null,lastSeen:"2026-04-20T08:50:00Z",model:"NB-Delivery S3",speed:0,currentRouteId:null},
  { id:"NB-007",name:"NordBot Gamma-1",operatorId:"op-1",status:"active",batteryLevel:56,position:{lat:56.147,lng:10.201},currentZoneId:"zone-frederiksbjerg",lastSeen:"2026-04-20T09:42:00Z",model:"NB-Cargo M1",speed:5.5,currentRouteId:"route-5"},
  { id:"NB-008",name:"NordBot Gamma-2",operatorId:"op-1",status:"active",batteryLevel:83,position:{lat:56.153,lng:10.217},currentZoneId:"zone-havn",lastSeen:"2026-04-20T09:41:00Z",model:"NB-Cargo M1",speed:8.1,currentRouteId:"route-6"},
  { id:"NB-009",name:"NordBot Gamma-3",operatorId:"op-1",status:"active",batteryLevel:34,position:{lat:56.149,lng:10.205},currentZoneId:"zone-frederiksbjerg",lastSeen:"2026-04-20T09:42:00Z",model:"NB-Cargo M1",speed:4.7,currentRouteId:null},
  { id:"NB-010",name:"NordBot Delta-1",operatorId:"op-1",status:"error",batteryLevel:12,position:{lat:56.1555,lng:10.2105},currentZoneId:"zone-midtby",lastSeen:"2026-04-20T08:15:00Z",model:"NB-Delivery S2",speed:0,currentRouteId:null},
  { id:"NB-011",name:"NordBot Delta-2",operatorId:"op-1",status:"active",batteryLevel:67,position:{lat:56.151,lng:10.223},currentZoneId:"zone-havn",lastSeen:"2026-04-20T09:42:00Z",model:"NB-Delivery S3",speed:6.9,currentRouteId:null},
  { id:"NB-012",name:"NordBot Delta-3",operatorId:"op-1",status:"idle",batteryLevel:95,position:{lat:56.156,lng:10.2085},currentZoneId:null,lastSeen:"2026-04-20T09:20:00Z",model:"NB-Delivery S2",speed:0,currentRouteId:null},
  { id:"KB-001",name:"Kiwibot DK-1",operatorId:"op-2",status:"active",batteryLevel:88,position:{lat:56.168,lng:10.201},currentZoneId:"zone-uni",lastSeen:"2026-04-20T09:42:00Z",model:"Kiwibot K4",speed:5.8,currentRouteId:"route-7"},
  { id:"KB-002",name:"Kiwibot DK-2",operatorId:"op-2",status:"active",batteryLevel:71,position:{lat:56.1695,lng:10.2035},currentZoneId:"zone-uni",lastSeen:"2026-04-20T09:41:00Z",model:"Kiwibot K4",speed:4.5,currentRouteId:"route-8"},
  { id:"KB-003",name:"Kiwibot DK-3",operatorId:"op-2",status:"active",batteryLevel:53,position:{lat:56.167,lng:10.205},currentZoneId:"zone-uni",lastSeen:"2026-04-20T09:42:00Z",model:"Kiwibot K4",speed:6.2,currentRouteId:null},
  { id:"KB-004",name:"Kiwibot DK-4",operatorId:"op-2",status:"charging",batteryLevel:15,position:{lat:56.166,lng:10.199},currentZoneId:"zone-uni",lastSeen:"2026-04-20T08:30:00Z",model:"Kiwibot K4",speed:0,currentRouteId:null},
  { id:"KB-005",name:"Kiwibot DK-5",operatorId:"op-2",status:"active",batteryLevel:92,position:{lat:56.1685,lng:10.2025},currentZoneId:"zone-uni",lastSeen:"2026-04-20T09:42:00Z",model:"Kiwibot K5",speed:7,currentRouteId:null},
  { id:"KB-006",name:"Kiwibot DK-6",operatorId:"op-2",status:"idle",batteryLevel:100,position:{lat:56.1665,lng:10.2},currentZoneId:"zone-uni",lastSeen:"2026-04-20T09:15:00Z",model:"Kiwibot K5",speed:0,currentRouteId:null},
  { id:"KB-007",name:"Kiwibot DK-7",operatorId:"op-2",status:"active",batteryLevel:45,position:{lat:56.17,lng:10.2045},currentZoneId:"zone-uni",lastSeen:"2026-04-20T09:42:00Z",model:"Kiwibot K4",speed:5.3,currentRouteId:null},
  { id:"KB-008",name:"Kiwibot DK-8",operatorId:"op-2",status:"offline",batteryLevel:4,position:{lat:56.1675,lng:10.202},currentZoneId:"zone-uni",lastSeen:"2026-04-19T14:30:00Z",model:"Kiwibot K4",speed:0,currentRouteId:null},
  { id:"DD-001",name:"DanskDrone L-1",operatorId:"op-3",status:"active",batteryLevel:74,position:{lat:56.154,lng:10.22},currentZoneId:"zone-havn",lastSeen:"2026-04-20T09:42:00Z",model:"DD-Cargo X1",speed:8.5,currentRouteId:"route-9"},
  { id:"DD-002",name:"DanskDrone L-2",operatorId:"op-3",status:"active",batteryLevel:61,position:{lat:56.152,lng:10.218},currentZoneId:"zone-havn",lastSeen:"2026-04-20T09:41:00Z",model:"DD-Cargo X1",speed:7.2,currentRouteId:null},
  { id:"DD-003",name:"DanskDrone L-3",operatorId:"op-3",status:"active",batteryLevel:85,position:{lat:56.1535,lng:10.222},currentZoneId:"zone-havn",lastSeen:"2026-04-20T09:42:00Z",model:"DD-Cargo X2",speed:9.1,currentRouteId:"route-10"},
  { id:"DD-004",name:"DanskDrone L-4",operatorId:"op-3",status:"idle",batteryLevel:98,position:{lat:56.151,lng:10.216},currentZoneId:"zone-havn",lastSeen:"2026-04-20T09:25:00Z",model:"DD-Cargo X1",speed:0,currentRouteId:null},
  { id:"DD-005",name:"DanskDrone L-5",operatorId:"op-3",status:"active",batteryLevel:39,position:{lat:56.1525,lng:10.224},currentZoneId:"zone-havn",lastSeen:"2026-04-20T09:42:00Z",model:"DD-Cargo X2",speed:6.8,currentRouteId:null},
  { id:"DD-006",name:"DanskDrone L-6",operatorId:"op-3",status:"active",batteryLevel:55,position:{lat:56.1548,lng:10.2265},currentZoneId:"zone-havn",lastSeen:"2026-04-20T09:42:00Z",model:"DD-Cargo X1",speed:7.9,currentRouteId:null},
  { id:"GB-001",name:"Gr\u00f8nBy City-1",operatorId:"op-4",status:"active",batteryLevel:82,position:{lat:56.1578,lng:10.2088},currentZoneId:"zone-midtby",lastSeen:"2026-04-20T09:42:00Z",model:"GB-Urban V2",speed:3.5,currentRouteId:"route-11"},
  { id:"GB-002",name:"Gr\u00f8nBy City-2",operatorId:"op-4",status:"active",batteryLevel:69,position:{lat:56.1585,lng:10.2105},currentZoneId:"zone-midtby",lastSeen:"2026-04-20T09:41:00Z",model:"GB-Urban V2",speed:4.1,currentRouteId:null},
  { id:"GB-003",name:"Gr\u00f8nBy City-3",operatorId:"op-4",status:"active",batteryLevel:47,position:{lat:56.157,lng:10.212},currentZoneId:"zone-midtby",lastSeen:"2026-04-20T09:42:00Z",model:"GB-Urban V3",speed:4.8,currentRouteId:null},
  { id:"GB-004",name:"Gr\u00f8nBy City-4",operatorId:"op-4",status:"charging",batteryLevel:8,position:{lat:56.1582,lng:10.2075},currentZoneId:null,lastSeen:"2026-04-20T07:45:00Z",model:"GB-Urban V2",speed:0,currentRouteId:null},
  { id:"GB-005",name:"Gr\u00f8nBy City-5",operatorId:"op-4",status:"active",batteryLevel:94,position:{lat:56.1565,lng:10.2095},currentZoneId:"zone-midtby",lastSeen:"2026-04-20T09:42:00Z",model:"GB-Urban V3",speed:3.2,currentRouteId:null},
  { id:"BB-001",name:"ByBud Express-1",operatorId:"op-5",status:"offline",batteryLevel:0,position:{lat:56.162,lng:10.175},currentZoneId:null,lastSeen:"2026-04-19T22:00:00Z",model:"BB-Express M1",speed:0,currentRouteId:null},
  { id:"BB-002",name:"ByBud Express-2",operatorId:"op-5",status:"offline",batteryLevel:0,position:{lat:56.1625,lng:10.176},currentZoneId:null,lastSeen:"2026-04-19T22:00:00Z",model:"BB-Express M1",speed:0,currentRouteId:null},
  { id:"BB-003",name:"ByBud Express-3",operatorId:"op-5",status:"offline",batteryLevel:0,position:{lat:56.1618,lng:10.1745},currentZoneId:null,lastSeen:"2026-04-19T21:45:00Z",model:"BB-Express M2",speed:0,currentRouteId:null},
  { id:"BB-004",name:"ByBud Express-4",operatorId:"op-5",status:"offline",batteryLevel:0,position:{lat:56.1622,lng:10.1755},currentZoneId:null,lastSeen:"2026-04-19T21:30:00Z",model:"BB-Express M2",speed:0,currentRouteId:null},
];

const routes = [
  { id:"route-1",robotId:"NB-001",operatorId:"op-1",path:[[56.1568,10.2112],[56.1572,10.21],[56.1578,10.2085],[56.1582,10.207],[56.1578,10.2055],[56.157,10.2045],[56.156,10.205],[56.1555,10.2065],[56.1558,10.208],[56.1563,10.2095],[56.1568,10.2112]],origin:"S\u00f8ndergade 42",destination:"Frederiks All\u00e9 12",status:"active"},
  { id:"route-2",robotId:"NB-002",operatorId:"op-1",path:[[56.1485,10.203],[56.148,10.2045],[56.1475,10.206],[56.147,10.2075],[56.1478,10.208],[56.1485,10.207],[56.149,10.2055],[56.1492,10.204],[56.1488,10.203],[56.1485,10.203]],origin:"M.P. Bruuns Gade 8",destination:"J\u00e6gerg\u00e5rdsgade 25",status:"active"},
  { id:"route-3",robotId:"NB-003",operatorId:"op-1",path:[[56.1545,10.219],[56.154,10.2205],[56.1535,10.222],[56.153,10.224],[56.1525,10.2255],[56.153,10.2265],[56.154,10.226],[56.1548,10.2245],[56.155,10.2225],[56.1548,10.2205],[56.1545,10.219]],origin:"Dokk1",destination:"Aarhus \u00d8 Terminal",status:"active"},
  { id:"route-4",robotId:"NB-005",operatorId:"op-1",path:[[56.1562,10.2098],[56.1565,10.211],[56.157,10.2125],[56.1575,10.2135],[56.158,10.214],[56.1578,10.2125],[56.1573,10.211],[56.1568,10.21],[56.1562,10.2098]],origin:"Store Torv",destination:"Immervad 2",status:"active"},
  { id:"route-5",robotId:"NB-007",operatorId:"op-1",path:[[56.147,10.201],[56.1475,10.2025],[56.148,10.204],[56.1485,10.2055],[56.149,10.2065],[56.1488,10.205],[56.1482,10.2035],[56.1476,10.202],[56.147,10.201]],origin:"Ingerslevs Boulevard",destination:"Frederiks All\u00e9 78",status:"active"},
  { id:"route-6",robotId:"NB-008",operatorId:"op-1",path:[[56.153,10.217],[56.1535,10.2185],[56.154,10.22],[56.1545,10.2215],[56.154,10.2225],[56.1535,10.221],[56.153,10.2195],[56.1528,10.218],[56.153,10.217]],origin:"Europaplads",destination:"Hack Kampmanns Pl. 1",status:"active"},
  { id:"route-7",robotId:"KB-001",operatorId:"op-2",path:[[56.168,10.201],[56.1685,10.2025],[56.169,10.204],[56.1695,10.205],[56.1698,10.204],[56.1693,10.2025],[56.1688,10.2015],[56.1683,10.201],[56.168,10.201]],origin:"Nobelparken",destination:"Studenternes Hus",status:"active"},
  { id:"route-8",robotId:"KB-002",operatorId:"op-2",path:[[56.1695,10.2035],[56.169,10.202],[56.1685,10.2005],[56.168,10.1995],[56.1675,10.2005],[56.168,10.202],[56.1685,10.203],[56.169,10.2038],[56.1695,10.2035]],origin:"IT-Byen",destination:"Stakladen",status:"active"},
  { id:"route-9",robotId:"DD-001",operatorId:"op-3",path:[[56.154,10.22],[56.1535,10.2215],[56.153,10.223],[56.1525,10.225],[56.153,10.226],[56.1535,10.2245],[56.154,10.223],[56.1542,10.2215],[56.154,10.22]],origin:"Aarhus \u00d8 Bassin",destination:"Isbjerget",status:"active"},
  { id:"route-10",robotId:"DD-003",operatorId:"op-3",path:[[56.1535,10.222],[56.153,10.2235],[56.1525,10.225],[56.152,10.226],[56.1518,10.2245],[56.1522,10.223],[56.1528,10.2218],[56.1533,10.2215],[56.1535,10.222]],origin:"Navitas",destination:"Lighthouse",status:"active"},
  { id:"route-11",robotId:"GB-001",operatorId:"op-4",path:[[56.1578,10.2088],[56.1575,10.21],[56.1572,10.2115],[56.1568,10.2125],[56.1565,10.2115],[56.1568,10.21],[56.1572,10.209],[56.1576,10.2085],[56.1578,10.2088]],origin:"Latinerkvarteret",destination:"Graven 8",status:"active"},
];

const events = [
  { id:"EVT-001",robotId:"NB-010",robotName:"NordBot Delta-1",operatorName:"NordBots ApS",type:"low_battery",severity:"critical",message:{da:"Robot stoppet med kritisk batteriniveau (12%). Kr\u00e6ver manuel opladning.",en:"Robot stopped with critical battery (12%). Requires manual charging."},timestamp:"2026-04-20T08:15:00Z",resolved:false },
  { id:"EVT-002",robotId:"DD-002",robotName:"DanskDrone L-2",operatorName:"DanskDrone Logistik",type:"speed_violation",severity:"warning",message:{da:"Robot registreret med 12.3 km/t i leveringszone (maks 10 km/t)",en:"Robot recorded at 12.3 km/h in delivery zone (max 10 km/h)"},timestamp:"2026-04-20T09:15:00Z",resolved:false },
  { id:"EVT-003",robotId:"GB-002",robotName:"Gr\u00f8nBy City-2",operatorName:"Gr\u00f8nBy Robotik",type:"collision_near_miss",severity:"critical",message:{da:"N\u00e6rved-sammenst\u00f8d med cyklist ved N\u00f8rreport. N\u00f8dbremse aktiveret.",en:"Near-miss collision with cyclist at N\u00f8rreport. Emergency brake activated."},timestamp:"2026-04-20T08:45:00Z",resolved:false },
  { id:"EVT-004",robotId:"KB-008",robotName:"Kiwibot DK-8",operatorName:"Kiwibot Danmark",type:"low_battery",severity:"info",message:{da:"Robot rapporterede kritisk batteriniveau (4%) og stoppede ved Universitetsparken.",en:"Robot reported critical battery (4%) and stopped at University Park."},timestamp:"2026-04-19T14:30:00Z",resolved:true },
  { id:"EVT-005",robotId:"NB-007",robotName:"NordBot Gamma-1",operatorName:"NordBots ApS",type:"zone_breach",severity:"warning",message:{da:"Robot forlod Frederiksbjerg-zonen uden tilladelse.",en:"Robot left Frederiksbjerg zone without permission."},timestamp:"2026-04-20T07:30:00Z",resolved:true },
  { id:"EVT-006",robotId:"DD-005",robotName:"DanskDrone L-5",operatorName:"DanskDrone Logistik",type:"connection_lost",severity:"warning",message:{da:"Forbindelse tabt i 45 sekunder ved havneomr\u00e5det. Genforbundet automatisk.",en:"Connection lost for 45 seconds in the harbour area. Reconnected automatically."},timestamp:"2026-04-20T06:20:00Z",resolved:true },
  { id:"EVT-007",robotId:"BB-001",robotName:"ByBud Express-1",operatorName:"ByBuddet IVS",type:"connection_lost",severity:"critical",message:{da:"Hele ByBuddet-fl\u00e5den har mistet forbindelsen. Sidste kontakt kl. 22:00.",en:"Entire ByBuddet fleet lost connection. Last contact at 22:00."},timestamp:"2026-04-19T22:00:00Z",resolved:false },
  { id:"EVT-008",robotId:"NB-003",robotName:"NordBot Alpha-3",operatorName:"NordBots ApS",type:"route_deviation",severity:"info",message:{da:"Robot afveg fra planlagt rute for at undg\u00e5 forhindring p\u00e5 Havnegade.",en:"Robot deviated from planned route to avoid obstacle on Havnegade."},timestamp:"2026-04-20T09:05:00Z",resolved:true },
  { id:"EVT-009",robotId:"GB-003",robotName:"Gr\u00f8nBy City-3",operatorName:"Gr\u00f8nBy Robotik",type:"pedestrian_complaint",severity:"warning",message:{da:"Borgerhenvendelse: Robot blokerede fortov p\u00e5 Ryesgade i 3 minutter.",en:"Citizen complaint: Robot blocked sidewalk on Ryesgade for 3 minutes."},timestamp:"2026-04-19T16:45:00Z",resolved:true },
  { id:"EVT-010",robotId:"KB-005",robotName:"Kiwibot DK-5",operatorName:"Kiwibot Danmark",type:"speed_violation",severity:"warning",message:{da:"Hastighedsovertr\u00e6delse: 9.1 km/t i campuszone (maks 8 km/t)",en:"Speed violation: 9.1 km/h in campus zone (max 8 km/h)"},timestamp:"2026-04-19T11:20:00Z",resolved:true },
  { id:"EVT-011",robotId:"DD-001",robotName:"DanskDrone L-1",operatorName:"DanskDrone Logistik",type:"zone_breach",severity:"warning",message:{da:"Robot k\u00f8rte ind i begr\u00e6nset zone ved Baneg\u00e5rdspladsen.",en:"Robot entered restricted zone at Baneg\u00e5rdspladsen."},timestamp:"2026-04-19T10:00:00Z",resolved:true },
  { id:"EVT-012",robotId:"NB-002",robotName:"NordBot Alpha-2",operatorName:"NordBots ApS",type:"collision_near_miss",severity:"critical",message:{da:"N\u00f8dbremse ved n\u00e6rved-sammenst\u00f8d med barnevogn p\u00e5 J\u00e6gerg\u00e5rdsgade.",en:"Emergency brake during near-miss with stroller on J\u00e6gerg\u00e5rdsgade."},timestamp:"2026-04-18T15:30:00Z",resolved:true },
  { id:"EVT-013",robotId:"GB-004",robotName:"Gr\u00f8nBy City-4",operatorName:"Gr\u00f8nBy Robotik",type:"low_battery",severity:"warning",message:{da:"Batteriniveau under 10%. Robot returneret til opladningsstation.",en:"Battery below 10%. Robot returned to charging station."},timestamp:"2026-04-20T07:45:00Z",resolved:true },
  { id:"EVT-014",robotId:"NB-005",robotName:"NordBot Beta-2",operatorName:"NordBots ApS",type:"route_deviation",severity:"info",message:{da:"Ruteafvigelse pga. midlertidigt vejarbejde p\u00e5 Store Torv.",en:"Route deviation due to temporary roadwork at Store Torv."},timestamp:"2026-04-20T08:30:00Z",resolved:true },
  { id:"EVT-015",robotId:"DD-003",robotName:"DanskDrone L-3",operatorName:"DanskDrone Logistik",type:"pedestrian_complaint",severity:"info",message:{da:"Henvendelse om st\u00f8j fra robot tidligt om morgenen ved Navitas.",en:"Noise complaint about robot early morning at Navitas."},timestamp:"2026-04-18T06:15:00Z",resolved:true },
];

function evtMsg(evt) { return typeof evt.message === "object" ? evt.message[lang] : evt.message; }

const dailyStats = [
  {date:"2026-03-22",totalTrips:95,activeRobots:18,incidents:3,avgDeliveryMinutes:22,distanceKm:165},
  {date:"2026-03-23",totalTrips:55,activeRobots:12,incidents:1,distanceKm:98,avgDeliveryMinutes:24},
  {date:"2026-03-24",totalTrips:102,activeRobots:19,incidents:4,distanceKm:178,avgDeliveryMinutes:21},
  {date:"2026-03-25",totalTrips:110,activeRobots:20,incidents:2,distanceKm:192,avgDeliveryMinutes:20},
  {date:"2026-03-26",totalTrips:118,activeRobots:21,incidents:5,distanceKm:205,avgDeliveryMinutes:19},
  {date:"2026-03-27",totalTrips:108,activeRobots:20,incidents:3,distanceKm:188,avgDeliveryMinutes:20},
  {date:"2026-03-28",totalTrips:125,activeRobots:22,incidents:2,distanceKm:218,avgDeliveryMinutes:19},
  {date:"2026-03-29",totalTrips:68,activeRobots:14,incidents:1,distanceKm:120,avgDeliveryMinutes:23},
  {date:"2026-03-30",totalTrips:62,activeRobots:13,incidents:0,distanceKm:108,avgDeliveryMinutes:24},
  {date:"2026-03-31",totalTrips:130,activeRobots:23,incidents:3,distanceKm:226,avgDeliveryMinutes:18},
  {date:"2026-04-01",totalTrips:135,activeRobots:22,incidents:4,distanceKm:235,avgDeliveryMinutes:19},
  {date:"2026-04-02",totalTrips:128,activeRobots:21,incidents:2,distanceKm:222,avgDeliveryMinutes:19},
  {date:"2026-04-03",totalTrips:140,activeRobots:23,incidents:3,distanceKm:243,avgDeliveryMinutes:18},
  {date:"2026-04-04",totalTrips:132,activeRobots:22,incidents:1,distanceKm:230,avgDeliveryMinutes:18},
  {date:"2026-04-05",totalTrips:72,activeRobots:15,incidents:2,distanceKm:126,avgDeliveryMinutes:22},
  {date:"2026-04-06",totalTrips:65,activeRobots:14,incidents:0,distanceKm:114,avgDeliveryMinutes:23},
  {date:"2026-04-07",totalTrips:145,activeRobots:24,incidents:5,distanceKm:252,avgDeliveryMinutes:18},
  {date:"2026-04-08",totalTrips:152,activeRobots:24,incidents:3,distanceKm:264,avgDeliveryMinutes:17},
  {date:"2026-04-09",totalTrips:148,activeRobots:23,incidents:2,distanceKm:257,avgDeliveryMinutes:18},
  {date:"2026-04-10",totalTrips:155,activeRobots:25,incidents:4,distanceKm:270,avgDeliveryMinutes:17},
  {date:"2026-04-11",totalTrips:142,activeRobots:23,incidents:2,distanceKm:247,avgDeliveryMinutes:18},
  {date:"2026-04-12",totalTrips:78,activeRobots:16,incidents:1,distanceKm:136,avgDeliveryMinutes:21},
  {date:"2026-04-13",totalTrips:70,activeRobots:15,incidents:1,distanceKm:122,avgDeliveryMinutes:22},
  {date:"2026-04-14",totalTrips:160,activeRobots:25,incidents:3,distanceKm:278,avgDeliveryMinutes:17},
  {date:"2026-04-15",totalTrips:158,activeRobots:24,incidents:4,distanceKm:274,avgDeliveryMinutes:18},
  {date:"2026-04-16",totalTrips:165,activeRobots:25,incidents:2,distanceKm:287,avgDeliveryMinutes:17},
  {date:"2026-04-17",totalTrips:170,activeRobots:26,incidents:3,distanceKm:295,avgDeliveryMinutes:17},
  {date:"2026-04-18",totalTrips:162,activeRobots:25,incidents:5,distanceKm:282,avgDeliveryMinutes:18},
  {date:"2026-04-19",totalTrips:82,activeRobots:17,incidents:4,distanceKm:143,avgDeliveryMinutes:21},
  {date:"2026-04-20",totalTrips:147,activeRobots:24,incidents:3,distanceKm:256,avgDeliveryMinutes:18},
];

const operatorStats = [
  {operatorId:"op-1",operatorName:"NordBots ApS",trips:2840,incidents:12,complianceScore:96.5,avgDeliveryMinutes:16},
  {operatorId:"op-2",operatorName:"Kiwibot Danmark",trips:1650,incidents:5,complianceScore:98.2,avgDeliveryMinutes:14},
  {operatorId:"op-3",operatorName:"DanskDrone Logistik",trips:1280,incidents:18,complianceScore:91.3,avgDeliveryMinutes:12},
  {operatorId:"op-4",operatorName:"Gr\u00f8nBy Robotik",trips:980,incidents:8,complianceScore:94.7,avgDeliveryMinutes:20},
  {operatorId:"op-5",operatorName:"ByBuddet IVS",trips:320,incidents:22,complianceScore:78.4,avgDeliveryMinutes:25},
];

const sustainabilityData = { co2SavedKg:2400, electricKmDriven:18500, carTripsReplaced:4200, traditionalCo2Kg:3100 };

const topRoutes = [
  {from:"Bruuns Galleri",to:"Frederiksbjerg Torv",count:847,avgTimeMinutes:12},
  {from:"Storcenter Nord",to:"Tr\u00f8jborg",count:623,avgTimeMinutes:18},
  {from:"Nobelparken",to:"Studenternes Hus",count:591,avgTimeMinutes:8},
  {from:"Aarhus Streetfood",to:"Havnebadet",count:445,avgTimeMinutes:15},
  {from:"Dokk1",to:"Latinerkvarteret",count:412,avgTimeMinutes:14},
  {from:"Ceresbyen",to:"Botanisk Have",count:389,avgTimeMinutes:11},
  {from:"Godsbanen",to:"Aarhus \u00d8",count:356,avgTimeMinutes:20},
  {from:"S\u00f8ndergade 42",to:"R\u00e5dhuspladsen",count:334,avgTimeMinutes:6},
];

const cityConditions = [
  {id:"cc-1",type:"restriction",severity:"critical",title:{da:"Permanent lukning: R\u00e5dhuspladsen",en:"Permanent closure: R\u00e5dhuspladsen"},description:{da:"R\u00e5dhuspladsen er nu permanent lukket for al robottrafik. Alle ruter gennem omr\u00e5det skal oml\u00e6gges.",en:"R\u00e5dhuspladsen is now permanently closed to all robot traffic. All routes through the area must be rerouted."},location:"R\u00e5dhuspladsen, Aarhus C",validFrom:"2026-04-20T00:00:00Z",validTo:null,timestamp:"2026-04-20T08:00:00Z",acknowledged:false},
  {id:"cc-2",type:"roadwork",severity:"warning",title:{da:"Vejarbejde: Havnefronten",en:"Roadwork: Harbour front"},description:{da:"Havnegade lukket for robotter 1.-15. maj pga. kloakrenovering.",en:"Havnegade closed for robots May 1-15 due to sewer renovation."},location:"Havnegade, Aarhus \u00d8",validFrom:"2026-05-01T06:00:00Z",validTo:"2026-05-15T18:00:00Z",timestamp:"2026-04-20T07:30:00Z",acknowledged:false},
  {id:"cc-3",type:"temporary_zone",severity:"warning",title:{da:"Festuge: Ekstra fodg\u00e6ngerzone",en:"Festival: Extra pedestrian zone"},description:{da:"Latinerkvarteret udvides til komplet fodg\u00e6ngerzone under Aarhus Festuge. Hastighed reduceret til 3 km/t.",en:"Latin Quarter expanded to full pedestrian zone during Aarhus Festival. Speed reduced to 3 km/h."},location:"Latinerkvarteret",validFrom:"2026-04-22T10:00:00Z",validTo:"2026-04-29T22:00:00Z",timestamp:"2026-04-20T06:15:00Z",acknowledged:false},
  {id:"cc-4",type:"crossing",severity:"info",title:{da:"Krydsningspunkt opdatering: N\u00f8rreport",en:"Crossing update: N\u00f8rreport"},description:{da:"Ny signalregulering ved N\u00f8rreport-krydset. Robotventetid \u00e6ndret fra 30 til 45 sekunder.",en:"New signal regulation at N\u00f8rreport crossing. Robot wait time changed from 30 to 45 seconds."},location:"N\u00f8rreport, N\u00f8rre All\u00e9",validFrom:"2026-04-19T12:00:00Z",validTo:null,timestamp:"2026-04-19T12:00:00Z",acknowledged:true},
  {id:"cc-5",type:"weather",severity:"warning",title:{da:"DMI: Kraftig regn forventet",en:"DMI: Heavy rain expected"},description:{da:"DMI varsler kraftig regn kl. 14-18 i dag.",en:"DMI warns of heavy rain 14-18 today."},location:"Hele Aarhus Kommune",validFrom:"2026-04-20T14:00:00Z",validTo:"2026-04-20T18:00:00Z",timestamp:"2026-04-20T09:00:00Z",acknowledged:false},
  {id:"cc-6",type:"event",severity:"info",title:{da:"Arrangement: Letbanen fejrer 5 \u00e5r",en:"Event: Light rail celebrates 5 years"},description:{da:"Ekstra fodg\u00e6ngertrafik ved Dokk1 og baneg\u00e5rden kl. 10-16.",en:"Extra pedestrian traffic at Dokk1 and station 10-16."},location:"Dokk1 & Baneg\u00e5rdspladsen",validFrom:"2026-04-21T10:00:00Z",validTo:"2026-04-21T16:00:00Z",timestamp:"2026-04-19T15:00:00Z",acknowledged:true},
  {id:"cc-7",type:"restriction",severity:"info",title:{da:"Hastighedsgr\u00e6nse \u00e6ndret: Frederiksbjerg",en:"Speed limit changed: Frederiksbjerg"},description:{da:"Hastighedsgr\u00e6nsen i Frederiksbjerg Boligomr\u00e5de \u00e6ndret fra 6 til 5 km/t.",en:"Speed limit in Frederiksbjerg residential area changed from 6 to 5 km/h."},location:"Frederiksbjerg",validFrom:"2026-04-18T00:00:00Z",validTo:null,timestamp:"2026-04-18T10:00:00Z",acknowledged:true},
  {id:"cc-8",type:"crossing",severity:"warning",title:{da:"Krydsning lukket: Skolegade",en:"Crossing closed: Skolegade"},description:{da:"Krydsning ved Skolegade/Frederiksgade midlertidigt lukket pga. gravearbejde.",en:"Crossing at Skolegade/Frederiksgade temporarily closed due to excavation."},location:"Skolegade / Frederiksgade",validFrom:"2026-04-19T08:00:00Z",validTo:"2026-04-25T17:00:00Z",timestamp:"2026-04-19T08:00:00Z",acknowledged:true},
];

const operatorRules = [
  {id:"rule-1",rule:{da:"Maks 5 km/t i fodg\u00e6ngerzoner",en:"Max 5 km/h in pedestrian zones"},compliant:true,zone:"Midtby G\u00e5gade"},
  {id:"rule-2",rule:{da:"Maks 4 robotter i Midtby G\u00e5gade samtidigt",en:"Max 4 robots in Midtby G\u00e5gade simultaneously"},compliant:true,zone:"Midtby G\u00e5gade"},
  {id:"rule-3",rule:{da:"Ingen adgang til Domkirken & R\u00e5dhuspladsen",en:"No access to Cathedral & City Hall Square"},compliant:true,zone:"Domkirken"},
  {id:"rule-4",rule:{da:"K\u00f8rsel tilladt hverdage 07:00-22:00 i boligomr\u00e5der",en:"Driving allowed weekdays 07:00-22:00 in residential areas"},compliant:true,zone:"Frederiksbjerg"},
  {id:"rule-5",rule:{da:"N\u00f8dbremse p\u00e5kr\u00e6vet ved < 2m afstand til fodg\u00e6nger",en:"Emergency brake required at < 2m distance to pedestrian"},compliant:false,zone:"Alle zoner"},
  {id:"rule-6",rule:{da:"Maks 8 robotter i havneomr\u00e5det",en:"Max 8 robots in the harbour area"},compliant:true,zone:"Aarhus Havn"},
];

const optimizedRoutes = [
  {routeId:"route-1",origin:"S\u00f8ndergade 42",destination:"Frederiks All\u00e9 12",robotId:"NB-001",originalTimeMin:14,optimizedTimeMin:11,savingMin:3,avoidedConditions:["Vejarbejde Store Torv"],status:"active"},
  {routeId:"route-2",origin:"M.P. Bruuns Gade 8",destination:"J\u00e6gerg\u00e5rdsgade 25",robotId:"NB-002",originalTimeMin:10,optimizedTimeMin:8,savingMin:2,avoidedConditions:["Hastighedszone Frederiksbjerg"],status:"active"},
  {routeId:"route-3",origin:"Dokk1",destination:"Aarhus \u00d8 Terminal",robotId:"NB-003",originalTimeMin:18,optimizedTimeMin:15,savingMin:3,avoidedConditions:["Havnefront vejarbejde"],status:"active"},
  {routeId:"route-4",origin:"Store Torv",destination:"Immervad 2",robotId:"NB-005",originalTimeMin:8,optimizedTimeMin:6,savingMin:2,avoidedConditions:["Fodg\u00e6ngertrafik g\u00e5gade"],status:"active"},
  {routeId:"route-5",origin:"Ingerslevs Boulevard",destination:"Frederiks All\u00e9 78",robotId:"NB-007",originalTimeMin:12,optimizedTimeMin:10,savingMin:2,avoidedConditions:["Skolegade krydsning lukket"],status:"active"},
  {routeId:"route-6",origin:"Europaplads",destination:"Hack Kampmanns Pl.",robotId:"NB-008",originalTimeMin:15,optimizedTimeMin:12,savingMin:3,avoidedConditions:["Arrangement Dokk1"],status:"active"},
];

const operatorDailyEfficiency = [
  {date:"2026-04-07",trips:38,avgTimeMin:22,optimizedTimeMin:18,manualInterventions:5},
  {date:"2026-04-08",trips:42,avgTimeMin:21,optimizedTimeMin:17,manualInterventions:4},
  {date:"2026-04-09",trips:40,avgTimeMin:20,optimizedTimeMin:16,manualInterventions:6},
  {date:"2026-04-10",trips:45,avgTimeMin:21,optimizedTimeMin:17,manualInterventions:3},
  {date:"2026-04-11",trips:43,avgTimeMin:19,optimizedTimeMin:16,manualInterventions:4},
  {date:"2026-04-12",trips:25,avgTimeMin:23,optimizedTimeMin:19,manualInterventions:2},
  {date:"2026-04-13",trips:22,avgTimeMin:24,optimizedTimeMin:20,manualInterventions:1},
  {date:"2026-04-14",trips:48,avgTimeMin:19,optimizedTimeMin:15,manualInterventions:5},
  {date:"2026-04-15",trips:46,avgTimeMin:18,optimizedTimeMin:15,manualInterventions:3},
  {date:"2026-04-16",trips:50,avgTimeMin:18,optimizedTimeMin:14,manualInterventions:3},
  {date:"2026-04-17",trips:52,avgTimeMin:17,optimizedTimeMin:14,manualInterventions:2},
  {date:"2026-04-18",trips:49,avgTimeMin:18,optimizedTimeMin:15,manualInterventions:4},
  {date:"2026-04-19",trips:28,avgTimeMin:20,optimizedTimeMin:17,manualInterventions:1},
  {date:"2026-04-20",trips:47,avgTimeMin:17,optimizedTimeMin:14,manualInterventions:3},
];

// ─── HELPERS ────────────────────────────────────────────────
function getStats() {
  const activeRobots = robots.filter(r => r.status === "active").length;
  const totalRobots = robots.length;
  const activeZones = zones.filter(z => z.status === "active").length;
  const unresolvedEvents = events.filter(e => !e.resolved).length;
  const todayEvents = events.filter(e => e.timestamp.startsWith("2026-04-20")).length;
  return { activeRobots, totalRobots, activeZones, totalZones: zones.length, unresolvedEvents, todayEvents, deliveriesToday: 147, avgDeliveryMinutes: 18 };
}
function getRobotsByOperator(opId) { return robots.filter(r => r.operatorId === opId); }
function getOperator(id) { return operators.find(o => o.id === id); }
function fmtNum(n) { return n.toLocaleString(lang === "da" ? "da-DK" : "en-GB"); }
function fmtPct(n) { return n.toLocaleString(lang === "da" ? "da-DK" : "en-GB", { maximumFractionDigits: 1 }) + "%"; }
function fmtDate(iso) { return new Date(iso).toLocaleDateString(lang === "da" ? "da-DK" : "en-GB", { day: "numeric", month: "short", year: "numeric" }); }
function fmtDateTime(iso) { const d = new Date(iso); return d.toLocaleDateString(lang === "da" ? "da-DK" : "en-GB", { day: "numeric", month: "short", year: "numeric" }) + (lang === "da" ? " kl. " : " ") + d.toLocaleTimeString(lang === "da" ? "da-DK" : "en-GB", { hour: "2-digit", minute: "2-digit" }); }
function fmtShortDate(iso) { return new Date(iso).toLocaleDateString(lang === "da" ? "da-DK" : "en-GB", { day: "numeric", month: "short" }); }
function fmtWeekday(iso) { return new Date(iso).toLocaleDateString(lang === "da" ? "da-DK" : "en-GB", { weekday: "short", day: "numeric" }); }
function loc(obj) { return typeof obj === "object" && obj !== null && (obj.da || obj.en) ? (obj[lang] || obj.da) : obj; }

function badgeClass(status) {
  const map = { active:"badge-green", online:"badge-green", healthy:"badge-green", idle:"badge-amber", degraded:"badge-amber", warning:"badge-amber", charging:"badge-blue", scheduled:"badge-blue", info:"badge-blue", error:"badge-red", critical:"badge-red", down:"badge-red", offline:"badge-gray", expired:"badge-gray" };
  return map[status] || "badge-gray";
}
function badge(status, label) { return `<span class="badge ${badgeClass(status)}"><span class="badge-dot"></span>${label || status}</span>`; }
function icon(name) { return `<i data-lucide="${name}"></i>`; }

// ─── GLOBAL STATE ───────────────────────────────────────────
let mapInstance = null, mapMarkers = [], robotSimInterval = null, robotPositions = {}, conditionsState = [...cityConditions], chartInstances = [];
function destroyCharts() { chartInstances.forEach(c => c.destroy()); chartInstances = []; }
function stopSimulation() { if (robotSimInterval) { clearInterval(robotSimInterval); robotSimInterval = null; } }
function destroyMap() { if (mapInstance) { mapInstance.remove(); mapInstance = null; } mapMarkers = []; }
function closeSidebar() { document.body.classList.remove("sidebar-open"); }

// ─── SIDEBAR ────────────────────────────────────────────────
function renderSidebar() {
  const hash = location.hash || "#overblik";
  let html = `<div class="sidebar-logo"><div class="sidebar-logo-icon">${icon("bot")}</div><div><h1>AarhusWay</h1><p>Aarhus Kommune</p></div></div><nav class="sidebar-nav">`;
  NAV_ITEMS.forEach(item => {
    const active = (item.hash === "#overblik" ? hash === "#overblik" || hash === "" || hash === "#" : hash.startsWith(item.hash));
    html += `<a href="${item.hash}" class="${active ? "active" : ""}">${icon(item.icon)} ${t(item.labelKey)}</a>`;
  });
  html += `<div class="sidebar-separator"><p class="sidebar-separator-label">${t("nav_operator_section")}</p>`;
  OPERATOR_NAV.forEach(item => {
    html += `<a href="${item.hash}" class="${hash.startsWith(item.hash) ? "active-teal" : ""}">${icon(item.icon)} ${t(item.labelKey)}</a>`;
  });
  html += `</div></nav><div class="sidebar-user"><div class="sidebar-user-avatar">${icon("user")}</div><div class="sidebar-user-info"><p>Jeppe Krogh</p><p>${t("administrator")}</p></div></div>`;
  document.getElementById("sidebar").innerHTML = html;
  // Close sidebar on nav click (mobile)
  document.querySelectorAll(".sidebar-nav a").forEach(a => a.addEventListener("click", closeSidebar));
}

// ─── HEADER ─────────────────────────────────────────────────
function renderHeader() {
  const hash = location.hash || "#overblik";
  const allItems = [...NAV_ITEMS, ...OPERATOR_NAV];
  const current = allItems.find(i => (i.hash === "#overblik" ? hash === "#overblik" || hash === "" || hash === "#" : hash.startsWith(i.hash)));
  const label = current ? t(current.labelKey) : "Side";
  const unresolved = events.filter(e => !e.resolved).length;
  const locale = lang === "da" ? "da-DK" : "en-GB";
  const dateStr = new Date().toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  document.getElementById("header").innerHTML = `
    <div class="header-left">
      <button class="hamburger" id="hamburgerBtn">${icon("menu")}</button>
      <div class="header-breadcrumb">
        <span class="crumb-root">AarhusWay</span><span class="crumb-sep">/</span><span class="crumb-current">${label}</span>
      </div>
    </div>
    <div class="header-right">
      <div class="lang-toggle">
        <button class="lang-btn ${lang === "da" ? "active" : ""}" data-lang="da">DA</button>
        <button class="lang-btn ${lang === "en" ? "active" : ""}" data-lang="en">EN</button>
      </div>
      <span class="header-date">${dateStr}</span>
      <button class="header-bell">${icon("bell")}${unresolved > 0 ? `<span class="header-bell-badge">${unresolved}</span>` : ""}</button>
    </div>`;

  document.getElementById("hamburgerBtn").addEventListener("click", () => document.body.classList.toggle("sidebar-open"));
  document.getElementById("sidebarOverlay").addEventListener("click", closeSidebar);
  document.querySelectorAll("[data-lang]").forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang)));
}

// ─── STAT CARD ──────────────────────────────────────────────
function statCard(label, value, iconName, iconBg, iconClr, opts = {}) {
  const { subtitle, trendDir, trendLabel } = opts;
  let trend = "";
  if (trendDir) {
    const cls = trendDir === "up" ? "trend-up" : "trend-down";
    trend = `<div class="stat-card-trend ${cls}">${icon(trendDir === "up" ? "trending-up" : "trending-down")}<span class="font-medium">${trendLabel}</span></div>`;
  }
  return `<div class="stat-card"><div class="stat-card-top"><div><p class="stat-card-label">${label}</p><p class="stat-card-value">${value}</p>${subtitle ? `<p class="stat-card-subtitle">${subtitle}</p>` : ""}</div><div class="stat-card-icon" style="background:${iconBg};color:${iconClr}">${icon(iconName)}</div></div>${trend}</div>`;
}

// ─── PAGE: OVERBLIK ─────────────────────────────────────────
function renderOverblik() {
  const s = getStats();
  let html = `<div class="page"><div class="page-title"><h1>${t("dash_title")}</h1><p>${t("dash_desc")}</p></div>`;
  html += `<div class="grid grid-6 mb-24">`;
  html += statCard(t("active_robots"), `${s.activeRobots} / ${s.totalRobots}`, "bot", "var(--light)", "var(--blue)", { trendDir: "up", trendLabel: `+3 ${t("since_yesterday")}` });
  html += statCard(t("active_zones"), s.activeZones, "map-pin", "var(--light)", "var(--blue)", { subtitle: `${s.totalZones} ${t("total")}` });
  html += statCard(t("events_today"), s.todayEvents, "triangle-alert", "#fffbeb", "#d97706", { subtitle: `${s.unresolvedEvents} ${t("unresolved")}`, trendDir: "down", trendLabel: `-40% ${t("vs_last_week")}` });
  html += statCard(t("deliveries_today"), s.deliveriesToday, "package", "var(--light)", "var(--blue)", { trendDir: "up", trendLabel: `+12% ${t("vs_yesterday")}` });
  html += statCard(t("avg_delivery"), `${s.avgDeliveryMinutes} ${t("min")}`, "clock", "var(--light)", "var(--blue)", { trendDir: "down", trendLabel: `-2 ${t("min")}` });
  html += statCard(t("co2_saved"), "2,4 ton", "zap", "#ecfdf5", "#059669", { subtitle: t("this_month"), trendDir: "up", trendLabel: "+12%" });
  html += `</div>`;

  html += `<div class="section-grid mb-24">
    <div class="card"><h2 class="card-title">${t("robot_status_dist")}</h2><div class="chart-container"><canvas id="fleetPieChart"></canvas></div></div>
    <div class="card"><h2 class="card-title">${t("activity_7d")}</h2><div class="chart-container"><canvas id="activityChart"></canvas></div></div>
  </div>`;

  html += `<div class="section-grid">`;
  html += `<div class="card"><h2 class="card-title">${t("operator_status")}</h2>`;
  operators.forEach(op => {
    html += `<div class="operator-list-item"><div class="operator-list-left"><div class="operator-list-dot" style="background:${FLEET_COLORS[op.id]}"></div><div><p class="operator-list-name">${op.name}</p><p class="operator-list-sub">${op.activeRobots} / ${op.robotCount} ${t("active")}</p></div></div>${badge(op.connectionStatus, connLabel(op.connectionStatus))}</div>`;
  });
  html += `</div>`;

  const recent = [...events].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 8);
  html += `<div class="card"><h2 class="card-title">${t("recent_events")}</h2><div class="table-wrap"><table class="data-table"><thead><tr><th>${t("timestamp")}</th><th>${t("severity")}</th><th>${t("type")}</th><th>${t("description")}</th><th>${t("status")}</th></tr></thead><tbody>`;
  recent.forEach(evt => {
    html += `<tr><td class="nowrap text-xs text-slate-500">${fmtDateTime(evt.timestamp)}</td><td>${badge(evt.severity, sevLabel(evt.severity))}</td><td class="nowrap text-xs text-slate-600">${evtLabel(evt.type)}</td><td class="text-xs text-slate-600 max-w-sm">${evtMsg(evt)}</td><td>${badge(evt.resolved ? "active" : "error", evt.resolved ? t("resolved") : t("open"))}</td></tr>`;
  });
  html += `</tbody></table></div></div></div></div>`;

  document.getElementById("content").innerHTML = html;
  lucide.createIcons();

  const statusMap = { active: t("status_active"), idle: t("status_idle"), charging: t("status_charging"), error: t("status_error"), offline: t("status_offline") };
  const statusClr = {}; statusClr[t("status_active")] = "#22C55E"; statusClr[t("status_idle")] = "#F59E0B"; statusClr[t("status_charging")] = "#3B82F6"; statusClr[t("status_error")] = "#EF4444"; statusClr[t("status_offline")] = "#6B7280";
  const counts = {}; robots.forEach(r => { const l = statusMap[r.status]; counts[l] = (counts[l] || 0) + 1; });
  chartInstances.push(new Chart(document.getElementById("fleetPieChart"), { type:"doughnut", data:{ labels:Object.keys(counts), datasets:[{data:Object.values(counts), backgroundColor:Object.keys(counts).map(l=>statusClr[l]), borderWidth:0}] }, options:{cutout:"60%",plugins:{legend:{position:"bottom",labels:{usePointStyle:true,pointStyle:"circle",padding:16,font:{size:12}}}},responsive:true,maintainAspectRatio:false} }));

  const last7 = dailyStats.slice(-7);
  chartInstances.push(new Chart(document.getElementById("activityChart"), { type:"line", data:{ labels:last7.map(d=>fmtWeekday(d.date)), datasets:[ {label:t("deliveries"),data:last7.map(d=>d.totalTrips),borderColor:"#3661d8",backgroundColor:"rgba(54,97,216,.15)",fill:true,tension:.3,pointRadius:0,borderWidth:2}, {label:t("active_robots_chart"),data:last7.map(d=>d.activeRobots),borderColor:"#10B981",backgroundColor:"transparent",fill:false,tension:.3,pointRadius:0,borderWidth:2} ] }, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{usePointStyle:true,pointStyle:"circle",font:{size:12}}}},scales:{x:{grid:{display:false},ticks:{font:{size:12},color:"#94a3b8"}},y:{grid:{color:"#f1f5f9"},ticks:{font:{size:12},color:"#94a3b8"}}}} }));
}

// ─── PAGE: LIVEKORT ─────────────────────────────────────────
function renderKort() {
  const s = getStats();
  let html = `<div class="map-page"><div id="map"></div>
    <div class="map-kpi-bar">
      <div class="map-kpi-item"><span style="color:#22c55e">${icon("bot")}</span><div><p class="map-kpi-label">${t("active_robots")}</p><p class="map-kpi-value">${s.activeRobots} / ${s.totalRobots}</p></div></div>
      <div class="map-kpi-item"><span style="color:#3b82f6">${icon("map-pin")}</span><div><p class="map-kpi-label">${t("active_zones")}</p><p class="map-kpi-value">${s.activeZones}</p></div></div>
      <div class="map-kpi-item"><span style="color:#f59e0b">${icon("triangle-alert")}</span><div><p class="map-kpi-label">${t("events_today")}</p><p class="map-kpi-value">${s.todayEvents}</p></div></div>
      <div class="map-kpi-item"><span style="color:#8b5cf6">${icon("package")}</span><div><p class="map-kpi-label">${t("deliveries_today")}</p><p class="map-kpi-value">${s.deliveriesToday}</p></div></div>
    </div>
    <div class="map-legend"><p class="map-legend-title">${t("zone_types")}</p>${Object.keys(ZONE_COLORS).map(k=>`<div class="map-legend-item"><div class="map-legend-swatch" style="background:${ZONE_COLORS[k].fill};border:1px solid ${ZONE_COLORS[k].stroke};opacity:.6"></div>${zoneTypeLabel(k)}</div>`).join("")}</div>
  </div>`;
  document.getElementById("content").innerHTML = html;
  lucide.createIcons();

  mapInstance = L.map("map").setView(MAP_CENTER, MAP_ZOOM);
  L.tileLayer(TILE_URL, { attribution: TILE_ATTR }).addTo(mapInstance);

  zones.forEach(zone => { const c = ZONE_COLORS[zone.type]; L.polygon(zone.polygon, { color:c.stroke, fillColor:c.fill, fillOpacity:zone.status==="active"?.2:.1, weight:2, dashArray:zone.status==="scheduled"?"8 4":null }).addTo(mapInstance).bindTooltip(zone.name).bindPopup(`<div class="popup-title">${zone.name}</div><div class="popup-subtitle">${zoneTypeLabel(zone.type)}</div><div class="popup-row"><span class="popup-row-label">${t("speed")}:</span> ${zone.speedLimit ? t("max_speed")+" "+zone.speedLimit+" "+t("kmh") : t("no_access")}</div><div class="popup-row"><span class="popup-row-label">${t("robots")}:</span> ${zone.currentRobots} / ${zone.maxRobots}</div>`); });

  routes.filter(r=>r.status==="active").forEach(route => { L.polyline(route.path,{color:FLEET_COLORS[route.operatorId]||"#94a3b8",weight:3,opacity:.5}).addTo(mapInstance).bindTooltip(`${route.origin} \u2192 ${route.destination}`,{sticky:true}); });

  robotPositions = {}; robots.forEach(r => { robotPositions[r.id] = {lat:r.position.lat,lng:r.position.lng}; });
  const progress = {}; robots.forEach(r => { progress[r.id] = Math.random(); });
  const routeMap = {}; routes.forEach(r => { routeMap[r.id] = r; });

  function addMarkers() {
    mapMarkers.forEach(m=>mapInstance.removeLayer(m)); mapMarkers = [];
    robots.forEach(robot => {
      const pos = robotPositions[robot.id]; const color = FLEET_COLORS[robot.operatorId]||"#94a3b8"; const isErr = robot.status==="error"; const isOff = robot.status==="offline"; const op = getOperator(robot.operatorId);
      const marker = L.circleMarker([pos.lat,pos.lng],{radius:(isErr||isOff)?5:7,fillColor:isOff?"#6B7280":color,color:isErr?"#EF4444":(isOff?"#6B7280":color),fillOpacity:isOff?.4:.9,weight:isErr?3:2}).addTo(mapInstance);
      marker.bindTooltip(robot.id,{direction:"top"});
      const batClr = robot.batteryLevel>20?"#22C55E":"#EF4444";
      marker.bindPopup(`<div style="min-width:220px"><div style="display:flex;justify-content:space-between;align-items:center"><span class="popup-title">${robot.name}</span>${badge(robot.status,statusLabel(robot.status))}</div><div class="popup-subtitle">${op?.name||t("unknown_operator")} \u00b7 ${robot.model}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;font-size:12px"><div><span class="popup-row-label">${t("battery")}</span><div style="margin-top:4px"><span class="popup-battery-bar"><span class="popup-battery-fill" style="width:${robot.batteryLevel}%;background:${batClr}"></span></span><b>${robot.batteryLevel}%</b></div></div><div><span class="popup-row-label">${t("speed")}</span><div style="margin-top:4px"><b>${robot.speed} ${t("kmh")}</b></div></div></div></div>`);
      mapMarkers.push(marker);
    });
  }
  addMarkers();

  function interpolate(path,p){if(path.length<2)return path[0];let total=0;const segs=[];for(let i=0;i<path.length-1;i++){const dx=path[i+1][0]-path[i][0],dy=path[i+1][1]-path[i][1];segs.push(Math.sqrt(dx*dx+dy*dy));total+=segs[i];}const target=p*total;let acc=0;for(let i=0;i<segs.length;i++){if(acc+segs[i]>=target){const sp=(target-acc)/segs[i];return[path[i][0]+(path[i+1][0]-path[i][0])*sp,path[i][1]+(path[i+1][1]-path[i][1])*sp];}acc+=segs[i];}return path[path.length-1];}

  robotSimInterval = setInterval(()=>{let changed=false;robots.forEach(robot=>{if(robot.status!=="active"||!robot.currentRouteId)return;const route=routeMap[robot.currentRouteId];if(!route||route.path.length<2)return;let p=progress[robot.id]||0;p+=.004+Math.random()*.002;if(p>=1)p-=1;progress[robot.id]=p;const[lat,lng]=interpolate(route.path,p);robotPositions[robot.id]={lat,lng};changed=true;});if(changed)mapMarkers.forEach((m,i)=>{const pos=robotPositions[robots[i].id];m.setLatLng([pos.lat,pos.lng]);});},800);
}

// ─── PAGE: FL\u00c5DEOVERSIGT ───────────────────────────────────
function renderFlaader() {
  const onC = operators.filter(o=>o.connectionStatus==="online").length;
  const offC = operators.filter(o=>o.connectionStatus==="offline").length;
  let html = `<div class="page"><div class="page-title"><h1>${t("fleet_title")}</h1><p>${t("fleet_desc")}</p></div>`;
  html += `<div class="grid grid-3 mb-24"><div class="card text-center"><p class="stat-card-value">${operators.length}</p><p class="text-sm text-slate-500">${t("operators_label")}</p></div><div class="card text-center"><p class="stat-card-value" style="color:#059669">${onC}</p><p class="text-sm text-slate-500">${t("online")}</p></div><div class="card text-center"><p class="stat-card-value" style="color:#dc2626">${offC}</p><p class="text-sm text-slate-500">${t("offline")}</p></div></div>`;
  html += `<div class="space-y-16">`;
  operators.forEach(op=>{
    const opR = getRobotsByOperator(op.id); const connIco = op.connectionStatus==="online"?"wifi":op.connectionStatus==="degraded"?"signal":"wifi-off";
    html += `<div class="card"><div class="operator-card-header"><div class="operator-card-left"><div class="operator-color-dot" style="background:${FLEET_COLORS[op.id]}"></div><div><p class="operator-card-name">${op.name}</p><p class="operator-card-area">${op.coverageArea.join(", ")}</p></div></div><div class="operator-card-right">${badge(op.connectionStatus,connLabel(op.connectionStatus))} ${icon(connIco)}</div></div>`;
    html += `<div class="operator-stats"><div><p class="operator-stat-label">${t("robots")}</p><p class="operator-stat-value">${op.activeRobots} / ${op.robotCount}</p></div><div><p class="operator-stat-label">${t("api_status")}</p>${badge(op.apiHealth.status,apiLabel(op.apiHealth.status))}</div><div><p class="operator-stat-label">${t("latency")}</p><p class="operator-stat-value">${op.apiHealth.latencyMs>0?op.apiHealth.latencyMs+" ms":"\u2014"}</p></div><div><p class="operator-stat-label">${t("uptime")}</p><p class="operator-stat-value">${fmtPct(op.apiHealth.uptime)}</p></div><div><p class="operator-stat-label">${t("contact")}</p><p class="text-sm text-slate-600">${op.contactEmail}</p></div></div>`;
    html += `<div class="robot-chips"><p class="robot-chips-label">${t("robots")}</p><div class="robot-chips-wrap">${opR.map(r=>`<div class="robot-chip"><span class="robot-chip-id">${r.id}</span> ${badge(r.status,statusLabel(r.status))} <span class="robot-chip-battery">${r.batteryLevel}%</span></div>`).join("")}</div></div></div>`;
  });
  html += `</div></div>`;
  document.getElementById("content").innerHTML = html; lucide.createIcons();
}

// ─── PAGE: ZONER ────────────────────────────────────────────
function renderZoner() {
  const aCount=zones.filter(z=>z.status==="active").length, sCount=zones.filter(z=>z.status==="scheduled").length, rCount=zones.filter(z=>z.type==="restricted").length;
  const zIcons={pedestrian:"map-pin",restricted:"shield",delivery:"truck",construction:"construction"};
  let html=`<div class="page"><div class="page-title"><h1>${t("zones_title")}</h1><p>${t("zones_desc")}</p></div>`;
  html+=`<div class="grid grid-4 mb-24"><div class="card text-center"><p class="stat-card-value">${zones.length}</p><p class="text-sm text-slate-500">${t("zones_total")}</p></div><div class="card text-center"><p class="stat-card-value" style="color:#059669">${aCount}</p><p class="text-sm text-slate-500">${t("zones_active")}</p></div><div class="card text-center"><p class="stat-card-value" style="color:#2563eb">${sCount}</p><p class="text-sm text-slate-500">${t("zones_scheduled")}</p></div><div class="card text-center"><p class="stat-card-value" style="color:#94a3b8">${rCount}</p><p class="text-sm text-slate-500">${t("zones_restricted")}</p></div></div>`;
  html+=`<div class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>${t("zone_col")}</th><th>${t("type")}</th><th>${t("status")}</th><th>${t("speed")}</th><th>${t("robots")}</th><th>${t("active_hours")}</th><th>${t("last_modified")}</th></tr></thead><tbody>`;
  zones.forEach(z=>{const c=ZONE_COLORS[z.type];html+=`<tr><td><div class="zone-name-wrap"><div class="zone-icon-wrap" style="background:${c.fill}20"><span style="color:${c.stroke}">${icon(zIcons[z.type]||"map-pin")}</span></div><div><p class="zone-name">${z.name}</p><p class="zone-desc">${z.description}</p></div></div></td><td><span class="zone-type-badge" style="background:${c.fill}15;color:${c.stroke}">${zoneTypeLabel(z.type)}</span></td><td>${badge(z.status,zoneStatusLabel(z.status))}</td><td><div class="zone-speed">${icon("gauge")} ${z.speedLimit?t("max_speed")+" "+z.speedLimit+" "+t("kmh"):t("no_access")}</div></td><td class="text-sm text-slate-700">${z.currentRobots} / ${z.maxRobots}</td><td class="text-sm text-slate-600">${z.activeHours}</td><td class="text-sm text-slate-500">${fmtDate(z.lastModified)}</td></tr>`;});
  html+=`</tbody></table></div></div></div>`;
  document.getElementById("content").innerHTML=html; lucide.createIcons();
}

// ─── PAGE: H\u00c6NDELSER ──────────────────────────────────────
function renderHaendelser(activeFilter="all") {
  const sorted=[...events].sort((a,b)=>b.timestamp.localeCompare(a.timestamp));
  const filtered=activeFilter==="all"?sorted:sorted.filter(e=>e.severity===activeFilter);
  const tabs=[{key:"all",label:t("all"),count:events.length},{key:"critical",label:t("sev_critical"),count:events.filter(e=>e.severity==="critical").length},{key:"warning",label:t("sev_warning"),count:events.filter(e=>e.severity==="warning").length},{key:"info",label:t("sev_info"),count:events.filter(e=>e.severity==="info").length}];
  let html=`<div class="page"><div class="page-title"><h1>${t("events_title")}</h1><p>${t("events_desc")}</p></div>`;
  html+=`<div class="grid grid-3 mb-24">${statCard(t("critical_events"),events.filter(e=>e.severity==="critical").length,"shield-alert","#fee2e2","#dc2626")}${statCard(t("unresolved_events"),events.filter(e=>!e.resolved).length,"triangle-alert","#fef3c7","#d97706")}${statCard(t("resolved_events"),events.filter(e=>e.resolved).length,"circle-check","#d1fae5","#059669")}</div>`;
  html+=`<div class="filter-tabs mb-24">${tabs.map(tab=>`<button class="filter-tab ${tab.key===activeFilter?"filter-tab-active":"filter-tab-inactive"}" data-filter="${tab.key}">${tab.label}<span class="tab-count">(${tab.count})</span></button>`).join("")}</div>`;
  html+=`<div class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>${t("timestamp")}</th><th>${t("severity")}</th><th>${t("type")}</th><th>${t("robot")}</th><th>${t("operator")}</th><th>${t("description")}</th><th>${t("status")}</th></tr></thead><tbody>`;
  filtered.forEach(evt=>{html+=`<tr><td class="nowrap text-xs text-slate-500">${fmtDateTime(evt.timestamp)}</td><td>${badge(evt.severity,sevLabel(evt.severity))}</td><td class="nowrap text-xs text-slate-600">${evtLabel(evt.type)}</td><td><span class="mono">${evt.robotId}</span></td><td class="text-xs text-slate-600">${evt.operatorName}</td><td class="text-xs text-slate-600 max-w-sm">${evtMsg(evt)}</td><td>${badge(evt.resolved?"active":"error",evt.resolved?t("resolved"):t("open"))}</td></tr>`;});
  html+=`</tbody></table></div></div></div>`;
  document.getElementById("content").innerHTML=html; lucide.createIcons();
  document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>renderHaendelser(btn.dataset.filter)));
}

// ─── PAGE: ANALYSE ──────────────────────────────────────────
function renderAnalyse() {
  const totalTrips=dailyStats.reduce((s,d)=>s+d.totalTrips,0); const avgDel=Math.round(dailyStats.reduce((s,d)=>s+d.avgDeliveryMinutes,0)/dailyStats.length); const totalInc=dailyStats.reduce((s,d)=>s+d.incidents,0);
  let html=`<div class="page"><div class="page-title"><h1>${t("analyse_title")}</h1><p>${t("analyse_desc")}</p></div>`;
  html+=`<div class="grid grid-4 mb-24">${statCard(t("deliveries_30d"),fmtNum(totalTrips),"bot","var(--light)","var(--blue)",{trendDir:"up",trendLabel:"+18%"})}${statCard(t("avg_delivery"),`${avgDel} ${t("min")}`,"clock","#ecfeff","#0891b2",{trendDir:"down",trendLabel:`-3 ${t("min")}`})}${statCard(t("events_30d"),totalInc,"triangle-alert","#fef3c7","#d97706",{trendDir:"down",trendLabel:"-22%"})}${statCard(t("co2_month"),"2,4 ton","leaf","#d1fae5","#059669",{trendDir:"up",trendLabel:"+12%"})}</div>`;
  html+=`<div class="section-grid-equal mb-24"><div class="card"><h2 class="card-title">${t("activity_30d")}</h2><div class="chart-container" style="height:350px"><canvas id="activityLineChart"></canvas></div></div><div class="card"><h2 class="card-title">${t("operator_perf")}</h2><div class="chart-container" style="height:350px"><canvas id="perfBarChart"></canvas></div></div></div>`;
  html+=`<div class="section-grid"><div class="card"><h2 class="card-title">${t("sustainability")}</h2><div class="chart-container" style="height:250px"><canvas id="sustainChart"></canvas></div><div class="sustainability-stats"><div><p class="sustainability-stat-value emerald">${fmtNum(sustainabilityData.co2SavedKg)} kg</p><p class="sustainability-stat-label">${t("co2_saved_label")}</p></div><div><p class="sustainability-stat-value dark">${fmtNum(sustainabilityData.electricKmDriven)} km</p><p class="sustainability-stat-label">${t("electric_driving")}</p></div><div><p class="sustainability-stat-value blue">${fmtNum(sustainabilityData.carTripsReplaced)}</p><p class="sustainability-stat-label">${t("car_trips_replaced")}</p></div></div></div>`;
  html+=`<div class="card"><h2 class="card-title">${t("popular_routes")}</h2><div class="table-wrap"><table class="data-table"><thead><tr><th>#</th><th>${t("from")}</th><th>${t("to")}</th><th class="text-right">${t("count")}</th><th class="text-right">${t("avg_time")}</th></tr></thead><tbody>${topRoutes.map((r,i)=>`<tr><td class="rank-num">${i+1}</td><td class="text-sm text-slate-700">${r.from}</td><td class="text-sm text-slate-700">${r.to}</td><td class="text-right font-semibold text-slate-900">${fmtNum(r.count)}</td><td class="text-right text-sm text-slate-600">${r.avgTimeMinutes} ${t("min")}</td></tr>`).join("")}</tbody></table></div></div></div></div>`;
  document.getElementById("content").innerHTML=html; lucide.createIcons();

  chartInstances.push(new Chart(document.getElementById("activityLineChart"),{type:"line",data:{labels:dailyStats.map(d=>fmtShortDate(d.date)),datasets:[{label:t("deliveries"),data:dailyStats.map(d=>d.totalTrips),borderColor:"#3661d8",borderWidth:2,pointRadius:0,tension:.3},{label:t("active_robots_chart"),data:dailyStats.map(d=>d.activeRobots),borderColor:"#10B981",borderWidth:2,pointRadius:0,tension:.3},{label:t("incidents_chart"),data:dailyStats.map(d=>d.incidents),borderColor:"#EF4444",borderWidth:2,pointRadius:0,tension:.3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{usePointStyle:true,pointStyle:"circle",font:{size:12}}}},scales:{x:{grid:{display:false},ticks:{font:{size:11},color:"#94a3b8",maxTicksLimit:10}},y:{grid:{color:"#f1f5f9"},ticks:{font:{size:11},color:"#94a3b8"}}}}}));

  const pData=operatorStats.map(os=>({name:os.operatorName.split(" ")[0],lev:os.trips,hae:os.incidents}));
  chartInstances.push(new Chart(document.getElementById("perfBarChart"),{type:"bar",data:{labels:pData.map(d=>d.name),datasets:[{label:t("deliveries_30d_chart"),data:pData.map(d=>d.lev),backgroundColor:"#3661d8",borderRadius:4},{label:t("events_30d_chart"),data:pData.map(d=>d.hae),backgroundColor:"#EF4444",borderRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{usePointStyle:true,pointStyle:"circle",font:{size:12}}}},scales:{x:{grid:{display:false},ticks:{font:{size:11},color:"#94a3b8"}},y:{grid:{color:"#f1f5f9"},ticks:{font:{size:11},color:"#94a3b8"}}}}}));

  chartInstances.push(new Chart(document.getElementById("sustainChart"),{type:"doughnut",data:{labels:[t("co2_saved_label"),"Traditionel CO\u2082"],datasets:[{data:[sustainabilityData.co2SavedKg,sustainabilityData.traditionalCo2Kg-sustainabilityData.co2SavedKg],backgroundColor:["#22C55E","#e2e8f0"],borderWidth:0}]},options:{cutout:"65%",responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}}));
}

// ─── PAGE: OPERAT\u00d8RPORTAL ──────────────────────────────────
function renderOperator() {
  const op=operators[0], stats=operatorStats[0];
  let html=`<div class="page">`;
  html+=`<div class="operator-banner mb-24"><div class="operator-banner-top"><div class="operator-banner-left"><div class="operator-banner-icon">${icon("bot")}</div><div><h1>${op.name}</h1><p class="subtitle">${t("op_portal_subtitle")}</p></div></div><div class="operator-banner-stats"><div class="operator-banner-stat"><p class="stat-label">${t("compliance_score")}</p><p class="stat-value">${fmtPct(stats.complianceScore)}</p></div><div class="operator-banner-stat"><p class="stat-label">${t("connection")}</p><div style="margin-top:4px;display:flex;align-items:center;gap:8px"><span style="color:#6ee7b7">${icon("wifi")}</span>${badge("online",t("conn_online"))}</div></div><div class="operator-banner-stat"><p class="stat-label">${t("robots")}</p><p class="stat-value-sm">${op.activeRobots} <span class="stat-inline">/ ${op.robotCount} ${t("active")}</span></p></div><div class="operator-banner-stat"><p class="stat-label">API</p><p class="stat-small">${op.apiHealth.latencyMs} ms \u00b7 ${fmtPct(op.apiHealth.uptime)} ${t("uptime").toLowerCase()}</p></div></div></div></div>`;

  html+=`<div class="grid grid-5 mb-24">${statCard(t("compliance_score"),fmtPct(stats.complianceScore),"shield-check","#ccfbf1","#0d9488",{trendDir:"up",trendLabel:`+1,2% ${t("this_week")}`})}${statCard(t("deliveries_30d_op"),fmtNum(stats.trips),"package","#ccfbf1","#0d9488",{trendDir:"up",trendLabel:"+18%"})}${statCard(t("avg_delivery"),`${stats.avgDeliveryMinutes} ${t("min")}`,"clock","#ecfeff","#0891b2",{trendDir:"down",trendLabel:`-3 ${t("min")}`})}${statCard(t("delay_saved"),"42 " + t("min"),"trending-down","#d1fae5","#059669",{trendDir:"down",trendLabel:t("vs_without")})}${statCard(t("manual_interventions"),"3","hand","#ede9fe","#7c3aed",{subtitle:t("today"),trendDir:"down",trendLabel:`-60% ${t("this_month_trend")}`})}</div>`;

  html+=`<div class="section-grid-3-2 mb-24"><div class="card" id="feedContainer"></div><div class="card">`;
  html+=`<div><h3 class="card-title">${t("compliance_score")}</h3><div class="compliance-gauge"><canvas id="complianceGauge"></canvas><div class="compliance-gauge-label"><p class="score">${fmtPct(stats.complianceScore)}</p><p class="score-label">${t("score")}</p></div></div></div>`;
  html+=`<div style="margin-top:24px"><h3 class="card-title">${t("active_rules")}</h3>${operatorRules.map(rule=>`<div class="rule-item">${rule.compliant?`<span style="color:#14b8a6">${icon("circle-check")}</span>`:`<span style="color:#f59e0b">${icon("circle-alert")}</span>`}<div><p class="rule-text">${loc(rule.rule)}</p><p class="rule-zone">${rule.zone}</p></div></div>`).join("")}</div>`;

  const myEvts=events.filter(e=>e.operatorName==="NordBots ApS").sort((a,b)=>b.timestamp.localeCompare(a.timestamp)).slice(0,5);
  html+=`<div style="margin-top:24px"><h3 class="card-title">${t("recent_events_op")}</h3>${myEvts.map(evt=>`<div class="violation-item"><div class="violation-left">${badge(evt.severity,sevLabel(evt.severity))}<div><p class="violation-type">${evtLabel(evt.type)}</p><p class="violation-meta">${evt.robotId} \u00b7 ${fmtDateTime(evt.timestamp)}</p></div></div>${badge(evt.resolved?"active":"error",evt.resolved?t("resolved"):t("open"))}</div>`).join("")}</div></div></div>`;

  const totalSaved=optimizedRoutes.reduce((s,r)=>s+r.savingMin,0), avgSaved=Math.round(totalSaved/optimizedRoutes.length);
  html+=`<div class="section-grid-equal"><div class="card"><h2 class="card-title">${t("route_optimization")}</h2><div class="opt-banner">${icon("trending-down")}<div class="opt-banner-text"><p>${t("total_saved_today")}: ${totalSaved} ${t("min")}</p><p>${t("avg_saved_per_route").replace("{n}",avgSaved)}</p></div></div>`;
  html+=`<div class="table-wrap"><table class="data-table"><thead><tr><th>${t("robot")}</th><th>${t("route_col")}</th><th class="text-right">${t("original")}</th><th class="text-right">${t("optimized")}</th><th class="text-right">${t("saved")}</th><th>${t("avoided")}</th></tr></thead><tbody>${optimizedRoutes.map(r=>`<tr><td><span class="mono">${r.robotId}</span></td><td class="text-xs text-slate-700">${r.origin} ${icon("arrow-right")} ${r.destination}</td><td class="text-right text-xs text-slate-500">${r.originalTimeMin} ${t("min")}</td><td class="text-right text-xs font-semibold" style="color:#0f766e">${r.optimizedTimeMin} ${t("min")}</td><td class="text-right"><span class="opt-saving-badge">-${r.savingMin} ${t("min")}</span></td><td><div class="opt-avoided">${r.avoidedConditions.map(c=>`<span>${c}</span>`).join("")}</div></td></tr>`).join("")}</tbody></table></div></div>`;

  html+=`<div class="card"><h2 class="card-title">${t("efficiency_14d")}</h2><p class="text-xs text-slate-400 mb-12">${t("efficiency_desc")}</p><div class="chart-container" style="height:320px"><canvas id="efficiencyChart"></canvas></div></div></div></div>`;

  document.getElementById("content").innerHTML=html;
  renderCityConditions();
  lucide.createIcons();

  chartInstances.push(new Chart(document.getElementById("complianceGauge"),{type:"doughnut",data:{datasets:[{data:[stats.complianceScore,100-stats.complianceScore],backgroundColor:["#0D9488","#e2e8f0"],borderWidth:0}]},options:{cutout:"68%",rotation:-90,circumference:360,responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{enabled:false}}}}));

  const effData=operatorDailyEfficiency;
  chartInstances.push(new Chart(document.getElementById("efficiencyChart"),{type:"line",data:{labels:effData.map(d=>fmtShortDate(d.date)),datasets:[{label:t("without_opt"),data:effData.map(d=>d.avgTimeMin),borderColor:"#94a3b8",borderWidth:2,borderDash:[6,3],pointRadius:0,tension:.3,backgroundColor:"rgba(13,148,136,.08)",fill:true},{label:t("with_opt"),data:effData.map(d=>d.optimizedTimeMin),borderColor:"#0D9488",borderWidth:2.5,pointRadius:0,tension:.3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{usePointStyle:true,pointStyle:"circle",font:{size:12}}}},scales:{x:{grid:{display:false},ticks:{font:{size:11},color:"#94a3b8"}},y:{min:0,max:30,grid:{color:"#f1f5f9"},ticks:{font:{size:11},color:"#94a3b8"},title:{display:true,text:t("min"),font:{size:10},color:"#94a3b8"}}}}}));
}

function renderCityConditions() {
  const typeIcons={restriction:"shield-off",roadwork:"construction",event:"calendar-days",crossing:"crosshair",weather:"cloud-rain",temporary_zone:"map-pin"};
  const pulseMap={critical:"pulse-red",warning:"pulse-amber",info:"pulse-teal"};
  function timeAgo(ts){const now=new Date("2026-04-20T10:00:00Z"),then=new Date(ts),min=Math.floor((now-then)/60000),hrs=Math.floor(min/60),days=Math.floor(hrs/24);if(days>0)return`${days} ${t("days_ago")}`;if(hrs>0)return`${hrs} ${t("hours_ago")}`;if(min>0)return`${min} ${t("min_ago")}`;return t("right_now");}

  const sorted=[...conditionsState].sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
  const unackCount=sorted.filter(c=>!c.acknowledged).length;
  let html=`<div class="feed-header"><div class="feed-header-left"><h3>${t("city_conditions")}</h3>${unackCount>0?`<span class="feed-count-badge">${unackCount}</span>`:""}</div><span class="text-xs text-slate-400">${sorted.length} ${t("updates")}</span></div><div class="feed-items">`;

  sorted.forEach(c=>{const ico=typeIcons[c.type]||"map-pin";const validRange=c.validTo?`<p class="feed-item-valid">${t("valid")}: ${fmtShortDate(c.validFrom)} \u2014 ${fmtShortDate(c.validTo)}</p>`:"";
    html+=`<div class="feed-item severity-${c.severity} ${c.acknowledged?"acknowledged":""}"><div class="feed-item-top"><div class="feed-item-body"><div class="feed-item-icon">${icon(ico)}</div><div style="flex:1"><div class="feed-item-title"><h4>${loc(c.title)}</h4>${!c.acknowledged?`<span class="feed-item-pulse ${pulseMap[c.severity]}"></span>`:""}</div><div class="feed-item-meta"><span>${timeAgo(c.timestamp)}</span><span>\u00b7</span><span class="type-tag">${condTypeLabel(c.type)}</span><span>\u00b7</span><span>${c.location}</span></div><p class="feed-item-desc">${loc(c.description)}</p>${validRange}</div></div><button class="feed-item-btn ${c.acknowledged?"acked":"not-ack"}" data-condition-id="${c.id}">${c.acknowledged?`${icon("check")} ${t("acknowledged")}`:t("acknowledge")}</button></div></div>`;
  });
  html+=`</div>`;
  document.getElementById("feedContainer").innerHTML=html;
  lucide.createIcons();
  document.querySelectorAll("[data-condition-id]").forEach(btn=>btn.addEventListener("click",()=>{conditionsState=conditionsState.map(c=>c.id===btn.dataset.conditionId?{...c,acknowledged:!c.acknowledged}:c);renderCityConditions();}));
}

// ─── ROUTER ─────────────────────────────────────────────────
function route() {
  destroyCharts(); stopSimulation(); destroyMap();
  conditionsState = [...cityConditions];
  const hash = location.hash || "#overblik";
  renderSidebar(); renderHeader();
  switch (hash) {
    case "": case "#": case "#overblik": renderOverblik(); break;
    case "#kort": renderKort(); break;
    case "#flaader": renderFlaader(); break;
    case "#zoner": renderZoner(); break;
    case "#haendelser": renderHaendelser(); break;
    case "#analyse": renderAnalyse(); break;
    case "#operator": renderOperator(); break;
    default: renderOverblik();
  }
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);
