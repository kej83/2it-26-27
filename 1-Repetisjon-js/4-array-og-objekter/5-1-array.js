// Basics
let venner = ["per", "bo", "ea", "sara"];
// Hente ut verdier
console.log(venner[2]);
// Antall verdier
console.log(venner.length);  // 4
// Hente ut siste verdi
console.log(venner[venner.length - 1]);  // sara

// Endre verdier
// Endre bo til jens
venner[1] = "jens";
// La verdiene på index 0 og 2 bytte plass.
let temp = venner[0];
venner[0] = venner[2];
venner[2] = temp;
console.log(venner);

// Skrive ut alle med join
console.log(venner.join(" og "));

// Legge til på slutten
venner.push("Håkon");
venner.push("Arne");
console.log(venner.join(", "));

// Slette siste
venner.pop();
console.log(venner.join(", "));

// Slette verdi på index 1
venner.splice(1, 1);
console.log(venner.join(", "));

// Slette sara. Først finn index, så slett med splice
let saraIndex = venner.indexOf("sara");
venner.splice(saraIndex, 1);
console.log(venner.join(", "));