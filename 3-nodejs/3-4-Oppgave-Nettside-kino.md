# Oppgave: Nettside for Stjerneskudd kino

Oct 27, 2026 · @Mufasa

Stjerneskudd kino er en liten, tenkt kino som trenger en ny nettside. Du skal lage den med Express, med alt du har lært om ruter, HTML-sider i `public` og `req.params`.

## Oppdraget

Daglig leder ved kinoen har sendt deg denne e-posten:

> Hei! Vi trenger en enkel nettside der folk kan se hvilke filmer vi viser, når de går, og hvilken aldersgrense de har. Det må også stå litt om kinoen, hvor vi ligger og hva billettene koster. Vi bytter filmer hver uke, så det må være lett å legge inn nye. Hilsen Silje, Stjerneskudd kino

I del 1 følger du stegene og lager en app med disse adressene:

| Adresse | Viser |
| --- | --- |
| `/` | Forsiden |
| `/om` | Om kinoen, adresse og priser |
| `/filmer` | Alle filmene som vises nå |
| `/filmer/:id` | Én film, med beskrivelse og visningstider |
| Alt annet | En egen 404-side |

I del 2 bygger du videre på den samme appen med flere funksjoner kinoen ønsker seg.

Filmene og visningene ligger i arrayer i en egen fil. Da kan kinoen legge inn nye filmer uten å røre resten av koden.

## Del 1: Steg for steg

### Steg 1: Lag prosjektet

Lag en ny mappe `kino`, åpne den i VS Code og kjør:

```bash
npm init -y
npm pkg set type=module
npm install express
npm pkg set scripts.dev="node --watch app.js"
```

Lag denne mappestrukturen. Filene kan være tomme foreløpig:

```text
kino/
├── app.js
├── data.js
├── package.json
└── public/
    ├── index.html
    ├── om.html
    ├── 404.html
    └── style.css
```

### Steg 2: De faste sidene

Forsiden, om-siden og 404-siden endres sjelden, så de er vanlige HTML-filer i `public`.

`public/index.html`:

```html
<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8">
  <title>Stjerneskudd kino</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <nav>
    <a href="/">Hjem</a>
    <a href="/filmer">Filmer</a>
    <a href="/om">Om kinoen</a>
  </nav>
  <h1>Stjerneskudd kino</h1>
  <p>Velkommen til den lille kinoen med det store lerretet!</p>
  <p><a href="/filmer">Se hvilke filmer vi viser denne uka</a></p>
</body>
</html>
```

`public/om.html` har samme `<head>` og `<nav>` som forsiden. Bytt ut tittelen og innholdet i `<body>` med dette:

```html
<h1>Om kinoen</h1>
<p>Stjerneskudd kino har én sal med 120 seter. Vi har vist film siden 1962.</p>
<p>Du finner oss i Storgata 12, rett ved busstasjonen.</p>
<h2>Billettpriser</h2>
<table>
  <tr><th>Billett</th><th>Pris</th></tr>
  <tr><td>Voksen</td><td>140 kr</td></tr>
  <tr><td>Barn (under 16 år)</td><td>100 kr</td></tr>
  <tr><td>Honnør</td><td>110 kr</td></tr>
</table>
```

`public/404.html` har også samme `<head>` og `<nav>`, med dette innholdet:

```html
<h1>Denne filmen går ikke her</h1>
<p>Vi fant ikke siden du lette etter. <a href="/filmer">Se alle filmene</a>.</p>
```

`public/style.css`:

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 42rem;
  margin: 2rem auto;
  padding: 0 1rem;
  background: #14112b;
  color: #f2f0ff;
}

a {
  color: #ffd166;
}

nav a {
  margin-right: 1rem;
}

table {
  border-collapse: collapse;
}

td, th {
  border: 1px solid #555;
  padding: 0.3rem 0.8rem;
  text-align: left;
}
```

### Steg 3: Start serveren med de faste sidene

Skriv dette i `app.js`:

```javascript
import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/om", (req, res) => {
  res.sendFile("om.html", { root: "public" });
});

// Rutene for filmene kommer her, i steg 5 og 6

app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: "public" });
});

app.listen(3000, () => {
  console.log("Serveren kjører på http://localhost:3000");
});
```

Start med `npm run dev` og sjekk:

- [ ] Forsiden vises på `/`, med mørk bakgrunn og gule lenker.
- [ ] `/om` viser prislista.
- [ ] `/finnesikke` viser 404-siden, med statuskode 404 i *Network*-fanen.
- [ ] `/filmer` viser også 404-siden foreløpig. Det fikser du i neste del.

### Steg 4: Filmene og visningene i data.js

Filmene og visningene ligger i hver sin array. Hver visning har en `filmId` som viser hvilken film den hører til. Slik blir det lett å legge inn nye visninger uten å skrive filmen på nytt.

`data.js`:

```javascript
export const filmer = [
  { id: 1, tittel: "Romreisen", sjanger: "Eventyr", aldersgrense: 6, lengde: 98,
    beskrivelse: "To søsken bygger en rakett i garasjen og havner på en planet der ingenting er som hjemme." },
  { id: 2, tittel: "Skogens hemmelighet", sjanger: "Animasjon", aldersgrense: 0, lengde: 82,
    beskrivelse: "En liten rev må finne veien hjem før vinteren kommer." },
  { id: 3, tittel: "Fotballsommeren", sjanger: "Komedie", aldersgrense: 9, lengde: 101,
    beskrivelse: "Et lag som aldri har vunnet en kamp, får en ny trener med svært rare metoder." },
  { id: 4, tittel: "Siste ferje", sjanger: "Drama", aldersgrense: 12, lengde: 115,
    beskrivelse: "Den siste ferja blir innstilt, og sju fremmede blir sittende fast sammen på kaia en hel natt." },
  { id: 5, tittel: "Mørket under isen", sjanger: "Thriller", aldersgrense: 15, lengde: 108,
    beskrivelse: "En forskerstasjon på Svalbard mister kontakten med fastlandet, og noe beveger seg under isen." },
];

export const visninger = [
  { filmId: 1, dag: "onsdag", tid: "17:00" },
  { filmId: 4, dag: "onsdag", tid: "19:30" },
  { filmId: 2, dag: "fredag", tid: "16:00" },
  { filmId: 3, dag: "fredag", tid: "18:00" },
  { filmId: 5, dag: "fredag", tid: "21:00" },
  { filmId: 2, dag: "lørdag", tid: "12:00" },
  { filmId: 1, dag: "lørdag", tid: "14:00" },
  { filmId: 3, dag: "lørdag", tid: "18:00" },
  { filmId: 5, dag: "lørdag", tid: "21:00" },
  { filmId: 2, dag: "søndag", tid: "12:00" },
  { filmId: 1, dag: "søndag", tid: "15:00" },
  { filmId: 4, dag: "søndag", tid: "18:00" },
];
```

Hent dataene inn øverst i `app.js`, rett under importen av Express:

```javascript
import { filmer, visninger } from "./data.js";
```

### Steg 5: Lista over filmer

Legg denne ruten der kommentaren for filmrutene står i `app.js`:

```javascript
app.get("/filmer", (req, res) => {
  let liste = "";

  filmer.forEach((film) => {
    liste += `<li><a href="/filmer/${film.id}">${film.tittel}</a> (${film.aldersgrense} år, ${film.lengde} min)</li>`;
  });

  res.send(`<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8">
  <title>Filmer – Stjerneskudd kino</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <nav><a href="/">Hjem</a> <a href="/filmer">Filmer</a> <a href="/om">Om kinoen</a></nav>
  <h1>Filmer denne uka</h1>
  <ul>${liste}</ul>
</body>
</html>`);
});
```

`liste` starter som en tom tekst. `forEach` går gjennom filmene én etter én, og `+=` legger til en ny `<li>` bakerst i teksten for hver film.

Gå til `/filmer`. Du skal se fem filmer, og hver tittel er en lenke. Lenkene virker ikke ennå. Det fikser du i neste steg.

Legg merke til at siden bruker samme `style.css` og samme meny som de faste sidene. Da ser hele nettsiden lik ut.

### Steg 6: En side for hver film

Legg denne ruten rett under `/filmer`-ruten:

```javascript
app.get("/filmer/:id", (req, res) => {
  const film = filmer.find((f) => f.id === Number(req.params.id));

  if (!film) {
    return res.status(404).sendFile("404.html", { root: "public" });
  }

  let tider = "";

  visninger.forEach((v) => {
    if (v.filmId === film.id) {
      tider += `<li>${v.dag} kl. ${v.tid}</li>`;
    }
  });

  res.send(`<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8">
  <title>${film.tittel} – Stjerneskudd kino</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <nav><a href="/">Hjem</a> <a href="/filmer">Filmer</a> <a href="/om">Om kinoen</a></nav>
  <h1>${film.tittel}</h1>
  <p>${film.beskrivelse}</p>
  <p>${film.sjanger} · ${film.aldersgrense} år · ${film.lengde} minutter</p>
  <h2>Visninger</h2>
  <ul>${tider}</ul>
  <p><a href="/filmer">Tilbake til alle filmene</a></p>
</body>
</html>`);
});
```

Slik virker ruten:

1. `find` leter etter filmen med riktig `id`. `req.params.id` er tekst, så vi gjør den om med `Number()`.
2. Finnes ikke filmen, sendes 404-siden, og `return` stopper resten av funksjonen.
3. `forEach` går gjennom alle visningene. `if` sjekker om visningen hører til denne filmen, og bare da legges den til i `tider`.

### Steg 7: Test og lagre

Sjekk at alt virker:

- [ ] Klikk på hver film i lista. Hver film viser beskrivelse og riktige visningstider.
- [ ] «Siste ferje» (`/filmer/4`) skal vises onsdag kl. 19:30 og søndag kl. 18:00.
- [ ] `/filmer/99` og `/filmer/abc` viser 404-siden.
- [ ] Menyen virker på alle sidene, også på filmsidene.

Lag en `.gitignore` med `node_modules/`, lagre arbeidet med Git og last det opp til GitHub:

```bash
git init
git add .
git commit -m "Kinoside med filmliste og filmsider"
```

Du har nå en fungerende kinoside. I del 2 gjør du den bedre.

## Del 2: Tilleggsoppgaver

Kinoen er fornøyd, men har flere ønsker. Hver oppgave bygger videre på appen du laget i del 1. Ta dem i rekkefølge, og lagre med Git etter hver oppgave.

### 1. Nye filmer fra Silje

Silje sender en ny e-post:

> Neste uke får vi to nye filmer. Kan du legge dem inn?

```javascript
{ id: 6, tittel: "Dragens dal", sjanger: "Fantasy", aldersgrense: 9, lengde: 112,
  beskrivelse: "En gjetergutt finner et drageegg og må gjemme det for hele landsbyen." },
{ id: 7, tittel: "Kokken fra Lofoten", sjanger: "Dokumentar", aldersgrense: 0, lengde: 76,
  beskrivelse: "Et år med en kokk som bare lager mat av det havet og fjellet gir." },
```

«Dragens dal» vises fredag kl. 18:30 og søndag kl. 13:00. «Kokken fra Lofoten» vises onsdag kl. 18:00.

Legg inn filmene og visningene i `data.js`. Sjekk at de dukker opp på `/filmer` og at filmsidene viser riktige tider. Måtte du endre noe i `app.js`? Hvorfor eller hvorfor ikke?

### 2. Penere visning

«0 år» og «112 min» ser rart ut. Endre visningen på både lista og filmsidene:

- Aldersgrense 0 skal vises som «Tillatt for alle».
- Lengden skal vises i timer og minutter, for eksempel «1 t 52 min».

Lag to funksjoner, `visAldersgrense(alder)` og `visLengde(minutter)`, og bruk dem begge steder. Hint: `Math.floor(minutter / 60)` gir timene, og `minutter % 60` gir minuttene som er igjen.

### 3. Felles layout

Nå står den samme `<head>` og `<nav>` både i `/filmer` og `/filmer/:id`. Lag en modul `layout.js` med funksjonen `side(tittel, innhold)` som lager hele HTML-siden, slik som i heftet fra økt 2. Bruk den i begge rutene.

Flytt også `visAldersgrense` og `visLengde` inn i `layout.js`, og importer dem i `app.js`.

Sjekk at sidene ser nøyaktig like ut som før. Når du senere skal legge til noe i menyen, trenger du bare å endre én fil for de dynamiske sidene.

### 4. Program for én dag

Folk vil se hva som går på en bestemt dag. Lag ruten `/program/:dag`, for eksempel `/program/fredag`:

- Vis alle visningene den dagen, sortert etter klokkeslett, med filmtittel som lenke og aldersgrense.
- Hvis det ikke er noen visninger den dagen, for eksempel `/program/mandag`, skal siden si «Ingen visninger på mandag».
- Øverst på siden skal det stå lenker til alle dagene kinoen viser film: onsdag, fredag, lørdag og søndag.
- Gjør dagene på hver filmside til lenker til programmet for den dagen.
- Legg til «Program» i menyen.

Hint: gå gjennom visningene med `forEach` og en `if`, slik som i steg 6, og bruk `find` for å finne filmen til hver visning. For å sortere tekst som "18:00" kan du bruke `sort((a, b) => a.tid.localeCompare(b.tid))`.

### 5. Hvilke filmer kan jeg se?

Lag ruten `/alder/:alder`, som viser alle filmene en person på den alderen kan se. `/alder/8` skal for eksempel vise filmene med aldersgrense 8 eller lavere.

- Gi en forståelig feilmelding hvis alderen ikke er et tall.
- Legg til lenker på forsiden, for eksempel «Jeg er 7», «Jeg er 10» og «Jeg er 13».

### 6. Billettkalkulator

Legg prisene inn i `data.js`:

```javascript
export const priser = { voksen: 140, barn: 100 };
```

Lag ruten `/billett/:id/:voksne/:barn`. `/billett/3/2/1` skal for eksempel vise hva det koster å se «Fotballsommeren» for 2 voksne og 1 barn (380 kr).

- Hvis filmen ikke finnes, skal 404-siden vises.
- Hvis antallet ikke er tall eller er mindre enn 0, skal siden gi en feilmelding.
- Man kan kjøpe maks 10 billetter om gangen.
- Legg til en lenke på hver filmside, for eksempel «Hva koster det for 2 voksne og 1 barn?».

### 7. Utfordring: API for mobilappen

Kinoen vil lage en mobilapp som skal hente programmet fra nettsiden din. Lag disse rutene, som svarer med JSON:

| Rute | Svar |
| --- | --- |
| `/api/filmer` | Alle filmene |
| `/api/filmer/:id` | Én film, med en liste over visningene til filmen. Gir `{ "feil": "Fant ikke filmen" }` med status 404 hvis den ikke finnes |
| `/api/program/:dag` | Alle visningene én dag |

Test API-et med `fetch` i en egen `klient.js`, slik du gjorde i økt 2. Skriv for eksempel ut programmet for lørdag i terminalen.

### 8. Utfordring: Hva går i dag?

Lag ruten `/i-dag`, som viser programmet for dagen i dag, og legg den til i menyen.

Hint: `new Date().getDay()` gir et tall fra 0 (søndag) til 6 (lørdag). Lag en array med ukedagene i riktig rekkefølge, og bruk tallet til å finne navnet på dagen. Med `res.redirect` kan du sende nettleseren videre til riktig side:

```javascript
res.redirect(`/program/${dag}`);
```

Hva vises på en dag kinoen ikke viser film?

Last til slutt prosjektet opp til GitHub med en `README.md` som forklarer hvordan appen startes, og som lister opp alle adressene.
