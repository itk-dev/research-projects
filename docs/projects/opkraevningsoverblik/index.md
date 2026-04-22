<small>**Project:** Opkrævningsoverblik · **Status:** Prototype · **Date:** February 2026</small>

# Opkrævningsoverblik

**Samlet overblik over kommunale opkrævninger for borgere i Aarhus Kommune.**

---

## Baggrund

Borgere i Aarhus Kommune modtager opkrævninger for en række kommunale ydelser — ejendomsskat, daginstitution, renovation m.fl. Disse oplysninger er i dag spredt over flere systemer og kanaler, hvilket gør det svært for borgere at få et samlet overblik over hvad de skylder, hvad der er betalt, og hvad der er på vej.

## Formål

Formålet er at skabe ét samlet overblik hvor borgere hurtigt og intuitivt kan se alle deres kommunale opkrævninger — både den aktuelle status og udviklingen over tid. Overblikket skal skabe gennemsigtighed og gøre det nemt at forstå sin økonomiske situation i forhold til kommunen.

**Succeskriterium:** Borgeren kan danne sig et overblik over sin samlede status og eventuelle restancer på under ét minut — uden vejledning.

---

## Hvad prototypen viser

### Login og testbrugere

Prototypen inkluderer tre testbrugere med forskellige statuser:
- **Anders** — alle opkrævninger betalt, ingen restancer
- **Maria** — kommende forfaldsdatoer inden for 30 dage
- **Lars** — ubetalte opkrævninger der har overskredet forfaldsdato

### Dashboard med statusindikator

En visuel statusindikator der giver borgeren øjeblikkeligt overblik:
- **Alt i orden** (grøn) — alle opkrævninger er betalt
- **Kommende forfald** (gul) — opkrævninger forfalder inden for 30 dage
- **Restance** (rød) — ubetalte opkrævninger der har overskredet forfaldsdato

Indikatoren bruger kombination af farve, ikon og tekst for tilgængelighed.

### Opkrævningsliste

- Alle aktive opkrævninger med beløb, forfaldsdato og status
- Filtrering efter ydelsestype (ejendomsskat, daginstitution, renovation m.fl.)
- Samlet restancebeløb
- Detaljevisning for den enkelte opkrævning

### Historisk udvikling (5 år)

- Linjediagram (Chart.js) der viser opkrævet vs. betalt beløb over tid
- Mulighed for at se udviklingen per ydelsestype
- Tydelig markering af perioder med restancer

---

## Krav

- WCAG 2.1 Level AA tilgængelighed
- Responsivt design (desktop, tablet, mobil)
- NemLog-in autentifikation
- Nær-realtid datahentning
- Overblikket dækker kun kommunale opkrævninger — ikke regionale eller nationale

---

## Interaktiv prototype

<a href="/research-projects/projects/opkraevningsoverblik/mocks/index.html" class="mock-button" target="_blank">Åbn prototypen ↗</a>

Vælg en testbruger for at se forskellige statuser (alt i orden, kommende forfald, restance).
