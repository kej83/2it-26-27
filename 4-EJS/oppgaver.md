# Ejs-oppgaver

## Oppgave 1
Lag ruten `/bursdag/:navn/:alder` og malen bursdag.ejs. /bursdag/Kari/17 skal vise «Gratulerer med 17-årsdagen, Kari!» og «Neste år blir du 18.»

Tips: For å sende flere data, gjør f.eks. slik:
```js
res.render("bursdag", {navn: mittNavn, alder: minAlder})
```

## Oppgave 2
Lag ruten `/karakter/:poeng` og malen karakter.ejs, som viser karakteren for en prøve med 100 poeng. Grensene er 90 for 6, 80 for 5, 60 for 4, 40 for 3 og 20 for 2. Under 20 poeng gir 1.