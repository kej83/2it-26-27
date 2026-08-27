# Prøve i programmering — JavaScript

**Pensum:** Hefte 1 (Variabler), hefte 2 (Logiske uttrykk og if-else) og hefte 3 (Løkker)

| | |
|---|---|
| **Navn:** | _______________________________________ |
| **Klasse:** | _______________________________________ |
| **Dato:** | _______________________________________ |

**Tid:** 60 minutter  **Hjelpemidler:** Ingen  **Maks poeng:** 60

**Slik svarer du:** Alle svar skrives på eget ark. Merk hvert svar tydelig med oppgavenummer, for eksempel «1.3» eller «7 b)». Du trenger ikke skrive av oppgaveteksten. Skriv kode med tydelig innrykk. Små slurvefeil i syntaks trekker lite så lenge tankegangen er riktig — men vis at du kan skrive ordentlig JavaScript.

Oppgavene blir mer krevende utover i prøven, og de siste oppgavene gir flest poeng. Rekk over alt før du pusser på detaljene.

---

## Del 1 — Flervalg (6 poeng, 1 poeng per riktig svar)

Svar med kun én bokstav per oppgave.

**Oppgave 1.1**
Hva skriver programmet ut?

```js
let x = "5";
console.log(x + 3);
```

A) `8`  B) `53`  C) `5 + 3`  D) Feilmelding

**Oppgave 1.2**
Hvilken datatype har verdien `true`?

A) `string`  B) `number`  C) `boolean`  D) `let`

**Oppgave 1.3**
Hva er verdien av `17 % 5`?

A) `2`  B) `3`  C) `3.4`  D) `12`

**Oppgave 1.4**
Variabelen `a` har verdien `7`. Hvilket av disse logiske uttrykkene er `true`?

A) `a === "7"`  B) `a !== 7`  C) `a >= 8`  D) `a > 5 && a < 10`

**Oppgave 1.5**
Hvor mange ganger kjøres kodeblokka i denne løkka?

```js
for (let i = 3; i < 9; i += 2) {
  console.log("Hei");
}
```

A) 2  B) 3  C) 4  D) 6

**Oppgave 1.6**
Programmet i fila `app.js` består av kodelinja `console.log(process.argv[2]);`. Hva skrives ut når du kjører `node app.js Mia 16`?

A) `node`  B) `app.js`  C) `Mia`  D) `16`

---

## Del 2 — Hva skriver programmet? (8 poeng, 2 poeng per oppgave)

Skriv nøyaktig hva hvert program skriver ut. Får programmet flere utskriftslinjer, skriver du alle linjene.

**Oppgave 2.1**

```js
let poeng = 10;
poeng += 5;
poeng *= 2;
console.log(poeng);
```

**Oppgave 2.2**
Programmet nedenfor kjøres to ganger: først med `node alder.js 15`, deretter med `node alder.js 40`. Skriv utskriften for hver av de to kjøringene.

```js
let alder = Number(process.argv[2]);
if (alder < 12) {
  console.log("Barn");
} else if (alder < 18) {
  console.log("Ungdom");
} else {
  console.log("Voksen");
}
```

**Oppgave 2.3**

```js
let sum = 0;
for (let i = 1; i <= 4; i++) {
  sum += i * 2;
}
console.log(sum);
```

**Oppgave 2.4**

```js
let x = 40;
while (x > 5) {
  console.log(x);
  x = x / 2;
}
```

---

## Del 3 — Finn og rett feil (7 poeng)

**Oppgave 3.1 (4 poeng)**
Programmet skal sjekke om brukeren er administratoren. Koden inneholder **fire feil**. Skriv hele programmet riktig på arket ditt.

```js
let navn = process.argv[2)
if navn === "admin" {
  console.log("Velkommen, sjef!");
} els {
  console.log(Ingen tilgang);
}
```

**Oppgave 3.2 (3 poeng)**
En nettbutikk deler ordrer inn etter beløp. Programmet nedenfor har **ingen syntaksfeil**, og det kjører uten feilmelding — men teksten `Stor ordre` blir aldri skrevet ut, uansett beløp.

```js
let belop = Number(process.argv[2]);
if (belop > 100) {
  console.log("Middels ordre");
} else if (belop > 500) {
  console.log("Stor ordre");
} else {
  console.log("Liten ordre");
}
```

a) Forklar hvorfor `Stor ordre` aldri skrives ut.
b) Skriv om programmet slik at det virker: over 500 kr er stor ordre, over 100 kr er middels, ellers liten.

---

## Del 4 — Sett kodelinjene i riktig rekkefølge (6 poeng, 3 poeng per oppgave)

Svar med rekkefølgen av bokstaver, for eksempel «F, B, A, ...». Du trenger ikke skrive av koden.

**Oppgave 4.1**
Programmet skal lese inn et passord fra kommandolinja, og skrive ut `Riktig passord` dersom det er `kode123`, ellers `Feil passord`.

```text
A:   } else {
B:   let passord = process.argv[2];
C:   console.log("Feil passord");
D:   if (passord === "kode123") {
E:   console.log("Riktig passord");
F:   }
```

**Oppgave 4.2**
Programmet skal skrive ut nøyaktig dette:

```text
Melding nr. 1
Melding nr. 2
Melding nr. 3
```

```text
A:   teller += 1;
B:   let teller = 0;
C:   while (teller < 3) {
D:   console.log(`Melding nr. ${teller}`);
E:   }
```

Pass på: rekkefølgen på linjene **inne i** løkka avgjør om utskriften starter på 0 eller 1.

---

## Del 5 — Skriv ferdig koden (7 poeng)

**Oppgave 5.1 (3 poeng)**
En nettbutikk gir gratis frakt på handler på 500 kr eller mer; ellers koster frakten 79 kr. Skriv av programmet, og sett de tre kodebitene inn på riktig plass der det mangler kode (`...`).

```js
let handlesum = Number(process.argv[2]);
let frakt = 0;
if (...) {
  frakt = 0;
} else {
  ...
}
let total = ...;
console.log(`Å betale: ${total} kr`);
```

```text
┌───────────────────────┐  ┌──────────────────┐  ┌─────────────────────┐
│  handlesum >= 500     │  │  frakt = 79;     │  │  handlesum + frakt  │
└───────────────────────┘  └──────────────────┘  └─────────────────────┘
```

**Oppgave 5.2 (4 poeng)**
Skriv programmet ferdig ved å erstatte kommentarene med kode. Programmet skal telle hvor mange av tallene fra 1 til og med 20 som er partall, og til slutt skrive ut antallet.

```js
let antallPartall = 0;
for (let i = 1; i <= 20; i++) {
  // Hvis i er et partall:
  //   øk antallPartall med 1
}
// Skriv ut antallPartall
```

---

## Del 6 — Endre koden slik at utskriften stemmer (6 poeng, 2 poeng per oppgave)

I hver oppgave ser du et program, utskriften det gir **nå**, og utskriften vi **ønsker**. Skriv hvilke endringer som må gjøres i koden. Du trenger bare skrive kodelinjene du endrer.

**Oppgave 6.1**

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

Nå: `0 1 2 3 4` (på hver sin linje)  Ønsket: `1 2 3 4 5` (på hver sin linje)

**Oppgave 6.2**

```js
let navn = "Mia";
console.log("Hei ${navn}!");
```

Nå: `Hei ${navn}!`  Ønsket: `Hei Mia!`

**Oppgave 6.3**

```js
let x = 2;
while (x < 100) {
  console.log(x);
  x = x * 2;
}
```

Nå: `2 4 8 16 32 64` (på hver sin linje)  Ønsket: `2 4 8 16` (på hver sin linje)

---

## Del 7 — Algoritmisk tenkning (20 poeng)

I denne delen skal du skrive hele programmer selv, og vise at du kan følge kode nøyaktig. Skriv tydelig, med innrykk.

**Oppgave 7.1 (5 poeng)**
Oversett algoritmen til et fullstendig JavaScript-program:

```text
Les inn et heltall n fra kommandolinja
Gi sum verdien 0
Gjenta for hvert tall i fra 1 til og med n:
    Hvis i er delelig med 3:
        Øk sum med i
Skriv ut sum
```

**Oppgave 7.2 (5 poeng)**
Et innloggingssystem tar imot to argumenter: brukernavn og passord, for eksempel `node innlogging.js admin hemmelig`. Skriv et program som følger disse reglene:

- Er passordet `hemmelig` **og** brukernavnet `admin`, skrives `Full tilgang` ut.
- Er passordet `hemmelig`, men brukernavnet noe annet, skrives `Vanlig tilgang` ut.
- Ellers skrives `Avvist` ut.

**Oppgave 7.3 (4 poeng)**
Les programmet nøye, og følg verdiene til `tall` og `steg` runde for runde. Hva skriver programmet ut til slutt? Vis hvordan du kom fram til svaret, for eksempel med en tabell over rundene.

```js
let tall = 22;
let steg = 0;
while (tall !== 4) {
  if (tall % 2 === 0) {
    tall = tall / 2;
  } else {
    tall = tall + 1;
  }
  steg += 1;
}
console.log(tall, steg);
```

**Oppgave 7.4 (6 poeng)**
**Tverrsummen** av et tall er summen av sifrene i tallet. Tverrsummen av 472 er 4 + 7 + 2 = 13.

Skriv et program som leser inn et positivt heltall fra kommandolinja og skriver ut tverrsummen:

```text
node tverrsum.js 472
Tverrsummen er 13
```

Til hjelp: `472 % 10` gir det siste sifferet (2), og `Math.floor(472 / 10)` fjerner det siste sifferet (47). Bruk en `while`-løkke som plukker av ett og ett siffer til det ikke er flere igjen.

---

*Slutt på prøven. Sjekk at du har merket alle svar med riktig oppgavenummer.*
