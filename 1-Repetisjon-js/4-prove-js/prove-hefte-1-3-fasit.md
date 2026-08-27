# Fasit og rettenorm — Prøve i programmering (hefte 1–3)

*Til læreren. Maks poeng: 60. Generelt: små syntaksslurv (manglende semikolon, en glemt parentes) trekker ikke poeng når tankegangen og strukturen er riktig. Alternative løsninger som gir riktig resultat, godkjennes fullt ut.*

---

## Del 1 — Flervalg (6 p, 1 p per oppgave)

| Oppgave | Svar | Kommentar |
|---|---|---|
| 1.1 | **B** (`53`) | `"5"` er en streng, `+` limer |
| 1.2 | **C** (`boolean`) | |
| 1.3 | **A** (`2`) | 5 går 3 ganger opp i 17, rest 2 |
| 1.4 | **D** | `7 > 5 && 7 < 10` er `true`; A er `false` pga. typen |
| 1.5 | **B** (3 ganger) | i = 3, 5, 7 |
| 1.6 | **C** (`Mia`) | argumentene starter på plass 2 |

## Del 2 — Hva skriver programmet? (8 p, 2 p per oppgave)

**2.1** `30`  (10 → 15 → 30)

**2.2** `node alder.js 15` gir `Ungdom`, og `node alder.js 40` gir `Voksen`. (1 p per riktig kjøring.)

**2.3** `20`  (2 + 4 + 6 + 8)

**2.4** Tre linjer:

```text
40
20
10
```

(x blir 5 etter siste runde, og 5 > 5 er `false`, så 5 skrives ikke ut. 1 p dersom eleven har med 5.)

## Del 3 — Finn og rett feil (7 p)

**3.1 (4 p — 1 p per funnet og rettet feil)**

De fire feilene: `process.argv[2)` skal være `process.argv[2]`; vilkåret mangler parenteser: `if (navn === "admin") {`; `els` skal være `else`; `Ingen tilgang` mangler anførselstegn: `console.log("Ingen tilgang");`. Riktig program:

```js
let navn = process.argv[2];
if (navn === "admin") {
  console.log("Velkommen, sjef!");
} else {
  console.log("Ingen tilgang");
}
```

**3.2 (3 p: a 1 p, b 2 p)**

a) Vilkårene testes ovenfra og ned, og første sanne vilkår vinner. Et beløp over 500 er også over 100, så `belop > 100` fanger det først — `else if`-grenen nås aldri.

b) Snu rekkefølgen på de to første vilkårene:

```js
let belop = Number(process.argv[2]);
if (belop > 500) {
  console.log("Stor ordre");
} else if (belop > 100) {
  console.log("Middels ordre");
} else {
  console.log("Liten ordre");
}
```

## Del 4 — Riktig rekkefølge (6 p, 3 p per oppgave)

**4.1** `B, D, E, A, C, F`

```js
let passord = process.argv[2];
if (passord === "kode123") {
  console.log("Riktig passord");
} else {
  console.log("Feil passord");
}
```

**4.2** `B, C, A, D, E` — `teller += 1;` må stå **før** utskriften for at første linje skal bli «Melding nr. 1».

```js
let teller = 0;
while (teller < 3) {
  teller += 1;
  console.log(`Melding nr. ${teller}`);
}
```

(2 p dersom eleven svarer B, C, D, A, E — løkkelogikken er riktig, men utskriften starter da på 0.)

## Del 5 — Skriv ferdig koden (7 p)

**5.1 (3 p — 1 p per riktig plassert kodebit)**

```js
let handlesum = Number(process.argv[2]);
let frakt = 0;
if (handlesum >= 500) {
  frakt = 0;
} else {
  frakt = 79;
}
let total = handlesum + frakt;
console.log(`Å betale: ${total} kr`);
```

**5.2 (4 p: if-vilkåret 2 p, telling 1 p, utskrift 1 p)**

```js
let antallPartall = 0;
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    antallPartall += 1;
  }
}
console.log(antallPartall);
```

Programmet skriver ut `10`. (Eleven skal ikke oppgi tallet, bare koden.)

## Del 6 — Endre koden (6 p, 2 p per oppgave)

**6.1** Endre løkkelinja til `for (let i = 1; i <= 5; i++)`. (Også riktig: behold løkka og skriv `console.log(i + 1);`.)

**6.2** Bytt anførselstegnene med backticks: `` console.log(`Hei ${navn}!`); `` — `${...}` virker bare i template-strenger.

**6.3** Endre vilkåret slik at løkka stopper tidligere, f.eks. `while (x < 20)` eller `while (x <= 16)`.

## Del 7 — Algoritmisk tenkning (20 p)

**7.1 (5 p: innlesing med Number 1 p, løkke 1–n 2 p, if med % og sum 1 p, utskrift 1 p)**

```js
let n = Number(process.argv[2]);
let sum = 0;
for (let i = 1; i <= n; i++) {
  if (i % 3 === 0) {
    sum += i;
  }
}
console.log(sum);
```

**7.2 (5 p: to argumenter 1 p, && riktig 2 p, else if/else-struktur 2 p)**

```js
let brukernavn = process.argv[2];
let passord = process.argv[3];
if (passord === "hemmelig" && brukernavn === "admin") {
  console.log("Full tilgang");
} else if (passord === "hemmelig") {
  console.log("Vanlig tilgang");
} else {
  console.log("Avvist");
}
```

(Godta også løsninger med nøstede if-setninger eller flere `&&`-uttrykk, så lenge alle tre reglene blir riktige.)

**7.3 (4 p: riktig svar 2 p, synlig sporing/tabell 2 p)**

Utskriften blir `4 5`. Sporing:

| Runde | `tall` inn | partall? | `tall` ut | `steg` |
|---|---|---|---|---|
| 1 | 22 | ja | 11 | 1 |
| 2 | 11 | nei | 12 | 2 |
| 3 | 12 | ja | 6 | 3 |
| 4 | 6 | ja | 3 | 4 |
| 5 | 3 | nei | 4 | 5 |

Da er `tall !== 4` usant, løkka stopper, og programmet skriver `4 5`.

**7.4 (6 p: innlesing 1 p, while-vilkår 1 p, sifferuttak med % 10 1 p, fjerning med Math.floor 2 p, sum og utskrift 1 p)**

```js
let tall = Number(process.argv[2]);
let tverrsum = 0;
while (tall > 0) {
  tverrsum += tall % 10;
  tall = Math.floor(tall / 10);
}
console.log(`Tverrsummen er ${tverrsum}`);
```

`node tverrsum.js 472` gir `Tverrsummen er 13`.

---

## Poengoversikt og forslag til karaktergrenser

| Del | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Sum |
|---|---|---|---|---|---|---|---|---|
| Poeng | 6 | 8 | 7 | 6 | 7 | 6 | 20 | 60 |

Veiledende grenser (juster etter klassens nivå): 2: fra 15 p, 3: fra 25 p, 4: fra 36 p, 5: fra 46 p, 6: fra 54 p.
