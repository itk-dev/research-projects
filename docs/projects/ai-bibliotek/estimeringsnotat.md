<small>**Project:** AI Bibliotek · **Status:** Estimat (pitch)</small>

# AI Bibliotek — Estimeringsnotat

**Dato:** maj 2026
**Projekt:** AI Bibliotek — deling af AI-assistenter på tværs af offentlige myndigheder
**Fase:** Pitch / oplæg (uge 23)

::: info Bemærkning
Notatet er bevidst holdt på et overordnet niveau. Det er et oplæg, ikke et tilbud — formålet er at give en størrelsesorden og efterlade manøvrerum i den videre proces. Estimaterne er grove og afhænger af de afklaringer, der er beskrevet i [hovednotatet](./).
:::

---

## Overordnet estimat

Estimatet er delt i faser, så projektet kan startes småt og udvides, efterhånden som koncept og behov afklares.

| Fase | Indhold | Estimat | Tidshorisont |
|---|---|---|---|
| **Fase 0 — Afklaring** | Standard for assistent-format, governance, hvad er åbent vs. bag login, rettigheder til delt JSON | 60–120 t. | 3–5 uger |
| **Fase 1 — MVP (v0.1)** | Webapp, simpel brugerstyring, katalog med søgning/filtre, assistent-side, JSON-eksport, del/upload-flow, OpenWebUI-tag | 350–550 t. | 2–3 mdr. |
| **Fase 2 — Udvidelser** | Flere versioner i drift, AI-genererede tags, forbedret datagrundlags-opskrift, flere rammeværk | 250–450 t. | 2–3 mdr. |
| **Fase 3 — Økosystem (på sigt)** | Tools & skills, ratings, API, abonnement/advisering, testcases | 400–800 t. | Løbende |
| **Sum (fase 0–2)** | | **660–1.120 t.** | **ca. 5–8 mdr.** |

Fase 3 er medtaget for fuldstændighedens skyld og er ikke en del af det anbefalede første skridt.

### Anbefalet første skridt

Fase 0 + Fase 1 leverer en brugbar MVP, der kan opfylde succeskriteriet: to AarhusAI-assistenter delt i biblioteket og inviterede OS2ai-testkommuner. Estimat **410–670 t.**, tidshorisont **ca. 3–4 måneder**.

---

## Opmærksomhedspunkt: drift og driftsomkostninger

Et bibliotek af denne type er ikke et "byg og glem"-projekt. Den væsentligste langsigtede omkostning er **drift**, ikke selve udviklingen. Følgende skal afklares tidligt:

- **Hosting og ejerskab.** Hvem driver og betaler for platformen? OS2/OS2ai-fællesskab, en værtskommune, eller en central aktør? Driften skal have en fast ejer, ellers forfalder biblioteket.
- **Løbende vedligehold.** Sikkerhedsopdateringer, afhængigheder, brugerstyring og support koster typisk **15–25 % af udviklingsestimatet pr. år**. For fase 0–2 svarer det groft til **100–280 t./år**.
- **Indholdsmoderering og kvalitet.** Delte assistenter skal kunne reviewes — er JSON'en trygt at dele, er metadata korrekt, er datafølsomheden vurderet rigtigt? Det kræver en governance-proces og dermed tid, ikke kun teknik.
- **Versionering over tid.** Når en kommune opdaterer en delt assistent, skal abonnenter adviseres og gamle versioner håndteres. Det vokser med antallet af assistenter og kommuner.
- **Compute.** Selve assistenterne kører lokalt i den enkelte kommune — biblioteket hoster ikke modeller. Driftsomkostningen til AI-inferens ligger derfor hos den hjemtagende kommune, ikke hos biblioteket. Det holder bibliotekets egne driftsomkostninger lave og forudsigelige.

**Konklusion:** udviklingsomkostningen er en engangsinvestering; driften er en løbende forpligtelse, der skal have et budget og en ejer fra dag ét.

---

## Forudsætninger og forbehold

- Estimaterne forudsætter genbrug af eksisterende ITKdev-fundament (auth, design, hosting-mønstre).
- De forudsætter, at OpenWebUIs eksportformat kan bruges som udgangspunkt for assistent-JSON.
- Større usikkerheder: standardisering på tværs af rammeværk, juridisk afklaring af deling af systemprompter/datagrundlag, og governance-modellen.
- Tallene er grove pitch-estimater og skal kvalificeres i fase 0.
