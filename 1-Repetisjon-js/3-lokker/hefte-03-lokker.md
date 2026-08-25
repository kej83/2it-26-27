# Kapittel 3: Løkker

*JavaScript med Node.js — hefte 3 i serien. Bygger på hefte 1: Variabler og hefte 2: Logiske uttrykk og if-else.*

---

## Slik jobber du med dette heftet

Heftet følger arbeidsmåten **PRIMM**, som du kjenner fra de forrige heftene:

- **Predict (forutsi):** Les koden, og forsøk å forutsi hva som blir resultatet.
- **Run (kjør):** Skriv av koden, og kjør programmet. Forklar eventuelle avvik.
- **Investigate (undersøk):** Gjør små endringer, forutsi, og kjør på nytt.
- **Modify (endre):** Gjør større endringer og utvid programmet.
- **Make (lag):** Lag ditt helt eget program — i oppgavesettet bakerst.

> **💡 Tips:** Gjett alltid på resultatet etter hver endring, **før** du kjører programmet på nytt. Det er selve gjettingen som gjør at du lærer.

Løkker er kanskje det viktigste verktøyet i hele verktøykassa til en utvikler. En nettside som viser 50 produkter, tegner ikke hvert produkt for hånd — den gjentar den samme koden 50 ganger. En app som mister nettforbindelsen, prøver igjen og igjen til den lykkes. Alt dette er løkker.

---

## 3.1 Repetisjon fra hefte 1 og 2

```js
let brukernavn = process.argv[2];
let alder = Number(process.argv[3]);
let voksen = alder >= 18;
console.log(`Velkommen tilbake, ${brukernavn}!`);
console.log(`Om 10 år er du ${alder + 10} år.`);
if (voksen) {
  console.log("Du har tilgang til hele nettstedet.");
} else {
  console.log("Enkelte sider krever at du er over 18.");
}
```

Før vi lærer noe nytt, henter vi fram alt du kan fra før: variabler, datatyper, innlesing fra kommandolinja med `process.argv`, logiske uttrykk og `if`-`else`. Programmet ovenfor er innloggingshilsenen på et nettsted.

1. Les koden. Hva blir utskriften av `node innlogging.js Ola 17`? **[Predict]**
2. Lag fila `innlogging.js`, skriv av koden, og kjør programmet. Kjør også med deg selv som argument. **[Run]**
3. Legg merke til kodelinje 3: `alder >= 18` er et **logisk uttrykk** som blir `true` eller `false`, og verdien lagres i den **boolske variabelen** `voksen`.

Programmet bruker alle de tre datatypene du har lært:

| Datatype | Kalles i JavaScript | Eksempler |
|---|---|---|
| Tekst (streng) | `string` | `"Ola"`, `"matte123"` |
| Tall | `number` | `17`, `3.14`, `-5` |
| Boolsk verdi | `boolean` | `true`, `false` |

Med operatoren `typeof` kan du spørre JavaScript hvilken datatype en variabel har.

4. Legg til disse kodelinjene nederst, og kjør programmet: **[Investigate]**

```js
console.log(typeof brukernavn);
console.log(typeof alder);
console.log(typeof voksen);
```

5. Fjern `Number(...)` på kodelinje 2, slik at den blir `let alder = process.argv[3];`. Kjør `node innlogging.js Ola 17` på nytt. Hva ble utskriften på linja «Om 10 år ...»? Hva sier `typeof alder` nå? **[Investigate]**

> **⚠️ Merk:** Argumenter fra kommandolinja er alltid tekst. Uten `Number(...)` er `alder` teksten `"17"`, og `+` limer da sammen tekst i stedet for å regne: `"17" + 10` blir `"1710"`. Dette er en av de vanligste feilene i JavaScript — nå vet du hvordan du oppdager den med `typeof`.

6. Angre endringen, slik at kodelinje 2 igjen bruker `Number(...)`.

---

## 3.2 While-løkke

Skriv et program som skriver ut `Hei!` fem ganger. Foreløpig kan du bare løse det slik:

```js
console.log("Hei!");
console.log("Hei!");
console.log("Hei!");
console.log("Hei!");
console.log("Hei!");
```

1. Lag fila `hei.js`, skriv av koden, og kjør programmet. **[Run]**
2. Tenk deg at programmet skulle skrevet `Hei!` 1000 ganger. Hvor mange kodelinjer hadde du trengt?

Det må finnes en bedre måte — og det gjør det. En **løkke** gjentar kodelinjer så mange ganger vi vil:

3. Erstatt hele programmet med koden nedenfor, og kjør det. **[Run]**

```js
let i = 1;
while (i <= 5) {
  console.log("Hei!");
  i = i + 1;
}
```

En `while`-løkke ligner på en `if`-setning, men i stedet for å kjøre blokka én gang, kjører den blokka **om igjen og om igjen så lenge vilkåret er `true`**:

| Del | Eksempel | Forklaring |
|---|---|---|
| Startverdi | `let i = 1;` | telle-variabelen får en startverdi før løkka |
| Nøkkelordet `while` med vilkår | `while (i <= 5)` | et logisk uttrykk — akkurat som i en `if`-setning |
| Blokk | `{ ... }` | kodelinjene som gjentas |
| Oppdatering | `i = i + 1;` | telle-variabelen endres, ellers stopper løkka aldri |

4. Endre `i <= 5` til `i <= 1000`. Kjør programmet, og se kraften i en løkke. **[Investigate]**
5. Endre `console.log("Hei!")` til `` console.log(`Hei nr. ${i}`) ``. Kjør programmet, og se hvordan `i` endrer seg for hver runde. **[Investigate]**
6. Endre startverdien til `let i = 3;`. Hva blir første og siste utskrift? Gjett før du kjører. **[Predict]**
7. Endre `i <= 1000` tilbake til `i <= 5`, og endre deretter `<=` til `<`. Hvor mange ganger kjører løkka nå? **[Investigate]**

> **🐞 Uendelig løkke:** Fjern kodelinja `i = i + 1;` og kjør programmet. Vilkåret blir aldri `false`, så løkka stopper aldri — dette kalles en **uendelig løkke**. Trykk `Ctrl + C` i terminalen for å stoppe programmet. Alle utviklere lager uendelige løkker iblant; nå vet du hvordan du kommer deg ut av dem. Husk å sette kodelinja tilbake!

> **💡 Husk fra hefte 1:** Kortformen `i += 1` gjør det samme som `i = i + 1`. Enda kortere er `i++`, som også øker `i` med 1. Tilsvarende minker `i--` verdien med 1.

8. En løkke kan også telle **nedover**. Endre programmet til en nedtelling før en lansering: det skal telle ned fra 10 til 1, og til slutt skrive `Lansert!`. **[Modify]**

```text
10
9
...
1
Lansert!
```

> **💡 Tips:** Kodelinjer som står **etter** løkka (under den avsluttende `}`), kjøres først når løkka er helt ferdig. Det er der `Lansert!` hører hjemme.

---

## 3.3 For-løkke

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

Løkka i forrige delkapittel trengte tre ting: en startverdi, et vilkår og en oppdatering. I en `for`-løkke samler vi alle tre på én linje, adskilt med semikolon:

```text
for (startverdi; vilkår; oppdatering) {
  kodelinjene som gjentas
}
```

1. Les koden øverst. Hvilke tall skrives ut? Legg merke til at løkka starter på 0. **[Predict]**
2. Lag fila `teller.js`, skriv av koden, og kjør programmet. **[Run]**

Nedenfor ser du fire kodebiter som inneholder feil.

```js
for (let i = 0: i < 3: i++) {
  console.log(i);
}
```

```js
for let i = 0; i < 3; i++ {
  console.log(i);
}
```

```js
for (let i = 0; i < 3; i++)
  console.log(i);
}
```

```js
for (let i = 0; i < 3; i--) {
  console.log(i);
}
```

3. Bestem feilen i hvert av de fire tilfellene. Én av kodebitene er ekstra lumsk: den gir ingen feilmelding, men stopper aldri. Hvilken, og hvorfor? **[Investigate]**
4. Endre `i < 3` til `i < 5` i programmet ditt. Kjør programmet. **[Investigate]**
5. Endre `i < 5` til `i < 8`. Gjett på hvilket tall som blir skrevet ut til sist, før du kjører.
6. Endre startverdien slik at løkka starter på 2.
7. Endre løkka slik at den skriver ut alle hele tall fra og med -10 til og med -1.
8. Skriv ut alle hele tall fra og med -5 **til og med** 10. **[Modify]**

> **⚠️ Merk:** Vilkåret `i < 8` betyr at 8 **ikke** er med — siste tall blir 7. Vil du ha med 8, skriver du `i <= 8`. Forskjellen på `<` og `<=` kjenner du fra hefte 2.

Et nettsted trenger midlertidige brukernavn til alle som ikke har logget inn: `gjest1`, `gjest2`, `gjest3` og så videre.

9. Endre programmet slik at det skriver ut brukernavnene `gjest1` til og med `gjest100`, ett per linje. Bruk en template-streng med `${...}`, slik du lærte i hefte 1. **[Modify]**

---

## 3.4 Bygge tekst med løkker

```js
let strek = "";
for (let i = 0; i < 20; i++) {
  strek = strek + "=";
}
console.log(strek);
console.log("  VELKOMMEN TIL NETTBUTIKKEN");
console.log(strek);
```

Utviklere bruker ofte løkker til å **bygge opp tekst**, bit for bit. Trikset er en tekstvariabel som starter tom (`""`), og som får limt på litt mer tekst for hver runde i løkka — akkurat slik du limte sammen tekster med `+` i hefte 1.

1. Les koden. Hvordan ser utskriften ut? **[Predict]**
2. Lag fila `banner.js`, skriv av koden, og kjør programmet. **[Run]**
3. Endre `i < 20` til `i < 40`. Kjør programmet. **[Investigate]**
4. Endre `"="` til `"-"`. Kjør programmet.
5. Endre programmet slik at bredden på streken leses inn fra kommandolinja: `node banner.js 30` skal gi en strek på 30 tegn. **[Modify]**

Nå skal vi bygge noe enda mer nyttig: HTML — språket alle nettsider er skrevet i. En punktliste i HTML ser slik ut: `<ul>` starter lista, hvert punkt ligger i `<li>` og `</li>`, og `</ul>` avslutter lista.

6. Lag fila `liste.js` med koden nedenfor. Les den først, og gjett på utskriften. **[Predict]**

```js
let html = "<ul>\n";
for (let i = 1; i <= 3; i++) {
  html = html + `  <li>Produkt ${i}</li>\n`;
}
html = html + "</ul>";
console.log(html);
```

> **💡 Nytt:** Tegnkombinasjonen `\n` inne i en tekst betyr **linjeskift**. Uten den hadde hele HTML-koden havnet på én lang linje.

7. Kjør programmet. Utskriften skal bli: **[Run]**

```text
<ul>
  <li>Produkt 1</li>
  <li>Produkt 2</li>
  <li>Produkt 3</li>
</ul>
```

8. Endre programmet slik at lista får 8 punkter. **[Investigate]**
9. Endre programmet slik at antall punkter leses inn fra kommandolinja. **[Modify]**

Dette er ikke en lekeoppgave: det er nøyaktig slik nettsider blir til. Når en nettbutikk viser 500 varer, er det en løkke som har generert HTML for hver eneste vare. Senere i utdanningen din skal rammeverk gjøre dette for deg — men nå vet du hva som faktisk skjer under panseret.

---

## 3.5 Samle opp verdier med løkker

```js
let poeng = 100;
let total = 0;
for (let nivaa = 1; nivaa <= 3; nivaa++) {
  total = total + poeng;
  poeng = poeng + 50;
}
console.log(`Totalt ${total} poeng`);
```

I et spill får du 100 poeng for å klare nivå 1, og hvert nivå gir 50 poeng mer enn det forrige: 100, 150, 200, ... Programmet ovenfor regner ut totalsummen etter tre nivåer.

Trikset er en variabel `total` som starter på 0, og som får hvert nivås poeng lagt til seg — én runde av gangen. Dette mønsteret kalles en **akkumulator**, og du finner det overalt: handlekurver som summerer priser, spill som teller poeng, apper som teller skritt.

1. Les koden nøye. Følg med på hvordan variablene endrer seg for hver runde: fyll ut en tabell som denne på papir, før du kjører programmet: **[Predict]**

| Runde | `poeng` ved start | `total` etter runden | `poeng` etter runden |
|---|---|---|---|
| 1 | 100 | 100 | 150 |
| 2 | 150 | ? | ? |
| 3 | ? | ? | ? |

2. Lag fila `poeng.js`, skriv av koden, og kjør programmet. Stemte tabellen din? **[Run]**
3. Legg til kodelinja `` console.log(`Nivå ${nivaa}: ${poeng} poeng`); `` **øverst** inne i løkka, før de to andre kodelinjene. Kjør programmet. **[Investigate]**
4. Flytt den nye kodelinja **nederst** i løkka. Gjett hva som endrer seg i utskriften, før du kjører. Forklar forskjellen. **[Investigate]**
5. Endre programmet slik at antall nivåer leses inn fra kommandolinja. `node poeng.js 8` skal gi totalen etter 8 nivåer. **[Modify]**
6. Utvid programmet slik at det til slutt også skriver ut gjennomsnittspoeng per nivå. Del totalen på antall nivåer. **[Modify]**

---

## 3.6 Løkker og vilkår sammen

```js
for (let rad = 1; rad <= 8; rad++) {
  if (rad % 2 === 0) {
    console.log(`Rad ${rad}: grå bakgrunn`);
  } else {
    console.log(`Rad ${rad}: hvit bakgrunn`);
  }
}
```

Nå kombinerer vi løkker med det du lærte i hefte 2: en `if`-setning **inne i** løkka tar en beslutning for hver eneste runde.

Tabeller på nettsider har ofte **zebrastriper**: annenhver rad får grå bakgrunn, slik at store tabeller blir lettere å lese. Programmet ovenfor bestemmer fargen på hver av de 8 radene i en tabell.

> **💡 Husk fra hefte 2:** `rad % 2 === 0` er `true` nøyaktig når `rad` er et partall, fordi `%` gir resten i divisjonen.

1. Les koden. Hvilken farge får rad 1? Rad 6? **[Predict]**
2. Lag fila `zebra.js`, skriv av koden, og kjør programmet. **[Run]**
3. Designeren ombestemmer seg: nå skal hver **tredje** rad være grå i stedet. Endre vilkåret, og kjør programmet. Hvilke rader ble grå? **[Investigate]**
4. Utvid med `else if` slik at rad nummer 1 får en egen utskrift: `Rad 1: overskrift`. Pass på rekkefølgen i `if`-kjeden — det lærte du i hefte 2. **[Modify]**

Ofte skal ikke løkka skrive ut noe for hver runde, men **telle** hvor mange ganger noe skjer. Da trenger vi en tellevariabel som øker med 1 hver gang vilkåret slår til.

Datoprogrammering er noe av det utviklere styrer mest med, og skuddår stiller alltid til bry. Fra hefte 2 husker du reglene: et årstall er skuddår når det er delelig med 4 men ikke med 100 — eller delelig med 400.

5. Lag fila `skuddaar.js` med koden nedenfor. Én kodelinje mangler — plasser kodelinja `antall += 1;` på riktig sted. Tenk nøye gjennom hvilken blokk den må stå i. **[Modify]**

```js
let antall = 0;
for (let aar = 2024; aar <= 2100; aar++) {
  if ((aar % 4 === 0 && aar % 100 !== 0) || aar % 400 === 0) {

  }
}
console.log(`Det er ${antall} skuddår fra 2024 til og med 2100`);
```

6. Gjett på svaret, og kjør programmet. **[Run]**
7. Hva skjer om du plasserer `antall += 1;` inne i løkka, men **utenfor** `if`-blokka? Prøv, og forklar resultatet. **[Investigate]**
8. Utvid programmet slik at det i tillegg skriver ut hvert skuddår det finner, ett per linje, før totalen. **[Modify]**

---

## 3.7 While med ukjent antall runder

```js
let ventetid = 1;
while (ventetid < 60) {
  console.log(`Mistet kontakt. Prøver igjen om ${ventetid} sekunder ...`);
  ventetid = ventetid * 2;
}
console.log("Gir opp og viser feilmelding til brukeren.");
```

Når en app mister kontakten med serveren, prøver den igjen — men ikke i vill panikk. Den venter 1 sekund, så 2, så 4, så 8 ... og gir opp når ventetiden blir for lang. Denne teknikken heter *exponential backoff*, og den kjører akkurat nå i appene på mobilen din.

Her vet vi ikke antall runder på forhånd — men vi vet **når løkka skal stoppe**. Da er `while` det naturlige valget.

1. Les koden. Hvor mange ganger prøver appen seg, og hvilke ventetider skrives ut? **[Predict]**
2. Lag fila `backoff.js`, skriv av koden, og kjør programmet. **[Run]**

> **⚠️ Merk:** Dersom programmet bare skriver `Gir opp ...` med en gang, har du sannsynligvis skrevet `ventetid > 60` i stedet for `ventetid < 60`. Da er vilkåret `false` fra start, og løkka kjører aldri.

3. Serveren sliter skikkelig, og appen skal holde ut lenger: endre grensen fra 60 til 300 sekunder. Hvilke nye ventetider dukker opp? **[Investigate]**
4. Endre programmet slik at grensen leses inn fra kommandolinja: `node backoff.js 600`. **[Modify]**

Det neste vi vil vite, er hvor mange forsøk appen rekker før den gir opp.

5. Legg til følgende tre kodelinjer på riktig plass i programmet. Bare én av dem skal stå **inni** løkka: **[Modify]**

```text
┌────────────────────────────────────────────┐
│ console.log(`Antall forsøk: ${forsok}`);   │
├────────────────────────────────────────────┤
│ let forsok = 0;                            │
├────────────────────────────────────────────┤
│ forsok += 1;                               │
└────────────────────────────────────────────┘
```

6. Kjør programmet med grense 60, og kontroller svaret mot utskriften fra steg 2. **[Run]**
7. Utvid programmet med en akkumulator-variabel `ventetTotalt`, slik at det også skriver ut hvor mange sekunder appen ventet til sammen. Med grense 60 skal svaret bli 63. **[Modify]**

Til slutt et helt annet problem med samme løsning: En influenser har 500 følgere, og kontoen vokser med 10 % hver uke. Hvor mange uker tar det før kontoen passerer 10 000 følgere?

> **💡 Husk fra hefte 1:** En økning på 10 % tilsvarer vekstfaktoren 1,10 — antallet ganges med 1,10 én gang per uke.

8. Lag programmet `folgere.js` som løser problemet. Bruk blant annet kodelinjene `folgere = folgere * 1.10;` og `uker += 1;`. Utskriften skal være på formen `Etter ... uker har kontoen over 10000 følgere`. **[Make]**

> **⚠️ For eller while?** Bruk `for` når du vet **antall runder** på forhånd («gjenta for hver av de 8 radene»). Bruk `while` når du bare kjenner **stoppkriteriet** («fortsett til ventetiden passerer grensen»). Begge kan brukes til alt — men programmet blir lettest å lese når du velger riktig verktøy.

---

## Sammendrag

I dette kapitlet har du lært å gjenta kode med løkker: `while` når du kjenner stoppkriteriet, og `for` når du vet antall runder. Vilkåret i en løkke er et logisk uttrykk, akkurat som i en `if`-setning.

### While-løkke

```js
let ventetid = 1;
while (ventetid < 20) {
  console.log(ventetid);
  ventetid = ventetid * 2;
}
```

```text
1
2
4
8
16
```

Løkka gjentar blokka så lenge vilkåret er `true`. Husk de tre delene: startverdi før løkka, vilkår i parentesen, og oppdatering inni blokka. Glemmer du oppdateringen, får du en uendelig løkke — `Ctrl + C` stopper programmet.

### For-løkke

```js
for (let i = 1; i <= 4; i++) {
  console.log(`Runde ${i}`);
}
```

```text
Runde 1
Runde 2
Runde 3
Runde 4
```

`for (startverdi; vilkår; oppdatering)` samler alle tre delene på én linje. Oppdateringen kan være `i++`, `i--`, `i += 2` og så videre.

### Samle opp og telle

```js
let total = 0;
let antall = 0;
for (let i = 1; i <= 10; i++) {
  total += i;
  if (i % 2 === 0) {
    antall += 1;
  }
}
console.log(`Total: ${total}, partall: ${antall}`);
```

```text
Total: 55, partall: 5
```

En akkumulator starter på 0 og får nye verdier lagt til inni løkka. En tellevariabel økes med 1 — gjerne bare når en `if`-setning inni løkka slår til.

### Bygge tekst

```js
let html = "";
for (let i = 1; i <= 3; i++) {
  html = html + `<li>Vare ${i}</li>`;
}
console.log(html);
```

```text
<li>Vare 1</li><li>Vare 2</li><li>Vare 3</li>
```

En tekstvariabel starter tom, og får limt på mer tekst for hver runde. Med `\n` inne i teksten får du linjeskift. Slik genererer utviklere HTML, rapporter og meldinger.

### Datatypene (repetisjon)

```js
let navn = "Ola";
let alder = 17;
let voksen = alder >= 18;
console.log(typeof navn, typeof alder, typeof voksen);
```

```text
string number boolean
```

De tre datatypene er `string` (tekst), `number` (tall) og `boolean` (`true`/`false`). Argumenter fra `process.argv` er alltid `string` — bruk `Number(...)` før du regner.

---

## Oppgaver

### Del A — Enkle oppgaver

**Oppgave A1**

```text
┌────────────────────────────────────────┐
│ }                                      │
├────────────────────────────────────────┤
│   console.log(tall);                   │
├────────────────────────────────────────┤
│ for (let tall = 0; tall < 4; tall++) { │
└────────────────────────────────────────┘
```

Sett sammen kodelinjene for å lage et program som skriver ut tallene 0, 1, 2 og 3.

**Oppgave A2**

```js
For (let i = 5: i < 9: i++) {
  console.lg(i);
}
```

Koden inneholder fire feil. Rett alle feilene slik at programmet skriver ut tallene 5, 6, 7 og 8.

**Oppgave A3**

```js
for (let etasje = ...; etasje <= ...; etasje++) {
  console.log(`Etasje ${etasje}`);
}
```

En heis-app skal vise alle etasjene i et bygg. Fullfør koden slik at programmet skriver ut `Etasje 1` til og med `Etasje 12`, én per linje.

**Oppgave A4**

```js
let i = 10;
while (i > 6) {
  console.log(i);
  i--;
}
```

```js
for (let i = 0; i < 10; i += 3) {
  console.log(i);
}
```

Les de to kodebitene, og skriv ned på papir hva utskriftene blir. Skriv deretter av koden, kjør programmene, og sjekk svarene dine.

**Oppgave A5**

```js
let stjerner = "";
for (let i = 0; i < ...; i++) {
  stjerner = stjerner + ...;
}
console.log(`Vurdering: ${stjerner}`);
```

En app viser vurderinger med stjerner. Fullfør koden slik at resultatet blir:

```text
Vurdering: *****
```

Endre deretter programmet slik at antall stjerner leses inn fra kommandolinja.

**Oppgave A6**

```text
┌──────────────────────────────────────────┐
│   batteri = batteri - 7;                 │
├──────────────────────────────────────────┤
│ let batteri = 100;                       │
├──────────────────────────────────────────┤
│ while (batteri > 0) {                    │
├──────────────────────────────────────────┤
│   console.log(`Batteri: ${batteri} %`);  │
├──────────────────────────────────────────┤
│ }                                        │
└──────────────────────────────────────────┘
```

En mobil mister 7 prosentpoeng batteri i timen. Sett sammen kodelinjene for å lage et program som viser batterinivået time for time, helt til batteriet er tomt:

```text
Batteri: 100 %
Batteri: 93 %
Batteri: 86 %
...
Batteri: 2 %
```

**Oppgave A7**

```js
let brukere = ...;
while (brukere < 525000) {
  console.log(brukere);
  brukere = brukere * ...;
}
```

En app går viralt: antall brukere **dobles** hver dag, og dag 1 er det bare 1 bruker. Fullfør koden slik at programmet skriver ut antall brukere dag for dag: 1, 2, 4, 8, 16, ... helt opp til 524288.

**Oppgave A8**

Lag et program som leser inn et navn fra kommandolinja, og heier på personen 10 ganger, med heiarop nummerert fra 1 til 10:

```text
node heia.js Ola
1: Heia Ola!
2: Heia Ola!
...
10: Heia Ola!
```

**Oppgave A9**

```js
let sekunder = Number(process.argv[2]);
while (...) {
  console.log(`... sekunder igjen`);
  ...
}
console.log("Tiden er ute!");
```

```text
┌──────────────────────────┐  ┌──────────────────────────┐  ┌──────────────┐
│  sekunder > 0            │  │  sekunder = sekunder - 1;│  │  ${sekunder} │
└──────────────────────────┘  └──────────────────────────┘  └──────────────┘
```

En quiz-app teller ned tiden spilleren har igjen. Skriv av koden, og plasser kodebitene på riktig plass der det mangler kode (`...`). Kjøringen skal se slik ut:

```text
node quiz.js 3
3 sekunder igjen
2 sekunder igjen
1 sekunder igjen
Tiden er ute!
```

### Del B — Middels

**Oppgave B1**

Du installerer en skjermtid-app. Dag 1 bruker du 30 minutter på mobilen, og hver dag bruker du 5 minutter mer enn dagen før. Lag et program som med en løkke regner ut hvor mange minutter du har brukt **til sammen** etter 14 dager. Sjekk at svaret blir 875 minutter.

**Oppgave B2**

I et spill krever nivå 1 at du samler 100 XP (erfaringspoeng), og hvert nivå krever 20 XP mer enn det forrige.

```js
let totalXp = 0;
let kravXp = 100;
for (let nivaa = 1; nivaa <= 30; nivaa++) {
  totalXp += ...;
  kravXp += ...;
}
console.log(...);
```

Fullfør programmet slik at det regner ut hvor mye XP du totalt må samle for å nå nivå 30. Sjekk at svaret blir 11700.

**Oppgave B3**

En podkast har 50 faste lyttere. Antall lyttere øker med 18 % hver måned. Skriv et program som bestemmer hvor mange måneder det tar før podkasten passerer 300 lyttere. Bruk blant annet `while (lyttere <= 300)` til å løse oppgaven.

> **💡 Husk fra hefte 1:** En økning på 18 % gir vekstfaktoren 1,18.

**Oppgave B4**

Lag et program som genererer en komplett HTML-liste, der antall varer leses inn fra kommandolinja:

```text
node katalog.js 4
<ul>
  <li>Vare 1</li>
  <li>Vare 2</li>
  <li>Vare 3</li>
  <li>Vare 4</li>
</ul>
```

Utvid deretter programmet slik at det også tar imot et varenavn: `node katalog.js 3 Kaffe` skal gi listepunktene `Kaffe 1`, `Kaffe 2` og `Kaffe 3`.

**Oppgave B5**

I hefte 2 lagde du et program som undersøkte **ett** tall: delelig med både 3 og 5 ga `TreFem`, delelig med bare 3 ga `Tre`, delelig med bare 5 ga `Fem`, og ellers ble tallet selv skrevet ut.

Lag nå et program som gjør dette for **alle** tallene fra 1 til 100, med ett resultat per linje. Begynnelsen av utskriften skal se slik ut:

```text
1
2
Tre
4
Fem
Tre
7
```

> **💡 Tips:** Dette er en berømt oppgave som (med de engelske ordene Fizz og Buzz) har vært brukt i jobbintervjuer for utviklere i årevis. Du løser den nå — med ett hefte om if-else og ett om løkker i sekken.

**Oppgave B6**

Lag et program som tegner en trapp av firkant-tegn, der høyden leses inn fra kommandolinja:

```text
node trapp.js 4
#
##
###
####
```

> **💡 Tips:** Du trenger bare én løkke. La en tekstvariabel `rad` starte tom, lim på én `#` for hver runde, og skriv ut `rad` i hver runde.

**Oppgave B7**

En ny nettside får 120 besøk den første dagen, og deretter 35 flere besøk for hver dag som går (dag 2: 155, dag 3: 190, ...). Lag et program som regner ut hvor mange besøk nettsiden har fått **til sammen** i løpet av de 30 første dagene, og hva gjennomsnittet per dag er. Kjøringen skal se slik ut:

```text
node analyse.js
Totalt antall besøk: 18825
Gjennomsnitt per dag: 627.5
```

**Oppgave B8**

```text
Les inn filstørrelsen i MB fra kommandolinja
Gi nedlastet verdien 0
Gi sekunder verdien 0
Så lenge nedlastet er mindre enn filstørrelsen:
    Øk nedlastet med 50
    Øk sekunder med 1
Skriv ut hvor mange sekunder nedlastingen tok
```

En fil lastes ned med 50 MB i sekundet. Lag et program som følger algoritmen ovenfor. Algoritmen er skrevet på norsk — jobben din er å oversette den til JavaScript. Kjøringen skal se slik ut:

```text
node nedlasting.js 1000
Nedlastingen tok 20 sekunder
```

### Del C — Mer krevende

**Oppgave C1**

```js
let tall = Number(process.argv[2]);
let erPrimtall = true;
for (let deletall = 2; deletall < tall; deletall++) {
  // Hvis tall er delelig med deletall:
  //   sett erPrimtall til false
}
if (erPrimtall) {
  // Skriv ut at tallet er et primtall
} else {
  // Skriv ut at tallet ikke er et primtall
}
```

Et **primtall** er et heltall større enn 1 som bare er delelig med 1 og seg selv. Primtall er ikke bare mattestoff: de er selve grunnmuren i krypteringen som beskytter passord, bank-apper og all trafikk på nettet.

Lag et program der brukeren kan oppgi et heltall større enn 1 på kommandolinja, og få vite om tallet er et primtall eller ikke. Bruk den halvferdige koden ovenfor, og skriv den ferdig. Legg merke til den boolske variabelen `erPrimtall`: den starter som `true`, og settes til `false` dersom løkka finner et eneste tall som `tall` er delelig med.

Test programmet med 7, 15, 29 og 91. (91 er ikke et primtall — hvilke tall er det delelig med?)

**Oppgave C2**

En firesifret PIN-kode kan virke trygg — men er den det? Lag et program som «knekker» en PIN-kode ved rå makt: det prøver 0, 1, 2, ... helt opp til 9999, og teller hvor mange forsøk som trengs før koden er funnet.

```text
node pin.js 4832
Fant PIN-koden etter 4833 forsøk
```

Programmet leser PIN-koden inn fra kommandolinja, går gjennom alle mulige koder med en løkke, og bruker en `if`-setning med `===` til å sjekke hvert forsøk.

Hva er det høyest mulige antallet forsøk? Kjør programmet med koden 9999 og se. En datamaskin gjør dette på under et millisekund — derfor låser apper kontoen etter noen få feilforsøk, og derfor er lange passord viktige.

**Oppgave C3**

```js
for (let y = 0; y < 2; y++) {
  let linje = "";
  for (let x = 0; x < 3; x++) {
    ...
  }
  ...
}
```

En løkke kan stå **inni** en annen løkke. Den innerste løkka kjøres da helt ferdig for hver eneste runde i den ytterste. Slik jobber alt som er rutenett: skjermen din (piksler), regneark (celler) og brettspill (ruter).

Bruk koden ovenfor som mal, og lag et program som skriver ut koordinatene i et rutenett, der bredde og høyde leses inn fra kommandolinja:

```text
node rutenett.js 3 2
(0,0) (1,0) (2,0)
(0,1) (1,1) (2,1)
```

> **💡 Tips:** Bygg opp hver linje i tekstvariabelen `linje` med den innerste løkka, og skriv ut linja i den ytterste.

**Oppgave C4**

En matematiker utforsker et spesielt tallmønster. Hun begynner med et vilkårlig positivt heltall. Er tallet et partall, halverer hun det. Er tallet et oddetall, multipliserer hun det med 3 og legger til 1. Så gjentar hun prosessen med det nye tallet.

Starter hun for eksempel med 6, blir følgen: 6, 3, 10, 5, 16, 8, 4, 2, 1. Alle starttall som noen gang er prøvd, ender til slutt på 1 — men ingen har klart å **bevise** at det alltid skjer. Dette er det berømte **Collatz-problemet**, et uløst problem i matematikken.

Lag et program som leser inn et starttall fra kommandolinja, skriver ut hele følgen på én linje, og til slutt antall steg det tok å nå 1:

```text
node collatz.js 6
6, 3, 10, 5, 16, 8, 4, 2, 1
Starttall: 6, steg: 8
```

Prøv programmet med starttallene 7, 27 og 97. Hvilket av dem trenger flest steg?

> **💡 Tips:** Bruk en `while`-løkke som kjører så lenge tallet ikke er 1, en `if`-`else` inni som sjekker partall/oddetall, og en tekstvariabel som samler følgen. For halveringen er heltallene snille: partall delt på 2 blir alltid et heltall.

---

*Hefte 3 av serien «JavaScript fra bunnen av». Neste hefte: Objekter.*
