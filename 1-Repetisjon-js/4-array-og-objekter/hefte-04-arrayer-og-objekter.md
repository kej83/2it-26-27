# Kapittel 4: Arrayer og objekter

*JavaScript med Node.js — hefte 4 i serien. Bygger på hefte 1: Variabler, hefte 2: Logiske uttrykk og if-else, og hefte 3: Løkker.*

---

## Slik jobber du med dette heftet

Du jobber på samme måte som i de forrige heftene: Les koden først, og forsøk å forutsi hva som blir resultatet. Skriv deretter av koden, kjør programmet, og forklar eventuelle avvik. Videre gjør du de nummererte oppgavene i tur og orden — små endringer først, så større — helt til programmet er blitt ditt eget. Bakerst i heftet lager du egne programmer fra bunnen av, i tre vanskegrader.

> **💡 Tips:** Gjett alltid på resultatet etter hver endring, **før** du kjører programmet på nytt. Det er selve gjettingen som gjør at du lærer.

Til nå har hver variabel holdt på **én** verdi: ett navn, ett tall, én sannhetsverdi. Men ekte programmer jobber med mengder av data: alle varene i en handlekurv, alle brukerne i en database, alle meldingene i en chat. I dette heftet lærer du de to datastrukturene som holder orden på slikt — **arrayer** og **objekter** — og hvordan du kombinerer dem med løkkene og vilkårene du allerede kan. Etter dette heftet kan du skrive programmer som ligner på det utviklere faktisk lager.

---

## 4.1 Repetisjon fra hefte 1, 2 og 3

```js
let antall = Number(process.argv[2]);
let total = 0;
for (let dag = 1; dag <= antall; dag++) {
  let besok = dag * 25;
  total += besok;
  if (besok > 100) {
    console.log(`Dag ${dag}: ${besok} besøk — over målet!`);
  } else {
    console.log(`Dag ${dag}: ${besok} besøk`);
  }
}
console.log(`Til sammen: ${total} besøk`);
```

Før vi lærer noe nytt, henter vi fram alt du kan fra før: variabler og datatyper, input med `process.argv`, logiske uttrykk, `if`-`else`, løkker og akkumulator-variabler. Programmet ovenfor er en enkel besøksstatistikk for en nettside.

1. Les koden. Hva blir utskriften av `node statistikk.js 5`?
2. Lag fila `statistikk.js`, skriv av koden, og kjør programmet.
3. Legg merke til hvordan `total += besok;` samler opp verdier gjennom hele løkka — akkumulator-mønsteret fra hefte 3.
4. Endre programmet slik at målgrensen (100) også leses inn fra kommandolinja, som andre argument: `node statistikk.js 5 60`.

> **💡 Husk fra hefte 1:** Argumenter fra kommandolinja er alltid **tekst**. Skal du regne med dem, må du bruke `Number(...)` først.

Legg merke til noe: programmet regner ut besøkstallene, men det **husker** dem ikke. Vil du vite hva besøket var på dag 3 etter at løkka er ferdig, er tallet borte. Det er nettopp dette problemet arrayer løser.

---

## 4.2 Arrayer

```js
let handlekurv = ["Kaffe", "Melk", "Brød"];
console.log(handlekurv);
console.log(handlekurv[0]);
console.log(handlekurv.length);
```

En **array** er en variabel som holder på flere verdier i en bestemt rekkefølge. Du lager en array med hakeparenteser `[ ]`, og skiller verdiene med komma.

Hver verdi ligger på en nummerert plass, og plassnummeret kalles **indeks**. Det viktigste å merke seg: **arrayer starter på 0**.

| Indeks | 0 | 1 | 2 |
|---|---|---|---|
| Verdi | `"Kaffe"` | `"Melk"` | `"Brød"` |

1. Les koden. Hva blir de tre utskriftene?
2. Lag fila `kurv.js`, skriv av koden, og kjør programmet.
3. Legg til `console.log(handlekurv[2]);` og `console.log(handlekurv[3]);`. Gjett på resultatet før du kjører. Hvorfor blir den siste `undefined`?

> **⚠️ Merk:** En array med 3 elementer har indeksene 0, 1 og 2 — den siste indeksen er altså alltid `length - 1`. Å bomme med én plass her er så vanlig at feilen har et eget navn blant utviklere: *off-by-one error*.

4. Endre ett av elementene ved å legge til kodelinja `handlekurv[1] = "Yoghurt";` før utskriftene. Kjør programmet.
5. Arrayer kan også inneholde tall og sannhetsverdier. Lag en ny array `let priser = [89, 24, 45];`, og skriv ut summen av det første og siste elementet.
6. Hva er `typeof handlekurv`? Legg til kodelinja og kjør. Svaret er kanskje overraskende — en array er en spesiell type objekt i JavaScript, som du skal se senere i heftet.

### En gammel kjenning

```js
console.log(process.argv);
console.log(process.argv.length);
```

Helt siden hefte 1 har du skrevet `process.argv[2]` uten å vite hva hakeparentesene betød. Nå vet du det: `process.argv` **er** en array!

7. Lag fila `argv.js` med koden ovenfor, og kjør `node argv.js Ola 16`.
8. Studer utskriften. Hva ligger på indeks 0 og 1? Nå ser du hvorfor argumentene dine begynner på indeks 2.
9. Kjør programmet med fire argumenter, og se hvordan `length` endrer seg.

---

## 4.3 Løkke gjennom en array

```js
let handlekurv = ["Kaffe", "Melk", "Brød"];
for (let i = 0; i < handlekurv.length; i++) {
  console.log(`${i + 1}. ${handlekurv[i]}`);
}
```

Arrayer og løkker er laget for hverandre. Med en `for`-løkke går du gjennom alle elementene, ett av gangen.

Legg merke til vilkåret `i < handlekurv.length`. Det er ikke tilfeldig: løkka teller fra 0 og stopper rett før lengden — nøyaktig de indeksene som finnes.

1. Les koden. Hva blir utskriften?
2. Lag fila `kvittering.js`, skriv av koden, og kjør programmet.
3. Legg til flere varer i arrayen. Kjør programmet på nytt — **uten** å endre løkka. Dette er hele poenget: løkka tilpasser seg lengden selv.
4. Endre `i < handlekurv.length` til `i <= handlekurv.length`. Hva skjer? Rett tilbake etterpå.

Ofte trenger du ikke indeksen i det hele tatt — du vil bare ha tak i hver verdi. Da finnes det en enklere løkke, `for...of`:

```js
let handlekurv = ["Kaffe", "Melk", "Brød"];
for (let vare of handlekurv) {
  console.log(vare);
}
```

5. Erstatt løkka i programmet ditt med denne, og kjør. Variabelen `vare` får verdien til ett element om gangen.
6. Nå kombinerer vi med det du kan fra hefte 2 og 3. Utvid programmet slik at det også regner ut totalsummen:

```js
let priser = [89, 24, 45, 199];
let total = 0;
for (let pris of priser) {
  total += pris;
}
console.log(`Totalt: ${total} kr`);
```

7. Utvid løkka med en `if`-setning som i tillegg teller hvor mange av varene som koster mer enn 50 kr. Bruk en tellevariabel, slik du lærte i hefte 3.

> **💡 Når bruker du hva?** Bruk `for...of` når du bare trenger verdiene. Bruk den vanlige `for`-løkka med `i` når du også trenger å vite **hvilken plass** du er på — for eksempel til å nummerere en liste, eller til å endre elementer i arrayen.

---

## 4.4 Array-metoder

```js
let oppgaver = ["Vaske opp", "Lese lekser"];
oppgaver.push("Trene");
console.log(oppgaver);
console.log(oppgaver.length);
```

En **metode** er en kommando som hører til en bestemt verdi, og du kaller den med punktum: `arrayen.metode(...)`. Du har allerede brukt `.length` (som riktignok er en egenskap, ikke en metode — derfor uten parenteser).

Metoden `push` legger til et element bakerst. Dette er hjertet i enhver to-do-app, handlekurv eller chat.

1. Les koden. Hva blir utskriften?
2. Lag fila `oppgaver.js`, skriv av koden, og kjør programmet.
3. Legg til to `push`-kall til, og kjør på nytt.

Her er de viktigste array-metodene:

| Metode | Hva den gjør | Eksempel | Resultat |
|---|---|---|---|
| `push(x)` | legger til bakerst | `[1, 2].push(3)` | arrayen blir `[1, 2, 3]` |
| `pop()` | fjerner det siste | `[1, 2, 3].pop()` | arrayen blir `[1, 2]` |
| `unshift(x)` | legger til forrest | `[2, 3].unshift(1)` | arrayen blir `[1, 2, 3]` |
| `shift()` | fjerner det første | `[1, 2, 3].shift()` | arrayen blir `[2, 3]` |
| `includes(x)` | er `x` med? | `[1, 2].includes(2)` | `true` |
| `indexOf(x)` | hvilken indeks har `x`? | `["a", "b"].indexOf("b")` | `1` |
| `join(t)` | limer sammen til tekst | `[1, 2].join(" - ")` | `"1 - 2"` |
| `reverse()` | snur rekkefølgen | `[1, 2, 3].reverse()` | `[3, 2, 1]` |
| `sort()` | sorterer | `["b", "a"].sort()` | `["a", "b"]` |
| `slice(a, b)` | kopierer ut en bit | `[1, 2, 3, 4].slice(1, 3)` | `[2, 3]` |

4. Utvid programmet slik at det bruker `pop()`, og skriv ut arrayen både før og etter. Legg merke til at metoden både fjerner elementet **og** gir det tilbake til deg:

```js
let ferdig = oppgaver.pop();
console.log(`Ferdig med: ${ferdig}`);
console.log(oppgaver);
```

5. Bruk `includes` sammen med en `if`-setning fra hefte 2:

```js
if (oppgaver.includes("Trene")) {
  console.log("Trening står fortsatt på lista");
} else {
  console.log("Ingen trening i dag");
}
```

6. Bruk `join` til å skrive ut alle oppgavene på én linje, adskilt med komma og mellomrom.
7. Bruk `indexOf` til å finne ut hvilken plass `"Lese lekser"` har. Prøv også med en oppgave som ikke finnes — hva får du da? (Svaret `-1` er JavaScript sin måte å si «finnes ikke» på.)

### Fra tekst til array og tilbake

```js
let tekst = process.argv[2];
let varer = tekst.split(",");
console.log(varer);
console.log(`Du har ${varer.length} varer i kurven`);
```

Metoden `split` deler opp en tekst til en array, og er motstykket til `join`. Nå kan du sende inn en hel liste fra kommandolinja!

8. Lag fila `deleopp.js`, og kjør `node deleopp.js Kaffe,Melk,Brød`.
9. Utvid programmet med en `for...of`-løkke som skriver ut hver vare på egen linje, med nummer foran.
10. Bruk `sort()` på arrayen før du skriver den ut, slik at varene kommer i alfabetisk rekkefølge.

> **⚠️ Merk:** `sort()` sorterer som **tekst**, ikke som tall. Prøv `console.log([10, 9, 100].sort());` — du får `[10, 100, 9]`, fordi «10» kommer før «9» alfabetisk. For å sortere tall riktig trenger du en funksjon, og funksjoner kommer i neste hefte. Da får du også møte kraftigere array-metoder som `map` og `filter`.

---

## 4.5 Objekter

```js
let bruker = {
  navn: "Mia",
  alder: 16,
  innlogget: true
};
console.log(bruker.navn);
console.log(bruker.alder);
```

En array holder orden på verdier etter **nummer**. Men hva om du skal lagre opplysninger om én bruker — navn, alder, e-post? Da er det ikke plassnummeret som er interessant, men hva verdien **betyr**.

Et **objekt** lagrer verdier med navn i stedet for nummer. Du lager det med krøllparenteser `{ }`, og hvert par består av en **nøkkel** og en **verdi**, adskilt med kolon.

| Nøkkel | `navn` | `alder` | `innlogget` |
|---|---|---|---|
| Verdi | `"Mia"` | `16` | `true` |

1. Les koden. Hva blir utskriften?
2. Lag fila `bruker.js`, skriv av koden, og kjør programmet.
3. Legg til en `console.log` som skriver ut `innlogget`.
4. Skriv ut hele objektet med `console.log(bruker);`. Sammenlign med hvordan en array skrives ut.
5. Bruk verdiene i en template-streng fra hefte 1:

```js
console.log(`${bruker.navn} er ${bruker.alder} år gammel`);
```

6. Kombiner med en `if`-setning fra hefte 2, slik at programmet skriver `Velkommen tilbake, Mia!` når `bruker.innlogget` er `true`, og `Vennligst logg inn` ellers.

### Endre, legge til og fjerne

7. Legg til disse kodelinjene, og kjør programmet:

```js
bruker.alder = 17;
bruker.epost = "mia@skolen.no";
console.log(bruker);
```

Legg merke til at du både kan **endre** en verdi som finnes, og **legge til** en helt ny nøkkel — på nøyaktig samme måte.

8. Fjern en egenskap med `delete bruker.innlogget;`, og skriv ut objektet igjen.
9. Prøv å hente ut en nøkkel som ikke finnes: `console.log(bruker.telefon);`. Igjen møter du `undefined` — samme svar som når du bommer på en array-indeks.

### To måter å hente ut verdier på

```js
let bruker = { navn: "Mia", alder: 16 };
let noekkel = "navn";
console.log(bruker.navn);
console.log(bruker["navn"]);
console.log(bruker[noekkel]);
```

Punktnotasjon (`bruker.navn`) er den vanligste. Men du kan også bruke hakeparenteser med nøkkelen som tekst — og da kan nøkkelen ligge i en **variabel**. Det blir avgjørende i neste delkapittel.

10. Skriv av koden, og kjør den. Endre deretter `noekkel` til `"alder"`, og kjør på nytt uten å endre `console.log`-linjene.

---

## 4.6 Løkke gjennom et objekt

```js
let spiller = {
  navn: "Mia",
  poeng: 1250,
  nivaa: 7
};
for (let noekkel of Object.keys(spiller)) {
  console.log(`${noekkel}: ${spiller[noekkel]}`);
}
```

Å gå gjennom en array er lett — den har jo nummererte plasser. Et objekt har ikke nummer, men det har nøkler, og `Object.keys(...)` gir deg alle nøklene som **en array**. Dermed kan du bruke løkka du allerede kan.

Her ser du hvorfor hakeparentes-notasjonen er nødvendig: `spiller.noekkel` ville lett etter en nøkkel som faktisk heter «noekkel», mens `spiller[noekkel]` bruker **verdien** i variabelen.

1. Les koden. Hva blir utskriften?
2. Lag fila `spiller.js`, skriv av koden, og kjør programmet.
3. Endre `spiller[noekkel]` til `spiller.noekkel`, og kjør på nytt. Forklar hva som skjedde. Rett deretter tilbake.
4. Legg til flere egenskaper i objektet, og kjør programmet på nytt — uten å endre løkka.

Det finnes tre nyttige `Object`-kommandoer:

| Kommando | Gir deg | Eksempel med `{a: 1, b: 2}` |
|---|---|---|
| `Object.keys(obj)` | array med nøklene | `["a", "b"]` |
| `Object.values(obj)` | array med verdiene | `[1, 2]` |
| `Object.entries(obj)` | array med par | `[["a", 1], ["b", 2]]` |

5. Legg til `console.log(Object.keys(spiller));` og `console.log(Object.values(spiller));`, og kjør.
6. Bruk `Object.keys(spiller).length` til å skrive ut hvor mange egenskaper objektet har.

JavaScript har også en egen løkke for objekter, `for...in`, som gir deg nøklene direkte:

```js
for (let noekkel in spiller) {
  console.log(`${noekkel}: ${spiller[noekkel]}`);
}
```

7. Bytt ut løkka i programmet ditt med denne, og kontroller at resultatet er det samme.

> **⚠️ Merk:** Legg godt merke til forskjellen: `for...of` går gjennom **verdiene i en array**, mens `for...in` går gjennom **nøklene i et objekt**. Å blande disse to er en klassisk nybegynnerfeil.

---

## 4.7 Array inni array

```js
let brett = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["O", "X", "X"]
];
console.log(brett[0]);
console.log(brett[1][2]);
```

Et element i en array kan være hva som helst — også en ny array. Slik lager vi rutenett: brettspill, regneark, pikslene på en skjerm, seter i en kinosal.

Her er `brett` en array med tre elementer, og hvert element er selv en array med tre elementer. `brett[1]` er hele rad nummer 1, mens `brett[1][2]` er elementet på rad 1, plass 2 — først rad, så kolonne.

1. Les koden. Hva blir de to utskriftene?
2. Lag fila `brett.js`, skriv av koden, og kjør programmet.
3. Skriv ut `brett[0][0]` og `brett[2][1]`. Gjett først, og kontroller mot oppsettet ovenfor.
4. Endre midtruta til `"O"` med kodelinja `brett[1][1] = "O";`, og skriv ut hele `brett`.

For å komme til hvert enkelt element trenger du **nøstede løkker** — én løkke inni en annen, slik du møtte i hefte 3:

```js
for (let rad of brett) {
  console.log(rad.join(" | "));
}
```

5. Legg til denne løkka, og kjør programmet. Legg merke til at `rad` er en array, så du kan bruke array-metoder på den — her `join` fra 4.4.
6. Bytt ut løkka med denne varianten, som bruker indekser i begge nivåer:

```js
for (let r = 0; r < brett.length; r++) {
  for (let k = 0; k < brett[r].length; k++) {
    console.log(`Rad ${r}, kolonne ${k}: ${brett[r][k]}`);
  }
}
```

7. Utvid programmet med en tellevariabel som teller hvor mange `"X"` det er på brettet totalt. Bruk en `if`-setning inne i den innerste løkka.

Rutenett brukes også til tall. Her er salgstall for tre uker, med tre dager i hver uke:

```js
let salg = [
  [120, 95, 140],
  [80, 110, 130],
  [150, 160, 90]
];
```

8. Lag et program som regner ut totalsummen for hele `salg`, ved hjelp av to nøstede løkker og en akkumulator-variabel.
9. Utvid programmet slik at det skriver ut summen for **hver uke** for seg. Utskriften skal se slik ut:

```text
Uke 1: 355
Uke 2: 320
Uke 3: 400
Totalt: 1075
```

> **💡 Tips:** Nullstill uke-summen **inni** den ytterste løkka, men **før** den innerste starter. Klarer du å forklare hvorfor det må være slik, har du forstått nøstede løkker.

---

## 4.8 Array med objekter

```js
let produkter = [
  { navn: "Kaffe", pris: 89, paaLager: true },
  { navn: "Melk", pris: 24, paaLager: false },
  { navn: "Brød", pris: 45, paaLager: true },
  { navn: "Kaffekopp", pris: 199, paaLager: true }
];
for (let produkt of produkter) {
  console.log(`${produkt.navn}: ${produkt.pris} kr`);
}
```

Nå kombinerer vi alt. En **array med objekter** er den vanligste datastrukturen i hele webutvikling: produktene i en nettbutikk, brukerne i en database, innleggene i en feed, sangene i en spilleliste. Når en app henter data fra en server, er det nesten alltid dette den får.

1. Les koden. Hva blir utskriften?
2. Lag fila `butikk.js`, skriv av koden, og kjør programmet.
3. Skriv ut `produkter[0].navn` og `produkter[3].pris`. Legg merke til at du først velger objektet med indeks, og deretter egenskapen med punktum.
4. Legg til et nytt produkt med `produkter.push({ navn: "Te", pris: 65, paaLager: true });`, og kjør programmet på nytt.

Nå får du bruk for alt fra hefte 2 og 3 samtidig — løkke, vilkår, akkumulator og teller:

5. Utvid programmet slik at det bare skriver ut produktene som er på lager. Bruk en `if`-setning med `produkt.paaLager` som vilkår.
6. Legg til en akkumulator-variabel som regner ut den totale verdien av alle produktene.
7. Legg til en tellevariabel som teller hvor mange produkter som er utsolgt.
8. Utvid til slutt med en oppsummering nederst:

```text
4 av 5 produkter er på lager
Samlet verdi: 422 kr
```

### Søke i dataene

```js
let sok = process.argv[2];
let funnet = false;
for (let produkt of produkter) {
  if (produkt.navn === sok) {
    console.log(`${produkt.navn} koster ${produkt.pris} kr`);
    funnet = true;
  }
}
if (!funnet) {
  console.log(`Fant ingen produkter som heter ${sok}`);
}
```

Dette er en ekte søkefunksjon — den samme algoritmen som ligger bak søkefeltet i enhver nettbutikk. Legg merke til den boolske variabelen `funnet`: den starter som `false`, settes til `true` hvis løkka finner noe, og etterpå bruker vi `!` (ikke) fra hefte 2 til å håndtere «ingen treff».

9. Legg koden inn i programmet ditt, og kjør `node butikk.js Brød` og `node butikk.js Pizza`.
10. Utvid programmet slik at søket også fungerer når produktet er utsolgt: skriv da `Brød er dessverre utsolgt` i stedet for prisen.

### Bygge HTML

I hefte 3 bygde du HTML med en løkke. Nå har du ekte data å bygge fra:

```js
let html = "<ul>\n";
for (let produkt of produkter) {
  html += `  <li>${produkt.navn} — ${produkt.pris} kr</li>\n`;
}
html += "</ul>";
console.log(html);
```

11. Legg til denne koden i et nytt program, og kjør det. Dette er, i miniatyr, nøyaktig det en nettbutikk gjør hver gang noen åpner produktsiden.
12. Utvid slik at utsolgte varer får teksten `(utsolgt)` etter prisen.

---

## Sammendrag

I dette kapitlet har du lært å lagre og behandle mengder av data med arrayer og objekter — og å kombinere dem med løkkene og vilkårene fra de tidligere heftene.

### Array

```js
let farger = ["rød", "blå", "grønn"];
console.log(farger[0]);
console.log(farger.length);
farger.push("gul");
console.log(farger.join(", "));
```

```text
rød
3
rød, blå, grønn, gul
```

En array holder flere verdier i rekkefølge. Første element har indeks **0**, og siste har indeks `length - 1`.

### Løkke gjennom en array

```js
let priser = [50, 120, 80];
let total = 0;
for (let pris of priser) {
  total += pris;
}
for (let i = 0; i < priser.length; i++) {
  console.log(`Vare ${i + 1}: ${priser[i]} kr`);
}
console.log(`Total: ${total} kr`);
```

```text
Vare 1: 50 kr
Vare 2: 120 kr
Vare 3: 80 kr
Total: 250 kr
```

Bruk `for...of` når du bare trenger verdiene, og en vanlig `for`-løkke når du også trenger indeksen.

### Objekt

```js
let bok = { tittel: "Sult", aar: 1890 };
bok.forfatter = "Hamsun";
console.log(bok.tittel);
console.log(bok["aar"]);
for (let noekkel in bok) {
  console.log(`${noekkel} = ${bok[noekkel]}`);
}
```

```text
Sult
1890
tittel = Sult
aar = 1890
forfatter = Hamsun
```

Et objekt lagrer verdier med **nøkler** i stedet for nummer. Hent ut med `objekt.noekkel` eller `objekt["noekkel"]` — den siste formen når nøkkelen ligger i en variabel. `Object.keys(obj)` gir alle nøklene som en array.

### Array inni array

```js
let rutenett = [
  [1, 2],
  [3, 4]
];
console.log(rutenett[1][0]);
for (let rad of rutenett) {
  console.log(rad.join(" "));
}
```

```text
3
1 2
3 4
```

Først rad, så kolonne: `rutenett[rad][kolonne]`. Nøstede løkker går gjennom alle elementene.

### Array med objekter

```js
let elever = [
  { navn: "Ali", poeng: 42 },
  { navn: "Nora", poeng: 55 }
];
for (let elev of elever) {
  if (elev.poeng > 50) {
    console.log(`${elev.navn} bestod med ${elev.poeng} poeng`);
  }
}
```

```text
Nora bestod med 55 poeng
```

Dette mønsteret — løkke gjennom en array av objekter, med en `if` inni — er selve arbeidshesten i webutvikling.

---

## Oppgaver

### Del A — Enkle oppgaver

**Oppgave A1**

```js
let dyr = ["katt", "hund", "hest", "sau"];
console.log(dyr[1]);
console.log(dyr.length);
console.log(dyr[dyr.length - 1]);
console.log(dyr[4]);
```

Les koden, og skriv ned på papir hva de fire utskriftene blir. Skriv deretter av koden, kjør programmet, og sjekk svarene dine.

**Oppgave A2**

```js
let bruker = (
  navn = "Jonas";
  alder: 17
)
console.log(bruker.Navn);
```

Koden inneholder fire feil. Rett alle feilene slik at programmet skriver ut `Jonas`.

**Oppgave A3**

```text
┌────────────────────────────────────────┐
│ console.log(spilleliste);              │
├────────────────────────────────────────┤
│ spilleliste.push("Sang C");            │
├────────────────────────────────────────┤
│ let spilleliste = ["Sang A"];          │
├────────────────────────────────────────┤
│ spilleliste.push("Sang B");            │
└────────────────────────────────────────┘
```

Sett sammen kodelinjene slik at programmet skriver ut `[ 'Sang A', 'Sang B', 'Sang C' ]`.

**Oppgave A4**

```js
let temperaturer = [12, 15, 9, 18, 14];
for (let i = 0; i < ...; i++) {
  console.log(`Dag ${...}: ${...} grader`);
}
```

Fullfør koden slik at programmet skriver ut:

```text
Dag 1: 12 grader
Dag 2: 15 grader
Dag 3: 9 grader
Dag 4: 18 grader
Dag 5: 14 grader
```

**Oppgave A5**

```js
let film = {
  tittel: "Kon-Tiki",
  aar: 2012,
  minutter: 118
};
```

Lag programmet, og utvid det slik at det:

a) skriver ut `Kon-Tiki (2012)`
b) legger til egenskapen `sjanger` med verdien `"drama"`
c) endrer `minutter` til 120
d) skriver ut hele objektet til slutt

**Oppgave A6**

```js
let profil = { navn: "Sara", by: "Bergen", alder: 16 };
for (let ... of Object.keys(profil)) {
  console.log(`${...}: ${...}`);
}
```

```text
┌─────────────┐  ┌─────────────┐  ┌────────────────────┐
│   noekkel   │  │  ${noekkel} │  │  ${profil[noekkel]}│
└─────────────┘  └─────────────┘  └────────────────────┘
```

Skriv av koden, og plasser kodebitene på riktig plass der det mangler kode (`...`). Utskriften skal bli:

```text
navn: Sara
by: Bergen
alder: 16
```

**Oppgave A7**

Lag et program som tar imot en kommaseparert liste med navn fra kommandolinja, og skriver ut hvor mange navn det er og hvert navn på egen linje:

```text
node navneliste.js Ola,Kari,Ali
Det er 3 navn i lista:
1. Ola
2. Kari
3. Ali
```

> **💡 Tips:** Bruk `split(",")` fra 4.4.

**Oppgave A8**

```js
let kurv = ["Brus", "Chips", "Sjokolade"];
```

Skriv et program som bruker array-metodene til å gjøre følgende, med en utskrift av kurven etter hvert steg: fjern det siste elementet, legg til `"Popkorn"` bakerst, legg til `"Vann"` forrest, og skriv til slutt ut alle varene på én linje adskilt med ` + `.

### Del B — Middels

**Oppgave B1**

```js
let poeng = [45, 88, 62, 91, 37, 74];
```

Lag et program som går gjennom arrayen med en løkke og skriver ut:

- hvor mange av resultatene som er 60 eller høyere (bestått)
- hvor mange som er under 60 (ikke bestått)
- gjennomsnittet av alle poengene

**Oppgave B2**

```text
Lag en tom array som heter partall
Gjenta for hvert tall fra 1 til og med 30:
    Hvis tallet er delelig med 2:
        Legg tallet bakerst i partall
Skriv ut partall
Skriv ut hvor mange tall som ligger i partall
```

Lag et program som følger algoritmen ovenfor. Algoritmen er skrevet på norsk — jobben din er å oversette den til JavaScript.

> **💡 Tips:** En tom array lager du med `let partall = [];`.

**Oppgave B3**

```js
let lager = {
  epler: 12,
  bananer: 0,
  appelsiner: 7,
  paerer: 0
};
```

Lag et program som går gjennom objektet og skriver ut én linje per vare. Varer med 0 på lager skal merkes:

```text
epler: 12 stk
bananer: UTSOLGT
appelsiner: 7 stk
paerer: UTSOLGT
```

Utvid programmet slik at det til slutt skriver ut hvor mange varetyper som er utsolgt.

**Oppgave B4**

```js
let kinosal = [
  ["ledig", "opptatt", "ledig"],
  ["opptatt", "opptatt", "ledig"],
  ["ledig", "ledig", "ledig"]
];
```

Lag et program som teller hvor mange seter som er ledige totalt, og skriver ut:

```text
Rad 1: 2 ledige
Rad 2: 1 ledige
Rad 3: 3 ledige
Totalt 6 ledige seter av 9
```

**Oppgave B5**

```js
let handlekurv = [
  { vare: "T-skjorte", pris: 199, antall: 2 },
  { vare: "Bukse", pris: 599, antall: 1 },
  { vare: "Sokker", pris: 79, antall: 5 }
];
```

Lag et program som skriver ut en kvittering med én linje per vare, og totalsummen nederst. Husk at prisen må ganges med antallet:

```text
2 x T-skjorte = 398 kr
1 x Bukse = 599 kr
5 x Sokker = 395 kr
-------------------
Å betale: 1392 kr
```

Utvid deretter programmet slik at kunden får 10 % rabatt dersom totalen er over 1000 kr, og skriv ut både rabatten og den nye totalen.

> **⚠️ Merk:** Når du regner med desimaltall, kan JavaScript svare `139.20000000000002` i stedet for `139.2`. Det er ikke en feil i koden din — datamaskiner lagrer desimaltall med en bitte liten unøyaktighet. Rund av med `Math.round(rabatt * 100) / 100` når du skal vise et beløp til en bruker.

**Oppgave B6**

```js
let brukere = [
  { navn: "mia", alder: 16, aktiv: true },
  { navn: "jonas", alder: 22, aktiv: false },
  { navn: "sara", alder: 19, aktiv: true },
  { navn: "ali", alder: 15, aktiv: true }
];
```

Lag et program som skriver ut navnene på alle brukere som er **både** aktive **og** myndige (18 år eller eldre). Programmet skal også skrive ut hvor mange treff det ble, og en egen melding dersom det ikke er noen treff i det hele tatt.

**Oppgave B7**

Bruk `brukere`-arrayen fra oppgave B6, og lag et program som bygger en HTML-tabellrad per bruker:

```text
<table>
  <tr><td>mia</td><td>16</td></tr>
  <tr><td>jonas</td><td>22</td></tr>
  <tr><td>sara</td><td>19</td></tr>
  <tr><td>ali</td><td>15</td></tr>
</table>
```

> **💡 Tips:** Bygg opp hele HTML-koden i én tekstvariabel, og skriv den ut til slutt — slik du lærte i hefte 3.

### Del C — Mer krevende

**Oppgave C1**

```js
let spillere = [
  { navn: "Nora", poeng: 1250 },
  { navn: "Ali", poeng: 3100 },
  { navn: "Mia", poeng: 890 },
  { navn: "Jonas", poeng: 2400 }
];
```

Lag et program som finner og skriver ut spilleren med **flest** poeng, uten å sortere arrayen.

```text
Vinner: Ali med 3100 poeng
```

> **💡 Tips:** Dette er en klassisk algoritme. Lag to variabler som husker det beste funnet så langt — start med det første elementet i arrayen. Gå deretter gjennom resten med en løkke, og bytt ut det beste hver gang du finner noe bedre.

Utvid programmet slik at det også finner spilleren med **færrest** poeng, og skriver ut differansen mellom beste og dårligste resultat.

**Oppgave C2**

```js
let elever = [
  { navn: "Mia", karakterer: [5, 4, 6] },
  { navn: "Jonas", karakterer: [3, 4, 3] },
  { navn: "Sara", karakterer: [6, 6, 5] }
];
```

Her er hvert objekt i arrayen selv et objekt som inneholder en array. Lag et program som for hver elev regner ut snittkarakteren, og skriver ut:

```text
Mia: snitt 5
Jonas: snitt 3.3
Sara: snitt 5.7
Klassens snitt: 4.7
```

> **💡 Tips:** Du trenger nøstede løkker: den ytterste går gjennom elevene, den innerste gjennom karakterene til én elev. For avrunding til én desimal kan du bruke `Math.round(snitt * 10) / 10`.

**Oppgave C3**

En setning kommer inn fra kommandolinja. Lag et program som teller hvor mange ganger hvert ord forekommer, og skriver ut resultatet:

```text
node ordtelling.js "hei på deg hei igjen hei"
hei: 3
på: 1
deg: 1
igjen: 1
```

Bruk et **objekt** som teller: nøkkelen er ordet, og verdien er antallet. Gå gjennom ordene med en løkke, og for hvert ord: dersom ordet allerede finnes som nøkkel, øker du verdien med 1 — ellers setter du verdien til 1.

> **💡 Tips:** Del opp setningen med `split(" ")`. For å sjekke om en nøkkel finnes, kan du bruke `if (teller[ord] === undefined)`. Husk hakeparentes-notasjonen fra 4.5 — nøkkelen ligger jo i en variabel. Denne algoritmen brukes i alt fra søkemotorer til analyse av chatlogger.

**Oppgave C4**

```js
let oppgaver = [
  { tekst: "Vaske opp", ferdig: false, viktig: true },
  { tekst: "Lese lekser", ferdig: true, viktig: true },
  { tekst: "Rydde rom", ferdig: false, viktig: false },
  { tekst: "Trene", ferdig: true, viktig: false }
];
```

Lag en to-do-app som kjøres fra kommandolinja med et filter som argument:

```text
node todo.js alle        → viser alle oppgavene
node todo.js igjen       → viser bare de som ikke er ferdige
node todo.js viktige     → viser bare de viktige som ikke er ferdige
```

Hver oppgave skal skrives ut med `[x]` foran dersom den er ferdig, og `[ ]` dersom den ikke er det. Til slutt skal programmet skrive ut hvor mange oppgaver som ble vist, og hvor mange som gjenstår totalt. Skriv en passende melding dersom brukeren oppgir et filter programmet ikke kjenner.

---

*Hefte 4 av serien «JavaScript fra bunnen av». Neste hefte: Funksjoner.*
