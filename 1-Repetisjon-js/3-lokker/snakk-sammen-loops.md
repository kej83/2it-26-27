# Kodejakten: Hva er feilen?

Jobb sammen i par. Se på kodebitene nedenfor. Noen av dem har syntaksfeil (koden krasjer eller vil ikke kjøre), mens andre har logiske feil (koden gjør ikke det vi ønsker).

**Deres oppgave:**

1. Les koden nøye sammen.
2. Diskuter og finn ut **hva koden egentlig prøver å gjøre** (hva var hensikten?).
3. Finn feilen og forklar **hvorfor** koden oppfører seg uventet eller krasjer.
4. Skriv ned hvordan koden bør rettes slik at den fungerer som tenkt.

---

### Oppgave 1

```javascript
let teller = 0;

while (teller < 5) {
  if (teller = 5) {
    console.log("Nå er vi på 5!");
  }
  teller++;
}

```

* **Hva var hensikten med koden?**
* **Hva skjer når du kjører den?**
* **Hvorfor oppstår feilen, og hvordan fikser dere den?**

---

### Oppgave 2

En spillutvikler vil at spilleren skal få 10 poeng per runde i 3 runder, og til slutt vise den totale poengsummen.

```javascript
let totalt = 0;

for (let i = 1; i <= 3; i++) {
  let totalt = i * 10;
}

console.log("Totalt antall poeng:", totalt);

```

* **Hva skrives ut i konsollen til slutt?**
* **Hvorfor ble ikke resultatet 30?** *(Hint: Se nøye på variablene)*
* **Hvordan retter dere koden?**

---

### Oppgave 3

I dette spillet har spilleren 3 liv. Programmet skal skrive ut en melding for hvert liv spilleren bruker, helt til det er 0 liv igjen.

```javascript
let liv = 3;

while (liv >= 0) {
  console.log("Spilleren prøver på nytt! Liv igjen:", liv);
  liv--;
}

```

* **Hvor mange ganger kjører løkka?**
* **Er dette rett i forhold til at spilleren har 3 liv?**
* **Hva må endres i betingelsen for at løkka skal kjøre nøyaktig 3 ganger?**

---

### Oppgave 4

Dette programmet skal sjekke et svar fra brukeren. Det skal gi en feilmelding dersom svaret **hverken** er `"ja"` **eller** `"jo"`.

```javascript
let svar = "ja";

while (svar !== "ja" || svar !== "jo") {
  console.log("Ugyldig svar!");
  break; // Avbryter så koden ikke låser seg under testing
}

```

* **Hva skjer selv om `svar` er satt til `"ja"`?**
* **Hvorfor blir betingelsen inne i `while(...)` sann uansett hva `svar` inneholder?**
* **Hvilken logisk operator (`&&` eller `||`) bør egentlig brukes her?**

---

### Oppgave 5

Hva var planen med denne koden, og hva skjer egentlig?

```javascript
let poeng = 0;

for (let i = 0; i < 3; i++)
  poeng += 10;
  console.log("Hallo!");

console.log("Sluttpoeng:", poeng);

```

* **Hvor mange ganger skrives `"Hallo!"` ut i konsollen?**
* **Hvorfor blir det slik når koden ser ut som den har et fint innrykk?**
* **Hva mangler i koden for at `console.log("Hallo!");` skal tilhøre løkka?**