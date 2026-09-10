# Fasit — Hefte 2: Din første database, tabell og CRUD

*Løsningsforslag til innlæringsdelen og oppgavene. Flere oppgaver har mer enn én riktig løsning; forslagene her er de enkleste.*

> **Om datasettet:** Alle radtall nedenfor forutsetter de åtte spillene som legges inn i 2.3, **før** endringene i 2.5 og de tre spillene eleven legger inn selv i 2.3 punkt 8. Har eleven lagt inn egne rader, blir tallene høyere — det er ikke feil, og er verdt å snakke om i klassen.
>
> | id | tittel | sjanger | utgitt | pris | vurdering | flerspiller |
> |---|---|---|---|---|---|---|
> | 1 | Stardew Valley | Simulator | 2016-02-26 | 149.00 | 9 | true |
> | 2 | Celeste | Plattform | 2018-01-25 | 219.00 | 10 | false |
> | 3 | Minecraft | Sandkasse | 2011-11-18 | 299.00 | 8 | true |
> | 4 | Rocket League | Sport | 2015-07-07 | 0.00 | 7 | true |
> | 5 | Hades | Rogue-like | 2020-09-17 | 249.50 | 9 | false |
> | 6 | Counter-Strike 2 | Skytespill | 2023-09-27 | 0.00 | 8 | true |
> | 7 | Portal 2 | Puslespill | 2011-04-19 | 99.00 | 10 | true |
> | 8 | Hollow Knight | Plattform | 2017-02-24 | 159.00 | 9 | false |

---

## Innlæringsdelen

### 2.1 Lag databasen

3. SQL-fanen viser `CREATE DATABASE spillbibliotek WITH OWNER = postgres ...` — altså akkurat den kommandoen museklikkene tilsvarer.
5. Navnet blir stående i doble anførselstegn: `CREATE DATABASE "Spill Bibliotek"`. Uten anførselstegnene ville PostgreSQL gjort om navnet til små bokstaver og snublet i mellomrommet. Derfor: små bokstaver og understrek i alle navn.

### 2.2 Din første tabell

5.–6. SQL-fanen viser `CREATE TABLE public.spill (...)` med de samme kolonnene eleven klikket inn, pluss `CONSTRAINT spill_pkey PRIMARY KEY (id)`.
10. `ERROR: relation "spill" already exists`. Tabellnavn må være unike i skjemaet.

### 2.3 INSERT

1. `id` fylles automatisk av `SERIAL` (blir 1). `beskrivelse` blir `NULL`.
3. `id` = 1, og `beskrivelse` er tom (NULL).
5. `ERROR: null value in column "tittel" ... violates not-null constraint`. Regelen `NOT NULL` på `tittel` stopper deg.
6. `ERROR: numeric field overflow — A field with precision 6, scale 2 must round to an absolute value less than 10^4`. `NUMERIC(6,2)` har plass til `9999.99`.
7. Enten `invalid input syntax for type numeric`, eller — hvis begge verdiene er tekst — at prisen havner i tittelfeltet uten feilmelding. Poenget: rekkefølgen i `VALUES` må stemme med kolonnelista.

> **Merk:** Mislykkede `INSERT`-forsøk bruker likevel opp et nummer i `SERIAL`-telleren. Elever som har prøvd og feilet, får derfor hull i `id`-rekka. Det er normalt, og et fint utgangspunkt for en samtale om hva en ID egentlig er.

### 2.4 SELECT

1. `*` betyr alle kolonner.
3.–4. `SELECT tittel, pris` → 8 rader. `WHERE pris < 200` → 5 (Stardew Valley, Rocket League, Counter-Strike 2, Portal 2, Hollow Knight). Med `ORDER BY pris` → samme fem, sortert `0, 0, 99, 149, 159`. Med `DESC` → motsatt vei. `ORDER BY vurdering DESC LIMIT 3` → Celeste, Portal 2 og ett av spillene med vurdering 9 (rekkefølgen mellom like verdier er ikke bestemt).
5. Feilmelding: `syntax error at or near "WHERE"`. Delene må komme i rekkefølgen SELECT → FROM → WHERE → GROUP BY → ORDER BY → LIMIT.

6. Radtall for de ti vilkårene:

| Spørring | Antall | Hvilke |
|---|---|---|
| `sjanger = 'Plattform'` | 2 | Celeste, Hollow Knight |
| `pris = 0` | 2 | Rocket League, Counter-Strike 2 |
| `pris BETWEEN 100 AND 250` | 4 | Stardew Valley, Celeste, Hades, Hollow Knight |
| `flerspiller = true` | 5 | Stardew Valley, Minecraft, Rocket League, Counter-Strike 2, Portal 2 |
| `utgitt > '2018-01-01'` | 3 | Celeste, Hades, Counter-Strike 2 |
| `tittel LIKE 'H%'` | 2 | Hades, Hollow Knight |
| `tittel ILIKE '%knight%'` | 1 | Hollow Knight |
| `sjanger IN ('Sport','Skytespill')` | 2 | Rocket League, Counter-Strike 2 |
| `vurdering >= 9 AND pris < 200` | 3 | Stardew Valley, Portal 2, Hollow Knight |
| `beskrivelse IS NULL` | 8 | alle |

7. `LIKE` skiller mellom store og små bokstaver, `ILIKE` gjør det ikke. `LIKE '%knight%'` gir null treff, fordi tittelen har stor K.
8. Null treff. Tekstsammenligning er nøyaktig, tegn for tegn.
9. Null rader og ingen feilmelding — `= NULL` er alltid usant, fordi «ukjent = ukjent» ikke kan avgjøres.

11.–12. `COUNT(*)` → 8. `AVG(pris)` → `146.8125`. `ROUND(AVG(pris), 2)` → `146.81`. `MIN` = 0.00, `MAX` = 299.00, `SUM` = 1174.50. Den siste grupperer etter sjanger: Plattform 2, resten 1 hver (7 grupper).

13.

```sql
SELECT sjanger, ROUND(AVG(pris), 2) AS snittpris
FROM spill
GROUP BY sjanger
ORDER BY snittpris DESC;
```

14.

```sql
SELECT tittel, pris FROM spill ORDER BY pris DESC LIMIT 3;
```

### 2.5 UPDATE

1.–2. Én rad.
3. Den setter prisen ned 20 % på alle plattformspill — to rader (Celeste 219 → 175.20, Hollow Knight 159 → 127.20).
5.–6. `CREATE TABLE spill_kopi AS SELECT * FROM spill;` lager en ny tabell med de samme dataene, men **uten** primærnøkkel, `SERIAL` og de andre reglene. `UPDATE spill_kopi SET pris = 0;` melder `UPDATE 8` og nuller prisen på samtlige rader.

8.

```sql
SELECT * FROM spill WHERE vurdering < 8;            -- kontroller først
UPDATE spill SET pris = pris * 0.75 WHERE vurdering < 8;
```

9.

```sql
UPDATE spill
SET beskrivelse = 'Puslespill med portalpistol og tørrvittig humor.'
WHERE tittel = 'Portal 2';
```

10.

```sql
UPDATE spill SET flerspiller = true WHERE sjanger = 'Sport';
```

### 2.6 DELETE

1. `DELETE 1` hvis raden fantes. `DELETE 0` betyr at ingen rad passet til `WHERE` — kommandoen var vellykket, men traff ingenting.
3.

```sql
SELECT * FROM spill WHERE pris = 0;
DELETE FROM spill WHERE pris = 0;
```

4. De får nye, høyere `id`-er. Telleren fortsetter der den slapp, og gamle numre kommer aldri igjen.
5. `DELETE 0` — ingen spill koster over 10 000. Nettopp fordi kommandoen ikke sier fra når `WHERE` er feil, må man teste den med en `SELECT` først: en `WHERE` som treffer for *mange* rader, gir like lite advarsel som en som treffer for få.

---

## Del A — Enkle

### A1

```sql
-- a)
SELECT * FROM spill;
-- b)
SELECT tittel FROM spill ORDER BY tittel;
-- c)
SELECT * FROM spill WHERE pris < 150;
-- d)
SELECT * FROM spill WHERE utgitt > '2018-01-01';
-- e)
SELECT COUNT(*) FROM spill;
-- f)
SELECT * FROM spill ORDER BY vurdering DESC LIMIT 2;
```

### A2

| Spørring | Resultat |
|---|---|
| `COUNT(*) ... flerspiller = true` | `5` |
| `tittel ... pris = 0` | Rocket League, Counter-Strike 2 |
| `tittel, pris * 1.25 LIMIT 3` | Tre rader med pris pluss 25 %: `186.2500`, `273.7500`, `373.7500` (ganging med `1.25` gir fire desimaler — bruk `ROUND(pris * 1.25, 2)` for pene priser). **Uten `ORDER BY` er rekkefølgen ikke garantert** — det er hele poenget med oppgaven. |
| `sjanger ... tittel LIKE '%o%'` | Sport, Skytespill, Puslespill, Plattform (Rocket League, Counter-Strike 2, Portal 2, Hollow Knight) — 4 rader |
| `MAX(utgitt)` | `2023-09-27` |

### A3

| Feil | Forklaring | Riktig |
|---|---|---|
| `"Celeste"` | Doble anførselstegn betyr kolonnenavn, ikke tekst | `WHERE tittel = 'Celeste'` |
| `ORDER pris` | Mangler `BY` | `ORDER BY pris` |
| `VALUE` | Nøkkelordet er `VALUES`, også for én rad | `VALUES ('Tetris', 79.00)` |
| `= Hades` | Tekst må ha enkle anførselstegn, ellers leses det som et kolonnenavn | `WHERE tittel = 'Hades'` |
| `DELETE *` | `DELETE` sletter hele rader og skal ikke ha stjerne | `DELETE FROM spill WHERE id = 5;` |

### A4

```sql
INSERT INTO spill (tittel, sjanger, pris)
VALUES ('Undertale', 'Rollespill', 89.00);

SELECT tittel, vurdering
FROM spill
WHERE vurdering >= 8
ORDER BY vurdering DESC;

UPDATE spill
SET pris = 129
WHERE tittel = 'Undertale';

DELETE FROM spill WHERE tittel = 'Undertale';
```

### A5

Én av hver, for eksempel:

```sql
INSERT INTO spill (tittel, sjanger, pris) VALUES ('Tetris', 'Puslespill', 79.00);
-- oppretter én ny rad
SELECT * FROM spill WHERE tittel = 'Tetris';
-- leser rader som passer til vilkåret, uten å endre noe
UPDATE spill SET pris = 59.00 WHERE tittel = 'Tetris';
-- endrer verdier i rader som passer til vilkåret
DELETE FROM spill WHERE tittel = 'Tetris';
-- fjerner rader som passer til vilkåret
```

---

## Del B — Middels

### B1

Riktig rekkefølge er `CREATE TABLE` → `INSERT` → `SELECT` → `UPDATE`. Tabellen må finnes før man kan legge inn i den, og raden må finnes før den kan hentes ut eller endres. (`SELECT` og `UPDATE` kan bytte plass, men da viser `SELECT` en rad mindre — et fint punkt å diskutere.)

### B2

```sql
-- a)
INSERT INTO utlaan (spill_tittel, laaner, laant_dato) VALUES
('Celeste',       'Jonas', '2026-09-01'),
('Hades',         'Sara',  '2026-09-02'),
('Minecraft',     'Ali',   '2026-09-03'),
('Hollow Knight', 'Mia',   '2026-09-04');

-- b)
SELECT * FROM utlaan WHERE levert = false;

-- c)
UPDATE utlaan SET levert = true WHERE laaner IN ('Jonas', 'Sara');

-- d)
SELECT spill_tittel, laaner, CURRENT_DATE - laant_dato AS dager_siden FROM utlaan;

-- e)
DELETE FROM utlaan WHERE levert = true;

-- f)
SELECT COUNT(*) FROM utlaan;
```

### B3

```sql
CREATE TABLE turnering (
    id SERIAL PRIMARY KEY,
    navn VARCHAR(80) NOT NULL,
    dato DATE,
    deltakere INTEGER,
    premiepott NUMERIC(8,2)
);
```

Forklaring linje for linje: `SERIAL PRIMARY KEY` gir en automatisk, unik ID; `NOT NULL` krever at navnet fylles ut; `DATE` gir en ekte dato; `INTEGER` er heltall uten desimaler; `NUMERIC(8,2)` gir eksakte kronebeløp opp til 999 999,99.

### B4

a) `DELETE FROM spill;` tømmer tabellen for rader, men tabellen med kolonner og regler består. `DROP TABLE spill;` fjerner hele tabellen.
b) Med `WHERE` endres bare radene som passer til vilkåret. Uten `WHERE` endres **alle** radene i tabellen, og det kan ikke angres.
c) `SELECT *` henter alle kolonner. `SELECT tittel, pris` henter bare de to — mindre data å sende, og et resultat som er lettere å lese. I ekte systemer henter man sjelden `*`.
d) `= NULL` er alltid usant, fordi `NULL` betyr «ukjent» og to ukjente verdier ikke kan sammenlignes. `IS NULL` er den egne kontrollen som faktisk sjekker om verdien mangler.
e) `LIKE` skiller mellom store og små bokstaver, `ILIKE` gjør det ikke.
f) `SELECT` leser bare, og etterlater dataene helt uendret. `UPDATE` og `DELETE` skriver, og det finnes ingen angreknapp — derfor testes vilkåret alltid med en `SELECT` først.

### B5

```sql
-- a)
SELECT sjanger, ROUND(AVG(pris), 2) AS snittpris
FROM spill GROUP BY sjanger ORDER BY snittpris DESC;

-- b)
SELECT flerspiller, COUNT(*) AS antall FROM spill GROUP BY flerspiller;

-- c)
SELECT sjanger, MAX(pris) AS dyreste FROM spill GROUP BY sjanger;

-- d)
SELECT COUNT(*) FROM spill WHERE utgitt > '2015-12-31';
```

Svar på d) med datasettet i heftet: 5 spill (Stardew Valley, Celeste, Hades, Counter-Strike 2, Hollow Knight).

### B6

a) Alle radene i tabellen har fått prisen 199. De gamle prisene finnes ikke lenger noe sted.
b) SQL har ingen angreknapp. Kommandoen ble utført og lagret med det samme. (I ekte systemer løses dette med sikkerhetskopier, og med `BEGIN` … `ROLLBACK` — som kommer senere i faget.)
c)

```sql
UPDATE spill SET pris = 219.00 WHERE tittel = 'Celeste';
UPDATE spill SET pris = 99.00  WHERE tittel = 'Portal 2';
```

d) Regelen: kjør alltid vilkåret som en `SELECT` først, og se på radene du treffer, før du bytter `SELECT *` ut med `SET`.

---

## Del C — Mer krevende

### C1 — eksempelløsning (`esport.sql`)

```sql
CREATE TABLE lag (
    id SERIAL PRIMARY KEY,
    lagnavn VARCHAR(80) NOT NULL,
    stiftet DATE,
    medlemmer SMALLINT,
    er_proff BOOLEAN DEFAULT false,
    premiepenger NUMERIC(9,2) DEFAULT 0
);

INSERT INTO lag (lagnavn, stiftet, medlemmer, er_proff, premiepenger) VALUES
('Nordlys Esport', '2019-03-14', 6, true,  45250.50),
('Fjordfighters',  '2021-08-01', 5, false,  1200.00),
('Team Bergen',    '2018-01-20', 7, true,  88000.00),
('Skjermtroll',    '2022-11-05', 4, false,     0.00),
('Vikings GG',     '2020-06-30', 5, true,  32500.00),
('Kantina Klan',   '2023-02-11', 5, false,   500.00);

-- Read
SELECT * FROM lag ORDER BY stiftet;
SELECT lagnavn, premiepenger FROM lag WHERE er_proff = true;
SELECT COUNT(*) AS antall_lag, ROUND(AVG(medlemmer), 1) AS snitt_medlemmer FROM lag;
SELECT lagnavn FROM lag ORDER BY premiepenger DESC LIMIT 3;

-- Update
UPDATE lag SET medlemmer = 6 WHERE lagnavn = 'Skjermtroll';
UPDATE lag SET premiepenger = premiepenger + 10000 WHERE lagnavn = 'Vikings GG';

-- Delete
DELETE FROM lag WHERE premiepenger = 0;
```

### C2 — Kantina

```sql
CREATE TABLE vare (
    id SERIAL PRIMARY KEY,
    navn VARCHAR(60) NOT NULL,
    pris NUMERIC(6,2) NOT NULL,
    kategori VARCHAR(30),
    glutenfri BOOLEAN DEFAULT false,
    antall_paa_lager INTEGER DEFAULT 0
);
```

Begrunnelse: `NUMERIC` fordi det er penger, `BOOLEAN` fordi glutenfri er ja/nei, `INTEGER` fordi lagerbeholdning er hele enheter, `VARCHAR` med grense fordi navn og kategori er korte tekster.

```sql
-- b)
UPDATE vare SET pris = ROUND(pris * 1.05, 2);

-- c)
UPDATE vare SET pris = pris - 2 WHERE kategori = 'Drikke';

-- d)
SELECT navn, pris FROM vare ORDER BY pris DESC LIMIT 3;
SELECT navn, pris FROM vare ORDER BY pris ASC LIMIT 3;

-- e)
SELECT SUM(pris * antall_paa_lager) AS lagerverdi FROM vare;

-- f)
SELECT * FROM vare WHERE antall_paa_lager = 0;   -- kontroller først
DELETE FROM vare WHERE antall_paa_lager = 0;
```

En god besvarelse på c) nevner at prisen kan bli negativ dersom en drikkevare koster under 2 kroner — og at man derfor burde lagt til `AND pris >= 2`.

### C3 — Kopier og eksperimenter

a) `UPDATE spill_test SET tittel = NULL;` går gjennom, og alle titlene blir tomme. Den samme kommandoen på `spill` gir `ERROR: null value in column "tittel" ... violates not-null constraint`. Grunnen er at `CREATE TABLE ... AS SELECT` bare kopierer kolonnene og dataene — ikke reglene. Kopien har verken primærnøkkel, `NOT NULL` eller `SERIAL`.

b)

```sql
SELECT * FROM spill_test WHERE id % 2 = 0;    -- kontroller først
DELETE FROM spill_test WHERE id % 2 = 0;
```

Med de åtte radene slettes fire (id 2, 4, 6, 8).

c)

```sql
UPDATE spill_test SET pris = (SELECT AVG(pris) FROM spill_test);
```

d) `DROP TABLE spill_test;`

### C4 — Stjerneoppgave

a)

```sql
SELECT tittel, pris
FROM spill
WHERE pris > (SELECT AVG(pris) FROM spill)
ORDER BY pris DESC;
```

Med datasettet i heftet gir dette fem rader: Minecraft, Hades, Celeste, Hollow Knight og Stardew Valley (snittprisen er 146.81).

b)

```sql
UPDATE spill
SET pris = ROUND(pris * 1.1, 2)
WHERE pris < (SELECT AVG(pris) FROM spill);
```

c) Gjennomsnittet regnes ut på nytt hver gang. Kjører du b) først, stiger prisene på de billige spillene, snittet stiger, og a) kan gi et annet svar etterpå. En `UPDATE` som bruker tabellens eget gjennomsnitt, endrer altså sitt eget sammenligningsgrunnlag — men bare for *neste* kommando: PostgreSQL regner ut gjennomsnittet én gang, før oppdateringen starter, så alle radene i én og samme `UPDATE` sammenlignes med det samme tallet.
