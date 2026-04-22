# Redaktionelt indhold — Høringsdetalje side

Oversigt over indhold som redaktører skal bidrage med per høring, samt hvad der kan genereres automatisk fra eksisterende data.

## Oversigt

| Sektion | Redaktør | Automatisk | Bemærkning |
|---------|:--------:|:----------:|------------|
| Hero-billede | X | | Billede skal uploades per høring |
| Afgørelsesbanner | X | delvist | Redaktør skriver tekst; dato kan trækkes fra dagsordensystem |
| Afgørelsesdialog | X | delvist | Redaktør skriver resumé; links til referat/video kan trækkes fra byrådets dagsordensystem |
| Overskrift og manchet | X | | Fritekst per høring |
| Metadata (svarfrist, type, ID) | | X | Findes i høringsdata |
| Tags/kategorier | X | | Redaktør vælger fra taksonomi |
| Brødtekst | X | | Fritekst med mulighed for ordforklaringer |
| Ordforklaringer (glossary) | X | delvist | Redaktør markerer termer; forklaringstekst kan trækkes fra central ordliste |
| Materialer | X | | Redaktør uploader filer og angiver navne |
| HTML-forhåndsvisning af materialer | | X | Kan genereres automatisk fra uploadet PDF |
| Svarfrist og slettedato | | X | Findes i høringsdata |
| Kontaktoplysninger | X | delvist | Redaktør vælger afdeling; kontaktdata kan trækkes fra kontaktregister |
| Høringssvar | | X | Indsendt af borgere via formularen |
| Høringssvar-kategorier | delvist | delvist | Kategori-taksonomi vedligeholdes af redaktør; tildeling kan evt. automatiseres med AI |
| Kommentarer | | X | Indsendt af borgere |
| Statistik — linjediagram | | X | Beregnes automatisk fra indkomne svar |
| Statistik — kategorifordeling | | X | Beregnes automatisk fra kategoriserede svar |
| Geografisk fordeling (kort) | | X | Beregnes fra afsenderadresse/postnummer |
| Info-boks (Mere viden) | X | | Redaktør vælger links fra vidensbase |
| Relaterede aktiviteter | X | delvist | Redaktør knytter relationer; billeder og metadata trækkes automatisk |
| Projekter CTA | | X | Global komponent — konfigureres én gang |
| Footer | | X | Global komponent |

---

## Detaljer per sektion

### 1. Hero-billede

**Redaktøropgave:** Upload et billede der repræsenterer høringsområdet.

- Anbefalet størrelse: 1600 x 500 px
- Alt-tekst skal udfyldes

### 2. Afgørelsesbanner og -dialog

**Redaktøropgave:**
- Kort bannerbesked (1 sætning) med mødedato og udfald
- Resumé af afgørelsen (2-3 afsnit) til afgørelsesdialogen

**Automatisk:**
- Mødedato kan trækkes fra byrådets dagsordensystem
- Link til referat (PDF) og video kan trækkes automatisk, hvis byrådets system har en API
- Link til vedtaget lokalplan kan genereres fra dokumentsystemet

**Redaktøren skal levere:**
- Link til hvidbog (behandling af høringssvar) — dette dokument produceres manuelt
- Eventuelle tilpasninger af resuméteksten

### 3. Overskrift, manchet og brødtekst

**Redaktøropgave:** Fritekst. Ingen automatisering mulig — dette er det primære redaktionelle indhold.

### 4. Ordforklaringer (glossary)

**Redaktøropgave:** Markere fagtermer i brødteksten der skal have en forklaring.

**Automatisk:**
- Forklaringstekst og "læs mere"-link kan trækkes fra en **central ordliste/taksonomi** i CMS
- Systemet kan evt. automatisk foreslå termer der bør markeres (baseret på ordlisten)
- Kræver oprettelse og vedligeholdelse af en ordliste med fagtermer og forklaringer

**Vedligeholdelse af ordliste:**
- Ordlisten bør forvaltes centralt (ikke per høring)
- Hver term: navn, kort forklaring (maks 2 sætninger), link til uddybende side
- Eksempler: omdannelsesområde, boligbebyggelse, kommuneplan, rammeområde, bebyggelsesprocent, LAR-løsning

### 5. Materialer

**Redaktøropgave:**
- Upload dokumenter (PDF, billeder)
- Angiv dokumentnavn
- Vælg om dokumentet skal have HTML-forhåndsvisning

**Automatisk:**
- Filtype og størrelse detekteres automatisk
- HTML-forhåndsvisning kan genereres automatisk fra PDF (kræver PDF-til-HTML konvertering i backend)
- Ikon vælges automatisk ud fra filtype

### 6. Kontaktoplysninger

**Redaktøropgave:** Vælg ansvarlig afdeling fra liste.

**Automatisk:**
- Adresse, telefon og e-mail trækkes fra kontaktregister baseret på valgt afdeling

### 7. Høringssvar og kommentarer

**Fuldt automatisk.** Borgere indsender via formularen. Kræver ingen redaktørindsats.

**Redaktøropgave (valgfri):**
- Moderation af upassende indhold
- Tildeling af kategori til høringssvar (hvis ikke borgeren selv vælger)

### 8. Statistik

**Fuldt automatisk.** Alle tre statistiksektioner (linjediagram, kategorifordeling, kort) genereres fra de indkomne høringssvar.

**Forudsætninger:**
- Linjediagram: hvert svar har en indsendt-dato → aggregeres per dag
- Kategorifordeling: hvert svar har en kategori → aggregeres per kategori
- Kort: hvert svar har en afsender-lokation (postnummer eller adresse) → geokodes og vises

### 9. Info-boks (Mere viden)

**Redaktøropgave:** Vælg 2-4 links til relevante sider fra vidensbasen.

**Mulighed for automatisering:** Links kan foreslås automatisk baseret på høringstype (fx "lokalplan" → vis altid links om lokalplanprocessen).

### 10. Relaterede aktiviteter

**Redaktøropgave:** Knyt høringen til relaterede dialoger, høringer eller aktiviteter.

**Automatisk:**
- Billede, titel, type, dato, svar-antal og lokation trækkes fra den relaterede aktivitets egen data
- Redaktøren behøver kun at vælge relationen — resten vises automatisk

---

## Systembehov for automatisering

For at maksimere den automatiske indholdsgenerering kræves:

| System / data | Bruges til |
|---------------|------------|
| Byrådets dagsordensystem (API) | Afgørelsesdato, referat-PDF, video-link |
| Dokumentsystem | Vedtagne lokalplaner, materialefiler |
| Central ordliste i CMS | Glossary-forklaringer og links |
| Kontaktregister | Afdelingsoplysninger |
| PDF-til-HTML konvertering | Forhåndsvisning af materialer |
| Geokodning af postnumre | Geografisk kort over høringssvar |
| Aktivitets-/høringsregister | Relaterede aktiviteter, metadata |

---

## Estimeret redaktørtid per høring

| Opgave | Estimat |
|--------|---------|
| Hero-billede og metadata | 5 min |
| Overskrift, manchet, brødtekst | 30-60 min |
| Markering af glossary-termer | 5-10 min |
| Upload af materialer | 10-15 min |
| Afgørelsestekst (efter vedtagelse) | 15-20 min |
| Relationer og info-links | 5 min |
| **Total** | **ca. 1-2 timer** |

Resten genereres automatisk fra data.
