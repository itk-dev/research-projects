<small>**Project:** AI Bibliotek · **Status:** Prototype · **Date:** May 2026</small>

# AI Bibliotek

**Et fælles bibliotek hvor danske myndigheder kan dele og hjemtage AI-assistenter — så lokale use cases kan skaleres op på nationalt niveau.**

---

## Baggrund

I Storskalaprojektet udvikles AI-assistenter til konkrete kommunale opgaver — borgerservice, sagsbehandling, journalisering, mødereferater og meget mere. Assistenterne bygges i dag typisk lokalt i den enkelte kommune, ofte oven på OpenWebUI, og bliver sjældent delt på tværs. Det betyder, at den samme assistent reelt udvikles flere gange parallelt i forskellige kommuner.

Samtidig efterspørger OS2ai-kommunerne en måde at genbruge hinandens arbejde på: hvis Aarhus har bygget en velfungerende FAQ-assistent til borgerservice, bør Odense kunne hjemtage den, tilpasse den lokalt og tage den i brug — uden at starte forfra.

Et AI-bibliotek kan udstille assistenterne ét sted, så de kan fremsøges, vurderes og hjemtages. På sigt kan det samme bibliotek rumme tools, skills og hele økosystemet omkring assistenterne — og måske brede sig ud over kommunegrænserne til hele det offentlige Danmark.

## Formål

Prototypen undersøger spørgsmålet: **Hvordan kan et fælles bibliotek for delte AI-assistenter se ud i praksis — så en assistent udviklet i én kommune kan hjemtages og anvendes i en anden?**

Biblioteket skal understøtte to bevægelser:

- **Dele** — en kommune udstiller en assistent, den har udviklet lokalt, sammen med dens datagrundlag (i opskriftsform), modelkort og readme
- **Hjemtage** — en anden kommune fremsøger, vurderer og henter assistenten (eksporterer dens JSON) og bygger sit eget lokale datagrundlag efter opskriften

## Hvad prototypen viser

Prototypen er en single-page application, der bruger `localStorage` som backend og simulerer AI-understøttet metadata med en kort spinner. Den er et **visuelt og funktionelt diskussionsgrundlag** — teksten er illustrativ (lorem-agtig, men realistisk), netop fordi det er en visualisering af et koncept og ikke en færdig løsning.

### Forsiden

Hero med søgefelt, kort introduktion og statistik (antal assistenter, deltagende kommuner, antal sprogmodeller). En rail med "Senest opdateret" og en sektion der **teaser fremtidige muligheder** (tools, skills, ratings, API, abonnement, testcases) som "kommer snart".

### Registrering og login

Simpel brugerflade hvor en medarbejder kan oprette en konto (i første omgang opret sig selv) eller logge ind. Brugere gemmes i `localStorage`. Ingen reel auth — kun til demoformål.

I prototypen vælges **myndighed** fra en dropdown (kun whitelistede myndigheder), og registrering kræver, at e-mailen ligger på den valgte myndigheds domæne. Det illustrerer den tiltænkte adgangsmodel:

- **Whitelistet domæne** — kun medarbejdere med en arbejdsmail på et whitelistet domæne (fx `@aarhus.dk`) kan oprette sig. Domænet er adgangsporten; nye myndigheder optages ved at få deres domæne tilføjet til listen.
- **Verifikation ved oprettelse** — den nye bruger bekræfter sin konto via et link sendt til e-mailen, før kontoen aktiveres.
- **Domæne-admin** — for hvert domæne udpeges en bruger som **admin** med rettigheder til at **slette** brugere og **forfremme** andre brugere (herunder til admin) inden for samme domæne.

::: info Prototype
Selve verifikationsflowet, admin-rollen og brugeradministrationen er kun beskrevet som tiltænkt model — prototypen simulerer dem ikke. Mocken håndhæver dog whitelisten og domæne-matchet ved oprettelse.
:::

### Katalog og søgning

Fritekstsøgning kombineret med facetter: **oprindelseskommune, sprogmodel, rammeværk** (i dag OpenWebUI) og **datafølsomhed** (almindelige personoplysninger / fortrolige / personfølsomme). Resultater vises som kort med badges.

### Assistent-side

Detaljevisning af en enkelt assistent med adskilte visninger:

- **Beskrivelse** — assistentens formål
- **Modelkort** — hvilken sprogmodel, kontekstvindue, parametre og hvilke hensyn der er til assistenten
- **Readme** — praktisk dokumentation
- **Viden** — *i opskriftsform*: hvad den enkelte kommune selv skal levere af datagrundlag lokalt (de faktiske vidensfiler kan sjældent deles på tværs af kommuner)
- **JSON** — vælg blandt **flere versioner** af assistenten og **eksportér** den valgte version som en JSON-fil (datagrundlag svarende til OpenWebUIs eksportformat)

Metadata i sidepanelet: oprindelseskommune, sprogmodel, rammeværk, datafølsomhed, dato for oprettelse og opdatering samt antal versioner. En **OpenWebUI-tag** markerer rammeværket, så biblioteket med tiden kan rumme assistenter til flere typer rammeværk.

### Del assistent

Et flow hvor en kommune udstiller en assistent: indsæt eller upload assistentens OWUI-JSON → systemet foreslår metadata (navn, beskrivelse, tags, sprogmodel) → kommunen gennemgår, vælger datafølsomhed og udgiver. Kvittering med permalink.

### Mine assistenter & favoritter

Personligt overblik over egne delte assistenter samt en favoritliste, begge gemt i `localStorage`.

---

## Krav (v0.1)

- Webapplikation med simpel brugerstyring (opret sig selv)
- En assistent består af — og skal kunne udvides uendeligt med — mindst: eksporterbar **JSON** (datagrundlag svarende til OpenWebUI), **viden/filer i opskriftsform**, **modelkort**, **readme** og en **beskrivelse**
- Metadata: sprogmodel, viden, dato for oprettelse/opdatering, oprindelseskommune samt om assistenten er beregnet til personfølsomme / fortrolige / almindelige personoplysninger
- Flere versioner af JSON på samme assistent
- Det skal være muligt at tilføje nye entiteter (fx tools og skills) på sigt
- En assistent skal kunne tagges med sit rammeværk (OpenWebUI i dag), så biblioteket senere kan rumme flere rammeværk
- AI-genererede tags (evt.)
- Forskellige filtrerings- og søgemuligheder

---

## Afklarende spørgsmål

Prototypen er et diskussionsgrundlag, ikke en implementeringsklar løsning. En række forhold skal afklares inden et reelt system bygges.

### Hvad må udstilles åbent — og hvad skal bag login?

I prototypen er **kataloget offentligt at browse**, mens det at **dele og eksportere** kræver login. Det er en antagelse, ikke en beslutning. Skal selve eksistensen af en assistent (navn, formål, kommune) være åben, mens JSON og modelkort er bag login? Eller skal hele biblioteket være lukket for ikke-myndigheder?

### Hvem styrer whitelisten og admin-rollen?

Adgang gives via whitelistede e-mail-domæner. Hvem godkender, at et nyt domæne (en ny myndighed) optages? Og hvem udpeger den første admin for et domæne, før der overhovedet er en admin til at forfremme andre? Der skal tages stilling til både onboarding af nye myndigheder og den indledende rolletildeling.

### Hvad er der i JSON-filerne?

Kan vi ukritisk dele indholdet af en OWUI-assistents JSON? Systemprompter kan indeholde interne formuleringer, henvisninger til konkrete sager eller forudsætninger, der ikke bør deles bredt. Der skal tages stilling til, hvad der reviewes inden deling.

### Hvordan fungerer download og upload på tværs af forskellige løsninger?

Biblioteket forudsætter, at en assistent eksporteret ét sted kan importeres et andet sted. Hvor ens skal afsender- og modtagermiljøet være? Hvad sker der, når en kommune kører en anden version af OpenWebUI — eller et helt andet rammeværk?

### Er der en standard for assistenter?

Findes der en standard (JSON, XML eller andet) for, hvordan en assistent beskrives og overdrages? OpenWebUIs eksportformat er udgangspunktet, men en bibliotek-standard på tværs af rammeværk vil kræve en aftalt struktur.

### Datagrundlaget

De faktiske vidensfiler kan sjældent deles på tværs af kommuner (interne data, persondata, rettigheder). Prototypen løser det ved at beskrive datagrundlaget **i opskriftsform**, så den enkelte kommune selv kan opbygge sit lokale grundlag. Er opskriftsformen tilstrækkelig, eller skal der mere standardisering til?

---

## På sigt

Følgende er ikke en del af v0.1, men biblioteket skal kunne rumme det. I prototypen er mulighederne teaset som "kommer snart":

- Deling af **tools** og **skills**
- Mulighed for at **rate** assistenter, tools og skills
- **API** så man kan oprette og vedligeholde assistenter fra egen løsning
- Mulighed for at **abonnere** på en assistent og få besked ved ændringer (og dermed hente ny version)
- Deling af **testcases og resultater** på en assistent

---

## Succeskriterie

At der er delt **to AI-assistenter fra AarhusAI** i AI-biblioteket. Derudover inviteres andre OS2ai-kommuner til at være testkommuner — både til at dele lokalt udviklede assistenter og til at tage delte assistenter i anvendelse lokalt.

---

## Drift og økonomi

Se [Estimeringsnotat](./estimeringsnotat) for økonomisk estimat, tidshorisont og opmærksomhedspunkter om drift og driftsomkostninger.

---

## Interaktiv prototype

<a href="/research-projects/projects/ai-bibliotek/mocks/index.html" class="mock-button" target="_blank">Åbn prototypen ↗</a>
