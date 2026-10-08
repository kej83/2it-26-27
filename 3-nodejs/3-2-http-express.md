# Node.js – Økt 2: Elevhefte

Oct 8, 2026 · @Mufasa

I dag lager du din første webserver. Node sender svar til nettleseren, og du ser resultatet på `http://localhost:3000`.

## Eksempel 1: Din første webserver

Når du skriver en adresse i nettleseren, sender den en *forespørsel* (request) til en server. Serveren sender tilbake et *svar* (response), for eksempel en HTML-side. Nå skal du lage en slik server selv, bare med det som er innebygd i Node.

Lag en ny mappe `eksempel1`, kjør `npm init -y` og `npm pkg set type=module`, og lag `server.js`:

```javascript
import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(`Noen ba om: ${req.method} ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Velkommen!</h1><p>Dette er min første webserver.</p>");
  } else if (req.url === "/om") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Om meg</h1><p>Jeg lærer Node.js.</p>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>404</h1><p>Siden finnes ikke.</p>");
  }
});

server.listen(3000, () => {
  console.log("Serveren kjører på http://localhost:3000");
});
```

Start serveren med `node server.js`. Terminalen blir stående og vente, fordi serveren lytter etter forespørsler. Åpne `http://localhost:3000` og `http://localhost:3000/om` i nettleseren, og se hva som skrives i terminalen.

Slik henger det sammen:

- `req` (request) er forespørselen. `req.url` er stien nettleseren ba om, for eksempel `/om`.
- `res` (response) er svaret. `writeHead` setter statuskode og type innhold, og `end` sender innholdet.
- `200` betyr «alt i orden» og `404` betyr «finnes ikke».
- `localhost` betyr «denne maskinen», og `3000` er porten serveren lytter på.

Stopp serveren med Ctrl+C. Hvis du endrer koden, må du stoppe og starte serveren på nytt for at endringen skal virke.

**Ekstraoppgaver:**

1. Legg til en side `/klokka` som viser hva klokka er. Last siden på nytt flere ganger. Hvorfor endrer klokkeslettet seg?
2. Se i terminalen: nettleseren ber ofte også om `/favicon.ico`. Hva tror du det er?
3. Fjern `; charset=utf-8` og last siden på nytt. Hva skjer med æ, ø og å? Sett det tilbake etterpå.
4. Åpne utviklerverktøyet i nettleseren (F12), gå til fanen *Network* (Nettverk) og last siden på nytt. Finn statuskoden for `/` og for en side som ikke finnes.
5. Start serveren i to terminaler samtidig. Les feilmeldingen `EADDRINUSE`. Hva betyr den, og hvordan kan du få begge til å kjøre?

## Eksempel 2: Samme server i Express

Express er en pakke som gjør det mye enklere å lage webservere. Den tar seg av mye av det du måtte gjøre for hånd i eksempel 1.

Lag en ny mappe `min-app` og kjør:

```bash
npm init -y
npm pkg set type=module
npm install express
npm pkg set scripts.start="node app.js" scripts.dev="node --watch app.js"
```

Lag `app.js`:

```javascript
import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Velkommen!</h1><p>Dette er min første Express-app.</p>");
});

app.get("/om", (req, res) => {
  res.send("<h1>Om meg</h1><p>Jeg lærer Node.js og Express.</p>");
});

app.listen(PORT, () => {
  console.log(`Serveren kjører på http://localhost:${PORT}`);
});
```

Start serveren med `npm run dev`. Med `--watch` starter serveren på nytt hver gang du lagrer en fil, så du slipper å gjøre det selv.

Sammenlign med eksempel 1:

- Hver side er en egen *rute*: `app.get("/om", ...)` betyr «når noen ber om `/om`, kjør denne funksjonen».
- `res.send` setter statuskode og `Content-Type` for deg, også `charset=utf-8`.
- Sider som ikke finnes, får automatisk svaret 404.

Fra nå av bruker du `npm run dev` hver gang du jobber med en Express-app.

**Ekstraoppgaver:**

1. Gå til `http://localhost:3000/finnesikke`. Hva viser Express, og hvilken statuskode får du i *Network*-fanen?
2. Legg til ruten `/klokka` som viser klokkeslettet. Legg merke til at du ikke trenger å starte serveren på nytt.
3. Lag en skrivefeil med vilje, for eksempel ved å fjerne en `)`, og lagre. Hva skjer i terminalen? Rett feilen og lagre igjen.
4. Legg til en rute `/terning` som viser et tilfeldig tall fra 1 til 6.
5. Legg denne koden rett etter `const app = express();`, og se i terminalen når du besøker sidene:

```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString("nb-NO")} ${req.method} ${req.url}`);
  next();
});
```

Hva skjer hvis du fjerner `next();`?

## Eksempel 3: Flere sider med felles layout

En ekte nettside har samme meny og stil på alle sidene. I stedet for å skrive den samme HTML-en på hver side, lager vi en modul med en funksjon som pakker inn innholdet. Det er det samme du gjorde med `matte.js` i forrige økt.

Lag `layout.js` i `min-app`:

```javascript
export function side(tittel, innhold) {
  return `<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8">
  <title>${tittel}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; }
    nav a { margin-right: 1rem; }
  </style>
</head>
<body>
  <nav>
    <a href="/">Hjem</a>
    <a href="/om">Om meg</a>
    <a href="/hobbyer">Hobbyer</a>
  </nav>
  <h1>${tittel}</h1>
  ${innhold}
</body>
</html>`;
}
```

Endre `app.js`:

```javascript
import express from "express";
import { side } from "./layout.js";

const app = express();

const hobbyer = ["Fotball", "Gaming", "Matlaging", "Gitar"];

app.get("/", (req, res) => {
  res.send(side("Hjem", "<p>Velkommen til nettsiden min!</p>"));
});

app.get("/om", (req, res) => {
  res.send(side("Om meg", "<p>Jeg går på videregående og lærer Express.</p>"));
});

app.get("/hobbyer", (req, res) => {
  const liste = hobbyer.map((hobby) => `<li>${hobby}</li>`).join("");
  res.send(side("Hobbyer", `<ul>${liste}</ul>`));
});

app.listen(3000, () => {
  console.log("Serveren kjører på http://localhost:3000");
});
```

Klikk deg rundt mellom sidene. Se spesielt på ruten `/hobbyer`: `map` gjør hver hobby om til en `<li>`, og `join("")` setter dem sammen til én tekst. Siden lages på serveren av data i en array, og nettleseren får bare ferdig HTML.

**Ekstraoppgaver:**

1. Lag en ny side `/kontakt` og legg den til i menyen.
2. Fjern `.join("")` og se på siden. Hvor kommer kommaene fra?
3. Skriv «Jeg har 4 hobbyer» over lista, men regn ut tallet med `hobbyer.length` i stedet for å skrive det selv.
4. Endre stilen i `layout.js`, for eksempel bakgrunnsfarge og skrifttype. Hvorfor endres alle sidene på en gang?
5. Legg til hobbyen `"<b>Slåss</b> med <i>lillebror</i>"` i arrayen. Hva skjer på siden? Tenk over hvorfor det kan være farlig hvis tekst fra brukere havner rett i HTML-en.

## Eksempel 4: Svar med JSON

En server kan svare med HTML til mennesker eller med JSON til andre programmer. Mange apper har begge deler: vanlige sider, og et *API* som andre program kan hente data fra.

Lag en ny mappe `vitser` med Express installert, slik du gjorde i eksempel 2. Lag `app.js`:

```javascript
import express from "express";

const app = express();

const vitser = [
  { id: 1, sporsmal: "Hvorfor liker programmerere mørke rom?", svar: "Fordi lys tiltrekker seg bugs." },
  { id: 2, sporsmal: "Hva sa null til åtte?", svar: "Fint belte!" },
  { id: 3, sporsmal: "Hvor mange programmerere trengs for å skifte en lyspære?", svar: "Ingen, det er et maskinvareproblem." },
];

function tilfeldigVits() {
  const i = Math.floor(Math.random() * vitser.length);
  return vitser[i];
}

// For programmer: JSON
app.get("/api/vitser", (req, res) => {
  res.json(vitser);
});

app.get("/api/vitser/tilfeldig", (req, res) => {
  res.json(tilfeldigVits());
});

// For mennesker: HTML
app.get("/vits", (req, res) => {
  const vits = tilfeldigVits();
  res.send(`<h1>${vits.sporsmal}</h1><p>${vits.svar}</p><a href="/vits">Ny vits</a>`);
});

app.listen(3000, () => {
  console.log("Serveren kjører på http://localhost:3000");
});
```

Start serveren og besøk `/api/vitser`, `/api/vitser/tilfeldig` og `/vits`. `res.json` gjør om JavaScript-objekter til JSON-tekst og sier til nettleseren at svaret er JSON.

Nå skal et annet program hente data fra serveren din. La serveren kjøre, åpne en ny terminal (klikk på + i terminalvinduet), og lag `klient.js` i samme mappe:

```javascript
// Kjør med: node klient.js  (mens serveren kjører i en annen terminal)

const svar = await fetch("http://localhost:3000/api/vitser/tilfeldig");
const vits = await svar.json();

console.log(vits.sporsmal);
console.log(vits.svar);
```

Kjør `node klient.js` noen ganger. Legg merke til `await` fra forrige økt: det tar litt tid å få svar fra serveren, så vi må vente på det.

**Ekstraoppgaver:**

1. Legg til tre egne vitser i arrayen.
2. Lag ruten `/api/antall` som svarer med `{ "antall": 3 }`, og regn ut tallet med `vitser.length`.
3. Stopp serveren og kjør `node klient.js`. Les feilmeldingen, og fang den med `try/catch` slik at klienten skriver «Fant ikke serveren. Kjører den?».
4. Lag en side for alle sidene som ikke finnes. Legg denne helt nederst, rett over `app.listen`:

```javascript
app.use((req, res) => {
  res.status(404).send("<h1>Fant ikke siden</h1><a href='/vits'>Gå til vitsene</a>");
});
```

Flytt den så til toppen av filen. Hva skjer nå, og hvorfor må den stå nederst?

5. Utfordring: sørg for at `/vits` aldri viser samme vits to ganger på rad.

## Eksempel 5: Lagre prosjektet med Git og GitHub

Git tar vare på alle versjonene av koden din, slik at du kan se hva du har endret og gå tilbake hvis noe går galt. GitHub er en nettside der du lagrer prosjektet ditt, slik at du får det på alle maskiner og kan dele det med andre. Gjør dette i mappa `min-app`.

**Første gang på en ny maskin** må du fortelle Git hvem du er:

```bash
git config --global user.name "Kari Nordmann"
git config --global user.email "kari@eksempel.no"
```

**1. Start Git i prosjektet:**

```bash
git init
git status
```

`git status` viser hvilke filer Git ser. Legg merke til at `node_modules/` er med. Den mappa vil vi ikke lagre, fordi `npm install` kan lage den på nytt.

**2. Lag filen `.gitignore`** (med punktum først) med dette innholdet:

```text
node_modules/
.env
```

Kjør `git status` igjen. Nå er `node_modules/` borte fra lista. (`.env` skal vi bruke senere til passord som aldri skal deles.)

**3. Lagre en versjon (commit):**

```bash
git add .
git commit -m "Første Express-app"
```

`git add .` velger alle endrede filer, og `git commit` lagrer dem som en versjon med en beskjed om hva du har gjort.

**4. Last opp til GitHub.** Logg inn på github.com, klikk *New repository*, kall det `min-app` og la det være tomt (ikke huk av for README). Kopier adressen GitHub viser, og kjør:

```bash
git remote add origin https://github.com/BRUKERNAVN/min-app.git
git branch -M main
git push -u origin main
```

Bytt ut `BRUKERNAVN` med ditt eget. Last siden på GitHub på nytt, så ser du filene dine der.

**Hver gang du er ferdig med noe** gjør du de samme tre stegene:

```bash
git add .
git commit -m "La til kontaktside"
git push
```

Skriv beskjeder som forteller hva du gjorde. «La til kontaktside» er bedre enn «endringer».

**Ekstraoppgaver:**

1. Kjør `git log --oneline` og se lista over versjonene dine.
2. Endre noe i `layout.js`, og kjør `git diff` før du lagrer en ny versjon. Hva viser den? Lagre endringen med en god beskjed og last den opp.
3. Lag filen `README.md` som forklarer hva appen gjør og hvordan man starter den (`npm install`, deretter `npm run dev`). Last den opp, og se hvordan den vises på GitHub.
4. Hent prosjektet til en ny mappe med `git clone` og adressen fra GitHub. Gå inn i mappa og kjør `npm run dev`. Hvorfor virker det ikke før du har kjørt `npm install`?
5. Se på en av de tidligere versjonene dine på GitHub (klikk på *commits*). Hva kan dette være nyttig til?

## Oppgaver

Oppgavene blir vanskeligere utover. Lag en egen mappe for hver oppgave, med Express installert og skriptet `dev` slik som i eksempel 2. Lagre hver oppgave med Git når du er ferdig.

### Oppgave 1: Fire ruter

Lag en Express-app med disse rutene:

| Rute | Viser |
| --- | --- |
| `/` | En overskrift og lenker til de tre andre sidene |
| `/hei` | «Hei fra Express!» |
| `/klokka` | Hva klokka er akkurat nå |
| `/terning` | Et tilfeldig tall fra 1 til 6, og en lenke «Kast igjen» |

Start appen med `npm run dev`, og sjekk at alle lenkene virker.

Hint: en lenke til en annen side i appen din skrives `<a href="/klokka">Klokka</a>`.

### Oppgave 2: Din egen nettside

Lag en personlig nettside med minst fire sider, for eksempel Hjem, Om meg, Favoritter og Kontakt.

- Lag en modul `layout.js` med en funksjon `side(tittel, innhold)` som gir alle sidene samme meny og stil.
- Én av sidene skal lages fra en array med objekter, for eksempel favorittfilmer med tittel og årstall: `{ tittel: "Interstellar", aar: 2014 }`.
- Skriv hvor mange ting det er i lista, regnet ut med `.length`.
- Gi siden din egen stil i `layout.js`.
- Last prosjektet opp til GitHub.

### Oppgave 3: Tilfeldig-API

Lag en app med et lite API som svarer med JSON:

| Rute | Svar |
| --- | --- |
| `/api/terning` | `{ "terning": 4 }` |
| `/api/mynt` | `{ "resultat": "kron" }` eller `{ "resultat": "mynt" }` |
| `/api/sitat` | Et tilfeldig sitat fra en array, for eksempel `{ "tekst": "...", "av": "..." }` |

Lag også en vanlig side `/sitat` som viser et tilfeldig sitat som HTML, med en lenke «Nytt sitat».

Lag til slutt `klient.js`, som henter `/api/terning` fem ganger med `fetch` og skriver ut hvert kast og summen:

```text
Kast 1: 4
Kast 2: 1
Kast 3: 2
Kast 4: 3
Kast 5: 2
Summen ble 12
```

Hint: lag en hjelpefunksjon `tilfeldig(liste)` som returnerer et tilfeldig element fra en array. Den kan du bruke flere steder.

### Oppgave 4: Kantinemeny

Lag en app for skolekantina. Lag modulen `data.js`, som eksporterer menyen som en array med minst seks retter:

```javascript
export const meny = [
  { navn: "Pasta bolognese", pris: 65, vegetar: false },
  { navn: "Grønnsakssuppe", pris: 45, vegetar: true },
  // ...
];
```

Appen skal ha disse rutene:

- `/meny` viser alle rettene med pris, og «(vegetar)» bak vegetarrettene
- `/meny/vegetar` viser bare vegetarrettene (bruk `filter`)
- `/meny/billigst` viser den billigste retten
- `/api/meny` gir hele menyen som JSON

Alle HTML-sidene skal ha en meny med lenker til de andre sidene.

**Utfordring:**

- Lag en egen 404-side for adresser som ikke finnes, med lenke tilbake til menyen.
- Vis gjennomsnittsprisen nederst på `/meny`. Hint: `reduce` eller en `for`-løkke.
- Flytt menyen til filen `meny.json`, og les den inn med `readFile` og `JSON.parse` fra forrige økt.
- Lag `/api/meny/vegetar` som gir vegetarrettene som JSON.
- Gå til `/meny?maks=50` og vis bare retter som koster 50 kr eller mindre. Hint: tallet finner du i `req.query.maks`, men det er en tekst, så bruk `Number()`. Hvis ingen retter passer, skal siden si det.

### Oppgave 5: Notatappen på nett

I forrige økt laget du en notatapp i terminalen. Nå skal notatene også vises på en nettside.

1. Lag en ny mappe, og kopier inn `notat.js` og `lagring.js` fra oppgave 5 i forrige økt.
2. Installer Express, og lag `app.js` som bruker `lesNotater()` fra `lagring.js`.
3. Lag ruten `/notater`, som viser alle notatene som en liste på en nettside.
4. Lag ruten `/api/notater`, som gir alle notatene som JSON.
5. La serveren kjøre. Legg til et notat fra en annen terminal med `node notat.js legg-til "Hei fra terminalen"`, og last nettsiden på nytt.

`lesNotater()` er en `async`-funksjon, så rutefunksjonen må også være `async`:

```javascript
app.get("/notater", async (req, res) => {
  const notater = await lesNotater();
  // lag HTML av notatene og send den
});
```

**Utfordring:**

- Vis antall notater i overskriften og når hvert notat ble laget. Vis det nyeste notatet øverst.
- Lag en side for hvert notat på `/notater/1`, `/notater/2` og så videre, og lenk til dem fra lista. Hint: skriv ruten som `"/notater/:id"`, og hent tallet med `Number(req.params.id)`. Bruk `find` for å finne riktig notat.
- Gi en 404-side med `res.status(404)` hvis notatet ikke finnes.
- Legg til søk: `/notater?sok=melk` skal bare vise notater som inneholder ordet. Lag gjerne et søkefelt med `<form action="/notater"><input name="sok"><button>Søk</button></form>`.
- Last prosjektet opp til GitHub med en `README.md` som forklarer hvordan appen startes.
- Tenk over: nå kan du se notatene på nettsiden, men du må fortsatt bruke terminalen for å legge til nye. Hva trengs for å kunne skrive notater rett på nettsiden?
