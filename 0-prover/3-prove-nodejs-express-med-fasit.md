# Prøve: Node.js og Express – med fasit

Kino-oppgaven og klassechatten · 40 flervalgsspørsmål

Hvert spørsmål har fem alternativer, A til E, og bare ett av dem er riktig. Under hvert spørsmål står det riktige svaret og en kort forklaring.

## Innhold

- [Del 1: Express og ruter](#del-1-express-og-ruter) (spørsmål 1–6)
- [Del 2: Forstå koden](#del-2-forstå-koden) (spørsmål 7–14)
- [Del 3: Finn feilen](#del-3-finn-feilen) (spørsmål 15–25)
- [Del 4: Rekkefølge og algoritmer](#del-4-rekkefølge-og-algoritmer) (spørsmål 26–31)
- [Del 5: Frontend og backend](#del-5-frontend-og-backend) (spørsmål 32–40)

## Del 1: Express og ruter

---

**1.** Hva gjør denne linjen i `app.js`?

```javascript
app.use(express.static("public"));
```

- **A** Den lager mappa `public` hvis den ikke finnes.
- **B** Den sender filer fra mappa `public` når nettleseren ber om dem.
- **C** Den gjør at `app.js` bare kan importere filer fra `public`.
- **D** Den starter serveren på port 3000.
- **E** Den sender `index.html` for alle adresser som ikke finnes.

> **Riktig svar: B** – Den sender filer fra mappa `public` når nettleseren ber om dem.
>
> `express.static` sender filer som finnes i mappa når adressen passer med filnavnet.

---

**2.** Kino-appen har filen `public/om.html` og bruker `express.static("public")`. Tenk deg at ruten `app.get("/om", ...)` er fjernet. Hvilken adresse viser fortsatt `om.html`?

- **A** `/public/om.html`
- **B** `/om`
- **C** `/public/om`
- **D** `/om.html`
- **E** `/static/om.html`

> **Riktig svar: D** – `/om.html`
>
> Adressen er filnavnet. Mappenavnet `public` er ikke en del av adressen.

---

**3.** I kino-appen står 404-ruten helt nederst i `app.js`. Hvorfor?

```javascript
app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: "public" });
});
```

- **A** Express sjekker rutene ovenfra og ned, og 404-ruten passer på alle adresser.
- **B** `app.use` må alltid stå etter `app.listen`.
- **C** Statuskode 404 kan bare sendes etter at serveren har startet.
- **D** `404.html` må lastes sist fordi den er den største filen.
- **E** Det spiller ingen rolle hvor den står.

> **Riktig svar: A** – Express sjekker rutene ovenfra og ned, og 404-ruten passer på alle adresser.
>
> `app.use` uten adresse fanger alle forespørsler. Står den først, får alle sidene 404.

---

**4.** Denne ruten gir feilen *path must be absolute or specify root to res.sendFile*. Hva er riktig retting?

```javascript
app.get("/om", (req, res) => {
  res.sendFile("om.html");
});
```

- **A** `res.send("om.html");`
- **B** `res.sendFile("public/om");`
- **C** `res.sendFile(om.html, { root: "public" });`
- **D** `res.json("om.html", { root: "public" });`
- **E** `res.sendFile("om.html", { root: "public" });`

> **Riktig svar: E** – `res.sendFile("om.html", { root: "public" });`
>
> `sendFile` må vite hvilken mappe filen ligger i. `root` sier det. I C mangler anførselstegnene rundt filnavnet.

---

**5.** Kino-appen har ruten `app.get("/filmer/:id", ...)`. Nettleseren ber om `/filmer/4`. Hva er `req.params.id`?

- **A** Tallet `4`
- **B** Teksten `":id"`
- **C** Teksten `"4"`
- **D** `undefined`
- **E** Objektet `{ id: 4 }`

> **Riktig svar: C** – Teksten `"4"`
>
> Alt i `req.params` er tekst. Derfor bruker kino-appen `Number(req.params.id)`.

---

**6.** Kino-appen har ruten `app.get("/billett/:id/:voksne/:barn", ...)`. Hvilken adresse passer **ikke** med ruten?

- **A** `/billett/3/2`
- **B** `/billett/3/2/1`
- **C** `/billett/1/0/0`
- **D** `/billett/abc/x/y`
- **E** `/billett/10/1/9`

> **Riktig svar: A** – `/billett/3/2`
>
> Ruten krever tre deler etter `/billett`. `/billett/abc/x/y` passer med ruten, men gir ugyldige tall.

[Til toppen](#prøve-nodejs-og-express--med-fasit)

## Del 2: Forstå koden

---

**7.** Hva skrives ut?

```javascript
const a = "2";
const b = "3";
console.log(a + b);
```

- **A** `5`
- **B** `NaN`
- **C** `23`
- **D** `a + b`
- **E** Ingenting, koden gir en feilmelding.

> **Riktig svar: C** – `23`
>
> Begge er tekst, så `+` setter dem sammen i stedet for å legge sammen.

---

**8.** Hva vises når du besøker `/pluss/to/3`?

```javascript
app.get("/pluss/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send(`Svaret er ${a + b}`);
});
```

- **A** Svaret er 3
- **B** Svaret er to3
- **C** Svaret er 5
- **D** 404-siden
- **E** Svaret er NaN

> **Riktig svar: E** – Svaret er NaN
>
> Ruten passer, men `Number("to")` blir `NaN`, og `NaN + 3` er også `NaN`.

---

**9.** Hva inneholder `liste` etter at koden har kjørt?

```javascript
const filmer = [{ tittel: "Romreisen" }, { tittel: "Siste ferje" }];
let liste = "";

filmer.forEach((film) => {
  liste += `<li>${film.tittel}</li>`;
});
```

- **A** `<li>Siste ferje</li>`
- **B** `<li>Romreisen</li><li>Siste ferje</li>`
- **C** `<li>Romreisen</li>`
- **D** `<li>Romreisen,Siste ferje</li>`
- **E** En tom tekst, fordi `liste` er deklarert med `let`.

> **Riktig svar: B** – `<li>Romreisen</li><li>Siste ferje</li>`
>
> `forEach` går gjennom begge filmene, og `+=` legger en ny `<li>` bakerst hver gang.

---

**10.** Hvor mange `<li>`-elementer inneholder `tider` etter at koden har kjørt?

```javascript
const visninger = [
  { filmId: 1, dag: "onsdag", tid: "17:00" },
  { filmId: 2, dag: "fredag", tid: "16:00" },
  { filmId: 1, dag: "lørdag", tid: "14:00" },
  { filmId: 2, dag: "lørdag", tid: "12:00" },
  { filmId: 2, dag: "søndag", tid: "12:00" },
];

let tider = "";
visninger.forEach((v) => {
  if (v.filmId === 2) {
    tider += `<li>${v.dag} kl. ${v.tid}</li>`;
  }
});
```

- **A** 0
- **B** 1
- **C** 2
- **D** 3
- **E** 5

> **Riktig svar: D** – 3
>
> Tre av visningene har `filmId` 2: fredag, lørdag og søndag.

---

**11.** Hva skrives ut?

```javascript
function visLengde(minutter) {
  const timer = Math.floor(minutter / 60);
  const min = minutter % 60;
  return `${timer} t ${min} min`;
}

console.log(visLengde(98));
```

- **A** `1,63 t`
- **B** `1 t 63 min`
- **C** `1 t 38 min`
- **D** `2 t 38 min`
- **E** `98 t 0 min`

> **Riktig svar: C** – `1 t 38 min`
>
> `Math.floor(98 / 60)` er 1, og `98 % 60` er resten, 38.

---

**12.** Filmene i kino-appen har id 1 til 5. Hva skjer når nettleseren ber om `/filmer/99`?

```javascript
app.get("/filmer/:id", (req, res) => {
  const film = filmer.find((f) => f.id === Number(req.params.id));

  if (!film) {
    return res.status(404).sendFile("404.html", { root: "public" });
  }
  // ... lager siden for filmen
});
```

- **A** `find` gir `undefined`, og 404-siden sendes med statuskode 404.
- **B** `find` gir den siste filmen i arrayen, og den vises.
- **C** Serveren krasjer, fordi `film` er `undefined`.
- **D** Siden for film nummer 9 vises.
- **E** `express.static` sender `404.html` med statuskode 200.

> **Riktig svar: A** – `find` gir `undefined`, og 404-siden sendes med statuskode 404.
>
> `find` gir `undefined` når ingen passer. `!film` blir da sann, og `return` stopper resten av ruten.

---

**13.** Prisene er `{ voksen: 140, barn: 100 }`, og `voksne` og `barn` er tall. Hvilken linje regner ut riktig totalpris i billettkalkulatoren?

```javascript
export const priser = { voksen: 140, barn: 100 };
```

- **A** `const sum = (voksne + barn) * priser.voksen;`
- **B** `const sum = priser.voksen + priser.barn;`
- **C** `const sum = voksne + barn * priser.barn;`
- **D** `const sum = voksne * barn * priser.voksen;`
- **E** `const sum = voksne * priser.voksen + barn * priser.barn;`

> **Riktig svar: E** – `const sum = voksne * priser.voksen + barn * priser.barn;`
>
> For 2 voksne og 1 barn: 2 · 140 + 1 · 100 = 380 kr.

---

**14.** Kinoen selger maks 10 billetter om gangen. Hvilken `if` gir feilmelding nøyaktig når det er bestilt for mange?

- **A** `if (voksne > 10 || barn > 10)`
- **B** `if (voksne + barn > 10)`
- **C** `if (voksne + barn >= 10)`
- **D** `if (voksne + barn < 10)`
- **E** `if (voksne > 10 && barn > 10)`

> **Riktig svar: B** – `if (voksne + barn > 10)`
>
> Det er summen som teller. A slipper gjennom 6 + 6, og C stopper 10 billetter, som er lov.

[Til toppen](#prøve-nodejs-og-express--med-fasit)

## Del 3: Finn feilen

---

**15.** Hva er feilen i koden?

```javascript
app.get("/om", (req, res) => {
  res.sendFile("om.html", { root: "public" };
});
```

- **A** `res` skal være `req`.
- **B** `"om.html"` skal stå uten anførselstegn.
- **C** `=>` skal være `->`.
- **D** Det mangler en `)` etter `{ root: "public" }`.
- **E** Det mangler `return` foran `res.sendFile`.

> **Riktig svar: D** – Det mangler en `)` etter `{ root: "public" }`.
>
> Parentesen som åpner `sendFile(` blir aldri lukket. Det er en syntaksfeil.

---

**16.** Siden viser bokstavelig teksten `${film.tittel}` i stedet for filmtittelen. Hva er feilen?

```javascript
res.send("<h1>${film.tittel}</h1>");
```

- **A** `film.tittel` må stå i hakeparenteser: `[film.tittel]`.
- **B** Teksten må stå mellom backticks i stedet for vanlige anførselstegn.
- **C** Man må bruke `res.json` i stedet for `res.send`.
- **D** Dollartegnet må fjernes.
- **E** `film` må importeres på nytt inne i ruten.

> **Riktig svar: B** – Teksten må stå mellom backticks i stedet for vanlige anførselstegn.
>
> `${...}` virker bare i en template-tekst, som står mellom backticks.

---

**17.** Serveren i klassechatten krasjer første gang noen sender en melding, med feilen *TypeError: Assignment to constant variable*. Hva er feilen?

```javascript
const meldinger = [];
const nesteId = 1;

// ... inne i send-ruten:
nesteId++;
```

- **A** `meldinger.push` virker ikke på en array som er deklarert med `const`.
- **B** `nesteId` må starte på 0.
- **C** `++` virker bare på tekst.
- **D** `meldinger` mangler `export`.
- **E** `nesteId` er deklarert med `const` og kan ikke endres. Den må være `let`.

> **Riktig svar: E** – `nesteId` er deklarert med `const` og kan ikke endres. Den må være `let`.
>
> En `const` kan ikke få ny verdi. `push` endrer innholdet i arrayen, og det er lov.

---

**18.** Når du starter `app.js`, får du feilen *ERR_MODULE_NOT_FOUND: Cannot find module '.../kino/data'*. Hva er riktig retting?

```javascript
import { filmer, visninger } from "./data";
```

- **A** `filmer` og `visninger` må importeres på hver sin linje.
- **B** Krøllparentesene må fjernes.
- **C** Filnavnet må ha med `.js`: `"./data.js"`.
- **D** `./` må fjernes: `"data"`.
- **E** `data.js` må ligge inne i mappa `public`.

> **Riktig svar: C** – Filnavnet må ha med `.js`: `"./data.js"`.
>
> Med ES-moduler må filendelsen være med når du importerer en egen fil.

---

**19.** En elev skrev denne linjen i `/filmer/:id`-ruten. Nå viser alle filmsidene 404-siden, også `/filmer/2`. Hvorfor?

```javascript
const film = filmer.find((f) => f.id === req.params.id);
```

- **A** `req.params.id` er teksten `"2"`, og `"2" === 2` er `false`. Den må gjøres om med `Number()`.
- **B** `find` kan bare brukes på arrayer med tekst.
- **C** Ruten må hete `/filmer/id` uten kolon.
- **D** `f.id` må skrives `f.params.id`.
- **E** `===` må byttes ut med `=`.

> **Riktig svar: A** – `req.params.id` er teksten `"2"`, og `"2" === 2` er `false`. Den må gjøres om med `Number()`.
>
> `===` sammenligner både verdi og type. Tekst og tall er aldri like.

---

**20.** En elev skrev `=` i stedet for `+=`. Kino-appen har fem filmer. Hva viser `/filmer` nå?

```javascript
let liste = "";
filmer.forEach((film) => {
  liste = `<li>${film.tittel}</li>`;
});
```

- **A** Alle fem filmene, som før.
- **B** Bare den første filmen.
- **C** Ingen filmer.
- **D** Bare den siste filmen.
- **E** Den siste filmen fem ganger.

> **Riktig svar: D** – Bare den siste filmen.
>
> Hver runde i løkka overskriver `liste`, så bare den siste filmen blir igjen.

---

**21.** Filmene har aldersgrense 0, 6, 9, 12 og 15. Hva er feil når noen besøker `/alder/9`?

```javascript
const alder = Number(req.params.alder);
let liste = "";

filmer.forEach((film) => {
  if (film.aldersgrense < alder) {
    liste += `<li>${film.tittel}</li>`;
  }
});
```

- **A** Filmen med aldersgrense 9 mangler, fordi `<` må være `<=`.
- **B** Filmen med aldersgrense 12 blir også vist.
- **C** Ingen filmer blir vist, fordi `alder` er tekst.
- **D** Alle filmene blir vist.
- **E** Filmen med aldersgrense 0 mangler.

> **Riktig svar: A** – Filmen med aldersgrense 9 mangler, fordi `<` må være `<=`.
>
> En niåring kan se filmer med aldersgrense 9. Med `<` vises bare 0 og 6.

---

**22.** I klassechatten blir alle meldingene blå og står til høyre, også de andres. Hva er feilen i `chat.js`?

```javascript
if (m.navn = navnEl.value) {
  klasse = "meg";
}
```

- **A** `navnEl.value` er alltid tomt.
- **B** `klasse` må deklareres med `const`.
- **C** Klassen må hete `"andre"`.
- **D** `=` gir `m.navn` en ny verdi i stedet for å sammenligne. Det skal være `===`.
- **E** `if` kan ikke brukes inne i `forEach`.

> **Riktig svar: D** – `=` gir `m.navn` en ny verdi i stedet for å sammenligne. Det skal være `===`.
>
> Med `=` blir navnet ditt kopiert inn i `m.navn`. Teksten er ikke tom, så betingelsen blir alltid sann.

---

**23.** HTML-en har `<input id="tekst">`. I *Console* står feilen *TypeError: Cannot read properties of null (reading 'value')*. Hva er feilen?

```javascript
const tekstEl = document.querySelector("tekst");
// ...
console.log(tekstEl.value);
```

- **A** Feltet må hete `value` i HTML-en.
- **B** Det mangler `#` foran `tekst`, så `querySelector` finner ikke elementet.
- **C** `querySelector` virker bare på knapper.
- **D** `chat.js` må ligge i samme mappe som `app.js`.
- **E** Serveren kjører ikke.

> **Riktig svar: B** – Det mangler `#` foran `tekst`, så `querySelector` finner ikke elementet.
>
> Uten `#` leter `querySelector` etter et element som heter `<tekst>`. Det finnes ikke, så svaret er `null`.

---

**24.** Chatten henter meldingene én gang når siden åpnes, men aldri igjen. Hva er feilen?

```javascript
setInterval(hentMeldinger(), 2000);
```

- **A** `2000` må være `2`.
- **B** `setInterval` må stå inne i `hentMeldinger`.
- **C** `hentMeldinger` kan ikke være `async`.
- **D** Det må stå `setTimeout` i stedet for `setInterval`.
- **E** Parentesene gjør at `hentMeldinger` kjøres med en gang. `setInterval` skal få selve funksjonen: `setInterval(hentMeldinger, 2000)`.

> **Riktig svar: E** – Parentesene gjør at `hentMeldinger` kjøres med en gang. `setInterval` skal få selve funksjonen: `setInterval(hentMeldinger, 2000)`.
>
> `hentMeldinger()` kjører funksjonen én gang, og `setInterval` får resultatet i stedet for funksjonen.

---

**25.** Eleven har glemt `return` i `/filmer/:id`-ruten. Hva skjer når nettleseren ber om `/filmer/99`?

```javascript
if (!film) {
  res.status(404).sendFile("404.html", { root: "public" });
}

let tider = "";
visninger.forEach((v) => {
  if (v.filmId === film.id) {
    tider += `<li>${v.dag} kl. ${v.tid}</li>`;
  }
});
```

- **A** Alt virker, og 404-siden vises som før.
- **B** Siden for film 99 vises uten visninger.
- **C** Koden fortsetter etter `if`-blokken og prøver å lese `film.id`, selv om `film` er `undefined`.
- **D** Serveren sender 404-siden to ganger.
- **E** `sendFile` stopper funksjonen av seg selv.

> **Riktig svar: C** – Koden fortsetter etter `if`-blokken og prøver å lese `film.id`, selv om `film` er `undefined`.
>
> Uten `return` kjører resten av funksjonen. `film.id` gir da en feil, fordi `film` er `undefined`.

[Til toppen](#prøve-nodejs-og-express--med-fasit)

## Del 4: Rekkefølge og algoritmer

---

**26.** Linjene P til T er en liten server, men de står i feil rekkefølge. Hvilken rekkefølge virker?

```text
P  app.listen(3000);
Q  import express from "express";
R  app.get("/api/meldinger", (req, res) => res.json(meldinger));
S  const app = express();
T  const meldinger = [];
```

- **A** Q, R, S, T, P
- **B** Q, P, R, S, T
- **C** Q, T, R, S, P
- **D** R, S, Q, T, P
- **E** Q, S, T, R, P

> **Riktig svar: E** – Q, S, T, R, P
>
> `app` må lages med `express()` før den brukes i `app.get` og `app.listen`. Ellers kommer feilen *Cannot access 'app' before initialization*.

---

**27.** Koden skal finne filmen med kortest lengde. Hva må stå på streken?

```javascript
let kortest = ________;

filmer.forEach((film) => {
  if (film.lengde < kortest.lengde) {
    kortest = film;
  }
});
```

- **A** `0`
- **B** `""`
- **C** `filmer[0]`
- **D** `filmer.length`
- **E** `null`

> **Riktig svar: C** – `filmer[0]`
>
> Vi starter med den første filmen og bytter når vi finner en kortere. Med `0` blir ingen film valgt, og med `null` krasjer koden.

---

**28.** Ruten `/program/:dag` skal vise programmet for én dag, sortert etter klokkeslett. Hvilken rekkefølge av stegene er riktig?

```text
1  Send siden med res.send.
2  Sorter visningene etter klokkeslett.
3  Hent dagen fra req.params.dag.
4  For hver visning: finn filmen med find, og lag en <li>.
5  Plukk ut visningene som har riktig dag.
```

- **A** 3, 5, 2, 4, 1
- **B** 3, 4, 5, 2, 1
- **C** 5, 3, 2, 4, 1
- **D** 3, 5, 4, 1, 2
- **E** 1, 3, 5, 2, 4

> **Riktig svar: A** – 3, 5, 2, 4, 1
>
> Først dagen, så de riktige visningene, så sortering, så HTML, og til slutt sendes siden.

---

**29.** Kari skriver «Hei» og klikker på *Send* i klassechatten. I hvilken rekkefølge skjer dette?

```text
1  Serveren legger meldingen i arrayen og svarer.
2  sendMelding sender en forespørsel til /api/send/Kari/Hei.
3  hentMeldinger henter alle meldingene og viser dem på nytt.
4  Kari klikker på Send, og click-hendelsen kjører sendMelding.
5  Skrivefeltet tømmes.
```

- **A** 4, 1, 2, 5, 3
- **B** 2, 4, 1, 3, 5
- **C** 4, 2, 5, 1, 3
- **D** 4, 2, 1, 5, 3
- **E** 4, 3, 2, 1, 5

> **Riktig svar: D** – 4, 2, 1, 5, 3
>
> `sendMelding` venter (`await`) på svaret fra serveren før feltet tømmes og meldingene hentes på nytt.

---

**30.** Chatten har sett alle meldinger til og med id 7, og spør `/api/meldinger/etter/7`. Den skal bare få de nye meldingene. Hva må stå på streken?

```javascript
app.get("/api/meldinger/etter/:id", (req, res) => {
  const etter = Number(req.params.id);
  const nye = [];

  meldinger.forEach((m) => {
    if (________) {
      nye.push(m);
    }
  });

  res.json(nye);
});
```

- **A** `m.id >= etter`
- **B** `m.id > etter`
- **C** `m.id < etter`
- **D** `m.id === etter`
- **E** `m > etter`

> **Riktig svar: B** – `m.id > etter`
>
> Bare meldinger med id større enn 7 er nye. Med `>=` kommer melding 7 én gang til.

---

**31.** En visning er skrevet `"9:30"` i stedet for `"09:30"`. Hvilken rekkefølge får tidene?

```javascript
const tider = ["18:00", "9:30", "12:00"];
tider.sort((a, b) => a.localeCompare(b));
```

- **A** 9:30, 12:00, 18:00
- **B** 18:00, 12:00, 9:30
- **C** 9:30, 18:00, 12:00
- **D** 12:00, 18:00, 9:30
- **E** Uendret: 18:00, 9:30, 12:00

> **Riktig svar: D** – 12:00, 18:00, 9:30
>
> Tekst sammenlignes tegn for tegn. `"1"` kommer før `"9"`, så `"9:30"` havner sist. Derfor må tidene skrives med to sifre.

[Til toppen](#prøve-nodejs-og-express--med-fasit)

## Del 5: Frontend og backend

---

**32.** Hva gjør `svar.json()` i denne koden fra `chat.js`?

```javascript
const svar = await fetch("/api/meldinger");
const meldinger = await svar.json();
```

- **A** Den sender meldingene til serveren som JSON.
- **B** Den leser svaret fra serveren og gjør JSON-teksten om til en JavaScript-array.
- **C** Den lagrer meldingene i filen `meldinger.json`.
- **D** Den venter i to sekunder før den henter meldingene.
- **E** Den gjør om arrayen til tekst, slik at den kan vises på siden.

> **Riktig svar: B** – Den leser svaret fra serveren og gjør JSON-teksten om til en JavaScript-array.
>
> Serveren sender JSON som tekst. `json()` gjør teksten om til data vi kan bruke i JavaScript.

---

**33.** Rolle 1 kjører serveren. Rolle 2 åpner `http://localhost:3000` på sin egen maskin og får ikke kontakt. Hvorfor?

- **A** Port 3000 kan bare brukes av én maskin om gangen.
- **B** Rolle 2 må kjøre `npm install` først.
- **C** `localhost` virker bare på wifi.
- **D** Serveren må startes med `npm start` i stedet for `npm run dev`.
- **E** `localhost` betyr «denne maskinen», så rolle 2 prøver å koble til sin egen maskin.

> **Riktig svar: E** – `localhost` betyr «denne maskinen», så rolle 2 prøver å koble til sin egen maskin.
>
> De andre må bruke IP-adressen til maskinen som kjører serveren.

---

**34.** Kari sender «Skal vi møtes?». I chatten står det «Skal vi møtes», uten spørsmålstegn. Hvorfor?

```javascript
await fetch(`/api/send/${navnEl.value}/${tekstEl.value}`);
```

- **A** `?` i en adresse starter en query string, så resten av teksten havner ikke i `req.params.tekst`.
- **B** Serveren fjerner alle spesialtegn for sikkerhets skyld.
- **C** `res.json` kan ikke sende spørsmålstegn.
- **D** `innerHTML` fjerner spørsmålstegn.
- **E** Nettleseren tillater ikke spørsmålstegn i tekstfelt.

> **Riktig svar: A** – `?` i en adresse starter en query string, så resten av teksten havner ikke i `req.params.tekst`.
>
> Alt etter `?` blir en query string. Meldingen må gjøres om med `encodeURIComponent` før den legges i adressen.

---

**35.** Hva gjør `encodeURIComponent(tekst)` når den brukes i adressen til `fetch`?

- **A** Den krypterer meldingen, slik at ingen andre kan lese den.
- **B** Den gjør om teksten til JSON.
- **C** Den gjør om tegn som `/`, `?` og `#`, slik at teksten trygt kan stå som én del av en adresse.
- **D** Den fjerner alle tegn som ikke er bokstaver.
- **E** Den sjekker at meldingen ikke er tom.

> **Riktig svar: C** – Den gjør om tegn som `/`, `?` og `#`, slik at teksten trygt kan stå som én del av en adresse.
>
> Tegnene blir kodet, for eksempel `/` til `%2F`. Express gjør dem om tilbake i `req.params`.

---

**36.** Noen sender meldingen `<b>Hei</b>`, og den vises med fet skrift hos alle. Hvorfor, og hva er en god løsning?

- **A** Serveren gjør teksten om til HTML. Løsning: bruk `res.send` i stedet for `res.json`.
- **B** JSON kan ikke inneholde `<` og `>`. Løsning: fjern dem på serveren.
- **C** `innerHTML` tolker teksten som HTML. Løsning: lag elementet med `createElement` og sett teksten med `textContent`.
- **D** `fetch` gjør teksten om til HTML. Løsning: bruk `await` to ganger.
- **E** Det er ikke et problem. Det er en funksjon i chatten.

> **Riktig svar: C** – `innerHTML` tolker teksten som HTML. Løsning: lag elementet med `createElement` og sett teksten med `textContent`.
>
> Med `innerHTML` kan andre legge inn HTML, og i verste fall kode, hos alle. `textContent` viser alltid ren tekst.

---

**37.** Rolle 1 lagrer en liten endring i `app.js`, og alle meldingene i chatten forsvinner. Hvorfor?

- **A** Nettleserne sletter meldingene når de oppdaterer siden.
- **B** `res.json` sletter arrayen etter at den er sendt.
- **C** Git sletter meldingene når filen endres.
- **D** `setInterval` tømmer arrayen hvert andre sekund.
- **E** `node --watch` starter serveren på nytt, og meldingene lå bare i en array i minnet.

> **Riktig svar: E** – `node --watch` starter serveren på nytt, og meldingene lå bare i en array i minnet.
>
> Når serveren starter på nytt, blir `const meldinger = []` kjørt igjen. Løsningen er å lagre meldingene i en fil eller en database.

---

**38.** Teamet sjekker i `chat.js` at meldingen ikke er tom før den sendes. Hvorfor bør serveren også sjekke?

- **A** Hvem som helst kan sende en forespørsel direkte til `/api/send/...` uten å gå via `chat.js`.
- **B** `chat.js` kjører ikke før serveren har startet.
- **C** `trim()` virker bare på serveren.
- **D** Serveren kan ikke sende status 400 hvis klienten har sjekket først.
- **E** Det trenger den ikke. Én sjekk i `chat.js` er nok.

> **Riktig svar: A** – Hvem som helst kan sende en forespørsel direkte til `/api/send/...` uten å gå via `chat.js`.
>
> Serveren kan ikke stole på nettleseren. Adressen kan skrives rett inn i adressefeltet, slik test 9 i klassechatten viste.

---

**39.** Klassechatten sender meldinger med `GET /api/send/:navn/:tekst`. Hvilken HTTP-metode er laget for å sende data som skal lagres på serveren?

- **A** `FETCH`
- **B** `POST`
- **C** `SEND`
- **D** `JSON`
- **E** `LISTEN`

> **Riktig svar: B** – `POST`
>
> `GET` er for å hente data. `POST` sender data i selve forespørselen i stedet for i adressen.

---

**40.** I `klient.js` (Node) skrev dere `fetch("http://localhost:3000/api/filmer")`. I `chat.js` står bare `fetch("/api/meldinger")`. Hvorfor virker den korte adressen i `chat.js`?

- **A** `chat.js` kjører på serveren, så den trenger ingen adresse.
- **B** `/api/` er en spesiell mappe som alle nettlesere kjenner.
- **C** `fetch` legger alltid til `localhost:3000` automatisk.
- **D** Nettleseren bruker samme server som siden ble hentet fra, og fullfører adressen selv.
- **E** Den korte adressen virker bare på Mac.

> **Riktig svar: D** – Nettleseren bruker samme server som siden ble hentet fra, og fullfører adressen selv.
>
> `chat.js` kjører i nettleseren, som vet hvilken server siden kom fra. Derfor virker den også på `http://IP-ADRESSEN:3000`.

[Til toppen](#prøve-nodejs-og-express--med-fasit)
