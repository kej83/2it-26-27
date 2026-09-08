// 2. Turnering — finn vinner og jumbo

// node cup.js Nora:1250 Ali:3100 Mia:890. Split hvert argument på :, lag spillere som objekter, finn flest poeng og navnet til spilleren. Ingen treff? Egen melding. Typisk resultattavle etter en spillkveld.

let spillere = [process.argv[2], process.argv[3], process.argv[4]];
let spiller1 = {
    navn: spillere[0].split(":")[0],
    poeng: Number(spillere[0].split(":")[1])
}
let spiller2 = {
    navn: spillere[1].split(":")[0],
    poeng: Number(spillere[1].split(":")[1])
}

// console.log("jens:5030".split(":"));
// console.log(spillere);

// for (let spiller of spillere) {
//     console.log(spiller)
// }