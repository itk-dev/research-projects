/* Seeded fake AI assistants.
   Exposed as window.SEED_ASSISTANTS so the app works when opened
   via file:// where fetch() of local JSON is often blocked.

   Each assistant has one or more versions; every version carries an
   OpenWebUI-shaped JSON object that can be exported/downloaded.
*/
window.SEED_ASSISTANTS = [
  {
    id: "seed-001",
    name: "Borgerservice FAQ-assistent",
    tagline: "Svarer borgere på de hyppigste spørgsmål i borgerservice",
    description:
      "En assistent der besvarer borgernes hyppigste spørgsmål om flytning, pas, kørekort, sundhedskort og ventetider. Bygger på kommunens egne vejledninger og henviser altid til den rette selvbetjeningsløsning. Tænkt som førstelinjehjælp, der aflaster telefonerne i borgerservice.",
    originKommune: "Aarhus Kommune",
    languageModel: "llama3.1:70b",
    framework: "openwebui",
    dataSensitivity: "almindelige",
    approvedFor: ["almindelige"],
    tags: ["borgerservice", "faq", "selvbetjening", "førstelinje"],
    aiTags: ["selvbetjening"],
    createdAt: "2025-01-14",
    updatedAt: "2025-04-02",
    readme:
      "# Borgerservice FAQ-assistent\n\nDenne assistent er udviklet af AarhusAI til at besvare borgernes hyppigste henvendelser.\n\nAssistenten er trænet til at:\n- svare i et letforståeligt sprog\n- altid henvise til den korrekte selvbetjeningsløsning\n- afvise spørgsmål den ikke har dækning for, frem for at gætte\n\nDen erstatter ikke sagsbehandling, men hjælper borgeren videre til rette sted.",
    modelCard:
      "Sprogmodel: Llama 3.1 70B (lokal via OWUI).\nKontekstvindue: 8192 tokens.\nTemperatur: 0.3 (lav, for konsistente svar).\n\nHensyn:\n- Assistenten må ikke træffe afgørelser eller love sagsbehandlingstider.\n- Svar bør altid ledsages af et link til officiel selvbetjening.\n- Modellen kan hallucinere ved spørgsmål uden for vidensgrundlaget; system-prompten beder den henvise til en medarbejder i tvivlstilfælde.",
    knowledgeRecipe:
      "1. Eksportér alle aktive FAQ-artikler fra kommunens hjemmeside som PDF eller Markdown.\n2. Saml gældende vejledninger om flytning, pas, kørekort og sundhedskort i én mappe.\n3. Tilføj en oversigt over lokale åbningstider og kontaktinformation.\n4. Upload filerne som en Knowledge-collection i OpenWebUI med navnet \"Borgerservice\".\n5. Opdatér samlingen kvartalsvist, så svarene følger gældende regler.",
    versions: [
      {
        version: "1.3.0",
        releasedAt: "2025-04-02",
        notes: "Tilføjet håndtering af spørgsmål om sundhedskort og opdateret system-prompt.",
        json: {
          id: "borgerservice-faq",
          name: "Borgerservice FAQ-assistent",
          object: "model",
          base_model_id: "llama3.1:70b",
          meta: {
            description: "Besvarer hyppige borgerhenvendelser i borgerservice.",
            capabilities: { vision: false, citations: true },
            tags: [{ name: "borgerservice" }, { name: "faq" }]
          },
          params: {
            system: "Du er en hjælpsom assistent for borgerservice i Aarhus Kommune. Svar kort og letforståeligt, og henvis altid til den rette selvbetjeningsløsning. Er du i tvivl, så bed borgeren kontakte en medarbejder.",
            temperature: 0.3,
            top_p: 0.9,
            num_ctx: 8192
          },
          knowledge: [
            { name: "Borgerservice", type: "collection", note: "Leveres lokalt af den enkelte kommune" }
          ]
        }
      },
      {
        version: "1.0.0",
        releasedAt: "2025-01-14",
        notes: "Første version delt med kommunenetværket.",
        json: {
          id: "borgerservice-faq",
          name: "Borgerservice FAQ-assistent",
          object: "model",
          base_model_id: "llama3.1:70b",
          meta: {
            description: "Besvarer hyppige borgerhenvendelser.",
            capabilities: { vision: false, citations: true },
            tags: [{ name: "borgerservice" }]
          },
          params: {
            system: "Du er en hjælpsom assistent for borgerservice. Henvis til selvbetjening hvor muligt.",
            temperature: 0.3,
            top_p: 0.9,
            num_ctx: 8192
          },
          knowledge: [
            { name: "Borgerservice", type: "collection", note: "Leveres lokalt af den enkelte kommune" }
          ]
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  },

  {
    id: "seed-002",
    name: "Sagsbehandler-medhjælper til byggesager",
    tagline: "Hjælper byggesagsbehandlere med at finde regler og fortilfælde",
    description:
      "En assistent til byggesagsbehandlere, der hurtigt finder relevante bestemmelser i bygningsreglementet, lokalplaner og kommunens egne vejledninger. Den opsummerer komplekse sager og foreslår, hvilke forhold der skal vurderes. Mennesket træffer altid den endelige afgørelse.",
    originKommune: "Aarhus Kommune",
    languageModel: "gpt-4o",
    framework: "openwebui",
    dataSensitivity: "fortrolige",
    approvedFor: ["almindelige", "fortrolige"],
    tags: ["byggesag", "sagsbehandling", "bygningsreglement", "lokalplan"],
    aiTags: ["fortilfælde"],
    createdAt: "2025-02-20",
    updatedAt: "2025-05-09",
    readme:
      "# Sagsbehandler-medhjælper til byggesager\n\nUnderstøtter byggesagsbehandlere i at navigere i bygningsreglement, lokalplaner og praksis.\n\nAssistenten:\n- finder og citerer relevante bestemmelser\n- opsummerer indkomne ansøgninger\n- peger på forhold, der kræver nærmere vurdering\n\nAfgørelser træffes altid af en sagsbehandler. Assistenten er et opslagsværktøj, ikke en beslutningsmaskine.",
    modelCard:
      "Sprogmodel: GPT-4o (kan køres mod lokal eller hostet endpoint via OWUI).\nKontekstvindue: 16384 tokens.\nTemperatur: 0.2.\n\nHensyn:\n- Sager kan indeholde fortrolige oplysninger; assistenten må kun anvendes i godkendt miljø.\n- Citater skal verificeres mod den autoritative kilde inden brug i afgørelser.\n- Vidensgrundlaget skal holdes opdateret ved ændringer i bygningsreglementet.",
    knowledgeRecipe:
      "1. Eksportér gældende bygningsreglement og relevante BR-vejledninger som PDF.\n2. Saml kommunens egne byggesagsvejledninger og standardsvar.\n3. Tilføj de lokalplaner, der oftest er i spil i jeres kommune.\n4. Upload som Knowledge-collection \"Byggesag\" i OpenWebUI.\n5. Markér dokumenter med ikrafttrædelsesdato, så assistenten kan skelne mellem gældende og historisk praksis.",
    versions: [
      {
        version: "2.1.0",
        releasedAt: "2025-05-09",
        notes: "Udvidet kontekstvindue og bedre citatformat.",
        json: {
          id: "byggesag-medhjaelper",
          name: "Sagsbehandler-medhjælper til byggesager",
          object: "model",
          base_model_id: "gpt-4o",
          meta: {
            description: "Opslag i bygningsreglement og lokalplaner for byggesagsbehandlere.",
            capabilities: { vision: false, citations: true },
            tags: [{ name: "byggesag" }, { name: "sagsbehandling" }]
          },
          params: {
            system: "Du er en faglig medhjælper for byggesagsbehandlere i Aarhus Kommune. Find og citér relevante bestemmelser præcist med kildehenvisning. Træf aldrig afgørelser — peg på forhold der skal vurderes af en sagsbehandler.",
            temperature: 0.2,
            top_p: 0.9,
            num_ctx: 16384
          },
          knowledge: [
            { name: "Byggesag", type: "collection", note: "Leveres lokalt af den enkelte kommune" }
          ]
        }
      },
      {
        version: "2.0.0",
        releasedAt: "2025-02-20",
        notes: "Skiftet basismodel til GPT-4o.",
        json: {
          id: "byggesag-medhjaelper",
          name: "Sagsbehandler-medhjælper til byggesager",
          object: "model",
          base_model_id: "gpt-4o",
          meta: {
            description: "Opslag i bygningsreglement for byggesagsbehandlere.",
            capabilities: { vision: false, citations: true },
            tags: [{ name: "byggesag" }]
          },
          params: {
            system: "Du er en faglig medhjælper for byggesagsbehandlere. Citér kilder og træf ingen afgørelser.",
            temperature: 0.2,
            top_p: 0.9,
            num_ctx: 8192
          },
          knowledge: [
            { name: "Byggesag", type: "collection", note: "Leveres lokalt af den enkelte kommune" }
          ]
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  },

  {
    id: "seed-003",
    name: "Referat-opsummering til møder",
    tagline: "Laver strukturerede referater og handlepunkter fra mødenoter",
    description:
      "Indsæt rå mødenoter eller en transskription, og assistenten leverer et struktureret referat med beslutninger, handlepunkter og ansvarlige. Velegnet til udvalgsmøder, projektmøder og personalemøder.",
    originKommune: "Odense Kommune",
    languageModel: "mistral-large",
    framework: "openwebui",
    dataSensitivity: "fortrolige",
    approvedFor: ["almindelige", "fortrolige"],
    tags: ["referat", "møder", "opsummering", "produktivitet"],
    aiTags: ["handlepunkter"],
    createdAt: "2025-03-01",
    updatedAt: "2025-03-28",
    readme:
      "# Referat-opsummering\n\nForvandler rå mødenoter til et struktureret referat.\n\nOutput indeholder fast:\n- Deltagere (hvis nævnt)\n- Beslutninger\n- Handlepunkter med ansvarlig og frist\n- Åbne spørgsmål\n\nKontrollér altid referatet inden udsendelse — assistenten kan misforstå forkortelser og uformelt sprog.",
    modelCard:
      "Sprogmodel: Mistral Large (lokal via OWUI).\nKontekstvindue: 32768 tokens (rummer lange transskriptioner).\nTemperatur: 0.4.\n\nHensyn:\n- Mødenoter kan indeholde personoplysninger om medarbejdere; brug kun i godkendt miljø.\n- Assistenten gætter ikke på navne den ikke er givet.\n- Lange møder bør deles op, hvis de overstiger kontekstvinduet.",
    knowledgeRecipe:
      "Denne assistent kræver ikke et fast vidensgrundlag — den arbejder på den tekst, du indsætter.\n\n1. Indsæt rå noter eller transskription i chatten.\n2. (Valgfrit) Tilføj en skabelon for jeres referatformat som Knowledge-fil, hvis I ønsker et bestemt layout.\n3. Bed eventuelt om referat på letlæst dansk til bred udsendelse.",
    versions: [
      {
        version: "1.1.0",
        releasedAt: "2025-03-28",
        notes: "Tilføjet fast sektion for åbne spørgsmål.",
        json: {
          id: "referat-opsummering",
          name: "Referat-opsummering til møder",
          object: "model",
          base_model_id: "mistral-large",
          meta: {
            description: "Laver strukturerede referater fra mødenoter.",
            capabilities: { vision: false, citations: false },
            tags: [{ name: "referat" }, { name: "møder" }]
          },
          params: {
            system: "Du opsummerer mødenoter til et struktureret referat med deltagere, beslutninger, handlepunkter (ansvarlig + frist) og åbne spørgsmål. Gæt ikke på navne eller beslutninger der ikke fremgår.",
            temperature: 0.4,
            top_p: 0.9,
            num_ctx: 32768
          },
          knowledge: []
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  },

  {
    id: "seed-004",
    name: "Journaliseringshjælp",
    tagline: "Foreslår journalnummer, titel og emneord ved journalisering",
    description:
      "Hjælper medarbejdere med at journalisere korrekt i ESDH. Ud fra et dokuments indhold foreslår assistenten sagstitel, relevant journalplan-kode og emneord, så journaliseringen bliver ensartet på tværs af afdelinger.",
    originKommune: "Aalborg Kommune",
    languageModel: "gemma2:27b",
    framework: "openwebui",
    dataSensitivity: "fortrolige",
    approvedFor: ["almindelige", "fortrolige"],
    tags: ["journalisering", "esdh", "arkiv", "sagsstyring"],
    aiTags: ["journalplan"],
    createdAt: "2025-01-30",
    updatedAt: "2025-04-18",
    readme:
      "# Journaliseringshjælp\n\nGiver forslag til journalisering ud fra et dokuments indhold.\n\nAssistenten foreslår:\n- sagstitel\n- journalplan-kode\n- emneord\n\nForslagene skal godkendes af medarbejderen inden journalisering. Den endelige journalplan er kommunens ansvar.",
    modelCard:
      "Sprogmodel: Gemma 2 27B (lokal via OWUI).\nKontekstvindue: 8192 tokens.\nTemperatur: 0.2.\n\nHensyn:\n- Dokumenter kan være fortrolige; kør kun i godkendt lokalt miljø.\n- Journalplan-koder skal matche kommunens egen plan — derfor leveres planen som lokalt vidensgrundlag.",
    knowledgeRecipe:
      "1. Eksportér kommunens journalplan (KL-emnesystematik eller lokal variant) som struktureret fil (CSV/Markdown).\n2. Tilføj eksempler på korrekt journaliserede sager som referencer.\n3. Upload som Knowledge-collection \"Journalplan\" i OpenWebUI.\n4. Opdatér ved ændringer i journalplanen.",
    versions: [
      {
        version: "1.2.0",
        releasedAt: "2025-04-18",
        notes: "Bedre forslag til emneord og kortere sagstitler.",
        json: {
          id: "journaliseringshjaelp",
          name: "Journaliseringshjælp",
          object: "model",
          base_model_id: "gemma2:27b",
          meta: {
            description: "Foreslår sagstitel, journalplan-kode og emneord.",
            capabilities: { vision: false, citations: true },
            tags: [{ name: "journalisering" }, { name: "esdh" }]
          },
          params: {
            system: "Du foreslår journalisering: sagstitel, journalplan-kode og emneord ud fra dokumentets indhold. Brug kun koder fra den vedlagte journalplan. Forslag skal godkendes af en medarbejder.",
            temperature: 0.2,
            top_p: 0.9,
            num_ctx: 8192
          },
          knowledge: [
            { name: "Journalplan", type: "collection", note: "Leveres lokalt af den enkelte kommune" }
          ]
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  },

  {
    id: "seed-005",
    name: "Aktindsigt-screening",
    tagline: "Markerer mulige undtagelser i dokumenter til aktindsigt",
    description:
      "Gennemgår dokumenter forud for aktindsigt og markerer passager, der kan være omfattet af undtagelser i offentlighedsloven — fx personoplysninger, interne arbejdsdokumenter eller forretningshemmeligheder. Et menneske foretager den endelige vurdering og overstregning.",
    originKommune: "Vejle Kommune",
    languageModel: "llama3.1:70b",
    framework: "openwebui",
    dataSensitivity: "personfoelsomme",
    approvedFor: ["almindelige", "fortrolige", "personfoelsomme"],
    tags: ["aktindsigt", "offentlighedsloven", "screening", "gdpr"],
    aiTags: ["undtagelser"],
    createdAt: "2025-02-11",
    updatedAt: "2025-05-15",
    readme:
      "# Aktindsigt-screening\n\nStøtter sagsbehandlere i at forberede aktindsigt.\n\nAssistenten markerer mulige undtagelser, men:\n- foretager ikke selv overstregning\n- erstatter ikke den juridiske vurdering\n- skal altid efterprøves af en medarbejder\n\nFormålet er at spare tid på den indledende gennemgang.",
    modelCard:
      "Sprogmodel: Llama 3.1 70B (lokal via OWUI).\nKontekstvindue: 16384 tokens.\nTemperatur: 0.1 (meget lav — forsigtige, konservative forslag).\n\nHensyn:\n- Dokumenterne kan indeholde personfølsomme oplysninger; må kun køres i fuldt isoleret, godkendt miljø.\n- Assistenten skal hellere markere for meget end for lidt; den endelige afgørelse er altid menneskelig.\n- Falske negativer er en risiko — brug aldrig outputtet ukritisk.",
    knowledgeRecipe:
      "1. Saml kommunens interne vejledning om aktindsigt og relevante afgørelser.\n2. Tilføj en oversigt over typiske undtagelsesgrunde med eksempler.\n3. Upload som Knowledge-collection \"Aktindsigt\".\n4. Det konkrete dokument til screening indsættes i chatten — det skal IKKE gemmes i vidensgrundlaget.",
    versions: [
      {
        version: "1.4.0",
        releasedAt: "2025-05-15",
        notes: "Mere konservativ markering og henvisning til paragraf.",
        json: {
          id: "aktindsigt-screening",
          name: "Aktindsigt-screening",
          object: "model",
          base_model_id: "llama3.1:70b",
          meta: {
            description: "Markerer mulige undtagelser i dokumenter til aktindsigt.",
            capabilities: { vision: false, citations: true },
            tags: [{ name: "aktindsigt" }, { name: "offentlighedsloven" }]
          },
          params: {
            system: "Du screener dokumenter til aktindsigt. Markér passager der kan være omfattet af undtagelser i offentlighedsloven, og henvis til den mulige paragraf. Foretag aldrig selv overstregning; en medarbejder træffer den endelige afgørelse.",
            temperature: 0.1,
            top_p: 0.9,
            num_ctx: 16384
          },
          knowledge: [
            { name: "Aktindsigt", type: "collection", note: "Leveres lokalt af den enkelte kommune" }
          ]
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  },

  {
    id: "seed-006",
    name: "Jobcenter-vejleder",
    tagline: "Vejleder om beskæftigelsesindsatser og krav til ledige",
    description:
      "Hjælper jobcentermedarbejdere og vejledere med at finde de rette beskæftigelsestilbud, frister og rådighedskrav. Assistenten forklarer reglerne i et klart sprog og henviser til den relevante lovgivning.",
    originKommune: "Randers Kommune",
    languageModel: "mistral-large",
    framework: "openwebui",
    dataSensitivity: "fortrolige",
    approvedFor: ["almindelige", "fortrolige"],
    tags: ["jobcenter", "beskæftigelse", "vejledning", "lab-loven"],
    aiTags: ["rådighed"],
    createdAt: "2025-03-12",
    updatedAt: "2025-04-25",
    readme:
      "# Jobcenter-vejleder\n\nGiver overblik over beskæftigelsesindsatser, frister og rådighedskrav.\n\nAssistenten:\n- forklarer regler i klart sprog\n- henviser til relevant lovgivning (fx LAB-loven)\n- foreslår relevante tilbud ud fra en situationsbeskrivelse\n\nDen erstatter ikke en konkret afgørelse.",
    modelCard:
      "Sprogmodel: Mistral Large (lokal via OWUI).\nKontekstvindue: 16384 tokens.\nTemperatur: 0.3.\n\nHensyn:\n- Borgersager kan indeholde fortrolige oplysninger; anonymisér før indsættelse hvor muligt.\n- Lovgrundlaget ændres ofte — hold vidensgrundlaget opdateret.",
    knowledgeRecipe:
      "1. Eksportér gældende vejledninger om beskæftigelsesindsatsen (LAB) og rådighedskrav.\n2. Tilføj kommunens egne tilbudskataloger og kontaktoplysninger.\n3. Upload som Knowledge-collection \"Beskæftigelse\".\n4. Opdatér ved lovændringer.",
    versions: [
      {
        version: "1.0.0",
        releasedAt: "2025-04-25",
        notes: "Første offentlige version.",
        json: {
          id: "jobcenter-vejleder",
          name: "Jobcenter-vejleder",
          object: "model",
          base_model_id: "mistral-large",
          meta: {
            description: "Vejleder om beskæftigelsesindsatser og rådighedskrav.",
            capabilities: { vision: false, citations: true },
            tags: [{ name: "jobcenter" }, { name: "beskæftigelse" }]
          },
          params: {
            system: "Du vejleder jobcentermedarbejdere om beskæftigelsesindsatser, frister og rådighedskrav. Forklar reglerne klart og henvis til lovgrundlaget. Du træffer ikke afgørelser.",
            temperature: 0.3,
            top_p: 0.9,
            num_ctx: 16384
          },
          knowledge: [
            { name: "Beskæftigelse", type: "collection", note: "Leveres lokalt af den enkelte kommune" }
          ]
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  },

  {
    id: "seed-007",
    name: "Forældrekommunikation i dagtilbud",
    tagline: "Hjælper pædagoger med klare beskeder til forældre",
    description:
      "Hjælper personale i dagtilbud med at formulere venlige og klare beskeder til forældre — om udflugter, sygdom, arrangementer og praktiske forhold. Kan oversætte beskeder til letlæst dansk og flere sprog.",
    originKommune: "Esbjerg Kommune",
    languageModel: "gemma2:27b",
    framework: "openwebui",
    dataSensitivity: "almindelige",
    approvedFor: ["almindelige"],
    tags: ["dagtilbud", "kommunikation", "forældre", "skole"],
    aiTags: ["letlæst"],
    createdAt: "2025-02-28",
    updatedAt: "2025-03-30",
    readme:
      "# Forældrekommunikation i dagtilbud\n\nStøtter personalet i at skrive klare beskeder til forældre.\n\nAssistenten:\n- formulerer venlige, korte beskeder\n- kan oversætte til letlæst dansk\n- kan oversætte til udvalgte sprog\n\nUndgå at indsætte oplysninger om enkelte børn — hold beskederne generelle.",
    modelCard:
      "Sprogmodel: Gemma 2 27B (lokal via OWUI).\nKontekstvindue: 8192 tokens.\nTemperatur: 0.6 (lidt højere for naturligt sprog).\n\nHensyn:\n- Beskeder bør ikke indeholde personhenførbare oplysninger om enkelte børn.\n- Oversættelser bør kontrolleres ved vigtige beskeder.",
    knowledgeRecipe:
      "1. (Valgfrit) Saml institutionens standardbeskeder og tone-of-voice som Knowledge-fil.\n2. Upload som collection \"Dagtilbud\" hvis I vil have ensartet sprog.\n3. Ellers fungerer assistenten direkte på den tekst, du indsætter.",
    versions: [
      {
        version: "1.0.0",
        releasedAt: "2025-03-30",
        notes: "Første version med oversættelse til letlæst dansk.",
        json: {
          id: "dagtilbud-foraeldrekommunikation",
          name: "Forældrekommunikation i dagtilbud",
          object: "model",
          base_model_id: "gemma2:27b",
          meta: {
            description: "Hjælper pædagoger med klare beskeder til forældre.",
            capabilities: { vision: false, citations: false },
            tags: [{ name: "dagtilbud" }, { name: "kommunikation" }]
          },
          params: {
            system: "Du hjælper personale i dagtilbud med at skrive venlige, korte og klare beskeder til forældre. Undgå personhenførbare oplysninger om enkelte børn. Tilbyd at oversætte til letlæst dansk.",
            temperature: 0.6,
            top_p: 0.9,
            num_ctx: 8192
          },
          knowledge: []
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  },

  {
    id: "seed-008",
    name: "Oversæt til letlæst dansk",
    tagline: "Gør komplekse myndighedstekster lette at forstå",
    description:
      "Omskriver komplekse myndighedstekster — afgørelser, breve og vejledninger — til letlæst dansk uden at ændre indholdet. Velegnet til breve, der skal forstås af alle borgere.",
    originKommune: "Gentofte Kommune",
    languageModel: "gpt-4o",
    framework: "openwebui",
    dataSensitivity: "almindelige",
    approvedFor: ["almindelige"],
    tags: ["letlæst", "oversættelse", "tilgængelighed", "kommunikation"],
    aiTags: ["sprogforenkling"],
    createdAt: "2025-01-08",
    updatedAt: "2025-04-10",
    readme:
      "# Oversæt til letlæst dansk\n\nOmskriver tekster til letlæst dansk uden at ændre betydningen.\n\nAssistenten:\n- bruger korte sætninger og almindelige ord\n- bevarer det faglige indhold\n- markerer hvis et begreb ikke kan forenkles uden at miste mening\n\nKontrollér altid den omskrevne tekst, særligt ved afgørelser.",
    modelCard:
      "Sprogmodel: GPT-4o.\nKontekstvindue: 16384 tokens.\nTemperatur: 0.3.\n\nHensyn:\n- Forenkling må ikke ændre den juridiske betydning af en afgørelse.\n- Personoplysninger i indsat tekst behandles fortroligt og bør anonymiseres hvor muligt.",
    knowledgeRecipe:
      "Kræver ikke fast vidensgrundlag.\n\n1. Indsæt teksten der skal forenkles.\n2. (Valgfrit) Tilføj kommunens sprogpolitik som Knowledge-fil, så stilen bliver ensartet.",
    versions: [
      {
        version: "1.2.0",
        releasedAt: "2025-04-10",
        notes: "Bedre bevarelse af juridisk betydning.",
        json: {
          id: "letlaest-dansk",
          name: "Oversæt til letlæst dansk",
          object: "model",
          base_model_id: "gpt-4o",
          meta: {
            description: "Omskriver myndighedstekster til letlæst dansk.",
            capabilities: { vision: false, citations: false },
            tags: [{ name: "letlæst" }, { name: "tilgængelighed" }]
          },
          params: {
            system: "Du omskriver myndighedstekster til letlæst dansk med korte sætninger og almindelige ord, uden at ændre betydningen. Markér hvis et begreb ikke kan forenkles uden tab af mening.",
            temperature: 0.3,
            top_p: 0.9,
            num_ctx: 16384
          },
          knowledge: []
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  },

  {
    id: "seed-009",
    name: "Mødebooking-assistent",
    tagline: "Finder ledige tider og udkast til mødeindkaldelser",
    description:
      "Hjælper medarbejdere med at planlægge møder: foreslår mødetidspunkter ud fra beskrevne begrænsninger og skriver et udkast til en mødeindkaldelse med dagsorden. Integrerer ikke med kalenderen — den arbejder på de oplysninger, du giver.",
    originKommune: "Odense Kommune",
    languageModel: "gemma2:27b",
    framework: "openwebui",
    dataSensitivity: "almindelige",
    approvedFor: ["almindelige"],
    tags: ["møder", "planlægning", "produktivitet", "kommunikation"],
    aiTags: ["dagsorden"],
    createdAt: "2025-03-18",
    updatedAt: "2025-03-18",
    readme:
      "# Mødebooking-assistent\n\nHjælper med at planlægge møder og skrive indkaldelser.\n\nAssistenten:\n- foreslår mødetidspunkter ud fra dine begrænsninger\n- skriver et udkast til indkaldelse med dagsorden\n\nDen har ikke adgang til din kalender — du oplyser selv ledige tider.",
    modelCard:
      "Sprogmodel: Gemma 2 27B (lokal via OWUI).\nKontekstvindue: 8192 tokens.\nTemperatur: 0.5.\n\nHensyn:\n- Ingen kalenderintegration; assistenten arbejder kun på de oplysninger, du indtaster.\n- Undgå at indsætte fortrolige deltageroplysninger.",
    knowledgeRecipe:
      "Kræver ikke fast vidensgrundlag.\n\n1. Beskriv deltagere, varighed og dine ledige tider.\n2. (Valgfrit) Tilføj en standard dagsorden-skabelon som Knowledge-fil.",
    versions: [
      {
        version: "0.9.0",
        releasedAt: "2025-03-18",
        notes: "Beta — deles til feedback fra netværket.",
        json: {
          id: "moedebooking",
          name: "Mødebooking-assistent",
          object: "model",
          base_model_id: "gemma2:27b",
          meta: {
            description: "Foreslår mødetider og skriver indkaldelser.",
            capabilities: { vision: false, citations: false },
            tags: [{ name: "møder" }, { name: "planlægning" }]
          },
          params: {
            system: "Du hjælper med at planlægge møder. Foreslå tidspunkter ud fra de oplyste begrænsninger og skriv et udkast til en mødeindkaldelse med dagsorden. Du har ingen kalenderadgang.",
            temperature: 0.5,
            top_p: 0.9,
            num_ctx: 8192
          },
          knowledge: []
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  },

  {
    id: "seed-010",
    name: "Tilskuds- og puljevejleder",
    tagline: "Hjælper foreninger og borgere med at finde rette pulje",
    description:
      "Vejleder borgere og foreninger om kommunens tilskuds- og puljemuligheder. Ud fra en beskrivelse af et projekt foreslår assistenten relevante puljer, ansøgningsfrister og krav til ansøgningen.",
    originKommune: "Aalborg Kommune",
    languageModel: "llama3.1:70b",
    framework: "openwebui",
    dataSensitivity: "almindelige",
    approvedFor: ["almindelige"],
    tags: ["tilskud", "puljer", "foreninger", "borgerservice"],
    aiTags: ["ansøgningsfrist"],
    createdAt: "2025-04-01",
    updatedAt: "2025-05-02",
    readme:
      "# Tilskuds- og puljevejleder\n\nHjælper borgere og foreninger med at finde den rette pulje.\n\nAssistenten:\n- foreslår relevante puljer ud fra projektbeskrivelsen\n- oplyser frister og krav\n- henviser til ansøgningsportalen\n\nDen behandler ikke ansøgninger og kan ikke love bevilling.",
    modelCard:
      "Sprogmodel: Llama 3.1 70B (lokal via OWUI).\nKontekstvindue: 8192 tokens.\nTemperatur: 0.3.\n\nHensyn:\n- Puljer og frister ændrer sig løbende — hold vidensgrundlaget opdateret.\n- Assistenten må ikke love bevilling eller foregribe en vurdering.",
    knowledgeRecipe:
      "1. Saml en oversigt over kommunens aktuelle puljer med formål, frister og krav.\n2. Tilføj links til de relevante ansøgningsportaler.\n3. Upload som Knowledge-collection \"Puljer\".\n4. Opdatér mindst hvert kvartal, da frister skifter.",
    versions: [
      {
        version: "1.0.0",
        releasedAt: "2025-05-02",
        notes: "Første offentlige version.",
        json: {
          id: "puljevejleder",
          name: "Tilskuds- og puljevejleder",
          object: "model",
          base_model_id: "llama3.1:70b",
          meta: {
            description: "Vejleder om kommunens tilskuds- og puljemuligheder.",
            capabilities: { vision: false, citations: true },
            tags: [{ name: "tilskud" }, { name: "puljer" }]
          },
          params: {
            system: "Du vejleder borgere og foreninger om kommunens puljer. Foreslå relevante puljer ud fra projektbeskrivelsen, og oplys frister og krav. Lov aldrig bevilling.",
            temperature: 0.3,
            top_p: 0.9,
            num_ctx: 8192
          },
          knowledge: [
            { name: "Puljer", type: "collection", note: "Leveres lokalt af den enkelte kommune" }
          ]
        }
      }
    ],
    uploadedBy: null,
    source: "seed"
  }
];
