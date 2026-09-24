const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Datastruktur: 5 rom (indeks 0–4 tilsvarer rom 1–5)
let rom = [null, "Jens", null, "Sara", null];

// ==========================================
// 1. HOVEDMENY OG STYRING
// ==========================================

function visMeny() {
    console.log('\n=== HOTELL BOOKINGSYSTEM ===');
    console.log('1. Vis oversikt over rom');
    console.log('2. Vis antall ledige/opptatte rom');
    console.log('3. Sjekk inn gjest');
    console.log('4. Sjekk ut gjest');
    console.log('5. Bytt rom');
    console.log('6. Avslutt');

    rl.question('Velg et alternativ (1-6): ', (valg) => {
        behandleValg(valg.trim());
    });
}

function behandleValg(valg) {
    switch (valg) {
        case '1':
            visOversikt();
            break;
        case '2':
            visAntallLedigeOgOpptatte();
            break;
        case '3':
            sjekkInnGjest();
            break;
        case '4':
            sjekkUtGjest();
            break;
        case '5':
            byttRom();
            break;
        case '6':
            avslutt();
            break;
        default:
            console.log('Ugyldig valg, prøv igjen.');
            visMeny();
            break;
    }
}

// ==========================================
// 2. EGNE FUNKSJONER FOR HVERT VALG
// ==========================================

// Valg 1: Vis oversikt
function visOversikt() {
    console.log('\n--- ROMOVERSIKT ---');
    // TODO: Loop gjennom rom-arrayen og skriv ut status for hvert rom
    // Eksempel: Rom 1: Jens, Rom 2: Ledig
    for (let i = 0; i < rom.length; i++) {
        let ledig = rom[i] != null;
        if (ledig) {
            console.log(`Rom ${i + 1}: ${rom[i]} `)
        } else {
            console.log(`Rom ${i + 1}: Ledig `)
        }
    }

    visMeny(); // Gå tilbake til menyen når du er ferdig
}

// Valg 2: Vis antall ledige og opptatte
function visAntallLedigeOgOpptatte() {
    console.log('\n--- STATUS ---');
    // TODO: Tell opp hvor mange rom som er null (ledige) og hvor mange som har navn (opptatte)

    visMeny();
}

// Valg 3: Sjekk inn gjest
function sjekkInnGjest() {
    console.log('\n--- INNSJEKKING ---');
    rl.question('Velg romnummer (1-5): ', (romStr) => {
        const romIndeks = parseInt(romStr) - 1;

        // TODO: Sjekk om romIndeks er gyldig (0-4) og om rommet er ledig
        if (romIndeks < 0 || romIndeks > 4) {
            console.log("Ugyldig romnr. Prøv igjen.");
            setTimeout(visMeny(), 2000);
        } else {
        rl.question('Skriv inn navn på gjest: ', (navn) => {
            // TODO: Lagre navnet i arrayen
            console.log(`${navn} ble sjekket inn på rom ${romIndeks + 1}.`);

            visMeny();
        });
        }
    });
}

// Valg 4: Sjekk ut gjest
function sjekkUtGjest() {
    console.log('\n--- UTSJEKKING ---');
    rl.question('Hvilket rom skal sjekkes ut (1-5)? ', (romStr) => {
        const romIndeks = parseInt(romStr) - 1;

        // TODO: Sjekk om rommet er opptatt, og sett det til null

        visMeny();
    });
}

// Valg 5: Bytt rom (krever to inputs)
function byttRom() {
    console.log('\n--- BYTT ROM ---');
    rl.question('Hvilket rom bor gjesten på nå (1-5)? ', (fraStr) => {
        const fraIndeks = parseInt(fraStr) - 1;

        rl.question('Hvilket rom skal gjesten flytte til (1-5)? ', (tilStr) => {
            const tilIndeks = parseInt(tilStr) - 1;

            // TODO: Sjekk at "fra"-rommet er opptatt og "til"-rommet er ledig før flytting

            visMeny();
        });
    });
}

// Valg 6: Avslutt
function avslutt() {
    console.log('Avslutter bookingsystemet. Ha en fin dag!');
    rl.close(); // Lukker readline-grensesnittet slik at skriptet stopper
}

// ==========================================
// START PROGRAMMET
// ==========================================
visMeny();
