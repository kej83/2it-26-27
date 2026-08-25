// Skrive ut til skjerm
console.log("test")

// Datatyper
// String, boolean, Number, array, object, BigInt
// Oppgave: Lag en variabel for hver av datatypene, og gi den en verdi
let dyr = "ape";  // String
let alder = 17;  // Number
let erDyrt = true;  // Boolean
let hobbier = ["gaming", "fotball", "it"];  // Array
let person = { navn: "Ola", alder: 16, skole: "nann" };  // Object
let stortTall = 928948792837492345n;

// Utskrift fra array og object
console.log(hobbier[2]);  // it
console.log(hobbier[3]);  // undefined
console.log(person.navn)  // Ola

// Rep logikk og if-else
// Math.ceil runder OPP til nærmeste heltall
let kast = Math.ceil(Math.random() * 6);
console.log(kast);

// Hvis sekser, skriv hurra, ellers, morna.
// 2 == "2" gir true
// 2 === "2" gir false
if (kast === 6) {
    console.log('Hurra');

} else {
    console.log('morna');
}

// logiske uttrykk
let erStorre = 1000 > 100;  
let eks1 = 10 == "10" || 20 < 10;
let eks2 = 10 < 5 && "per" == "per" || true;
/*
10 < 5 && "per" == "per" || true
false && true || true
false || true
true

*/
/*
10 == "10" || 20 < 10
true || 20 < 10
true || false
true
*/
// true || false || false || false gir true
// true && false && true && true gir false