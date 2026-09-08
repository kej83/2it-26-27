# Kapittel 1: Variabler

*JavaScript med Node.js — hefte 1 i serien «JavaScript fra bunnen av».*

---

## Slik jobber du med heftene

Hvert delkapittel starter med et lite program. Arbeidsmåten er alltid den samme:

Les koden først, og forsøk å forutsi hva som skjer **før** du kjører den — gjerne sammen med en læringspartner. Skriv deretter av koden for hånd (ikke kopier!), og kjør programmet. Fikk du et annet resultat enn du gjettet? Da har du nettopp funnet noe å lære — finn ut hvorfor. Videre gjør du de nummererte oppgavene i tur og orden: først små endringer, så større, helt til du har gjort programmet til ditt eget. Bakerst i heftet finner du et oppgavesett der du lager egne programmer fra bunnen av, delt i tre vanskegrader.

> **💡 Tips:** Gjett alltid på resultatet etter hver endring, før du kjører programmet på nytt. Det er selve gjettingen som gjør at du lærer.

## Kom i gang

For å følge heftene trenger du to gratisprogrammer på maskinen din:

1. **Node.js** — kjører JavaScript-programmene dine. Last ned LTS-versjonen fra [nodejs.org](https://nodejs.org) og installer med standardvalgene.
2. **Visual Studio Code** — editoren du skriver kode i. Last ned fra [code.visualstudio.com](https://code.visualstudio.com).

Lag deretter en mappe med navnet `js-kurs` på maskinen din, og åpne mappa i VS Code (`File → Open Folder`). Terminalen åpner du med `View → Terminal` — det er der du skal kjøre programmene dine. Sjekk at alt virker ved å skrive dette i terminalen og trykke `Enter`:

```text
node --version
```

Får du et versjonsnummer til svar, for eksempel `v22.11.0`, er du klar.

---

## 1.1 Ditt første program

```js
console.log("Hei, verden!");
```

Et program er en oppskrift som datamaskinen følger, linje for linje. Kommandoen `console.log(...)` skriver ut det som står mellom parentesene.

1. Lag fila `app.js` i mappa di: høyreklikk i filpanelet i VS Code, velg `New File`, og skriv navnet `app.js`.
2. Skriv av kodelinja øverst — nøyaktig som den står, med anførselstegn, parenteser og semikolon.
3. Kjør programmet: skriv `node app.js` i terminalen, og trykk `Enter`.
4. Endre teksten mellom anførselstegnene til noe annet, lagre fila (`Ctrl + S`), og kjør programmet på nytt.
5. Legg til to nye `console.log`-linjer, slik at programmet skriver ut tre forskjellige linjer.
6. Skriv med vilje `console.lg` i stedet for `console.log` på én av linjene, og kjør programmet. Les feilmeldingen — hvilket linjenummer peker den på? Rett feilen etterpå.

> **🐞 Feilmeldinger er venner:** Node forteller deg filnavn, linjenummer og hva slags feil det er. Utviklere leser feilmeldinger hver eneste dag — venn deg til å lese dem rolig fra toppen, i stedet for å få panikk.

> **💡 Tips:** Lagre fila før du kjører! Glemmer du `Ctrl + S`, kjører Node den gamle versjonen av programmet, og endringen din ser ut til å ikke virke. I VS Code kan du også slå på `File → Auto Save`.

---

## 1.2 Lagre tekst i variabler

```js
let spill = "Minecraft";
console.log("Jeg spiller", spill);
```

En **variabel** er en navngitt boks der programmet lagrer en verdi til senere bruk. Nøkkelordet `let` lager en ny variabel, og `=` legger en verdi i den. Her lagres teksten `"Minecraft"` i variabelen `spill`.

1. Les koden. Hva tror du blir skrevet ut?
2. Lag fila `spill.js`, skriv av koden, og kjør programmet.

Nedenfor ser du den korrekte koden sammen med tre typiske feil.

```js
let spill = "Minecraft";
console.log("Jeg spiller", spill);
```

```js
let spill = Minecraft;
console.log("Jeg spiller", spill);
```

```js
let spill = "Minecraft";
console.log("Jeg spiller", Spill);
```

```js
let spill = "Minecraft";
console.log("Jeg spiller," spill);
```

3. Forsøk å finne feilen i hvert av de tre siste tilfellene, uten å kjøre koden. Prøv deretter gjerne å kjøre dem og se hva Node svarer.

> **⚠️ Merk:** JavaScript skiller mellom store og små bokstaver: `spill` og `Spill` er to helt forskjellige navn. Tekst må stå i anførselstegn — uten dem tror JavaScript at `Minecraft` er navnet på en variabel.

4. Utvid koden som vist nedenfor. Gjett på resultatet, før du kjører programmet.

```js
let spill = "Minecraft";
spill = "Fortnite";
spill = "Tetris";
console.log("Jeg spiller", spill);
```

En variabel kan altså få ny verdi underveis — det er derfor den heter *variabel*. Legg merke til at `let` bare brukes første gang; etterpå holder det med navnet.

5. Legg til to ekstra `console.log("Jeg spiller", spill);`-linjer på riktige steder i koden, slik at resultatet blir:

```text
Jeg spiller Minecraft
Jeg spiller Fortnite
Jeg spiller Tetris
```

> **💡 Tips:** I JavaScript skriver vi variabelnavn med **camelCase**: første ord med liten bokstav, og hvert nye ord med stor bokstav, som i `favorittSpill` og `antallPoeng`. Slik navngir profesjonelle JavaScript-utviklere variablene sine.

---

## 1.3 Lagre tall i variabler

```js
let pris = 149;
let antall = 3;
console.log(pris * antall);
```

Variabler kan også lagre tall. I en nettbutikk ligger det 3 T-skjorter i handlekurven, til 149 kr per stykk. Legg merke til at tall skrives **uten** anførselstegn, og at gangetegnet er `*`.

1. Les koden. Hva blir skrevet ut?
2. Lag fila `handlekurv.js`, skriv av koden, og kjør programmet.
3. Endre antallet til 5, og kjør på nytt.
4. Utvid koden med en variabel som lagrer summen, og en utskrift med forklaring:

```js
let pris = 149;
let antall = 3;
let total = pris * antall;
console.log("Å betale:", total, "kr");
```

5. Butikken har gratis frakt over 500 kr, ellers koster frakten 79 kr. Legg til variabelen `frakt` med verdien 79, og endre `total` slik at frakten regnes med.

Regneartene i JavaScript ser slik ut:

| Operator | Betydning | Eksempel | Resultat |
|---|---|---|---|
| `+` | pluss | `7 + 2` | `9` |
| `-` | minus | `7 - 2` | `5` |
| `*` | gange | `7 * 2` | `14` |
| `/` | dele | `7 / 2` | `3.5` |

6. Lag et nytt program som regner ut hvor mange minutter det er i et døgn, ved å bruke variablene `timerPerDogn` og `minutterPerTime`. Gjett på svaret først.

> **⚠️ Merk:** JavaScript bruker punktum i desimaltall: `3.5`, ikke `3,5`. JavaScript regner i vanlig regnerekkefølge: gange og dele før pluss og minus. Med parenteser styrer du rekkefølgen selv, akkurat som i matematikk.

---

## 1.4 Datatyper: tekst, tall og sannhetsverdier

```js
let fornavn = "Ola";
let etternavn = "Nordmann";
let fulltNavn = fornavn + " " + etternavn;
console.log(fulltNavn);
```

Tekst i programmering kalles en **streng** (engelsk: *string*). Med `+` kan du lime sammen strenger — det kalles å **konkatenere**. Her limes fornavn, et mellomrom og etternavn sammen til ett fullt navn.

1. Les koden. Hva blir skrevet ut?
2. Lag fila `datatyper.js`, skriv av koden, og kjør programmet.
3. Fjern `" + " "`-delen, slik at linja blir `let fulltNavn = fornavn + etternavn;`. Kjør programmet, og se hvorfor mellomrommet trengs.

Men hva skjer når `+` møter både tekst og tall?

4. Legg til disse kodelinjene, og gjett på resultatet før du kjører:

```js
console.log(5 + 3);
console.log("5" + 3);
console.log("5" + "3");
```

> **⚠️ Merk:** `5` er et tall, men `"5"` er en streng! Når minst én av sidene er en streng, limer `+` i stedet for å regne: `"5" + 3` blir `"53"`. Denne forskjellen kommer til å forfølge deg i hele utviklerkarrieren — lær den nå, så sparer du mange timers feilsøking senere.

Hver verdi i JavaScript har en **datatype**. Du har nå møtt to av dem, og her er den tredje: sannhetsverdier, som bare kan være `true` (sant) eller `false` (usant).

```js
let brukernavn = "ola_2010";
let alder = 16;
let innlogget = true;
console.log(typeof brukernavn);
console.log(typeof alder);
console.log(typeof innlogget);
```

5. Skriv av koden i en ny fil, og gjett hva de tre linjene skriver ut. Kjør programmet.

| Datatype | Kalles i JavaScript | Eksempler |
|---|---|---|
| Tekst (streng) | `string` | `"Ola"`, `"149"` |
| Tall | `number` | `149`, `3.5`, `-20` |
| Sannhetsverdi | `boolean` | `true`, `false` |

Operatoren `typeof` forteller deg hvilken datatype en verdi har — et nyttig verktøy når noe oppfører seg rart. Sannhetsverdiene `true` og `false` får du virkelig bruk for i hefte 2.

6. Endre `let alder = 16;` til `let alder = "16";`. Hva sier `typeof alder` nå? Kjør og sjekk.

---

## 1.5 Template-strenger

```js
let navn = "Kari";
let alder = 16;
console.log(`Hei ${navn}, du er ${alder} år!`);
```

Å lime sammen lange utskrifter med `+` blir fort rotete. **Template-strenger** løser det: skriv teksten mellom to skråstilte anførselstegn (backticks `` ` ``), og sett inn variabler med `${...}` der du vil ha dem.

> **💡 Tips:** Backtick-tegnet `` ` `` skriver du på norsk tastatur med `Shift` + tasten til venstre for `Backspace` — og deretter et trykk på mellomromstasten.

1. Les koden. Hva blir skrevet ut?
2. Lag fila `hilsen.js`, skriv av koden, og kjør programmet.
3. Endre verdiene til navnet og alderen din, og kjør på nytt.
4. Fjern kronetegnet, slik at det står `{navn}` i stedet for `${navn}`. Kjør programmet, og se hva som skjer. Rett det opp igjen.
5. Bytt ut backticks med vanlige anførselstegn `"..."`, og kjør. Hva skjer med `${navn}` da? Rett tilbake.
6. Du kan også regne inne i `${...}`. Legg til denne linja, og kjør:

```js
console.log(`Om 4 år er du ${alder + 4} år.`);
```

7. Utvid programmet med en variabel `favorittfag`, og skriv ut en setning som bruker alle tre variablene i én template-streng.

---

## 1.6 Input fra kommandolinja

```js
let navn = process.argv[2];
console.log(`Hei, ${navn}!`);
```

Til nå har du endret verdier ved å endre selve koden. Ekte programmer får verdiene sine utenfra — som **input**. I dette kurset gir vi programmet input rett fra kommandolinja: alt du skriver etter filnavnet kalles **argumenter**.

```text
node hilsen2.js Ola
```

Kodelinja `let navn = process.argv[2];` henter det **første** argumentet. Det neste argumentet henter du med `process.argv[3]`, det tredje med `process.argv[4]`, og så videre.

1. Les koden. Hva skjer når du kjører `node hilsen2.js Ola`?
2. Lag fila `hilsen2.js`, skriv av koden, og kjør programmet med navnet ditt som argument.
3. Kjør programmet på nytt med et annet navn — **uten** å endre koden. Det er dette som er poenget med input: samme program, forskjellige data.
4. Kjør programmet helt uten argument: `node hilsen2.js`. Utskriften blir `Hei, undefined!` — `undefined` er JavaScript sin måte å si «her finnes ingen verdi» på.
5. Utvid programmet slik at det tar imot både fornavn og etternavn: `node hilsen2.js Ola Nordmann` skal skrive ut `Hei, Ola Nordmann!`.

> **💡 Hvorfor 2?** Plassene 0 og 1 i `process.argv` er opptatt: der ligger stien til selve Node og til programfila di. Argumentene dine begynner derfor på plass 2. Mer om hvordan dette egentlig henger sammen får du i heftet om arrayer.

Argumenter er alltid **strenger** — selv når du skriver inn et tall. Skal du regne, må du først gjøre argumentet om til et tall med `Number(...)`:

```js
let tall = Number(process.argv[2]);
console.log(`Om 10 år er du ${tall + 10} år.`);
```

6. Lag fila `pluss10.js` med koden ovenfor, og kjør `node pluss10.js 16`.
7. Fjern `Number(...)`, slik at linja blir `let tall = process.argv[2];`. Kjør `node pluss10.js 16` på nytt. Forklar resultatet ved hjelp av det du lærte i 1.4. Sett deretter `Number(...)` tilbake.
8. Lag et program `kvittering.js` som tar imot pris og antall som argumenter, og skriver ut totalsummen: `node kvittering.js 149 3` skal gi `Å betale: 447 kr`.

---

## 1.7 Endre variabler

```js
let poeng = 0;
poeng = poeng + 100;
poeng = poeng * 2;
poeng = poeng - 30;
console.log(poeng);
```

```text
Gi poeng verdien 0
Øk poeng med 100
Doble poeng
Reduser poeng med 30
Skriv ut poeng
```

I et spill endrer poengsummen seg hele tiden. Ovenfor ser du kode og **algoritme** ved siden av hverandre — algoritmen er oppskriften skrevet på norsk, koden er den samme oppskriften i JavaScript.

Kodelinja `poeng = poeng + 100` ser rar ut som mattestykke, men i programmering betyr `=` «lagre»: regn ut høyresiden først (`poeng + 100`), og lagre svaret i variabelen på venstresiden.

1. Les koden linje for linje, og regn ut på papir hva `poeng` er etter hver linje. Hva blir utskriften?
2. Lag fila `poeng.js`, skriv av koden, og kjør programmet. Stemte det?
3. Legg til kodelinja `poeng = 500;` rett ovenfor `console.log(poeng);`. Gjett på resultatet, før du kjører.

Utviklere endrer variabler så ofte at det finnes kortformer:

| Kortform | Betyr det samme som |
|---|---|
| `poeng += 100` | `poeng = poeng + 100` |
| `poeng -= 30` | `poeng = poeng - 30` |
| `poeng *= 2` | `poeng = poeng * 2` |
| `poeng /= 4` | `poeng = poeng / 4` |

4. Fjern linja fra oppgave 3, og skriv om de tre midterste kodelinjene til kortform. Kjør programmet, og sjekk at resultatet er det samme som før.
5. Utvid programmet slik at det følger denne algoritmen. Gjett på sluttresultatet først:

```text
Gi poeng verdien 0
Øk poeng med 100
Doble poeng
Reduser poeng med 30
Øk poeng med 250
Gjør poeng 4 ganger så liten
Skriv ut poeng
```

---

## 1.8 Heltallsdivisjon og rest

```js
let sekunder = 245;
let minutter = Math.floor(sekunder / 60);
let rest = sekunder % 60;
console.log(`Videoen varer i ${minutter} min ${rest} sek`);
```

En video varer i 245 sekunder — men ingen app viser «245 sekunder». Apper viser `4:05`. For å gjøre om sekunder til minutter og sekunder trenger du to nye verktøy:

- `Math.floor(...)` runder **ned** til nærmeste heltall: `Math.floor(4.08)` gir `4`.
- `%` gir **resten** etter en heltallsdivisjon: `245 % 60` gir `5`, fordi 60 går 4 hele ganger opp i 245, og da er det 5 igjen.

1. Les koden, og kontroller regnestykkene i hodet: hvorfor blir det 4 minutter, og hvorfor blir resten 5?
2. Lag fila `video.js`, skriv av koden, og kjør programmet.
3. Endre `sekunder` til 754, og gjett på utskriften før du kjører.
4. Endre programmet slik at antall sekunder leses inn fra kommandolinja: `node video.js 754`.

Rest-operatoren er liten, men mektig. Utforsk den:

5. Lag et nytt program med kodelinjene nedenfor, og gjett på hver utskrift før du kjører:

```js
console.log(10 % 3);
console.log(12 % 3);
console.log(13 % 2);
console.log(14 % 2);
```

6. Se på de to siste svarene: hva gir `%  2` for oddetall, og hva gir det for partall? Denne oppdagelsen får du bruk for i hefte 2.

> **💡 Tips:** `%` brukes overalt i utviklerhverdagen: klokkeslett og nedtellinger, «annenhver rad grå» i tabeller, fordeling av ting i grupper — og mye mer. Du møter alt dette i de neste heftene.

---

## Sammendrag

I dette kapitlet har du lært å lage programmer som lagrer verdier i variabler, regner med dem, og tar imot input fra kommandolinja.

### Variabler

```js
let fag = "musikk";
console.log("Jeg elsker", fag);
fag = "programmering";
console.log(`Jeg liker ${fag}`);
```

```text
Jeg elsker musikk
Jeg liker programmering
```

`let` lager en variabel, `=` lagrer en verdi i den. Variabelen kan få ny verdi senere — da uten `let`. Variabelnavn skrives i camelCase: `favorittFag`.

### Datatyper

```js
let tittel = "Tetris";
let pris = 129;
let tilSalgs = true;
console.log(typeof tittel, typeof pris, typeof tilSalgs);
```

```text
string number boolean
```

De tre datatypene er `string` (tekst i anførselstegn), `number` (tall) og `boolean` (`true`/`false`). Husk: `"5" + 3` blir `"53"`, fordi `+` limer når en streng er med.

### Regning og endring av variabler

```js
let poeng = 10;
poeng = poeng + 5;
poeng *= 2;
console.log(poeng);
console.log(31 % 4);
console.log(Math.floor(31 / 4));
```

```text
30
3
7
```

Regneartene er `+`, `-`, `*` og `/`. Kortformene `+=`, `-=`, `*=` og `/=` endrer en variabel direkte. `%` gir resten i en divisjon, og `Math.floor(...)` runder ned til nærmeste heltall.

### Template-strenger

```js
let navn = "Ola";
let alder = 16;
console.log(`${navn} er ${alder} år`);
```

```text
Ola er 16 år
```

Mellom backticks `` ` `` kan du sette inn variabler og regnestykker med `${...}`.

### Input fra kommandolinja

```js
let navn = process.argv[2];
let alder = Number(process.argv[3]);
console.log(`${navn} er ${alder} år`);
```

```text
node app.js Ola 16
Ola er 16 år
```

`process.argv[2]` er det første argumentet, `process.argv[3]` det andre, og så videre. Argumenter er alltid strenger — bruk `Number(...)` før du regner med dem.

---

## Oppgaver

### Del A — Enkle oppgaver

**Oppgave A1**

```js
let by : "Oslo"
Console.log(by "er Norges hovedstad")
```

Koden inneholder tre feil. Rett alle feilene slik at programmet skriver ut `Oslo er Norges hovedstad`.

**Oppgave A2**

```text
┌────────────────────────────────┐
│ console.log(total);            │
├────────────────────────────────┤
│ let antall = 4;                │
├────────────────────────────────┤
│ let total = pris * antall;     │
├────────────────────────────────┤
│ let pris = 249;                │
└────────────────────────────────┘
```

Sett sammen kodelinjene i den rekkefølgen som danner et program som regner ut hva 4 hodetelefoner til 249 kr koster til sammen. Husk: en variabel må lages **før** den brukes.

**Oppgave A3**

```js
let minutter = 90;
let sekunder = ...;
console.log(`${minutter} minutter er ${sekunder} sekunder`);
```

Fullfør koden slik at programmet regner om 90 minutter til sekunder, og skriver ut `90 minutter er 5400 sekunder`.

**Oppgave A4**

```js
let x = 5;
x = x + 3;
let y = x * 2;
x = 1;
console.log(x, y);
```

Les koden, og skriv ned på papir hva utskriften blir. Skriv deretter av koden, kjør programmet, og sjekk svaret ditt.

**Oppgave A5**

```js
let navn = process.argv[2];
let alder = ...;
console.log(`Bruker: ...`);
console.log(`Alder: ... år`);
```

```text
┌───────────────────────────┐  ┌────────────┐  ┌────────────┐
│  Number(process.argv[3])  │  │  ${navn}   │  │  ${alder}  │
└───────────────────────────┘  └────────────┘  └────────────┘
```

Et nettsted skal vise et profilkort. Skriv av koden, og plasser kodebitene på riktig plass der det mangler kode (`...`). Kjøringen skal se slik ut:

```text
node profil.js kari_08 16
Bruker: kari_08
Alder: 16 år
```

**Oppgave A6**

```js
let sang = "Feberdrøm"
console.log("Nå spilles", sang);
```

```js
let sang = "Feberdrøm";
console.log("Nå spilles", sang);
```

```js
let "sang" = Feberdrøm;
console.log("Nå spilles", sang);
```

```js
let sang = Feberdrøm;
console.log("Nå spilles", "sang");
```

En musikk-app skal vise hvilken sang som spilles. Bare én av de fire kodebitene er helt riktig. Finn den, og forklar hva som er galt med de andre. (En av dem kjører faktisk uten feilmelding — hvorfor er den likevel skrevet på en uheldig måte?)

**Oppgave A7**

Lag et program som tar imot fornavn og etternavn som argumenter, og ønsker brukeren velkommen:

```text
node velkommen.js Ola Nordmann
Velkommen, Ola Nordmann!
```

### Del B — Middels

**Oppgave B1**

```js
let tall = 5;
let tall2 = 4 + tall;
tall = 8;
console.log(tall2);
```

```js
let tall2 = 4 + tall;
let tall = 5;
tall = 8;
console.log(tall2);
```

```js
let tall = 5;
tall = 8;
let tall2 = 4 + tall;
console.log(tall2);
```

Les de tre kodebitene. Én av dem gir en feilmelding når den kjøres — hvilken, og hvorfor? Hva blir resultatet av de to andre? Test svarene dine ved å skrive av og kjøre koden.

**Oppgave B2**

En nettbutikk selger en jakke til ordinær pris 1200 kr. Nå er det salg, og rabatten er 30 %. Lag et program som regner ut og skriver ut rabatten i kroner og den nye prisen. Bruk variablene `pris`, `rabattProsent`, `rabattKr` og `nyPris`.

Utvid deretter programmet slik at prisen leses inn fra kommandolinja: `node salg.js 800` skal regne ut 30 % rabatt på 800 kr.

**Oppgave B3**

En konto på et sosialt medium har et antall følgere som leses inn fra kommandolinja. Kontoen vokser med 10 % på en uke — det tilsvarer å gange antallet med **vekstfaktoren** 1,10. Lag et program som skriver ut antall følgere om en uke:

```text
node folgere.js 500
Om en uke: 550 følgere
```

**Oppgave B4**

Lag et program som gjør om et antall sekunder til timer, minutter og sekunder. Bruk `Math.floor(...)` og `%`.

```text
node tid.js 7384
2 timer, 3 minutter og 4 sekunder
```

> **💡 Tips:** Finn først antall hele timer. Bruk deretter `%` til å finne ut hvor mange sekunder som er igjen når timene er trukket fra — og gjør det samme en gang til for minuttene.

**Oppgave B5**

```text
Les inn antall visninger fra kommandolinja
Gi inntektPerVisning verdien 0.05
Regn ut inntekt som visninger ganger inntektPerVisning
Skriv ut inntekten
```

En videoplattform betaler 0,05 kr per visning. Lag et program som følger algoritmen ovenfor. Algoritmen er skrevet på norsk — jobben din er å oversette den til JavaScript.

```text
node inntekt.js 12000
Videoen har tjent 600 kr
```

**Oppgave B6**

Fire venner deler en regning på 467 kr. De betaler bare med hele kroner. Lag et program som skriver ut hvor mye hver person skal betale, og hvor mange kroner som blir til overs:

```text
node regning.js 467 4
Hver betaler 116 kr, 3 kr blir til overs
```

Beløpet og antall personer skal leses inn fra kommandolinja.

### Del C — Mer krevende

**Oppgave C1**

En smartklokke lagrer tidspunkter som «antall minutter etter midnatt». Lag et program som gjør om et slikt tall til et klokkeslett:

```text
node klokke.js 505
Klokka er 8:25
```

Test programmet med 505, 60, 725 og 1439. Hva er det største tallet som gir et gyldig klokkeslett?

**Oppgave C2**

Lag en valutakalkulator som tar imot et beløp i kroner, og skriver ut hva det tilsvarer i euro og dollar. Bruk kursene 1 EUR = 11,50 kr og 1 USD = 10,20 kr (kurser endrer seg — dette er eksempelkurser).

```text
node valuta.js 500
500 kr = 43.48 EUR
500 kr = 49.02 USD
```

> **💡 Tips:** Svarene får mange desimaler. Uttrykket `Math.round(belop * 100) / 100` runder av til to desimaler: først ganges tallet opp, så rundes det av til nærmeste heltall med `Math.round(...)`, og til slutt deles det ned igjen.

**Oppgave C3**

En strømmetjeneste vil vise hvor lenge en spilleøkt varte. Lag et program som tar imot fire argumenter — starttime, startminutt, slutt-time og sluttminutt — og regner ut varigheten:

```text
node varighet.js 19 45 22 10
Økten varte i 2 timer og 25 minutter
```

> **💡 Tips:** Gjør begge klokkeslettene om til «minutter etter midnatt» først. Da blir varigheten en enkel subtraksjon — og resultatet gjør du om til timer og minutter med `Math.floor(...)` og `%`, slik som i oppgave B4. Du kan anta at økten starter og slutter samme dag.

---

*Hefte 1 av serien «JavaScript fra bunnen av». Neste hefte: Logiske uttrykk og if-else.*
