# Express – Ruter, parametere og HTML-sider

Oct 13, 2026 · @Mufasa

I dette heftet lærer du å lage ruter i Express, servere ferdige HTML-sider fra mappa `public` og lage ruter som tar imot verdier fra adressen med `req.params`.

## Eksempel 1: Ruter i Express

En *rute* bestemmer hva serveren svarer når noen ber om en bestemt adresse. `app.get("/om", ...)` betyr: «når nettleseren ber om `/om`, kjør denne funksjonen».

Lag en ny mappe `eksempel1` og kjør:

```bash
npm init -y
npm pkg set type=module
npm install express
npm pkg set scripts.dev="node --watch app.js"
```

Lag `app.js`:

```javascript
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Forside</h1><p>Velkommen!</p>");
});

app.get("/om", (req, res) => {
  res.send("<h1>Om oss</h1><p>Vi lærer Express.</p>");
});

app.get("/kontakt", (req, res) => {
  res.send("<h1>Kontakt</h1><p>Send oss en e-post.</p>");
});

app.get("/api/info", (req, res) => {
  res.json({ fag: "Utvikling", elever: 28, sted: "Klasserommet" });
});

// Må stå sist: tar imot alle adresser som ingen av rutene over passet til
app.use((req, res) => {
  res.status(404).send("<h1>404</h1><p>Siden finnes ikke.</p>");
});

app.listen(3000, () => {
  console.log("Serveren kjører på http://localhost:3000");
});
```

Start med `npm run dev` og besøk `/`, `/om`, `/kontakt`, `/api/info` og en adresse som ikke finnes.

Slik leser du en rute:

- `app.get` betyr at ruten svarer når nettleseren *henter* en side.
- `"/om"` er stien. Den må starte med `/`.
- `(req, res) => { ... }` er funksjonen som kjøres. `req` er forespørselen, og `res` er svaret.
- `res.send` sender tekst eller HTML, og `res.json` sender data som JSON.

Express sjekker rutene ovenfra og ned og bruker den første som passer. Derfor må 404-ruten stå helt nederst.

**Prøv selv:**

1. Legg til ruten `/hobbyer` med en liste over tre hobbyer.
2. Flytt 404-ruten (`app.use`) til toppen av filen. Hva skjer med alle sidene? Flytt den tilbake.
3. Endre `/api/info` slik at den også sender med navnet ditt.

## Eksempel 2: HTML-sider fra mappa public

Det blir fort rotete å skrive all HTML inne i JavaScript. I stedet kan du lage vanlige HTML-filer og CSS-filer i en egen mappe, og la Express sende dem til nettleseren. Mappa kaller vi `public`, fordi alt som ligger der kan alle se.

Lag en ny mappe `eksempel2` med Express installert, slik som i eksempel 1. Lag denne mappestrukturen:

```text
eksempel2/
├── app.js
├── package.json
└── public/
    ├── index.html
    ├── om.html
    └── style.css
```

`app.js` trenger bare én ny linje:

```javascript
import express from "express";

const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Serveren kjører på http://localhost:3000");
});
```

`public/index.html`:

```html
<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8">
  <title>Forside</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <nav>
    <a href="/">Hjem</a>
    <a href="/om.html">Om oss</a>
  </nav>
  <h1>Velkommen!</h1>
  <p>Denne siden ligger i mappa public.</p>
</body>
</html>
```

`public/om.html` er en kopi av `index.html`, med ny tittel, overskrift og tekst:

```html
<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8">
  <title>Om oss</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <nav>
    <a href="/">Hjem</a>
    <a href="/om.html">Om oss</a>
  </nav>
  <h1>Om oss</h1>
  <p>Vi er en klasse som lærer Express.</p>
</body>
</html>
```

`public/style.css`:

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1rem;
  background: #f4f7fb;
}

nav a {
  margin-right: 1rem;
}
```

Start serveren og besøk `/`, `/om.html` og `/style.css`.

`express.static("public")` betyr: «hvis nettleseren ber om en fil som finnes i `public`, send den». Adressen er filnavnet, så `public/om.html` blir `/om.html`. Filen `index.html` er spesiell: den sendes når noen ber om `/`.

Legg merke til at ordet `public` ikke er med i adressen. Du skriver `/style.css`, ikke `/public/style.css`.

**Prøv selv:**

1. Lag `public/kontakt.html` og legg den til i menyen på begge sidene. Trenger du å endre `app.js`?
2. Besøk `/om` uten `.html`. Hva skjer? (Det fikser vi i neste eksempel.)
3. Legg et bilde i `public` og vis det på forsiden med `<img src="/bilde.jpg" alt="...">`.

## Eksempel 3: Penere adresser og egen 404-side

Adresser som `/om.html` virker, men `/om` er penere og enklere å huske. Med `res.sendFile` kan en rute sende en bestemt HTML-fil, uansett hva adressen heter.

Lag `eksempel3` med samme filer som i eksempel 2, og legg til `kontakt.html` og `404.html` i `public`:

```text
eksempel3/
├── app.js
├── package.json
└── public/
    ├── index.html
    ├── om.html
    ├── kontakt.html
    ├── 404.html
    └── style.css
```

I `404.html` skriver du for eksempel `<h1>Oi! Siden finnes ikke</h1>` og en lenke tilbake til forsiden.

`app.js`:

```javascript
import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/om", (req, res) => {
  res.sendFile("om.html", { root: "public" });
});

app.get("/kontakt", (req, res) => {
  res.sendFile("kontakt.html", { root: "public" });
});

// Egen 404-side, må stå sist
app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: "public" });
});

app.listen(3000, () => {
  console.log("Serveren kjører på http://localhost:3000");
});
```

Endre menyen i alle HTML-filene slik at lenkene går til `/om` og `/kontakt` i stedet for `/om.html` og `/kontakt.html`.

- `res.sendFile("om.html", { root: "public" })` betyr: «finn filen `om.html` i mappa `public` og send den».
- `root` forteller hvilken mappe filen ligger i. Uten den får du feilen *path must be absolute or specify root to res.sendFile*.
- `res.status(404)` gjør at nettleseren får riktig statuskode, selv om du sender en fin HTML-side.

`express.static` gjør fortsatt jobben for `/`, `style.css` og bilder, så de trenger ingen egen rute.

**Prøv selv:**

1. Fjern `{ root: "public" }` fra `/om`-ruten og besøk siden. Les feilmeldingen, og sett den tilbake.
2. Besøk `/finnesikke`, og sjekk statuskoden i *Network*-fanen (F12).
3. Lag en ny side `public/galleri.html` med ruten `/galleri`.

## Eksempel 4: Ruter med req.params

Noen ganger skal én rute håndtere mange adresser, for eksempel `/hei/Kari`, `/hei/Ola` og `/hei/Amir`. Da skriver du en *parameter* i ruten med kolon foran: `/hei/:navn`. Det som står på den plassen i adressen, finner du i `req.params.navn`.

Lag `eksempel4` med Express og en `public`-mappe, og lag `app.js`:

```javascript
import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/hei/:navn", (req, res) => {
  const navn = req.params.navn;
  res.send(`<h1>Hei, ${navn}!</h1>`);
});

app.get("/pluss/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send(`<p>${a} + ${b} = ${a + b}</p>`);
});

const dyr = [
  { id: "katt", navn: "Katt", fakta: "Katter sover 12–16 timer i døgnet." },
  { id: "hund", navn: "Hund", fakta: "Hunder har en luktesans som er mange tusen ganger bedre enn vår." },
  { id: "ugle", navn: "Ugle", fakta: "Ugler kan snu hodet omtrent 270 grader." },
];

app.get("/dyr", (req, res) => {
  const lenker = dyr.map((d) => `<li><a href="/dyr/${d.id}">${d.navn}</a></li>`).join("");
  res.send(`<h1>Dyr</h1><ul>${lenker}</ul>`);
});

app.get("/dyr/:id", (req, res) => {
  const etDyr = dyr.find((d) => d.id === req.params.id);

  if (!etDyr) {
    return res.status(404).send(`<h1>Fant ikke dyret «${req.params.id}»</h1><a href="/dyr">Tilbake</a>`);
  }

  res.send(`<h1>${etDyr.navn}</h1><p>${etDyr.fakta}</p><a href="/dyr">Tilbake til alle dyr</a>`);
});

app.listen(3000, () => {
  console.log("Serveren kjører på http://localhost:3000");
});
```

Lag også `public/index.html` med lenker til `/hei/Kari`, `/pluss/2/3`, `/dyr` og `/dyr/ugle`, slik at du kan klikke deg rundt.

Besøk også `/dyr/elefant`.

- `:navn`, `:a`, `:b` og `:id` er plassholdere. Navnet bak kolonet bestemmer hva det heter i `req.params`.
- Alt i `req.params` er tekst. Derfor bruker vi `Number()` før vi regner.
- `/dyr` viser en liste med lenker, og `/dyr/:id` viser ett dyr. Dette mønsteret med en liste og en detaljside kommer du til å bruke mye.
- `find` gir `undefined` hvis ingen dyr passer. Da sender vi 404, og `return` gjør at resten av funksjonen ikke kjøres.

**Prøv selv:**

1. Fjern `Number()` fra `/pluss`-ruten og besøk `/pluss/2/3`. Hvorfor blir svaret `23`?
2. Besøk `/hei` uten navn. Hvorfor passer ikke ruten?
3. Legg til to nye dyr i arrayen. Dukker de opp på `/dyr` uten at du endrer noe annet?
4. Lag ruten `/gange/:a/:b`.

## Oppgave 1–5: Små oppgaver

Disse oppgavene kan du løse på papir eller i hodet. Etterpå kan du teste svarene dine ved å kjøre koden.

### Oppgave 1: Finn feilen

Hver kodebit har én feil. Skriv hva som skjer når du kjører koden eller besøker siden, og hvordan du retter feilen.

**a)**

```javascript
app.get("/om", (req, res) => {
  req.send("<h1>Om oss</h1>");
});
```

**b)** Du besøker `/hei/Kari`, men siden viser «Hei, undefined!».

```javascript
app.get("/hei/:navn", (req, res) => {
  res.send(`Hei, ${req.params.name}!`);
});
```

**c)** Filene ligger i mappa `public`, men forsiden viser «Cannot GET /».

```javascript
app.use(express.static("pubic"));
```

**d)**

```javascript
app.get("/kontakt", (req, res) => {
  res.sendFile("kontakt.html");
});
```

**e)** Alle sidene viser «Fant ikke siden», også `/om`.

```javascript
app.use((req, res) => {
  res.status(404).send("Fant ikke siden");
});

app.get("/om", (req, res) => {
  res.send("<h1>Om oss</h1>");
});
```

### Oppgave 2: Sett i riktig rekkefølge

**a)** Linjene under er en hel Express-app, men de står i feil rekkefølge. Skriv bokstavene i riktig rekkefølge.

```javascript
A  app.listen(3000, () => console.log("Kjører på http://localhost:3000"));
B  import express from "express";
C  app.use((req, res) => res.status(404).send("Fant ikke siden"));
D  const app = express();
E  app.get("/hei/:navn", (req, res) => res.send(`Hei, ${req.params.navn}!`));
F  app.use(express.static("public"));
```

To av linjene kan bytte plass uten at appen slutter å virke. Hvilke, og hvorfor?

**b)** Disse linjene er én rute. Sett dem i riktig rekkefølge.

```javascript
A    res.send(`<h1>${a} * ${b} = ${a * b}</h1>`);
B  app.get("/gange/:a/:b", (req, res) => {
C  });
D    const b = Number(req.params.b);
E    const a = Number(req.params.a);
```

### Oppgave 3: Hva viser nettleseren?

Mappa `public` inneholder `index.html` og `om.html`. Les koden, og fyll inn tabellen **før** du tester.

```javascript
import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/hei/:navn", (req, res) => {
  res.send(`Hei, ${req.params.navn}!`);
});

app.get("/pluss/:a/:b", (req, res) => {
  res.send(`Svaret er ${req.params.a + req.params.b}`);
});

app.get("/om", (req, res) => {
  res.send("Dette er om-ruten");
});

app.use((req, res) => {
  res.status(404).send("Fant ikke siden");
});

app.listen(3000);
```

| Adresse | Hva vises? | Statuskode |
| --- | --- | --- |
| `/` |  |  |
| `/hei/Kari` |  |  |
| `/hei` |  |  |
| `/hei/Kari/Nordmann` |  |  |
| `/pluss/2/3` |  |  |
| `/om` |  |  |
| `/om.html` |  |  |

Hvordan endrer du `/pluss`-ruten slik at svaret blir riktig?

### Oppgave 4: Fyll inn det som mangler

Fyll inn ordene som mangler på strekene. Velg fra ordbanken. Noen ord brukes mer enn én gang.

**Ordbank:** `express` · `static` · `sendFile` · `root` · `params` · `tittel` · `status` · `listen`

```javascript
import ______ from "express";

const app = ______();

app.use(express.______("public"));

app.get("/om", (req, res) => {
  res.______("om.html", { ______: "public" });
});

app.get("/film/:______", (req, res) => {
  const tittel = req.______.tittel;
  res.send(`<h1>Du valgte ${tittel}</h1>`);
});

app.use((req, res) => {
  res.______(404).sendFile("404.html", { root: "public" });
});

app.______(3000);
```

### Oppgave 5: Koble adresse til fil

Et prosjekt har denne mappestrukturen og denne `app.js`:

```text
prosjekt/
├── app.js
├── public/
│   ├── index.html
│   ├── om.html
│   ├── bilder/
│   │   └── logo.png
│   └── css/
│       └── style.css
└── sider/
    └── hemmelig.html
```

```javascript
app.use(express.static("public"));

app.get("/info", (req, res) => {
  res.sendFile("om.html", { root: "public" });
});
```

Svar på spørsmålene:

1. Hvilken adresse viser `index.html`? Finnes det mer enn én?
2. Hvilke to adresser viser `om.html`?
3. Hvilken adresse viser logoen?
4. Skriv `<link>`-taggen som henter CSS-filen inn i `index.html`.
5. Kan nettleseren vise `sider/hemmelig.html`? Hvorfor eller hvorfor ikke?
6. Hva skjer hvis du besøker `/public/om.html`?

## Oppgave 6–10: Lag din egen app

Nå skal du lage egne apper, slik som i eksemplene. Lag en ny mappe med Express installert for hver oppgave, og start med `npm run dev`. Bruk eksemplene som hjelp.

### Oppgave 6: Statisk nettside

Lag en nettside om deg selv, en hobby eller noe du liker. Alle sidene skal være HTML-filer i `public`, og `app.js` skal bare bruke `express.static`.

- Minst tre sider: `index.html`, `om.html` og en side du velger selv
- En meny på alle sidene med lenker til de andre
- Én felles `style.css` som alle sidene bruker
- Minst ett bilde i en egen mappe `public/bilder/`

Sjekk at alle lenkene virker, og at stilen vises på alle sidene.

### Oppgave 7: Penere adresser og egen 404-side

Bygg videre på oppgave 6:

1. Lag ruter med `res.sendFile` slik at sidene kan besøkes uten `.html`, for eksempel `/om` i stedet for `/om.html`.
2. Endre lenkene i menyen til de nye adressene.
3. Lag `public/404.html` med samme meny og stil som resten av siden, og en lenke tilbake til forsiden.
4. Vis 404-siden med statuskode 404 for alle adresser som ikke finnes.

Sjekk statuskoden i *Network*-fanen (F12) for en side som finnes og en som ikke finnes.

### Oppgave 8: Regneruter med parametere

Lag en app med disse rutene:

| Rute | Eksempel | Viser |
| --- | --- | --- |
| `/hei/:navn` | `/hei/Kari` | Hei, Kari! |
| `/alder/:aar` | `/alder/2009` | Du blir 17 år i år |
| `/gange/:a/:b` | `/gange/6/7` | 6 · 7 = 42 |
| `/kvadrat/:tall` | `/kvadrat/9` | 9 i andre er 81 |

- Regn ut årstallet med `new Date().getFullYear()`.
- Hvis noen skriver noe som ikke er et tall, for eksempel `/gange/seks/7`, skal siden gi en forståelig feilmelding i stedet for `NaN`. Hint: `Number.isNaN()`.
- Lag `public/index.html` med lenker til eksempler på alle rutene, også ett med feil.

### Oppgave 9: Solsystemet

Lag en app om planetene med en listeside og en side for hver planet, slik som dyrene i eksempel 4.

Lag en array med alle de åtte planetene. Hver planet er et objekt:

```javascript
{ id: "mars", navn: "Mars", avstand: 228, omlop: "687 dager" }
```

`avstand` er avstanden fra sola i millioner km, og `omlop` er hvor lang tid planeten bruker rundt sola. Slå opp tallene selv.

- `public/index.html` er forsiden, med en lenke til `/planeter`.
- `/planeter` viser alle planetene som lenker.
- `/planeter/:id` viser fakta om én planet, for eksempel `/planeter/mars`.
- Hvis planeten ikke finnes, for eksempel `/planeter/pluto`, skal siden si det, med statuskode 404.
- Lag en egen `style.css` med et romtema.

**Utfordring:**

- La `/planeter/Mars` og `/planeter/MARS` virke like godt som `/planeter/mars`. Hint: `toLowerCase()`.
- Vis lenker til forrige og neste planet på hver planetside. Merkur skal ikke ha noen forrige, og Neptun skal ikke ha noen neste. Hint: `indexOf`.
- Lag `/sammenlign/:a/:b`, som viser hvilken av to planeter som er nærmest sola og hvor stor forskjellen er, for eksempel `/sammenlign/jorda/mars`.
- Lag `/api/planeter/:id`, som gir én planet som JSON, og `{ "feil": "Fant ikke planeten" }` med status 404 hvis den ikke finnes.

### Oppgave 10: Bokhylla

Lag en app for klassens bokhylle. Den skal bruke alt du har lært i dette heftet: statiske sider, `sendFile`, ruter med parametere og en egen 404-side.

Lag en array med minst seks bøker. Bruk tall som `id`:

```javascript
{ id: 1, tittel: "Sofies verden", forfatter: "Jostein Gaarder", aar: 1991, sjanger: "roman" }
```

Appen skal ha:

| Adresse | Hva | Hvordan |
| --- | --- | --- |
| `/` | Forside | `public/index.html` |
| `/om` | Om bokhylla | `public/om.html` med `sendFile` |
| `/boker` | Liste over alle bøkene, med lenker | Rute som lager HTML fra arrayen |
| `/boker/:id` | Tittel, forfatter, år og sjanger for én bok | Rute med `req.params` |
| `/sjanger/:sjanger` | Alle bøker i én sjanger, for eksempel `/sjanger/krim` | Rute med `filter` |
| Alt annet | 404-side | `public/404.html` med `sendFile` |

Husk at `req.params.id` er tekst, mens `id` i arrayen er et tall. Hint: `Number(req.params.id)`.

**Utfordring:**

- Vis antall bøker i overskriften på `/boker`.
- Vis 404-siden også når en bok eller sjanger ikke finnes.
- Gjør sjangeren på hver bokside til en lenke til `/sjanger/...`.
- Vis en liste over alle sjangrene nederst på `/boker`, uten at samme sjanger står flere ganger. Hint: `new Set()`.
- Lag `/forfatter/:navn`, som viser alle bøkene av én forfatter. Hva skjer med mellomrom i navnet i adressen?
- Lag `/api/boker` og `/api/boker/:id`, som gir bøkene som JSON.
- Last prosjektet opp til GitHub med en `README.md` som viser alle adressene appen har.
