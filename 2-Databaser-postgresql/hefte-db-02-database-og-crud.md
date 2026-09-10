# Hefte 2: Din første database, tabell og CRUD

*Databaser fra bunnen av — hefte 2 i serien. Bygger på hefte 1: Installasjon og oppsett. Beregnet på to skoletimer.*

---

## Slik jobber du med dette heftet

Som i hefte 1 følger du stegene i PRIMM: **les og forutsi**, **kjør**, **undersøk små endringer**, **endre mer**, og til slutt **lag ditt eget** i oppgavedelen bakerst. Stegene er merket `[Predict]`, `[Run]`, `[Investigate]` og `[Modify]` i teksten.

> **💡 Tips:** Gjett alltid på resultatet **før** du trykker kjør. Det er selve gjettingen som gjør at du lærer — ikke svaret.

Hele heftet handler om fire kommandoer. De kalles **CRUD**, og de er alt en database egentlig gjør:

| Bokstav | Betyr | SQL |
|---|---|---|
| **C** | Create — opprette | `INSERT` |
| **R** | Read — lese | `SELECT` |
| **U** | Update — endre | `UPDATE` |
| **D** | Delete — slette | `DELETE` |

Alt annet — nettbutikker, skolens fraværssystem, Spotify-spillelista di — er disse fire, gjentatt noen milliarder ganger.

---

## 2.1 Lag databasen

Start pgAdmin, og koble til serveren `PostgreSQL 18` med passordet ditt fra hefte 1.

1. Høyreklikk på **Databases** i treet, og velg **Create → Database…**
2. I feltet **Database** skriver du `spillbibliotek`. La `Owner` stå til `postgres`.
3. **[Predict]** Før du lagrer: klikk på fanen **SQL** øverst i dialogboksen. Hva tror du står der?

Der ligger hemmeligheten bak hele pgAdmin:

```sql
CREATE DATABASE spillbibliotek
    WITH
    OWNER = postgres
    ENCODING = 'UTF8';
```

Alt du klikker deg til i pgAdmin, blir oversatt til SQL. Museklikkene er bare en snarvei — det er dette som faktisk sendes til serveren. Bruk derfor SQL-fanen som en gratis fasit hver gang du er usikker på hvordan en kommando skrives.

4. **[Run]** Klikk **Save**. Databasen `spillbibliotek` dukker opp i treet.
5. **[Investigate]** Prøv å lage en database til, med navnet `Spill Bibliotek` (stor forbokstav og mellomrom). Se på SQL-fanen. Hva skjedde med navnet?

Legg merke til de doble anførselstegnene rundt navnet. Navn med mellomrom eller store bokstaver må siteres hver eneste gang du bruker dem senere — derfor bruker profesjonelle utviklere alltid **små bokstaver og understrek**: `spillbibliotek`, `spill_utgiver`, `min_tabell`.

6. Slett den nye databasen igjen: høyreklikk på den → **Delete**. Bekreft.

Åpne så Query Tool på den nye databasen: marker `spillbibliotek` i treet, og velg **Tools → Query Tool**.

> **⚠️ Merk:** Query Tool er alltid koblet til **én bestemt database** — den du hadde markert. Står det `postgres` i fanenavnet, lager du tabellene dine på feil sted. Sjekk dette hver gang du åpner et nytt vindu. Feilmeldingen `relation … does not exist` skyldes nesten alltid dette.

---

## 2.2 Din første tabell

En database uten tabeller er en tom perm. Nå lager du tabellen `spill` — og du lager den **to ganger**: én gang ved å klikke, og én gang med SQL. Poenget er at du skal se at det er nøyaktig det samme.

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
6. **[Run]** Les SQL-en, og klikk **Save**.

### Med SQL

7. Slett tabellen igjen: høyreklikk på `spill` → **Delete**. (Legg merke til at pgAdmin advarer deg. Det burde den.)
8. I Query Tool skriver du:

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

Hver kolonne har et navn og en **datatype** — en regel for hva som får lov til å ligge der. Det er den viktigste forskjellen fra JavaScript, der en variabel kan inneholde hva som helst:

| Linje | Hva den betyr |
|---|---|
| `id SERIAL PRIMARY KEY` | Et heltall databasen teller opp helt av seg selv, og som er radens unike ID |
| `tittel VARCHAR(100) NOT NULL` | Tekst på maks 100 tegn. `NOT NULL` betyr at feltet **må** fylles ut |
| `sjanger VARCHAR(40)` | Tekst på maks 40 tegn. Kan stå tom |
| `utgitt DATE` | En ekte dato — ikke tekst som *ser ut som* en dato |
| `pris NUMERIC(6,2)` | Eksakt tall med 6 siffer, hvorav 2 bak komma. Altså opptil `9999.99`. Penger skal alltid være `NUMERIC` |
| `vurdering SMALLINT` | Et lite heltall |
| `flerspiller BOOLEAN DEFAULT false` | Sant eller usant. Sier du ingenting, blir det `false` |
| `beskrivelse TEXT` | Tekst uten lengdegrense |

10. **[Investigate]** Kjør `CREATE TABLE`-kommandoen én gang til. Hva sier feilmeldingen?
11. **[Investigate]** Kjør `DROP TABLE spill;`, og lag tabellen på nytt. `DROP` sletter hele tabellen med alt innhold — en av de farligste kommandoene i SQL.

> **💡 Tips:** Ta vare på `CREATE TABLE`-kommandoen i en tekstfil, for eksempel `spillbibliotek.sql`. Da kan du bygge opp igjen hele databasen på ti sekunder hvis noe går galt — og det kommer det til å gjøre.

---

## 2.3 C — INSERT: legg inn data

```sql
INSERT INTO spill (tittel, sjanger, utgitt, pris, vurdering, flerspiller)
VALUES ('Stardew Valley', 'Simulator', '2016-02-26', 149.00, 9, true);
```

1. **[Predict]** Hva skjer med kolonnene `id` og `beskrivelse`, som ikke er nevnt?
2. **[Run]** Kjør kommandoen. Meldingen `INSERT 0 1` betyr at én rad ble lagt inn.
3. **[Run]** Se på dataene: høyreklikk på tabellen `spill` → **View/Edit Data → All Rows**. Hvilken `id` fikk raden? Hva står i `beskrivelse`?

`id` fylles ut av `SERIAL` helt automatisk. `beskrivelse` er tom — den har verdien **NULL**, som betyr «ingen verdi oppgitt». `NULL` er ikke det samme som 0 eller tom tekst; det betyr at ingen har fylt ut feltet.

Legg merke til hvordan verdiene skrives: tekst og datoer i **enkle anførselstegn**, tall uten. Rekkefølgen i `VALUES` må stemme nøyaktig med kolonnelista over.

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

4. **[Run]** Kjør, og kontroller at det står `INSERT 0 7`. Nå har du åtte rader.
5. **[Investigate]** Prøv denne, og les feilmeldingen:

```sql
INSERT INTO spill (sjanger, pris) VALUES ('Strategi', 199.00);
```

Hvilken regel fra `CREATE TABLE` er det som stopper deg?

6. **[Investigate]** Prøv `INSERT INTO spill (tittel, pris) VALUES ('Testspill', 12345.67);`. Prisen har plass til fire siffer foran komma. Hva sier databasen?
7. **[Investigate]** Prøv å legge inn et spill der du bytter om rekkefølgen på verdiene, slik at prisen havner i `tittel`.

> **💡 Tips:** At databasen sier nei, er en tjeneste, ikke et hinder. Et regneark hadde tatt imot alt sammen uten å mukke — og du hadde oppdaget rotet først om tre måneder.

8. **[Modify]** Legg inn tre spill du selv liker, med riktige datoer og priser. Kontroller etterpå i **View/Edit Data** at alt ser riktig ut.

---

## 2.4 R — SELECT: hent ut data

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

En `SELECT` er bygget av deler som alltid kommer i denne rekkefølgen:

| Del | Betyr | Valgfri? |
|---|---|---|
| `SELECT tittel, pris` | hvilke **kolonner** du vil se | nei |
| `FROM spill` | hvilken **tabell** | nei |
| `WHERE pris < 200` | hvilke **rader** | ja |
| `ORDER BY pris DESC` | **sortering** (`DESC` = synkende) | ja |
| `LIMIT 3` | hvor **mange** rader | ja |

5. **[Investigate]** Bytt om på `WHERE` og `ORDER BY`, slik at `ORDER BY` kommer først. Kjør. Rekkefølgen på delene er ikke valgfri.

### Vilkår i WHERE

```sql
SELECT * FROM spill WHERE sjanger = 'Plattform';
SELECT * FROM spill WHERE pris = 0;
SELECT * FROM spill WHERE pris BETWEEN 100 AND 250;
SELECT * FROM spill WHERE flerspiller = true;
SELECT * FROM spill WHERE utgitt > '2018-01-01';
SELECT * FROM spill WHERE tittel LIKE 'H%';
SELECT * FROM spill WHERE tittel ILIKE '%knight%';
SELECT * FROM spill WHERE sjanger IN ('Sport', 'Skytespill');
SELECT * FROM spill WHERE vurdering >= 9 AND pris < 200;
SELECT * FROM spill WHERE beskrivelse IS NULL;
```

6. **[Run]** Kjør alle ti, og noter hvor mange rader hver gir.
7. **[Investigate]** Hva er forskjellen på `LIKE` og `ILIKE`? Prøv `LIKE '%knight%'`, og se. `%` betyr «hva som helst, null eller flere tegn».
8. **[Investigate]** Prøv `WHERE sjanger = 'plattform'` med liten p. Ingen treff — tekstsammenligning skiller mellom store og små bokstaver.
9. **[Investigate]** Prøv `WHERE beskrivelse = NULL` i stedet for `IS NULL`. Du får null rader og ingen feilmelding.

`NULL` betyr «ukjent», og to ukjente verdier kan ikke sies å være like. Derfor finnes de egne ordene `IS NULL` og `IS NOT NULL` — `= NULL` virker aldri.

10. Legg merke til at datoer sammenlignes som datoer i linje 5: `> '2018-01-01'` finner alt som er nyere. Hadde `utgitt` vært lagret som tekst, ville dette gitt tull.

### Regne på dataene

```sql
SELECT COUNT(*) FROM spill;
SELECT AVG(pris) FROM spill;
SELECT ROUND(AVG(pris), 2) AS snittpris FROM spill;
SELECT MIN(pris), MAX(pris), SUM(pris) FROM spill;
SELECT sjanger, COUNT(*) AS antall FROM spill GROUP BY sjanger ORDER BY antall DESC;
```

11. **[Predict]** Hva tror du den siste linja gjør?
12. **[Run]** Kjør alle fem. `AS` gir kolonnen et penere navn i resultatet, og `GROUP BY` slår sammen alle rader som har samme verdi — her én linje per sjanger.
13. **[Modify]** Skriv en spørring som viser gjennomsnittsprisen **per sjanger**, sortert fra dyrest til billigst.
14. **[Modify]** Skriv en spørring som viser tittel og pris for de tre dyreste spillene.

> **💡 Tips:** `SELECT` endrer aldri noe. Du kan kjøre den så mange ganger du vil, uten risiko. Husk det til neste delkapittel.

---

## 2.5 U — UPDATE: endre data

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

5. **[Predict]** Hva tror du kommandoen under gjør med kopien?

```sql
UPDATE spill_kopi SET pris = 0;
```

6. **[Run]** Kjør den, og se på meldingen. Kjør deretter `SELECT * FROM spill_kopi;`

Alle radene ble endret. Uten `WHERE` gjelder en `UPDATE` **hele tabellen**, og det finnes ingen angreknapp. Slik forsvinner ekte data i ekte bedrifter, hver eneste uke, over hele verden.

7. Slett kopien: `DROP TABLE spill_kopi;`

> **⚠️ Merk — arbeidsvanen som redder deg:** Skriv alltid spørringen som en `SELECT` først.
>
> ```sql
> SELECT * FROM spill WHERE tittel = 'Hades';           -- 1. se hvilke rader du treffer
> UPDATE spill SET pris = 99 WHERE tittel = 'Hades';    -- 2. bytt SELECT * ut med SET
> ```

8. **[Modify]** Sett prisen på alle spill med vurdering under 8 ned med 25 %. Bruk `SELECT` først for å se hvilke rader det gjelder.
9. **[Modify]** Skriv en `UPDATE` som fyller ut `beskrivelse` på Portal 2 med en setning du finner på selv.
10. **[Modify]** Sett `flerspiller` til `true` på alle spill i sjangeren Sport.

---

## 2.6 D — DELETE: slette data

```sql
DELETE FROM spill WHERE tittel = 'Testspill';
```

1. **[Run]** Kjør, og les meldingen. Fikk du `DELETE 1` eller `DELETE 0`? Hva betyr `DELETE 0`?
2. **[Investigate]** Kjør den samme kommandoen én gang til. Du får ingen feilmelding — å slette noe som ikke finnes, er helt lovlig i SQL.

Tre kommandoer som ligner, men gjør helt forskjellige ting:

| Kommando | Hva som skjer | Er tabellen der etterpå? |
|---|---|---|
| `DELETE FROM spill WHERE id = 3;` | Sletter én rad | ja |
| `DELETE FROM spill;` | Sletter **alle** radene | ja, men tom |
| `DROP TABLE spill;` | Sletter hele tabellen med kolonner og alt | nei |

3. **[Modify]** Slett alle spill som er gratis. Bruk `SELECT` først.
4. **[Modify]** Legg inn igjen spillene du slettet. Hvilke `id`-er får de nå?

ID-numre som er brukt, kommer aldri tilbake. Det er meningen: en ID skal peke på én bestemt rad for all fremtid, også etter at raden er slettet. Hull i nummerrekka er ikke en feil.

5. **[Investigate]** Prøv `DELETE FROM spill WHERE pris > 10000;`. Hvor mange rader ble slettet, og hva forteller det deg om hvor viktig det er å teste `WHERE` med en `SELECT` først?

---

## 2.7 Sammendrag

### CRUD-kortet

| Oppgave | Kommando |
|---|---|
| Lage database | `CREATE DATABASE navn;` |
| Lage tabell | `CREATE TABLE navn ( kolonne TYPE, … );` |
| Slette tabell | `DROP TABLE navn;` |
| **C**reate | `INSERT INTO tabell (kol1, kol2) VALUES (v1, v2);` |
| **R**ead | `SELECT kol FROM tabell WHERE … ORDER BY … LIMIT …;` |
| **U**pdate | `UPDATE tabell SET kol = verdi WHERE …;` |
| **D**elete | `DELETE FROM tabell WHERE …;` |
| Telle og regne | `COUNT(*)`, `SUM()`, `AVG()`, `MIN()`, `MAX()`, `ROUND(x, 2)` |
| Gruppere | `SELECT kol, COUNT(*) FROM tabell GROUP BY kol;` |
| Tekstsøk | `LIKE 'A%'`, `ILIKE '%a%'` |
| Manglende verdi | `IS NULL`, `IS NOT NULL` |

### De vanligste datatypene

Du møter flere i hefte 3. Foreløpig holder disse:

| Type | Brukes til |
|---|---|
| `SERIAL` | ID-kolonner som teller seg selv |
| `INTEGER` / `SMALLINT` | Heltall |
| `NUMERIC(p,s)` | Eksakte desimaltall — alltid til penger |
| `VARCHAR(n)` | Tekst med øvre grense |
| `TEXT` | Tekst uten grense |
| `DATE` | Datoer |
| `BOOLEAN` | Sant/usant |

### De tre tingene som oftest går galt

1. Query Tool er koblet til feil database → `relation … does not exist`.
2. `UPDATE` eller `DELETE` uten `WHERE` → hele tabellen endres eller tømmes.
3. Doble anførselstegn brukt om tekst → `column "…" does not exist`. Tekst skal ha **enkle** anførselstegn.

---

## Oppgaver

Løs oppgavene i Query Tool på databasen `spillbibliotek`. Lagre alle spørringene dine i én fil, `oppgaver.sql`, med en kommentar over hver oppgave:

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

**Oppgave A4 — Fyll ut skjelettet**

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

DELETE ... spill ... tittel = 'Undertale';
```

**Oppgave A5 — Én av hver**

Skriv én kommando av hver CRUD-type mot tabellen `spill`, og forklar med én setning hva hver av dem gjør. Kjør dem, og kontroller resultatet med en `SELECT` etter hver.

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
d) Finn hvor mange dager siden hvert utlån ble gjort. (`CURRENT_DATE - laant_dato`)
e) Slett alle utlån som er levert.
f) Tell hvor mange rader som er igjen.

**Oppgave B3 — Fra klikk til SQL**

Lag en tabell `turnering` ved å klikke deg gjennom **Create → Table…** i pgAdmin. Den skal ha kolonnene `id` (serial, primærnøkkel), `navn` (varchar 80, påkrevd), `dato` (date), `deltakere` (integer) og `premiepott` (numeric 8,2).

Kopier innholdet i **SQL**-fanen inn i besvarelsen din, og forklar hver linje med egne ord. Kjør så `DROP TABLE turnering;` og lag tabellen på nytt med SQL, for å kontrollere at du forsto den.

**Oppgave B4 — Forklar forskjellen**

Svar med to–tre setninger på hver:

a) `DELETE FROM spill;` og `DROP TABLE spill;`
b) `UPDATE` med og uten `WHERE`
c) `SELECT *` og `SELECT tittel, pris`
d) `WHERE pris = NULL` og `WHERE pris IS NULL`
e) `LIKE` og `ILIKE`
f) Hvorfor `SELECT` er ufarlig, mens `UPDATE` og `DELETE` ikke er det

**Oppgave B5 — Statistikk**

a) Gjennomsnittlig pris per sjanger, avrundet til to desimaler.
b) Antall spill som er flerspiller, og antall som ikke er det, i én spørring.
c) Den høyeste prisen i hver sjanger.
d) Antall spill utgitt etter 2015.

**Oppgave B6 — Rett opp uten å ødelegge**

En medelev har kjørt `UPDATE spill SET pris = 199;` uten `WHERE`.

a) Hva har skjedd med tabellen?
b) Hvorfor kan du ikke bare angre?
c) Skriv en kommando som setter prisen riktig igjen på to av spillene.
d) Skriv ned regelen du vil følge selv for aldri å havne her.

### Del C — Mer krevende

**Oppgave C1 — Din egen database [Make]**

Lag databasen `esport` med musa i pgAdmin, og bygg innholdet med SQL i Query Tool.

Databasen skal ha én tabell `lag` med minst seks kolonner, primærnøkkel og minst tre forskjellige datatyper. Deretter skal du:

- legge inn minst seks rader
- hente ut data med minst fire forskjellige `SELECT`-spørringer, hvorav én med `ORDER BY`, én med `WHERE` og én med `COUNT` eller `AVG`
- endre minst to rader med `UPDATE`
- slette minst én rad med `DELETE`

Lever `esport.sql` med alle kommandoene i riktig rekkefølge, slik at læreren kan kjøre fila fra topp til bunn og få den ferdige databasen.

**Oppgave C2 — Kantina**

Lag tabellen `vare` for skolekantina, med kolonnene `id`, `navn`, `pris`, `kategori`, `glutenfri` og `antall_paa_lager`. Velg datatyper selv, og begrunn valgene kort.

a) Legg inn ti varer.
b) Kantina øker alle priser med 5 %. Skriv kommandoen.
c) Alle varer i kategorien «Drikke» skal ned 2 kroner. Skriv kommandoen.
d) Finn de tre dyreste varene, og de tre billigste.
e) Finn den totale verdien av lageret. (Hint: `SUM(pris * antall_paa_lager)`)
f) Slett alle varer det er null igjen av.

**Oppgave C3 — Kopier og eksperimenter**

```sql
CREATE TABLE spill_test AS SELECT * FROM spill;
```

Bruk kopien til å teste ting du ikke tør gjøre på originalen:

a) Hva skjer med `UPDATE spill_test SET tittel = NULL;`? Sammenlign med den samme kommandoen på `spill`, og forklar hvorfor svaret er forskjellig. (Hint: kopien har ikke fått med seg reglene fra `CREATE TABLE`.)
b) Slett annenhver rad — de med partall-`id`. (Hint: `WHERE id % 2 = 0`)
c) Sett prisen på alle gjenværende rader til gjennomsnittsprisen i tabellen.
d) Rydd opp etter deg med `DROP TABLE spill_test;`

**Oppgave C4 — Stjerneoppgave**

a) Skriv en spørring som finner alle spill som er dyrere enn gjennomsnittsprisen. (Hint: du kan sette en hel `SELECT` inne i `WHERE`: `WHERE pris > (SELECT AVG(pris) FROM spill)`.)
b) Skriv en `UPDATE` som setter alle spill som er billigere enn gjennomsnittet, opp med 10 %.
c) Forklar hvorfor rekkefølgen på a) og b) har noe å si — hva skjer med gjennomsnittet underveis?

---

## Egenvurdering

- [ ] Jeg kan lage en database i pgAdmin, og vet hvor jeg finner SQL-en for den.
- [ ] Jeg kan lage en tabell både med musa og med `CREATE TABLE`.
- [ ] Jeg kan alle de fire CRUD-kommandoene utenat.
- [ ] Jeg kan hente ut data med `WHERE`, `ORDER BY` og `LIMIT`.
- [ ] Jeg kan telle og regne med `COUNT`, `AVG` og `GROUP BY`.
- [ ] Jeg vet hva som skjer ved `UPDATE` og `DELETE` uten `WHERE` — og hvordan jeg unngår det.
- [ ] Jeg vet forskjellen på `DELETE` og `DROP`.
- [ ] Jeg vet hva `NULL` betyr, og hvorfor `= NULL` ikke virker.
- [ ] Jeg vet hvorfor en pris skal være `NUMERIC` og en dato skal være `DATE`.

---

## Et glimt av hefte 3

Tabellen `spill` har et problem du kanskje har lagt merke til: skriver du `Plattform` på ett spill og `plattform` på et annet, blir det to forskjellige sjangre. Og skal du lagre hvilken utgiver hvert spill har, må du skrive `Nintendo` om igjen for hvert eneste Nintendo-spill — med skrivefeil og alt.

```sql
CREATE TABLE utgiver (
    id SERIAL PRIMARY KEY,
    navn VARCHAR(80) UNIQUE NOT NULL
);

ALTER TABLE spill ADD COLUMN utgiver_id INTEGER REFERENCES utgiver(id);
```

Løsningen er å dele opp i flere tabeller og la dem peke på hverandre med **fremmednøkler**. Da finnes hvert utgivernavn nøyaktig ett sted, og databasen passer selv på at det ikke oppstår tull. Å sette slike tabeller sammen igjen når du skal lese data, gjøres med `JOIN`.

I hefte 3 går vi også grundigere gjennom datatypene og reglene som beskytter dataene — `UNIQUE`, `DEFAULT` og `CHECK`.

---

*Hefte 2 av serien «Databaser fra bunnen av». Neste hefte: Datatyper, regler, flere tabeller og JOIN.*
