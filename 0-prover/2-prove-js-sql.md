# Prøve i IT2 – JavaScript og SQL

Flervalgsprøve · 44 oppgaver · 22 JavaScript og 22 SQL (PostgreSQL)

**Navn:** ______________________ &nbsp; **Klasse:** ________ &nbsp; **Dato:** __________

## Slik gjør du det

- Prøven har 44 oppgaver med fem alternativer (A–E) hver.
- All JavaScript-kode kjøres med Node.js i terminalen. `console.log(a, b)` skriver ut verdiene på samme linje med mellomrom.
- Som standard er **ett** alternativ riktig. Oppgaver med flere riktige svar er merket med **▶ Flere enn ett svar er riktig**. Der skal du krysse av for alle riktige alternativer.
- Før svarene dine inn på det **separate svararket**. Det er bare svararket som rettes.

---

## Del 1 – JavaScript (oppgave 1–22)

### 1. Hva skrives ut i terminalen?

```js
let a = 7;
let b = 2;
console.log(a % b);
```

- **A** &nbsp; 3.5
- **B** &nbsp; 1
- **C** &nbsp; 3
- **D** &nbsp; 0
- **E** &nbsp; 14

### 2. Hva skrives ut i terminalen?

```js
let a = 3;
let b = 8;
let temp = a;
a = b;
b = temp;
console.log(a, b);
```

- **A** &nbsp; 3 8
- **B** &nbsp; 8 8
- **C** &nbsp; 8 3
- **D** &nbsp; 3 3
- **E** &nbsp; 11 3

### 3. Hvilke av linjene under skriver ut tallet 10?

> ▶ **Flere enn ett svar er riktig.** Kryss av for alle riktige.

- **A** &nbsp; `console.log(5 + 5);`
- **B** &nbsp; `console.log("5" + 5);`
- **C** &nbsp; `console.log("5" * 2);`
- **D** &nbsp; `console.log(20 / 2);`
- **E** &nbsp; `console.log("10" === 10);`

### 4. Hva skrives ut i terminalen?

```js
let poeng = 85;
if (poeng >= 50) {
  console.log("Bestått");
} else if (poeng >= 80) {
  console.log("Meget godt");
} else {
  console.log("Ikke bestått");
}
```

- **A** &nbsp; Meget godt
- **B** &nbsp; Bestått og Meget godt på hver sin linje
- **C** &nbsp; Bestått
- **D** &nbsp; Ikke bestått
- **E** &nbsp; Ingenting skrives ut

### 5. For hvilke verdier av **alder** og **medForelder** skrives «Avvist» ut?

> ▶ **Flere enn ett svar er riktig.** Kryss av for alle riktige.

```js
if (alder >= 18 || medForelder) {
  console.log("Slipper inn");
} else {
  console.log("Avvist");
}
```

- **A** &nbsp; `alder = 20`  og  `medForelder = false`
- **B** &nbsp; `alder = 15`  og  `medForelder = false`
- **C** &nbsp; `alder = 17`  og  `medForelder = true`
- **D** &nbsp; `alder = 16`  og  `medForelder = false`
- **E** &nbsp; `alder = 18`  og  `medForelder = false`

### 6. Hva skrives ut i terminalen?

```js
let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
}
console.log(sum);
```

- **A** &nbsp; 10
- **B** &nbsp; 15
- **C** &nbsp; 5
- **D** &nbsp; 12345
- **E** &nbsp; 21

### 7. Hvilke tall skrives ut?

```js
for (let i = 10; i > 0; i -= 3) {
  console.log(i);
}
```

- **A** &nbsp; 10 7 4
- **B** &nbsp; 7 4 1
- **C** &nbsp; 9 6 3
- **D** &nbsp; 10 7 4 1
- **E** &nbsp; 10 7 4 1 -2

### 8. Hva skrives ut i terminalen?

```js
let n = 10;
let teller = 0;
while (n > 1) {
  n = n / 2;
  teller++;
}
console.log(teller);
```

- **A** &nbsp; 4
- **B** &nbsp; 3
- **C** &nbsp; 5
- **D** &nbsp; 10
- **E** &nbsp; Ingenting – løkken går uendelig

### 9. Hva skrives ut i terminalen?

```js
let teller = 0;
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 4; j++) {
    teller++;
  }
}
console.log(teller);
```

- **A** &nbsp; 7
- **B** &nbsp; 12
- **C** &nbsp; 3
- **D** &nbsp; 4
- **E** &nbsp; 16

### 10. Hva skrives ut i terminalen?

```js
let antall = 0;
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    antall++;
  }
}
console.log(antall);
```

- **A** &nbsp; 10
- **B** &nbsp; 4
- **C** &nbsp; 5
- **D** &nbsp; 6
- **E** &nbsp; 2

### 11. Hva skrives ut i terminalen?

```js
let tall = [4, 9, 2, 7];
let storst = tall[0];
for (let i = 1; i < tall.length; i++) {
  if (tall[i] > storst) {
    storst = tall[i];
  }
}
console.log(storst);
```

- **A** &nbsp; 9
- **B** &nbsp; 4
- **C** &nbsp; 7
- **D** &nbsp; 2
- **E** &nbsp; 22

### 12. Koden i forrige oppgave skal nå finne det **minste** tallet i stedet. Hva er den minste endringen som må gjøres for at det skal fungere?

- **A** &nbsp; Endre `let i = 1` til `let i = 0`
- **B** &nbsp; Endre `let storst = tall[0]` til `let storst = 0`
- **C** &nbsp; Endre `i < tall.length` til `i <= tall.length`
- **D** &nbsp; Gi variabelen `storst` et nytt navn
- **E** &nbsp; Endre `tall[i] > storst` til `tall[i] < storst`

### 13. Gitt arrayen under. Hvilke uttrykk gir det **siste** elementet, "Cim"?

> ▶ **Flere enn ett svar er riktig.** Kryss av for alle riktige.

```js
let navn = ["Ada", "Bo", "Cim"];
```

- **A** &nbsp; `navn[3]`
- **B** &nbsp; `navn[navn.length - 1]`
- **C** &nbsp; `navn[2]`
- **D** &nbsp; `navn[navn.length]`
- **E** &nbsp; `navn[-1]`

### 14. Hva skrives ut i terminalen?

```js
let liste = [1, 2, 3];
liste.push(4);
liste.shift();
liste.pop();
console.log(liste);
```

- **A** &nbsp; [ 1, 2 ]
- **B** &nbsp; [ 2, 3, 4 ]
- **C** &nbsp; [ 2, 3 ]
- **D** &nbsp; [ 1, 2, 3 ]
- **E** &nbsp; [ 3 ]

### 15. Hva skrives ut på den **siste** linjen i terminalen?

```js
function hils(navn) {
  console.log("Hei " + navn);
}
let r = hils("Ola");
console.log(r);
```

- **A** &nbsp; Hei Ola
- **B** &nbsp; Ola
- **C** &nbsp; null
- **D** &nbsp; undefined
- **E** &nbsp; Det blir en feilmelding

### 16. Hva skrives ut i terminalen?

```js
function antallOver(liste, grense) {
  let antall = 0;
  for (let i = 0; i < liste.length; i++) {
    if (liste[i] > grense) {
      antall++;
    }
  }
  return antall;
}
console.log(antallOver([3, 8, 5, 10, 5], 5));
```

- **A** &nbsp; 3
- **B** &nbsp; 4
- **C** &nbsp; 2
- **D** &nbsp; 5
- **E** &nbsp; 18

### 17. Hva skrives ut i terminalen?

```js
let elever = [
  { navn: "Ali",  poeng: 12 },
  { navn: "Siri", poeng: 18 },
  { navn: "Tor",  poeng: 9 }
];
let sum = 0;
for (let i = 0; i < elever.length; i++) {
  if (elever[i].poeng >= 10) {
    sum += elever[i].poeng;
  }
}
console.log(sum);
```

- **A** &nbsp; 39
- **B** &nbsp; 9
- **C** &nbsp; 2
- **D** &nbsp; 30
- **E** &nbsp; NaN

---

## Hotelloppgaven (oppgave 18–22)

Oppgave 18–22 bygger på hotelloppgaven. Alle oppgavene bruker arrayen **rom** under. Hver oppgave starter med arrayen slik den står her.

```js
let rom = [
  { nummer: 101, type: "enkelt",  pris: 900,  ledig: true  },
  { nummer: 102, type: "dobbelt", pris: 1400, ledig: false },
  { nummer: 201, type: "dobbelt", pris: 1400, ledig: true  },
  { nummer: 202, type: "suite",   pris: 2500, ledig: true  },
  { nummer: 301, type: "enkelt",  pris: 900,  ledig: false }
];
```

### 18. Hva skrives ut i terminalen?

```js
let antallLedige = 0;
for (let i = 0; i < rom.length; i++) {
  if (rom[i].ledig) {
    antallLedige++;
  }
}
console.log(antallLedige);
```

- **A** &nbsp; 5
- **B** &nbsp; 2
- **C** &nbsp; 3
- **D** &nbsp; 4
- **E** &nbsp; 0

### 19. Hotellet gir rabatt ved lange opphold. Hva skrives ut?

```js
function prisForOpphold(pris, netter) {
  let total = pris * netter;
  if (netter >= 7) {
    total = total * 0.9;
  }
  return total;
}
console.log(prisForOpphold(1400, 7));
```

- **A** &nbsp; 9800
- **B** &nbsp; 1260
- **C** &nbsp; 980
- **D** &nbsp; 8820
- **E** &nbsp; 8800

### 20. Hvilke romnumre skrives ut?

```js
for (let i = 0; i < rom.length; i++) {
  if (rom[i].ledig && rom[i].pris < 2000) {
    console.log(rom[i].nummer);
  }
}
```

- **A** &nbsp; 101 201 202
- **B** &nbsp; 102 201
- **C** &nbsp; 101 201
- **D** &nbsp; 201
- **E** &nbsp; 101 102 201 301

### 21. En gjest vil ha et **ledig** rom av typen "dobbelt" **eller** "suite". Hvilke if-tester fungerer riktig, uansett hvilke rom hotellet har?

> ▶ **Flere enn ett svar er riktig.** Kryss av for alle riktige.

- **A** &nbsp; `if (rom[i].ledig && (rom[i].type === "dobbelt" || rom[i].type === "suite"))`
- **B** &nbsp; `if (rom[i].ledig && rom[i].type === "dobbelt" || rom[i].type === "suite")`
- **C** &nbsp; `if (rom[i].ledig || rom[i].type === "dobbelt" || rom[i].type === "suite")`
- **D** &nbsp; `if ((rom[i].type === "dobbelt" || rom[i].type === "suite") && rom[i].ledig)`
- **E** &nbsp; `if (rom[i].ledig && rom[i].type === "dobbelt" && rom[i].type === "suite")`

### 22. Hva skrives ut i terminalen?

```js
function bestill(nummer) {
  for (let i = 0; i < rom.length; i++) {
    if (rom[i].nummer === nummer) {
      if (rom[i].ledig) {
        rom[i].ledig = false;
        return "Bestilt";
      } else {
        return "Opptatt";
      }
    }
  }
  return "Finnes ikke";
}
console.log(bestill(201));
console.log(bestill(201));
console.log(bestill(401));
```

- **A** &nbsp; Bestilt, Bestilt, Finnes ikke
- **B** &nbsp; Opptatt, Opptatt, Finnes ikke
- **C** &nbsp; Bestilt, Opptatt, Opptatt
- **D** &nbsp; Bestilt, Bestilt, Opptatt
- **E** &nbsp; Bestilt, Opptatt, Finnes ikke

---

## Del 2 – SQL / PostgreSQL (oppgave 23–44)

Flere av oppgavene bruker tabellen **elever** under.

| id | fornavn | etternavn | klasse | alder | poeng |
|---|---|---|---|---|---|
| 1 | Ali | Hansen | 2IT | 17 | 45 |
| 2 | Siri | Berg | 2IT | 16 | 62 |
| 3 | Tor | Lie | 2ST | 18 | 38 |
| 4 | Nora | Hansen | 2ST | 17 | 71 |
| 5 | Emil | Dahl | 2IT | 17 | 55 |
| 6 | Ida | Moe | 2ST | 16 | 50 |
| 7 | Jonas | Berg | 2IT | 18 | 80 |
| 8 | Maja | Lie | 2ST | 17 | 45 |

### 23. Hva står forkortelsen SQL for?

- **A** &nbsp; Simple Question Language
- **B** &nbsp; Structured Query Language
- **C** &nbsp; Standard Queue Logic
- **D** &nbsp; System Query Link
- **E** &nbsp; Structured Quick List

### 24. Hva er en primærnøkkel (PRIMARY KEY)?

- **A** &nbsp; Kolonnen som tabellen alltid sorteres etter
- **B** &nbsp; Alltid den første kolonnen i tabellen
- **C** &nbsp; En tekstkolonne som inneholder navn
- **D** &nbsp; Passordet til databasen
- **E** &nbsp; En kolonne (eller flere) som identifiserer hver rad unikt

### 25. Hvilke av disse er gyldige datatyper i PostgreSQL?

> ▶ **Flere enn ett svar er riktig.** Kryss av for alle riktige.

- **A** &nbsp; `INTEGER`
- **B** &nbsp; `NUMBER`
- **C** &nbsp; `VARCHAR(50)`
- **D** &nbsp; `STRING`
- **E** &nbsp; `BOOLEAN`

### 26. Hva betyr `id SERIAL PRIMARY KEY` i en CREATE TABLE-setning?

- **A** &nbsp; id må alltid fylles inn manuelt
- **B** &nbsp; id blir en tekstkolonne
- **C** &nbsp; id får automatisk et økende heltall og er primærnøkkel
- **D** &nbsp; id kan være tom (NULL) og ha like verdier
- **E** &nbsp; Tabellen blir sortert etter id

### 27. Hvilken setning lager en ny tabell på riktig måte?

- **A** &nbsp; `MAKE TABLE fag (id SERIAL PRIMARY KEY, navn VARCHAR(50));`
- **B** &nbsp; `CREATE TABLE fag [id SERIAL PRIMARY KEY, navn VARCHAR(50)];`
- **C** &nbsp; `CREATE fag TABLE (id SERIAL PRIMARY KEY, navn VARCHAR(50));`
- **D** &nbsp; `CREATE TABLE fag (id SERIAL PRIMARY KEY, navn VARCHAR(50) NOT NULL);`
- **E** &nbsp; `NEW TABLE fag (id SERIAL PRIMARY KEY, navn VARCHAR(50));`

### 28. Hvilken setning legger til en ny elev i tabellen **elever** på riktig måte i PostgreSQL?

- **A** &nbsp; `INSERT elever VALUES Mia, Strand, 2IT, 16, 40;`
- **B** &nbsp; `INSERT INTO elever (fornavn, etternavn, klasse, alder, poeng) VALUES ('Mia', 'Strand', '2IT', 16, 40);`
- **C** &nbsp; `ADD INTO elever (fornavn, etternavn) VALUES ('Mia', 'Strand');`
- **D** &nbsp; `INSERT INTO elever (fornavn, etternavn) VALUES ("Mia", "Strand");`
- **E** &nbsp; `UPDATE elever ADD ('Mia', 'Strand', '2IT', 16, 40);`

### 29. Hva betyr det at en kolonne er definert med `NOT NULL`?

- **A** &nbsp; Kolonnen må alltid ha en verdi
- **B** &nbsp; Verdien i kolonnen kan ikke være 0
- **C** &nbsp; Alle verdiene i kolonnen må være forskjellige
- **D** &nbsp; Kolonnen er primærnøkkel
- **E** &nbsp; Kolonnen får 0 som standardverdi

### 30. Hvor mange rader returnerer spørringen?

```sql
SELECT * FROM elever WHERE klasse = '2IT';
```

- **A** &nbsp; 3
- **B** &nbsp; 8
- **C** &nbsp; 4
- **D** &nbsp; 2
- **E** &nbsp; 0

### 31. Hvilke fornavn returnerer spørringen?

```sql
SELECT fornavn FROM elever
WHERE alder > 16 AND poeng >= 50;
```

- **A** &nbsp; Nora, Emil
- **B** &nbsp; Nora, Emil, Jonas
- **C** &nbsp; Ali, Nora, Emil, Jonas, Maja
- **D** &nbsp; Siri, Nora, Emil, Ida, Jonas
- **E** &nbsp; Jonas

### 32. Hvilket tall returnerer spørringen?

```sql
SELECT COUNT(*) FROM elever
WHERE klasse = '2ST' OR poeng > 60;
```

- **A** &nbsp; 4
- **B** &nbsp; 5
- **C** &nbsp; 6
- **D** &nbsp; 7
- **E** &nbsp; 2

### 33. Hvilke av WHERE-betingelsene under gjør at spørringen `SELECT * FROM elever WHERE ...` returnerer nøyaktig **2** rader?

> ▶ **Flere enn ett svar er riktig.** Kryss av for alle riktige.

- **A** &nbsp; `klasse = '2IT' AND alder = 17`
- **B** &nbsp; `etternavn = 'Hansen' OR etternavn = 'Lie'`
- **C** &nbsp; `alder = 16`
- **D** &nbsp; `poeng > 60 AND poeng < 75`
- **E** &nbsp; `klasse = '2ST' OR alder = 18`

### 34. Hvilke fornavn returnerer spørringen?

```sql
SELECT fornavn FROM elever
WHERE klasse = '2IT' AND (alder = 16 OR poeng > 70);
```

- **A** &nbsp; Siri, Nora, Ida, Jonas
- **B** &nbsp; Siri
- **C** &nbsp; Jonas
- **D** &nbsp; Siri, Ida, Jonas
- **E** &nbsp; Siri, Jonas

### 35. Samme spørring som i forrige oppgave, men **uten parentes**. Hvilke fornavn returneres nå? (Husk: AND regnes ut før OR.)

```sql
SELECT fornavn FROM elever
WHERE klasse = '2IT' AND alder = 16 OR poeng > 70;
```

- **A** &nbsp; Siri, Jonas
- **B** &nbsp; Siri, Nora, Jonas
- **C** &nbsp; Nora, Jonas
- **D** &nbsp; Siri
- **E** &nbsp; Siri, Ida, Nora, Jonas

### 36. Vi vil finne alle elever i 2ST som har **under 50** poeng **eller over 70** poeng. Hvilke WHERE-betingelser gir riktig svar?

> ▶ **Flere enn ett svar er riktig.** Kryss av for alle riktige.

- **A** &nbsp; `WHERE klasse = '2ST' AND (poeng < 50 OR poeng > 70)`
- **B** &nbsp; `WHERE klasse = '2ST' AND poeng < 50 OR poeng > 70`
- **C** &nbsp; `WHERE klasse = '2ST' OR poeng < 50 AND poeng > 70`
- **D** &nbsp; `WHERE klasse = '2ST' AND poeng < 50 AND poeng > 70`
- **E** &nbsp; `WHERE (klasse = '2ST' AND poeng < 50) OR (klasse = '2ST' AND poeng > 70)`

### 37. Hvilket tall returnerer spørringen? (`<>` betyr «ikke lik».)

```sql
SELECT COUNT(*) FROM elever
WHERE klasse <> '2IT' AND alder <> 17;
```

- **A** &nbsp; 4
- **B** &nbsp; 2
- **C** &nbsp; 6
- **D** &nbsp; 3
- **E** &nbsp; 1

### 38. Vi vil finne elever som har fra og med 45 til og med 62 poeng. Poeng er alltid hele tall. Hvilke betingelser gir riktig resultat?

> ▶ **Flere enn ett svar er riktig.** Kryss av for alle riktige.

- **A** &nbsp; `WHERE poeng > 45 AND poeng < 62`
- **B** &nbsp; `WHERE poeng >= 45 AND poeng <= 62`
- **C** &nbsp; `WHERE poeng >= 45 OR poeng <= 62`
- **D** &nbsp; `WHERE poeng >= 45 AND poeng < 63`
- **E** &nbsp; `WHERE poeng => 45 AND poeng =< 62`

### 39. Hvilket fornavn returnerer spørringen?

```sql
SELECT fornavn FROM elever
WHERE klasse = '2ST'
ORDER BY poeng DESC
LIMIT 1;
```

- **A** &nbsp; Tor
- **B** &nbsp; Jonas
- **C** &nbsp; Ida
- **D** &nbsp; Maja
- **E** &nbsp; Nora

### 40. Hvor mange rader returnerer spørringen? (`%` betyr «hva som helst, null eller flere tegn».)

```sql
SELECT fornavn, etternavn FROM elever
WHERE etternavn LIKE 'L%' OR fornavn LIKE '%a';
```

- **A** &nbsp; 2
- **B** &nbsp; 3
- **C** &nbsp; 4
- **D** &nbsp; 5
- **E** &nbsp; 6

### 41. Hvilket tall returnerer spørringen?

```sql
SELECT AVG(poeng) FROM elever
WHERE klasse = '2IT';
```

- **A** &nbsp; 45
- **B** &nbsp; 60.5
- **C** &nbsp; 62
- **D** &nbsp; 242
- **E** &nbsp; 55

### 42. Hva blir resultatet av spørringen?

```sql
SELECT klasse, COUNT(*) FROM elever
WHERE poeng >= 50
GROUP BY klasse;
```

- **A** &nbsp; 2IT | 4   og   2ST | 4
- **B** &nbsp; 2IT | 2   og   2ST | 3
- **C** &nbsp; Én rad: 5
- **D** &nbsp; 2IT | 3   og   2ST | 2
- **E** &nbsp; Det blir en feilmelding

### 43. Hvor mange rader blir endret av setningen?

```sql
UPDATE elever SET poeng = poeng + 5
WHERE klasse = '2ST' AND poeng < 50;
```

- **A** &nbsp; 3
- **B** &nbsp; 1
- **C** &nbsp; 4
- **D** &nbsp; 2
- **E** &nbsp; 8

### 44. Hvilke påstander om DELETE og DROP TABLE er riktige?

> ▶ **Flere enn ett svar er riktig.** Kryss av for alle riktige.

- **A** &nbsp; `DROP TABLE elever;` fjerner tabellen med både struktur og data
- **B** &nbsp; `DELETE FROM elever;` fjerner alle radene, men beholder tabellen
- **C** &nbsp; `DROP TABLE` kan brukes med WHERE for å slette enkeltrader
- **D** &nbsp; `DELETE` med WHERE sletter bare radene som oppfyller betingelsen
- **E** &nbsp; `DELETE FROM` brukes for å fjerne kolonner fra tabellen

---

## Svarark

Skriv X for svaret ditt. \* = flere enn ett svar er riktig.

| Nr. | A | B | C | D | E | &nbsp; | Nr. | A | B | C | D | E |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1** | ☐ | ☐ | ☐ | ☐ | ☐ | | **23** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **2** | ☐ | ☐ | ☐ | ☐ | ☐ | | **24** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **3 \*** | ☐ | ☐ | ☐ | ☐ | ☐ | | **25 \*** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **4** | ☐ | ☐ | ☐ | ☐ | ☐ | | **26** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **5 \*** | ☐ | ☐ | ☐ | ☐ | ☐ | | **27** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **6** | ☐ | ☐ | ☐ | ☐ | ☐ | | **28** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **7** | ☐ | ☐ | ☐ | ☐ | ☐ | | **29** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **8** | ☐ | ☐ | ☐ | ☐ | ☐ | | **30** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **9** | ☐ | ☐ | ☐ | ☐ | ☐ | | **31** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **10** | ☐ | ☐ | ☐ | ☐ | ☐ | | **32** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **11** | ☐ | ☐ | ☐ | ☐ | ☐ | | **33 \*** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **12** | ☐ | ☐ | ☐ | ☐ | ☐ | | **34** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **13 \*** | ☐ | ☐ | ☐ | ☐ | ☐ | | **35** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **14** | ☐ | ☐ | ☐ | ☐ | ☐ | | **36 \*** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **15** | ☐ | ☐ | ☐ | ☐ | ☐ | | **37** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **16** | ☐ | ☐ | ☐ | ☐ | ☐ | | **38 \*** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **17** | ☐ | ☐ | ☐ | ☐ | ☐ | | **39** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **18** | ☐ | ☐ | ☐ | ☐ | ☐ | | **40** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **19** | ☐ | ☐ | ☐ | ☐ | ☐ | | **41** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **20** | ☐ | ☐ | ☐ | ☐ | ☐ | | **42** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **21 \*** | ☐ | ☐ | ☐ | ☐ | ☐ | | **43** | ☐ | ☐ | ☐ | ☐ | ☐ |
| **22** | ☐ | ☐ | ☐ | ☐ | ☐ | | **44 \*** | ☐ | ☐ | ☐ | ☐ | ☐ |

**Poeng JavaScript:** ______ &nbsp; **Poeng SQL:** ______ &nbsp; **Sum (av 44):** ______
