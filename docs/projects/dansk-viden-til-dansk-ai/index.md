<small>**Project:** Dansk Viden til Dansk AI · **Status:** Prototype · **Date:** May 2026</small>

# Dansk Viden til Dansk AI

**Fælles offentlig service til indsamling, katalogisering og deling af danske publikationer — som grundlag for både videnformidling og træning af danske sprogmodeller.**

---

## Baggrund

Offentlige myndigheder i Danmark producerer hvert år store mængder viden i form af rapporter, analyser, vejledninger, strategier, evalueringer og faglige notater. Publikationerne ligger spredt på myndighedernes egne hjemmesider, bliver typisk kun markedsført kortvarigt og er sjældent samlet i et fælles overblik. De gøres kun i begrænset omfang tilgængelige som strukturerede data.

Samtidig vokser behovet for danske træningsdata. Hvis offentlige AI-løsninger skal fungere godt på dansk, skal modellerne trænes på dansk sprog, danske begreber og dansk forvaltningspraksis — på data hvor kvalitet, ophav og rettigheder er dokumenteret. I dag foregår en stor del af modeltræningen i lukkede miljøer hos private virksomheder, hvor datagrundlaget ofte er uklart og rettighederne vanskelige at gennemskue.

Offentlige publikationer er et oplagt udgangspunkt: de har høj kvalitet, tydelig afsender og stor relevans for dansk offentlig sektor.

## Formål

Prototypen skal undersøge spørgsmålet: **Hvordan kan en fælles offentlig tjeneste til indsamling og deling af publikationer se ud i praksis — med klare rettigheder og AI-assisteret metadata?**

Tjenesten skal understøtte to formål:

- **Et offentligt publikationskatalog** hvor borgere, medarbejdere, forskere og virksomheder kan finde, søge og læse offentlig viden på tværs af myndigheder
- **Et rettighedsclearet og dokumenteret datagrundlag** til træning, evaluering og finjustering af danske sprogmodeller — med tydelig ophav, licens og kvalitet

De to formål skal holdes adskilt teknisk og juridisk. Ikke alt, der kan vises i et publikationskatalog, bør automatisk bruges til AI-træning.

## Hvad prototypen viser

Prototypen er en single-page application med syv visninger. Den bruger `localStorage` som backend og simulerer AI-katalogisering med en kort spinner. Alle seed-publikationer indlæses fra `data/seed-publications.js`.

### Forsiden

Hero med søgefelt, kort introduktion til tjenesten og statistik over publikationer i kataloget (antal publikationer, myndigheder, dokumenttyper).

### Registrering og login

Simpel brugerflade hvor besøgende kan oprette en konto eller logge ind. Brugere gemmes i `localStorage`, og passwords obfuskeres med en triviel hash. Ingen reel auth — kun til demoformål.

### Upload

Tre-trins flow der demonstrerer hele rettigheds- og katalogiseringsforløbet:

1. **Filvalg** — publicisten vælger en fil
2. **AI-katalogisering** (simuleret med ~2 sek spinner) — systemet foreslår titel, resume, emneord, dokumenttype, fagområde, målgruppe og indikatorer på personoplysninger og tredjepartsindhold
3. **Gennemgang** — publicisten godkender eller justerer metadata og tager **aktiv stilling til rettighedsniveau (1–7)** og **risikomarkering (grøn/gul/rød)**
4. **Kvittering** med link til den katalogiserede publikation

### Søgning

Fritekstsøgning kombineret med facetter: myndighed, dokumenttype, fagområde, år, rettighedsniveau og risikomarkering. Resultater vises som kort med kort resume og badges.

### Publikationsside

Detaljevisning af en enkelt publikation: fuld metadata, AI-genereret resume, badges for rettighedsniveau og risiko, samt handlinger for favorit og tilføj-til-samling.

### Favoritter

Personlig favoritliste pr. bruger, gemt i `localStorage`.

### Samlinger

Navngivne samlinger af publikationer, hver med et **delelink**. Delelinket indeholder en base64-pakket kopi af samlingen — så den kan åbnes af andre uden backend. Lange samlinger giver lange links.

---

## Krav

- Offentlige myndigheder skal kunne uploade publikationer direkte eller registrere dem med link til oprindelig placering
- AI-baseret katalogisering skal foreslå metadata efter en fast profil (titel, resume, emneord, dokumenttype, målgruppe, fagområde, sprog, indikatorer på personoplysninger og tredjepartsindhold)
- Publicisten skal tage **aktiv stilling** til rettighedsniveau og risikomarkering — ingen tavse defaults
- Rettighedsmodellen skal være trinvis (fx 1–7) så myndigheder kan starte forsigtigt og udvide over tid
- Publikationskatalog og træningsdatabank skal være **teknisk og juridisk adskilte** lag
- Offentligt søgeinterface skal understøtte fritekst og facetterede filtre på tværs af myndigheder, emner, dokumenttyper, årstal og målgrupper
- Hver publikation skal have en stabil præsentationsside med metadata, downloadlink, oprindelig kilde og rettighedsoplysninger
- Træningsdatabanken skal være kurateret — kun publikationer der opfylder krav til rettigheder, databeskyttelse, kvalitet og teknisk anvendelighed indgår

---

## Uafklarede spørgsmål

Prototypen er et visuelt og funktionelt diskussionsgrundlag — ikke en implementeringsklar løsning. Inden et reelt system kan bygges, skal en række forhold afklares.

### Rettigheder og ophavsret

- **Rettighedsmodellens niveauer.** Hvem definerer de syv niveauer juridisk? Er trappetrinnene de rigtige (registrering → visning → tekstudtræk → RAG → finjustering → fuld træning → fri licens), og hvilke standardlicenser knyttes til hvert niveau?
- **Eksternt producerede rapporter.** Mange rapporter er udarbejdet af konsulenter, universiteter eller analyseinstitutter for myndigheden. Myndigheden har betalt — men har den ret til at give andre adgang til AI-træning på indholdet? Upload-flowet skal håndtere dette.
- **Ansvar ved fejlklassificering.** Hvis en publikation fejlagtigt markeres som tilladt til træning og bagefter viser sig at indeholde tredjepartsmateriale — hvem hæfter? Myndigheden, platformen, eller AI-udvikleren der har brugt data?

### AI-katalogisering

- **Modelvalg og driftsmodel.** Hvilke modeller bruges til metadataudtræk og resume? Kører de hos en offentlig leverandør, on-prem, eller via API til kommerciel leverandør? Hvilke krav stilles til datalokalisering?
- **Hallucinationer og kvalitet.** Hvordan håndteres tilfælde hvor AI'en foreslår forkerte metadata eller resume? Skal alle felter godkendes manuelt, eller er nogle felter "autoritative" uden review?
- **Indikatorer på personoplysninger.** Automatisk screening kan hjælpe, men kan ikke stå alene ved publikationer med forhøjet risiko. Hvilken proces sikrer manuel vurdering af gule og røde publikationer?

### Persondata og etik

- **Risikoklassifikation (grøn/gul/rød).** Hvem træffer den endelige beslutning ved gul og rød? Er det publicisten, en central jurist hos opendata.dk, eller en kombination?
- **Fotos, cases og citater.** Selv offentligt tilgængelige publikationer kan indeholde navngivne borgere. Hvordan skiller vi mellem "offentligt tilgængeligt" og "egnet til AI-træning"?

### Governance og hosting

- **Hvem ejer og driver tjenesten?** Digitaliseringsstyrelsen, Datatilsynet, et kommunalt konsortium, en kombination?
- **Forholdet til opendata.dk.** Skal det være en udvidelse af eksisterende platform, eller en separat tjeneste der linker til opendata.dk?
- **Forholdet til træningscenteret.** Hvordan kobler træningsdatabanken til det planlagte træningscenter for danske sprogmodeller?

### Teknisk

- **PDF-parsing og scannede dokumenter.** Hvilke værktøjer bruges til tekstudtræk? Hvordan håndteres scannede PDF'er uden OCR-lag?
- **Versionering.** Hvad sker der når en myndighed opdaterer en publikation? Beholder vi tidligere versioner i træningsdatabanken?
- **Skala.** Hvor mange publikationer forventes i pilot, og hvor mange efter fuld udrulning?

### Pilot

- **Omfang.** Realistisk antal myndigheder og publikationer i fase 1?
- **Succeskriterier.** Hvad skal være på plads før pilot kan kaldes vellykket — antal publikationer, antal aktive myndigheder, faktisk anvendelse i AI-træning, eller noget andet?

---

## Interaktiv prototype

<a href="/research-projects/projects/dansk-viden-til-dansk-ai/mocks/index.html" class="mock-button" target="_blank">Åbn prototypen ↗</a>
