// Person-objekt
let person = {
    navn : "bo",
    alder : 21,
    erKjekk : true,
    erRik : false,
    venner : ["jens", "adrian", "simen", "sara"],
    sjef : {
        navn : "Geir Totland",
        erStreng : true,
        lonn : 870000
    }
}

// Navigere i datastrukturen
// Enkelt
console.log(person.navn);
console.log(person["alder"]);  // eller person.alder
// Hvis han er kjekk, rop hurra
if(person.erKjekk) {
    console.log("hurra");
}
// Oppvarming: få tak i adrian
person.venner[1];
// Få tak i sjefen sitt navn
person.sjef.navn;
// Hvis adrian er en venn, si halla
if (person.venner.indexOf("adrian") >= 0) {
    console.log('halla');
}
