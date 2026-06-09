<small>**Project:** Fælles Skabelonløsning · **Status:** Estimat (oplæg)</small>

# Fælles Skabelonløsning — Estimeringsnotat

**Dato:** juni 2026
**Projekt:** Open source-alternativ til DynamicTemplate (DSG Scenarie 3)
**Fase:** Analyse / oplæg

::: warning Bemærkning
Notatet er bevidst holdt på et overordnet niveau. Det er et oplæg, ikke et tilbud — formålet er at give en størrelsesorden og efterlade manøvrerum i den videre proces. Estimaterne er grove og afhænger af de afklaringer, der er beskrevet i [hovednotatet](./). Scenarie 3 er, jf. DSG-indstillingen, det scenarie med størst usikkerhed.
:::

---

## Overordnet estimat

Estimatet er delt i faser, så projektet kan startes småt og udvides, efterhånden som koncept og behov afklares. Timetallene er **nedjusteret for udvikling med Claude Code** — se afsnittet [Claude Code-acceleration](#claude-code-acceleration) for antagelsen bag.

| Fase | Indhold | Estimat | Tidshorisont |
|---|---|---|---|
| **Fase 0 — Afklaring** | Lagringsmodel (DMS vs. git vs. andet), standard for skabelon-/fraseformat, governance-model, strategi for komplekse skabeloner, fagsystem-snitflader, juridisk afklaring af deling | 120–200 t. | 1–2 mdr. |
| **Fase 1 — POC** | Dokumentmotor: JSON → DOCX/PDF på 1–2 reelle Aarhus-skabeloner, simpel datamodel, simpel lagring, test af krav om komplekse skabeloner | 250–400 t. | 1,5–2,5 mdr. |
| **Fase 2 — MVP** | Skabelonregister (versionering, rettigheder, publicering), frasebibliotek, adminmodul-UI, web-editor-integration (OnlyOffice/Collabora), første fagsystem-integration | 700–1.100 t. | 4–6 mdr. |
| **Fase 3 — Fuld løsning** | Integrations-API til Cura/GetOrganized/Modulus Social, Word add-in + LibreOffice-extension, komplekse skabeloner/input-flows, migreringsværktøj (2.464 skabeloner + 10.000 fraser), OS2-udgivelse | 1.200–2.200 t. | Løbende |
| **Sum (fase 0–2)** | | **1.070–1.700 t.** | **ca. 6–10 mdr.** |
| **Sum (fase 0–3)** | | **2.270–3.900 t.** | **ca. 12–18 mdr.** |

### Anbefalet første skridt

**Fase 0 + Fase 1** leverer afklaring og en fungerende POC, der opfylder succeskriteriet: data flettet ind i reelle Aarhus-skabeloner med DOCX/PDF-output, og en afklaring af, om motoren kan bære kravet om komplekse skabeloner. Estimat **370–600 t.**, tidshorisont **ca. 3–4 måneder**.

Det giver et konkret beslutningsgrundlag for, om der skal investeres i fase 2 og 3 — uden at binde sig til hele løsningen på forhånd.

---

## Claude Code-acceleration

Udviklingsteamet anvender nu **Claude Code**, og estimaterne ovenfor er allerede nedjusteret for den produktivitetsgevinst. Gevinsten er konkret for netop dette projekt:

- **Analyse af de eksisterende skabeloner og fraser.** En `.docx` er reelt en zip med XML (OOXML). De 2.464 skabeloner og 10.000+ fraser kan derfor udtrækkes, kategoriseres og analyseres programmatisk — fx hvilke placeholders, kolofon-felter og makroer der faktisk bruges. Claude Code er stærkt til at skrive og iterere på den slags udtræks- og analysescripts.
- **Migreringsværktøjet (fase 3).** Konverteringsscripts fra eksisterende skabeloner til det åbne målformat er gentaget, mønsterbaseret arbejde — netop hvor Claude Code accelererer mest. Det er den tungeste post i fase 3, og den hvor gevinsten er størst.
- **Scaffolding.** Dokumentmotor, REST-API, datamodel og adminmodul-UI har genkendelige mønstre, der kan stilladseres hurtigt med god testdækning fra start.
- **Test og dokumentation.** Testdækning og teknisk dokumentation kan genereres og holdes ved lige løbende.

::: warning Hvor gevinsten ikke ligger
Claude Code accelererer **kode**, ikke **afklaring**. Fase 0 — governance, juridisk afklaring af deling af skabeloner/datagrundlag, fagsystem-snitflader og brugerdialog om den glidende overgang — drives af mennesker og er ikke nedjusteret. Det samme gælder verifikation af, at de migrerede skabeloner er korrekte: udtrækket kan automatiseres, men den faglige kvalitetskontrol kan ikke.
:::

---

## Drift og driftsomkostninger

En løsning af denne type er ikke et "byg og glem"-projekt. Den væsentligste langsigtede omkostning er **drift**, ikke selve udviklingen. Følgende skal afklares tidligt:

- **Hosting og ejerskab.** Hvem driver og betaler for platformen — et OS2/fælleskommunalt fællesskab, en værtskommune eller en central aktør? Driften skal have en fast ejer, ellers forfalder løsningen.
- **Løbende vedligehold.** Sikkerhedsopdateringer, afhængigheder, brugerstyring og support koster typisk **15–25 % af udviklingsestimatet pr. år**. For fase 0–2 svarer det groft til **160–425 t./år**.
- **Migrering som engangs-storopgave.** Udfasning af DynamicTemplate vil — uanset scenarie — involvere medarbejdere i stort set alle afdelinger. Selve det tekniske udtræk kan automatiseres, men den faglige gennemgang og godkendelse af 2.464 skabeloner og 10.000+ fraser er en betydelig, manuel opgave.
- **Governance og kvalitet.** Delte skabeloner og fraser skal kunne reviewes — fagligt ejerskab, rettigheder og korrekthed. Det kræver en proces og dermed tid, ikke kun teknik.
- **Projektledelse.** DSG-indstillingen forudsætter en dedikeret projektleder til implementering (ca. **1 årsværk**) for scenarie 2, 3 og 4. Det ligger ud over udviklingsestimatet ovenfor.

**Konklusion:** udviklingsomkostningen er en engangsinvestering; driften, governance og migreringen er løbende forpligtelser, der skal have et budget og en ejer fra dag ét.

---

## Forudsætninger og forbehold

- Estimaterne forudsætter genbrug af eksisterende ITKdev-fundament (auth, hosting-mønstre, design) og udvikling med Claude Code.
- De forudsætter, at en open source-dokumentmotor kan dække kravet om **komplekse skabeloner** (betingede felter, gentagelige sektioner, input-flows). Hvis ikke, vokser fase 1–3 markant — dette er den største enkeltstående usikkerhed og skal verificeres i POC'en.
- Lagrings- og versioneringsmodellen er uafklaret (git er uegnet til binære formater) og påvirker både fase 2 og driften.
- Fagsystem-integration (Cura, GetOrganized, Modulus Social) afhænger af systemernes API'er og af, om der overhovedet skal integreres eller bruges indbyggede løsninger — dette afklares i fase 0 og kan flytte væsentligt på fase 3.
- Migreringsvolumen (2.464 skabeloner + 10.000 fraser) er stor; estimatet antager, at en høj andel kan automatiseres, men den faglige verifikation kan ikke.
- Tallene er grove oplægs-estimater og skal kvalificeres i fase 0.
