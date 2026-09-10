# Hefte 1: Installasjon og oppsett av PostgreSQL og pgAdmin

*Databaser fra bunnen av — hefte 1 i serien. Beregnet på én skoletime. Når du er ferdig med dette heftet, har du en database som kjører på din egen maskin, og et verktøy til å styre den med. I hefte 2 begynner du å bruke den.*

---

## Slik jobber du med dette heftet

Du jobber på samme måte som i JavaScript- og HTML-heftene, etter stegene i PRIMM:

| Steg | Hva du gjør |
|---|---|
| **Predict** | Les koden, og forutsi hva som skjer. Skriv gjerne ned gjettet ditt, eller si det høyt til sidemannen. |
| **Run** | Skriv av koden, og kjør den. Forklar avvik mellom det du trodde og det som faktisk skjedde. |
| **Investigate** | Gjør små endringer — bytt en verdi, fjern et ord — forutsi på nytt, og kjør igjen. |
| **Modify** | Gjør større endringer. Utvid, eller lag noe liknende. |
| **Make** | Lag ditt helt eget. |

Dette heftet er kortere enn de andre, og handler mest om å få verktøyene på plass. Ta det likevel rolig: den som skynder seg gjennom installasjonen, bruker desto lengre tid på å lete etter feil senere.

---

## 1.1 Hva er egentlig en database?

I hefte 4 om arrayer og objekter lagret du data slik:

```js
let spill = [
  { tittel: "Stardew Valley", pris: 149, flerspiller: true },
  { tittel: "Celeste", pris: 219, flerspiller: false }
];
```

1. Les koden. Hvor er dataene lagret mens programmet kjører? **[Predict]**
2. Hva skjer med dataene når programmet avsluttes?

Der er problemet. Alt du har laget til nå har hatt hukommelsestap: når programmet stopper, er dataene borte. En **database** er lagring som overlever — den ligger på disk, den kan brukes av flere programmer samtidig, og den kan finne igjen fem linjer blant fem millioner på noen millisekunder.

**PostgreSQL** er databasesystemet vi bruker. Det er gratis, åpen kildekode, og brukes av alt fra elevprosjekter til Spotify og NASA. Det består av to deler du må holde fra hverandre:

| Del | Hva det er |
|---|---|
| **Databaseserveren** (PostgreSQL) | Selve programmet som lagrer dataene. Det starter når PC-en starter, og kjører usynlig i bakgrunnen. |
| **Klienten** (pgAdmin) | Programmet du klikker i. Det sender spørsmål til serveren og viser deg svaret. |

Dette er samme oppdeling som nettleser og nettsted: pgAdmin er «nettleseren», PostgreSQL er «serveren». Du kan bytte ut pgAdmin med et annet verktøy uten at dataene merker noe — og det er derfor du installerer to programmer i dag, ikke ett.

Dataene ligger i **tabeller**, som ligner regnearket du kjenner:

| id | tittel | sjanger | pris |
|---|---|---|---|
| 1 | Stardew Valley | Simulator | 149.00 |
| 2 | Celeste | Plattform | 219.00 |

En **rad** er én ting — ett spill. En **kolonne** er én opplysning om alle tingene — alle prisene. Språket vi snakker med databasen i, heter **SQL** (uttales «ess-ku-ell» eller «síkvel»). Det lærer du i hefte 2.

3. Skriv ned tre opplysninger til som ville vært naturlige å ha om et spill. Du får bruk for dem i neste time.

---

## 1.2 Installere PostgreSQL og pgAdmin

Du installerer begge deler på én gang, med installasjonsprogrammet fra postgresql.org. Regn med 15–20 minutter. Følg stegene nøyaktig, og **les hvert skjermbilde før du klikker videre** — det er god trening i seg selv.

**Steg 1 — Last ned**

Gå til `https://www.postgresql.org/download/windows/` og klikk lenka til nedlastingen («Download the installer»). Velg den nyeste versjonen for **Windows x86-64**. I skrivende stund er det versjon 18.

**Steg 2 — Start installasjonen**

Kjør fila som ble lastet ned. Windows spør om du vil tillate at appen gjør endringer — svar ja. Klikk **Next** gjennom velkomstskjermen og installasjonsmappa (behold standardvalget).

**Steg 3 — Velg komponenter**

Her skal alle fire være huket av:

| Komponent | Hva det er |
|---|---|
| PostgreSQL Server | Selve databaseserveren |
| pgAdmin 4 | Det grafiske verktøyet du skal jobbe i |
| Stack Builder | Tilleggsprogrammer — vi bruker det ikke, men det gjør ingen skade |
| Command Line Tools | Kommandolinjeverktøy, blant annet `psql` |

**Steg 4 — Datamappe**

Behold standardmappa. Dette er stedet på disken der de faktiske dataene dine havner.

**Steg 5 — Passord for superbrukeren**

Nå må du velge et passord for databasebrukeren `postgres`. Dette er hovedbrukeren, med alle rettigheter.

> **⚠️ Merk:** Skriv passordet ned et sted du finner det igjen. Det finnes ingen «glemt passord»-knapp. Bruk noe enkelt du husker — dette er en lokal øvingsdatabase på din egen maskin, ikke et banksystem. `Passord123` holder.

**Steg 6 — Port**

La det stå **5432**. Dette er «dørnummeret» andre programmer bruker for å nå databasen. Foreslår installereren et annet tall, har du sannsynligvis PostgreSQL installert fra før — spør læreren.

**Steg 7 — Locale**

Behold standardvalget (`Default locale`). Dette styrer blant annet hvordan bokstavene æ, ø og å sorteres.

**Steg 8 — Installer**

Klikk **Next** og **Finish**. Til slutt tilbyr installereren å starte Stack Builder. **Fjern haken** og avslutt.

**Sjekkliste — du er ferdig med dette delkapittelet når du kan svare ja på alle fire:**

- [ ] Installasjonen fullførte uten feilmelding.
- [ ] Jeg finner **pgAdmin 4** i Start-menyen.
- [ ] Jeg har skrevet ned passordet til brukeren `postgres`.
- [ ] Jeg vet hvilket portnummer databasen bruker.

> **🐞 Når noe går galt:**
>
> - *«Installereren sier at porten er i bruk.»* Da kjører det allerede en PostgreSQL på maskinen. Bruk den eksisterende i stedet for å installere på nytt.
> - *«Jeg får ikke lov til å installere.»* Du mangler administratorrettigheter. Si fra til læreren.
> - *«Antivirus stopper installasjonen.»* Vent til den er ferdig med skanningen, og prøv igjen.

---

## 1.3 Første møte med pgAdmin

Start **pgAdmin 4** fra Start-menyen. Programmet åpner seg i en nettleserfane eller i sitt eget vindu — begge deler er normalt, for pgAdmin *er* egentlig et nettsted som kjører lokalt på maskinen din.

Første gang blir du bedt om å sette et **master password**. Det er ikke det samme som databasepassordet — det er en lås rundt selve pgAdmin. Bruk gjerne det samme passordet, så slipper du å huske to.

Til venstre ser du **Object Explorer** — trestrukturen med alt som finnes på serveren:

```text
Servers
└── PostgreSQL 18
    └── Databases
        └── postgres
            └── Schemas
                └── public
                    ├── Tables
                    ├── Views
                    └── Functions
```

1. Klikk på pila ved siden av **PostgreSQL 18**. Du blir bedt om passordet du valgte i steg 5. Skriv det inn, og huk av for at pgAdmin skal huske det. **[Run]**
2. Klapp deg nedover i treet til du finner **Tables** under `postgres` → `Schemas` → `public`.
3. Hvor mange tabeller ligger der? (Svaret er 0 — databasen `postgres` er tom og finnes bare fordi PostgreSQL må ha én database å starte i. Din egen database lager du i hefte 2.)
4. **[Investigate]** Klikk på `postgres`-databasen, og velg fanen **Properties** til høyre. Finn ut hvem som eier databasen, og hvilken tegnkoding (encoding) den bruker.
5. **[Investigate]** Høyreklikk på serveren **PostgreSQL 18** og velg **Properties → Connection**. Hvilket vertsnavn (host) og hvilken port står det? Hvorfor står det `localhost`?

Legg merke til navnene i treet. Ordet **database** brukes om to forskjellige ting i dagligtale, og det skaper mye forvirring:

| Ord | Betydning her |
|---|---|
| Databaseserver | Hele PostgreSQL-installasjonen. Én per maskin. |
| Database | Én samling tabeller inne på serveren. Du kan ha mange. |
| Skjema (schema) | En mappe inne i en database. Standardmappa heter `public`. |
| Tabell | Selve rutenettet med rader og kolonner. |

> **💡 Tips:** Ser du ikke noe du nettopp har laget? Høyreklikk på mappa i treet og velg **Refresh…**. pgAdmin oppdaterer ikke alltid treet av seg selv, og dette er den vanligste kilden til «men den er jo ikke der!» resten av året.

---

## 1.4 Sjekk at alt virker

Det siste du gjør i dag, er å kontrollere at serveren faktisk svarer. Verktøyet du bruker til å sende kommandoer, heter **Query Tool**.

1. Klikk på databasen `postgres` slik at den er markert.
2. Velg **Tools → Query Tool** i menyen øverst (eller høyreklikk på databasen → **Query Tool**).
3. Skriv inn linja under, og kjør den med **F5** eller den blå ▶-knappen:

```sql
SELECT version();
```

4. **[Predict]** Hva tror du kommer ut?
5. **[Run]** Kjør spørringen. Nederst dukker resultatet opp i fanen **Data Output**. Der står hvilken PostgreSQL-versjon du kjører, og hvilket operativsystem den er bygget for. Ser du denne linja, er installasjonen i orden.

Prøv noen kommandoer til, som en liten smakebit på hefte 2:

```sql
SELECT 3 * 7;
SELECT 'Hei fra databasen!';
SELECT 'God' || ' ' || 'morgen';
SELECT CURRENT_DATE;
```

6. **[Predict]** Gjett resultatet av alle fire **før** du kjører dem.
7. **[Run]** Query Tool viser bare resultatet av den siste kommandoen når du kjører flere samtidig — kjør derfor én og én linje ved å markere linja og trykke F5.
8. **[Investigate]** Prøv `SELECT 'Hei' + ' der';`. Du får en feilmelding. Les den. Hva sier den at problemet er?

I SQL limes tekst sammen med `||`, ikke med `+`. Feilmeldingen forteller deg det ganske presist, hvis du orker å lese den — og det er en vane du bør legge deg til allerede nå: **les feilmeldingen før du gjetter**.

9. **[Investigate]** Slett semikolonet på slutten av en kommando, og kjør på nytt. Virker det fortsatt? Semikolonet avslutter en kommando. Med bare én kommando i vinduet klarer PostgreSQL seg uten — men med flere er det livsviktig.

> **💡 Tips:** Enkle anførselstegn `'slik'` betyr tekst i SQL. Doble anførselstegn `"slik"` betyr navn på en tabell eller kolonne. Bytter du om på dem, får du feilmeldinger som ser helt uforståelige ut. Dette er den vanligste nybegynnerfeilen i hele faget.

---

## 1.5 Ordlista

Disse ordene bruker vi resten av året. Du trenger ikke pugge dem, men du bør kjenne dem igjen.

| Ord | Betyr |
|---|---|
| PostgreSQL | Databaseserveren — programmet som lagrer dataene |
| pgAdmin | Klienten — programmet du klikker i |
| Query Tool | Vinduet i pgAdmin der du skriver SQL |
| SQL | Språket du snakker med databasen i |
| `postgres` | Superbrukeren, og navnet på standarddatabasen |
| Port 5432 | «Dørnummeret» databasen lytter på |
| `localhost` | Din egen maskin |
| Database | En samling tabeller |
| Tabell | Rader og kolonner med data |
| Rad | Én ting — for eksempel ett spill |
| Kolonne | Én opplysning om alle tingene — for eksempel alle prisene |

---

## Oppgaver

### Del A — Forstå oppsettet

**Oppgave A1**

Svar med én til to setninger på hver:

a) Hva er forskjellen på PostgreSQL og pgAdmin?
b) Hvorfor holder det ikke å installere bare pgAdmin?
c) Hva er brukeren `postgres`, og hvorfor må du huske passordet til den?
d) Hva betyr `localhost`?
e) Hva er forskjellen på en database og en tabell?

**Oppgave A2 — Riktig eller galt**

Skriv R eller G, og rett opp de gale påstandene.

1. pgAdmin lagrer dataene dine.
2. Du kan ha flere databaser på én PostgreSQL-server.
3. Databasen `postgres` må slettes før du kan lage dine egne.
4. Port 5432 er standardporten for PostgreSQL.
5. Master password i pgAdmin er det samme som passordet til brukeren `postgres`.
6. Databasen kjører videre i bakgrunnen selv når pgAdmin er lukket.

### Del B — Utforsk

**Oppgave B1**

Finn fram i pgAdmin, og skriv ned svarene:

a) Hvilken versjon av PostgreSQL kjører du?
b) Hvilken versjon av pgAdmin bruker du? (Se **Help → About**.)
c) Hvor mange databaser finnes på serveren din akkurat nå, og hva heter de?
d) Hvilken tegnkoding (encoding) bruker databasen `postgres`?
e) Hvor på disken ligger datamappa? (Se **Properties** på serveren, eller mappa du valgte i steg 4.)

**Oppgave B2 — Er serveren i live?**

a) Åpne **Oppgavebehandling** i Windows (Ctrl + Shift + Esc), og let etter en prosess som heter `postgres`. Hvor mange finner du?
b) Lukk pgAdmin helt. Kjører prosessene fortsatt? Hva forteller det deg om forholdet mellom klient og server?
c) Åpne pgAdmin igjen, og kontroller at du fortsatt kommer til.

**Oppgave B3 — Smakebit på SQL**

Kjør disse i Query Tool, og skriv ned svaret på hver:

```sql
SELECT 100 - 58;
SELECT 'IM' || '-' || 'klassen';
SELECT CURRENT_DATE;
SELECT CURRENT_DATE + 100;
SELECT length('informasjonsteknologi');
```

Forklar med egne ord hva den siste linja gjør.

### Del C — Feilsøking

**Oppgave C1**

Fire elever sitter fast. Forklar hva som mest sannsynlig er galt, og hva de skal gjøre.

a) «pgAdmin spør meg om et passord jeg aldri har sett før.»
b) «Jeg får `connection refused` når jeg klikker på serveren.»
c) «Jeg skrev `SELECT "Hei";` og fikk `column "Hei" does not exist`.»
d) «Jeg lagde noe, men det vises ikke i treet til venstre.»

**Oppgave C2 — Skriv din egen bruksanvisning**

Skriv en kortfattet oppskrift på maks én side som en medelev kan følge for å installere PostgreSQL og pgAdmin fra bunnen av. Den skal ha nummererte steg, og minst tre advarsler om ting som lett går galt. Bytt oppskrift med en medelev, og se om dere klarer å følge hverandres.

---

## Egenvurdering

- [ ] Jeg har PostgreSQL og pgAdmin installert.
- [ ] Jeg vet forskjellen på databaseserveren og klienten.
- [ ] Jeg husker passordet til brukeren `postgres`.
- [ ] Jeg finner fram i trestrukturen i pgAdmin.
- [ ] Jeg vet hva Query Tool er, og hvordan jeg kjører en kommando.
- [ ] `SELECT version();` gir meg et svar.
- [ ] Jeg vet forskjellen på enkle og doble anførselstegn i SQL.

---

## Et glimt av hefte 2

Nå har du en tom database og et verktøy. I neste hefte lager du din egen database, din egen tabell, og fyller den med data:

```sql
CREATE TABLE spill (
    id SERIAL PRIMARY KEY,
    tittel VARCHAR(100) NOT NULL,
    pris NUMERIC(6,2)
);

INSERT INTO spill (tittel, pris) VALUES ('Celeste', 219.00);

SELECT * FROM spill;
```

Deretter lærer du de fire kommandoene som all databasebruk i hele verden bygger på — å opprette, lese, endre og slette data. De kalles **CRUD**, og de er tema for hele hefte 2.

---

*Hefte 1 av serien «Databaser fra bunnen av». Neste hefte: Din første database, tabeller og CRUD.*
