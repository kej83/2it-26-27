# Eksempel med parametere (params)

## Start prosjektet
Kjør disse for å sette opp:
```bash
npm init -y
npm pkg set type=module
npm install express
npm pkg set scripts.dev="node --watch app.js"
```

Nå er hovedfila kalt `app.js`. Den siste linja ovenfor gjør at programmet kan startes med:
```bash
npm run dev
```
Da kjøres egentlig kodelinja
```bash
node --watch app.js
```