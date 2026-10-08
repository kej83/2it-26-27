const navn = process.argv[2] ?? "verden";
const alderOmTi = Number(process.argv[3]) + 10;
console.log(process.argv[2]); // undefined hvis tom
console.log(`Hei, ${navn.toUpperCase()}! Navnet ditt har ${navn.length} bokstaver. Du er ${alderOmTi} år om 10 år.`);
console.log("Du kjører Node-versjon", process.version);
console.log("Alle argumentene:", process.argv);

// **GJØR DETTE NÅ:**

// 1. Kjør `node hilsen.js Ola Nordmann` og deretter `node hilsen.js "Ola Nordmann"`. Hva er forskjellen, og hvorfor?
// 2. Ta imot en alder som argument nummer to, og skriv ut hvor gammel personen blir om 10 år. Hva skjer hvis du glemmer `Number()`?
// 3. Skriv navnet med store bokstaver og hvor mange bokstaver det har. Eks. brukeren skriver inn jens, programmet skal da gi "Hei, JENS. Navnet ditt har 4 bokstaver".
// 4. Legg til `document.title = "Hei"` nederst. Les feilmeldingen: hvilken linje peker den på?