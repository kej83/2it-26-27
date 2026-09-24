# Fasit – Prøve i IT2, JavaScript og SQL

Retting: 1 poeng per oppgave. På oppgaver merket \* gis poeng bare når nøyaktig de riktige alternativene er krysset av (eventuelt ½ poeng ved én feil). Maks 44 poeng.

## Del 1 – JavaScript

| Nr. | Riktig svar | Svaralternativ |
|---|---|---|
| 1 | **B** | 1 |
| 2 | **C** | 8 3 |
| 3 \* | **A, C, D** | `console.log(5 + 5);`<br>`console.log("5" * 2);`<br>`console.log(20 / 2);` |
| 4 | **C** | Bestått |
| 5 \* | **B, D** | `alder = 15`  og  `medForelder = false`<br>`alder = 16`  og  `medForelder = false` |
| 6 | **B** | 15 |
| 7 | **D** | 10 7 4 1 |
| 8 | **A** | 4 |
| 9 | **B** | 12 |
| 10 | **C** | 5 |
| 11 | **A** | 9 |
| 12 | **E** | Endre `tall[i] > storst` til `tall[i] < storst` |
| 13 \* | **B, C** | `navn[navn.length - 1]`<br>`navn[2]` |
| 14 | **C** | [ 2, 3 ] |
| 15 | **D** | undefined |
| 16 | **C** | 2 |
| 17 | **D** | 30 |
| 18 | **C** | 3 |
| 19 | **D** | 8820 |
| 20 | **C** | 101 201 |
| 21 \* | **A, D** | `if (rom[i].ledig && (rom[i].type === "dobbelt" \|\| rom[i].type === "suite"))`<br>`if ((rom[i].type === "dobbelt" \|\| rom[i].type === "suite") && rom[i].ledig)` |
| 22 | **E** | Bestilt, Opptatt, Finnes ikke |

## Del 2 – SQL

| Nr. | Riktig svar | Svaralternativ |
|---|---|---|
| 23 | **B** | Structured Query Language |
| 24 | **E** | En kolonne (eller flere) som identifiserer hver rad unikt |
| 25 \* | **A, C, E** | `INTEGER`<br>`VARCHAR(50)`<br>`BOOLEAN` |
| 26 | **C** | id får automatisk et økende heltall og er primærnøkkel |
| 27 | **D** | `CREATE TABLE fag (id SERIAL PRIMARY KEY, navn VARCHAR(50) NOT NULL);` |
| 28 | **B** | `INSERT INTO elever (fornavn, etternavn, klasse, alder, poeng) VALUES ('Mia', 'Strand', '2IT', 16, 40);` |
| 29 | **A** | Kolonnen må alltid ha en verdi |
| 30 | **C** | 4 |
| 31 | **B** | Nora, Emil, Jonas |
| 32 | **C** | 6 |
| 33 \* | **A, C, D** | `klasse = '2IT' AND alder = 17`<br>`alder = 16`<br>`poeng > 60 AND poeng < 75` |
| 34 | **E** | Siri, Jonas |
| 35 | **B** | Siri, Nora, Jonas |
| 36 \* | **A, E** | `WHERE klasse = '2ST' AND (poeng < 50 OR poeng > 70)`<br>`WHERE (klasse = '2ST' AND poeng < 50) OR (klasse = '2ST' AND poeng > 70)` |
| 37 | **B** | 2 |
| 38 \* | **B, D** | `WHERE poeng >= 45 AND poeng <= 62`<br>`WHERE poeng >= 45 AND poeng < 63` |
| 39 | **E** | Nora |
| 40 | **C** | 4 |
| 41 | **B** | 60.5 |
| 42 | **D** | 2IT \| 3   og   2ST \| 2 |
| 43 | **D** | 2 |
| 44 \* | **A, B, D** | `DROP TABLE elever;` fjerner tabellen med både struktur og data<br>`DELETE FROM elever;` fjerner alle radene, men beholder tabellen<br>`DELETE` med WHERE sletter bare radene som oppfyller betingelsen |
