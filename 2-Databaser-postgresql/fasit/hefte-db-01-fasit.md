# Fasit — Hefte 1: Installasjon og oppsett

*Løsningsforslag til innlæringsdelen og oppgavene.*

---

## Innlæringsdelen

### 1.1 Hva er egentlig en database?

1. Dataene ligger i maskinens minne (RAM) mens programmet kjører.
2. De forsvinner. Minnet frigjøres når programmet avsluttes.
3. Åpent. Typiske svar: utvikler, plattform, aldersgrense, spilletid, antall spillere, om spillet er kjøpt eller står på ønskelista.

### 1.3 Første møte med pgAdmin

3. Null tabeller.
4. Eier er `postgres`, encoding er `UTF8`.
5. Host er `localhost` og porten er `5432`. `localhost` betyr «denne maskinen» — serveren kjører på elevens egen PC, ikke ute på nettet.

### 1.4 Sjekk at alt virker

5. En lang tekstlinje med versjonsnummer, kompilator og operativsystem, for eksempel `PostgreSQL 18.0 ... 64-bit`.

6.–7.

| Kommando | Resultat |
|---|---|
| `SELECT 3 * 7;` | `21` |
| `SELECT 'Hei fra databasen!';` | `Hei fra databasen!` |
| `SELECT 'God' \|\| ' ' \|\| 'morgen';` | `God morgen` |
| `SELECT CURRENT_DATE;` | Dagens dato, på formen `2026-09-10` |

8. Feilmeldingen er `operator does not exist: unknown + unknown` (eller `text + text`). PostgreSQL har ingen `+`-operator for tekst; tekst limes sammen med `||`.
9. Ja, det virker uten semikolon så lenge det bare er én kommando i vinduet. Med flere kommandoer må hver av dem avsluttes med semikolon.

---

## Del A — Forstå oppsettet

### A1

a) PostgreSQL er databaseserveren som lagrer dataene og svarer på spørringer. pgAdmin er klienten — det grafiske programmet du bruker til å sende kommandoer til serveren og se svarene.
b) pgAdmin lagrer ingenting selv. Uten en server å koble seg til, har det ingenting å vise.
c) `postgres` er superbrukeren med alle rettigheter på serveren. Uten passordet kommer du ikke inn, og det finnes ingen «glemt passord»-funksjon.
d) `localhost` betyr maskinen du sitter ved. Serveren kjører lokalt, ikke på internett.
e) En database er en samling tabeller. En tabell er selve rutenettet med rader og kolonner der dataene ligger.

### A2

| # | Svar | Retting |
|---|---|---|
| 1 | G | Det er PostgreSQL som lagrer dataene. pgAdmin viser dem bare. |
| 2 | R | |
| 3 | G | `postgres` skal bli stående — serveren bruker den som utgangspunkt. |
| 4 | R | |
| 5 | G | Master password låser opp pgAdmin. Databasepassordet gir tilgang til serveren. De kan gjerne være like, men de er to forskjellige ting. |
| 6 | R | Serveren kjører som en tjeneste i bakgrunnen, uavhengig av pgAdmin. |

---

## Del B — Utforsk

### B1

a) Versjonen som ble installert, for eksempel 18. `SELECT version();` gir svaret.
b) Står under **Help → About**, for eksempel pgAdmin 4 v9.x.
c) Én database: `postgres`. (Noen installasjoner viser også systemdatabasene `template0` og `template1` dersom eleven har huket av for å vise systemobjekter.)
d) `UTF8`.
e) Standardmappa fra installasjonen, typisk `C:\Program Files\PostgreSQL\18\data`.

### B2

a) Flere prosesser med navnet `postgres` — én hovedprosess og en håndfull hjelpeprosesser. Antallet varierer.
b) Ja, de kjører fortsatt. Serveren er et program som kjører hele tiden i bakgrunnen; pgAdmin er bare et vindu inn til den. Dette er hele poenget med oppdelingen klient/server.
c) Fungerer som før — dataene og tilkoblingen er upåvirket av at klienten var lukket.

### B3

| Kommando | Resultat |
|---|---|
| `SELECT 100 - 58;` | `42` |
| `SELECT 'IM' \|\| '-' \|\| 'klassen';` | `IM-klassen` |
| `SELECT CURRENT_DATE;` | Dagens dato |
| `SELECT CURRENT_DATE + 100;` | Datoen 100 dager frem i tid |
| `SELECT length('informasjonsteknologi');` | `21` |

`length()` teller antall tegn i teksten.

---

## Del C — Feilsøking

### C1

a) Det er **master password** i pgAdmin, som settes første gang programmet startes — ikke databasepassordet. Eleven må sette et nytt et og huske det.
b) Databaseserveren kjører ikke. Vanligste årsaker: tjenesten er stoppet, maskinen har nettopp startet og tjenesten er ikke oppe ennå, eller installasjonen ble ikke fullført. Kontroller tjenesten `postgresql-x64-18` i Windows' Tjenester (services.msc), og start den.
c) Doble anførselstegn betyr *kolonnenavn* i SQL. Databasen leter etter en kolonne som heter `Hei`. Riktig er `SELECT 'Hei';` med enkle anførselstegn.
d) pgAdmin har ikke oppdatert trestrukturen. Høyreklikk på mappa i treet og velg **Refresh**.

### C2

Vurderes etter om oppskriften er mulig å følge for en som ikke har gjort det før. Se særlig etter at eleven har fått med:

- nedlastingslenke og valg av riktig versjon
- at man må godta at appen gjør endringer (administratorrettigheter)
- at passordet til `postgres` må skrives ned
- at porten skal være 5432
- at Stack Builder kan hoppes over
- minst tre advarsler, for eksempel om glemt passord, port i bruk, og at man må trykke Refresh i pgAdmin

Et godt tegn på kvalitet: eleven skriver hva som skal skje etter hvert steg, ikke bare hva man skal klikke på.
