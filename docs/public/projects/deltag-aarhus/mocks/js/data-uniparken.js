window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;
DM.datasets = DM.datasets || {};

/* ==========================================================================
   Mock Data — Solceller i Universitetsparken

   Registered before data.js so the generator can pick it up when
   DM.config.dataset === "uniparken".
   ========================================================================== */

DM.datasets.uniparken = {
  staticItems: [
    {
      id: 1,
      title: "Universitetsparken er kulturarv — solceller hører ikke til her",
      description: "Universitetsparken er tegnet af C.F. Møller som en sammenhængende komposition af bygninger og landskab. At lægge et industrielt solcelleanlæg ind på fællesplænen vil ødelægge en af Danmarks bedst bevarede modernistiske parker.",
      fullDescription: "Universitetsparken er tegnet af C.F. Møller som en sammenhængende komposition af bygninger og landskab. At lægge et industrielt solcelleanlæg ind på fællesplænen vil ødelægge en af Danmarks bedst bevarede modernistiske parker.\n\nParkens åbne, bølgende grønne flader er en bevidst arkitektonisk gestus — de er ikke ubrugt jord, der bare ligger og venter på at blive 'aktiveret'. Bygninger og park hører sammen som ét værk.\n\nVi opfordrer Aarhus Kommune til at undersøge alternative placeringer, fx tagene på de mange universitets- og hospitalsbygninger i området, før man indgreb i en fredningsværdig helhed.",
      author: "Marie Holm",
      date: "20. juni 2026",
      comments: 18,
      likes: 142,
      category: "landskab",
      commentsList: [
        { author: "Anders Berg", date: "21. jun 2026", text: "C.F. Møllers tegninger viser tydeligt at plænen er en del af kompositionen — ikke en restplads." },
        { author: "Sofie Gram", date: "21. jun 2026", text: "Akademiraadet bør udtale sig før kommunen træffer beslutning." },
        { author: "Helle Storm", date: "22. jun 2026", text: "Vi har en forpligtelse over for kommende generationer til at bevare denne arv." },
        { author: "Knud Erik", date: "22. jun 2026", text: "Solceller på tagene af kollegierne giver langt mere strøm pr. m²." },
        { author: "Ruth Borg", date: "23. jun 2026", text: "Hvorfor netop her? Aarhus har masser af industrielle tage." },
        { author: "Mark Jensen", date: "23. jun 2026", text: "Den gule mursten plus de grønne kurver er Aarhus' visitkort. Lad det være." },
        { author: "Stine Brink", date: "24. jun 2026", text: "Slots- og Kulturstyrelsen bør inddrages — det her er ikke en lokal sag." },
        { author: "Tine Holm", date: "24. jun 2026", text: "Park-festen, Kapsejladsen, fredagsbarerne — alt det forsvinder hvis halvdelen af plænen lukkes inde." },
        { author: "Camilla Frost", date: "25. jun 2026", text: "Forslaget er udarbejdet uden reel dialog med universitetet. Det er uacceptabelt." },
        { author: "Karen Winther", date: "25. jun 2026", text: "Klimakampen vindes ikke ved at smadre vores fælles steder." },
        { author: "Lars Winding", date: "26. jun 2026", text: "Jeg har afleveret speciale liggende på den plæne. Det skal mine børn også kunne." },
        { author: "Mette Friis", date: "26. jun 2026", text: "Skriv under på borgerforslaget — vi skal nå 5.000 stemmer inden 22. aug." }
      ]
    },
    {
      id: 2,
      title: "Vi mister vores eneste store grønne pusterum midt i Aarhus",
      description: "Universitetsparken er for mange studerende og borgere det eneste åbne grønne areal vi har let adgang til. Et solcelleanlæg på 8 hektar vil halvere det reelt brugbare areal — for hvem vil ligge med kaffe ved siden af en transformerstation?",
      fullDescription: "Universitetsparken er for mange studerende og borgere det eneste åbne grønne areal vi har let adgang til. Et solcelleanlæg på 8 hektar vil halvere det reelt brugbare areal — for hvem vil ligge med kaffe ved siden af en transformerstation?\n\nParken er hjemsted for løb, picnic, frisbee, kapsejlads, sommerkoncerter og dagligt studieliv. Det er et af de få steder hvor universitet og by faktisk mødes som ligeværdige.\n\nKommunen skal lave en uvildig analyse af den rekreative værdi vi mister, før der træffes beslutning. Ren CO2-regnskab er ikke nok.",
      author: "Jonas Kristoffersen",
      date: "21. juni 2026",
      comments: 14,
      likes: 118,
      category: "landskab",
      commentsList: [
        { author: "Pia Lund", date: "22. jun 2026", text: "Vi har ikke en Königsallee eller en Hyde Park. Det her er det vi har." },
        { author: "Rasmus Bloch", date: "22. jun 2026", text: "Mental sundhed for de studerende: man kan ikke putte det i et solcelleregnskab." },
        { author: "Niels Eriksen", date: "23. jun 2026", text: "Aarhus Kommune lover \"grøn by\" i alle planer — men handler stik modsat." },
        { author: "Susanne Krog", date: "23. jun 2026", text: "Hvor skal Kapsejladsen så afholdes? På P-pladsen?" },
        { author: "Erik Bak", date: "24. jun 2026", text: "Mange ældre studerende går her dagligt. Det er stort set vores motionsrum." },
        { author: "Vibeke Frost", date: "24. jun 2026", text: "Børnefamilier i Trøjborg bruger parken som legeplads. Hvor er deres høringssvar?" },
        { author: "Jørgen Dam", date: "25. jun 2026", text: "Studieliv kræver grønt rum. Spørg en hvilken som helst psykolog." },
        { author: "Flemming Toft", date: "25. jun 2026", text: "Plænen er valgt fordi den er flad og åben — præcis det den skal blive ved at være." },
        { author: "Lone Vestergaard", date: "26. jun 2026", text: "Vi anbefaler en konsekvensanalyse på brugsværdien, ikke kun på arealet." },
        { author: "Annette Holm", date: "27. jun 2026", text: "Hvis kommunen virkelig vil have arealet aktiveret, så lav en bypark — ikke en strømproducerende mark." }
      ]
    },
    {
      id: 3,
      title: "Træfældning truer biodiversiteten i den gamle ege- og bøgelund",
      description: "Forslaget indebærer fældning af op til 60 voksne træer i den østlige del af parken. Mange af dem er over 80 år gamle og er værtsplanter for flere rødlistede insekt- og svampearter.",
      fullDescription: "Forslaget indebærer fældning af op til 60 voksne træer i den østlige del af parken. Mange af dem er over 80 år gamle og er værtsplanter for flere rødlistede insekt- og svampearter.\n\nDe gamle ege udgør et bynært refugium for arter som eghjort, almindelig flagermus og hulrugende fugle. En miljøvurdering der reelt vejer biodiversitet skal pege på, at parkens trærige zoner ikke kan kompenseres ved nyplantning på kort sigt.\n\nIfølge Aarhus Kommunes egen biodiversitetsstrategi 2030 skal store, sammenhængende grønne bynære arealer beskyttes. Forslaget strider direkte mod dette mål.",
      author: "Astrid Nørgaard",
      date: "22. juni 2026",
      comments: 11,
      likes: 96,
      category: "miljoe",
      commentsList: [
        { author: "Sven Nielsen", date: "23. jun 2026", text: "Eghjorten er fundet i parken i 2023. Det er Bilag IV-art." },
        { author: "Hanne Juhl", date: "23. jun 2026", text: "60 træer kan ikke 'erstattes' med nyplantning. Vi taler 80-100 års habitat." },
        { author: "Anders Berg", date: "24. jun 2026", text: "Der bør laves en uafhængig vurdering af træernes værdi som habitat." },
        { author: "Birgit Rasmussen", date: "24. jun 2026", text: "Aarhus' egen biodiversitetsstrategi nævner eksplicit denne type park." },
        { author: "Sofie Gram", date: "25. jun 2026", text: "Flagermusene bruger parken som ledelinje mellem Marselisborg og Risskov-skoven." },
        { author: "Per Vestergaard", date: "25. jun 2026", text: "Hulrugende fugle har det allerede svært i byen. Det her gør det værre." },
        { author: "Bo Vang", date: "26. jun 2026", text: "Hvis et privat byggeri foreslog dette, ville kommunen sige nej." },
        { author: "Camilla Thomsen", date: "26. jun 2026", text: "Vi savner en grundig kortlægning af de berørte arter." },
        { author: "Karen Winther", date: "27. jun 2026", text: "Sammenhængende grønne korridorer er afgørende. Det her bryder dem." },
        { author: "Lars Winding", date: "27. jun 2026", text: "Spørg DCE — Aarhus Universitets eget biodiversitetscenter — før der træffes beslutning." },
        { author: "Mette Friis", date: "28. jun 2026", text: "Naturklagenævnet bør have sagen forelagt. Det her er en principiel afgørelse." }
      ]
    },
    {
      id: 4,
      title: "Mikroklimaet i parken vil ændre sig markant",
      description: "Solpaneler producerer skygge på dele af plænen og ændrer jordens fugtighed og temperatur. Vandbalancen, der i dag holder de gamle træer i live, vil blive forstyrret.",
      fullDescription: "Solpaneler producerer skygge på dele af plænen og ændrer jordens fugtighed og temperatur. Vandbalancen, der i dag holder de gamle træer i live, vil blive forstyrret.\n\nDen kombinerede effekt af tørt mikroklima under panelerne, vandafstrømning fra panelrækkerne og tab af græsdække vil gøre arealet sårbart over for varme somre. Vi har allerede set i 2022 og 2024, hvor følsomme parkens jordbund er.\n\nVi anbefaler, at miljøvurderingsrapporten suppleres med en konkret hydrologisk og mikroklimatisk model, inden lokalplanen vedtages.",
      author: "Henrik Lindqvist",
      date: "23. juni 2026",
      comments: 7,
      likes: 64,
      category: "miljoe",
      commentsList: [
        { author: "Ole Mortensen", date: "24. jun 2026", text: "Vi så hvad varmebølgen 2024 gjorde ved plænen. Det her gør det værre." },
        { author: "Susanne Krog", date: "24. jun 2026", text: "Geologisk Institut ved AU kan levere en hydrologisk model — spørg dem." },
        { author: "Vibeke Frost", date: "25. jun 2026", text: "Træerne lever af regn som lander på plænen. Tag det væk, og de stresser." },
        { author: "Erik Bak", date: "25. jun 2026", text: "Solcelleanlæg på landbrugsjord viser samme problemer. Det er ikke teoretisk." },
        { author: "Camilla Frost", date: "26. jun 2026", text: "Tørt mikroklima betyder mere støvflyvning ved tørre somre — generer studerende." },
        { author: "Tine Holm", date: "26. jun 2026", text: "Hvor er den hydrologiske vurdering i miljørapporten? Jeg kan ikke finde den." },
        { author: "Helle Storm", date: "27. jun 2026", text: "Klimatilpasning og klimaprojekt på samme areal modarbejder hinanden her." }
      ]
    },
    {
      id: 5,
      title: "Klimaprojekt på det helt forkerte sted",
      description: "Lad det være sagt klart: vi ER for grøn omstilling. Men en park midt i Aarhus er ikke det rigtige sted. Aarhus Havn har 250.000 m² fladt tag — start dér, før I går i krig med vores grønne arealer.",
      fullDescription: "Lad det være sagt klart: vi ER for grøn omstilling. Men en park midt i Aarhus er ikke det rigtige sted. Aarhus Havn har 250.000 m² fladt tag — start dér, før I går i krig med vores grønne arealer.\n\nIntet sted i Aarhus' klimaplan 2030 fremgår det, at byparker skal være primær fundament for solcelleudbygning. Det er en politisk genvej for at få regnskabet til at gå op — ikke en gennemtænkt grøn strategi.\n\nVi opfordrer byrådet til at trække forslaget tilbage og udarbejde en samlet plan for tagsolceller på kommunale og private bygninger.",
      author: "Frederik Søndergaard",
      date: "24. juni 2026",
      comments: 22,
      likes: 187,
      category: "proces",
      commentsList: [
        { author: "Jørgen Dam", date: "25. jun 2026", text: "Lige præcis. Tagene først — så snakker vi om det åbne land." },
        { author: "Pia Lund", date: "25. jun 2026", text: "Hvorfor ikke parkeringspladserne ved Skejby? Overdækning med solceller dér." },
        { author: "Rasmus Bloch", date: "26. jun 2026", text: "Det er det letteste sted at få et hurtigt CO2-tal til en politisk plan. Ikke det smarteste." },
        { author: "Knud Erik", date: "26. jun 2026", text: "Aarhus Havn har plads. Start dér." },
        { author: "Stine Brink", date: "27. jun 2026", text: "Energinet kan oplyse om kapacitet på industritage. Det er udnyttet langt under potentiale." },
        { author: "Anne Larsen", date: "27. jun 2026", text: "Vi havde gerne stemt for et reelt grønt forslag. Det her er ikke det." },
        { author: "Karl Sørensen", date: "28. jun 2026", text: "I 2024 godkendte Aarhus Havn tagsolceller på 12.000 m². Tag dér, ikke vores park." },
        { author: "Rikke Holm", date: "28. jun 2026", text: "Vi savner en samlet kommunal solcelleplan, ikke et enkelt projekt taget ud af blå luft." },
        { author: "Søren Dahl", date: "29. jun 2026", text: "Klimaplaner skal være holistiske — ikke spise vores eneste store grønne plads." }
      ]
    },
    {
      id: 6,
      title: "Refleksioner fra panelerne vil genere studerende i auditorierne",
      description: "Glasoverflader på solceller giver blænding mod syd-vendte vinduer. Auditorierne i bygning 1410-1414 har netop store glasfacader. Hvad er konsekvensen for forelæsninger, eksaminer og laboratoriearbejde?",
      fullDescription: "Glasoverflader på solceller giver blænding mod syd-vendte vinduer. Auditorierne i bygning 1410-1414 har netop store glasfacader. Hvad er konsekvensen for forelæsninger, eksaminer og laboratoriearbejde?\n\nFra Tyskland og Holland er der velkendte sager om solcelleanlæg ved skoler hvor lysrefleksioner har gjort lokaler ubrugelige i eftermiddagstimerne. Det er ikke en teoretisk gene.\n\nMiljøvurderingsrapporten skal som minimum indeholde en refleksionsanalyse pr. årstid og en plan for afværgeforanstaltninger.",
      author: "Mathilde Bach",
      date: "25. juni 2026",
      comments: 6,
      likes: 53,
      category: "stoej",
      commentsList: [
        { author: "Mette Friis", date: "26. jun 2026", text: "Jeg har auditorium 1410 dagligt. Blænding er reelt problem i forvejen om eftermiddagen." },
        { author: "Ole Mortensen", date: "26. jun 2026", text: "Anti-reflektive belægninger findes — men der er ingen krav om dem i forslaget." },
        { author: "Lone Vestergaard", date: "27. jun 2026", text: "Eksaminer i juni og august: præcis når solen står lavt og refleksionerne er værst." },
        { author: "Annette Holm", date: "27. jun 2026", text: "Glasfacader er en del af parkens arkitektur — de skal beskyttes mod blænding." },
        { author: "Karsten Lund", date: "28. jun 2026", text: "Spørg arbejdsmiljøtilsynet om grænseværdier for genskin i klasselokaler." },
        { author: "Mark Jensen", date: "29. jun 2026", text: "Hverken AU eller kommunen har forelagt en blændings-analyse — det burde være minimum." }
      ]
    },
    {
      id: 7,
      title: "Aarhus Universitet er ikke kommunens energiselskab",
      description: "Universitetsparken ejes ikke af Aarhus Kommune — den ejes af Aarhus Universitet. Forslaget forudsætter en arealoverdragelse eller lejeaftale, som ikke er behandlet offentligt. Hvilke aftaler ligger bag forslaget?",
      fullDescription: "Universitetsparken ejes ikke af Aarhus Kommune — den ejes af Aarhus Universitet. Forslaget forudsætter en arealoverdragelse eller lejeaftale, som ikke er behandlet offentligt. Hvilke aftaler ligger bag forslaget?\n\nDet er principielt problematisk hvis en kommune kan lave en lokalplan på et statsligt ejet, men kulturelt fælles areal uden fuld offentlig drøftelse af ejendomsforhold og lejeforhold. Universitetet skal beskytte sine kerneopgaver — forskning og uddannelse — frem for at agere energiselskab.\n\nUniversitetsbestyrelsen skal redegøre offentligt for hvilke betingelser, der er stillet og hvilken kompensation universitetet får. Vi har ret til at vide det.",
      author: "Lone Bjerregaard",
      date: "26. juni 2026",
      comments: 9,
      likes: 81,
      category: "proces",
      commentsList: [
        { author: "Niels Eriksen", date: "27. jun 2026", text: "Hvor er aftalen mellem AU og kommunen? Aktindsigt nu." },
        { author: "Susanne Krog", date: "27. jun 2026", text: "Forventer fuld offentlighed om økonomien. Ellers er det udemokratisk." },
        { author: "Erik Bak", date: "28. jun 2026", text: "AU's bestyrelse skylder de studerende en forklaring." },
        { author: "Pia Lund", date: "28. jun 2026", text: "Hvilken kompensation får universitetet? Det fremgår ingen steder." },
        { author: "Rasmus Bloch", date: "29. jun 2026", text: "Hvis det er et godt projekt, så stå ved aftalerne i fuldt dagslys." },
        { author: "Karl Sørensen", date: "29. jun 2026", text: "Studenterrådet og Akademisk Råd skal høres formelt — det er sket?" },
        { author: "Henrik Berg", date: "30. jun 2026", text: "Spørg uddannelses- og forskningsministeriet — det er statslig grund." },
        { author: "Tine Holm", date: "30. jun 2026", text: "Jeg har bedt om aktindsigt 2 gange — svar mangler stadig." },
        { author: "Bo Vang", date: "1. jul 2026", text: "Det her er kernen i sagen. Ingen aftale = ingen lokalplan." }
      ]
    },
    {
      id: 8,
      title: "Park-festen, Kapsejladsen og Stakladen-events bliver umulige",
      description: "Universitetsparken er ramme for Park-festen, Kapsejladsen, fakultets-arrangementer og en lang række spontane sommer-events. Med et permanent solcelleanlæg på 8 ha forsvinder det areal, der gør disse events mulige.",
      fullDescription: "Universitetsparken er ramme for Park-festen, Kapsejladsen, fakultets-arrangementer og en lang række spontane sommer-events. Med et permanent solcelleanlæg på 8 ha forsvinder det areal, der gør disse events mulige.\n\nKapsejladsen samler hvert år 25.000+ deltagere. Park-festen og fakulteternes sommerafslutninger trækker yderligere tusindvis. Disse traditioner er en del af Aarhus' identitet som universitetsby.\n\nForslaget mangler en konsekvensvurdering af arrangementer og fritidsbrug. Vi kræver at den eksisterende brug formelt anerkendes og beskyttes.",
      author: "Sebastian Reinholdt",
      date: "27. juni 2026",
      comments: 13,
      likes: 124,
      category: "landskab",
      commentsList: [
        { author: "Stine Brink", date: "28. jun 2026", text: "Kapsejladsen kan ikke flytte. Det er HER, helt fysisk." },
        { author: "Ida Kvist", date: "28. jun 2026", text: "Jeg er fra Studenterrådet. Park-festen er afgørende for studiestart." },
        { author: "Martin Rye", date: "29. jun 2026", text: "Stakladen-arrangementer bruger plænen som overløb. Det forsvinder også." },
        { author: "Gitte Skou", date: "29. jun 2026", text: "Det er en stor del af hvorfor folk vælger Aarhus som studieby." },
        { author: "Mikkel Skov", date: "30. jun 2026", text: "Sommerkoncerter, ølfest, gymnastiklab — alt forsvinder." },
        { author: "Sven Nielsen", date: "30. jun 2026", text: "Aarhus Festuge bruger også parken. Husk det." },
        { author: "Hanne Juhl", date: "1. jul 2026", text: "Min søn studerer i Aarhus dels på grund af park-livet. Det er ikke en bagatel." },
        { author: "Anders Berg", date: "1. jul 2026", text: "Det her er ikke kun studieliv — det er Aarhus' identitet." }
      ]
    },
    {
      id: 9,
      title: "Borgerinddragelsen er en skinproces",
      description: "Forslaget er sendt i 6 ugers høring i sommerferieperioden, hvor de fleste studerende — der er hovedbrugere af parken — er væk fra byen. Det er ikke borgerinddragelse, det er taktik.",
      fullDescription: "Forslaget er sendt i 6 ugers høring i sommerferieperioden, hvor de fleste studerende — der er hovedbrugere af parken — er væk fra byen. Det er ikke borgerinddragelse, det er taktik.\n\nDer er afholdt ét borgermøde — i Stakladen, kl. 17 en torsdag, med 90 minutters varighed. Mange nåede ikke at tilmelde sig. Spørgsmål om økonomi, ejendomsforhold og fredning blev afvist som 'uden for dagsordenen'.\n\nVi forlanger ny høringsperiode på minimum 12 uger, fra 1. september, og minimum tre borgermøder i forskellige tider og formater.",
      author: "Caroline Vestergaard",
      date: "28. juni 2026",
      comments: 17,
      likes: 156,
      category: "proces",
      commentsList: [
        { author: "Anne Larsen", date: "29. jun 2026", text: "Høring i sommerferien er en gammel kommunal trick. Skammeligt." },
        { author: "Jens Olsen", date: "29. jun 2026", text: "Hvorfor 6 uger og ikke 12 som principielt anbefalet?" },
        { author: "Lisa Møller", date: "30. jun 2026", text: "Borgermødet sluttede inden vi nåede at få ord om økonomien." },
        { author: "Karl Sørensen", date: "30. jun 2026", text: "Studerende, parkens hovedbrugere, har ikke været i byen i 4 af de 6 uger." },
        { author: "Rikke Holm", date: "1. jul 2026", text: "Det her er præcis hvorfor folk mister tillid til kommunale processer." },
        { author: "Dorte Kruse", date: "1. jul 2026", text: "Vi vil have ny høringsperiode efter studiestart." },
        { author: "Christian Leth", date: "2. jul 2026", text: "Aarhus Kommune har en borgerinddragelsespolitik. Det her overholder ikke den." },
        { author: "Ulla Gram", date: "2. jul 2026", text: "Skriftlige svar på borgermødet er ikke blevet udsendt. Aktindsigt er anmodet." },
        { author: "Per Vestergaard", date: "3. jul 2026", text: "Tre møder, forskellige tidspunkter — det burde være minimum." },
        { author: "Helle Storm", date: "3. jul 2026", text: "Studenterrådet bør formelt anerkendes som høringspart." }
      ]
    },
    {
      id: 10,
      title: "Cost-benefit: tage giver mere strøm med færre konsekvenser",
      description: "Et solcelleanlæg på Aarhus Havn rederitage producerer 1,7× mere kWh pr. m² fordi det ikke skygges af parkens træer. Det er ikke kun bedre for parken — det er også bedre business case.",
      fullDescription: "Et solcelleanlæg på Aarhus Havn rederitage producerer 1,7× mere kWh pr. m² fordi det ikke skygges af parkens træer. Det er ikke kun bedre for parken — det er også bedre business case.\n\nKommunens egne tal i miljørapporten viser, at panelrækkerne ved parkens østlige kant skygges i op til 3 timer om dagen i juni-august på grund af træer. Det betyder at investeringen pr. produceret kWh er væsentlig dårligere.\n\nVi opfordrer økonomiudvalget til at få lavet en uvildig sammenligning af kWh/kr på tage vs. på Universitetsparken, før byrådet stemmer.",
      author: "Peter Mortensen",
      date: "29. juni 2026",
      comments: 8,
      likes: 72,
      category: "proces",
      commentsList: [
        { author: "Jørgen Dam", date: "30. jun 2026", text: "1,7× er en stor faktor. Det ændrer hele investeringsregnskabet." },
        { author: "Pia Lund", date: "30. jun 2026", text: "Hvorfor har kommunen ikke selv lavet denne sammenligning?" },
        { author: "Rasmus Bloch", date: "1. jul 2026", text: "Med samme pengepulje kunne man få markant mere CO2-reduktion andre steder." },
        { author: "Niels Eriksen", date: "1. jul 2026", text: "Energinet kan oplyse om optimal placering. Det er ikke parken." },
        { author: "Susanne Krog", date: "2. jul 2026", text: "Det er ikke bare en grøn diskussion — det er en økonomisk." },
        { author: "Erik Bak", date: "2. jul 2026", text: "Borgerne fortjener at se hele cost-benefit, ikke kun den ene side." },
        { author: "Vibeke Frost", date: "3. jul 2026", text: "Spørgsmål til rådmanden: vil du fremlægge sammenligning af alle placeringsalternativer?" },
        { author: "Lone Vestergaard", date: "3. jul 2026", text: "Vi vil have klimaløsninger, men gennemtænkte løsninger." }
      ]
    },
    {
      id: 11,
      title: "Solceller er et vigtigt klimatiltag — vi støtter projektet",
      description: "Aarhus skal nå sine klimamål, og hvert kWh tæller. Universitetsparken er stort, fladt og solrigt — det er en logisk placering. Vi støtter forslaget under forudsætning af, at træerne bevares og parken stadig kan bruges.",
      fullDescription: "Aarhus skal nå sine klimamål, og hvert kWh tæller. Universitetsparken er stort, fladt og solrigt — det er en logisk placering. Vi støtter forslaget under forudsætning af, at træerne bevares og parken stadig kan bruges.\n\nVi tror, det er muligt at udforme anlægget så det respekterer C.F. Møllers arkitektur — fx ved at holde panelerne lave (under 1,2 m) og indpasse dem i landskabets bølger. Det er ikke et enten-eller-spørgsmål.\n\nKommunen bør investere i et arkitektonisk og landskabeligt gennemtænkt design, ikke bare den billigste industri-løsning.",
      author: "Tobias Vandkilde",
      date: "30. juni 2026",
      comments: 9,
      likes: 41,
      category: "miljoe",
      commentsList: [
        { author: "Mette Friis", date: "1. jul 2026", text: "Helt enig — det handler om DESIGN, ikke om hvorvidt." },
        { author: "Ole Mortensen", date: "1. jul 2026", text: "Lave paneler, integreret i landskabet, og bevarede træer. Det er kompromiset." },
        { author: "Lone Vestergaard", date: "2. jul 2026", text: "Vi kan ikke have det hele. Klimaforandringer kommer hurtigere end vi tror." },
        { author: "Annette Holm", date: "2. jul 2026", text: "Tag-solceller dækker ikke det vi har brug for. Vi har brug for fladearealer også." },
        { author: "Karsten Lund", date: "3. jul 2026", text: "Forudsætning: bevarede træer, lave paneler, fortsat brug af plænen." },
        { author: "Mark Jensen", date: "3. jul 2026", text: "Hellere et reflekteret JA end et reflekteret NEJ. Lad os påvirke designet." },
        { author: "Stine Brink", date: "4. jul 2026", text: "Hold dialogen åben — det her er en mulighed for verdensklasse-grønt design." },
        { author: "Tine Holm", date: "4. jul 2026", text: "Andre universiteter (Stanford, ETH) har integrerede solcelleanlæg på campus. Det kan også her." },
        { author: "Camilla Frost", date: "5. jul 2026", text: "Vi støtter — under forudsætningerne nævnt. Ikke et blank check." }
      ]
    },
    {
      id: 12,
      title: "Lysforurening fra anlægget vil ramme stjernehimlen",
      description: "Drift- og servicelamper omkring solcelleanlægget vil tilføre ny lysforurening til en zone, der allerede er for lys. Det rammer parkens nattesyn og er et signal til hele Aarhus-natten.",
      fullDescription: "Drift- og servicelamper omkring solcelleanlægget vil tilføre ny lysforurening til en zone, der allerede er for lys. Det rammer parkens nattesyn og er et signal til hele Aarhus-natten.\n\nMiljørapporten nævner LED-belysning med 'natløsning', men kvantificerer ikke lumens, retning eller spektrum. Det er utilstrækkeligt for et område med planlagt arkitektonisk og rekreativ værdi.\n\nVi opfordrer til at belysningsplanen indgår som en separat tilladelse efter naturbeskyttelseslovens §50.",
      author: "Ditte Holm",
      date: "1. juli 2026",
      comments: 5,
      likes: 38,
      category: "miljoe",
      commentsList: [
        { author: "Karen Winther", date: "2. jul 2026", text: "Nattens insektliv er allerede presset. Det her gør det værre." },
        { author: "Lars Winding", date: "2. jul 2026", text: "Astronomisk Selskab har mistet flere observationspunkter. Universitetsparken var stadig en mulighed." },
        { author: "Hanne Juhl", date: "3. jul 2026", text: "LED-belysning kan rettes nedad og lukkes om natten. Krav det." },
        { author: "Flemming Toft", date: "3. jul 2026", text: "Servicelamper aktiveres ofte 'altid for sikkerhed'. Sådan skal det ikke være." },
        { author: "Dorte Kruse", date: "4. jul 2026", text: "DTU Fotonik har målinger der viser hvor sårbar bynatten er. Spørg dem." }
      ]
    },
    {
      id: 13,
      title: "Aarhus Universitets bestyrelse: forelæg lejeaftalen offentligt",
      description: "Som tidligere prodekan ved Aarhus Universitet er jeg dybt foruroliget over manglen på offentlighed omkring den underliggende lejeaftale. Hvad får universitetet for at afstå arealet i 30 år? Hvor er aftalen?",
      fullDescription: "Som tidligere prodekan ved Aarhus Universitet er jeg dybt foruroliget over manglen på offentlighed omkring den underliggende lejeaftale. Hvad får universitetet for at afstå arealet i 30 år? Hvor er aftalen?\n\nUniversiteter er pålagt en forpligtelse til at agere transparent omkring væsentlige beslutninger om deres arealer. En 30-årig lejeaftale er en sådan væsentlig beslutning. Den bør behandles offentligt i bestyrelsen.\n\nJeg opfordrer bestyrelsen til at sætte sagen på dagsordenen åbent, så studerende, ansatte og borgere kan følge processen.",
      author: "Prof. emer. Birte Sørensen",
      date: "2. juli 2026",
      comments: 12,
      likes: 168,
      category: "proces",
      commentsList: [
        { author: "Anders Berg", date: "3. jul 2026", text: "Tak Birte for at sige det vi alle tænker." },
        { author: "Sofie Gram", date: "3. jul 2026", text: "Bestyrelsesreferaterne er offentlige, men sagen står ikke på dagsordenen." },
        { author: "Knud Erik", date: "4. jul 2026", text: "Det her bør være øverste punkt næste bestyrelsesmøde." },
        { author: "Ruth Borg", date: "4. jul 2026", text: "30-årig lejeaftale binder uden inddragelse af de næste 5 rektorer. Uansvarligt." },
        { author: "Stine Brink", date: "5. jul 2026", text: "Studenterrådets formand bør tage ordet i bestyrelsen." },
        { author: "Mikkel Skov", date: "5. jul 2026", text: "Akademisk Råd skal sige fra. Det er kernen i deres mandat." },
        { author: "Karen Winther", date: "6. jul 2026", text: "Mit fagforbund bakker op om Birtes opfordring." },
        { author: "Lars Winding", date: "6. jul 2026", text: "Universiteter mister kerneautonomi når den slags aftaler tages bag lukkede døre." },
        { author: "Mette Friis", date: "7. jul 2026", text: "Birte, du var en stor inspiration på fakultetet. Tak for stadig at slå alarm." },
        { author: "Per Vestergaard", date: "7. jul 2026", text: "Vi opfordrer pressen til at gå ind i sagen. Aktindsigt i alle akter." },
        { author: "Tine Holm", date: "8. jul 2026", text: "Jeg har sendt et formelt brev til bestyrelsen. Forventer svar." },
        { author: "Camilla Thomsen", date: "8. jul 2026", text: "Det her er en universitetspolitisk principsag — ikke kun lokalt." }
      ]
    }
  ],

  seedTitles: [
    "Bevar Universitetsparken som åbent grønt rum", "Solceller hører på tagene, ikke i parken",
    "Parkens kulturhistorie skal beskyttes", "Stakladen-livet kræver fri plæne",
    "Træfældning vil ramme biodiversiteten", "Aarhus Kommunes klimaplan kræver bedre tænkning",
    "Park-festen og Kapsejladsen kan ikke flyttes", "Refleksioner generer auditorier",
    "Borgerinddragelsen er for kort", "Cost-benefit peger entydigt mod tagene",
    "Vi støtter klimaomstilling — men gennemtænkt", "Akademisk Råd skal høres",
    "Lejeaftalen mellem AU og kommunen bør offentliggøres", "30 år er en kæmpe binding",
    "Studerendes mentale sundhed kræver grønne arealer", "Eghjorten er bilag IV-art",
    "Sommerferiehøring er udemokratisk", "C.F. Møllers helhedsværk må ikke brydes",
    "Sammenhængende grønne korridorer bevares", "Hydrologien i parken er sårbar",
    "Universitet er ikke et energiselskab", "Aarhus Havn har 250.000 m² ledigt tagareal",
    "Kapsejladsen er en del af Aarhus' identitet", "Studenterrådet skal anerkendes som høringspart",
    "Hvor er den uvildige sammenligning?", "Park-livet er en del af studievalget",
    "Hulrugende fugle har det i forvejen svært", "Bynatten skal beskyttes mod lys",
    "Ingen blændingsanalyse i miljørapporten", "Vi har ret til at vide hvad universitetet får",
    "8 hektar er for stor en del af parken", "Aktindsigt nu på AU-kommune-aftalen",
    "Klima og kultur er ikke modsætninger", "Vi har set hvor sårbar plænen er i tørke",
    "Slots- og Kulturstyrelsen bør inddrages", "Vi vil have en samlet solcelleplan, ikke fragmenter",
    "Studieliv kræver fri plæne", "DCE bør vurdere biodiversitetspåvirkningen",
    "Den modernistiske arv tilhører alle", "Bevar uniparken!"
  ],

  seedDescriptions: [
    "Vi er dybt bekymrede over at et solcelleanlæg på 8 hektar vil ødelægge Universitetsparkens åbne grønne rum. Studieliv, kultur og biodiversitet hænger sammen her.",
    "Universitetsparken er C.F. Møllers landskabelige helhedsværk. Et industrielt solcelleanlæg på plænen er et brud på den arkitektoniske og kulturelle arv.",
    "Aarhus Kommune bør undersøge tagsolceller på havnen, hospitalerne og kommunens egne bygninger, før der gribes ind i en park med kulturhistorisk og rekreativ værdi.",
    "Træfældningen og det ændrede mikroklima vil ramme den biodiversitet, parken huser. Eghjort, hulrugende fugle og bynære flagermus vil blive påvirket alvorligt.",
    "Borgerinddragelsen har været både for kort og forkert placeret. Sommerferiehøring og ét borgermøde er ikke i overensstemmelse med kommunens egen inddragelsespolitik.",
    "Et solcelleanlæg her er en kortsigtet klimagenvej. Tagene rundt om i Aarhus har større potentiale og færre negative konsekvenser. Vi vil have en sammenhængende plan.",
    "Park-festen, Kapsejladsen og det daglige studieliv bruger plænen som en samlet helhed. Et anlæg på 8 hektar fjerner mere end areal — det fjerner traditioner.",
    "Klimakampen er afgørende, men løsningen skal være holistisk. Vi støtter solceller — men ikke på bekostning af bynære grønne arealer og kulturarv.",
    "Studerendes mentale sundhed og studievalg hænger sammen med adgang til åbent grønt rum. Universitetsparken er et af de få store grønne arealer i byen.",
    "Lejeaftalen mellem Aarhus Universitet og Aarhus Kommune skal offentliggøres. Borgerne har ret til at vide hvad universitetet får for at afstå et fælles areal."
  ],

  seedAuthors: [
    "Marie Holm", "Jonas Kristoffersen", "Astrid Nørgaard", "Henrik Lindqvist",
    "Frederik Søndergaard", "Mathilde Bach", "Lone Bjerregaard", "Sebastian Reinholdt",
    "Caroline Vestergaard", "Peter Mortensen", "Tobias Vandkilde", "Ditte Holm",
    "Birte Sørensen", "Anders Berg", "Sofie Gram", "Helle Storm",
    "Knud Erik", "Ruth Borg", "Mark Jensen", "Stine Brink",
    "Tine Holm", "Ida Kvist", "Martin Rye", "Gitte Skou",
    "Mikkel Skov", "Sven Nielsen", "Hanne Juhl", "Camilla Frost",
    "Karen Winther", "Lars Winding", "Mette Friis", "Ole Mortensen",
    "Pia Lund", "Rasmus Bloch", "Niels Eriksen", "Susanne Krog",
    "Erik Bak", "Vibeke Frost", "Jørgen Dam", "Flemming Toft",
    "Lone Vestergaard", "Annette Holm", "Karsten Lund", "Birgit Rasmussen",
    "Per Vestergaard", "Bo Vang", "Camilla Thomsen", "Henrik Berg"
  ],

  seedCommentTexts: [
    "Helt enig. Parken må ikke bruges som CO2-regnskab.", "Det bør undersøges af uvildige eksperter, ikke kommunen selv.",
    "Tagsolceller giver mere strøm pr. m² — også økonomisk.", "Godt formuleret. Studerende skal stå sammen om dette.",
    "Jeg har gået i parken i 20 år. Det her må ikke ske.", "Klimakamp ja — men ikke på vores grønne plads.",
    "C.F. Møllers vision er en del af Aarhus' DNA.", "Park-festen og Kapsejladsen er afgørende for studievalget.",
    "Studenterrådet bør formelt protestere.", "Vi vil have en samlet solcelleplan, ikke et fragment.",
    "Aktindsigt på lejeaftalen mellem AU og kommunen!", "Bevar uniparken — skriv under på borgerforslaget.",
    "Akademisk Råd skal udtale sig før byrådet stemmer.", "Klima og kultur er ikke modsætninger.",
    "Kommunens egen biodiversitetsstrategi modarbejdes her."
  ]
};

/* Map clusters for the uniparken mock — districts surrounding the university.
   Written into DM.config.map.clusters so map.js picks them up directly,
   overriding the Vosnæs defaults set by config.js. */
if (DM.config && DM.config.map) {
  DM.config.map.clusters = [
    { lat: 56.171, lng: 10.201, count: 62, label: "Universitetsparken" },
    { lat: 56.172, lng: 10.180, count: 48, label: "Trøjborg" },
    { lat: 56.183, lng: 10.213, count: 36, label: "Risskov" },
    { lat: 56.162, lng: 10.165, count: 28, label: "Vejlby" },
    { lat: 56.155, lng: 10.210, count: 41, label: "Aarhus C / Latinerkvarteret" },
    { lat: 56.144, lng: 10.198, count: 22, label: "Frederiksbjerg" },
    { lat: 56.183, lng: 10.195, count: 18, label: "Christiansbjerg" },
    { lat: 56.214, lng: 10.179, count: 14, label: "Skejby" },
    { lat: 56.148, lng: 10.125, count: 11, label: "Brabrand" },
    { lat: 56.140, lng: 10.190, count: 9, label: "Højbjerg" },
    { lat: 56.140, lng: 10.165, count: 7, label: "Viby" }
  ];
}
