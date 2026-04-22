window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Mock Data — Vindmøller ved Vosnæs
   ========================================================================== */

DM.horingssvarData = [
  {
    id: 1,
    title: "Støjgener fra vindmøller truer beboernes sundhed",
    description: "Vi er dybt bekymrede over den lavfrekvente støj, som tre 150 meter høje vindmøller vil påføre de omkringliggende beboelser. Studier viser, at lavfrekvent støj og infralyd kan forårsage søvnforstyrrelser, hovedpine og stress.",
    fullDescription: "Vi er dybt bekymrede over den lavfrekvente støj, som tre 150 meter høje vindmøller vil påføre de omkringliggende beboelser. Studier viser, at lavfrekvent støj og infralyd kan forårsage søvnforstyrrelser, hovedpine og stress.\n\nDe nuværende støjgrænser tager ikke tilstrækkeligt hensyn til lavfrekvent støj, og der er dokumenteret tilfælde fra andre vindmølleprojekter, hvor naboer har oplevet betydelige helbredsproblemer.\n\nVi kræver, at der gennemføres en uafhængig sundhedsundersøgelse, inden projektet vedtages.",
    author: "Maria Jensen",
    date: "16. juni 2025",
    comments: 12,
    likes: 89,
    category: "stoej",
    commentsList: [
      { author: "Peter Hansen", date: "17. jun 2025", text: "Helt enig. Vi har allerede problemer med støj fra trafik. Vindmøller oveni er uacceptabelt." },
      { author: "Anne Larsen", date: "17. jun 2025", text: "WHO anbefaler maksimalt 40 dB om natten. Det kan ikke overholdes her." },
      { author: "Jens Olsen", date: "18. jun 2025", text: "Min nabo i Nordjylland har vindmøller 800 meter fra huset. Han kan ikke sove." },
      { author: "Mette Friis", date: "18. jun 2025", text: "Har kommunen overhovedet undersøgt sundhedseffekterne? Det tvivler jeg på." },
      { author: "Bo Vang", date: "19. jun 2025", text: "Infralyd er et veldokumenteret problem. Det er ikke noget, man bare kan ignorere." },
      { author: "Karen Winther", date: "20. jun 2025", text: "Der bør laves målinger af eksisterende baggrundsstøj som reference." },
      { author: "Lars Winding", date: "21. jun 2025", text: "Støjberegningerne i rapporten er baseret på ideelle vindforhold. Virkeligheden er anderledes." },
      { author: "Hanne Juhl", date: "22. jun 2025", text: "Vi bor i Studstrup og frygter for vores nattesøvn." },
      { author: "Flemming Toft", date: "23. jun 2025", text: "Skræmmende at se hvor tæt møllerne er på beboelse." },
      { author: "Dorte Kruse", date: "24. jun 2025", text: "Børnenes soverum vender mod Vosnæs. Det er helt uacceptabelt." },
      { author: "Christian Leth", date: "25. jun 2025", text: "Kan kommunen garantere, at ingen beboere vil opleve støjgener? Nej, det kan de ikke." },
      { author: "Ulla Gram", date: "26. jun 2025", text: "Det er en skam at sundhed ikke prioriteres højere end vindenergi." }
    ]
  },
  {
    id: 2,
    title: "Landskabet ved Vosnæs er nationalt bevaringsværdigt",
    description: "Vosnæs-området er udpeget som bevaringsværdigt kulturlandskab af national betydning. Tre 150 meter høje vindmøller vil fuldstændig ødelægge de visuelle kvaliteter og det unikke kystlandskab.",
    fullDescription: "Vosnæs-området er udpeget som bevaringsværdigt kulturlandskab af national betydning. Tre 150 meter høje vindmøller vil fuldstændig ødelægge de visuelle kvaliteter og det unikke kystlandskab.\n\nDet er paradoksalt, at kommunen på den ene side anerkender områdets kulturhistoriske værdi, og på den anden side ønsker at placere industrielle anlæg midt i det.\n\nVisualiseringerne i miljørapporten viser tydeligt, at møllerne vil dominere horisonten i hele området og være synlige fra store dele af Kalø Vig.",
    author: "Thomas Pedersen",
    date: "18. juni 2025",
    comments: 8,
    likes: 76,
    category: "landskab",
    commentsList: [
      { author: "Lisa Møller", date: "19. jun 2025", text: "Vosnæs er et af de smukkeste steder i kommunen. Det må ikke ødelægges." },
      { author: "Karl Sørensen", date: "19. jun 2025", text: "Turister vælger området netop for naturen. Vindmøller skræmmer dem væk." },
      { author: "Rikke Holm", date: "20. jun 2025", text: "Har kommunen vurderet påvirkningen af ejendomsværdier? De vil styrtdykke." },
      { author: "Søren Dahl", date: "21. jun 2025", text: "Vindmøller hører til på havet eller i industriområder, ikke i fredede landskaber." },
      { author: "Camilla Frost", date: "22. jun 2025", text: "Kystlandskabet langs Kalø Vig er enestående. Det kan ikke erstattes." },
      { author: "Henrik Berg", date: "23. jun 2025", text: "Visualiseringerne taler for sig selv. Det er en katastrofe for landskabet." },
      { author: "Tine Holm", date: "24. jun 2025", text: "Fredningsnævnet bør inddrages, hvis ikke allerede sket." },
      { author: "Ole Mortensen", date: "25. jun 2025", text: "Man kan ikke tale om grøn omstilling og samtidig ødelægge naturen." }
    ]
  },
  {
    id: 3,
    title: "Truede arter i Vosnæs-området vil blive påvirket",
    description: "Området ved Vosnæs er levested for flere truede arter, herunder flagermus og stor vandsalamander. Vindmøller udgør en alvorlig trussel mod flagermusbestanden, som er beskyttet under EU's habitatdirektiv.",
    fullDescription: "Området ved Vosnæs er levested for flere truede arter, herunder flagermus og stor vandsalamander. Vindmøller udgør en alvorlig trussel mod flagermusbestanden, som er beskyttet under EU's habitatdirektiv.\n\nMiljøvurderingsrapporten er utilstrækkelig i sin behandling af faunaen. Der er kun foretaget sporadiske undersøgelser, og de er gennemført uden for den primære aktivitetsperiode for flagermus.\n\nVi kræver en grundig, helårsbaseret undersøgelse af dyrelivet, inden der træffes beslutning.",
    author: "Birgit Rasmussen",
    date: "20. juni 2025",
    comments: 10,
    likes: 92,
    category: "miljoe",
    commentsList: [
      { author: "Sven Nielsen", date: "21. jun 2025", text: "Flagermus er strengt beskyttede. Kommunen kan ikke bare ignorere det." },
      { author: "Karen Winther", date: "21. jun 2025", text: "Vi har observeret mindst 5 flagermusarter ved Vosnæs om sommeren." },
      { author: "Lars Winding", date: "22. jun 2025", text: "Stor vandsalamander er Bilag IV-art. Projektet kan være i strid med EU-lovgivning." },
      { author: "Hanne Juhl", date: "23. jun 2025", text: "Havørne fouragerer også i området. Det er dokumenteret." },
      { author: "Flemming Toft", date: "24. jun 2025", text: "Undersøgelserne er lavet i november. Det er helt utilstrækkeligt." },
      { author: "Dorte Kruse", date: "25. jun 2025", text: "Danmark har forpligtet sig til at beskytte biodiversiteten. Det gælder også her." },
      { author: "Christian Leth", date: "26. jun 2025", text: "Der dør tusindvis af flagermus ved vindmøller hvert år. Det er fakta." },
      { author: "Ulla Gram", date: "27. jun 2025", text: "Natura 2000-området ligger kun få kilometer væk. Det er bekymrende." },
      { author: "Per Vestergaard", date: "28. jun 2025", text: "En grundig undersøgelse vil tage mindst et år. Det bør man afvente." },
      { author: "Helle Storm", date: "29. jun 2025", text: "Fugle og flagermus har ingen stemme. Vi må tale for dem." }
    ]
  },
  {
    id: 4,
    title: "Ejendomsværdier vil falde drastisk",
    description: "Erfaringer fra andre vindmølleprojekter viser, at ejendomspriserne i nærområdet kan falde med 10-30%. For mange familier er boligen den største investering, og et sådant værditab er ødelæggende.",
    fullDescription: "Erfaringer fra andre vindmølleprojekter viser, at ejendomspriserne i nærområdet kan falde med 10-30%. For mange familier er boligen den største investering, og et sådant værditab er ødelæggende.\n\nDen nuværende kompensationsordning via Energistyrelsen dækker slet ikke det reelle værditab. Mange naboer vil sidde med en bolig, de ikke kan sælge.\n\nKommunen bør fremlægge en realistisk vurdering af de økonomiske konsekvenser for naboerne, inden projektet vedtages.",
    author: "Henrik Christensen",
    date: "22. juni 2025",
    comments: 15,
    likes: 124,
    category: "proces",
    commentsList: [
      { author: "Mette Friis", date: "22. jun 2025", text: "Vi har lige købt hus i Studstrup. Vindmøller var aldrig nævnt!" },
      { author: "Ole Mortensen", date: "23. jun 2025", text: "Kompensationsordningen er en dårlig vittighed. Den dækker ingenting." },
      { author: "Pia Lund", date: "23. jun 2025", text: "Vi har investeret 3 millioner i vores hus. Det vil vi aldrig se igen." },
      { author: "Rasmus Bloch", date: "24. jun 2025", text: "Bankerne vil ikke låne til boliger nær vindmøller. Det er velkendt." },
      { author: "Niels Eriksen", date: "24. jun 2025", text: "Hvem kompenserer os for det psykiske pres dette projekt medfører?" },
      { author: "Susanne Krog", date: "25. jun 2025", text: "Vi har kontaktet ejendomsmægler. Huset er usælgeligt nu." },
      { author: "Erik Bak", date: "25. jun 2025", text: "Retsligt bør kommunen stå til ansvar for bevidst værdiforringelse." },
      { author: "Vibeke Frost", date: "26. jun 2025", text: "Vores pensionsplan var at sælge huset. Den plan er ødelagt." },
      { author: "Jørgen Dam", date: "27. jun 2025", text: "750 meter fra en 150 meter høj mølle. Hvem vil købe det?" },
      { author: "Lone Vestergaard", date: "28. jun 2025", text: "Et fald på 20% svarer til 600.000 kr for os. Det er vores opsparing." },
      { author: "Annette Holm", date: "29. jun 2025", text: "Andre kommuner har droppet projekter pga. naboprotester. Gør det samme." },
      { author: "Karsten Lund", date: "30. jun 2025", text: "Det er ikke rimeligt at privatpersoner skal bære omkostningen for kommunens klimamål." },
      { author: "Ruth Borg", date: "1. jul 2025", text: "Vi har samlet 1.200 underskrifter mod projektet." },
      { author: "Mark Jensen", date: "2. jul 2025", text: "Syddjurs Kommune har også borgere der protesterer. Det berører alle." },
      { author: "Stine Brink", date: "3. jul 2025", text: "Kommunen bør købe de berørte ejendomme til markedspris inden vindmøller." }
    ]
  },
  {
    id: 5,
    title: "Vindressourcen ved Vosnæs er utilstrækkelig",
    description: "Vosnæs er ikke et optimalt sted for vindenergi. Vindforholdene er markant dårligere end ved kysten eller til havs, hvilket betyder at møllerne kun vil producere en brøkdel af deres kapacitet.",
    fullDescription: "Vosnæs er ikke et optimalt sted for vindenergi. Vindforholdene er markant dårligere end ved kysten eller til havs, hvilket betyder at møllerne kun vil producere en brøkdel af deres kapacitet.\n\nIfølge miljørapporten vil møllerne kun reducere CO2-udledningen med ca. 0,03% af Aarhus' samlede udledning. Det er en forsvindende lille gevinst i forhold til de massive negative konsekvenser for natur, landskab og naboer.\n\nPengene ville give langt mere CO2-reduktion investeret i havvindmøller eller solceller på industritagene.",
    author: "Camilla Thomsen",
    date: "25. juni 2025",
    comments: 7,
    likes: 58,
    category: "proces",
    commentsList: [
      { author: "Anders Berg", date: "26. jun 2025", text: "0,03% CO2-reduktion. Er det virkelig det hele værd?" },
      { author: "Sofie Gram", date: "26. jun 2025", text: "Havvind giver 3-4 gange så meget energi per mølle. Byg dem der." },
      { author: "Peter Hansen", date: "27. jun 2025", text: "Kapacitetsfaktoren for landvind i DK er kun ca. 25%. Det er lavt." },
      { author: "Anne Larsen", date: "28. jun 2025", text: "Solceller på kommunale bygninger ville give mere energi per investeret krone." },
      { author: "Jens Olsen", date: "29. jun 2025", text: "Energistyrelsen anbefaler selv havvind fremfor landvind." },
      { author: "Lisa Møller", date: "30. jun 2025", text: "Vindressourcekortene viser tydeligt at Vosnæs ikke er optimalt." },
      { author: "Karl Sørensen", date: "1. jul 2025", text: "Investér i energieffektivisering i stedet. Det giver mere CO2-reduktion." }
    ]
  },
  {
    id: 6,
    title: "Skyggekast og blinkende lys vil genere naboerne",
    description: "Vindmøller på 150 meters højde kaster lange skygger, som rammer nabobeboelser i morgen- og aftentimerne. Derudover vil de røde advarselslys være synlige i en radius af mange kilometer om natten.",
    fullDescription: "Vindmøller på 150 meters højde kaster lange skygger, som rammer nabobeboelser i morgen- og aftentimerne. Derudover vil de røde advarselslys være synlige i en radius af mange kilometer om natten.\n\nSkyggekast skaber en flimrende effekt, der kan udløse epileptiske anfald og er generelt meget generende. Den maksimale skyggetid på 10 timer om året er sat alt for højt.\n\nDe blinkende røde lys om natten vil forvandle hele landskabet til et industriområde.",
    author: "Lars Winding",
    date: "27. juni 2025",
    comments: 5,
    likes: 45,
    category: "stoej",
    commentsList: [
      { author: "Hanne Juhl", date: "28. jun 2025", text: "Skyggekast er en daglig plage for naboer. 10 timer om året lyder af lidt, men det er koncentreret." },
      { author: "Flemming Toft", date: "29. jun 2025", text: "De røde lys kan ses fra Aarhus. Det er visuelt forurening." },
      { author: "Dorte Kruse", date: "30. jun 2025", text: "Børn sover med gardinerne åbne om sommeren. Blinkende røde lys er forstyrrende." },
      { author: "Christian Leth", date: "1. jul 2025", text: "Radar-baseret behovsstyring af lys findes, men bruges sjældent i DK." },
      { author: "Ulla Gram", date: "2. jul 2025", text: "Vi nyder nattemørket her. Det vil blive ødelagt." }
    ]
  },
  {
    id: 7,
    title: "Positiv for den grønne omstilling i Aarhus",
    description: "Jeg støtter forslaget om vindmøller ved Vosnæs. Aarhus har brug for at tage ansvar for den grønne omstilling, og landbaseret vindenergi er en vigtig del af løsningen på klimakrisen.",
    fullDescription: "Jeg støtter forslaget om vindmøller ved Vosnæs. Aarhus har brug for at tage ansvar for den grønne omstilling, og landbaseret vindenergi er en vigtig del af løsningen på klimakrisen.\n\nDet er let at sige nej til vindmøller i ens egen baghave, men vi har alle et ansvar. Klimaforandringerne rammer os alle, og vi er nødt til at acceptere at vedvarende energi kræver plads.\n\nJeg opfordrer byrådet til at vedtage planen og vise at Aarhus er en kommune der handler.",
    author: "Rasmus Bloch",
    date: "29. juni 2025",
    comments: 9,
    likes: 34,
    category: "miljoe",
    commentsList: [
      { author: "Ida Kvist", date: "30. jun 2025", text: "Enig! Vi kan ikke bare sige nej til alt. Klimaet kræver handling." },
      { author: "Martin Rye", date: "30. jun 2025", text: "Modigt indlæg. De fleste høringssvar er desværre kun negative." },
      { author: "Gitte Skou", date: "1. jul 2025", text: "Men kunne man ikke bygge dem på havet i stedet?" },
      { author: "Mikkel Skov", date: "1. jul 2025", text: "Landvind er billigere end havvind. Det handler også om økonomi." },
      { author: "Sven Nielsen", date: "2. jul 2025", text: "Enig i princippet, men placeringen er forkert. Der er bedre alternativer." },
      { author: "Hanne Juhl", date: "3. jul 2025", text: "Grøn omstilling ja, men ikke på bekostning af beskyttet natur." },
      { author: "Bo Vang", date: "4. jul 2025", text: "Det er nemt at støtte når man bor langt fra møllerne." },
      { author: "Karen Winther", date: "5. jul 2025", text: "Solceller på alle kommunale tage ville give mere energi uden gener." },
      { author: "Lars Winding", date: "6. jul 2025", text: "Respekt for dit synspunkt, men fakta taler imod denne placering." }
    ]
  },
  {
    id: 8,
    title: "Skødstrup Skole med 1.350 elever er for tæt på",
    description: "Skødstrup Skole ligger inden for få kilometers afstand af de planlagte vindmøller. Med 1.350 elever er det en af kommunens største skoler, og børnenes trivsel bør veje tungt i beslutningen.",
    fullDescription: "Skødstrup Skole ligger inden for få kilometers afstand af de planlagte vindmøller. Med 1.350 elever er det en af kommunens største skoler, og børnenes trivsel bør veje tungt i beslutningen.\n\nStøj og skyggekast kan påvirke koncentrationsevnen og læringsmiljøet. Skolens udearealer vender direkte mod Vosnæs.\n\nVi opfordrer byrådet til at tænke på børnene og deres ret til et godt læringsmiljø.",
    author: "Niels Eriksen",
    date: "1. juli 2025",
    comments: 6,
    likes: 71,
    category: "stoej",
    commentsList: [
      { author: "Tine Holm", date: "2. jul 2025", text: "1.350 børn. Det er et kæmpe ansvar at ignorere." },
      { author: "Rasmus Bloch", date: "3. jul 2025", text: "Skolen bør inddrages i høringen som part." },
      { author: "Susanne Krog", date: "4. jul 2025", text: "Vores børn er på skolen 6-8 timer dagligt. De fortjener ro." },
      { author: "Erik Bak", date: "5. jul 2025", text: "Forældrebestyrelsen har indsendt en fælles protest." },
      { author: "Vibeke Frost", date: "6. jul 2025", text: "Støj i klasseværelserne er allerede et problem. Vindmøller forværrer det." },
      { author: "Jørgen Dam", date: "7. jul 2025", text: "Hvad med børnenes ret til sundhed og trivsel? FN's børnekonvention?" }
    ]
  },
  {
    id: 9,
    title: "Procedurefejl i høringsprocessen",
    description: "Vi mener, at høringsprocessen er behæftet med væsentlige procedurefejl. Borgermødet var utilstrækkeligt informeret, og vigtige dokumenter blev først tilgængelige kort før høringsfristen.",
    fullDescription: "Vi mener, at høringsprocessen er behæftet med væsentlige procedurefejl. Borgermødet var utilstrækkeligt informeret, og vigtige dokumenter blev først tilgængelige kort før høringsfristen.\n\nDesuden er høringsfristen for kort i forhold til materialets omfang. Miljøvurderingsrapporten alene er på flere hundrede sider, og borgerne har reelt ikke haft tid til at sætte sig ordentligt ind i materialet.\n\nVi kræver, at høringsfristen forlænges med minimum 4 uger.",
    author: "Susanne Krog",
    date: "3. juli 2025",
    comments: 8,
    likes: 53,
    category: "proces",
    commentsList: [
      { author: "Bo Vang", date: "4. jul 2025", text: "Dokumenterne er umulige at gennemskue for almindelige borgere." },
      { author: "Rikke Holm", date: "4. jul 2025", text: "Borgermødet var en fiasko. Ingen reelle svar fra kommunen." },
      { author: "Søren Dahl", date: "5. jul 2025", text: "Høringsfristen bør absolut forlænges. Materialet er enormt." },
      { author: "Camilla Frost", date: "6. jul 2025", text: "Vi modtog brev om høringen kun 2 uger inden fristen." },
      { author: "Henrik Berg", date: "7. jul 2025", text: "E-Boks-brevene blev sendt i etaper. Mange modtog dem sent." },
      { author: "Tine Holm", date: "8. jul 2025", text: "Kommunen bør holde mindst tre borgermøder, ikke bare ét." },
      { author: "Ole Mortensen", date: "9. jul 2025", text: "Transparens i processen er fuldstændig fraværende." },
      { author: "Ida Kvist", date: "10. jul 2025", text: "Mange ældre borgere har svært ved at navigere i det digitale materiale." }
    ]
  },
  {
    id: 10,
    title: "Alternativ placering på havnen bør undersøges",
    description: "I stedet for at placere vindmøller i et bevaringsværdigt naturområde, bør kommunen undersøge mulighederne for placering på eller nær Aarhus Havn, hvor der allerede er industriel aktivitet.",
    fullDescription: "I stedet for at placere vindmøller i et bevaringsværdigt naturområde, bør kommunen undersøge mulighederne for placering på eller nær Aarhus Havn, hvor der allerede er industriel aktivitet.\n\nHavnen ville give bedre vindforhold, ingen naboklager og ingen påvirkning af beskyttet natur. Det er uforståeligt, at denne mulighed ikke er undersøgt mere grundigt.\n\nKommunen bør fremlægge en sammenlignende analyse af alternative placeringer.",
    author: "Erik Bak",
    date: "5. juli 2025",
    comments: 4,
    likes: 67,
    category: "proces",
    commentsList: [
      { author: "Gitte Skou", date: "6. jul 2025", text: "Havnen er det oplagte sted. Mere vind, ingen naboer, ingen natur at ødelægge." },
      { author: "Vibeke Frost", date: "7. jul 2025", text: "Industriområder bør altid prioriteres over naturområder." },
      { author: "Jørgen Dam", date: "8. jul 2025", text: "Offshore vindmøller er fremtiden. Landvind er forældet teknologi." },
      { author: "Lone Vestergaard", date: "9. jul 2025", text: "Kommunen har aldrig ordentligt forklaret hvorfor netop Vosnæs er valgt." }
    ]
  },
  {
    id: 11,
    title: "Turismen i området vil lide skade",
    description: "Vosnæs og Kalø Vig-området tiltrækker tusindvis af turister årligt. Vindmøller på 150 meter vil ødelægge den naturskønne oplevelse, som er grundlaget for turismen i området.",
    fullDescription: "Vosnæs og Kalø Vig-området tiltrækker tusindvis af turister årligt. Vindmøller på 150 meter vil ødelægge den naturskønne oplevelse, som er grundlaget for turismen i området.\n\nLokale overnatningssteder, restauranter og aktivitetsudbydere er afhængige af turismen. Et fald i besøgende vil ramme hele den lokale økonomi.\n\nKommunen bør vurdere de økonomiske konsekvenser for turismesektoren.",
    author: "Vibeke Frost",
    date: "7. juli 2025",
    comments: 3,
    likes: 41,
    category: "landskab",
    commentsList: [
      { author: "Mikkel Skov", date: "8. jul 2025", text: "Vi driver B&B nær Vosnæs. Vindmøller vil koste os gæster." },
      { author: "Sven Nielsen", date: "9. jul 2025", text: "Kalø Slotsruin er en stor attraktion. Vindmøller i baggrunden er grotesk." },
      { author: "Hanne Juhl", date: "10. jul 2025", text: "Molslaboratoriet og nationalparken trækker naturturister. Vindmøller passer ikke ind." }
    ]
  },
  {
    id: 12,
    title: "Børn og unge siger nej til vindmøller ved Vosnæs",
    description: "Vi er elever fra Skødstrup Skole og vi vil gerne have lov til at lege udenfor uden støj fra vindmøller. Vi er bange for at det bliver ubehageligt at være udenfor.",
    fullDescription: "Vi er elever fra Skødstrup Skole og vi vil gerne have lov til at lege udenfor uden støj fra vindmøller. Vi er bange for at det bliver ubehageligt at være udenfor.\n\nVores lærere har fortalt os om høringen, og vi synes det er vigtigt at børn også bliver hørt. Vi har samlet underskrifter fra 200 elever, der er imod vindmøller så tæt på vores skole.\n\nVi elsker naturen ved Vosnæs og vil gerne have den kan forblive som den er.",
    author: "8.B, Skødstrup Skole",
    date: "9. juli 2025",
    comments: 11,
    likes: 156,
    category: "stoej",
    commentsList: [
      { author: "Anders Berg", date: "10. jul 2025", text: "Fantastisk at børnene engagerer sig! De har ret til at blive hørt." },
      { author: "Sofie Gram", date: "10. jul 2025", text: "200 underskrifter fra elever. Det bør veje tungt." },
      { author: "Peter Hansen", date: "11. jul 2025", text: "Børneperspektivet mangler fuldstændig i miljørapporten." },
      { author: "Anne Larsen", date: "11. jul 2025", text: "Det er rørende at børnene tager ansvar. Politikerne bør lytte." },
      { author: "Jens Olsen", date: "12. jul 2025", text: "FN's børnekonvention artikel 12: børn har ret til at blive hørt." },
      { author: "Lisa Møller", date: "13. jul 2025", text: "Mine børn går også på Skødstrup Skole. Vi bakker 100% op." },
      { author: "Karl Sørensen", date: "14. jul 2025", text: "Stærkt indlæg! Børnenes fremtid bør prioriteres." },
      { author: "Rikke Holm", date: "15. jul 2025", text: "Håber byrådet læser dette grundigt." },
      { author: "Søren Dahl", date: "16. jul 2025", text: "Børnene forstår hvad der er på spil. Det gør politikerne tilsyneladende ikke." },
      { author: "Camilla Frost", date: "17. jul 2025", text: "Vi er stolte af jer! Bliv ved med at kæmpe." },
      { author: "Henrik Berg", date: "18. jul 2025", text: "Mest bevægende høringssvar hidtil. Tak, 8.B!" }
    ]
  },
  {
    id: 13,
    title: "Foreningen mod vindmøller ved Vosnæs: samlet indsigelse",
    description: "Som forening med over 800 medlemmer indgiver vi hermed en samlet indsigelse mod Forslag til Lokalplan nr. 1237. Vi mener, at projektet er i strid med planlovens intentioner om borgerbeskyttelse.",
    fullDescription: "Som forening med over 800 medlemmer indgiver vi hermed en samlet indsigelse mod Forslag til Lokalplan nr. 1237. Vi mener, at projektet er i strid med planlovens intentioner om borgerbeskyttelse.\n\nVi har engageret uafhængige eksperter i støj, natur og landskab, som alle konkluderer, at projektet vil have uacceptable konsekvenser for området.\n\nVi forbeholder os ret til at indbringe sagen for Planklagenævnet og om nødvendigt domstolene, hvis byrådet vedtager planen.\n\nVores juridiske rådgiver vurderer, at der er væsentlige mangler i miljøvurderingen.",
    author: "Foreningen mod vindmøller ved Vosnæs",
    date: "11. juli 2025",
    comments: 14,
    likes: 203,
    category: "proces",
    commentsList: [
      { author: "Karsten Lund", date: "12. jul 2025", text: "800 medlemmer er et stærkt signal. Byrådet kan ikke ignorere det." },
      { author: "Ruth Borg", date: "12. jul 2025", text: "Juridisk bistand er afgørende. Godt at foreningen tager det alvorligt." },
      { author: "Mark Jensen", date: "13. jul 2025", text: "Planklagenævnet har omgjort lignende sager. Der er håb." },
      { author: "Stine Brink", date: "13. jul 2025", text: "Jeg melder mig ind i foreningen. Sammen er vi stærkere." },
      { author: "Lars Winding", date: "14. jul 2025", text: "De uafhængige ekspertrapporter bør vedhæftes som bilag." },
      { author: "Hanne Juhl", date: "14. jul 2025", text: "Syddjurs Kommune bør også protestere. Deres borgere rammes også." },
      { author: "Flemming Toft", date: "15. jul 2025", text: "Kommunen bør betale for den juridiske kamp. Det er deres ansvar." },
      { author: "Dorte Kruse", date: "16. jul 2025", text: "Vi støtter foreningen økonomisk og moralsk." },
      { author: "Christian Leth", date: "17. jul 2025", text: "En retssag er dyrt, men nødvendigt hvis demokratiet svigter." },
      { author: "Ulla Gram", date: "18. jul 2025", text: "Pressen bør dække denne sag mere intensivt." },
      { author: "Per Vestergaard", date: "19. jul 2025", text: "Foreningen gør et vigtigt arbejde for hele lokalsamfundet." },
      { author: "Helle Storm", date: "20. jul 2025", text: "Tak for jeres engagement. Vi bakker jer op." },
      { author: "Knud Erik", date: "21. jul 2025", text: "Donerede 500 kr til den juridiske fond. Hver krone tæller." },
      { author: "Søren Dahl", date: "22. jul 2025", text: "Folkelig modstand i denne skala bør respekteres af et demokratisk byråd." }
    ]
  },
  {
    id: 14,
    title: "Studstrup Borgerforening: vindmøller truer vores landsby",
    description: "Studstrup Borgerforening repræsenterer 450 husstande i umiddelbar nærhed af de planlagte vindmøller. Vi frygter for landsbyens fremtid og beboernes livskvalitet.",
    fullDescription: "Studstrup Borgerforening repræsenterer 450 husstande i umiddelbar nærhed af de planlagte vindmøller. Vi frygter for landsbyens fremtid og beboernes livskvalitet.\n\nStudstrup er en attraktiv landsby med tilflytning og et stærkt fællesskab. Vindmøller vil gøre det svært at tiltrække nye beboere og kan føre til fraflytning.\n\nVi opfordrer byrådet til at beskytte de borgere, der allerede bor her, frem for at tilgodese et vindmølleprojekt med minimal klimaeffekt.",
    author: "Studstrup Borgerforening",
    date: "13. juli 2025",
    comments: 6,
    likes: 98,
    category: "landskab",
    commentsList: [
      { author: "Knud Erik", date: "14. jul 2025", text: "450 husstande. Det er et helt lokalsamfund der protesterer." },
      { author: "Ruth Borg", date: "15. jul 2025", text: "Studstrup er et fantastisk sted at bo. Det skal det forblive." },
      { author: "Mark Jensen", date: "16. jul 2025", text: "Vi flyttede til Studstrup for naturen. Vindmøller var ikke med i planerne." },
      { author: "Stine Brink", date: "17. jul 2025", text: "Kommunen lover byudvikling i Studstrup OG vindmøller. Det hænger ikke sammen." },
      { author: "Annette Holm", date: "18. jul 2025", text: "Borgerforeningens rolle er at beskytte fællesskabet. Det gør I her." },
      { author: "Karsten Lund", date: "19. jul 2025", text: "Lokalpolitikerne bør komme ud og møde borgerne ansigt til ansigt." }
    ]
  },
  {
    id: 15,
    title: "Syddjurs Kommune: vores borgere rammes også",
    description: "Som nabokommune til Aarhus vil vi påpege, at vindmøllerne ved Vosnæs også vil påvirke borgere i Syddjurs Kommune. Vi bør have været inddraget langt tidligere i processen.",
    fullDescription: "Som nabokommune til Aarhus vil vi påpege, at vindmøllerne ved Vosnæs også vil påvirke borgere i Syddjurs Kommune. Vi bør have været inddraget langt tidligere i processen.\n\nFlere af vores borgere i Rønde-området vil kunne se og høre vindmøllerne fra deres boliger. De har samme ret til at blive hørt som Aarhus-borgere.\n\nVi opfordrer til et tværkommunalt samarbejde om placering af vindmøller i regionen.",
    author: "Borgere fra Syddjurs Kommune",
    date: "1. august 2025",
    comments: 4,
    likes: 55,
    category: "proces",
    commentsList: [
      { author: "Per Vestergaard", date: "2. aug 2025", text: "Kommunegrænser stopper ikke støj og visuel påvirkning." },
      { author: "Helle Storm", date: "3. aug 2025", text: "Vi i Rønde kan tydeligt se Vosnæs. 150 meter høje møller vil dominere horisonten." },
      { author: "Knud Erik", date: "4. aug 2025", text: "Tværkommunalt samarbejde er fornuftigt. Vindmøller påvirker hele regionen." },
      { author: "Ruth Borg", date: "5. aug 2025", text: "Regionens naturværdier tilhører alle, ikke kun Aarhus Kommune." }
    ]
  },
  {
    id: 16,
    title: "Vi vil have medbestemmelse over vores nærområde",
    description: "Den demokratiske proces omkring dette vindmølleprojekt har været dybt utilfredsstillende. Borgerne føler sig overhørt og magtesløse over for en beslutning, der fundamentalt ændrer vores hverdag.",
    fullDescription: "Den demokratiske proces omkring dette vindmølleprojekt har været dybt utilfredsstillende. Borgerne føler sig overhørt og magtesløse over for en beslutning, der fundamentalt ændrer vores hverdag.\n\nVi kræver en folkeafstemning i de berørte distrikter. Det er vores nærområde, og vi bør have en reel stemme i beslutningen.\n\nEt enkelt borgermøde og en digital høringsperiode er ikke tilstrækkelig inddragelse, når det drejer sig om et projekt af denne størrelse.",
    author: "Karsten Lund",
    date: "10. august 2025",
    comments: 13,
    likes: 87,
    category: "proces",
    commentsList: [
      { author: "Ulla Gram", date: "10. aug 2025", text: "Demokrati handler om mere end at stemme hvert fjerde år." },
      { author: "Per Vestergaard", date: "11. aug 2025", text: "En folkeafstemning er den eneste retfærdige løsning." },
      { author: "Helle Storm", date: "11. aug 2025", text: "Vi skal have mere borgermøder og workshops." },
      { author: "Knud Erik", date: "12. aug 2025", text: "Kommunen taler om borgerinddragelse, men handler ikke derefter." },
      { author: "Søren Dahl", date: "12. aug 2025", text: "Online høring er fint, men det erstatter ikke fysisk dialog." },
      { author: "Camilla Frost", date: "13. aug 2025", text: "Mange ældre borgere deltager ikke digitalt. De overses." },
      { author: "Henrik Berg", date: "13. aug 2025", text: "Borgermødet var overbooket. Hundredevis fik ikke plads." },
      { author: "Tine Holm", date: "13. aug 2025", text: "Minimum tre borgermøder burde være standard for denne type projekter." },
      { author: "Ole Mortensen", date: "14. aug 2025", text: "Kommunen bør opsøge borgerne, ikke omvendt." },
      { author: "Ida Kvist", date: "14. aug 2025", text: "Børn og unge bør også have en stemme. Det er deres fremtid." },
      { author: "Martin Rye", date: "14. aug 2025", text: "Et permanent borgerpanel ville sikre løbende dialog." },
      { author: "Gitte Skou", date: "14. aug 2025", text: "Referater og beslutningsnotater bør offentliggøres straks." },
      { author: "Mikkel Skov", date: "14. aug 2025", text: "784 høringssvar og overvældende modstand. Lyt til borgerne!" }
    ]
  }
];

/* ==========================================================================
   Mock Data Generator
   ========================================================================== */

DM.generateMockData = function(baseData, totalCount) {
  if (baseData.length >= totalCount) return baseData;

  var titles = [
    "Støjgenerne er uacceptable for naboer", "Beskyt det bevaringsværdige landskab",
    "Flagermus og fugle trues af vindmøller", "Ejendomsværdierne vil falde markant",
    "Vindressourcen er for lav på denne placering", "Skyggekast rammer vores boliger",
    "Børnenes trivsel bør prioriteres", "Høringsprocessen er mangelfuld",
    "Alternativ placering bør undersøges", "Turismen vil blive skadet",
    "Naturen ved Kalø Vig skal bevares", "Infralyden er sundhedsskadelig",
    "Kommunen bør vælge solenergi i stedet", "Klimaeffekten er minimal",
    "Kompensationsordningen er utilstrækkelig", "Visuel forurening af kysten",
    "Grundvandet kan blive forurenet", "Tværkommunalt samarbejde mangler",
    "Folkeafstemning i berørte områder", "Vindmøller hører til på havet",
    "Røde advarselslys generer om natten", "Byggeperioden vil skabe massive gener",
    "Vores landsby mister sin identitet", "150 meter er for højt til dette område",
    "Lokalplanen strider mod kommuneplanen", "Naboerstatningen er en hån",
    "Fuglenes trækruter krydser området", "Støjgrænser overholdes ikke i praksis",
    "Kulturhistoriske værdier truet", "Effekten på lokale erhverv er ikke vurderet",
    "Havvindmøller er et bedre alternativ", "Vi kræver uafhængig støjmåling",
    "Rekreative områder forringes", "Risikovurderingen er mangelfuld",
    "Iskast fra møller udgør en sikkerhedsrisiko", "Nattemørket ødelægges af lys",
    "Energistyrelsen fraråder denne type placering", "Vores børn kan ikke lege udenfor",
    "Lokal modstand bør respekteres", "Vi bakker op om grøn omstilling — men ikke her"
  ];

  var descriptions = [
    "Vi er dybt bekymrede over konsekvenserne af vindmøller så tæt på beboelse. Støj, skyggekast og visuel påvirkning vil forringe vores livskvalitet markant.",
    "Vosnæs-området er udpeget som bevaringsværdigt og bør beskyttes mod industrielle anlæg. Vindmøller hører ikke hjemme i dette landskab.",
    "Kommunen bør undersøge alternative placeringer grundigt, inden der træffes beslutning om vindmøller ved Vosnæs. Havnen eller industriområder er bedre egnet.",
    "De truede dyrearter i området fortjener beskyttelse. Flagermus og fugle vil blive påvirket alvorligt af vindmøller på denne placering.",
    "Høringsprocessen har været utilstrækkelig og udemokratisk. Borgerne fortjener mere tid og bedre muligheder for at blive hørt.",
    "Ejendomsværdierne i nærområdet vil falde drastisk. Det er uacceptabelt at privatpersoner skal bære omkostningen for kommunens klimamål.",
    "Vi støtter den grønne omstilling, men denne placering er forkert. Der findes bedre alternativer med færre negative konsekvenser.",
    "Klimaeffekten af tre vindmøller er minimal i det store billede. Investeringen ville give mere CO2-reduktion brugt på andre tiltag.",
    "Børnenes trivsel og sundhed bør veje tungt i beslutningen. Skoler og institutioner i nærområdet vil blive påvirket.",
    "Lokal turisme og erhvervsliv vil lide skade. Vosnæs og Kalø Vig er kendt for sin naturskønhed, ikke for industrianlæg."
  ];

  var authors = [
    "Maria Jensen", "Thomas Pedersen", "Birgit Rasmussen", "Henrik Christensen",
    "Camilla Thomsen", "Lars Winding", "Rasmus Bloch", "Niels Eriksen",
    "Susanne Krog", "Erik Bak", "Vibeke Frost", "Jørgen Dam",
    "Flemming Toft", "Lone Vestergaard", "Annette Holm", "Karsten Lund",
    "Mette Friis", "Ole Mortensen", "Pia Lund", "Karen Winther",
    "Peter Hansen", "Anne Larsen", "Jens Olsen", "Lisa Møller",
    "Karl Sørensen", "Rikke Holm", "Søren Dahl", "Bo Vang",
    "Dorte Kruse", "Christian Leth", "Ulla Gram", "Per Vestergaard",
    "Helle Storm", "Knud Erik", "Ruth Borg", "Mark Jensen",
    "Stine Brink", "Tine Holm", "Ida Kvist", "Martin Rye",
    "Gitte Skou", "Mikkel Skov", "Sven Nielsen", "Hanne Juhl",
    "Anders Berg", "Sofie Gram", "Camilla Frost", "Henrik Berg"
  ];

  var categories = ["miljoe", "stoej", "landskab", "proces"];

  var commentTexts = [
    "Helt enig. Vindmøllerne vil ødelægge vores nærområde.", "Det bør undersøges nærmere af uafhængige eksperter.",
    "Vi har lignende erfaringer fra andre vindmølleprojekter.", "Godt formuleret. Håber politikerne lytter denne gang.",
    "Der er brug for handling mod dette projekt.", "Kan kun støtte dette synspunkt fuldt ud.",
    "Kommunen har ignoreret borgernes bekymringer i årevis.", "En uvildig undersøgelse af støj og natur er nødvendig.",
    "Vi bør stå sammen som lokalsamfund i denne sag.", "Det handler om vores sundhed og livskvalitet.",
    "Politikerne bør komme ud og se forholdene med egne øjne.", "Naturen ved Vosnæs er uerstattelig.",
    "Grøn omstilling skal ikke ske på bekostning af borgerne.", "Vi skal finde alternativer der ikke ødelægger landskabet.",
    "Tak for at bringe dette op. Vi tænker det samme i vores husstand."
  ];

  var months = ["januar", "februar", "marts", "april", "maj", "juni",
    "juli", "august", "september", "oktober", "november", "december"];

  /* Location suffixes for title variation */
  var locations = [
    "Vosnæs", "Studstrup", "Skødstrup", "Løgten", "Risskov",
    "Hjortshøj", "Lystrup", "Rønde", "Hornslet", "Mørke"
  ];

  /* Seeded PRNG for reproducible mock data — same seed always produces the same items */
  function seededRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  var result = baseData.slice();

  for (var i = baseData.length + 1; i <= totalCount; i++) {
    var r = function(n) { return seededRandom(i * 997 + n); };
    var pick = function(arr, n) { return arr[Math.floor(r(n) * arr.length)]; };

    var titleBase = pick(titles, 1);
    /* Hearing period: 5 Jun — 14 Aug 2025 */
    var month = 5 + Math.floor(r(2) * 3);
    var day = 1 + Math.floor(r(3) * 28);
    var year = 2025;
    var commentCount = Math.floor(r(5) * 30);
    var likeCount = Math.floor(r(6) * 80);

    var numComments = 1 + Math.floor(r(7) * 5);
    var commentsList = [];
    for (var c = 0; c < numComments; c++) {
      var cDay = 1 + Math.floor(seededRandom(i * 113 + c * 7) * 28);
      var cMonth = month < 11 ? month + 1 : 0;
      var shortMonth = months[cMonth].substring(0, 3);
      commentsList.push({
        author: pick(authors, 10 + c),
        date: cDay + ". " + shortMonth + " " + year,
        text: pick(commentTexts, 20 + c)
      });
    }

    result.push({
      id: i,
      title: titleBase,
      description: pick(descriptions, 8),
      fullDescription: pick(descriptions, 8) + "\n\n" + pick(descriptions, 9),
      author: pick(authors, 11),
      date: day + ". " + months[month] + " " + year,
      comments: commentCount,
      likes: likeCount,
      category: pick(categories, 12),
      commentsList: commentsList
    });
  }

  return result;
};

// Generate and append mock data to reach 784 total
DM.horingssvarData.push.apply(
  DM.horingssvarData,
  DM.generateMockData(DM.horingssvarData, 784).slice(DM.horingssvarData.length)
);
