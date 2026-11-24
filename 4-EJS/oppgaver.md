# Ejs-oppgaver

## Oppgave 1
Lag ruten `/bursdag/:navn/:alder` og malen bursdag.ejs. /bursdag/Kari/17 skal vise «Gratulerer med 17-årsdagen, Kari!» og «Neste år blir du 18.»

*Tips*: For å sende flere data, gjør f.eks. slik:
```js
res.render("bursdag", {navn: mittNavn, alder: minAlder})
```

## Oppgave 2
Lag ruten `/karakter/:poeng` og malen karakter.ejs, som viser karakteren for en prøve med 100 poeng. Grensene er 90 for 6, 80 for 5, 60 for 4, 40 for 3 og 20 for 2. Under 20 poeng gir 1.

Bruk en datafil, f.eks. data.js med export, og i app.js bruker du import. Se eksemplene på git.


## Oppgave 3: 
Lag ruten `/hoyder` med en array av høydene til elever i en klasse, for eksempel `[167,182,170,178,183,190,181]` . Høydene blir vist frem i `hoyder.ejs`.  



Malen `laget.ejs` skal vise lagnavnet, antall spillere og en tabell med én rad per spiller.



## Oppgave 4: 
Lag ruten /laget med en array av spillere, for eksempel en spiller kan være `{ nummer: 10, navn: "Emil", posisjon: "Angrep" }`. 



Malen `laget.ejs` skal vise  antall spillere og en tabell med én rad per spiller.
