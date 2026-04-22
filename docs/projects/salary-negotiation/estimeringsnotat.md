---
protected: true
passwordHash: "92b0332dda228edf8ebd0208937b772f02625380fbb04a63d90b97662b183661"
passwordGroup: "salary-negotiation"
---

# Lønforhandlingssystem — Estimeringsnotat

**Dato:** 22. april 2026
**Projekt:** Lønforhandlingssystem for Aarhus Kommune
**Fase:** Pitch / Estimering

---

## Samlet estimat-overblik

| Kategori | Estimat | Bemærkninger |
|---|---|---|
| **Integrationer** | **365–495 t.** | Se detaljer nedenfor |
| OIDC Login | 50 t. | Integration med kommunens IdP |
| FK Organisation & datalimiter | 100 t. | Organisationsstruktur + rollebaseret dataafgrænsning |
| Integration til SD Løn | 120–200 t. | Forudsætter veldokumenteret API med hente- og skriveadgang |
| Integration til Digital Post (SF 1601) | 95–145 t. | Forudsætter at løsningen skal sende breve |
| | | |
| **UX/UI-design** | **120–180 t.** | Se detaljer nedenfor |
| | | |
| **Frontend-udvikling** | **250–400 t.** | Se detaljer nedenfor |
| | | |
| **Backend-udvikling** | **200–320 t.** | Se detaljer nedenfor |
| | | |
| **Test & QA** | **80–130 t.** | Automatiserede tests, manuel QA, UAT |
| | | |
| **Infrastruktur & drift** | **40–70 t.** | Miljøer, CI/CD, overvågning |
| | | |
| **GDPR & sikkerhed** | **30–50 t.** | Konsekvensanalyse, databehandleraftale, evt. pentest |
| | | |
| **Projektledelse & møder** | **100–160 t.** | Se detaljer nedenfor |
| | | |
| **Sum** | **1.185–1.805 t.** | |

---

## Estimatgrundlag — UX/UI-design (120–180 t.)

Pitch-prototypen dækker kerneflowet, men der skal designes flere views og tilstande fra bunden.

| Delopgave | Estimat |
|---|---|
| Designsystem/komponentbibliotek (typografi, farver, komponenter) | 20–30 t. |
| Personaleleder-dashboard (uddybning af pitch + edge cases) | 15–25 t. |
| HR-behandlingsvisning (uddybning af pitch) | 10–20 t. |
| Chef/godkendelsesvisning (uddybning af pitch) | 10–15 t. |
| Administration (omregningsfaktorer, brugerroller, afdelings-mapping) | 15–25 t. |
| Forhandlingsrunde-styring (opret, luk, årshistorik) | 10–15 t. |
| Rapportering/eksport (overblik på tværs af afdelinger) | 10–15 t. |
| Login, fejltilstande, tomme tilstande, notifikationer | 10–15 t. |
| Responsivt design / mobilvisning | 10–15 t. |
| Brugertest og design-iterationer (min. 2 runder) | 10–20 t. |

## Estimatgrundlag — Frontend-udvikling (250–400 t.)

Implementering af alle views inkl. realtids-budgetberegning, formvalidering, statusovergange og responsivt layout.

| Delopgave | Estimat |
|---|---|
| Projekt-setup, komponentbibliotek, routing, auth-flow | 30–40 t. |
| Personaleleder-dashboard (budget, tabel, historik, indstilling) | 60–90 t. |
| HR-behandlingsvisning (gennemgang, omregning, beløbsindtastning) | 40–60 t. |
| Chef/godkendelsesvisning (overblik, godkend/afvis, bulk-godkendelse) | 30–50 t. |
| Administration (omregningsfaktorer, roller, afdelinger) | 25–40 t. |
| Forhandlingsrunde-styring | 15–25 t. |
| Rapportering/eksport | 20–30 t. |
| Responsivt design og tilgængelighed | 15–25 t. |
| Fejlhåndtering, loading states, edge cases | 15–25 t. |

## Estimatgrundlag — Backend-udvikling (200–320 t.)

API, forretningslogik, datamodel, workflow-engine og audit trail.

| Delopgave | Estimat |
|---|---|
| Projekt-setup, arkitektur, database-design | 25–40 t. |
| Domænemodel (medarbejder, indstilling, budget, forhandlingsrunde) | 30–50 t. |
| Godkendelsesworkflow og statusovergange med validering | 30–50 t. |
| Budgetberegning og omregningslogik | 15–25 t. |
| Rollestyring og dataafgrænsning (hvem ser hvad) | 25–40 t. |
| Audit trail / historik | 15–25 t. |
| Rapportering og eksport-API | 15–25 t. |
| Administration (omregningsfaktorer, runder, konfiguration) | 15–25 t. |
| API-lag og validering | 30–40 t. |

## Estimatgrundlag — SD Løn (120–200 t.)

Forudsætter et veldokumenteret API (REST eller SOAP) med adgang til både læsning og skrivning.

| Delopgave | Estimat |
|---|---|
| Afdækning af API, datamodel-mapping, fejlhåndtering | 30–50 t. |
| Hente-integration (medarbejderliste, løn, overenskomst, tillæg) | 30–50 t. |
| Skrive-integration (tilbageskrivning af godkendte lønjusteringer) | 40–60 t. |
| Test mod testmiljø, edge cases, fejlscenarier | 20–40 t. |

## Estimatgrundlag — Digital Post / SF 1601 (95–145 t.)

Forudsætter afsendelse af standardbreve til medarbejder (og evt. leder) efter godkendt lønjustering, via KOMBIT's serviceplatform.

| Delopgave | Estimat |
|---|---|
| Afdækning af SF 1601, adgang via serviceplatform, certifikater | 20–30 t. |
| Brevskabeloner (design + implementering af mindst 2 skabeloner) | 20–30 t. |
| Integration til afsendelse + kvittering/logning | 40–60 t. |
| Test (inkl. testbreve i Digital Post testmiljø) | 15–25 t. |

## Estimatgrundlag — Projektledelse & møder (100–160 t.)

Timer fordelt over hele projektforløbet — ikke en enkelt persons opgave, men samlet tidsforbrug.

| Delopgave | Estimat |
|---|---|
| Projektledelse (planlægning, opfølgning, risikostyring) | 40–60 t. |
| Stakeholder-møder (forretning, SD Løn-team, KOMBIT, HR) | 25–40 t. |
| Interne udviklingsmøder (sprint planning, review, retro) | 20–30 t. |
| Demos og brugerinddragelse | 15–30 t. |

---

## Åbne spørgsmål der påvirker estimatet

1. **SD Løn API-modenhed** — Estimatet på 120–200 t. forudsætter god dokumentation og testmiljø. Hvis API'et er mangelfuldt eller filbaseret, kan integrationen blive væsentligt dyrere.

2. **Digital Post-ansvar** — Estimatet forudsætter at lønforhandlingsløsningen selv sender breve. Hvis SD Løn håndterer dette, bortfalder posten (95–145 t.).

3. **Procesvariation** — Er forhandlingsprocessen ens på tværs af alle forvaltninger, eller er der lokale variationer der kræver konfigurerbarhed?

4. **Flere forhandlingsrunder pr. år** — Skal systemet understøtte mere end én runde, og hvordan håndteres overlappende runder?

5. **Historisk data** — Skal eksisterende data (tidligere Excel-ark) migreres ind i systemet?

6. **Brevskabeloner** — Hvem udformer og vedligeholder brevskabeloner til medarbejder og leder?

7. **Samtidige brugere og performance** — Hvor mange personaleledere forhandler simultant i spidsperioder?

8. **Teknologivalg** — Rammeværk for frontend og backend er endnu ikke besluttet. Valget kan påvirke estimatet.

9. **Tilgængelighedskrav (WCAG)** — Kommunale systemer har typisk krav om WCAG 2.1 AA. Er dette et krav, og i givet fald er det indregnet i frontend-estimatet.

10. **Driftsmodel** — Hvem drifter løsningen efter go-live? Er der behov for overdragelse, dokumentation og supportaftale?

---

## Risici

| Risiko | Konsekvens |
|---|---|
| SD Løn API utilgængeligt eller mangelfuldt | Kan blokere kerneintegration; kræver evt. alternativ løsning |
| Uafklaret Digital Post-ansvar | Scope-udvidelse sent i projektet |
| GDPR-krav der opdages sent | Kan kræve arkitekturændringer |
| Procesforskelle mellem forvaltninger | Øget kompleksitet i forretningslogik |
| Afhængighed af FK Organisation oppetid | Fejlhåndtering og caching nødvendig |
| Scope creep under brugerinddragelse | Design- og frontend-estimat kan vokse hvis nye views/funktioner opdages |
| Utilstrækkelig stakeholder-tilgængelighed | Forsinkelser i afklaring af forretningskrav og godkendelser |
| Undervurderet kompleksitet i rollestyring | Dataafgrænsning på tværs af forvaltninger kan være mere kompleks end antaget |

---

## Forudsætninger

Estimatet bygger på følgende forudsætninger:

- SD Løn stiller et veldokumenteret API til rådighed med testmiljø
- Lønforhandlingsløsningen skal selv integrere til Digital Post (SF 1601)
- Der er adgang til KOMBIT's serviceplatform for FK Organisation
- Ét fælles workflow gælder på tværs af forvaltninger (ingen lokale variationer)
- Systemet skal håndtere én forhandlingsrunde pr. år
- Ingen migrering af historiske data fra Excel
- Kommunens eksisterende IdP understøtter OIDC
- Udviklingshold på 2–3 udviklere + 1 UX-designer (deltid)

Ændres disse forudsætninger, bør estimatet revideres.

---

## Anbefaling

Før projektet igangsættes, bør følgende afklares:

1. **Teknisk afklaring af SD Løn API** — book møde med SD Løn-teamet for at afklare API-adgang og modenhed
2. **Afklaring af Digital Post-ansvar** — hvem sender breve, og via hvilken kanal?
3. **GDPR-screening** — indled konsekvensanalyse tidligt så krav er kendte inden udvikling
4. **Stakeholder-alignment** — sikr at forretningsejere er enige om scope og prioritering inden udvikling starter
5. **Teknologivalg** — beslut rammeværk for frontend og backend inden estimatet detaljeres yderligere
