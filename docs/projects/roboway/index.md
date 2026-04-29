<small>**Project:** Roboway · **Status:** Prototype · **Date:** April 2026</small>

# Roboway — Robotflådestyring

**Digital platform til styring og overvågning af autonome robotflåder i Aarhus Kommune.**

---

## Baggrund

Aarhus Kommune undersøger muligheden for at integrere autonome leveringsrobotter i byens infrastruktur som en del af "Last Mile"-projektet. Når flere private operatører potentielt skal operere robotflåder i kommunen, opstår et behov for en central platform, der kan give kommunen overblik over og kontrol med robottrafikken — på tværs af operatører, zoner og byforhold.

Prototypen er udviklet som grundlag for et afprovnings- og læringsforløb, og fungerer som visuelt udgangspunkt for diskussion ved projektopstart.

## Formål

Prototypen skal besvare spørgsmålet: **Hvordan kan en central kommunal platform til robotflådestyring se ud og fungere i praksis?**

Konkret skal den:

- Vise hvordan kommunen kan få realtidsoverblik over samtlige robotflåder på tværs af operatører
- Demonstrere zonekontrol, hændelseshåndtering og compliance-overvågning
- Illustrere en operatørportal, hvor operatører modtager byforhold og optimerer ruter derefter
- Fungere som visuelt diskussionsgrundlag for interessenter ved projektopstart

## Hvad prototypen viser

Prototypen er en single-page application med syv sider, navigeret via en sidebar i venstre side. Hele brugerfladen understøtter dansk og engelsk via en sprogvælger (DA/EN) i headeren og er responsiv til mobilvisning.

### Overblik (Dashboard)

Forsiden viser seks KPI-kort øverst: aktive robotter (24/35), aktive zoner (6), hændelser i dag (10), leveringer i dag (147), gennemsnitlig leveringstid (18 min) og CO₂-besparelse (2,4 ton). Nedenunder vises et donut-diagram over robotstatus-fordeling (aktiv, inaktiv, oplader, fejl, offline) samt et linjediagram over aktivitet de seneste 7 dage. Nederst ses en operatørstatus-liste med forbindelsesstatus og en tabel over seneste hændelser.

### Livekort

Et interaktivt Leaflet-kort centreret over Aarhus viser alle 35 robotter som farvekodede cirkelmarkører (farve pr. operatør). Zoner er vist som farvede polygoner: orange (fodgænger), rød (begrænset), grøn (levering) og gul (vejarbejde). Aktive ruter tegnes som stiplede polylines. Robotter med aktive ruter animeres langs deres ruteforløb i realtid. Klik på en robot viser popup med navn, status, batteri (med progress-bar) og hastighed. Fire KPI-kort flyder øverst, og en signaturforklaring vises nederst til venstre.

### Flådeoversigt

Viser alle fem operatører som individuelle kort med forbindelsesstatus, API-sundhed (latenstid, oppetid), antal robotter og kontaktoplysninger. Under hver operatør vises robotchips med ID, status-badge og batteriniveau for hver enkelt robot.

### Zoneadministration

Fire opsummeringskort (zoner i alt, aktive, planlagte, begrænsede) efterfulgt af en detaljeret tabel over alle syv zoner med ikon, type-badge, status, hastighedsgrænse, robotkapacitet, aktive timer og seneste ændringsdato.

### Hændelser

Tre KPI-kort (kritiske, uløste, løste hændelser) og filterfaner (Alle/Kritisk/Advarsel/Info) over en fuld hændelsestabel med 15 hændelser. Tabellen viser tidspunkt, alvorlighed, type, robot-ID, operatør, beskrivelse og løst/åben-status.

### Analyse & Data

Fire KPI-kort for 30-dages perioden. Et linjediagram viser leveringer, aktive robotter og hændelser over tid. Et søjlediagram sammenligner operatørers leveringer og hændelser. Et donut-diagram visualiserer CO₂-besparelse, og tre nøgletal viser elektrisk kørsel, CO₂ sparet og erstattede bilture. En tabel viser de otte mest populære ruter med antal og gennemsnitstid.

### Operatørportal

Simulerer en operatørs visning (NordBots ApS) med et teal-farvet identitetsbanner med compliance-score, forbindelsesstatus, robotantal og API-sundhed. Fem KPI-kort viser compliance, leveringer, leveringstid, sparet forsinkelse og manuelle indgreb.

En "Byforhold — Live Feed" viser otte bykonditioner (restriktioner, vejarbejde, arrangementer, krydsninger, vejr, midlertidige zoner) med alvorlighedsindikator, tidspunkt, type-tag og kvitteringsknap. Kvitteringsfunktionen er interaktiv.

Et compliance-dashboard viser en gauge-chart med score, seks gældende regler (med overholdelsesindikator) og seneste hændelser for operatøren.

En ruteoptimerings-tabel viser seks aktive ruter med oprindelig vs. optimeret tid, besparelse og undgåede byforhold. Et linjediagram sammenligner leveringstid med og uden bydata-optimering over 14 dage.

---

## Krav

- Platformen skal give kommunen realtidsoverblik over alle robotflåder på tværs af operatører, herunder position, status og batteriniveau
- Et interaktivt kort skal visualisere robotpositioner, zoner og aktive ruter med løbende opdatering
- Kommunen skal kunne definere og administrere zoner med differentierede regler for hastighed, adgang og kapacitet
- Hændelser (hastighedsovertrædelser, zonebrud, nærved-sammenstød, forbindelsestab m.fl.) skal logges og kunne filtreres efter alvorlighed
- Operatører skal have en dedikeret portal med adgang til byforhold, compliance-status og ruteoptimering baseret på aktuelle bykonditioner
- Platformen skal understøtte compliance-overvågning, så kommunen kan følge operatørers overholdelse af gældende regler
- Analyse og nøgletal skal give indsigt i leveringsperformance, operatørsammenligning og bæredygtighedseffekt (CO₂-besparelse, erstattede bilture)

---

## Uafklarede spørgsmål

Prototypen er et visuelt diskussionsgrundlag — ikke en implementeringsklar løsning. Inden et reelt system kan bygges, skal en række afhængigheder, ubekendte og forudsætninger afklares. 

Punkterne nedenfor er tænkt som udgangspunkt for samtalen og er på ingen måde udtømmende.

### Robotterne og operatørerne

- **Robotternes kapabilitet er ukendt.** Prototypen antager realtidstelemetri (position, batteri, status, hastighed) og fjernkommandoer (stop, omdirigering). Hvilke robotter taler vi reelt om, og hvad kan de levere? Hvilke API'er, protokoller og opdateringsfrekvenser understøtter de?
- **Standard for operatørintegration findes ikke.** Skal kommunen definere en fælles snitflade (datamodel, autentifikation, fejlhåndtering), eller skal platformen oversætte fra hver enkelt operatørs format?
- **Kommandoveje og overstyring.** Kan kommunen reelt stoppe eller omdirigere en robot via platformen, eller går al kontrol gennem operatøren? Hvad er svartider og fallback ved forbindelsestab?
- **Sikkerhed og ansvar.** Hvem hæfter ved hændelser — operatøren, kommunen, robotproducenten? Hvilken rolle spiller platformens data ved efterforskning?

### Datagrundlag

- **Geodata og zoner.** Hvor kommer zonedefinitioner fra? Hvem opdaterer dem, og hvordan distribueres ændringer til operatørerne?
- **Byforhold (live feed).** Vejarbejde, arrangementer, vejr, midlertidige restriktioner — hvilke kilder leverer disse, og er datakvalitet og opdateringsfrekvens tilstrækkelig til ruteoptimering?
- **Compliance-regler.** Hvad er det juridiske grundlag for hastighedsgrænser, zonekrav m.v.? Hvem definerer reglerne, og hvordan håndhæves de teknisk?

---

## Interaktiv prototype

<a href="/research-projects/projects/roboway/mocks/index.html" class="mock-button" target="_blank">Åbn prototypen ↗</a>
