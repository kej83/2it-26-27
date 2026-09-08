# Kapittel 5: Funksjoner

*JavaScript med Node.js — hefte 5 i serien. Bygger på hefte 1: Variabler, hefte 2: Logiske uttrykk og if-else, hefte 3: Løkker, og hefte 4: Arrayer og objekter.*

---

## Slik jobber du med dette heftet

Du jobber på samme måte som i de forrige heftene: Les koden først, og forsøk å forutsi hva som blir resultatet. Skriv deretter av koden, kjør programmet, og forklar eventuelle avvik. Videre gjør du de nummererte oppgavene i tur og orden — små endringer først, så større — helt til programmet er blitt ditt eget. Bakerst i heftet lager du egne programmer fra bunnen av, i tre vanskegrader.

> **💡 Tips:** Gjett alltid på resultatet etter hver endring, **før** du kjører programmet på nytt. Det er selve gjettingen som gjør at du lærer.

Til nå har programmene dine vært én lang oppskrift som kjøres fra topp til bunn. Det fungerer så lenge programmet er lite. Men ekte programmer er store, og da trenger du å dele dem opp i navngitte deler du kan bruke om og om igjen. Det er dette funksjoner er — og de er så grunnleggende at ingen utvikler skriver mer enn noen få linjer uten dem.

---

## 5.1 Repetisjon — og et problem

```js
let kurv1 = [89, 24, 45];
let total1 = 0;
for (let pris of kurv1) {
  total1 += pris;
}
console.log(`Kunde 1 skal betale ${total1} kr`);

let kurv2 = [199, 65];
let total2 = 0;
for (let pris of kurv2) {
  total2 += pris;
}
console.log(`Kunde 2 skal betale ${total2} kr`);

let kurv3 = [45, 45, 12, 30];
let total3 = 0;
for (let pris of kurv3) {
  total3 += pris;
}
console.log(`Kunde 3 skal betale ${total3} kr`);
```

Programmet ovenfor regner ut totalen for tre handlekurver, og bruker alt du kan fra hefte 3 og 4: arrayer, `for...of`-løkke, akkumulator-variabel og template-strenger.

1. Les koden. Hva blir de tre utskriftene?
2. Lag fila `butikk.js`, skriv av koden, og kjør programmet.
3. Studer koden en gang til. Hvor mange kodelinjer er nesten helt like?
4. Butikken innfører 25 % rabatt på alle kurver. Hvor mange steder i koden må du endre?
5. Legg til en fjerde kunde. Hvor mange linjer måtte du skrive?

Dette er et dårlig program — ikke fordi det gir feil svar, men fordi den samme tanken er skrevet tre ganger. Utviklere har et navn på regelen som brytes her: **DRY**, *Don't Repeat Yourself*. Gjentatt kode betyr tre steder å endre, tre steder å gjøre feil, og tre steder å glemme.

Resten av dette heftet handler om løsningen.

---

## 5.2 Din første funksjon

```js
function visMeny() {
  console.log("=== HOVEDMENY ===");
  console.log("1. Ny ordre");
  console.log("2. Vis ordrer");
  console.log("3. Avslutt");
}

visMeny();
```

En **funksjon** er en navngitt blokk med kode som du kan kjøre når du vil, så mange ganger du vil.

Koden består av to helt forskjellige ting:

| Del | Kode | Hva som skjer |
|---|---|---|
| Deklarasjon | `function visMeny() { ... }` | Du **lager** funksjonen og gir den et navn. Koden inni kjøres ikke nå. |
| Kall | `visMeny();` | Du **kjører** funksjonen. |

1. Les koden. Hva blir utskriften?
2. Lag fila `meny.js`, skriv av koden, og kjør programmet.
3. Slett kodelinja `visMeny();` nederst, og kjør programmet på nytt. Hva skjer nå — og hvorfor?
4. Sett kodelinja tilbake, og legg til to kall til. Kjør programmet.
5. Fjern parentesene i kallet, slik at det bare står `visMeny;`. Kjør programmet. Ingenting skjer, og du får ingen feilmelding — dette er en av de mest forvirrende feilene for nybegynnere.

> **⚠️ Merk:** Parentesene er selve kallet. `visMeny` er bare navnet på funksjonen, mens `visMeny()` betyr «kjør den nå».

6. Sett parentesene tilbake, og kall funksjonen inni en løkke fra hefte 3, slik at menyen skrives ut tre ganger:

```js
for (let i = 0; i < 3; i++) {
  visMeny();
}
```

> **💡 Tips:** Det er vanlig å samle alle funksjonene øverst i fila, og la selve programflyten stå nederst. Da er det lett å se hva programmet faktisk gjør når det starter.

---

## 5.3 Parametere

```js
function hilsPaa(navn) {
  console.log(`Hei, ${navn}!`);
}

hilsPaa("Mia");
hilsPaa("Jonas");
hilsPaa(process.argv[2]);
```

En funksjon blir virkelig nyttig først når den kan jobbe med **forskjellige verdier** hver gang. Verdiene sender du inn i parentesen.

Navnet `navn` inne i parentesen i deklarasjonen kalles en **parameter** — det er en variabel som får verdien du sender inn. Verdien du faktisk sender inn ved kallet, kalles et **argument**.

1. Les koden. Hva blir utskriften av `node hils.js Sara`?
2. Lag fila `hils.js`, skriv av koden, og kjør programmet med navnet ditt som argument.
3. Legg til flere kall med forskjellige navn.

En funksjon kan ha flere parametere, adskilt med komma:

```js
function visProdukt(navn, pris) {
  console.log(`${navn} koster ${pris} kr`);
}

visProdukt("Kaffe", 89);
visProdukt("Melk", 24);
```

4. Legg til denne funksjonen i programmet ditt, og kjør det.
5. Bytt om på argumentene i ett av kallene: `visProdukt(89, "Kaffe");`. Kjør programmet. Rekkefølgen betyr alt — JavaScript sier ikke fra, du får bare tull ut.
6. Kall funksjonen med bare ett argument: `visProdukt("Te");`. Hva skrives ut i stedet for prisen? Der er `undefined` igjen, som du kjenner fra hefte 4.
7. En parameter kan ha en **standardverdi** som brukes når argumentet mangler. Endre funksjonen slik, og kjør på nytt:

```js
function visProdukt(navn, pris = 0) {
  console.log(`${navn} koster ${pris} kr`);
}
```

8. Lag din egen funksjon `visKvittering(vare, antall, pris)` som skriver ut en linje på formen `3 x Kaffe = 267 kr`. Regn ut summen inne i funksjonen.

---

## 5.4 return — å levere en verdi tilbake

```js
function leggSammen(a, b) {
  console.log(a + b);
}

let svar = leggSammen(2, 3);
console.log(svar);
```

Nå kommer den viktigste siden i hele heftet. Funksjonene dine har til nå bare **skrevet ut** ting. Men som regel vil vi at en funksjon skal **regne ut noe og gi svaret tilbake**, slik at vi kan bruke det videre.

1. Les koden. Hva tror du de to utskriftene blir?
2. Lag fila `regne.js`, skriv av koden, og kjør programmet.

Utskriften blir `5` og deretter `undefined`. Funksjonen skrev ut summen, men den **leverte ikke noe tilbake** — så `svar` ble stående tom. Løsningen er nøkkelordet `return`:

3. Endre funksjonen slik, og kjør programmet på nytt:

```js
function leggSammen(a, b) {
  return a + b;
}

let svar = leggSammen(2, 3);
console.log(svar);
```

4. Nå som funksjonen leverer en verdi, kan du regne videre med den. Legg til disse linjene, og gjett på resultatet før du kjører:

```js
console.log(leggSammen(10, 5) * 2);
console.log(leggSammen(leggSammen(1, 2), 3));
```

Legg merke til hva som skjer i den siste linja: den innerste funksjonen kjøres først, og resultatet blir argument til den ytterste.

> **⚠️ Den store forskjellen:** `console.log(...)` viser noe **på skjermen for et menneske**. `return` leverer en verdi **tilbake til programmet**. En funksjon som bare logger, kan ikke brukes videre i en utregning. Dette er den vanligste misforståelsen blant nybegynnere — les avsnittet en gang til.

5. `return` avslutter funksjonen umiddelbart. Legg inn denne funksjonen, kall den, og se selv:

```js
function test() {
  return "Første";
  console.log("Denne linja kjøres aldri");
}

console.log(test());
```

6. Lag funksjonen `mva(belop)` som returnerer 25 % merverdiavgift av beløpet. Skriv ut `mva(400)` — svaret skal bli 100.
7. Lag funksjonen `prisMedMva(belop)` som returnerer beløpet inkludert mva, ved å **kalle** `mva`-funksjonen din inni seg. En funksjon kan gjerne bruke en annen funksjon.

---

## 5.5 Funksjoner som svarer ja eller nei

```js
function erPartall(tall) {
  return tall % 2 === 0;
}

console.log(erPartall(4));
console.log(erPartall(7));
```

Husker du fra hefte 2 at `tall % 2 === 0` er et logisk uttrykk som blir `true` eller `false`? Da kan vi returnere selve uttrykket, og få en funksjon som svarer ja eller nei.

1. Les koden. Hva blir de to utskriftene?
2. Lag fila `sjekk.js`, skriv av koden, og kjør programmet.
3. Fordi funksjonen returnerer `true` eller `false`, kan den brukes direkte som vilkår i en `if`-setning:

```js
let tall = Number(process.argv[2]);
if (erPartall(tall)) {
  console.log(`${tall} er et partall`);
} else {
  console.log(`${tall} er et oddetall`);
}
```

4. Kjør programmet med flere forskjellige tall.
5. Kombiner funksjonen med en løkke fra hefte 3, slik at programmet skriver ut alle partall fra 1 til 20.
6. Lag funksjonen `erMyndig(alder)` som returnerer `true` når alderen er 18 eller mer. Bruk den i en `if`-setning.
7. Lag funksjonen `erGyldigPassord(passord)` som returnerer `true` bare dersom passordet er minst 8 tegn langt. Bruk `passord.length` og operatoren `>=`.

> **💡 Tips:** Utviklere navngir slike funksjoner med `er...`, `har...` eller `kan...` — for eksempel `erTom`, `harTilgang`, `kanKjope`. Da ser alle med én gang at funksjonen svarer `true` eller `false`.

### Tilfeldige tall

```js
function kastTerning() {
  return Math.floor(Math.random() * 6) + 1;
}

console.log(kastTerning());
console.log(kastTerning());
console.log(kastTerning());
```

`Math.random()` gir et tilfeldig desimaltall som er minst 0 og mindre enn 1 — for eksempel `0.4871...`. Ganger vi med 6, får vi et tall mellom 0 og 5,999. Runder vi ned med `Math.floor(...)` fra hefte 1, får vi et heltall fra 0 til 5. Legger vi til 1, får vi 1 til 6 — en terning.

8. Lag fila `terning.js`, skriv av koden, og kjør programmet flere ganger. Utskriften er forskjellig hver gang.
9. Bruk en løkke til å kaste terningen 10 ganger, og skriv ut hvert kast.
10. Utvid programmet slik at det teller hvor mange seksere du får på 100 kast. Bruk en tellevariabel og en `if`-setning inni løkka.
11. Lag funksjonen `tilfeldigTall(fra, til)` som returnerer et tilfeldig heltall mellom `fra` og `til`, begge inkludert. Ta utgangspunkt i terningfunksjonen, og test den med `tilfeldigTall(10, 20)`.

---

## 5.6 Funksjoner med vilkår

```js
function karakterFor(poeng) {
  if (poeng >= 90) {
    return 6;
  } else if (poeng >= 75) {
    return 5;
  } else if (poeng >= 60) {
    return 4;
  } else if (poeng >= 45) {
    return 3;
  } else if (poeng >= 30) {
    return 2;
  } else {
    return 1;
  }
}

console.log(karakterFor(82));
```

En `if`-`else`-kjede som den fra hefte 2 blir mye mer nyttig når den pakkes inn i en funksjon: nå kan du bruke den overalt i programmet, med hvilken som helst poengsum.

1. Les koden. Hvilken karakter gir 82 poeng?
2. Lag fila `karakter.js`, skriv av koden, og kjør programmet.
3. Test funksjonen med flere verdier — og gjør det smart, med en løkke over en array fra hefte 4:

```js
let resultater = [95, 82, 61, 50, 33, 12];
for (let p of resultater) {
  console.log(`${p} poeng gir karakteren ${karakterFor(p)}`);
}
```

4. Legg merke til hvor lett det ble å teste funksjonen grundig. Å skrive kode som er lett å teste, er en ferdighet i seg selv.
5. Utvid programmet slik at poengsummen kan leses inn fra kommandolinja i stedet.

Siden `return` avslutter funksjonen umiddelbart, trenger du ofte ikke `else` i det hele tatt:

```js
function beskrivAlder(alder) {
  if (alder < 0) {
    return "Ugyldig alder";
  }
  if (alder < 18) {
    return "Mindreårig";
  }
  return "Voksen";
}
```

Det første `if` som slår til, avslutter funksjonen — resten av koden nås aldri. Utviklere kaller den første testen en **vaktpost** (*guard clause*): den fanger opp ugyldige verdier med én gang, før den egentlige jobben begynner.

6. Legg funksjonen inn i programmet ditt, og test den med -5, 12 og 40.
7. Lag funksjonen `fraktpris(sum)` etter samme mønster: over 1000 kr gir gratis frakt (0), over 500 kr gir 49 kr, ellers 99 kr. Test den med flere beløp.

---

## 5.7 Rekkevidde: hvor variabler finnes

```js
function regnUt() {
  let hemmelig = 42;
  console.log(hemmelig);
}

regnUt();
console.log(hemmelig);
```

1. Les koden. Hva tror du skjer på den siste linja?
2. Lag fila `rekkevidde.js`, skriv av koden, og kjør programmet. Du får en feilmelding: `ReferenceError: hemmelig is not defined`.

En variabel som lages inne i en funksjon, finnes **bare der**. Den forsvinner idet funksjonen er ferdig. Dette kalles variabelens **rekkevidde** (engelsk: *scope*).

3. Slett den siste linja, og kjør programmet på nytt.

Variabler som lages utenfor alle funksjoner, kan derimot brukes overalt:

```js
let butikknavn = "Kodebutikken";

function visOverskrift() {
  console.log(`Velkommen til ${butikknavn}`);
}

visOverskrift();
```

4. Skriv av koden, og kjør den.
5. Nå det snedige. Gjett hva som skjer her, før du kjører:

```js
let poeng = 100;

function nullstill() {
  let poeng = 0;
  console.log(`Inne i funksjonen: ${poeng}`);
}

nullstill();
console.log(`Utenfor funksjonen: ${poeng}`);
```

Variabelen inne i funksjonen er en **helt annen variabel** enn den utenfor — den bare tilfeldigvis har samme navn. Den ytre er urørt.

> **💡 Hvorfor er dette bra?** Tenk deg at du har 30 funksjoner som alle bruker en løkkevariabel `i`. Uten rekkevidde ville de ødelagt for hverandre. Nå kan hver funksjon jobbe i fred, uten å vite noe om resten av programmet. Det er nettopp dette som gjør at store programmer i det hele tatt lar seg skrive.

6. Skriv om `nullstill` slik at den i stedet **returnerer** 0, og bruk returverdien til å endre den ytre variabelen: `poeng = nullstill();`. Dette er den ryddige måten å gjøre det på.

---

## 5.8 Funksjoner som tar imot arrayer og objekter

```js
function totalPris(kurv) {
  let total = 0;
  for (let pris of kurv) {
    total += pris;
  }
  return total;
}

console.log(totalPris([89, 24, 45]));
```

En parameter kan være hva som helst — også en array eller et objekt fra hefte 4. Nå kan vi endelig løse problemet fra 5.1.

1. Les koden. Hva blir utskriften?
2. Lag fila `kurv.js`, skriv av koden, og kjør programmet.
3. Nå skriver du om hele programmet fra 5.1 med denne funksjonen:

```js
let kurv1 = [89, 24, 45];
let kurv2 = [199, 65];
let kurv3 = [45, 45, 12, 30];

console.log(`Kunde 1 skal betale ${totalPris(kurv1)} kr`);
console.log(`Kunde 2 skal betale ${totalPris(kurv2)} kr`);
console.log(`Kunde 3 skal betale ${totalPris(kurv3)} kr`);
```

4. Sammenlign med programmet du skrev i 5.1. Tell kodelinjene. Legg spesielt merke til at rabatt nå kan innføres **ett** sted.
5. Legg til en fjerde kunde. Hvor mange linjer trengte du denne gangen?

Objekter fungerer på samme måte:

```js
function beskriv(bruker) {
  return `${bruker.navn} (${bruker.alder} år)`;
}

let mia = { navn: "Mia", alder: 16 };
console.log(beskriv(mia));
```

6. Skriv av koden, og kjør den.
7. Og selvfølgelig: en array med objekter, som er den vanligste datastrukturen fra hefte 4.

```js
function antallPaaLager(produkter) {
  let antall = 0;
  for (let p of produkter) {
    if (p.paaLager) {
      antall += 1;
    }
  }
  return antall;
}

let lager = [
  { navn: "Kaffe", pris: 89, paaLager: true },
  { navn: "Melk", pris: 24, paaLager: false },
  { navn: "Brød", pris: 45, paaLager: true }
];

console.log(`${antallPaaLager(lager)} av ${lager.length} varer er på lager`);
```

8. Skriv av koden, og kjør programmet.
9. Lag funksjonen `dyrestePris(produkter)` som returnerer prisen på det dyreste produktet. Bruk max-algoritmen du møtte i hefte 4: husk det beste funnet så langt i en variabel.

---

## 5.9 Funksjoner som lager arrayer og objekter

```js
function lagBruker(navn, alder) {
  return {
    navn: navn,
    alder: alder,
    aktiv: true
  };
}

let bruker1 = lagBruker("Mia", 16);
let bruker2 = lagBruker("Jonas", 22);
console.log(bruker1);
console.log(bruker2.navn);
```

En funksjon kan ikke bare ta imot datastrukturer — den kan også **lage** dem. Slik slipper du å skrive objektene for hånd.

1. Les koden. Hva blir de to utskriftene?
2. Lag fila `brukere.js`, skriv av koden, og kjør programmet.
3. Bruk funksjonen sammen med en løkke og `push` fra hefte 4, slik at du bygger en hel array med brukere:

```js
let alleBrukere = [];
alleBrukere.push(lagBruker("Mia", 16));
alleBrukere.push(lagBruker("Jonas", 22));
alleBrukere.push(lagBruker("Sara", 19));
console.log(alleBrukere.length);
```

4. Skriv en løkke som går gjennom `alleBrukere` og skriver ut navnene.

En funksjon kan også returnere en array:

```js
function partallMellom(fra, til) {
  let resultat = [];
  for (let i = fra; i <= til; i++) {
    if (i % 2 === 0) {
      resultat.push(i);
    }
  }
  return resultat;
}

console.log(partallMellom(1, 20));
```

5. Skriv av funksjonen, og kjør den. Legg merke til mønsteret: lag en tom array, fyll den i løkka, returner den til slutt.
6. Lag funksjonen `gangetabell(tall)` som returnerer en array med de ti første tallene i gangetabellen. `gangetabell(3)` skal gi `[3, 6, 9, 12, 15, 18, 21, 24, 27, 30]`.

Til slutt det kraftigste: en funksjon som tar imot en array og returnerer et objekt med flere svar samtidig.

```js
function statistikk(tall) {
  let sum = 0;
  let storst = tall[0];
  for (let t of tall) {
    sum += t;
    if (t > storst) {
      storst = t;
    }
  }
  return {
    antall: tall.length,
    sum: sum,
    snitt: sum / tall.length,
    storst: storst
  };
}

let resultat = statistikk([45, 88, 62, 91]);
console.log(resultat);
console.log(`Snittet er ${resultat.snitt}`);
```

7. Skriv av koden, og kjør programmet.
8. Utvid funksjonen slik at objektet også inneholder det minste tallet.

> **💡 Tips:** En funksjon kan bare returnere **én** verdi. Trenger du flere svar, pakker du dem i et objekt — akkurat som her. Dette er et mønster du kommer til å se overalt i profesjonell kode.

---

## 5.10 Å bygge et program av funksjoner

```js
function lagVare(navn, pris, antall) {
  return { navn: navn, pris: pris, antall: antall };
}

function radSum(vare) {
  return vare.pris * vare.antall;
}

function skrivKvittering(kurv) {
  let total = 0;
  for (let vare of kurv) {
    let sum = radSum(vare);
    total += sum;
    console.log(`${vare.antall} x ${vare.navn} = ${sum} kr`);
  }
  console.log("--------------------");
  console.log(`Å betale: ${total} kr`);
}

let kurv = [];
kurv.push(lagVare("T-skjorte", 199, 2));
kurv.push(lagVare("Bukse", 599, 1));
kurv.push(lagVare("Sokker", 79, 5));

skrivKvittering(kurv);
```

Nå setter vi alt sammen. Legg merke til hvordan programmet er bygget: øverst står funksjonene, hver med én tydelig oppgave, og nederst står selve programflyten — bare fem linjer som er lette å lese.

Slik jobber utviklere. Hver funksjon gjør én ting, har et navn som forteller hva den gjør, og kan testes for seg. Å dele et stort problem opp i slike biter kalles **dekomponering**, og er kanskje den viktigste ferdigheten i hele faget.

1. Les hele programmet. Hva blir utskriften?
2. Lag fila `kassa.js`, skriv av koden, og kjør programmet.
3. Legg merke til at `skrivKvittering` kaller `radSum`. Funksjoner som bruker andre funksjoner er helt vanlig.
4. Legg til en vare i kurven. Du trenger bare én ny linje.
5. Lag funksjonen `medRabatt(sum, prosent)` som returnerer summen etter rabatt, og bruk den i `skrivKvittering` slik at kunder som handler for over 1000 kr får 10 % avslag.
6. Lag funksjonen `antallVarer(kurv)` som returnerer det totale antallet enheter i kurven (altså summen av alle `antall`), og skriv det ut nederst på kvitteringen.

> **💡 Tips til gode funksjoner:** Gi funksjonen et navn som er et **verb** — den gjør jo noe: `regnUtSnitt`, `lagBruker`, `skrivKvittering`. Blir funksjonen lengre enn cirka 15 linjer, gjør den sannsynligvis for mye, og bør deles i to.

---

## Fem feller — og hvordan du kjenner dem igjen

| Feil | Symptom | Løsning |
|---|---|---|
| Glemt `return` | Du får `undefined` når du bruker returverdien | Sjekk at funksjonen faktisk returnerer noe, ikke bare logger |
| Glemte parenteser i kallet | Ingenting skjer, ingen feilmelding | `visMeny` er navnet, `visMeny()` er kallet |
| Kode etter `return` | Kodelinjer kjøres aldri | `return` avslutter funksjonen der og da |
| Argumenter i feil rekkefølge | Rar utskrift, ingen feilmelding | Rekkefølgen i kallet må matche parameterne |
| Lokal variabel brukt utenfor | `ReferenceError: ... is not defined` | Returner verdien i stedet for å lete etter variabelen |

---

## Sammendrag

I dette kapitlet har du lært å lage dine egne funksjoner: navngitte kodeblokker som tar imot verdier, gjør en jobb, og leverer et svar tilbake.

### Deklarere og kalle

```js
function visLinje() {
  console.log("--------");
}

visLinje();
visLinje();
```

```text
--------
--------
```

Deklarasjonen lager funksjonen; kallet med parenteser kjører den.

### Parametere og argumenter

```js
function hils(navn, tid = "dag") {
  console.log(`God ${tid}, ${navn}!`);
}

hils("Mia");
hils("Jonas", "kveld");
```

```text
God dag, Mia!
God kveld, Jonas!
```

Parameterne står i deklarasjonen, argumentene sendes inn ved kallet. En parameter kan ha en standardverdi.

### return

```js
function dobbel(tall) {
  return tall * 2;
}

let svar = dobbel(21);
console.log(svar);
console.log(dobbel(5) + dobbel(10));
```

```text
42
30
```

`console.log` viser noe for et menneske; `return` leverer en verdi tilbake til programmet. `return` avslutter funksjonen umiddelbart.

### Funksjoner som svarer true eller false

```js
function erTom(tekst) {
  return tekst.length === 0;
}

if (erTom("")) {
  console.log("Feltet må fylles ut");
}
```

```text
Feltet må fylles ut
```

Returner selve det logiske uttrykket, og bruk funksjonen direkte som vilkår.

### Rekkevidde

```js
let navn = "utenfor";

function test() {
  let navn = "inni";
  console.log(navn);
}

test();
console.log(navn);
```

```text
inni
utenfor
```

Variabler laget inne i en funksjon finnes bare der.

### Funksjoner med arrayer og objekter

```js
function snitt(tall) {
  let sum = 0;
  for (let t of tall) {
    sum += t;
  }
  return sum / tall.length;
}

function lagElev(navn, poeng) {
  return { navn: navn, poeng: poeng };
}

console.log(snitt([4, 5, 6]));
console.log(lagElev("Ali", 42));
```

```text
5
{ navn: 'Ali', poeng: 42 }
```

Funksjoner kan både ta imot og returnere arrayer og objekter. Trenger du flere svar, returnerer du et objekt.

### Tilfeldige tall

```js
function kastTerning() {
  return Math.floor(Math.random() * 6) + 1;
}
console.log(kastTerning());
```

```text
4
```

`Math.random()` gir et tall fra og med 0 til (men ikke med) 1.

---

## Oppgaver

### Del A — Enkle oppgaver

**Oppgave A1**

```js
function ganger(a, b) {
  return a * b;
}

function skrivUt(a, b) {
  console.log(a * b);
}

console.log(ganger(3, 4));
let x = skrivUt(3, 4);
console.log(x);
```

Les koden, og skriv ned på papir hva de tre utskriftene blir. Forklar med egne ord hvorfor den siste blir som den blir. Skriv deretter av koden, kjør programmet, og sjekk svaret ditt.

**Oppgave A2**

```js
funksjon hils(navn] {
  console.log("Hei " + navn)
}

hils;
```

Koden inneholder fire feil. Rett alle feilene slik at programmet skriver ut `Hei Mia` når det kjøres.

**Oppgave A3**

```text
┌──────────────────────────────────────┐
│ }                                    │
├──────────────────────────────────────┤
│ console.log(kvadrat(5));             │
├──────────────────────────────────────┤
│ function kvadrat(tall) {             │
├──────────────────────────────────────┤
│   return tall * tall;                │
└──────────────────────────────────────┘
```

Sett sammen kodelinjene slik at programmet skriver ut `25`.

**Oppgave A4**

```js
function ...(pris, antall) {
  ... pris * antall;
}

console.log(totalPris(45, 3));
```

Fullfør koden slik at programmet skriver ut `135`.

**Oppgave A5**

```js
function erStorBestilling(sum) {
  ...
}
```

```text
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│  return sum > 500; │  │  sum > 500;        │  │  console.log(sum); │
└────────────────────┘  └────────────────────┘  └────────────────────┘
```

Bare én av de tre kodebitene gjør at funksjonen kan brukes slik:

```js
if (erStorBestilling(750)) {
  console.log("Gratis frakt!");
}
```

Velg riktig kodebit, og forklar hvorfor de to andre ikke fungerer.

**Oppgave A6**

Skriv funksjonen `visStjerner(antall)` som skriver ut en linje med det antallet stjerner du sender inn. `visStjerner(5)` skal skrive ut `*****`. Bruk en løkke og en tekstvariabel, slik du lærte i hefte 3.

**Oppgave A7**

Lag et program med funksjonen `hilsPaa(navn)` som skriver ut en hilsen. Programmet skal lese inn navnet fra kommandolinja og kalle funksjonen:

```text
node hils.js Sara
Hei, Sara! Velkommen til kurset.
```

**Oppgave A8**

Skriv funksjonen `storstAv(a, b)` som returnerer det største av to tall. Test den med `storstAv(7, 3)` og `storstAv(2, 9)`.

### Del B — Middels

**Oppgave B1**

Skriv funksjonen `celsiusTilFahrenheit(grader)` som returnerer temperaturen i Fahrenheit. Formelen er `F = C * 9 / 5 + 32`.

Bruk deretter funksjonen sammen med en løkke som skriver ut en omregningstabell fra 0 til 100 grader, med 10 graders steg:

```text
0 °C = 32 °F
10 °C = 50 °F
20 °C = 68 °F
...
```

**Oppgave B2**

Skriv funksjonen `erGyldigBrukernavn(navn)` som returnerer `true` bare dersom **alle** disse kravene er oppfylt:

- navnet er minst 3 tegn langt
- navnet er høyst 12 tegn langt
- navnet inneholder ikke mellomrom

Test funksjonen med `"ola"`, `"a"`, `"ola nordmann"` og `"kodemester2010"`.

> **💡 Tips:** `navn.includes(" ")` er `true` dersom teksten inneholder et mellomrom. Husk `!` fra hefte 2.

**Oppgave B3**

```text
Lag funksjonen finnMinste med en array som parameter
    Gi minste verdien til det første elementet i arrayen
    Gjenta for hvert tall i arrayen:
        Hvis tallet er mindre enn minste:
            Gi minste verdien til tallet
    Returner minste
```

Lag funksjonen ovenfor etter algoritmen, og test den med `finnMinste([45, 12, 88, 3, 61])`.

**Oppgave B4**

Skriv funksjonen `lagProdukt(navn, pris)` som returnerer et objekt med egenskapene `navn`, `pris` og `paaLager` (som alltid settes til `true`).

Bruk funksjonen til å bygge en array med minst fire produkter, og skriv deretter en funksjon `visKatalog(produkter)` som skriver ut alle produktene på formen `Kaffe — 89 kr`.

**Oppgave B5**

Skriv funksjonen `terningSum(antall)` som kaster en terning så mange ganger du oppgir, og returnerer summen av alle kastene. Bruk `kastTerning()` fra 5.5 inne i funksjonen.

Kjør deretter `terningSum(1000)` og del svaret på 1000. Hvorfor ligger resultatet nær 3,5?

**Oppgave B6**

Skriv funksjonen `byggListe(varer)` som tar imot en array med tekster og returnerer en ferdig HTML-liste som **én tekst**:

```text
<ul>
  <li>Kaffe</li>
  <li>Melk</li>
</ul>
```

Legg merke til at funksjonen skal **returnere** teksten, ikke skrive den ut. Selve utskriften gjør du med `console.log(byggListe(...))`.

**Oppgave B7**

```js
let elever = [
  { navn: "Mia", poeng: 82 },
  { navn: "Jonas", poeng: 51 },
  { navn: "Sara", poeng: 94 },
  { navn: "Ali", poeng: 38 }
];
```

Bruk funksjonen `karakterFor(poeng)` fra 5.6, og skriv et program som skriver ut navn og karakter for hver elev. Lag også funksjonen `antallBestatt(elever)` som returnerer hvor mange som fikk karakteren 2 eller bedre.

### Del C — Mer krevende

**Oppgave C1**

Lag ditt eget lille verktøybibliotek for tekst. Skriv disse tre funksjonene, og test alle grundig:

- `snuTekst(tekst)` — returnerer teksten baklengs. `snuTekst("koder")` gir `"redok"`.
- `tellVokaler(tekst)` — returnerer antall vokaler i teksten.
- `erPalindrom(tekst)` — returnerer `true` dersom teksten er den samme baklengs som forlengs. `erPalindrom("agnes i senga")` skal gi `true`.

> **💡 Tips:** `tekst.split("")` gir deg en array med ett tegn per element, og `join("")` limer den sammen igjen. `tekst.toLowerCase()` gjør hele teksten til små bokstaver. `erPalindrom` bør bruke `snuTekst` — funksjoner som bruker funksjoner er poenget her.

**Oppgave C2**

```js
let salg = [
  { selger: "Mia", belop: 12000 },
  { selger: "Jonas", belop: 8500 },
  { selger: "Sara", belop: 15400 },
  { selger: "Ali", belop: 9100 }
];
```

Skriv funksjonen `salgsrapport(salg)` som returnerer et **objekt** med disse egenskapene: `total`, `snitt`, `beste` (navnet på selgeren med høyest beløp) og `antall`.

Skriv deretter en funksjon `skrivRapport(rapport)` som tar imot objektet og skriver ut en pen rapport. Legg merke til arbeidsdelingen: den ene funksjonen regner, den andre presenterer. Slik skal det være.

**Oppgave C3**

Lag en passordkontroll som gir poeng etter styrke. Skriv funksjonen `vurderPassord(passord)` som returnerer et objekt på formen `{ poeng: 3, tekst: "Middels" }`.

Passordet får ett poeng for hvert av disse kravene det oppfyller:

- minst 8 tegn
- minst 12 tegn
- inneholder minst ett siffer
- inneholder minst én stor bokstav

Poengsummen oversettes til tekst slik: 0–1 gir `"Svakt"`, 2–3 gir `"Middels"`, 4 gir `"Sterkt"`.

> **💡 Tips:** For å sjekke om passordet inneholder et siffer, kan du gå gjennom tegnene med en løkke og bruke `"0123456789".includes(tegn)`. For stor bokstav kan du sammenligne `tegn === tegn.toUpperCase()` — men pass på at tegnet faktisk er en bokstav.

**Oppgave C4**

Lag et terningspill mot datamaskinen, bygget av flere funksjoner. Spillet skal ha minst disse:

- `kastTerning()` — ett terningkast
- `spillRunde()` — kaster to terninger og returnerer summen
- `finnVinner(spiller, datamaskin)` — returnerer `"Spiller"`, `"Datamaskin"` eller `"Uavgjort"`

Programmet skal spille fem runder, skrive ut resultatet av hver runde, og til slutt kåre en samlet vinner basert på hvor mange runder hver part vant. Antall runder skal kunne leses inn fra kommandolinja.

**Oppgave C5 — stjerneoppgave**

En funksjon kan kalle **seg selv**. Det kalles **rekursjon**, og er en av de vakreste idéene i programmering.

```js
function nedtelling(n) {
  if (n === 0) {
    console.log("Ferdig!");
    return;
  }
  console.log(n);
  nedtelling(n - 1);
}

nedtelling(5);
```

Skriv av koden, og kjør den. Forklar med egne ord hvorfor den stopper — og hva som ville skjedd uten `if`-setningen øverst.

Skriv deretter funksjonen `fakultet(n)` som returnerer produktet av alle heltall fra 1 til `n`. `fakultet(5)` skal gi 120, fordi 1·2·3·4·5 = 120. Løs den med rekursjon: `fakultet(n)` er `n * fakultet(n - 1)`, og `fakultet(1)` er 1.

---

## Et glimt av hefte 6

Helt i slutten av hefte 4 møtte du et problem: `sort()` sorterer tall som om de var tekst, slik at `[10, 9, 100]` blir `[10, 100, 9]`. Nå har du det som skal til for å fikse det.

```js
function sammenlign(a, b) {
  return a - b;
}

let tall = [10, 9, 100, 25];
tall.sort(sammenlign);
console.log(tall);
```

Skriv av koden, og kjør den. Nå blir resultatet `[9, 10, 25, 100]` — riktig sortert.

Se nøye på kallet: vi sender ikke inn et tall eller en tekst, men **selve funksjonen** — legg merke til at det står `sammenlign` uten parenteser. Vi ber ikke om resultatet av funksjonen; vi gir `sort` funksjonen selv, og lar `sort` kalle den underveis.

At funksjoner kan sendes rundt som verdier, er nøkkelen til moderne JavaScript. I neste hefte bruker vi det til pilfunksjoner og de kraftige array-metodene `forEach`, `map`, `filter`, `find` og `reduce` — verktøyene som gjør at koden din begynner å se ut som kode skrevet av en profesjonell utvikler.

---

*Hefte 5 av serien «JavaScript fra bunnen av». Neste hefte: Pilfunksjoner og moderne array-metoder.*
