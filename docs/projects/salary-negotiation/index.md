---
title: Lønforhandlingssystem
---

<small>**Project:** Lønforhandlingssystem · **Status:** Pitch · **Date:** April 2026</small>

# Lønforhandlingssystem for Aarhus Kommune

**Fra Excel-kaos til struktureret lønforhandling**

---

## Problemet i dag

Lønforhandlinger i Aarhus Kommune kører i dag via Excel-ark der sendes frem og tilbage mellem personaleleder, HR og chefer. Det er en tidskrævende og fejlbehæftet proces:

- **Ingen versionsstyring** — Flere kopier af samme ark cirkulerer samtidig. Hvem har den nyeste version?
- **Manuel dataindtastning** — Medarbejdernavne, løn og overenskomst tastes manuelt ind fra SD Løn
- **Fejlbehæftet omregning** — Fast årligt tillæg skal omregnes mellem 2000-tal og aktuelle tal med en faktor der ændrer sig hvert år
- **Intet budgetoverblik** — Restbudgettet afhænger af manuelle sumformler i regnearket
- **Ingen sporbarhed** — Det er uklart hvem der har godkendt hvad og hvornår
- **Ingen automatisk opfølgning** — Når forhandlingen er afsluttet, tastes resultatet manuelt ind i SD Løn

!!! warning "Eksempel fra hverdagen"
    En personaleleder sender et Excel-ark med 25 medarbejdere til HR. HR retter i arket og sender det retur. Personalelederne har i mellemtiden lavet ændringer i deres lokale kopi. Resultat: to versioner, ingen ved hvilken der er korrekt.

---

## Løsningen

Et webbaseret system der erstatter Excel med en struktureret arbejdsgang. Systemet trækker automatisk medarbejderdata fra kildesystemerne, holder styr på budgettet i realtid, og sikrer at alle indstillinger og godkendelser er dokumenteret.

**Arbejdsgangen i systemet:**

1. **Personaleleder** logger ind og angiver årets lønbudget (f.eks. 150.000 kr.)
2. **Systemet** henter automatisk medarbejdere i afdelingen med navn, nuværende løn og overenskomst
3. **Personaleleder** indstiller medarbejdere med engangsbeløb og/eller fast årligt tillæg, begrundelse og prioritet
4. **HR-konsulent** behandler indstillingerne og indtaster beløb i 2000-tal og 2025-tal
5. **Systemet** omregner automatisk fast årligt tillæg fra 2000-tal til aktuelle tal
6. **Chef** godkender de enkelte indstillinger
7. **Systemet** journaliserer — data sendes til SD Løn, lønnen reguleres, og brev udsendes til medarbejder og leder

---

## Hvad systemet kan

- **Automatisk datahentning** — Medarbejderliste og organisationsdata fra FK Organisation, løndata fra SD Løn (månedsløn, tillæg, overenskomst)
- **Budgetstyring i realtid** — Restbudgettet opdateres automatisk ved hver indstilling, så personalelederen altid kan se om budgettet er brugt
- **Automatisk omregning** — Fast årligt tillæg indtastes i 2000-tal, systemet omregner automatisk til aktuelle tal via årets omregningsfaktor
- **Struktureret indstilling** — Engangsbeløb, fast tillæg, begrundelse og prioritet pr. medarbejder i en samlet oversigt
- **Godkendelsesworkflow** — Tydelig status (kladde → indstillet → godkendt) med fuld sporbarhed
- **Journalisering** — Ved afslutning sendes data til SD Løn, der udløser lønregulering og automatisk brev til medarbejder og leder

---

## Brugerroller

| Rolle | Ansvar |
|-------|--------|
| **Personaleleder** | Angiver årets lønbudget. Indstiller medarbejdere med beløb, begrundelse og prioritet. Følger restbudgettet i realtid. |
| **HR-konsulent** | Behandler indstillinger. Indtaster engangsbeløb i 2025-tal og fast årligt tillæg i 2000-tal. Verificerer beregninger. |
| **Chef / kontorchef** | Godkender eller afviser de enkelte indstillinger. Har overblik over samlet forbrug. |

---

## Integrationer

!!! info "SD Løn"
    Systemet integrerer med SD Løn for at hente nuværende løndata (månedsløn, tillæg, overenskomst) og for at sende godkendte lønændringer retur efter afsluttet forhandling.

!!! info "FK Organisation (KOMBIT)"
    Medarbejderlisten pr. afdeling hentes fra FK Organisation via KOMBITs Rammearkitektur, så personalelederen automatisk ser sine medarbejdere uden manuel indtastning.

!!! info "Omregningsfaktor"
    Årligt fastsatte omregningsfaktorer fra 2000-niveau til aktuelt niveau vedligeholdes i systemet og anvendes til automatisk beregning af tillæg.

---

## Tekniske forudsætninger

Systemet bygger på en række integrationer og sikkerhedsmekanismer:

- **API-adgang til SD Løn** — Kræver både læseadgang (hente medarbejderdata og lønoplysninger) og skriveadgang (sende godkendte lønændringer retur). API-aftale og teknisk afklaring med SD er en forudsætning.
- **Integration til FK Organisation** — Organisationsdata hentes via KOMBITs serviceplatform. Kræver aftale om adgang og mapping af organisationsenheder til systemets afdelingsstruktur.
- **OIDC-baseret adgangsstyring** — Brugere autentificeres via kommunens Identity Provider (IdP) med OpenID Connect. Det sikrer single sign-on og central brugerstyring uden separate loginoplysninger.
- **Datalimiter og dataafgrænsning** — Rollebaseret adgangsstyring sikrer at personaleleder kun ser medarbejdere i egen afdeling, HR-konsulent ser de afdelinger de betjener, og chefer ser deres ansvarsområde. Følsomme løndata eksponeres kun for de roller der har behov.

---

## Gevinster

- **Tidsbesparelse** — Ingen manuel indtastning af medarbejderdata, ingen omregning i hånden, ingen e-mails med Excel-ark
- **Færre fejl** — Data kommer direkte fra kildesystemerne, omregning er automatisk, og budgettet summeres korrekt
- **Gennemsigtighed** — Alle involverede kan se status på indstillinger og restbudget i realtid
- **Overblik** — Personaleleder ser altid det aktuelle restbudget, ingen risiko for at overskride rammen
- **Sporbarhed** — Fuld audit trail: hvem indstillede, hvem godkendte, hvornår, med hvilken begrundelse

---

## UI-koncept og mock

### Personaleleder-visning

Den interaktive prototype viser hele arbejdsgangen: personalelederens budgetoverblik og indstillingsformular, HR-behandling, og chefgodkendelse — samlet i ét overblik med tre faneblade.

[Interaktiv prototype :material-open-in-new:](mocks/salary-negotiation.html){ .md-button }

---

## Åbne spørgsmål

- [ ] Afklaring af API-adgang til SD Løn — både læse- og skriveadgang
- [ ] Teknisk afklaring af FK Organisation-integration (hvilken service, dataformat)
- [ ] Omregningsfaktor — hvem vedligeholder den, og hvorfra hentes den officielt?
- [ ] GDPR-vurdering og databehandleraftale for personlige løndata
- [ ] Skal systemet håndtere flere forhandlingsrunder pr. år?
- [ ] Brevskabelon til medarbejder og leder ved godkendt lønændring
- [ ] Differentiering mellem forvaltninger — er processerne ens nok til ét fælles system?
