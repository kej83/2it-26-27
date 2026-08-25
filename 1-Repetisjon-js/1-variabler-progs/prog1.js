let fornavn = "jens";

console.log(fornavn);
// skifte navn til jensern
fornavn = "jensern";
console.log(fornavn);

let etternavn = "gensern";
let fulltNavn = fornavn + " " + etternavn;
console.log(fulltNavn);

let venner = ["per", "bo", "ea", "sara"];
console.log(venner[1]); // bo
console.log(venner[4]); // undefined
console.log(venner.length); // 4
console.log(venner[venner.length-1]); // sara