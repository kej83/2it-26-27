# Oppgave: Bygg et hotellbookingsystem i Node.js

I denne oppgaven skal du lage et konsollbasert bookingsystem for et lite hotell med 5 rom. Du skal bruke Node.js og den innebygde `readline`-modulen til å ta imot input fra brukeren i terminalen.

---

## 1. Introduksjon: Interaktiv input med `readline`

Når du kjører JavaScript i Node.js, har du ikke tilgang til `prompt()` som i nettleseren. I stedet bruker vi Node.js sin innebygde modul **`readline`**.

### Hvordan fungerer `readline`?

For å lese input fra terminalen må vi:

1. Importere `readline`-modulen.
2. Opprette et grensesnitt (`interface`) knyttet til terminalen (`process.stdin` og `process.stdout`).
3. Bruke metoden `rl.question()` til å stille spørsmål.

### Eksempel på bruk:
Test dette nå, lag en `test.js` fil og kjør.

```javascript
const readline = require('readline');

// Oppretter grensesnittet mot terminalen
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Stiller et spørsmål til brukeren
rl.question('Hva heter du? ', (svar) => {
  console.log(`Hei, ${svar}!`);
  
  // VIKTIG: Husk å lukke grensesnittet når du er ferdig!
  rl.close();
});

```

---

## 2. Hovedoppgave: Hotell bookingsystem

Du skal lage et skript i VS Code som holder styr på et hotell med 5 rom (rom 1 til 5).

### Datastruktur

Bruk en tabell (array) med 5 plasser til å ta vare på romstatus.

* Dersom rommet er ledig, kan det stå `null` eller `""` (tom streng).
* Dersom noen har sjekket inn, lagres gjestenes navn på den aktuelle plassen i tabellen.

```javascript
// Eksempel: Rom 1 er ledig, Jens bor på rom 2
let rom = [null, "Jens", null, null, null];

```

### Menyfunksjonalitet

Programmet skal kjøre i en løkke (evt. en funksjon som kaller seg selv) og vise følgende meny helt til brukeren velger å avslutte:

```text
=== HOTELL BOOKINGSYSTEM ===
1. Vis oversikt over rom
2. Vis antall ledige og opptatte rom
3. Sjekk inn gjest
4. Sjekk ut gjest
5. Bytt rom
6. Avslutt

```

---

### Krav til funksjonene:

1. **Vis oversikt over rom**: Skriv ut status for alle 5 rom (f.eks. `Rom 1: Ledig`, `Rom 2: Jens`).
2. **Vis antall ledige og opptatte rom**: Tell opp og skriv ut hvor mange rom som er ledige og hvor mange som er opptatt.
3. **Sjekk inn gjest**:
* Spør etter romnummer (1–5) og gjestenes navn.
* Sjekk om rommet allerede er opptatt før du sjekker inn.


4. **Sjekk ut gjest**:
* Spør etter romnummer (1–5).
* Sett rommet til `null` (ledig).


5. **Bytt rom**:
* **OBS! Kraver to inputs etter hverandre.**
* Spør først etter romnummeret gjesten bor på nå (*Fra rom*).
* Spør deretter etter romnummeret gjesten skal flytte til (*Til rom*).
* Sjekk om målrommet er ledig før du flytter gjesten.



---

## 3. Eksempel på kodestruktur / Tips

Opprett en fil som heter `hotell.js` i VS Code. Du kan ta utgangspunkt i denne malen:

```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Datastruktur: 5 rom (indeks 0–4 tilsvarer rom 1–5)
let rom = [null, null, null, null, null];

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

    rl.question('Skriv inn navn på gjest: ', (navn) => {
      // TODO: Lagre navnet i arrayen
      console.log(`${navn} ble sjekket inn på rom ${romIndeks + 1}.`);
      
      visMeny();
    });
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

```

### Kjøre koden

Åpne terminalen i VS Code (`Ctrl + ~` eller `Cmd + ~` på Mac) og kjør:

```bash
node hotell.js

```

---

## 🌟 Ekstra utfordring (Valgfri)

### Utvid til 2D-array (Flere etasjer)

Utvid hotellet til å ha **3 etasjer** med **4 rom per etasje**.

1. Endre `rom`-datastrukturen til en 2D-array (matrise):

```javascript
let hotell = [
  [null, null, null, null], // Etasje 1 (Rom 101, 102, 103, 104)
  [null, null, null, null], // Etasje 2 (Rom 201, 202, 203, 204)
  [null, null, null, null]  // Etasje 3 (Rom 301, 302, 303, 304)
];

```

2. Oppdater alle funksjoner slik at brukeren må oppgi både **etasje** og **romnummer** (eller bruk 3-sifrede romnummer som `101`, `203` osv. som du gjør om til etasje- og rom-indeks).

---