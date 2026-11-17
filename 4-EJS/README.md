# EJS – kort referanse

EJS-maler er HTML-filer med «hull» som serveren fyller inn før siden sendes. Nettleseren får bare ferdig HTML.

## Oppsett

```javascript
// npm install express ejs
import express from "express";

const app = express();
app.set("view engine", "ejs");      // malene er .ejs-filer i mappa views/
app.use(express.static("public"));  // CSS og bilder ligger i public/
```

## Fra server til mal: res.render

`res.render("bok", { ... })` finner `views/bok.ejs`, fyller inn verdiene og sender HTML. Navnene i objektet blir variabler i malen.

```javascript
app.get("/om", (req, res) => {
  res.render("om");                                    // uten data: malen er bare HTML
});

app.get("/boker/:id", (req, res) => {
  const bok = boker.find((b) => b.id === Number(req.params.id));
  res.render("bok", { tittel: bok.tittel, bok: bok }); // med data
});
```

| I server.js | I malen |
| --- | --- |
| `res.render("hei", { navn: "Kari" })` | `<%= navn %>` gir `Kari` |
| `res.render("bok", { bok: bok })` | `<%= bok.tittel %>` gir tittelen |
| `res.render("liste", { boker: boker })` | `<% boker.forEach(...) %>` gir én rad per bok |

Malen kan bare bruke det som er sendt med. Mangler en verdi, får du feilen *tittel is not defined*. Er navn og verdi like, kan `{ bok: bok }` skrives `{ bok }`.

## Taggene

| Tagg | Gjør | Eksempel |
| --- | --- | --- |
| `<%= %>` | Skriver ut verdien, og gjør `<` og `>` ufarlige | `<h1><%= bok.tittel %></h1>` |
| `<% %>` | Kjører JavaScript uten å skrive ut noe | `<% if (antall > 0) { %>` |
| `<%- %>` | Skriver ut HTML som den er. Brukes til `include` | `<%- include("partials/header") %>` |
| `<%# %>` | Kommentar som ikke vises på siden | `<%# TODO: vis forfatter %>` |

Bruk `<%=` til all tekst fra brukere og data. En tagg kan også stå i et attributt: `<a href="/boker/<%= bok.id %>">`.

## if og else

Krøllparentesene står i egne `<% %>`-tagger. HTML-en imellom vises bare når betingelsen er sann.

```html
<% if (treff.length === 0) { %>
  <p>Fant ingen bøker.</p>
<% } else { %>
  <p>Fant <%= treff.length %> bøker.</p>
<% } %>
```

## Løkker med forEach

HTML-en mellom start og slutt gjentas én gang per element.

```html
<ul>
  <% boker.forEach((bok) => { %>
    <li><a href="/boker/<%= bok.id %>"><%= bok.tittel %></a> av <%= bok.forfatter %></li>
  <% }); %>
</ul>
```

## include: felles deler

Felles HTML som `<head>`, meny og bunntekst ligger i `views/partials/`. Stien er relativ til malen.

```html
<%- include("partials/header") %>                  <!-- uten data: ser alt fra res.render -->

<% boker.forEach((bok) => { %>
  <%- include("partials/bokkort", { bok: bok }) %> <!-- med data: lokale variabler må sendes med -->
<% }); %>

<%- include("partials/footer") %>
```

## Typiske feil

| Du ser | Årsak |
| --- | --- |
| *tittel is not defined* | Verdien er ikke sendt med i `res.render` |
| *Failed to lookup view "index"* | Mappa heter ikke `views`, eller filnavnet er feil |
| *Unexpected token … while compiling ejs* | Mangler `<% } %>` eller `<% }); %>` |
| Headeren vises som tekst | `include` er skrevet med `<%=`, ikke `<%-` |
| Verdien vises ikke | Skrevet `<% bok.tittel %>` uten `=` |
| `"17" + 1` blir `171` | `req.params` er tekst. Bruk `Number()` |