# Kapittel 2: Logiske uttrykk og if-else

*JavaScript med Node.js — hefte 2 i serien. Bygger på hefte 1: Variabler.*

---

## Slik jobber du med dette heftet

Heftet følger arbeidsmåten **PRIMM**. Hvert delkapittel starter med et lite program, og du jobber deg gjennom disse stegene:

- **Predict (forutsi):** Les koden, og forsøk å forutsi hva som blir resultatet. Dette steget egner seg godt for diskusjon i par eller små grupper.
- **Run (kjør):** Skriv av koden, og kjør programmet. Forklar eventuelle avvik mellom forventet og faktisk resultat.
- **Investigate (undersøk):** Gjør små endringer i koden, forutsi hva som vil skje, og kjør på nytt.
- **Modify (endre):** Gjør større endringer. Utvid programmet, eller lag et liknende program som bygger på dette.
- **Make (lag):** Lag ditt helt eget program. Dette nivået møter du i oppgavesettet bakerst i heftet.

Stegene er merket slik i teksten: **[Predict]**, **[Run]**, **[Investigate]**, **[Modify]** og **[Make]**.

### Husk fra hefte 1: Variabler

Du kjører et program med Node.js fra kommandolinja, og du kan sende med argumenter etter filnavnet:

```text
node app.js Ola
```

Inne i programmet henter du argumentene slik:

```js
let navn = process.argv[2];         // første argument, som tekst
let tall = Number(process.argv[3]); // andre argument, gjort om til tall
```

> **💡 Husk:** Argumenter fra kommandolinja er alltid **tekst**. Skal du regne eller sammenligne med tall, må du gjøre argumentet om til et tall med `Number(...)`.

> **🐞 Når noe går galt:** Får du en feilmelding, ikke få panikk — les den! Node forteller deg både **filnavn**, **linjenummer** og hva slags feil det er (for eksempel `SyntaxError`). Å lese feilmeldinger er en av de viktigste ferdighetene en utvikler har.

---

## 2.1 Enkel if-setning

```js
let fart = Number(process.argv[2]);
let fartsgrense = 80;
console.log(`Din fart er ${fart} km/t`);
```

Vi skal skrive et program som sjekker om en bil kjører over fartsgrensen.

1. Les koden ovenfor. Hva blir resultatet når du kjører `node fart.js 70`? **[Predict]**
2. Lag fila `fart.js`, skriv av koden, og kjør programmet med `node fart.js 70`. **[Run]**
3. Kjør programmet på nytt med `node fart.js 95`.
4. Utvid koden som vist nedenfor. Her bruker vi en `if`-setning for å kontrollere om farten er høyere enn fartsgrensen. **[Modify]**

```js
let fart = Number(process.argv[2]);
let fartsgrense = 80;
console.log(`Din fart er ${fart} km/t`);
if (fart > fartsgrense) {
  console.log("Du kjører for fort!");
}
```

En `if`-setning i JavaScript består av tre deler:

| Del | Eksempel | Forklaring |
|---|---|---|
| Nøkkelordet `if` | `if` | starter setningen |
| Et vilkår i parentes | `(fart > fartsgrense)` | et logisk uttrykk som blir `true` eller `false` |
| En blokk i krøllparenteser | `{ ... }` | kodelinjene som bare kjøres hvis vilkåret er `true` |

> **💡 Tips:** Kodelinjer inne i en blokk skal ha innrykk på to mellomrom. Node bryr seg ikke om innrykket, men mennesker gjør det — kode uten innrykk er nesten umulig å lese. Venn deg til det med en gang: det er slik utviklere skriver kode.

5. Kjør programmet både med `node fart.js 95` og `node fart.js 70`. Forklar forskjellen på de to kjøringene. **[Investigate]**
6. Endre programmet slik at det også regner ut hvor mange km/t du bryter fartsgrensen med. Utskriften ved `node fart.js 95` skal være: **[Modify]**

```text
Din fart er 95 km/t
Senk farten! Du kjører 15 km/t over fartsgrensen.
```

---

## 2.2 Logiske uttrykk

```js
let tall = Number(process.argv[2]);
console.log(tall > 10);
console.log(tall < 10);
console.log(tall === 10);
```

Uttrykk som `tall > 10` kalles **logiske uttrykk**. Et logisk uttrykk har alltid én av to verdier: `true` (sant) eller `false` (usant). I forrige delkapittel brukte vi et logisk uttrykk som vilkår i en `if`-setning. Nå skal vi undersøke uttrykkene for seg selv.

1. Les koden. Hva blir de tre utskriftene når du kjører `node uttrykk.js 12`? **[Predict]**
2. Lag fila `uttrykk.js`, skriv av koden, og kjør programmet med `node uttrykk.js 12`. **[Run]**
3. Kjør programmet med `node uttrykk.js 10`. Gjett på resultatet først. **[Investigate]**

JavaScript har disse sammenligningsoperatorene:

| Operator | Betydning | Eksempel | Resultat |
|---|---|---|---|
| `===` | er lik | `5 === 5` | `true` |
| `!==` | er ikke lik | `5 !== 5` | `false` |
| `>` | større enn | `7 > 10` | `false` |
| `<` | mindre enn | `7 < 10` | `true` |
| `>=` | større enn eller lik | `10 >= 10` | `true` |
| `<=` | mindre enn eller lik | `12 <= 10` | `false` |

> **⚠️ Merk:** Ett likhetstegn og tre likhetstegn gjør helt forskjellige ting! Kodelinja `tall = 10` **tildeler** verdien 10 til variabelen `tall`, mens `tall === 10` **tester** om `tall` er lik 10.

4. Legg til to nye kodelinjer som skriver ut resultatet av `tall >= 10` og `tall !== 10`. Kjør programmet med argumentene 9, 10 og 11. **[Investigate]**
5. Fjern `Number(...)` på første kodelinje, slik at den blir `let tall = process.argv[2];`. Kjør `node uttrykk.js 10` på nytt. Hvilken utskrift endret seg? **[Investigate]**

> **⚠️ Merk:** Argumentet fra kommandolinja er teksten `"10"`, ikke tallet `10`. Operatoren `===` krever at både **verdien og typen** er lik, så `"10" === 10` er `false`. Det finnes også en operator `==` som slurver med typene — den skal du ikke bruke. Utviklere bruker `===` og `!==`.

6. Angre endringen, slik at første kodelinje igjen bruker `Number(...)`.
7. Logiske uttrykk kan også sammenligne tekst. Lag fila `hilsen.js` med koden nedenfor, og kjør både `node hilsen.js Ola` og `node hilsen.js Kari`. **[Investigate]**

```js
let navn = process.argv[2];
console.log(navn === "Ola");
```

8. Utvid `hilsen.js` med en `if`-setning som skriver ut `Hei, sjef!` bare når navnet er `Ola`. **[Modify]**

---

## 2.3 Vilkår med if og else

```js
let tall = Number(process.argv[2]);
if (tall % 2 === 0) {
  console.log(`${tall} er et partall`);
}
```

Vi skal lage et program som undersøker delelighet.

> **💡 Husk fra hefte 1:** Operatoren `%` gir **resten** i en heltallsdivisjon. For eksempel gir `6 % 2` resultatet `0`, mens `7 % 2` gir `1`. Et tall er altså et partall nøyaktig når `tall % 2 === 0`.

1. Les koden. Hva skjer når du kjører `node partall.js 8`? Hva med `node partall.js 13`? **[Predict]**
2. Lag fila `partall.js`, skriv av koden, og kjør begge kjøringene fra steg 1. **[Run]**

Ved `node partall.js 13` skriver ikke programmet ut noen ting. Det vil vi gjøre noe med. Med `else` kan vi bestemme hva som skal skje når vilkåret er `false`:

3. Utvid koden med en `else`-blokk: **[Modify]**

```js
let tall = Number(process.argv[2]);
if (tall % 2 === 0) {
  console.log(`${tall} er et partall`);
} else {
  console.log(`${tall} er et oddetall`);
}
```

4. Kjør programmet flere ganger med både partall og oddetall som argument. **[Run]**

Videre kan vi undersøke delelighet med andre tall enn 2. La oss undersøke om tallet er delelig med 7.

5. Legg til følgende kodelinjer i riktig rekkefølge nederst i programmet: **[Modify]**

```text
┌─────────────────────────────────────────┐
│   console.log("Ikke delelig med 7");    │
├─────────────────────────────────────────┤
│ } else {                                │
├─────────────────────────────────────────┤
│   console.log("Delelig med 7");         │
├─────────────────────────────────────────┤
│ if (tall % 7 === 0) {                   │
├─────────────────────────────────────────┤
│ }                                       │
└─────────────────────────────────────────┘
```

6. Test programmet med argumentene 14, 21 og 22.

---

## 2.4 if, else if og else

| Alder | Kinobillett |
|---|---|
| Under 12 år | 80 kr |
| 12–17 år | 120 kr |
| 18 år og over | 150 kr |

Vi skal lage et program som tar inn alderen din og skriver ut riktig billettpris på kino.

1. Les koden nedenfor. Hva blir resultatet av `node kino.js 8`? **[Predict]**

```js
let alder = Number(process.argv[2]);
if (alder < 12) {
  console.log("Billetten koster 80 kr");
}
```

2. Lag fila `kino.js`, skriv av koden, og kjør programmet. **[Run]**
3. Legg til en ny `if`-setning nederst for å undersøke om alderen er under 18: **[Modify]**

```js
if (alder < 18) {
  console.log("Billetten koster 120 kr");
}
```

4. Kjør `node kino.js 8` på nytt. Programmet skriver nå ut **to** priser. Forklar hvorfor. **[Investigate]**
5. Endre `if (alder < 18) {` til `else if (alder < 18) {`. Kjør `node kino.js 8` og deretter `node kino.js 14`. Hva er forskjellen på `if` og `else if`? **[Investigate]**
6. Legg til en `else`-blokk til slutt: **[Modify]**

```js
let alder = Number(process.argv[2]);
if (alder < 12) {
  console.log("Billetten koster 80 kr");
} else if (alder < 18) {
  console.log("Billetten koster 120 kr");
} else {
  console.log("Billetten koster 150 kr");
}
```

7. Gjett hva som blir utskriften for argumentene 25, 12 og 11, før du kjører programmet med hver av dem. **[Predict]**

Programmet leses ovenfra og ned: JavaScript tester vilkårene ett for ett, og kjører blokka til det **første** vilkåret som er `true`. Resten av kjeden hoppes over. Derfor trenger ikke vilkåret på linje 4 å si `alder >= 12 && alder < 18` — kommer programmet dit, vet vi allerede at alderen er minst 12.

8. Bytt rekkefølge på de to første vilkårene, slik at programmet tester `alder < 18` først og `alder < 12` etterpå. Kjør `node kino.js 8`. Hva gikk galt, og hvorfor? **[Investigate]**
9. Bytt tilbake til riktig rekkefølge.
10. Kinoen innfører honnørbillett: alle som er 67 år eller eldre, skal betale 110 kr. Utvid programmet med en ny `else if`-gren. Tenk gjennom hvor i kjeden den må stå. Test godt! **[Modify]**

---

## 2.5 Vilkår med ||

For å kjøre Kristines Karusell, må du oppfylle **minst ett** av to krav:

- Du er minst 12 år.
- Du er høyere enn 140 cm.

```js
let alder = Number(process.argv[2]);
let hoyde = Number(process.argv[3]);
if (alder >= 12) {
  console.log("Du kan kjøre karusellen");
}
if (hoyde > 140) {
  console.log("Du kan kjøre karusellen");
}
```

Dette programmet tar imot **to** argumenter: alder og høyde. Det kjøres for eksempel slik: `node karusell.js 13 150`.

1. Les koden. Hva blir resultatet av `node karusell.js 13 150`? **[Predict]**
2. Lag fila `karusell.js`, skriv av koden, og kjør `node karusell.js 13 150`. **[Run]**

Vi ser at meldingen `Du kan kjøre karusellen` dukket opp to ganger. Det er helt klart unødvendig. Vi kan slå sammen de to `if`-setningene med den **logiske operatoren** `||`, som betyr **eller**:

3. Endre programmet slik: **[Modify]**

```js
let alder = Number(process.argv[2]);
let hoyde = Number(process.argv[3]);
if (alder >= 12 || hoyde > 140) {
  console.log("Du kan kjøre karusellen");
}
```

4. Test programmet med følgende argumenter. Gjett på resultatet før hver kjøring: **[Predict]**
   - `node karusell.js 13 150`
   - `node karusell.js 11 150`
   - `node karusell.js 11 140`
5. Legg til kode slik at brukeren får tilbakemeldingen `Beklager, du kan ikke kjøre karusellen` dersom ingen av kravene er oppfylt. **[Modify]**

> **💡 Tips:** Tegnet `|` skrives på norsk tastatur med tasten til venstre for `1` (sammen med `§`), ofte i kombinasjon med `AltGr` eller `Shift` avhengig av tastaturet ditt.

---

## 2.6 Boolske variabler, && og !

```js
let fiskIVannet = true;
let likerAgnet = false;
if (fiskIVannet) {
  console.log("Du får fisk");
}
```

Variabler kan også gis verdiene `true` eller `false`, i tillegg til tall eller tekst. En variabel som lagrer `true` eller `false`, kaller vi en **boolsk** variabel. Legg merke til at vilkåret i `if`-setningen bare er variabelen selv — den er allerede `true` eller `false`, så vi trenger ingen sammenligning.

> **💡 Tips:** I JavaScript skriver vi variabelnavn med **camelCase**: første ord med liten bokstav, og hvert nye ord med stor bokstav, som i `fiskIVannet` og `likerAgnet`. Slik navngir profesjonelle JavaScript-utviklere variablene sine.

1. Les koden. Hva blir resultatet? **[Predict]**
2. Lag fila `fisketur.js`, skriv av koden, og kjør programmet med `node fisketur.js`. Dette programmet trenger ingen argumenter. **[Run]**

For å få fisk bør fisken også like agnet. Vi kan sette sammen to vilkår med den logiske operatoren `&&`, som betyr **og**:

3. Endre `if`-setningen slik: **[Modify]**

```js
if (fiskIVannet && likerAgnet) {
  console.log("Du får fisk");
}
```

4. Prøv følgende verdier ved å endre på kodelinje 1 og 2. Kjør programmet på nytt hver gang: **[Investigate]**
   - `fiskIVannet = false` og `likerAgnet = true`
   - `fiskIVannet = true` og `likerAgnet = true`
5. Legg til en `else`-blokk slik at utskriften `Du får ikke fisk` vises dersom minst én av variablene er `false`. **[Modify]**

Den siste logiske operatoren er `!`, som betyr **ikke**. Uttrykket `!likerAgnet` er `true` nøyaktig når `likerAgnet` er `false` — altså det motsatte.

6. Legg til følgende `if`-setning nederst i programmet, og kjør programmet med begge verdier av `likerAgnet`: **[Investigate]**

```js
if (!likerAgnet) {
  console.log("Tips: prøv et annet agn!");
}
```

Vi har nå møtt alle de tre logiske operatorene:

| Operator | Navn | `true` når ... |
|---|---|---|
| `&&` | og | **begge** uttrykkene er `true` |
| `\|\|` | eller | **minst ett** av uttrykkene er `true` |
| `!` | ikke | uttrykket bak er `false` |

---

## 2.7 Størst av flere tall

```js
let a = Number(process.argv[2]);
let b = Number(process.argv[3]);
console.log(`a = ${a}, b = ${b}`);
if (a > b) {
  console.log("a er størst");
}
```

Vi skal lage et program som finner det største av to tall, deretter av tre tall.

1. Les koden. Hva blir resultatet av `node storst.js 7 4`? **[Predict]**
2. Lag fila `storst.js`, skriv av koden, og kjør programmet. **[Run]**
3. Legg til en `else`-blokk med utskriften `b er størst`. Kjør programmet med argumentene `7 4`, `3 9` og `5 5`. **[Modify]**
4. Hva skrev programmet ut da tallene var like? Stemmer det? Endre `else {` til `else if (b > a) {`, og legg til en ny `else`-blokk med utskriften `a og b er like`. **[Investigate]**

Vi legger til et tredje tall `c`, og skal finne det største av `a`, `b` og `c`.

5. Legg til kodelinja `let c = Number(process.argv[4]);` rett under `let b = ...`. **[Modify]**
6. Endre `console.log`-linja slik at den også skriver ut verdien til `c`.

For at `a` skal være størst, må `a` være større enn **både** `b` og `c`.

7. Endre `if (a > b) {` til `if (a > b && a > c) {`. **[Modify]**
8. Endre `else if (b > a) {` på tilsvarende måte for å undersøke om `b` er størst.
9. Fullfør programmet slik at det også fanger opp tilfellet der `c` er størst. Test med `node storst.js 3 8 5` og `node storst.js 2 4 9`. **[Modify]**

> **⚠️ Merk:** Programmet tar ikke hensyn til at to eller tre av tallene kan være like.

---

## Sammendrag

I dette kapitlet har du lært å bruke logiske uttrykk og `if`-setninger til å styre hvilken kode som kjøres — dette kalles å styre **kodeflyten**.

### Logiske uttrykk

Et logisk uttrykk er enten `true` eller `false`.

```js
let tall = 7;
console.log(tall > 5);
console.log(tall === 8);
console.log(tall !== 8);
```

```text
true
false
true
```

Sammenligningsoperatorene er `===` (lik), `!==` (ikke lik), `>`, `<`, `>=` og `<=`. Husk forskjellen på `=` (tildeling) og `===` (sammenligning). Operatoren `===` sammenligner både verdi og type: `"10" === 10` er `false`.

### Vilkår med if, else if og else

```js
let a = Number(process.argv[2]);
let b = Number(process.argv[3]);
if (a > b) {
  console.log("a er størst");
} else if (a < b) {
  console.log("b er størst");
} else {
  console.log("a og b er like");
}
```

```text
node storst.js 6 3
a er størst
```

Vilkårene testes ovenfra og ned, og bare blokka til det **første** sanne vilkåret kjøres. I stedet for `else {`, kunne vi her skrevet `else if (a === b) {`. Ofte er det å foretrekke, fordi det gjør hensikten med koden lettere å forstå.

### Logiske operatorer && og ||

```js
let a = 10;
let b = 15;
if (a > 0 && b === 15) {
  console.log("Her");
}
if (a > 0 && b % 2 === 0) {
  console.log("kommer");
}
if (a > 0 || b % 2 === 0) {
  console.log("jeg");
}
```

```text
Her
jeg
```

Ved bruk av `&&` må begge uttrykkene være `true` for at det hele skal bli `true`. Ved bruk av `||` er det tilstrekkelig at minst ett av uttrykkene er `true`.

### Boolske variabler og !

```js
let ferdig = false;
if (!ferdig) {
  console.log("Fortsett å jobbe");
}
```

```text
Fortsett å jobbe
```

En boolsk variabel lagrer `true` eller `false` og kan brukes direkte som vilkår. Operatoren `!` snur `true` til `false` og omvendt.

### Lese argumenter fra kommandolinja

```js
let navn = process.argv[2];
let alder = Number(process.argv[3]);
console.log(`${navn} er ${alder} år`);
```

```text
node app.js Ola 17
Ola er 17 år
```

---

## Oppgaver

### Del A — Enkle oppgaver

**Oppgave A1**

```js
if 3 < 5 {
  console.log("Det stemmer");
}
```

```js
if (3 > 5) {
  console.log("Det stemmer");
}
```

```js
if (3 < 5) {
  console.log("Det stemmer");
}
```

```js
if (3 < 5) {
  console.log("Det stemmer");
```

Bare én av de fire kodebitene gir utskriften `Det stemmer`. Finn den, uten å kjøre koden. Forklar hva som er galt med de tre andre. Skriv til slutt av den riktige kodebiten, og kjør den.

**Oppgave A2**

```text
┌──────────────────────────────────────┐
│ } else {                             │
├──────────────────────────────────────┤
│ let passord = process.argv[2];       │
├──────────────────────────────────────┤
│   console.log("Feil passord");       │
├──────────────────────────────────────┤
│ if (passord === "matte123") {        │
├──────────────────────────────────────┤
│   console.log("Riktig passord");     │
├──────────────────────────────────────┤
│ }                                    │
└──────────────────────────────────────┘
```

Sett sammen kodelinjene i den rekkefølgen som danner et meningsfylt program. Programmet skal lese inn et passord fra kommandolinja og skrive ut `Riktig passord` eller `Feil passord`. Test programmet med `node passord.js matte123` og `node passord.js hemmelig`.

**Oppgave A3**

```js
let a = 4;
let b = 7;
console.log(a < b);
console.log(a === 4);
console.log(b !== 7);
console.log(a > 0 && b > 10);
console.log(a > 0 || b > 10);
```

Les koden, og skriv ned på papir hva de fem utskriftene blir. Skriv deretter av koden, kjør programmet, og sjekk svarene dine.

**Oppgave A4**

```js
let tall = Number(process.argv[2]);
if tall > 100 {
  console.log("Stort tall");
} els {
  Console.log("Lite tall");
}
```

Koden inneholder tre feil. Rett alle feilene slik at programmet fungerer.

**Oppgave A5**

```js
let tall = Number(process.argv[2]);
if (...) {
  console.log("Tallet er positivt");
} else {
  ...
}
```

Skriv ferdig koden slik at brukeren kan kjøre programmet med et heltall som argument, og få vite om tallet er positivt eller ikke. Utskriften skal være enten `Tallet er positivt` eller `Tallet er ikke positivt`.

**Oppgave A6**

| Høyde (cm) | over 160 | over 130 | 130 eller lavere |
|---|---|---|---|
| Billettpris (kr) | 280 | 210 | 70 |

Prisen på inngangsbilletten til et lekeland varierer etter høyden på personen, som vist i tabellen. Lag et program som tar inn personens høyde i cm som argument, og skriver ut riktig billettpris. Bruk koden nedenfor, og plasser kodebitene på riktig plass der det mangler kode (`...`).

```js
let hoyde = Number(process.argv[2]);
let pris = 0;
if (...) {
  pris = 280;
} else if (hoyde > 130) {
  ...
} else {
  ...
}
console.log(`Billettprisen er ${pris} kr`);
```

```text
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  hoyde > 160    │  │  pris = 70;     │  │  pris = 210;    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Oppgave A7**

Lag et program som tar inn en alder som argument, og skriver ut `Du er myndig` dersom alderen er 18 eller mer, og `Du er ikke myndig` ellers. Kjøringen skal se slik ut:

```text
node myndig.js 20
Du er myndig
```

**Oppgave A8**

```js
let vekt = Number(process.argv[2]);
let maksVekt = 8;
if (...) {
  ...
} ... {
  ...
}
```

På et flyselskap kan håndbagasjen veie maks 8 kg. Skriv ferdig programmet slik at det tar inn vekta på bagasjen som argument, og skriver ut enten `Bagasjen er godkjent` eller `Bagasjen er for tung`. Bagasje på nøyaktig 8 kg er godkjent.

### Del B — Middels

**Oppgave B1**

Lag et program som tar inn to tall som argumenter, sammenligner dem, og skriver ut det minste tallet. Kjøringen skal se slik ut:

```text
node minst.js 9 4
Det minste tallet er 4
```

**Oppgave B2**

Lag et program som tar inn to heltall som argumenter, og undersøker om tallene er like. Dersom tallene er like, blir utskriften en tekst på formen `3 og 3, tallene er like`. Ellers blir utskriften en tekst på formen `2 og 4, ikke like`.

**Oppgave B3**

| | Voksen (16+) | Barn (under 16) |
|---|---|---|
| 3-timers kort | 250 kr | 120 kr |
| Dagskort | 420 kr | 200 kr |

Lag et program som tar inn ønsket billettype og alder som argumenter, og skriver ut riktig pris på inngangsbilletten til en dyrepark. Billettypen angis med `d` for dagskort og `k` for 3-timers kort. Kjøringen av programmet skal se slik ut:

```text
node dyrepark.js k 14
Din billettpris er 120 kr
```

> **💡 Tips:** Billettypen er tekst og skal ikke gjennom `Number(...)`. Sammenlign den med `billettype === "d"`.

**Oppgave B4**

```text
Les inn et heltall fra kommandolinja
Hvis tallet er delelig med både 3 og 5:
    skriv ut "TreFem"
Ellers hvis tallet er delelig med 3:
    skriv ut "Tre"
Ellers hvis tallet er delelig med 5:
    skriv ut "Fem"
Ellers:
    skriv ut tallet
```

Lag et program som følger algoritmen ovenfor. Test programmet med argumentene 15, 9, 10 og 7.

> **💡 Tips:** Rekkefølgen på vilkårene er viktig. Hva skjer dersom du tester delelighet med 3 først?

**Oppgave B5**

Et årstall er et **skuddår** dersom det er delelig med 4, men ikke med 100. Årstall som er delelige med 400, er likevel alltid skuddår. For eksempel var 2024 og 2000 skuddår, mens 1900 og 2023 ikke var det.

```js
let aar = Number(process.argv[2]);
let skuddaar = false;
if (aar % 4 === 0 && ...) {
  skuddaar = true;
}
if (...) {
  skuddaar = true;
}
if (skuddaar) {
  ...
} else {
  ...
}
```

Skriv ferdig programmet slik at utskriften blir på formen `2024 er et skuddår` eller `1900 er ikke et skuddår`. Test programmet med årstallene 2024, 2023, 1900 og 2000.

**Oppgave B6**

Fotlengde og skrittlengde fra fotavtrykk kan estimere høyde og bevegelsestype (gåing eller løping) ved bruk av følgende formler:

```text
Høyde = 7 * Fotlengde
Hoftehøyde = 4 * Fotlengde
Relativ skrittlengde = Skrittlengde / Hoftehøyde
```

Relativ skrittlengde indikerer om en person gikk (verdi under 2), løp (verdi over 2,9), eller om bevegelsestypen er uavklart (verdi mellom 2 og 2,9).

Lag et program som tar inn fotlengde og skrittlengde i cm som argumenter, og skriver ut høyden til personen og hvorvidt det er sannsynlig at personen løp eller gikk. Bruk formlene ovenfor.

### Del C — Mer krevende

**Oppgave C1**

```js
let tall1 = Number(process.argv[2]);
let regneart = process.argv[3];
let tall2 = Number(process.argv[4]);

if (regneart === "pluss") {
  console.log(`${tall1} + ${tall2} = ${tall1 + tall2}`);
}
```

Lag en kalkulator som støtter de fire grunnleggende regneartene. Regnearten angis med ordene `pluss`, `minus`, `gange` og `dele`, slik at kjøringen ser slik ut:

```text
node kalkulator.js 8 gange 3
8 * 3 = 24
```

Begynn med å studere og kjøre koden ovenfor, og utvid den deretter. Programmet skal i tillegg:

- skrive ut `Kan ikke dele på 0` dersom noen prøver nettopp det
- skrive ut `Ukjent regneart` dersom brukeren skriver noe annet enn de fire ordene

*Hvorfor bruker vi ordet `gange` i stedet for tegnet `*`? Fordi `*` har en spesiell betydning i mange kommandolinjer — det kan bli byttet ut med filnavn før programmet ditt får sett det.*

**Oppgave C2**

Tre sidelengder kan bare danne en trekant dersom summen av de to korteste sidene er større enn den lengste siden. En gyldig trekant er **likesidet** hvis alle sidene er like lange, **likebeint** hvis nøyaktig to sider er like lange, og ellers **ulikesidet**.

Lag et program som tar inn tre sidelengder som argumenter, og skriver ut én av tekstene `Ikke en gyldig trekant`, `Likesidet trekant`, `Likebeint trekant` eller `Ulikesidet trekant`. Test programmet grundig, for eksempel slik:

```text
node trekant.js 1 2 10   →  Ikke en gyldig trekant
node trekant.js 5 5 5    →  Likesidet trekant
node trekant.js 5 5 8    →  Likebeint trekant
node trekant.js 3 4 5    →  Ulikesidet trekant
```

> **💡 Tips:** For å sjekke at trekanten er gyldig uansett hvilken rekkefølge sidene skrives inn i, må alle tre betingelsene `a + b > c`, `a + c > b` og `b + c > a` være oppfylt.

**Oppgave C3**

Lag et program som tar inn en dato som tre argumenter — dag, måned og år — og undersøker om datoen er gyldig. Programmet skal skrive ut `Gyldig dato` eller `Ugyldig dato`.

```text
node dato.js 29 2 2024
Gyldig dato

node dato.js 29 2 2023
Ugyldig dato

node dato.js 31 4 2026
Ugyldig dato
```

Husk at månedene har ulikt antall dager: januar, mars, mai, juli, august, oktober og desember har 31 dager; april, juni, september og november har 30; februar har 28 — men 29 i skuddår. Gjenbruk skuddårslogikken fra oppgave B5.

> **💡 Tips:** Lag først en variabel `dagerIMaaneden`, og bruk en `if`/`else if`-kjede til å gi den riktig verdi ut fra måneden. Sjekk til slutt at dagen er minst 1 og høyst `dagerIMaaneden`, og at måneden er mellom 1 og 12.

---

*Hefte 2 av serien «JavaScript fra bunnen av». Neste hefte: Objekter.*
