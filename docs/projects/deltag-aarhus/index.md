<small>**Project:** deltag.aarhus.dk · **Status:** Draft · **Date:** April 2026</small>

# deltag.aarhus.dk — Høringsdetalje

**Prototype af en høringsdetalje-side til Aarhus Kommunes borgerdeltagelsesplatform.**

---

## Baggrund

deltag.aarhus.dk skal give borgere mulighed for at deltage i offentlige høringer, dialoger og andre demokratiske processer. Denne prototype demonstrerer en høringsdetalje-side — den side borgerne ser når de klikker ind på en konkret høring.

Prototypen bruger et realistisk scenarie: en høring om vindmøller ved Vosnæs (Lokalplan nr. 1237 med miljøvurderingsrapport), med 784 simulerede høringssvar.

---

## Hvad prototypen viser

### Variantskift (åben/afsluttet)

Prototypen kan skifte mellem to tilstande via mock-banneret:

- **Åben høring** — borgere kan indsende høringssvar og kommentere andres svar
- **Afsluttet høring** — svarfristen er udløbet, "Skriv et høringssvar"-knappen er deaktiveret, og afgørelsesbannerets vises

### Høringssvar

- 784 simulerede høringssvar i et responsivt 4-kolonne grid
- Filtrering efter kategori (Miljø/Natur, Støj/Sundhed, Landskab/Visuel, Proces/Andet)
- Sortering (Nyeste, Ældste, Flest synes om, Flest kommentarer)
- Kontinuerlig "Vis flere"-indlæsning (16 ad gangen)
- Modal med fuldt svarindhold, kommentarer og svar-formuler
- Tastaturnavigation (piletaster, Escape)
- URL-dyblink til individuelt svar (`#svar-{id}`)

### MitID login og indsendelse

- Mock MitID-loginflow (åben variant)
- Indsendelsesformular med kategori, titel og brødtekst
- Kommentarformular på individuelle høringssvar

### Statistik og kort

- SVG-linjediagram over indsendte svar pr. dag (10-ugers høringsperiode)
- Kategorifordeling
- Interaktivt kort (Leaflet.js) med Vosnæs-koordinater

### Øvrige features

- Ordforklaringer (glossary) med tooltips på fagtermer
- Afgørelsesmodal med mødereferat, video og hvidbog
- Materialeliste med dokumentforhåndsvisning
- Relaterede aktiviteter (høringer og dialoger)
- Fuldt responsivt layout (mobil, tablet, desktop)
- Tilgængelig: ARIA-attributter, fokusstyring, tastaturnavigation

---

## Teknisk opbygning

Prototypen er vanilla HTML/CSS/JS uden build-trin:

- **HTML:** Én `index.html` med semantisk markup
- **CSS:** 24 komponent-filer + designtokens med 93 custom properties
- **JS:** 15 moduler med centraliseret state management (`window.DeltagMock.state`)
- **Data:** 784 procedurelt genererede høringssvar med 15 kommentarer hver

---

## Redaktionelt indhold

Se [Redaktionelt indhold — Høringsdetalje side](editor-content-requirements.md) for en oversigt over hvad redaktører skal levere per høring, og hvad der kan genereres automatisk.

**Estimat:** ca. 1–2 timer redaktørtid per høring (efter systemintegrationer er bygget).

---

## Interaktiv prototype

<a href="/research-projects/projects/deltag-aarhus/mocks/index.html" class="mock-button" target="_blank">Åbn prototypen ↗</a>

Prøv at skifte mellem åben og afsluttet variant via linkene i det blå mock-banner øverst.
