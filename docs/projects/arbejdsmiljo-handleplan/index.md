<small>**Project:** Arbejdsmiljøhandleplan · **Status:** Pitch · **Date:** juni 2026</small>

# Arbejdsmiljøhandleplan

**En klikbar prototype af en digital arbejdsmiljøhandleplan for Aarhus Kommune — baseret på den gældende Word-skabelon for Borgmesterens Afdeling (BA).**

---

## Baggrund

Arbejdsmiljøhandleplanen er i dag en Word-skabelon, der udfyldes manuelt i den enkelte arbejdsmiljøgruppe (AMG). Skabelonen rummer ni faste sektioner — fra selve handleplan-tabellen og risikovurderingsmatrixen til årshjul, sygefravær og arbejdsulykker — og skal revideres mindst én gang om året.

En Word-fil giver ingen påmindelser om, hvornår revisionen er overskredet, ingen historik over hvad der er ændret, og ingen nem måde at dele planen med ledelse eller MED-udvalg på. Hver gruppe sidder med sin egen fil, og overblikket på tværs forsvinder.

## Formål

Prototypen undersøger spørgsmålet: **Hvordan kunne en digital arbejdsmiljøhandleplan se ud og fungere på tværs af afdelinger i Aarhus Kommune — med samme indhold som den nuværende skabelon, men med live risikofarver, automatisk historik, advis om revisionsdato og deling indbygget?**

Den er ren HTML, vanilla JS og CSS uden backend — alt gemmes i browserens `localStorage`. Den er et **visuelt og funktionelt diskussionsgrundlag**, ikke en færdig løsning.

## Hvad prototypen viser

- **Dashboard** med advis-stribe (fx "Skal revideres om 14 dage"), KPI-fliser og brugerens egne handleplaner. Badges markerer om revisionsdatoen nærmer sig (≤30 dage = gul) eller er overskredet (rød).
- **Opret og redigér handleplan** med skabelonens sektioner som faner: handleplan-tabel med live risikofarve, 4×4 risikovurderingsmatrix, væsentligste arbejdsmiljøforhold, årshjul, kompetenceudvikling, sygefravær, uønskede hændelser og arbejdsulykker.
- **Log** — automatisk historik over alle ændringer pr. plan, vist kronologisk, med filtrering på bruger og handling.
- **Deling** — simuleret "send link til e-mail" med autocomplete og en read-only modtagervisning.
- **Adviser** — "Markér som revideret" sætter datoen 12 måneder frem og logger handlingen.

::: info Demo-login
To demo-brugere seedes ved første åbning:

| E-mail | Kode | Rolle |
| --- | --- | --- |
| `anna@aarhus.dk` | `demo` | Arbejdsmiljørepræsentant (AMR) — har en udfyldt demo-handleplan |
| `peter@aarhus.dk` | `demo` | Arbejdsmiljøleder (AML) — har en tom plan, hvor revision er overskredet |
:::

## Begrænsninger

- Ingen rigtig auth eller backend; passwords hashes trivielt — kun til demo.
- Deling er kun UI; der sendes ingen rigtig mail. Linket virker i samme browser, fordi delingerne gemmes lokalt.
- Adviser er visuelle badges uden mail- eller push-integration.
- Prototypen er ikke til produktion.

---

## Interaktiv prototype

<a href="/research-projects/projects/arbejdsmiljo-handleplan/mocks/index.html" class="mock-button" target="_blank">Åbn prototypen ↗</a>
