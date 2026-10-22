// Date statistice oficiale agregate. Surse: UNESCO UIS / ITU / WHO / UNICEF / World Bank (2024-2025)
const statsData = {
    finlanda: {
        countryName: "Finlanda",
        key: "finlanda",
        meta: { an: "2025", sursa: "Eurostat / WHO / UIS" },
        kpi: { educatie: "99.4%", internet: "98.8%", dispozitive: "97.2%" },
        chartData: [99.4, 98.8, 97.2],
        history: { 
            internet: [97.5, 98.0, 98.2, 98.5, 98.8],
            educatie: [99.0, 99.1, 99.2, 99.3, 99.4],
            dispozitive: [95.8, 96.2, 96.5, 96.9, 97.2]
        },
        // [Stabilitate Termică, Calitate Aer, Ritm Circadian, Securitate Nutrițională]
        radarScores: [95, 98, 70, 96], 
        bioClimate: {
            climatic1: "Climă boreală stabilă. Fără episoade de stres termic extrem; impact neutru sau pozitiv asupra concentrării.",
            climatic2: "Cea mai pură calitate a aerului (PM2.5 sub 5µg/m³). Risc minim de afecțiuni respiratorii cronice la adolescenți.",
            biologic1: "Perturbări sezoniere din cauza nopților polare/albe. Ritmul circadian afectează somnul în timpul iernii, însă compensat instituțional.",
            biologic2: "Rată extrem de scăzută de malnutriție. Standarde alimentare de stat stricte în școli, asigurând dezvoltare fizică optimă."
        },
        criticaEdu: "Infrastructura publică garantează corelație directă dintre înmatriculare și digitalizare: deținerea aproape universală de dispozitive individuale (97.2%) transformă internetul într-un instrument de alfabetizare critică și integrare AI în curriculum.",
        criticaBio: "Mediul natural curat (aer cu PM2.5 minim) și securitatea alimentară de stat elimină barierele fizice de sănătate, oferind tinerilor suportul biologic optim pentru performanțe cognitive ridicate."
    },
    romania: {
        countryName: "România",
        key: "romania",
        meta: { an: "2025", sursa: "INS / Eurostat / WHO" },
        kpi: { educatie: "86.1%", internet: "93.2%", dispozitive: "76.0%" },
        chartData: [86.1, 93.2, 76.0],
        history: { 
            internet: [85.4, 88.1, 90.5, 92.0, 93.2],
            educatie: [87.5, 87.2, 86.8, 86.4, 86.1],
            dispozitive: [71.2, 72.8, 74.0, 75.2, 76.0]
        },
        // [Stabilitate Termică, Calitate Aer, Ritm Circadian, Securitate Nutrițională]
        radarScores: [65, 55, 60, 72],
        bioClimate: {
            climatic1: "Veri tot mai caniculare (peste 40°C în Sud). Săli de clasă neclimatizate reduc masiv randamentul tinerilor la examene.",
            climatic2: "Poluare urbană critică cu particule fine (PM2.5 peste standarde UE). Crește incidența astmului la tinerii din orașele mari.",
            biologic1: "Echilibru sezonier moderat. Utilizarea excesivă a ecranelor/dispozitivelor tech nocturne generează un deficit cronic de somn la peste 40% din tineri.",
            biologic2: "Polarizare nutrițională: obezitate în creștere în mediul urban (fast-food) și deficiențe de micronutrienți în ruralul izolat."
        },
        criticaEdu: "Deși internetul acoperă 93.2%, lipsa hardware-ului dedicat (doar 76%) blochează platformele educaționale în mediul rural, reducând utilizarea rețelei la consum pasiv pe smartphone și accentuând abandonul școlar.",
        criticaBio: "Verile caniculare în școli neclimatizate și poluarea cu PM2.5 din marile orașe fragilizează rezistența tinerilor, în timp ce malnutriția ascunsă din rural generează disparități biologice severe în ritmul de dezvoltare."
    },
    tailanda: {
        countryName: "Tailanda",
        key: "tailanda",
        meta: { an: "2025", sursa: "WHO / UNESCO / Thai Health Report" },
        kpi: { educatie: "76.5%", internet: "87.0%", dispozitive: "69.5%" },
        chartData: [76.5, 87.0, 69.5],
        history: { 
            internet: [74.2, 78.5, 82.0, 85.1, 87.0],
            educatie: [75.0, 75.5, 75.8, 76.2, 76.5],
            dispozitive: [61.0, 63.5, 66.0, 68.2, 69.5]
        },
        // [Stabilitate Termică, Calitate Aer, Ritm Circadian, Securitate Nutrițională]
        radarScores: [40, 35, 50, 64],
        bioClimate: {
            climatic1: "Stres termic extrem (Umiditate crescută + temperaturi constante >35°C). Provoacă oboseală termică cronică, letargie și scăderea capacității cognitive a adolescenților.",
            climatic2: "Criză anuală de PM2.5 provocată de arderile agricole (Sezonul Fumului în Nord). Școlile se închid fizic, forțând trecerea la e-learning.",
            biologic1: "Clima tropicală uniformă menține lungimea zilei egală, dar somnul tinerilor este profund perturbat în nopțile tropicale fără acces la aer condiționat.",
            biologic2: "Dubla povară a malnutriției: subnutriție reziduală în provincii și o explozie a obezității urbane din cauza dietelor bogate în zaharuri procesate."
        },
        criticaEdu: "Decalajul dintre internet (87%) și PC-uri (69.5%) devine o barieră critică atunci când poluarea silită închide școlile, lăsând elevii săraci blocați în afara orelor online din lipsă de hardware.",
        criticaBio: "Stresul termic extrem tropical cumulat cu crizele toxice sezoniere de PM2.5 (Sezonul Fumului) provoacă letargie cronică și degradarea somnului, afectând biologic capacitatea de concentrare pe termen lung."
    },
    brazilia: {
        countryName: "Brazilia",
        key: "brazilia",
        meta: { an: "2025", sursa: "IBGE / WHO / UNICEF" },
        kpi: { educatie: "82.3%", internet: "85.1%", dispozitive: "63.0%" },
        chartData: [82.3, 85.1, 63.0],
        history: { 
            internet: [72.5, 76.0, 80.3, 83.2, 85.1],
            educatie: [80.1, 80.8, 81.4, 81.9, 82.3],
            dispozitive: [58.0, 59.5, 61.0, 62.1, 63.0]
        },
        // [Stabilitate Termică, Calitate Aer, Ritm Circadian, Securitate Nutrițională]
        radarScores: [50, 45, 55, 58],
        bioClimate: {
            climatic1: "Valuri de căldură extreme combinate cu secete severe în regiunile interioare. Provoacă deshidratare și vulnerabilități imunitare.",
            climatic2: "Poluare masivă generată de incendiile din Amazonia și smogul din megacity-uri. Afectează direct sănătatea pulmonară a tinerilor expuși.",
            biologic1: "Variații climatice regionale de la ecuatorial la subtropical. Ritmul veghe-somn este dictat puternic de condițiile socio-economice din favele, nu doar de climă.",
            biologic2: "Insecuritate alimentară severă în zonele vulnerabile, contrastând cu obezitatea epidemică din Sudul dezvoltat."
        },
        criticaEdu: "Utilizarea internetului (85.1%) este mascată de dependența exclusivă de conexiuni mobile preplătite pe smartphone. Lipsa computerelor (63%) limitează accesul tinerilor din favele la materiale didactice avansate.",
        criticaBio: "Incendiile extinse și smogul din megacity-uri generează probleme respiratorii severe la adolescenți, în timp ce insecuritatea alimentară din regiunile aride blochează ritmul natural de dezvoltare fizică."
    },
    kenya: {
        countryName: "Kenya",
        key: "kenya",
        meta: { an: "2025", sursa: "UNICEF / World Bank / WHO" },
        kpi: { educatie: "54.2%", internet: "41.0%", dispozitive: "24.5%" },
        chartData: [54.2, 41.0, 24.5],
        history: { 
            internet: [29.5, 32.1, 35.0, 38.4, 41.0],
            educatie: [51.0, 52.3, 53.0, 53.7, 54.2],
            dispozitive: [18.2, 20.0, 21.5, 23.0, 24.5]
        },
        // [Stabilitate Termică, Calitate Aer, Ritm Circadian, Securitate Nutrițională]
        radarScores: [30, 25, 40, 35],
        bioClimate: {
            climatic1: "Secete prelungite alternate cu inundații distructive asociate cu schimbările climatice extreme, destabilizând infrastructura comunităților.",
            climatic2: "Poluare casnică severă (fum de biomasă în gospodăriile rurale fără electricitate). Afectează grav plămânii adolescenților încă din copilărie.",
            biologic1: "Poziționare ecuatorială cu fotoperioadă fixă de 12h. Totuși, lipsa iluminatului artificial domestic limitează drastic orele de studiu nocturn ale tinerilor.",
            biologic2: "Rate ridicate de retard în dezvoltarea fizică (stunting) din cauza malnutriției cronice, afectând direct capacitățile cognitive și vigoarea biologică."
        },
        criticaEdu: "Cu un acces la dispozitive de doar 24.5%, tehnologia digitală rămâne un lux. În lipsa electrificării domestice rurale, internetul nu poate acționa ca un vector de sprijin pentru educația secundară (54.2%).",
        criticaBio: "Poluarea casnică prin arderea lemnului și malnutriția cronică severă (stunting) pun o presiune biologică extremă pe tineri, transformând simpla supraviețuire fizică în prioritatea zilnică a gospodăriilor."
    }
};