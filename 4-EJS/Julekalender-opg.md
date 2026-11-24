# Oppgave 5: Julekalender 🎄

Du skal lage en julekalender med 24 luker. Bak hver luke er det en vits, en fakta eller en aktivitet. En luke skal bare kunne åpnes når den dagen har kommet. Ingen juks!

**Steg 1–3** får du med ferdig kode. Skriv koden inn selv (ikke bare kopier), og sjekk at du skjønner hver linje.
**Steg 4–8** løser du på egen hånd.

Slik ser prosjektet ut når du er ferdig:

```
julekalender/
├── app.js
├── data.js
├── package.json
├── public/
│   └── style.css
└── views/
    ├── index.ejs
    ├── kalender.ejs
    ├── luke.ejs
    └── type.ejs
```

---

## Steg 1: Sett opp prosjektet og lag forsiden ✅ (ferdig kode)

Opprett mappen `julekalender`, åpne den i terminalen og kjør:

```bash
npm init -y
npm install express ejs
```

Åpne `package.json` og legg til `"type": "module",` slik at du kan bruke `import`.

**app.js**
```js
import express from "express";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const iDag = new Date();
  const julaften = new Date(iDag.getFullYear(), 11, 24); // måned 11 = desember
  const msPerDag = 1000 * 60 * 60 * 24;
  const dagerIgjen = Math.ceil((julaften - iDag) / msPerDag);

  res.render("index", { dagerIgjen: dagerIgjen });
});

app.listen(PORT, () => {
  console.log(`Serveren kjører på http://localhost:${PORT}`);
});
```

**views/index.ejs**
```html
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <title>Julekalender</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <h1>🎄 Julekalender 2026</h1>

  <% if (dagerIgjen > 0) { %>
    <p>Det er <strong><%= dagerIgjen %></strong> dager igjen til julaften!</p>
  <% } else { %>
    <p>God jul! 🎅</p>
  <% } %>

  <p><a href="/kalender">Gå til kalenderen</a></p>
</body>
</html>
```

**public/style.css**
```css
body {
  font-family: sans-serif;
  background: #0b3d2e;
  color: white;
  text-align: center;
}

a {
  color: #ffd700;
}

.kalender {
  display: grid;
  grid-template-columns: repeat(6, 80px);
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.luke {
  display: block;
  padding: 25px 0;
  background: #b3001b;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
}

.luke:hover {
  background: #e0002a;
}
```

Start med `node app.js` og gå til http://localhost:3000. Du skal se hvor mange dager det er igjen til julaften.

> **Lurt å vite:** I JavaScript starter månedene på 0. Januar er 0 og desember er 11.

---

## Steg 2: Lag datafilen ✅ (ferdig kode)

**data.js**
```js
export const luker = [
  { nr: 1, type: "fakta", tekst: "Første søndag i advent var 29. november i år. Da tennes det første lyset i adventsstaken." },
  { nr: 2, type: "vits", tekst: "Hvorfor blander programmerere sammen halloween og jul? Fordi Oct 31 = Dec 25." },
  { nr: 3, type: "aktivitet", tekst: "Send en hyggelig melding til noen du ikke har snakket med på lenge." },
  { nr: 4, type: "fakta", tekst: "Den norske julenissen stammer fra fjøsnissen, som passet på dyrene på gården." },
  { nr: 5, type: "vits", tekst: "Hva sier nissen når han går baklengs? Oh oh oh!" },
  { nr: 6, type: "aktivitet", tekst: "Gå en tur ute i mørket – husk refleks!" },
  { nr: 7, type: "fakta", tekst: "Oslo har sendt et juletre til Trafalgar Square i London hvert år siden 1947." },
  { nr: 8, type: "vits", tekst: "Hva får du hvis du krysser en snømann med en vampyr? Frostbitt." },
  { nr: 9, type: "aktivitet", tekst: "Skriv ønskelisten din – og ta med én ting som ikke koster penger." },
  { nr: 10, type: "fakta", tekst: "I Tromsø er sola borte fra slutten av november til midten av januar. Det kalles mørketid." },
  { nr: 11, type: "vits", tekst: "Hvorfor er nissen så god på arrays? Han går gjennom listen to ganger." },
  { nr: 12, type: "aktivitet", tekst: "Klipp ut en snøkrystall av papir og heng den i vinduet." },
  { nr: 13, type: "fakta", tekst: "I dag er det Luciadagen. Lussekatter er tradisjonen!" },
  { nr: 14, type: "vits", tekst: "Hva sa juletreet til julepynten? Slutt å henge rundt!" },
  { nr: 15, type: "aktivitet", tekst: "Hjelp til med noe hjemme uten at du blir spurt." },
  { nr: 16, type: "fakta", tekst: "Ribbe og pinnekjøtt er de vanligste julemiddagene i Norge." },
  { nr: 17, type: "vits", tekst: "Hvorfor har snømannen alltid oversikt? Han har is i magen." },
  { nr: 18, type: "aktivitet", tekst: "Bak pepperkaker og del med noen." },
  { nr: 19, type: "fakta", tekst: "Juletre i stua ble vanlig i Norge på 1800-tallet." },
  { nr: 20, type: "vits", tekst: "Hva er nissens favorittprogrammeringsspråk? Ruby – fordi den er rød." },
  { nr: 21, type: "fakta", tekst: "Rundt 21. desember er det vintersolverv – årets korteste dag. Nå blir dagene lengre igjen!" },
  { nr: 22, type: "aktivitet", tekst: "Lag en spilleliste med favoritt-julesangene dine." },
  { nr: 23, type: "vits", tekst: "Hvorfor tok nissen med seg en stige på butikken? Prisene var så høye." },
  { nr: 24, type: "aktivitet", tekst: "God jul! Ønsk alle du møter god jul i dag. 🎅" },
];
```

Legg til denne linjen øverst i **app.js**, rett under `import express ...`:
```js
import { luker } from "./data.js";
```

Du kan gjerne bytte ut tekstene med egne vitser og fakta, men behold `nr` og `type`.

---

## Steg 3: Vis kalenderen ✅ (ferdig kode)

Legg til denne ruten i **app.js** (over `app.listen`):
```js
app.get("/kalender", (req, res) => {
  res.render("kalender", { luker: luker });
});
```

**views/kalender.ejs**
```html
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <title>Kalender</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <h1>🎄 Julekalender 2026</h1>

  <div class="kalender">
    <% luker.forEach(luke => { %>
      <a class="luke" href="/luke/<%= luke.nr %>"><%= luke.nr %></a>
    <% }) %>
  </div>

  <p><a href="/">Tilbake til forsiden</a></p>
</body>
</html>
```

Gå til http://localhost:3000/kalender. Nå skal du se 24 røde luker. Lukene går ikke an å åpne ennå, for ruten `/luke/...` finnes ikke. Den lager du i steg 4.

---

## Steg 4: Åpne en luke ✏️

Lag ruten `/luke/:nr` og malen `luke.ejs`.

- `/luke/5` skal vise «Luke 5», typen («Dagens vits») og teksten.
- Hvis luka ikke finnes, for eksempel `/luke/99` eller `/luke/hei`, skal siden vise «Denne luka finnes ikke».
- Legg til en lenke tilbake til kalenderen.

*Tips:* `req.params.nr` er en **tekst**, men `nr` i datafilen er et **tall**. Bruk `Number(...)`.
*Tips:* `luker.find(l => l.nr === nr)` gir deg luka med riktig nummer, eller `undefined` hvis den ikke finnes.

---

## Steg 5: Ingen juks! 🔒 ✏️

En luke skal bare kunne åpnes når dagen har kommet. Luke 7 kan åpnes fra 7. desember.

- Hvis luka ikke kan åpnes ennå, skal siden vise: «Tålmodighet! Luke 15 kan åpnes om 5 dager.»
- Hvis det ikke er desember, skal alle lukene være låst.

*Tips:* `iDag.getMonth()` gir måneden (desember = 11), og `iDag.getDate()` gir datoen i måneden.

*Tips:* Det er ikke desember ennå, så for å teste kan du late som det er en annen dato:
```js
const iDag = new Date(2026, 11, 10); // later som det er 10. desember
```
Husk å bytte tilbake til `new Date()` når du er ferdig!

---

## Steg 6: Vis hvilke luker som er åpne ✏️

Oppdater `/kalender` slik at lukene får ulik farge:

- Låste luker skal være grå.
- Luker som allerede kan åpnes, skal være grønne.
- **Dagens luke** skal skille seg ut, for eksempel gul med en kant rundt.

*Tips:* Send med dagens dato til malen, og gi hver luke en ekstra CSS-klasse, for eksempel `class="luke laast"`. Lag klassene i `style.css`.

---

## Steg 7: Forrige og neste luke ✏️

På siden til hver luke skal det være lenkene «← Forrige luke» og «Neste luke →».

- Luke 1 skal **ikke** ha en «Forrige»-lenke.
- Luke 24 skal **ikke** ha en «Neste»-lenke.

---

## Steg 8: Sorter etter type ✏️

Lag ruten `/type/:type` og malen `type.ejs`.

- `/type/vits` skal vise alle **åpnede** luker av typen «vits» i en tabell med kolonnene *Luke* og *Tekst*. Lukenummeret skal være en lenke til luka.
- Vis hvor mange luker som vises, for eksempel «Antall: 3».
- Hvis det ikke finnes noen, for eksempel `/type/tull`, skal siden vise «Ingen åpnede luker av denne typen ennå.»
- Legg til lenker på kalendersiden: *Vis bare: fakta | vitser | aktiviteter*.

*Tips:* `luker.filter(...)` gir en ny array med bare de elementene du vil ha. Du kan sjekke to ting samtidig med `&&`.

---

### ⭐ Ekstra (hvis du har tid)
- Vis på forsiden hvor mange luker som er åpnet, og hvor mange som er igjen.
- Bruk `<%- include("header") %>` slik at du slipper å skrive `<head>`-delen i alle malene.
- Legg til en `bilde`-egenskap på noen av lukene, og vis bildet hvis det finnes.