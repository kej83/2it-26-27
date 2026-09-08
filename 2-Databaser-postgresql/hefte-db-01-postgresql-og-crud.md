# Kapittel 1: PostgreSQL, pgAdmin og CRUD

*Databaser fra bunnen av — hefte 1 i serien. Et opplegg for tre skoletimer: du installerer databasen, lager din egen database, og øver på de fire grunnoperasjonene.*

---

## Slik jobber du med dette heftet

Du jobber på samme måte som i JavaScript- og HTML-heftene. Hvert delkapittel starter med litt kode eller et skjermbilde, og du følger stegene:

| Steg | Hva du gjør |
|---|---|
| **Predict** | Les koden, og forutsi hva som skjer. Skriv gjerne ned gjettet ditt, eller si det høyt til sidemannen. |
| **Run** | Skriv av koden, og kjør den. Forklar avvik mellom det du trodde og det som faktisk skjedde. |
| **Investigate** | Gjør små endringer — bytt en verdi, fjern et ord — forutsi på nytt, og kjør igjen. |
| **Modify** | Gjør større endringer. Utvid, eller lag noe liknende. |
| **Make** | Lag ditt helt eget. Dette skjer i oppgavedelen bakerst. |

> **💡 Tips:** Gjett alltid på resultatet **før** du trykker kjør. Det er selve gjettingen som gjør at du lærer — ikke svaret.

En viktig forskjell fra JavaScript: her jobber du mot en **ekte database som husker**. Alt du gjør blir liggende. Det betyr at feil kan gjøre reell skade — og at du kan komme tilbake til dataene dine neste uke. Begge deler er en del av det å lære databaser.

### Timeplan

| Tid | Innhold |
|---|---|
| Time 1 | 1.1–1.5: Hva en database er, installasjon, første møte med pgAdmin, lage database |
| Time 2 | 1.6–1.9: Tabeller, datatyper, INSERT og SELECT |
| Time 3 | 1.10–1.14: UPDATE, DELETE, NULL, regler — og oppgavedelen |

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

Dette er samme oppdeling som nettleser og nettsted: pgAdmin er «nettleseren», PostgreSQL er «serveren». Du kan bytte ut pgAdmin med et annet verktøy uten at dataene merker noe.

Dataene ligger i **tabeller**, som ligner regnearket du kjenner:

| id | tittel | sjanger | pris |
|---|---|---|---|
| 1 | Stardew Valley | Simulator | 149.00 |
| 2 | Celeste | Plattform | 219.00 |

- En **rad** er én ting — ett spill.
- En **kolonne** er én opplysning om alle tingene — alle prisene.
- Hver kolonne har en fast **datatype**. Kolonnen `pris` kan bare inneholde tall. Prøver du å legge inn `"billig"`, sier databasen nei. Dette er en stor forskjell fra JavaScript, som gjerne lar deg lagre hva som helst hvor som helst — og oppdager rotet først når noe krasjer.

Språket vi snakker med databasen i, heter **SQL** (uttales «ess-ku-ell» eller «síkvel»).

3. Se på tabellen ovenfor. Hvilken datatype burde kolonnen `sjanger` ha? Og hva med en kolonne `utgitt` som skal inneholde en utgivelsesdato?
4. Skriv ned tre opplysninger til som ville vært naturlige å ha om et spill. Du får bruk for dem senere i heftet.

---

## 1.2 Installere PostgreSQL og pgAdmin

Du installerer begge deler på én gang, med installasjonsprogrammet fra postgresql.org. Regn med 15–20 minutter. Følg stegene nøyaktig, og les hvert skjermbilde før du klikker videre — det er god trening i seg selv.

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

**Sjekkliste — du er ferdig når du kan svare ja på alle fire:**

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

1. Klikk på pila ved siden av **PostgreSQL 18**. Du blir bedt om passordet du valgte i steg 5. Skriv det inn, og huk av for at pgAdmin skal huske det.
2. Klapp deg nedover i treet til du finner **Tables** under `postgres` → `Schemas` → `public`. **[Run]**
3. Hvor mange tabeller ligger der? (Svaret er 0 — databasen `postgres` er tom og finnes bare fordi PostgreSQL må ha én database å starte i.)
4. **[Investigate]** Klikk på `postgres`-databasen, og velg fanen **Properties** til høyre. Finn ut hvem som eier databasen, og hvilken tegnkoding (encoding) den bruker.

Legg merke til navnene i treet. Ordet **database** brukes om to forskjellige ting i dagligtale, og det skaper mye forvirring:

| Ord | Betydning her |
|---|---|
| Databaseserver | Hele PostgreSQL-installasjonen. Én per maskin. |
| Database | Én samling tabeller inne på serveren. Du kan ha mange. |
| Skjema (schema) | En mappe inne i en database. Standardmappa heter `public`. |
| Tabell | Selve rutenettet med rader og kolonner. |

---

## 1.4 Lag din første database — med musa

Nå skal du lage databasen du skal jobbe i resten av dagen: et spillbibliotek.

1. Høyreklikk på **Databases** i treet, og velg **Create → Database…**
2. I feltet **Database** skriver du `spillbibliotek`. La `Owner` stå til `postgres`.
3. **Før du lagrer:** klikk på fanen **SQL** øverst i dialogboksen. **[Predict]** Hva tror du står der?

Der ligger hemmeligheten bak hele pgAdmin:

```sql
CREATE DATABASE spillbibliotek
    WITH
    OWNER = postgres
    ENCODING = 'UTF8';
```

Alt du klikker deg til i pgAdmin, blir oversatt til SQL. Museklikkene er bare en snarvei — det er dette som faktisk sendes til serveren. Derfor kan du bruke SQL-fanen som en gratis fasit hver gang du er usikker på hvordan en kommando skrives.

4. Klikk **Save**. Databasen `spillbibliotek` dukker opp i treet. **[Run]**
5. **[Investigate]** Prøv å lage en database til, med navnet `Spill Bibliotek` (med stor forbokstav og mellomrom). Se på SQL-fanen. Hva skjedde med navnet?

Legg merke til de doble anførselstegnene rundt navnet. Databasenavn med mellomrom eller store bokstaver må siteres hver eneste gang du bruker dem senere — derfor bruker profesjonelle utviklere alltid **små bokstaver og understrek**: `spillbibliotek`, `spill_utgiver`, `min_tabell`.

6. Slett den nye databasen igjen: høyreklikk på den → **Delete**. Bekreft.

> **💡 Tips:** Ser du ikke den nye databasen? Høyreklikk på **Databases** og velg **Refresh…**. pgAdmin oppdaterer ikke alltid treet av seg selv, og dette er den vanligste kilden til «men den er jo ikke der!» resten av dagen.

---

## 1.5 Query Tool — der du skriver SQL

Klikking er greit for å lage ting én gang. Men SQL er språket du faktisk skal lære, og det skriver du i **Query Tool**.

1. Klikk på databasen `spillbibliotek` slik at den er markert.
2. Velg **Tools → Query Tool** i menyen øverst (eller høyreklikk på databasen → **Query Tool**).

> **⚠️ Merk:** Query Tool er alltid koblet til **én bestemt database** — den du hadde markert. Står det `postgres` i fanenavnet, lager du tabellene dine på feil sted. Sjekk dette hver gang du åpner et nytt vindu.

Skriv inn koden, og kjør den med **F5** eller den blå ▶-knappen:

```sql
SELECT version();
```

1. **[Predict]** Hva tror du kommer ut?
2. **[Run]** Kjør spørringen. Nederst dukker resultatet opp i fanen **Data Output**. Der står hvilken PostgreSQL-versjon du kjører.
3. **[Investigate]** Slett semikolonet på slutten, og kjør på nytt. Virker det fortsatt?

Semikolonet avslutter en kommando. Med bare én kommando i vinduet klarer PostgreSQL seg uten — men med flere er det livsviktig. Prøv:

```sql
SELECT 3 * 7;
SELECT 'Hei fra databasen!';
SELECT 'God' || ' ' || 'morgen';
SELECT 10 / 3;
SELECT 10.0 / 3;
```

4. **[Predict]** Gjett resultatet av alle fem **før** du kjører. Skriv gjettene ned.
5. **[Run]** Merk alle fem linjene og kjør. Query Tool viser bare resultatet av den **siste** kommandoen — kjør derfor én og én linje ved å markere den og trykke F5.
6. Forklar forskjellen på svaret fra `10 / 3` og `10.0 / 3`.

Der møtte du datatypene for første gang. `10` er et heltall, og heltall delt på heltall gir heltall i SQL — resten kastes. `10.0` er et desimaltall, og da beholdes desimalene. Denne oppførselen er kilden til utallige feil i ekte systemer.

7. **[Investigate]** Prøv `SELECT 'Hei' + ' der';`. Du får en feilmelding. Les den. Hva sier den at problemet er?

I SQL limes tekst sammen med `||`, ikke med `+`. Feilmeldingen forteller deg det ganske presist, hvis du orker å lese den — og det er en vane du bør legge deg til nå: **les feilmeldingen før du gjetter**.

> **💡 Tips:** Enkle anførselstegn `'slik'` betyr tekst i SQL. Doble anførselstegn `"slik"` betyr navn på en tabell eller kolonne. Bytter du om på dem, får du feilmeldinger som ser helt uforståelige ut.
---

## 1.6 Din første tabell — først med musa, så med SQL

En database uten tabeller er en tom perm. Nå lager du tabellen `spill`, og du lager den **to ganger**: én gang ved å klikke, og én gang med SQL. Poenget er at du skal se at det er nøyaktig det samme.

### Med musa

1. Åpne `spillbibliotek` → `Schemas` → `public` i treet.
2. Høyreklikk på **Tables** → **Create → Table…**
3. Fanen **General**: skriv `spill` i feltet **Name**.
4. Fanen **Columns**: klikk **+** for hver kolonne, og fyll inn:

| Name | Data type | Length/Precision | Not NULL | Primary key |
|---|---|---|---|---|
| `id` | serial | | ja | ja |
| `tittel` | character varying | 100 | ja | nei |
| `pris` | numeric | 6, 2 | nei | nei |

5. **[Predict]** Før du lagrer: klikk på fanen **SQL**. Hva tror du står der nå?
6. **[Run]** Les SQL-en. Klikk deretter **Save**.

### Med SQL

7. Slett tabellen igjen: høyreklikk på `spill` → **Delete**. (Legg merke til at pgAdmin advarer deg. Det burde den.)
8. Åpne Query Tool på `spillbibliotek`, og skriv:

```sql
CREATE TABLE spill (
    id SERIAL PRIMARY KEY,
    tittel VARCHAR(100) NOT NULL,
    sjanger VARCHAR(40),
    utgitt DATE,
    pris NUMERIC(6,2),
    vurdering SMALLINT,
    flerspiller BOOLEAN DEFAULT false,
    beskrivelse TEXT
);
```

9. **[Run]** Kjør kommandoen. Nederst står det `CREATE TABLE`. Høyreklikk på **Tables** i treet → **Refresh**, og se at tabellen dukker opp.

Les kommandoen linje for linje:

| Linje | Hva den betyr |
|---|---|
| `CREATE TABLE spill (` | Lag en tabell som heter `spill`. Alt inni parentesen er kolonnene. |
| `id SERIAL PRIMARY KEY` | Et heltall som databasen teller opp helt av seg selv, og som er radens unike ID. |
| `tittel VARCHAR(100) NOT NULL` | Tekst på maks 100 tegn. `NOT NULL` betyr at feltet **må** fylles ut. |
| `sjanger VARCHAR(40)` | Tekst på maks 40 tegn. Kan stå tom. |
| `utgitt DATE` | En dato. Ikke tekst som *ser ut som* en dato — en ekte dato. |
| `pris NUMERIC(6,2)` | Et tall med totalt 6 siffer, hvorav 2 bak komma. Altså opptil `9999.99`. |
| `vurdering SMALLINT` | Et lite heltall. |
| `flerspiller BOOLEAN DEFAULT false` | Sant eller usant. Sier du ingenting, blir det `false`. |
| `beskrivelse TEXT` | Tekst uten lengdegrense. |

10. **[Investigate]** Kjør kommandoen én gang til. Hva sier feilmeldingen?
11. **[Investigate]** Kjør `DROP TABLE spill;` og deretter `CREATE TABLE`-kommandoen på nytt. `DROP` sletter hele tabellen med alt innhold — den er en av de farligste kommandoene i SQL.

> **💡 Tips:** Ta vare på `CREATE TABLE`-kommandoen i en tekstfil, for eksempel `spillbibliotek.sql`. Da kan du bygge opp igjen hele databasen på ti sekunder hvis noe går galt — og det kommer til å gjøre det.

---

## 1.7 Datatyper — hjertet i en database

Dette er delkapittelet du får mest igjen for å forstå ordentlig. Datatypen bestemmer hva som kan lagres, hvor mye plass det tar, og hva du kan gjøre med verdien etterpå.

### De vanligste typene

| Type | Brukes til | Eksempel på verdi |
|---|---|---|
| `SMALLINT` | Små heltall, −32 768 til 32 767 | `7` |
| `INTEGER` | Heltall, ca. ±2,1 milliarder. Standardvalget. | `2026` |
| `BIGINT` | Svært store heltall | `9000000000` |
| `SERIAL` | `INTEGER` som teller seg selv oppover. Brukes til ID-er. | `1`, `2`, `3`… |
| `NUMERIC(p,s)` | Eksakte desimaltall. `p` = antall siffer i alt, `s` = antall bak komma. **Brukes alltid til penger.** | `299.50` |
| `REAL` / `DOUBLE PRECISION` | Tilnærmede desimaltall. Raskt, men unøyaktig. Til måledata. | `3.14159` |
| `VARCHAR(n)` | Tekst med en øvre grense | `'Stardew Valley'` |
| `CHAR(n)` | Tekst med fast lengde, fylles ut med mellomrom | `'NO '` |
| `TEXT` | Tekst uten grense | `'En lang beskrivelse…'` |
| `BOOLEAN` | Sant eller usant | `true` |
| `DATE` | Dato | `'2024-02-16'` |
| `TIME` | Klokkeslett | `'18:30'` |
| `TIMESTAMP` | Dato og klokkeslett | `'2024-02-16 18:30:00'` |
| `INTERVAL` | Et tidsrom | `'3 days'` |

### Undersøk typene selv

Kjør disse i Query Tool, én og én. **Gjett først.** **[Predict]**

```sql
SELECT 0.1::NUMERIC + 0.2::NUMERIC;
SELECT 0.1::DOUBLE PRECISION + 0.2::DOUBLE PRECISION;
SELECT 123456789.5::REAL;
```

1. Hva ble forskjellen på de to første? `::` betyr «regn dette som denne typen». `DOUBLE PRECISION` lagrer tall på samme måte som JavaScript gjør, og 0,1 kan ikke skrives eksakt i totallsystemet. Derfor får du `0.30000000000000004` — nøyaktig samme rare svar som `0.1 + 0.2` ga deg i JavaScript. Den tredje linja viser `REAL`, som har enda færre siffer å gå på: tallet kommer ut avrundet.
2. Hvorfor er dette en katastrofe i en nettbutikk med en million ordrer? Hvilken type må du derfor bruke på `pris`?

```sql
SELECT 7 / 2;
SELECT 7.0 / 2;
SELECT 7 % 2;
```

3. **[Investigate]** Forklar alle tre svarene. `%` gir resten etter divisjon — den kjenner du fra JavaScript.

```sql
SELECT octet_length('Spill'::CHAR(10)) AS char_plass,
       octet_length('Spill'::VARCHAR(10)) AS varchar_plass;
SELECT 'Spill '::VARCHAR(10) = 'Spill' AS med_mellomrom;
```

4. Ordet `Spill` er fem tegn langt. Hvorfor tar det likevel 10 byte som `CHAR(10)`? `CHAR` fyller alltid ut til full lengde med mellomrom, mens `VARCHAR` lagrer bare det du skrev. Og som den andre linja viser: et mellomrom på slutten er et helt ekte tegn som ødelegger sammenligninger. Dette er grunnen til at `CHAR` nesten aldri brukes.

```sql
SELECT true AND false;
SELECT true OR false;
SELECT 'ja'::BOOLEAN;
SELECT 'yes'::BOOLEAN;
SELECT 't'::BOOLEAN;
SELECT 1::BOOLEAN;
```

5. **[Predict]** Hvilke av disse tror du virker? Kjør, og finn ut. Norsk `'ja'` godtas ikke — `BOOLEAN` forstår `true/false`, `t/f`, `yes/no`, `y/n`, `on/off` og `1/0`.

```sql
SELECT '2024-02-16'::DATE;
SELECT '16.02.2024'::DATE;
SELECT CURRENT_DATE;
SELECT CURRENT_DATE - '2024-02-16'::DATE;
SELECT CURRENT_DATE + INTERVAL '30 days';
```

6. **[Run]** Kjør alle fem. Den nest siste gir deg et **tall** — antall dager mellom to datoer. Hadde datoen vært lagret som tekst, hadde dette vært umulig. Linje 2 kan gi feilmeldingen `date/time field value out of range`: om `16.02.2024` forstås, avhenger av hvilket datoformat serveren er satt opp med (`SHOW datestyle;` viser det). Nettopp derfor skriver du alltid datoer på ISO-formen `ÅÅÅÅ-MM-DD`, som forstås overalt.
7. **[Investigate]** Hva skjer med `'2024-02-30'::DATE`? Og med `'2024-13-01'::DATE`? Databasen kontrollerer at datoen faktisk finnes. Det gjør ikke en tekstkolonne.

> **⚠️ Merk:** Den vanligste nybegynnerfeilen er å lagre alt som `TEXT`. Det virker fint — helt til du skal sortere priser (og `1000` kommer før `99` fordi tekst sorteres bokstav for bokstav), regne ut alder, eller finne alt som ble utgitt i fjor. Riktig datatype er ikke pirk; det er halve poenget med en database.

8. **[Modify]** Lag en tabell `typetest` med én kolonne av hver av typene `SMALLINT`, `VARCHAR(5)`, `NUMERIC(4,2)` og `BOOLEAN`. Prøv deretter å legge inn verdier som *ikke* passer: tallet 40000 i `SMALLINT`, teksten `'PostgreSQL'` i `VARCHAR(5)`, tallet `199.99` i `NUMERIC(4,2)`. Noter feilmeldingen du får hver gang — du kommer til å se dem igjen.

---

## 1.8 CREATE — legg inn data med INSERT

Nå begynner CRUD. Bokstavene står for de fire tingene du kan gjøre med data:

| Bokstav | Betyr | SQL |
|---|---|---|
| **C** | Create — opprette | `INSERT` |
| **R** | Read — lese | `SELECT` |
| **U** | Update — endre | `UPDATE` |
| **D** | Delete — slette | `DELETE` |

```sql
INSERT INTO spill (tittel, sjanger, utgitt, pris, vurdering, flerspiller)
VALUES ('Stardew Valley', 'Simulator', '2016-02-26', 149.00, 9, true);
```

1. **[Predict]** Hva skjer med kolonnene `id` og `beskrivelse`, som ikke er nevnt?
2. **[Run]** Kjør kommandoen. Meldingen `INSERT 0 1` betyr at én rad ble lagt inn.
3. **[Run]** Se på dataene: høyreklikk på tabellen `spill` → **View/Edit Data → All Rows**. Hvilken `id` fikk raden? Hva står i `beskrivelse`?

`id` fylles ut av `SERIAL` helt automatisk. `beskrivelse` ble stående tom — den har verdien **NULL**, som betyr «ingen verdi». Mer om NULL i 1.12.

Du kan legge inn mange rader på én gang:

```sql
INSERT INTO spill (tittel, sjanger, utgitt, pris, vurdering, flerspiller) VALUES
('Celeste',          'Plattform',  '2018-01-25', 219.00, 10, false),
('Minecraft',        'Sandkasse',  '2011-11-18', 299.00,  8, true),
('Rocket League',    'Sport',      '2015-07-07',   0.00,  7, true),
('Hades',            'Rogue-like', '2020-09-17', 249.50,  9, false),
('Counter-Strike 2', 'Skytespill', '2023-09-27',   0.00,  8, true),
('Portal 2',         'Puslespill', '2011-04-19',  99.00, 10, true),
('Hollow Knight',    'Plattform',  '2017-02-24', 159.00,  9, false);
```

4. **[Run]** Kjør, og kontroller at det står `INSERT 0 7`.
5. **[Investigate]** Prøv denne:

```sql
INSERT INTO spill (sjanger, pris) VALUES ('Strategi', 199.00);
```

Les feilmeldingen. Hvilken regel fra `CREATE TABLE` er det som stopper deg?

6. **[Investigate]** Prøv å legge inn et spill der du bytter om rekkefølgen på verdiene, slik at prisen havner i `tittel`. Hva sier databasen?
7. **[Investigate]** Prøv `INSERT INTO spill (tittel, pris) VALUES ('Testspill', 12345.67);`. `NUMERIC(6,2)` har plass til 6 siffer i alt — fire foran komma og to bak. Hva blir resultatet?
8. **[Modify]** Legg inn tre spill du selv liker, med riktige datoer og priser. Sjekk etterpå at alt ser riktig ut i **View/Edit Data**.

> **🐞 Når noe går galt:** `relation "spill" does not exist` betyr nesten alltid at Query Tool er koblet til feil database. Se øverst i fanen. Åpne et nytt Query Tool fra `spillbibliotek`.

---

## 1.9 READ — hent data med SELECT

`SELECT` er kommandoen du kommer til å bruke tusenvis av ganger.

```sql
SELECT * FROM spill;
```

1. **[Predict]** Hva betyr stjerna?
2. **[Run]** Kjør. Du får hele tabellen.

```sql
SELECT tittel, pris FROM spill;
SELECT tittel, pris FROM spill WHERE pris < 200;
SELECT tittel, pris FROM spill WHERE pris < 200 ORDER BY pris;
SELECT tittel, pris FROM spill WHERE pris < 200 ORDER BY pris DESC;
SELECT tittel FROM spill ORDER BY vurdering DESC LIMIT 3;
```

3. **[Predict]** Gjett hvor mange rader hver av de fem spørringene gir, **før** du kjører.
4. **[Run]** Kjør dem én for én, og sammenlign med gjettene dine.

En `SELECT` er bygget opp av deler som alltid kommer i denne rekkefølgen:

| Del | Betyr | Valgfri? |
|---|---|---|
| `SELECT tittel, pris` | hvilke **kolonner** du vil se | nei |
| `FROM spill` | hvilken **tabell** | nei |
| `WHERE pris < 200` | hvilke **rader** | ja |
| `ORDER BY pris DESC` | **sortering** (`DESC` = synkende) | ja |
| `LIMIT 3` | hvor **mange** rader | ja |

5. **[Investigate]** Bytt om på `ORDER BY` og `WHERE`, slik at `ORDER BY` kommer først. Kjør. Rekkefølgen på delene er ikke valgfri.

### Vilkår i WHERE

```sql
SELECT * FROM spill WHERE sjanger = 'Plattform';
SELECT * FROM spill WHERE pris = 0;
SELECT * FROM spill WHERE pris BETWEEN 100 AND 250;
SELECT * FROM spill WHERE flerspiller = true;
SELECT * FROM spill WHERE tittel LIKE 'H%';
SELECT * FROM spill WHERE tittel ILIKE '%knight%';
SELECT * FROM spill WHERE sjanger IN ('Sport', 'Skytespill');
SELECT * FROM spill WHERE vurdering >= 9 AND pris < 200;
SELECT * FROM spill WHERE beskrivelse IS NULL;
```

6. **[Run]** Kjør alle ni, og noter hvor mange rader hver gir.
7. **[Investigate]** Hva er forskjellen på `LIKE` og `ILIKE`? Prøv `LIKE '%knight%'` og se.
8. `%` betyr «hva som helst, null eller flere tegn». Skriv en spørring som finner alle spill med bokstaven `a` i tittelen.
9. **[Investigate]** Prøv `WHERE sjanger = 'plattform'` med liten p. Ingen treff — sammenligning av tekst skiller mellom store og små bokstaver.

### Regne på dataene

```sql
SELECT COUNT(*) FROM spill;
SELECT AVG(pris) FROM spill;
SELECT ROUND(AVG(pris), 2) AS snittpris FROM spill;
SELECT MIN(pris), MAX(pris), SUM(pris) FROM spill;
SELECT sjanger, COUNT(*) AS antall FROM spill GROUP BY sjanger ORDER BY antall DESC;
```

10. **[Predict]** Hva tror du den siste linja gjør?
11. **[Run]** Kjør alle fem. `AS` gir kolonnen et penere navn i resultatet.
12. **[Modify]** Skriv en spørring som viser gjennomsnittsprisen **per sjanger**, sortert fra dyrest til billigst.
13. **[Modify]** Skriv en spørring som viser tittel og pris for de tre dyreste spillene.

> **💡 Tips:** `SELECT` endrer aldri noe. Du kan kjøre den så mange ganger du vil, uten risiko. Det er derfor du alltid bør teste `WHERE`-delen din med en `SELECT` **før** du bruker den samme `WHERE` i en `UPDATE` eller `DELETE`. Denne vanen er forskjellen på en rolig og en dramatisk arbeidsdag.
---

## 1.10 UPDATE — endre data som allerede ligger der

Spillet Hades settes ned til 99 kroner.

```sql
UPDATE spill
SET pris = 99.00
WHERE tittel = 'Hades';
```

1. **[Predict]** Hvor mange rader blir endret?
2. **[Run]** Kjør, og les meldingen: `UPDATE 1`. Kontroller med `SELECT * FROM spill WHERE tittel = 'Hades';`

Du kan endre flere kolonner samtidig, og du kan regne ut den nye verdien fra den gamle:

```sql
UPDATE spill
SET pris = 0, sjanger = 'Gratis'
WHERE tittel = 'Rocket League';

UPDATE spill
SET pris = pris * 0.8
WHERE sjanger = 'Plattform';
```

3. **[Predict]** Hva gjør den siste kommandoen? Hvor mange rader treffer den?
4. **[Run]** Kjør begge, og kontroller resultatet med en `SELECT`.

### Den dyreste feilen i SQL

Nå skal du gjøre en feil med vilje, i trygge omgivelser. Lag først en kopi av tabellen:

```sql
CREATE TABLE spill_kopi AS SELECT * FROM spill;
```

5. **[Predict]** Hva tror du denne kommandoen gjør med kopien?

```sql
UPDATE spill_kopi SET pris = 0;
```

6. **[Run]** Kjør den, og se på meldingen. Kjør deretter `SELECT * FROM spill_kopi;`

Alle radene ble endret. Uten `WHERE` gjelder en `UPDATE` **hele tabellen**, og det finnes ingen angreknapp. Slik forsvinner ekte data i ekte bedrifter, hver eneste uke, over hele verden.

7. Slett kopien: `DROP TABLE spill_kopi;`

> **⚠️ Merk — arbeidsvanen som redder deg:** Skriv alltid spørringen som en `SELECT` først.
>
> ```sql
> SELECT * FROM spill WHERE tittel = 'Hades';   -- 1. sjekk hvilke rader du treffer
> UPDATE spill SET pris = 99 WHERE tittel = 'Hades';  -- 2. bytt SELECT * ut med SET
> ```

8. **[Modify]** Sett prisen på alle spill med vurdering under 8 ned med 25 %. Bruk `SELECT` først for å se hvilke rader det gjelder.
9. **[Modify]** Skriv en `UPDATE` som fyller ut `beskrivelse` på Portal 2 med en setning du finner på selv.

---

## 1.11 DELETE — fjerne rader

```sql
DELETE FROM spill WHERE tittel = 'Testspill';
```

1. **[Run]** Kjør, og les meldingen. Fikk du `DELETE 1` eller `DELETE 0`? Hva betyr `DELETE 0`?
2. **[Investigate]** Kjør den samme kommandoen en gang til. Du får ingen feilmelding — å slette noe som ikke finnes, er helt lovlig i SQL.

Tre kommandoer som ligner, men gjør helt forskjellige ting:

| Kommando | Hva som skjer | Er tabellen der etterpå? |
|---|---|---|
| `DELETE FROM spill WHERE id = 3;` | Sletter én rad | ja |
| `DELETE FROM spill;` | Sletter **alle** radene | ja, men tom |
| `DROP TABLE spill;` | Sletter hele tabellen med kolonner og alt | nei |

3. **[Predict]** Hva tror du skjer med `id`-telleren hvis du sletter alle radene og legger inn nye? Test det på en kopi (`CREATE TABLE spill_kopi AS SELECT * FROM spill;` — men merk at kopien ikke får med seg `SERIAL`).
4. **[Modify]** Slett alle spill som er gratis. Bruk `SELECT` først.
5. **[Modify]** Legg inn igjen spillene du slettet. Hvilke `id`-er får de nå?

> **💡 Tips:** ID-numre som er brukt, kommer aldri tilbake. Det er meningen: en ID skal peke på én bestemt rad for all fremtid, også etter at raden er slettet. Hull i nummerrekka er ikke en feil.

---

## 1.12 NULL — verdien som ikke er en verdi

`NULL` betyr «vi vet ikke» eller «ikke oppgitt». Det er ikke det samme som 0, og ikke det samme som tom tekst.

```sql
INSERT INTO spill (tittel, sjanger, pris) VALUES ('Ukjent spill', 'Ukjent', NULL);

SELECT * FROM spill WHERE pris = NULL;
SELECT * FROM spill WHERE pris IS NULL;
SELECT * FROM spill WHERE pris IS NOT NULL;
SELECT NULL = NULL;
SELECT COUNT(*), COUNT(pris) FROM spill;
SELECT AVG(pris) FROM spill;
```

1. **[Predict]** Hvor mange rader tror du hver av de tre første spørringene gir?
2. **[Run]** Kjør alle seks.
3. **[Investigate]** Hvorfor gir `WHERE pris = NULL` null rader, mens `IS NULL` fungerer?

Fordi `NULL` betyr «ukjent», og to ukjente verdier kan ikke sies å være like. `SELECT NULL = NULL;` gir derfor verken sant eller usant, men `NULL`. Derfor finnes de egne ordene `IS NULL` og `IS NOT NULL`.

4. **[Investigate]** Se på `COUNT(*)` og `COUNT(pris)`. Hvorfor er tallene forskjellige? Og hva gjør `AVG` med rader som mangler pris?
5. **[Modify]** Prøv `SELECT tittel, COALESCE(pris, 0) AS pris FROM spill;`. Hva gjør `COALESCE`?
6. **[Modify]** Rydd opp: gi «Ukjent spill» prisen 0, eller slett raden.

---

## 1.13 Regler som beskytter dataene

Databasen kan nekte å ta imot data som ikke gir mening. Disse reglene kalles **constraints**, og de er grunnen til at data i en database holder seg ryddigere enn data i et regneark.

```sql
CREATE TABLE spiller (
    id SERIAL PRIMARY KEY,
    brukernavn VARCHAR(20) UNIQUE NOT NULL,
    epost VARCHAR(100),
    nivaa INTEGER DEFAULT 1 CHECK (nivaa BETWEEN 1 AND 100),
    registrert DATE DEFAULT CURRENT_DATE,
    aktiv BOOLEAN DEFAULT true
);
```

1. **[Predict]** Les tabellen. Hvilke fire regler ser du, og hva beskytter hver av dem mot?
2. **[Run]** Lag tabellen.

| Regel | Betyr |
|---|---|
| `PRIMARY KEY` | Unik ID for raden. Kan ikke være NULL, og kan ikke gjentas. |
| `NOT NULL` | Feltet må fylles ut. |
| `UNIQUE` | Verdien kan bare finnes én gang i hele kolonnen. |
| `DEFAULT` | Verdien som brukes hvis du ikke oppgir noe. |
| `CHECK` | Din egen regel om hva som er lov. |

3. **[Run]** Legg inn to spillere:

```sql
INSERT INTO spiller (brukernavn, epost) VALUES ('mia_gg', 'mia@skolen.no');
INSERT INTO spiller (brukernavn, nivaa) VALUES ('jonas99', 42);
```

Kjør `SELECT * FROM spiller;`. Hvilke verdier fylte databasen ut selv?

4. **[Investigate]** Prøv disse fire, én for én. Tre av dem skal feile. Les feilmeldingene, og forklar hvilken regel som stoppet deg:

```sql
INSERT INTO spiller (brukernavn) VALUES ('mia_gg');
INSERT INTO spiller (epost) VALUES ('nn@skolen.no');
INSERT INTO spiller (brukernavn, nivaa) VALUES ('sara', 250);
INSERT INTO spiller (brukernavn, nivaa) VALUES ('ali', 100);
```

5. **[Modify]** Legg til en `CHECK`-regel på `spill`-tabellen som hindrer negative priser:

```sql
ALTER TABLE spill ADD CONSTRAINT pris_ikke_negativ CHECK (pris >= 0);
```

Test at den virker ved å prøve å legge inn et spill til −50 kroner.

6. **[Modify]** Legg til en kolonne `antall_solgt INTEGER DEFAULT 0` i `spill` med `ALTER TABLE spill ADD COLUMN …`. Sjekk i treet at kolonnen dukket opp.

> **💡 Tips:** Reglene skrives én gang, i tabellen, og gjelder for alle programmer som noen gang kobler seg til. Kontrollerer du i stedet dataene i JavaScript-koden din, gjelder kontrollen bare akkurat der — og det neste programmet, eller den neste utvikleren, ødelegger dataene med god samvittighet.

---

## 1.14 Sammendrag

### SQL-kortet

| Oppgave | Kommando |
|---|---|
| Lage database | `CREATE DATABASE navn;` |
| Lage tabell | `CREATE TABLE navn ( kolonne TYPE, … );` |
| Slette tabell | `DROP TABLE navn;` |
| Legge til kolonne | `ALTER TABLE navn ADD COLUMN kolonne TYPE;` |
| **C**reate | `INSERT INTO tabell (kol1, kol2) VALUES (v1, v2);` |
| **R**ead | `SELECT kol FROM tabell WHERE … ORDER BY … LIMIT …;` |
| **U**pdate | `UPDATE tabell SET kol = verdi WHERE …;` |
| **D**elete | `DELETE FROM tabell WHERE …;` |
| Telle / regne | `COUNT(*)`, `SUM()`, `AVG()`, `MIN()`, `MAX()`, `ROUND(x, 2)` |
| Gruppere | `SELECT kol, COUNT(*) FROM tabell GROUP BY kol;` |
| Manglende verdi | `IS NULL`, `IS NOT NULL`, `COALESCE(kol, erstatning)` |
| Tekstsøk | `LIKE 'A%'`, `ILIKE '%a%'` |

### De tre tingene som oftest går galt

1. Query Tool er koblet til feil database → `relation … does not exist`.
2. `UPDATE` eller `DELETE` uten `WHERE` → hele tabellen endres.
3. Doble anførselstegn brukt om tekst → `column "…" does not exist`. Tekst skal ha **enkle** anførselstegn.

---

## Oppgaver

Løs oppgavene i Query Tool på databasen `spillbibliotek`. Lagre alle spørringene dine i én fil, `oppgaver.sql`, med et kommentarfelt over hver oppgave:

```sql
-- Oppgave A1
SELECT tittel FROM spill;
```

### Del A — Enkle

**Oppgave A1 — Skriv spørringen**

Skriv én `SELECT` for hver av disse:

a) Alle kolonner for alle spill.
b) Bare titlene, sortert alfabetisk.
c) Alle spill som koster under 150 kr.
d) Alle spill utgitt etter 1. januar 2018.
e) Antall spill i tabellen.
f) De to spillene med høyest vurdering.

**Oppgave A2 — Hva blir resultatet?**

Skriv ned hva du tror hver spørring gir, **før** du kjører den. Kjør deretter, og noter avvik.

```sql
SELECT COUNT(*) FROM spill WHERE flerspiller = true;
SELECT tittel FROM spill WHERE pris = 0;
SELECT tittel, pris * 1.25 FROM spill LIMIT 3;
SELECT sjanger FROM spill WHERE tittel LIKE '%o%';
SELECT MAX(utgitt) FROM spill;
```

**Oppgave A3 — Finn feilen**

Alle fem har nøyaktig én feil. Finn den, forklar den med egne ord, og skriv den riktige kommandoen.

```sql
SELECT * FROM spill WHERE tittel = "Celeste";
SELECT tittel FROM spill ORDER pris;
INSERT INTO spill (tittel, pris) VALUE ('Tetris', 79.00);
UPDATE spill SET pris = 149 WHERE tittel = Hades;
DELETE * FROM spill WHERE id = 5;
```

**Oppgave A4 — Velg riktig datatype**

En ny tabell skal lagre opplysninger om e-sport-lag. Velg den mest presise datatypen for hver kolonne, og begrunn valget med én setning.

| Kolonne | Innhold | Datatype? |
|---|---|---|
| `lagnavn` | «Nordlys Esport» | |
| `stiftet` | 14. mars 2019 | |
| `antall_medlemmer` | 12 | |
| `premiepenger` | 45 250,50 kr | |
| `er_proff` | ja/nei | |
| `logo_url` | en lang nettadresse | |
| `motto` | en fritekst på flere setninger | |

**Oppgave A5 — Fyll ut skjelettet**

Erstatt hver `...` slik at kommandoene virker.

```sql
INSERT ... spill (tittel, sjanger, pris)
VALUES ('Undertale', 'Rollespill', ...);

SELECT tittel, vurdering
FROM ...
WHERE vurdering ... 8
ORDER BY vurdering ...;

UPDATE spill
... pris = 129
WHERE tittel ... 'Undertale';
```

### Del B — Middels

**Oppgave B1 — Riktig rekkefølge**

Kommandoene nedenfor bygger opp en ny tabell for utlån av spill, men de står i feil rekkefølge. Skriv dem i riktig rekkefølge, og kjør dem.

```sql
INSERT INTO utlaan (spill_tittel, laaner, laant_dato) VALUES ('Portal 2', 'Mia', CURRENT_DATE);
SELECT * FROM utlaan WHERE levert = false;
CREATE TABLE utlaan (
    id SERIAL PRIMARY KEY,
    spill_tittel VARCHAR(100) NOT NULL,
    laaner VARCHAR(50) NOT NULL,
    laant_dato DATE DEFAULT CURRENT_DATE,
    levert BOOLEAN DEFAULT false
);
UPDATE utlaan SET levert = true WHERE laaner = 'Mia';
```

**Oppgave B2 — En full CRUD-runde**

Bruk tabellen `utlaan` fra B1.

a) Legg inn fire utlån til, med forskjellige lånere og datoer.
b) Hent ut alle utlån som ikke er levert.
c) Marker to av dem som levert.
d) Finn ut hvor mange dager siden hvert utlån ble gjort. (`CURRENT_DATE - laant_dato`)
e) Slett alle utlån som er levert.
f) Tell hvor mange rader som er igjen.

**Oppgave B3 — Fra klikk til SQL**

Lag en tabell med navnet `turnering` ved å klikke deg gjennom **Create → Table…** i pgAdmin. Den skal ha kolonnene `id` (serial, primærnøkkel), `navn` (varchar 80, påkrevd), `dato` (date), `deltakere` (integer) og `premiepott` (numeric 8,2).

Kopier deretter innholdet i **SQL**-fanen inn i besvarelsen din, og forklar hver linje med egne ord. Bruk `DROP TABLE turnering;` og lag den på nytt med SQL for å kontrollere at du forsto den.

**Oppgave B4 — Forklar forskjellen**

Svar med to–tre setninger på hver:

a) `VARCHAR(50)` og `TEXT`
b) `NUMERIC(8,2)` og `REAL` — og hvorfor bare den ene brukes til penger
c) `DATE` og `VARCHAR(10)` når du skal lagre en dato
d) `NULL` og `0`
e) `DELETE FROM spill;` og `DROP TABLE spill;`
f) `INTEGER` og `SERIAL`

**Oppgave B5 — Rett opp den dårlige tabellen**

En elev har laget denne tabellen:

```sql
CREATE TABLE elevspill (
    nr TEXT,
    tittel TEXT,
    pris TEXT,
    utgitt TEXT,
    flerspiller TEXT
);
```

a) Skriv opp tre konkrete problemer denne tabellen vil gi.
b) Skriv en ny og bedre `CREATE TABLE` med riktige datatyper, primærnøkkel og minst to constraints.
c) Vis med en `SELECT` én ting du kan gjøre med din versjon som er umulig med elevens.

**Oppgave B6 — Statistikk**

a) Gjennomsnittlig pris per sjanger, avrundet til to desimaler.
b) Antall spill per utgivelsesår. (`EXTRACT(YEAR FROM utgitt)` gir året.)
c) Den dyreste tittelen i hver sjanger.
d) Hvor mange spill som er flerspiller, og hvor mange som ikke er det, i én spørring.

### Del C — Mer krevende

**Oppgave C1 — Din egen database [Make]**

Lag databasen `esport` med musa i pgAdmin, og bygg deretter alt innholdet med SQL i Query Tool.

Databasen skal ha minst to tabeller, for eksempel `lag` og `kamp`. Krav:

- Minst seks kolonner til sammen, og minst fem forskjellige datatyper.
- Hver tabell skal ha en primærnøkkel.
- Minst én `NOT NULL`, én `UNIQUE`, én `DEFAULT` og én `CHECK`.
- Minst fem rader i hver tabell.
- Fem spørringer som viser noe interessant om dataene, inkludert minst én med `GROUP BY`.

Lever `esport.sql` med alle kommandoene i riktig rekkefølge, slik at læreren kan kjøre fila fra topp til bunn og få den ferdige databasen.

**Oppgave C2 — To tabeller som henger sammen**

I `esport`-databasen: legg til kolonnen `lag_id INTEGER REFERENCES lag(id)` i tabellen `kamp`.

a) Hva skjer nå hvis du prøver å legge inn en kamp med et `lag_id` som ikke finnes i `lag`? Prøv, og les feilmeldingen.
b) Hva skjer hvis du prøver å slette et lag som er brukt i en kamp?
c) Hent ut kamper med lagnavn i stedet for lag-ID:

```sql
SELECT kamp.dato, lag.lagnavn
FROM kamp
JOIN lag ON kamp.lag_id = lag.id;
```

Forklar med egne ord hva `JOIN` gjør. Dette er temaet for neste hefte.

**Oppgave C3 — Datavask**

Kjør denne, og se på rotet:

```sql
INSERT INTO spill (tittel, sjanger, pris, vurdering) VALUES
('  Tetris  ', 'puslespill', 79.00, 9),
('TETRIS', 'Puslespill', 79.00, 9),
('Pac-Man', 'ARKADE', NULL, 11),
('Pong', 'Arkade', -20.00, 0);
```

*(Den siste blir avvist dersom du la til `CHECK`-regelen i 1.13. Fjern regelen midlertidig med `ALTER TABLE spill DROP CONSTRAINT pris_ikke_negativ;` hvis du vil ha den med.)*

a) Finn og fiks radene med ekstra mellomrom. (`TRIM(tittel)`)
b) Gjør alle sjangernavn til samme skrivemåte: stor forbokstav, resten små. (`INITCAP(sjanger)`)
c) Finn duplikatet, og slett det ene.
d) Vurderingen skal være mellom 0 og 10. Finn radene som bryter dette, og rett dem.
e) Skriv en `CHECK`-regel som ville hindret hele dette rotet fra å oppstå.

**Oppgave C4 — Stjerneoppgave**

a) Skriv en spørring som viser hver sjanger, antall spill i sjangeren og snittvurderingen — men **bare** for sjangre med mer enn ett spill. (Hint: `HAVING` er `WHERE` for grupper, og kommer etter `GROUP BY`.)
b) Skriv en spørring som finner alle spill som er dyrere enn gjennomsnittsprisen. (Hint: du kan sette en hel `SELECT` inne i `WHERE`: `WHERE pris > (SELECT AVG(pris) FROM spill)`.)
c) Skriv en spørring som viser tittel, pris og hvor mange prosent over eller under snittprisen hvert spill ligger.

---

## Egenvurdering

Sett kryss. Alt du ikke får kryss på, tar du med til neste time.

- [ ] Jeg har PostgreSQL og pgAdmin installert, og vet forskjellen på de to.
- [ ] Jeg kan lage en database og en tabell, både med musa og med SQL.
- [ ] Jeg vet hvor jeg finner SQL-fanen i pgAdmin, og hva den er god for.
- [ ] Jeg kan alle de fire CRUD-kommandoene utenat.
- [ ] Jeg kan navngi minst åtte datatyper og si hva de brukes til.
- [ ] Jeg vet hvorfor penger skal lagres som `NUMERIC` og ikke `REAL`.
- [ ] Jeg vet hvorfor en dato ikke skal lagres som tekst.
- [ ] Jeg forstår hva `NULL` betyr, og hvorfor `= NULL` ikke virker.
- [ ] Jeg vet hva som skjer ved `UPDATE` og `DELETE` uten `WHERE` — og hvordan jeg unngår det.
- [ ] Jeg kan forklare `PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `DEFAULT` og `CHECK`.

---

## Et glimt av hefte 2

Tabellen `spill` har et problem du kanskje har lagt merke til: skriver du `Plattform` i sjanger-kolonnen på ett spill og `plattform` på et annet, blir de to forskjellige sjangre. Og skal du lagre hvilken utgiver hvert spill har, må du skrive `Nintendo` om igjen for hvert eneste Nintendo-spill — og skrivefeil vil oppstå.

```sql
CREATE TABLE utgiver (
    id SERIAL PRIMARY KEY,
    navn VARCHAR(80) UNIQUE NOT NULL
);

ALTER TABLE spill ADD COLUMN utgiver_id INTEGER REFERENCES utgiver(id);
```

Løsningen er å dele opp i flere tabeller, og la dem peke på hverandre med **fremmednøkler**. Da finnes hvert utgivernavn nøyaktig ett sted, og databasen selv passer på at det ikke oppstår tull. Å sette sammen slike tabeller igjen når du skal lese data, gjøres med `JOIN`.

Det er temaet for hefte 2: flere tabeller, relasjoner og JOIN — der databaser slutter å være regneark og begynner å bli kraftige.

---

*Hefte 1 av serien «Databaser fra bunnen av». Neste hefte: Flere tabeller, relasjoner og JOIN.*
