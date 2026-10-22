import express from "express";

const app = express();
const PORT = 3000;

// Med denne vises automatisk index.html i public mappa når man går til
// localhost:3000/
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile("indeks.html", {root:"public"});
});

app.get("/hilsen/:navn", (req, res) => {
    let navn = req.params.navn;
    res.send(`<h1>Morn, ${navn}! Kos deg med 2it</h1>`);
})
app.get("/pluss/:tallA/:tallB", (req, res) => {
    // http://localhost:3000/pluss/5/10
    let tallA = Number(req.params.tallA);
    let tallB = Number(req.params.tallB);

    let sum = tallA + tallB;
    res.send(`<h2>${tallA} + ${tallB} = ${sum}`);
})
app.listen(PORT, () => {
    console.log("Serveren kjører på http://localhost:3000")
});