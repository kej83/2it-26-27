# Teamprosjekt: Klassechatten

Oct 29, 2026 · @Mufasa

I team på fire skal dere lage en enkel gruppechat som ligner på Messenger. Først bygger dere den enkleste versjonen som virker. Så tester dere den grundig, finner det som fungerer dårlig, og gjør den bedre sammen.

## Målet

En *MVP* (minimum viable product) er den enkleste versjonen av et produkt som faktisk virker. Ekte utviklingsteam lager først en MVP, lar folk teste den, og forbedrer den ut fra det de finner. Det skal dere også gjøre.

MVP-en av klassechatten skal kunne dette:

- [ ] Du skriver inn navnet ditt øverst på siden.
- [ ] Du skriver en melding nederst og trykker *Send*.
- [ ] Alle som har chatten oppe, ser meldingen innen et par sekunder.
- [ ] Dine egne meldinger vises som blå bobler til høyre, og de andres som grå bobler til venstre med navnet over.

Dette er **ikke** med i MVP-en: bilder, emojireaksjoner, innlogging, flere chatterom og lagring i database. Noen av disse kan dere legge til senere.

MVP-en dere bygger, virker, men den er ikke god. Den har flere svakheter som en ekte bruker ville oppdaget etter kort tid. I fase 5 skal dere finne dem, og i fase 6 skal dere rette dem.

## Slik henger delene sammen

&#91;embedded content: Klassechatten · fire filer, fire roller\]

Hver rolle eier sin egen fil, og fargen viser hvem som eier hva. Alle filene ligger på serveren. Nettleseren henter dem når siden åpnes, og etter det spør `chat.js` serveren etter nye meldinger hvert andre sekund.

## Fase 1: Team, roller og oppsett

### Teamet

Teamet er de fire som sitter ved maskinene på samme bordgruppe. Maskinene deres er på samme nett, så de kan snakke med hverandre.

Fordel rollene. Hver rolle eier én fil og har i tillegg ett ansvar for teamet:

| Rolle | Eier filen | Ansvar for teamet |
| --- | --- | --- |
| 1 Server | `app.js` | Lager GitHub-repoet og kjører serveren som de andre kobler seg til |
| 2 HTML | `public/index.html` | Holder feilloggen i fase 5 |
| 3 CSS | `public/style.css` | Passer på tiden og leder en kort stand-up i starten av hver økt |
| 4 Klient-JS | `public/chat.js` | Leder demoen i fase 7 |

Dere har ansvar for hver deres fil, men alle skal forstå hele chatten. Når du er ferdig med din del, forklarer du den for de andre.

### Teamavtale

Bli enige om disse punktene, og skriv dem i `README.md`:

- Hvordan gir vi beskjed til hverandre hvis noen står fast?
- Ingen endrer en annens fil uten å spørre først.
- Vi lagrer med Git og laster opp ofte, minst hver gang noe virker.
- Hva gjør vi hvis noen er borte?

### Git og GitHub

Dere jobber i ett felles repo:

1. **Rolle 1** lager repoet `klassechat` på GitHub, og legger til de andre under *Settings → Collaborators*.
2. **Rolle 1** lager prosjektet med `npm init -y`, `npm pkg set type=module`, `npm install express` og `npm pkg set scripts.dev="node --watch app.js"`, lager en `.gitignore` med `node_modules/` og tomme filer for alle fire rollene, og laster opp.
3. **Alle de andre** henter prosjektet med `git clone` og adressen til repoet, og kjører `npm install`.

Arbeidsflyten for alle:

```bash
git pull                          # hent det de andre har gjort, før du starter
git add .
git commit -m "Beskriv hva du gjorde"
git push                          # last opp
```

Siden hver rolle eier sin egen fil, kan dere jobbe samtidig uten å ødelegge for hverandre. Hvis Git likevel sier at noe kolliderer (*conflict*), løser dere det sammen.

### Nettverket

`localhost` betyr «denne maskinen». For at de andre skal kunne bruke chatten, må de bruke IP-adressen til maskinen som kjører serveren.

1. Rolle 1 finner IP-adressen sin. På Windows skriver du `ipconfig` i terminalen, og ser etter *IPv4-adresse*. På Mac skriver du `ipconfig getifaddr en0`.
2. Rolle 1 starter serveren med `npm run dev`. Hvis Windows spør om Node skal få tilgang til nettverket, svarer du ja.
3. De andre åpner `http://IP-ADRESSEN:3000` i nettleseren, for eksempel `http://10.0.12.34:3000`.

Hvis det ikke virker, kan dere prøve dette:

- Koble alle fire til skolens wifi, finn den nye IP-adressen til rolle 1, og prøv igjen.
- Hvis ingenting virker, kan hver av dere teste på egen maskin med flere nettleservinduer. Åpne `http://localhost:3000` i ett vanlig vindu og ett privat vindu, og bruk forskjellige navn. Da ser dere chatten fra to brukere samtidig.

## Fase 2: Avtalen mellom rollene

Dere skal bygge hver deres del samtidig, og delene skal passe sammen til slutt. Da må dere være enige på forhånd om hvordan delene snakker med hverandre. I ekte team kalles dette et *grensesnitt* eller en *kontrakt*.

Les avtalen høyt sammen i teamet. Alle må forstå den før dere begynner å kode. Hvis noen vil endre noe i avtalen senere, må hele teamet bli enige først.

### Rutene på serveren

Rolle 1 lager dem, og rolle 4 bruker dem.

| Rute | Hva den gjør | Svar |
| --- | --- | --- |
| `GET /api/meldinger` | Gir alle meldingene | En array med meldinger |
| `GET /api/send/:navn/:tekst` | Lagrer en ny melding, for eksempel `/api/send/Kari/Hei` | Den nye meldingen |

### En melding

En melding er et objekt med tre felt:

```javascript
{ id: 1, navn: "Kari", tekst: "Hei alle sammen!" }
```

### Id-er og klasser i HTML-en

Rolle 2 lager dem, rolle 3 gir dem stil, og rolle 4 bruker dem i JavaScript.

| Navn | Hva det er |
| --- | --- |
| `#navn` | Feltet der du skriver navnet ditt |
| `#meldinger` | Området der alle meldingene vises |
| `#tekst` | Feltet der du skriver en melding |
| `#send` | Send-knappen |
| `.melding` | Boksen rundt én melding. Den har også klassen `.meg` eller `.andre` |
| `.avsender` | Navnet over en melding |
| `.boble` | Selve meldingsboblen |

Hver melding i `#meldinger` ser slik ut i HTML:

```html
<div class="melding andre">
  <span class="avsender">Ola</span>
  <p class="boble">Hei Kari!</p>
</div>
```

**Spørsmål til teamet:** Hva skjer hvis rolle 2 kaller feltet `#melding` mens rolle 4 bruker `#tekst`? Hvem oppdager feilen, og når?

## Fase 3: Bygg MVP-en

Hver rolle skriver sin egen fil. Skriv koden selv i stedet for å kopiere, og sørg for at du forstår hver linje. Du skal forklare den for teamet etterpå. Test din del alene før dere setter sammen.

### Rolle 1: Serveren (app.js)

```javascript
import express from "express";

const app = express();

app.use(express.static("public"));

const meldinger = [];
let nesteId = 1;

// Gir alle meldingene som JSON
app.get("/api/meldinger", (req, res) => {
  res.json(meldinger);
});

// Lagrer en ny melding, for eksempel /api/send/Kari/Hei
app.get("/api/send/:navn/:tekst", (req, res) => {
  const melding = {
    id: nesteId,
    navn: req.params.navn,
    tekst: req.params.tekst,
  };
  nesteId++;
  meldinger.push(melding);
  res.json(melding);
});

app.listen(3000, () => {
  console.log("Chatten kjører på http://localhost:3000");
});
```

**Test alene:** Start serveren og besøk `/api/send/Kari/Hei` og `/api/send/Ola/Hallo` i nettleseren. Gå deretter til `/api/meldinger`. Ser du begge meldingene?

### Rolle 2: Strukturen (public/index.html)

```html
<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Klassechatten</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header>
    <h1>VG2 Klassechat</h1>
    <input id="navn" placeholder="Skriv navnet ditt">
  </header>

  <main id="meldinger"></main>

  <footer>
    <input id="tekst" placeholder="Aa">
    <button id="send">Send</button>
  </footer>

  <script src="/chat.js"></script>
</body>
</html>
```

`<script>` står helt nederst, slik at alle elementene finnes når `chat.js` leter etter dem.

**Test alene:** Sjekk at alle id-ene er skrevet nøyaktig som i avtalen. Gi gjerne chatten et eget navn i stedet for «VG2 Klassechat».

### Rolle 3: Utseendet (public/style.css)

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, sans-serif;
  background: #ffffff;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e4e6eb;
}

header h1 {
  margin: 0;
  font-size: 1.1rem;
}

#meldinger {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
}

.melding {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.andre {
  align-self: flex-start;
}

.meg {
  align-self: flex-end;
  align-items: flex-end;
}

.avsender {
  margin: 0.5rem 0 0.15rem 0.75rem;
  font-size: 0.75rem;
  color: #65676b;
}

.meg .avsender {
  display: none;
}

.boble {
  margin: 0;
  padding: 0.5rem 0.8rem;
  border-radius: 18px;
  background: #e4e6eb;
  color: #050505;
  overflow-wrap: break-word;
}

.meg .boble {
  background: #0084ff;
  color: #ffffff;
}

footer {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e4e6eb;
}

input {
  padding: 0.5rem 0.9rem;
  border: none;
  border-radius: 18px;
  background: #f0f2f5;
  font-size: 1rem;
}

#tekst {
  flex: 1;
}

button {
  border: none;
  background: none;
  color: #0084ff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}
```

Slik lager CSS-en Messenger-utseendet:

- `body` er en kolonne med flexbox: toppfeltet øverst, meldingene i midten og skrivefeltet nederst.
- `#meldinger` fyller plassen som er igjen (`flex: 1`), og får rullefelt når det blir mange meldinger.
- `.meg` legger seg til høyre og `.andre` til venstre med `align-self`.
- `border-radius: 18px` gir de runde boblene.

**Test alene:** Du trenger ikke vente på de andre. Lag en egen fil `public/test.html` med samme innhold som `index.html`, og lim inn noen meldinger inne i `<main id="meldinger">`, slik som eksemplet i avtalen. Bruk både `meg` og `andre`. Åpne `/test.html`, og juster stilen til den ser riktig ut.

### Rolle 4: Henting og sending (public/chat.js)

Dette er JavaScript som kjører i *nettleseren*, ikke i Node. Det henter meldinger fra serveren med `fetch`, slik du gjorde i `klient.js` tidligere, og legger dem inn på siden.

```javascript
const meldingerEl = document.querySelector("#meldinger");
const navnEl = document.querySelector("#navn");
const tekstEl = document.querySelector("#tekst");
const sendKnapp = document.querySelector("#send");

// Henter alle meldingene fra serveren og viser dem
async function hentMeldinger() {
  const svar = await fetch("/api/meldinger");
  const meldinger = await svar.json();

  meldingerEl.innerHTML = "";

  meldinger.forEach((m) => {
    let klasse = "andre";
    if (m.navn === navnEl.value) {
      klasse = "meg";
    }

    meldingerEl.innerHTML += `
      <div class="melding ${klasse}">
        <span class="avsender">${m.navn}</span>
        <p class="boble">${m.tekst}</p>
      </div>`;
  });
}

// Sender en ny melding til serveren
async function sendMelding() {
  await fetch(`/api/send/${navnEl.value}/${tekstEl.value}`);
  tekstEl.value = "";
  hentMeldinger();
}

sendKnapp.addEventListener("click", sendMelding);

hentMeldinger();
setInterval(hentMeldinger, 2000);
```

Slik virker koden:

- `document.querySelector("#navn")` finner elementet med id-en `navn` på siden. `navnEl.value` er det som står skrevet i feltet.
- `hentMeldinger` tømmer meldingsområdet og legger inn alle meldingene på nytt med `innerHTML`. Hvis meldingen er skrevet av deg, får den klassen `meg`.
- `sendMelding` besøker send-ruten med navnet og teksten, tømmer skrivefeltet og henter meldingene på nytt.
- `addEventListener("click", ...)` kjører `sendMelding` når noen klikker på knappen.
- `setInterval(hentMeldinger, 2000)` kjører `hentMeldinger` hvert andre sekund, slik at du ser meldingene fra de andre.

**Test alene:** Lag de to andre filene midlertidig på din egen maskin med koden over, start serveren og prøv. Åpne utviklerverktøyet (F12) og se i fanen *Console* om det står feilmeldinger, og i *Network* om det sendes en forespørsel til `/api/meldinger` hvert andre sekund.

## Fase 4: Sett sammen og koble til

1. Alle laster opp sin fil med `git push`. Slett `test.html` og andre testfiler først, eller la være å laste dem opp.
2. Rolle 1 henter alt med `git pull` og starter serveren med `npm run dev`.
3. Rolle 1 sier IP-adressen høyt, og alle åpner `http://IP-ADRESSEN:3000`.
4. Alle skriver inn navnet sitt og sender en melding.

Sjekk sammen at MVP-en virker:

- [ ] Alle fire ser alle meldingene innen et par sekunder.
- [ ] Dine egne meldinger er blå og står til høyre.
- [ ] De andres meldinger er grå, står til venstre og har navnet over.

Hvis noe ikke virker, kan dere lete slik:

- **Ser du ikke siden i det hele tatt?** Sjekk IP-adressen, og at serveren kjører hos rolle 1.
- **Ser siden helt uformatert ut?** Sjekk at `<link>`-taggen og filnavnet `style.css` stemmer.
- **Skjer det ingenting når du klikker Send?** Åpne *Console* (F12). En rød feilmelding med `null` betyr ofte at en id ikke stemmer med avtalen.
- **Kommer meldingene fram til serveren?** Besøk `/api/meldinger` direkte og se.

Når alt virker, lagrer rolle 1 med beskjeden `"MVP ferdig"` og laster opp. Gratulerer, dere har en chat!

## Fase 5: Testrunden

MVP-en virker, men den har mange svakheter. Nå skal dere være testere og prøve å ødelegge chatten. Det finnes minst ti ting som fungerer dårlig. Finn så mange dere kan.

Rolle 2 skriver ned alt dere finner i feilloggen nederst. Ikke rett noe ennå. Først skal dere finne og forstå feilene.

### Testene

Gjør testene mens alle fire er koblet til. Se nøye etter hva som skjer, både hos den som sender og hos de andre.

1. Send meldingen «Skal vi møtes i lunsjen?». Se nøye på hva som vises.
2. Send «Vi deler 1/2 pizza».
3. Send «Vi er #1 i klassen».
4. Skriv en melding og trykk Enter i stedet for å klikke på Send.
5. Prøv å sende med tomt navnefelt, og prøv å sende en tom melding. Får du vite at noe gikk galt?
6. Send nok meldinger til at det kommer et rullefelt. Rull helt ned og vent på en ny melding fra en av de andre. Hva ser du?
7. Last siden på nytt med F5. Hva skjer med navnet ditt, og hvilke meldinger ser du først?
8. Bytt navnet ditt til navnet til en på teamet. Hva skjer med boblene? Kan du late som du er en annen?
9. Skriv denne adressen rett inn i nettleseren: `http://IP-ADRESSEN:3000/api/send/Rektor/Fri i morgen!`. Hva dukker opp i chatten?
10. Rolle 1 gjør en liten endring i `app.js` og lagrer. Hva skjer med meldingene?
11. Se i *Network*-fanen i ett minutt. Hvor mange forespørsler sendes, og hva inneholder hver av dem? Tenk deg at chatten har 1000 meldinger og 30 brukere.
12. Kan du se når en melding ble sendt?

**Bonus:** Finn en svakhet som ikke står på lista.

### Slik finner dere årsaken

For hver feil går dere gjennom de samme stegene:

1. **Gjenskap:** Klarer dere å få feilen til å skje igjen, hver gang?
2. **Finn stedet:** Er feilen i nettleseren eller på serveren? Besøk `/api/meldinger` direkte. Ligger meldingen riktig lagret der? Se i *Network* hvilken adresse som faktisk ble sendt, og i *Console* om det står feilmeldinger.
3. **Forklar:** Skriv med egne ord hvorfor det skjer.
4. **Foreslå en løsning:** Hvem i teamet eier filen som må endres?

### Feilloggen

Kopier tabellen til `README.md` eller et eget dokument. Den første raden er et eksempel.

| Nr | Hva vi gjorde | Hva skjedde | Hva vi forventet | Hvorfor tror vi det skjer | Fil | Alvorlighet |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Trykket Enter i skrivefeltet | Ingenting | At meldingen ble sendt | Vi lytter bare etter klikk på knappen | `chat.js` | Middels |
| 2 |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |
| 4 |  |  |  |  |  |  |
| 5 |  |  |  |  |  |  |

Alvorlighet: **Høy** betyr at meldinger forsvinner, er feil, eller at noen kan misbruke chatten. **Middels** betyr at chatten er tungvint å bruke. **Lav** betyr at det er småting eller pynt.

## Fase 6: Forbedringer

Nå skal dere rette feilene og gjøre chatten bedre. Slik jobber dere:

1. Gå gjennom feilloggen sammen, og ta de alvorligste feilene først.
2. Fordel forbedringene etter hvem som eier filen. Noen forbedringer krever endringer i flere filer. Da jobber de det gjelder sammen, gjerne to og to ved én maskin.
3. Gjør én forbedring om gangen: endre, test med hele teamet, lagre med Git og last opp.
4. Endrer dere noe i avtalen fra fase 2, for eksempel en ny rute eller et nytt felt i meldingen, skal hele teamet vite om det først.

Her er hint til mange av forbedringene. Dere bestemmer selv rekkefølgen.

### Hint til chat.js

- **Tegn som forsvinner eller ødelegger meldingen:** Noen tegn har en spesiell betydning i en adresse. `encodeURIComponent(tekst)` gjør om teksten slik at den trygt kan stå i en adresse. Bruk den på både navnet og teksten.
- **Test på nytt etter rettingen over:** Send `<b>Hei</b>` og `<h1>Hei`. Hva skjer med chatten, også hos de andre? Hint: `innerHTML` tolker tekst som HTML. Med `document.createElement` og `textContent` blir teksten vist som tekst. Hvorfor er dette en sikkerhetsfeil?
- **Enter-tasten:** Lytt etter `"keydown"` på skrivefeltet, og send meldingen hvis `event.key === "Enter"`.
- **Tomme meldinger og tomt navn:** Sjekk med `trim()` før du sender, og vis en beskjed til brukeren hvis noe mangler.
- **Rulling:** `meldingerEl.scrollTop = meldingerEl.scrollHeight` ruller helt ned. Utfordring: rull bare ned hvis brukeren allerede var nederst, slik at den som leser gamle meldinger, ikke blir dratt ned.
- **Navnet forsvinner:** `localStorage.setItem("navn", navn)` lagrer en verdi i nettleseren, og `localStorage.getItem("navn")` henter den igjen etter at siden er lastet på nytt.

### Hint til app.js

- **Meldinger som forsvinner:** Lagre meldingene i `meldinger.json` hver gang en ny melding kommer, og les filen når serveren starter. Du kan gjenbruke `lagring.js` fra notatappen i økt 1.
- **Ikke stol på nettleseren:** Sjekk også på serveren at navn og tekst ikke er tomme, og svar med `res.status(400)` hvis de er det. Hvorfor holder det ikke å sjekke i `chat.js`?
- **Tidspunkt:** Legg til `tid: new Date().toISOString()` i hver melding. Rolle 4 viser tiden med `toLocaleTimeString("nb-NO")`, og rolle 3 gir den stil. Husk å oppdatere avtalen.
- **Utfordring – mindre data:** Lag ruten `/api/meldinger/etter/:id`, som bare gir meldingene med høyere `id` enn den du sender med. Da kan `chat.js` huske den siste id-en den har sett, og bare legge til de nye meldingene i stedet for å tegne alt på nytt.

### Hint til style.css og index.html

- **Som i Messenger:** Når samme person sender flere meldinger på rad, viser Messenger navnet bare én gang. Hvordan kan dere få til det? Hvem i teamet må være med?
- **Profilbilde:** Vis en rund sirkel med forbokstaven i navnet ved siden av de andres meldinger.
- **Velg navn først:** Vis et eget felt for navnet når siden åpnes, og vis chatten først når navnet er valgt.
- **Mobil og mørk modus:** Test chatten på mobilen. Lag gjerne et mørkt tema med `@media (prefers-color-scheme: dark)`.

### Til diskusjon i teamet

Noen svakheter kan dere ikke rette helt med det dere kan nå:

- Send-ruten bruker `GET`, og meldingen står i adressen. Hvorfor er det dårlig at hvem som helst kan sende en melding bare ved å besøke en adresse? Senere i kurset lærer dere `POST`, som er den riktige måten å sende data på.
- Alle kan skrive hvilket som helst navn. Hva skal til for at chatten vet hvem du *egentlig* er?

## Fase 7: Demo og refleksjon

Hvert team viser chatten for klassen i fem minutter, ledet av rolle 4:

- Vis chatten slik den er nå, med alle fire koblet til.
- Vis feilloggen. Hvor mange svakheter fant dere?
- Velg én feil, og forklar hvordan dere fant årsaken og rettet den. Den som eier filen, forklarer koden.

Skriv til slutt et kort svar hver for dere:

1. Hva var det vanskeligste med å utvikle sammen i et team?
2. Hvordan hjalp avtalen fra fase 2? Ble den brutt noen gang?
3. Beskriv en feil du fant. Hvordan gikk du fram for å finne årsaken?
4. Hva ville du gjort annerledes neste gang?

**Bonus for hele klassen:** Læreren starter en server på sin maskin. Klarer alle teamene å koble seg til den samme chatten, på kablet nett eller på wifi?
