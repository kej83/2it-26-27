let enkel = [2, 5, 3];

console.log(enkel[2]);  // 3

let kjip = [
    [2, 5, 3],
    [4, 9, 10],
    [25, 23, 15]
];

console.log(kjip[2]);  // [25, 23, 15]
// Hente ut 5 fra kjip
console.log(kjip[0][1]);  // 5
// Hente ut 15
console.log(kjip[2][2]);  // 15

// object 2d
let kjipob = {
    klasse: "2it",
    person : {
        navn:"Bo",
        alder: 15,
        tjenerFett: false,
        venner: ["arne", "per", "Daniel"]
    },
    dyr: {
        type: "katt",
        navn: "sofus",
        royterMye: true
    }
}
// 2it ?
console.log(kjipob.klasse);

// Bo ?
console.log(kjipob.person.navn);
// Daniel ?
console.log(kjipob.person.venner[2]);
